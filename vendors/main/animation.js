$(function(){
    $('#toggleThis').click(function(){
      $('#contentcode').slideToggle(800,callback);
    });
 });
 window.i=0;
 function callback(){
   ++i;

 }