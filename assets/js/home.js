if( typeof piratelife === 'undefined' ) { var pirateLife = {}; }

pirateLife.Home = (function() {
  'use strict';

  var _$tagsList,
    _$tags;

	function Home(){
    $(document).ready(init);
  }
  Home.apply(this, null);

  function init(){
    $(document).fitVids();

    manageTags();
    unwrapImages();
    arrowScroll();
  }

  function manageTags(){
    _$tagsList = $('.tags__list');
    _$tags = $('.tag__item');

    _$tagsList.hide();
    removeDuplicateTags();
    _$tagsList.show();
  }

  function removeDuplicateTags(){
    var liText = '',
      listForRemove = [];

    _$tags.each(function () {
      var text = $(this).text();

      if (liText.indexOf('|'+ text + '|') === -1) {
        liText += '|' + text + '|';
      }
      else {
        listForRemove.push($(this));
      }
    });

    $(listForRemove).each(function () { $(this).remove(); });
  }

  function arrowScroll() {
    $(window).scroll( function() {
      var topWindow = $(window).scrollTop();
      topWindow = topWindow * 1.5;
      var windowHeight = $(window).height();
      var position = topWindow / windowHeight;

      //invert the percentage
      position = 1 - position;

      //define arrow opacity as based on how far up the page the user has scrolled
      //no scrolling = 1, half-way up the page = 0
      $('.arrow.animated.bounce').css('opacity', position);

    });
  }

  function unwrapImages() {
    $('img').each(function(){
      var image = $(this);
      if(image.parent().is('p')){
        image.unwrap();
      }
    });
  }

})();