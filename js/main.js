
(function(window){
    'use strict';
    
    //// scroll header
    // @see https://developer.mozilla.org/en/docs/Web/API/Element/classList
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
    
    //// contact
    document.addEventListener("DOMContentLoaded", function(){
        if(document.querySelector('a[title=Email]')){
            document.querySelector('a[title=Email]').addEventListener("click", function(e){
                e.preventDefault();
                window.location.href = '/contact';
            }); 
        }
    });

}(window));
