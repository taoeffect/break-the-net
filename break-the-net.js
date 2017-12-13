// with some inspiration from: https://github.com/fightforthefuture/battleforthenet-widget
(function () {
  // var iframe_path = 'https://okturtles.com/widgets/btn/break-the-net.html'
  var iframe_path = window.location.origin === 'file://' ? 'break-the-net.html' : 'https://okturtles.com/widgets/btn/break-the-net.html'
  function injectCSS (id, css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    if (style.styleSheet) style.styleSheet.cssText = css;
    else style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }
  function createIframe (id, src) {
    var wrapper = document.createElement('div');
    wrapper.id = '_ktn_wrapper';
    var iframe = document.createElement('iframe');
    iframe.id = id;
    iframe.src = src;
    iframe.frameBorder = 0;
    iframe.allowTransparency = true;
    // iframe.scroll = 'no';
    wrapper.appendChild(iframe);
    document.body.appendChild(wrapper);
    return wrapper;
  }
  function onDomContentLoaded() {
    injectCSS('_ktn_iframe_css', '#_ktn_wrapper { position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 999999999; -webkit-overflow-scrolling: touch; overflow: hidden; } #_ktn_iframe { width: 100%; height: 100%;  }');
    var wrapper = createIframe('_ktn_iframe', iframe_path)
    // from: https://davidwalsh.name/window-iframe
    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(messageEvent,function(e) {
      // console.log('parent received message!:', e.data)
      var height = e.data
      wrapper.style.minHeight = Math.max(window.innerHeight, height) + 'px'
    }, false)
  }
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
