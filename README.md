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


- `css` (string) - allows a custom class to be passed to the wrapper with prefix .kk- for use with skins and custom styling _default: "default"
- `responsive` (bool)
- `range` (int)
- `minVal` (int)
- `maxVal` (int)
- `speed` (int)
- `scale` (int)
- `holdKey` (int)
- `groupKey` (int)