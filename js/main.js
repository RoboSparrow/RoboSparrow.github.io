var elements = document.getElementsByTagName('script')

Array.prototype.forEach.call(elements, function(element) {
  if (element.type.indexOf('math/tex') != -1) {
     // Extract math markdown
     var textToRender = element.innerText || element.textContent;

     // Create span for KaTeX
     var katexElement = document.createElement('span');

     // Support inline and display math
     if (element.type.indexOf('mode=display') != -1){
       katexElement.className += "math-display";
       textToRender = '\\displaystyle {' + textToRender + '}';
     } else {
       katexElement.className += "math-inline";
     }

     katex.render(textToRender, katexElement);
     element.parentNode.insertBefore(katexElement, element);
  }
});


(function(window){
    'use strict';

    // @sse https://developer.mozilla.org/en/docs/Web/API/Element/classList
    if (!("classList" in document.createElement("_"))) {
        return;
    }

    var header = document.querySelector('.site-header');
    header.classList.add('js-scroll');

    var limit = header.offsetHeight;
    document.querySelector('.content').style.paddingTop = limit + 'px';

    window.addEventListener('scroll', function(e){

        var scrolled = window.pageYOffset || document.documentElement.scrollTop;

        if (scrolled > limit) {
            header.classList.add('js-shrink');
        } else {
            header.classList.remove('js-shrink');
        }
    });

}(window));
