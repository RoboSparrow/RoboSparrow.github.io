/* jshint es3: true */

// @TODO: gonna clean this up!
(function(window, document){
    'use strict';

    var FlickrApi = {

        tags: function(tags, tagString){
            var _tags = tagString.split(' ');
            for(var i = 0; i < _tags.length; i++){
                if(tags.indexOf(_tags[i]) < 0){
                    tags.push(_tags[i]);
                }
            }
            return tags;
        },

        url: function(endpoint, args) {
            var query = [];
            for(var key in args){
                query.push(encodeURIComponent(key) + "=" + encodeURIComponent(args[key]));
            }
            return (query.length) ? endpoint + '?' + query.join("&") : url;
        },

        jsonp: function(endpoint, query, callback){
            query = query || {};
            query.format = 'json';
            query.jsoncallback = callback;
            var script= document.createElement('script');
            script.src = FlickrApi.url(endpoint, query);
            document.head.appendChild(script);
        },
        
        // strip flickr author format, e.g. `nobody@flickr.com (<username>)`
        getAuthor: function(str){
            var regExp = /\(([^)]+)\)/;
            var matches = regExp.exec(str);
            if(matches && matches.length > 0){
                return matches[1];
            }
            return str;
        },

        PhotosPublic: {
            render: function(json){

                if(!document.getElementById('FlickrPublicPhotos')){
                    return;
                }
                var tags = [];

                var renderImg = function(node, item){
                    var image = new Image();
                    image.src = item.media.m;
                    image.onload = function(){
                        var html = [];
                        html.push('<figure>');
                        html.push('<a href="'+ item.link +'" target="_blank">');
                        html.push('<img src="' + this.src + '" alt="'+ item.title +'">');
                        html.push('</a>');

                        html.push('<figcaption>');
                        if(item.title){
                            html.push('<span class="line">' + item.title + '</span>');
                        }
                        //html.push('<small class="line"><u>by:</u> ' + FlickrApi.getAuthor(item.author) + '</small>');
                        if(item.tags){
                            html.push('<small class="line"><u>tags:</u> ' + item.tags + '</small>');
                        }
                        html.push('</figcaption>');
                        html.push('</figure>');
                        node.innerHTML = html.join("\n");
                        node.className += ' loaded';

                    };
                };

                var tagEvents = function(element){
                    element.addEventListener('change', function(e) {
                        e.preventDefault();
                        var tag = e.target.value;
                        var nodes = document.querySelectorAll('.flickr-gallery .item');
                        for(var i = 0; i < nodes.length; i++){
                            if(tag === '<all>'){
                                nodes[i].style.display = 'inline-block';
                                continue;
                            }
                            if(nodes[i].dataset.tags && nodes[i].dataset.tags.indexOf(tag) > -1){
                                nodes[i].style.display = 'inline-block';
                                continue;
                            }
                            nodes[i].style.display = 'none';
                        }
                    }, false);
                };

                var wrapper = document.createElement('ul');
                wrapper.className = 'flickr-gallery';
                document.getElementById('FlickrPublicPhotos').innerHTML = null;
                document.getElementById('FlickrPublicPhotos').appendChild(wrapper);

                for(var i = 0; i < json.items.length; i++){
                    var node =  document.createElement('li');
                    node.className = 'item';
                    if(json.items[i].tags){
                        tags = FlickrApi.tags(tags, json.items[i].tags);
                        node.dataset.tags = json.items[i].tags;
                    }
                    wrapper.appendChild(node);
                    renderImg(node, json.items[i]);
                }

                var tagSelector = document.createElement('select');
                tagSelector.innerHTML += '<option value="<all>">Any tag</option>';
                for(var k = 0; k < tags.length; k++){
                    tagSelector.innerHTML += '<option value="' + tags[k] + '">' + tags[k] + '</option>';
                }
                tagEvents(tagSelector);
                wrapper.parentNode.insertBefore(tagSelector, wrapper.parentNode.firstChild);
            },

            get: function(query, callback){
                query = query || {};
                FlickrApi.jsonp('https://api.flickr.com/services/feeds/photos_public.gne', query, callback);
            }
        }

    };

    window.FlickrApi = FlickrApi;
    window.FlickrApi.PhotosPublic.get({id: '26912394@N00'}, 'FlickrApi.PhotosPublic.render');

}(window, document));
