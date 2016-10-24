//---------------------------------
// Bootstrap 4 Color Picker
// Author: Sniddl
// Repo: https://github.com/Sniddl/js
//---------------------------------
/*
 Copyright (c) 2016 Sniddl. Relased under MIT license.
*/

var h,
    s,
    grd,
    well,
    h_ctx,
    input,
    s_ctx,
    current_color,
    colorpicker_wrapper,

//----------------------------
// F U N C T I O N S
//----------------------------
hex = function (obj) {
  if (typeof obj == "number"){
    var result = obj.toString(16);
    if (obj <= 15){
      return "0"+result;
    }
    return result;
  }
    throw "Cannot convert type of non-integer.";
};
hslToRgb = function(h, s, l) {
  s=s/100;
  l=l/100;
  var c = (1-Math.abs(2*l-1)) * s;
  var x = c*(1-Math.abs((h/60)%2-1));
  var m = l-c/2;
  var r,g,b;

  if (0 <= h && h < 60 || h == 360) {
    r = (c+m)*255;
    g = (x+m)*255;
    b = (0+m)*255;
  }else if (60 <= h && h < 120) {
    r = (x+m)*255;
    g = (c+m)*255;
    b = (0+m)*255;
  }else if (120 <= h && h < 180) {
    r = (0+m)*255;
    g = (c+m)*255;
    b = (x+m)*255;
  }else if (180 <= h && h < 240) {
    r = (0+m)*255;
    g = (x+m)*255;
    b = (c+m)*255;
  }else if (240 <= h && h < 300) {
    r = (x+m)*255;
    g = (0+m)*255;
    b = (c+m)*255;
  }else if (300 <= h && h < 360) {
    r = (c+m)*255;
    g = (0+m)*255;
    b = (x+m)*255;
  }else {
    return "Invalid value for hue. Hue must me greater than 0 and less than 360."
  }
  r=hex(Math.round(r));
  g=hex(Math.round(g));
  b=hex(Math.round(b));
  return "#"+r+g+b;

}

create_shades = function (hue) {
  s=document.getElementById("shade");
  s_ctx=s.getContext("2d");
  grd=s_ctx.createLinearGradient(0,0,300,0);
  grd.addColorStop(0,"hsla(0, 0%, 100%, 1)");
  grd.addColorStop(1,"hsla("+hue+", 100%, 50%, 1)");
  s_ctx.fillStyle=grd;
  s_ctx.fillRect(0,0,300,300);
  grd=s_ctx.createLinearGradient(0,300,0,0);
  grd.addColorStop(0,"hsla(0, 0%, 0%, 1)");
  grd.addColorStop(1,"hsla(0, 0%, 0%, 0)");
  s_ctx.fillStyle=grd;
  s_ctx.fillRect(0,0,300,300);
}

create_hue_bar = function() {
  h=document.getElementById("hue");
  h_ctx=h.getContext("2d");
  grd=h_ctx.createLinearGradient(0,300,0,0);
  var hue = 0;
  var stop = 1/360;
  var stepper = 1/360;
  grd.addColorStop(0,"hsla("+hue+", 100%, 50%, 1)");
  for (var hue = 1; hue < 360; hue++) {
    grd.addColorStop(stop,"hsla("+hue+", 100%, 50%, 1)");
    stop += stepper;
  }
  h_ctx.fillStyle=grd;
  h_ctx.fillRect(0,0,300,300);
}

getColor = function(e) {
  mouseX = e.pageX -169;
  mouseY = e.pageY -60;
  $('.pointer').css({
    'top': mouseY -3,
    'left': mouseX -4,
  }).show()
  console.log(mouseX, mouseY);
  var imgd = s_ctx.getImageData(mouseX, mouseY, 1, 1);
  var pix = imgd.data;
  var rgba = pix[0]+","+pix[1]+","+pix[2]+","+pix[3]
  return current_color = "#"+hex(pix[0])+hex(pix[1])+hex(pix[2]);
}



