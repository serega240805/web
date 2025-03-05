
jQuery(document).ready(function() {
  // module connectors configuration
  jQuery('.mod').each(function() {
    jQuery(this).attr('data-connectors', '1');
  });
});

// extend Tc.Module Class
Tc.Module = Tc.Module.extend({ 
  onInitStyle: function(data) {
    var $ctx = this.$ctx;
    
    if(data['color_scheme']) {
      $ctx.removeClass(/colorScheme.+/);
      $ctx.addClass("colorScheme"+Tc.Utils.String.capitalize(data['color_scheme']));
    }
    
  }
});


jQuery.extend({
  randomColor: function() {
    return '#' + Math.floor(Math.random()*256*256*256).toString(16);
  }
});

(function(removeClass) {
  jQuery.fn.removeClass = function(value) {
    if(value && typeof value.test === 'function') {
      for(var i = 0; i < this.length; i++) {
        var elem = this[i];
        if( elem.nodeType === 1 && elem.className ) {
          var classNames = elem.className.split(/\s+/);
          for(var n = 0; n < classNames.length; n++) {
            if(value.test(classNames[n])) {
              classNames.splice(n, 1);
            }
          }
          elem.className = jQuery.trim(classNames.join(" "));
        }    
      }
    } else {
      removeClass.call(this, value);
    }

    return this
  }    
})(jQuery.fn.removeClass);

jQuery(document).ready(function() {
  jQuery('html').removeClass('no-js');
});
(function($) {
  Tc.Module.BlogNav = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BlogNews = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BlogPost = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.CaseStudy = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.CommentForm = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.ContactInfo = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.ContactUs = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
      this.require('jquery.validate.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
      
      $('form', $ctx).validate({
        messages: { name: null, email: null, message: null },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: 'send.php',
            data: $(form).serialize(),
            success: function(data) {
              if(data.match(/success/)) {
                $(form).trigger('reset');
                $('.thanks', $ctx).show().fadeOut(10000);
              }
            }
          });
          return false;
        }
      });
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Gallery = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
      
      // for portfolio page project thumbnail and large preview
      // $('.hover-overlay', $ctx).css('opacity', 0);
      //       $(".hover-overlay", $ctx).hover(
      //         function(){ $(this).stop().fadeTo(500, 0.65) },
      //         function(){ $(this).stop().fadeTo(200, 0) }
      //       );
      
      // fix for ie7
      $('ul.works li', $ctx).each(function() {
        if($.browser.msie && $.browser.version == '7.0') {
          var width = $('.image-wrapper', this).outerWidth();
          $('>p', this).width(width);
        }
      })
      
      $('ul.filter > li > a', $ctx).click(function() {
        $('ul.filter .current', $ctx).removeClass('current');
        $(this).addClass('current');
        
        var filter = $(this).text();
        
        if (filter == 'All') {
          $('ul.works > li *.hidden', $ctx).stop().animate({ "opacity": 1}, 1000).removeClass('hidden');
        } else {
          $('ul.works > li', $ctx).each(function() {
            if($(this).hasClass(filter)) {
              $('*', this).stop().animate({ "opacity": 1 }, 1000).removeClass('hidden');
            } else {
              $('*', this).stop().animate({ "opacity": 0.1 }, 1000).addClass('hidden');
            }
          });
        }
        
        return false;
      });      
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.GetInTouch = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
      this.require('jquery.validate.js', 'plugin', 'onBinding');
      this.require('jquery.placeholder.min.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
            
      $('input, textarea', $ctx).placeholder();
      $('form', $ctx).validate({
        messages: { name: null, email: null, message: null },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: 'send.php',
            data: $(form).serialize(),
            success: function(data) {
              if(data.match(/success/)) {
                $(form).hide().trigger('reset');
                $('.thanks', $ctx).fadeIn(3000);
              }
            }
          });
          return false;
        }
      });
      
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Links = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Logo = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Nav = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onInitStyle: function(data) {
      var $ctx = this.$ctx;          
      this._super(data);
      var $current = $('.current', $ctx);
    },
    onBinding: function() {
      var $ctx = this.$ctx;      
    }
  })
})(Tc.$);
// http://nivo.dev7studios.com/support/jquery-plugin-usage

(function($) {
  Tc.Module.NivoSlider = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
      this.require('jquery.nivo.slider.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
      $('.nivoSlider', $ctx).nivoSlider({
        pauseTime: 3500
      });
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.SectionHeader = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onInitStyle: function(data) {
      var $ctx = this.$ctx;      
      $('h3', $ctx).css('backgroundImage', $('body').css('backgroundImage'));
      this._super(data);
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Services = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.SidebarWidget = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Social = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.StylePanel = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {      
      this.require('jquery.cookie.js', 'plugin', 'onBinding');
      this.require('json2.js', 'plugin', 'onBinding');
      this.require('jquery.url.js', 'plugin', 'onBinding');
    },
    setCookie: function(key, value) {
      var cookie = JSON.parse($.cookie('vagenta_html')) || {};
      cookie[key] = value;
      $.cookie('vagenta_html', JSON.stringify(cookie));
    },
    readCookie: function(key) {
      var cookie = JSON.parse($.cookie('vagenta_html')) || {};
      if(key) {
        return cookie[key];
      } else {
        return cookie;
      }
    },
    reloadMod: function() {
      // to make css pie work
      $('.ie8 .mod *').each(function() {
        var klass = $(this).attr('class');
        $(this).attr('class', klass);
      });
    },
    afterBinding: function() {
      // $.cookie('vagenta_html', null);
      var $ctx = this.$ctx;
      
      if(this.readCookie('bg_pattern')) {
        $('body').removeClass(/pattern\-\d+/);
        $('body').addClass(this.readCookie('bg_pattern'));
      }
      
      if(this.readCookie('color_scheme')) {
        $('body').removeClass(/colorScheme.+/);
        $('body').addClass("colorScheme"+Tc.Utils.String.capitalize(this.readCookie('color_scheme')));
      }
      this.fire('initStyle', this.readCookie());
      this.reloadMod();
      
      if($.url().param('screenshot')) {
        $ctx.hide();
      }
    },
    onBinding: function() {
      var $ctx = this.$ctx;
      var that = this;
      
      // $ctx.css('margin-left', '0');
      
      $('.panel-container').find('.bg_pattern').click(function() {              
        that.setCookie('bg_pattern', $(this).attr('id'));        
        that.afterBinding();        
        return false;
      });
    	
      $('.panel-container').find('.color_scheme').click(function() {        
        that.setCookie('color_scheme', $(this).attr('id'));
        that.afterBinding();        
        return false;  
      });
      
      $('.switch', $ctx).toggle(
        function() {          
          $(this).removeClass('to-open');
          $(this).addClass('to-close');
          $ctx.stop().animate({"left": $('.panel-container', $ctx).outerWidth() }, {duration: 800});
        },
        function() {
          $(this).removeClass('to-close');
          $(this).addClass('to-open');
          $ctx.stop().animate({"left": "0px"}, {duration: 800});  
        }
      );      
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Tagline = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Testimonials = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
      this.require('slides.jquery.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $($ctx).slides({
        container: 'testimonials',
        effect: $.browser.msie ? 'slide' : 'fade',
        fadeSpeed: 1000,
        play: 5000,
        autoHeight: true
      });
    }
  })
})(Tc.$);
