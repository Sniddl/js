window.s = {
  //checks custom media query
  mq: function (a,b) {
    return window.matchMedia( "("+a+": "+b+")" ).matches
  },
  //Allows quick file inclusion using jquery ajax.
  include: function(c,d){
    $.ajax({
        url : c,
        dataType: "text",
        success : function (data) {
            $(d).html(data);
        }
    });
  }
}



//Allows users to insert a range to slice their html element.
  $.fn.shorten = function(a,b) {
    b ? this.html(this.html().slice(a,b)) : this.html(this.html().slice(0,a))
    return this
  }


//Append string to element
$.fn.appendString = function(a) {
  const b = this.html().length
  const c = b - a.length
  const d = this.html().slice(c,b)
  if(a!=d){
    this.html(this.html() + a)
  }else{
    alert()
  }
  return this
}

//save the html of an element
$.fn.save = function(){
  if(!this.attr('data-html-clone')){
    this.attr('data-html-clone',this.html())
  }return this
}

// revert back to a save of an element
$.fn.revert = function(){
  if(this.attr('data-html-clone')){
    this.html(this.attr('data-html-clone'))
    return this
  }else{throw new Error("Cannot find a save.")}
}
