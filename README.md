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