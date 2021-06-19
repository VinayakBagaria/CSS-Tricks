$('.left')
  .mouseenter(() => {
    $('.container').addClass('left-is-hovered');
  })
  .mouseleave(() => {
    $('.container').removeClass('left-is-hovered');
  });

$('.right')
  .mouseenter(() => {
    $('.container').addClass('right-is-hovered');
  })
  .mouseleave(() => {
    $('.container').removeClass('right-is-hovered');
  });
