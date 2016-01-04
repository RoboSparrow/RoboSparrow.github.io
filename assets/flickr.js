(function(){

   //// Exposing the username and password here is only for demonstration
   //// and of course extremely unsafe.
   ///// In production mode hide this in a cookie or a middleware
   var FlickrApi = function(userId){

        var config = {
            userId: '26912394@N00'
        };

        var url = function(endpoint, args) {
            var query = [];
            for(var key in args){
                query.push(encodeURIComponent(key) + "=" + encodeURIComponent(args[key]));
            }
            return (query.length) ? endpoint + '?' + query.join("&") : url;
        };

        var request = function(endpoint, query, onSuccess, onError){

            var result;

            query = query || {};
            query.format = 'json';

            onSuccess = onSuccess || function(){};
            onError =  onError || function(){};

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url(endpoint, query));
            xhr.setRequestHeader('Accept', '*/*');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4){
                    if(xhr.status === 200){
                        try{
                            result = JSON.parse(xhr.responseText);console.log(response.statements.length);
                            onSuccess(result);
                        }catch(e){
                            console.error(e.message);
                            onError(e.message);
                        }
                    }else{
                        var msg = 'XHR response error' + xhr.status + ': ' + xhr.responseText;
                        console.error(msg);
                        onError(msg);
                    }
                }
            };
            xhr.send();
        };

        var Get = {
            photosPublic: function(query, onSuccess, onError){
                query = query || {};
                query.id = config.userId;
                request('https://api.flickr.com/services/feeds/photos_public.gne', query, onSuccess, onError);
            }
        };

        return {
            Get: Get,
            request:request
        };
   };

    document.addEventListener('DOMContentLoaded', function() {
        if(document.getElementById('FlickrPublicPhotos')){
            FlickrApi().Get.photosPublic(null, function(json){
                var html = ['<ul>'];
                for(var i = 0; i < json.items.length; i++){
                    html.push('<li>');
                    html.push('<a href="'+ json.items[i].link +'" target="_blank">');
                    html.push('<img src="' + json.items[i].media + '" titl ="'+ json.items[i].title +' alt="'+ json.items[i].title +'">');
                    html.push('</a>');
                    html.push('</li>');
                }
                html.push('</ul>');
                document.getElementById('FlickrPublicPhotos').innerHTML = html.join("\n");
            });
        }
    });


}());
