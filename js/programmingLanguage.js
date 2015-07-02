function skipSpaces(string) {
	var string = string.replace(/(#[\ \w\d]*)/, function (str) {
		console.log(str);
		return "";
	});
	var first = string.search(/\S/);
	// console.log(string)
	if (first == -1) return "";
	return string.slice(first);
}
function parseExpresssion (program) {
	program = skipSpaces(program);
	var match, expr;
	if(match = /^"([^"]*)"/.exec(program)){
		expr = {type: "value", value: match[1]};
	}else if(match = /^\d+\b/.exec(program)){
		expr = {type: "value", value: Number(match[0])};
	} else if(match = /^[^\s(),"]+/.exec(program)){
		expr = {type: "word", name: match[0]}
	} else{
		throw new SyntaxError("Unexpected syntax: "+program);
	}
	return parseApply(expr, program.slice(match[0].length))
}
function parseApply (expr, program) {
	program = skipSpaces(program);
	if(program[0]!="("){
		return {expr: expr, rest: program};
	}
	program = skipSpaces(program.slice(1));
	expr = {type: "apply", operator: expr, args: []};
	while(program[0] !== ")"){
		var arg = parseExpresssion(program);
		expr.args.push(arg.expr);
		program = skipSpaces(arg.rest);
		if(program[0]==","){
			program = skipSpaces(program.slice(1));
		}else if(program[0] !== ")"){
			throw new SyntaxError("Expected \",\" or \")\"");
		}
	}
	return parseApply(expr, program.slice(1));
}

function parse (program) {
	var result = parseExpresssion(program);
	if(skipSpaces(result.rest).length > 0){
		throw new SyntaxError("Unexpected text after program");
	}
	return result.expr;
}
// console.log(parse("+(a, 10)"));

function evaluate (expr, env) {
	switch(expr.type){
		case "value":
			return expr.value;
		case "word":
			if(expr.name in env){
				return env[expr.name];
			} else{
				throw new ReferenceError("Not defined variable: "+expr.name);
			}
		case "apply":
			if(expr.operator.type === "word" && expr.operator.name in specialForms){
				return specialForms[expr.operator.name](expr.args,env);
			}
			var op = evaluate(expr.operator, env);
			if (typeof op !== "function") {
				throw new TypeError("Application not a function");
			}
			return op.apply(null, expr.args.map(function (arg) {
				return evaluate(arg, env);
			}));
	}
}
var specialForms = Object.create(null);
specialForms["if"] = function (args, env) {
	if(args.length !== 3){
		throw new SyntaxError("if operator must have three arguments");
	}
	if(evaluate(args[0], env) !== false){
		return evaluate(args[1], env);
	}
	return evaluate(args[2], env);
};
specialForms["while"] = function (args, env) {
	if (args.length !== 2) {
		throw new SyntaxError("while operator must have 2 arguments");
	}
	while(evaluate(args[0], env) !== false){
		evaluate(args[1], env);
	}
	return false;
};
specialForms["do"] = function (args, env) {
	var value = false;
	args.forEach(function (arg) {
		value = evaluate(arg, env);
	});
	return value;
};
specialForms["define"] = function (args, env) {
	if(args.length !==2 && args[0].type !== "word"){
		throw new SyntaxError("Bad using of define!!!");
	}
	var value = evaluate(args[1], env);
	env[args[0].name] = value;
	return value;
}
var topEnv = Object.create(null);
topEnv["true"] = true;
topEnv["false"] = false;

// var prog = parse("if(true, false, true)");
// console.log(evaluate(prog, topEnv));
["+", "-", "*", "/", "==", ">", "<"].forEach(function (op) {
	topEnv[op] = new Function("a, b", "return a " + op + " b;");
});
topEnv["print"] = function (value) {
	console.log(value);
	return value;
};
function run () {
	var env = Object.create(topEnv);
	var program = Array.prototype.slice.call(arguments, 0).join("\n");
	return evaluate(parse(program), env);
};

// run("do(define(total, 0),",
//		 "	 define(count, 1),",
//		 "	 while(<(count, 11),",
//		 "				 do(define(total, +(total, count)),",
//		 "						define(count, +(count, 1)))),",
//		 "	 print(total))");
specialForms["fun"] = function (args, env) {
	if(!args.length){
		throw new SyntaxError("Function need body!!!");
	}
	function name (arg) {
		if(arg.type !== "word"){
			throw new SyntaxError("Arguments must be words");
		}
		return arg.name;
	}
	var argNames = args.slice(0, args.length - 1).map(name);
	var body = args[args.length - 1];
	return function () {
		if(arguments.length !== argNames.length){
			throw new SyntaxError("Quantity of arguments is not right!!!");
		}
		var localEnv = Object.create(env);
		for(var i = 0; i < argNames.length; i++){
			localEnv[argNames[i]] = arguments[i];
		}
		return evaluate(body, localEnv);
	}
}

topEnv["array"] = function(){
	var arr = Object.create(null);
	Object.defineProperty(arr, "type", {value: "array", enumerable: false})
	for(var i = 0; i < arguments.length; i++){
		arr[i] = arguments[i];
	}
	return arr;
};

topEnv["length"] = function () {
	if(arguments.length !== 1){
		throw new SyntaxError("Length method must have only one argument");
	}
	var length = 0;
	if(arguments[0].type !== "array"){
		throw new TypeError("Length can be aplied only to arrays!!!");
	}
	for(var i in arguments[0]){
		length++;
	}
	return length;
};
topEnv["element"] = function () {
	if(arguments.length !== 2){
		throw new SyntaxError("Method element must have two arguments");
	}
	// if()
	if(arguments[0].type !== "array"){
		throw new TypeError("Method element can be aplied only to arrays!!!");
	}
	if(isNaN(arguments[1])){
		throw new TypeError("Second argument must be a number")
	}
	var arr = arguments[0];
	var index = arguments[1];
	return arr[index] ? arr[index] : null;
}


// topEnv["element"] = ;

// run("do(define(plusOne, fun(a, +(a, 1))),",
//		 "	 print(plusOne(10)))");

// run("do(define(pow, fun(base, exp,",
//		 "		 if(==(exp, 0),",
//		 "				1,",
//		 "				*(base, pow(base, -(exp, 1)))))),",
//		 "	 print(pow(2, 10)))");

specialForms["set"] = function(args, env) {
	if(args.length !== 2 || args[0].type !="word")
		throw new SyntaxError("Bad use of set");
		var varName = args[0].name;
		var value = evaluate(args[1], env);
		for (var scope = env; scope; scope = Object.getPrototypeOf(scope)) {
			console.log("scope", scope);
			if (Object.prototype.hasOwnProperty.call(scope, varName)) {
				scope[varName] = value;
				return value;
			}
		}
	throw new ReferenceError("Setting undefined variable " + varName);
};

run("do(define(x, 4),",
		"	 define(setx, fun(val, set(x, val))),",
		"	 setx(50),",
		"	 print(x))");
// → 50
// run("set(quux, true)");

// console.log(parse(" # hello\nx"));

// console.log(parse("a # one\n	 # two\n()"));