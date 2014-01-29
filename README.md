khantrol-knob
=============



##Installation
installing khantrol knob is really simple just include the required JS and CSS files in your document:

```html
<script type="text/javascript" src="khantrol-knob.min.js"></script>
<link rel="stylesheet" href="khantrol-knob.css" />
```

##Basic Usage
to use the knob with default settings first of all create an text input element: 
```html
<input type="text" id="khantrol-knob" />
```

then call the plugin in javascript:
```javascript
$("#khantrol-knob").khantrolKnob();
```
to get the value use `.val()` on the original element: 
```javascript
$("#khantrol-knob").val()
```

###Tracking Changes
to track any changes add an event listener to the original element:
```javascript
$("#khantrol-knob").change(function(){
	console.log($(this).val());
});
```
events are also fired when the knob is turned to the minimun and maximum values, these can be tracked like so:
```javascript
$("#khantrol-knob").on("max", function(){
	console.log("turned to max");
});
$("#khantrol-knob").on("min", function(){
	console.log("turned to min");
});
```

##Control
Khantrol knob comes setup to work perfectly with the mouse and touch events, extra control can be added with the keyboard, when a `holdKey` or `groupKey` is definied the user can hold this key down and use the `up` and `down` keys on their keyboard to control the value of the knob. In this example the `H` key (keycode 72) is used as the holdKey:

```javascript
$("#khantrolKnob").khantrolKnob({
	holdKey: 72
});
```

`groupKey` is made to be used across multiple knobs allowing you to control their values at the same time. In this example the `G` key is used as the groupKey:

```javascript
$("#khantrolAlpha").khantrolKnob({
	groupKey: 71
});
$("#khantrolBravo").khantrolKnob({
	groupKey: 71
});
$("#khantrolCharlie").khantrolKnob({
	groupKey: 71
});
```

a full list of javascript keycodes can be found [here](http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes). 


##Styling
khantrol knob comes with a default set of styles that work out of the box. If you want to custom style the knob you can simply give a value to css to create a custom class: 

```javascript
$("#khantrol-knob").khantrolKnob({
	css: "my-class";
})
```

this class will automatically be prefixed with "kk-" giving the class name `.kk-my-class`. To ensure the knob works correctly a width and height must be defined for `.kk-face`:

```css
.kk-my-class .kk-face{
	width: 2em;
	height: 2em;
}
```

If you want a headstart some basic styles are supplied to ensure the knob functions as desired while allowing you to extend the styles, to access them use `skeleton`:

```javascript
$("#khantrol-knob").khantrolKnob({
	css: "skeleton";
})
```


##Options


- `css` (string) - allows a custom class to be passed to the wrapper with prefix ".kk-" for use with skins and custom styling _default: "default"_
- `responsive` (bool) - used to create fluid with wrappers _default: false_
- `range` (int) - range of degrees the knob will rotate _default: 270_
- `minVal` (int) - minimum value the knob will give _default: 0_
- `maxVal` (int) - maximum value the knob will give _default: 100_
- `speed` (int) - speed at which the knob can be rotated _default: 1_
- `scale` (int) - scale at which numbers increase and decrease (10, 1, 0.1 etc) _default: 1_
- `holdKey` (int) - keycode to control the knob with, must be unique _default: null_
- `groupKey` (int) - keycode to control the group, does not need to be unique _default: null_