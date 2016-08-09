
# Sniddl.js Documentation
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
### .appendString():
Quickly append to an element on the page.    
`$(element).appendString('Custom String')`


###### Examples:
```
<h1>Hello World</h1>

$('h1').appendString('...') //returns -> Hello World...
```
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
