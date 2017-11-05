/*jshint esversion: 6 */

/*-----------
// Helpers //
-----------*/

// Check if value is number
function isNum(val) { return Number.isInteger(val); }

// Check if value is undefined
function isUndefined(val) {	return typeof val === 'undefined'; }

// Check if this.el is a NodeList or single element
function isNodelist(el) { return el.constructor === NodeList; }

// Check if value is array
function isArray(val) { return Array.isArray(val); }


/*-----------------
///////////////////
// OBJECT SETTER //
///////////////////
-----------------*/

// Create new object
function $(el, i) {
	var index = isNum(i) ? i : ''; // 0 is possible, so make sure it can be returned
	return new Element(el, index);
}

// What the object is...
var Element = function(el, i) {
	var index = isNum(i) ? i : ''; // 0 is possible, so make sure it can be returned
	this.el = !isNum(i) ? document.querySelectorAll(el) : document.querySelectorAll(el)[index];
	this.selector = el; // Store selector used, gets used to
};

/*---------------
/////////////////
// THE LIBRARY //
/////////////////
---------------*/

// Library Methods
Element.prototype = {

	//////////////////
	// TEXT && HTML //
	//////////////////

	// Sets/Gets HTML
	html: function(val) {
		// If val is passed, set the value and continues allowing chaining
		if (!isUndefined(val)) {
			if (isNodelist(this.el)) {
				this.el.forEach((elm, i) => elm.innerHTML = val);
			} else {
				this.el.innerHTML = val;
			}
			return this; // Apply so chaining is allowed
		} else {
			return this.el[0].innerHTML;
		}
	},

	// Sets/Gets Text
	text: function(val) {
		if (!isUndefined(val)) {
			if (isNodelist(this.el)) {
				this.el.forEach((elm, i) => elm.innerText = val);
			} else {
				this.el.innerText = val;
			}
			return this; // Apply so chaining is allowed
		} else {
			return this.el[0].innerText;
		}
	},


	/////////////
	// ClASSES //
	/////////////

	// Toggle classes - can pass true/false
	toggleClass: function(val, bool) {
		var classes = val.split(" "); // split classes into array
		if (isNodelist(this.el)) {
			this.el.forEach((elm, i) => elm.classList.toggle(...classes, bool));
		} else {
			this.el.classList.toggle(...classes, bool);
		}
		return this; // Apply so chaining is allowed
	},

	// Add classes (i.e. .addClass('class1 class2');)
	addClass: function(val) {
		var classes = val.split(" "); // split classes into array
		if (isNodelist(this.el)) {
			this.el.forEach((elm, i) => elm.classList.add(...classes));
		} else {
			this.el.classList.add(...classes);
		}
		return this; // Apply so chaining is allowed
	},

	// Remove classes (i.e. .removeClass('class1 class2');)
	removeClass: function(val) {
		var classes = val.split(" "); // split classes into array
		if (isNodelist(this.el)) {
			this.el.forEach((elm, i) => elm.classList.remove(...classes));
		} else {
			this.el.classList.remove(...classes);
		}
		return this; // Apply so chaining is allowed
	},

	// Check if element contains a class
	hasClass: function(val) {
		return this.el[0].classList.contains(val);
	},


	///////////////////////
	// PREPEND && APPEND //
	///////////////////////

	// Append html to end of element
	// Examples:
	// $('body').append([$(#div1)]); 					--> Moving DOM objects (note: pass elements in array in order to be appended)
	// $('body').append('<div id="div1">Div 1</div>')	--> Creating a new DOM element
	append: function(val) {
		if (isArray(val)) { // If passing an array of DOM objects to be re-appended somewhere else in the DOM
			val.forEach(elm => this.el[0].append(elm.el[0]));
		} else if (isNodelist(this.el)) {
			this.el.forEach(elm => elm.append(val));
		} else {
			this.el.append(val);
		}
		return this; // Apply so chaining is allowed
	},

	// Prepend html to beginning of element
	// Examples:
	// $('body').prepend([$(#div1)]); 					--> Moving DOM objects (note: pass elements in array in order to be prepended)
	// $('body').prepend('<div id="div1">Div 1</div>')	--> Creating a new DOM element
	prepend: function(val) {
		if (isArray(val)) { // If passing an array of DOM objects to be re-appended somewhere else in the DOM
			val.forEach(elm => this.el[0].prepend(elm.el[0]));
		} else if (isNodelist(this.el)) {
			this.el.prepend(val);
		}
		return this; // Apply so chaining is allowed
	},


	////////////////
	// CSS STYLES //
	////////////////

	// EXAMPLES:
	// .css('font-size: 20px')					--> Single property declaration
	// .css('font-size: 20px; color: blue;') 	--> Multiple property declarations
	// .css(['font-size: 20px', 'color: blue'])	--> Multiple property declarations can be written as an array
	// .css("")									--> Remove all inline styles
	// .css()									--> Returns a string of the inline styles
	css: function(css) {
		if (isUndefined(css)) { // If no value passed, return a string of the inline styles
			return this.el.style.cssText;
		} else if (css.length < 1) { // If val is empty string, remove all inline styles
			if (isNodelist(this.el)) {
				this.el.forEach((elm) => elm.removeAttribute('style'));
			} else {
				this.el.removeAttribute('style');
			}
		} else { // Otherwise, set the styles
			var styles = [];
			if (isArray(css)) {
				css.forEach(style => styles += `${style};` );
			} else {
				styles = css;
			}
			if (isNodelist(this.el)) {
				this.el.forEach((elm) => elm.style.cssText += styles);
			} else {
				this.el.style.cssText += styles;
			}
		}
		return this; // Apply so chaining is allowed
	},

	arrange: function(elements) {
		return this;
	},


	////////////
	// EVENTS///
	////////////

	// Click
	click: function(el) {
		this.el.forEach((elm, i) => {
			elm.addEventListener('click', (e) => el($(this.selector, i)));
		});
	}

};


/*---------
// Usage //
---------*/

// $('#div1').addClass('blue large');
$('#div1').html(`<h1>Header 1</h1>`).addClass('large').css(['color: orange', 'font-size: 10px']);

// Click example
$('div').click((el) => {
	el.text('This was clicked!').append('...or was it?').css('font-size: 99px;');
});

var one = $('#div1');
var two = $('#div2');
var three = $('#div3');
$('body').prepend([two, three, one]);
