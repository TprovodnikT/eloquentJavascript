function skipSpaces (program) {
	// console.log(/\S/.exec(program));
	var match;
	if(match = /\S/.exec(program)){
		return program.slice(match[1]);
	}
	return "";
}
function parseProgram (program) {
	program = skipSpaces(program);
	var match;
	if(match = //)
}
console.log(skipSpaces("      "));
console.log(skipSpaces("  asd   "));
