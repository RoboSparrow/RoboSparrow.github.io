---
layout: page
title: Contact
permalink: /contact/
feature-img: "img/feature.contact.jpg"
hide: true
js:
 - js/contact.js
css:
 - css/contact.css
---

You can leave a message here. Please include your contact details.

<div id="Log"></div>
<form id="ContactForm" class="form">
    <fieldset>
        <div class="row name">
            <label for="contact[name]">Name or Email<sup>*</sup></label>
            <input name="contact[name]" type="text" placeholder="">
        </div>

        <div class="row subject">
            <label for="contact-subject">Subject<sup>*</sup></label>
            <input type="text" name="contact-subject">
        </div>
        
        <div class="row message">
            <label for="contact[message]">Message<sup>*</sup></label>
            <textarea name="contact[message]"></textarea>
        </div>
        
        <div class="row submit">
            <button type="submit">Submit</button>
        </div>
    </fieldset>
</form>
