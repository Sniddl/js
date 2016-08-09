const s = {
  //checks custom media query
  mq: function (a,b) {
    return window.matchMedia( "("+a+": "+b+")" ).matches
  }
}



//Allows users to insert a range to slice their html element.
$.fn.shorten = function(a,b) {
  b ? this.html(this.html().slice(a,b)) : this.html(this.html().slice(0,a))
  return this
}
//Append string to element
$.fn.appendString = function(a) {
  this.html(this.html() + a)
  return this
}