$(document).ready(function(){
  $('head').append("<style media='screen'>div#hue_selector::after{content: ''; display: block; height: 20px; width: 40px; background: url('/color_picker/slider_bar.png'); top: -8px; position: absolute; background-size: cover;}#shade-wrapper-track{content: ''; width: calc(100% + 6px); height: calc(100% + 6px); background: rgba(102, 51, 153, 0.5); display: block; position: absolute; top: -6px; left: -6px;}.pointer{background: url('/color_picker/pointer-set.png'); background-size: cover; width:10px; height:10px; position:absolute;}.color-well{background: white; display: block; height: 30px; width: 100px; border: 1px solid #aaa; border-radius: 5px; text-align: center; line-height: 28px; font-family: monospace;}button.btn.btn-color{background: #9462ce; height: 100%; position: absolute; width: 60px; top: 0; right: 0; border-radius: 0; z-index: 100; box-shadow: inset 0 0px 7px rgba(0, 0, 0, 0.52);}.input-group .colorpicker_wrapper{position: absolute; background: white; z-index: 10000; border: 1px solid #aaa; border-radius: 5px; right: 0px; top: 40px;}.input-group .colorpicker_wrapper:before{content: ' '; position: absolute; width: 0; height: 0; top: -28px; right: 4px; border: 14px solid; border-color: transparent transparent #aaa transparent;}.input-group .colorpicker_wrapper:after{content: ' '; position: absolute; width: 0; height: 0; top: -25px; right: 5px; border: 13px solid; border-color: transparent transparent white transparent;}#hueholder{display:inline-block; position: relative;}#hue_selector{position: absolute; top: 0; width: 100%; height: 1px;}.line{position: absolute; top: 50%; width: 100%; height: 2px; background: black; padding: 1px 0px;}#shade-wrapper{display: inline-block; position:relative}</style>")
  //----------------------------
  // O N   W E L L   C L I C K
  //----------------------------
  $('.btn-color').click(function(){

    colorpicker_wrapper = $(this).siblings('.colorpicker_wrapper');
    well = $(this)
    input = $(this).siblings('input');
    if (colorpicker_wrapper.length) {
      colorpicker_wrapper.remove();
    }else {
      $(this).parent().append('<div class="colorpicker_wrapper" style="padding: 20px;"> <div id="shade-wrapper"> <div class="shade-wrapper-track"></div><div class="pointer"></div><canvas id="shade" width="300" height="300" style="border: 1px solid black"> <p> Error: Browser not supported. Try Chrome. </p></canvas> </div><div style="margin-left:10px" id="hueholder" > <canvas id="hue" width="20" height="300" style="border: 1px solid black;"> <p> Error: Browser not supported. Try Chrome. </p></canvas> <div class="" id="hue_selector"> <div class="line"> </div></div></div></div>')
      create_shades(0)
      create_hue_bar()

      $('#hue_selector').draggable({
        containment: "parent",
        drag: function() {
          var pre_hue = $('#hue_selector').position().top;
          var height = $('#hue').height();
          var multiplier = 360/height;
          if (pre_hue < height){
            var hue = 360 - pre_hue * multiplier;
          }else {
            var hue = 360;
          }
          var hsl = $.colors( current_color ).model('HSL').get();
          hsl[0] = hue;
          create_shades(hue);
          current_color = hslToRgb(hsl[0],hsl[1],hsl[2])
          input.val(current_color);
          well.css('background-color',current_color)
        },//endDragFunction
      });//endDraggable


      var mouseX;
      var mouseY;
      var beingDragged = false;
      var mousedown = $("#shade-wrapper").mousedown(function(e){
        beingDragged = true;
          input.val(getColor(e));
          well.css('background-color',getColor(e))
      })
      $("#shade-wrapper").mouseup(function(){
        beingDragged = false;
      })
      $("#shade-wrapper").mousemove (function(e) {
        if (beingDragged) {
          $("#shade-wrapper").css('cursor', 'none');
          input.val(getColor(e));
          well.css('background-color',getColor(e))
        }else {
          $("#shade-wrapper").css('cursor','url(/color_picker/pointer.png),auto');
        }
      })//endMouseMove
    }//endif
  });//endCickFunction
})
