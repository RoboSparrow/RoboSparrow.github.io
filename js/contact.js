/* jshint es3: true */

(function(window, document){
    'use strict';

    var endpoint = 'http://www.boeselt.net/Api/Mail.php';
    var enabled = true;
    
    var nodes  = {
        form: null,
        log: null
    };
    
    var Log =  {
        notice: function(message, clear){
            clear = clear || false;
            if(clear){
                this.clear();
            }
            nodes.log.innerHTML += '<div class="entry notice">' + message + '</div>';
        },
        success: function(message, clear){
            clear = clear || false;
            if(clear){
                this.clear();
            }
            nodes.log.innerHTML += '<div class="entry success"><i class="fa fa-check-circle"></i> ' + message + '</div>';
        },
        error: function(message, clear){
            clear = clear || false;
            if(clear){
                this.clear();
            }
            nodes.log.innerHTML += '<div class="entry error"><i class="fa fa-exclamation-circle"></i> ' + message + '</div>';
        },
        clear: function(){
            nodes.log.innerHTML = null;
        }
    };
    
    var serialize = function(data) {
        var query = [];
        for(var key in data){
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return (query.length) ? query.join("&") : null;
    };
    
    var validate = function(formData){
        var errors = 0;
        if(!formData.get('contact[name]')){
            Log.error('Name field is required.');
            errors++;
        }
        if(!formData.get('contact[message]')){
            Log.error('Message field is required.');
            errors++;
        }
        
        return errors;
    }
    
    var removeForm = function(){
        nodes.form.parentNode.removeChild(nodes.form);
        nodes.form = null;
    };
    
    var onSuccess = function(){
        var node = document.createElement('p');
        node.innerHTML = '<a href="' + window.location.href +'">Send another message</a>';
        nodes.form.parentNode.insertBefore(node, nodes.form);
        removeForm();
    };
    
    var onSubmit = function(e){
        e.preventDefault();
        
        var form = e.target;
        var data = new FormData(form);
        
        if(validate(data) > 0){
            return;
        }
        Log.notice('<i class="fa fa-cog fa-spin"></i> Sending message..', true);
        
        var request = new XMLHttpRequest();
        request.open('POST', endpoint);
        request.send(data);
   
        request.onload = function(e) {
            if (request.status == 200) {
                Log.success('Thanks, your message has been sent.', true);
                onSuccess();
            } else {
                Log.error('Error: [' + request.status + '] ' + request.responseText, true);
            }
        };

    }; 
      
    document.addEventListener("DOMContentLoaded", function(){
        nodes.form = document.getElementById('ContactForm');
        nodes.log = document.getElementById('Log');
        
        if(typeof window.FormData === 'undefined' || typeof document.querySelector === 'undefined' ){
            Log.error('This form is <strong>disabled</strong>. You are using an older (and potentially unsafe) browser');
            removeForm();
        }

        if(nodes.form && enabled){
            nodes.form.addEventListener("submit", onSubmit, false); 
        }
        if(nodes.form && !enabled){
            nodes.form.addEventListener("submit", onSubmit, false); 
        }
    });
    
}(window, document));
