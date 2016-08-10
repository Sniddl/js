
# Sniddl.js Documentation
***    
## Custom namespace
***
### s.mq():
Quickly check a media query.  
`s.mq('parameter','value')`


###### Examples:
<pre>
if ( s.mq('min-width', '500px') ){
  $('html').css('background','red')
}
</pre>
***
## Jquery plugin
***
### .appendString():
Quickly append to an element on the page. If the current string is already at the end of the element, nothing will occur.
`$(element).appendString('Custom String')`


###### Examples:
```
<h1>Hello World</h1>

$('h1').appendString('...') //returns -> Hello World...
$('h1').appendString('World') //returns -> Hello World
```
***
### .revert():
Revert back to a previous save
`$(element).revert()`


###### Examples:
```
<h1>Hello World</h1>

$('h1')save().shorten(5).appendString('...') //returns -> Hello...
$('h1').revert() //returns -> Hello World
```
***
### .save():
Save an element's current html.
`$(element).save()`


###### Examples:
```
<h1>Hello World</h1>

$('h1').save() //returns ->
// <h1 data-html-clone="Hello World">Hello World</h1>
```
***
### .shorten():
Quickly shorten the html in an element. Works just like the slice function.
`$(element).shorten(max-length)`
`$(element).shorten(start, end)`

###### Examples:
```
<h1>Hello World</h1>

$('h1').shorten(7) //returns -> Hello W
$('h1').shorten(2,5) //returns -> llo   
```
***
