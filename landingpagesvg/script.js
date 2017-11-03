function set_section_heights(){
  var doc_height = $(".background").height();
  var section_heights = {
    "ufo_section": 0.25,
    "spacer_one": 0.03,
    "comet_section": 0.36,
    "spacer_two": 0.06,
    "landing_section": 0.298
  }

  $.each( section_heights, function( index, value ) {
    $( "." + index ).height( Math.floor(value * doc_height) );
  });
}


$(document).ready(function(){
  set_section_heights();
});

$(window).resize(function(){
  set_section_heights();
});
