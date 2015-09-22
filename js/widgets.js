$.widget("el.editItem",
		{
			_create: function ()
			{
				this.startValues = {};
			},
			addDropDown: function (arr, thisCategory)
			{
				var dropDown = $("<select>");
				var option;
				dropDown.addClass("selectBox");
				arr.forEach(function (el) {
					option = $("<option>");
					option.text(el);
					option.attr("value", el);
					if (el === thisCategory)
					{
						option.attr("selected", "selected");
					}
					dropDown.append(option);
				});
				this.startValues["category"] = thisCategory;
				this._dropDown = dropDown;
				this.element.append(dropDown);
			},
			addTextBox: function (txt)
			{
				this.startValues["value"] = txt;
				var input = $('<input>').attr({type: 'text'});
				input.width(this.options.myWidth - 6);
				input.val(txt);
				this._input = input;
				this.element.append(input);
			},
			getData: function ()
			{
				return {
					value: $(this._input).val(),
					category: $(this._dropDown).val()
				};
			},
			getStartValues: function ()
			{
				return this.startValues;
			},
			compareStartValuesWithNew: function () {
				var nowData = this.getData();
				return nowData.category === this.startValues.category && nowData.value === this.startValues.value;
			}
		});

$.widget("el.row",
		{
			_create: function ()
			{
			},
			editable: function (colNumber)
			{
				var cells = $(this.element).children();
				this._editableCell = cells[colNumber];
			},
			createAndGetEditable: function (text, thisCategory)
			{
				var editForm = $("<div class='editForm'>");
				var elem = this.element;
				editForm.editItem();
				editForm.editItem("addTextBox", text);
				editForm.on("change", function () {
					if (!editForm.editItem("compareStartValuesWithNew"))
						elem.addClass("_changed");
					else
						elem.removeClass("_changed");
				});
				return editForm;
			},
			addCells: function (arr, editableCell, thisCategory)
			{
				var row = this.element;
				var td;
				for (var i = 0; i < arr.length; i++)
				{
					td = $("<td>");
					if (i === editableCell)
					{
						this._editable = this.createAndGetEditable(arr[i], thisCategory, arr[i]);
						td.append(this._editable);
					}
					else
					{
						td.text(arr[i]);
					}
					row.append(td);
				}
			}
		});

$.widget("el.variablesTable", {
	_create: function ()
	{
	},
	appendHeader: function (arr)
	{
		var elem = this.element;
		var th;
		arr.forEach(function (el)
		{
			th = $("<th>");
			th.text(el);
			elem.append(th);
		});
	},
	appendRows: function (arr, editableCell, thisCategory)
	{
		var elem = this.element;
		var tmpRow;
		arr.forEach(function (row)
		{
			tmpRow = $("<tr>");
			tmpRow.row();
			tmpRow.row("addCells", row, editableCell, thisCategory);
			elem.append(tmpRow);
		});
	}
});
$.widget("el.tableContainer", {
	_create: function ()
	{
	},
	appendCategoryHeader: function (headerText)
	{
		var header = $("<div>");
		header.addClass("variablesHeader");
		header.text(headerText);
		this.element.prepend(header);
		this.element.addClass(headerText);
	}
});

$.widget("el.leftMenuTree", {
	_create: function ()
	{
	},
	createMenu: function (arr)
	{
		var elem = this.element;
		var category;
		for (var i = 0; i < arr.length; i++) {
			category = $("<li>");
			category.text(arr[i]);
			if (i === 0)
			{
				category.addClass("ui-selected");
			}
			elem.append(category);
		}
		this.element.selectable({
			selecting: function (event, ui) {
				if ($(".ui-selected, .ui-selecting").length > 1) {
					$(ui.selecting).removeClass("ui-selecting");
				}
			},
			selected: function () {
				var className = $(this).find(".ui-selected").text();
				var visibleObjects = $("#variableContainer").find(":visible");
				if (!visibleObjects.hasClass(className))
				{
					if (visibleObjects[0])
					{
						$(visibleObjects[0]).hide();
					}
					$("#variableContainer").find("." + className).show();
				}
			}
		});
	}
});
(function ()
		{
			$("#treeMenuContainer > ul").leftMenuTree();
			var categories = ["first", "second"];
			var tablesNumber = 0;
			$("#treeMenuContainer > ul").leftMenuTree("createMenu", categories);
			categories.forEach(function (el) {
				var tb = $("<table>");
				var div = $("<div>");
				$("#variableContainer").append(div);
				div.append(tb);
				tb.variablesTable();
				tb.variablesTable("appendHeader", ["name", "value"]);
				var rows = [];
				for (var i = 0; i < 50; i++) {
					rows.push(["topAgentsVoipManagerEmailAddress" + el + "nameNumber" + i, "value number " + i]);
				}
				tb.variablesTable("appendRows", rows, 1, el);
				div.tableContainer();
				div.tableContainer("appendCategoryHeader", el);
				if (tablesNumber != 0)
				{
					div.hide();
				}
				tablesNumber++;
			});
			var buttonDiv = JUI.Misc.SimpleContainer();
			$("#_container").append($(buttonDiv).append($("<a id='saveButton'>").text("Save").button()));
		})();