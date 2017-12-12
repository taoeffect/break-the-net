(function () {
  console.log('loading...');
  _bftn_options = {
    iframe_path: 'saveme.html'
  };

  var _bftn_util = {
    injectCSS: function(id, css) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.id = id;
      if (style.styleSheet) style.styleSheet.cssText = css;
      else style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    },

    createIframe: function(id, src) {
      var wrapper = document.createElement('div');
      wrapper.id = '_bftn_wrapper';
      var iframe = document.createElement('iframe');
      iframe.id = id;
      iframe.src = src;
      iframe.frameBorder = 0;
      iframe.allowTransparency = true;
      // iframe.style.display = 'none';
      wrapper.appendChild(iframe);
      document.body.appendChild(wrapper);
      return wrapper;
    },

    destroyIframe: function() {
      var iframe = document.getElementById('_bftn_wrapper');
      iframe.parentNode.removeChild(iframe);
    }
  }

  function onDomContentLoaded() {
    console.log('onDomContentLoaded')
    _bftn_util.injectCSS('_bftn_iframe_css', '#_bftn_wrapper { position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 20000; -webkit-overflow-scrolling: touch; overflow-y: auto; } #_bftn_iframe { width: 100%; height: 100%;  }');
    _bftn_util.createIframe('_bftn_iframe', _bftn_options.iframe_path)
  }

  // Wait for DOM content to load.
  switch(document.readyState) {
    case 'complete':
    case 'loaded':
    case 'interactive':
      onDomContentLoaded();
      break;
    default:
      if (typeof document.addEventListener === 'function') {
        document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);
      }
  }
})();
