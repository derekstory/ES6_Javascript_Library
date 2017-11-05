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


/*---------------
/////////////////
// THE LIBRARY //
/////////////////
---------------*/

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

// Library Methods
Element.prototype = {

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

	// Append html to end of element
	append: function(val) {
		if (isNodelist(this.el)) {
			this.el.forEach((elm) => elm.append(val));
		} else {
			this.el.append(val);
		}
		return this; // Apply so chaining is allowed
	},

	// Append html to end of element
	prepend: function(val) {
		if (isNodelist(this.el)) {
			this.el.forEach((elm) => elm.prepend(val));
		} else {
			this.el.prepend(val);
		}
		return this; // Apply so chaining is allowed
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
$('#div1').html(`<h1>Header 1</h1>`).addClass('large');

// Click example
$('div').click((el) => {
	el.text('This was clicked!').append('...or was it?').toggleClass('blue');
});
