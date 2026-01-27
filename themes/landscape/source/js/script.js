(function($){
  // Simple HTML-escaping helper to prevent XSS when interpolating text into HTML strings
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      title = $this.attr('data-title'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var box = $('<div></div>').addClass('article-share-box');
      box.attr('id', id);

      var input = $('<input>')
        .addClass('article-share-input')
        .val(url);

      var links = $('<div></div>').addClass('article-share-links');

      var twitterLink = $('<a></a>')
        .addClass('article-share-twitter')
        .attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodedUrl)
        .attr('target', '_blank')
        .attr('title', 'Twitter');

      var facebookLink = $('<a></a>')
        .addClass('article-share-facebook')
        .attr('href', 'https://www.facebook.com/sharer.php?u=' + encodedUrl)
        .attr('target', '_blank')
        .attr('title', 'Facebook');

      var pinterestLink = $('<a></a>')
        .addClass('article-share-pinterest')
        .attr('href', 'http://pinterest.com/pin/create/button/?url=' + encodedUrl)
        .attr('target', '_blank')
        .attr('title', 'Pinterest');

      var linkedinLink = $('<a></a>')
        .addClass('article-share-linkedin')
        .attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl)
        .attr('target', '_blank')
        .attr('title', 'LinkedIn');

      links
        .append(twitterLink)
        .append(facebookLink)
        .append(pinterestLink)
        .append(linkedinLink);

      box
        .append(input)
        .append(links);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

      var alt = this.alt || '';
      var escapedAlt = escapeHtml(alt);
      var escapedSrc = escapeHtml(this.src || '');

      if (alt) $(this).after('<span class="caption">' + escapedAlt + '</span>');

      $(this).wrap('<a href="' + escapedSrc + '" data-fancybox="gallery" data-caption="' + escapedAlt + '"></a>')
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
})(jQuery);