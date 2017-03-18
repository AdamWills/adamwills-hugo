+++
date = "2017-03-11T13:54:58-05:00"
title = "Photography"
description = "View some of Adam's favourite photos that he's taken over the years taken at concerts and festivals from across the world."
email = "adam@adamwills.com"
author = "Adam Wills"

[menu.main]
  name   = "Photography"
  weight = 80

+++

Over the years, I've had the privilege to shoot some amazing bands at some wonderful festival and venues. Here's a few of my favourite shots.

If you're interested in hiring me to shoot for you, [shoot me a line](/contact.html).

<!--more-->

{{< img src="/img/ascendia" type="jpg" alt="" caption="Ascendia - ProgPower 2016" >}}

{{< img src="/img/green-carnation" type="jpg" alt="" caption="Green Carnation - ProgPower 2016" >}}

{{< img src="/img/alice-cooper" type="jpg" alt="" caption="Alice Cooper - Tuska 2015" >}}

{{< img src="/img/amorphis" type="jpg" alt="" caption="Amorphis - Tuska 2015" >}}

{{< img src="/img/anneke" type="jpg" alt="" caption="Anneke van Giersbergen - Tuska 2015" >}}

{{< img src="/img/loudness" type="jpg" alt="" caption="Loudness - Tuska 2015" >}}

{{< img src="/img/sabaton" type="jpg" alt="" caption="Sabaton - Tuska 2015" >}}

{{< img src="/img/abbath" type="jpg" alt="" caption="Abbath - Heavy Montreal 2015" >}}

{{< img src="/img/gorguts" type="jpg" alt="" caption="Gorguts - Heavy Montreal 2015" >}}

{{< img src="/img/ihsahn" type="jpg" alt="" caption="Ihsahn - Heavy Montreal 2015" >}}

{{< img src="/img/Faith-No-More-1" type="jpg" alt="Faith No More" caption="Faith No More - Heavy Montreal 2015" >}}

{{< img src="/img/neurosis" type="jpg" alt="" caption="Neurosis - Heavy Montreal 2015" >}}


<script>!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.LazyLoad=b()}(this,function(){function a(a,b,c){function d(){return window.innerWidth||l.documentElement.clientWidth||document.body.clientWidth}function e(){return window.innerHeight||l.documentElement.clientHeight||document.body.clientHeight}function f(a){return a.getBoundingClientRect().top+m-l.documentElement.clientTop}function g(a){return a.getBoundingClientRect().left+n-l.documentElement.clientLeft}function h(){var d;return d=b===window?e()+m:f(b)+b.offsetHeight,d<=f(a)-c}function i(){var e;return e=b===window?d()+window.pageXOffset:g(b)+d(),e<=g(a)-c}function j(){var d;return d=b===window?m:f(b),d>=f(a)+c+a.offsetHeight}function k(){var d;return d=b===window?n:g(b),d>=g(a)+c+a.offsetWidth}var l,m,n;return l=a.ownerDocument,m=window.pageYOffset||l.body.scrollTop,n=window.pageXOffset||l.body.scrollLeft,!(h()||j()||i()||k())}function b(){var a=new Date;return a.getTime()}function c(a,b){var c,d={};for(c in a)a.hasOwnProperty(c)&&(d[c]=a[c]);for(c in b)b.hasOwnProperty(c)&&(d[c]=b[c]);return d}function d(a){return Array.prototype.slice.call(a)}function e(a,b){var c=a.parentElement;if("PICTURE"===c.tagName)for(var d=0;d<c.children.length;d++){var e=c.children[d];if("SOURCE"===e.tagName){var f=e.getAttribute("data-"+b);f&&e.setAttribute("srcset",f)}}}function f(a,b,c){var d=a.tagName,f=a.getAttribute("data-"+c);if("IMG"===d){e(a,b);var g=a.getAttribute("data-"+b);return g&&a.setAttribute("srcset",g),void(f&&a.setAttribute("src",f))}return"IFRAME"===d?void(f&&a.setAttribute("src",f)):void(f&&(a.style.backgroundImage="url("+f+")"))}function g(a,b){return function(){return a.apply(b,arguments)}}function h(a){this._settings=c(i,a),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=g(this.handleScroll,this),window.addEventListener("resize",this._handleScrollFn),this.update()}var i={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null};return h.prototype._showOnAppear=function(a){function b(){a.removeEventListener("load",c),a.classList.remove(d.class_loading),d.callback_error&&d.callback_error(a)}function c(){null!==d&&(d.callback_load&&d.callback_load(a),a.classList.remove(d.class_loading),a.classList.add(d.class_loaded),a.removeEventListener("load",c),a.removeEventListener("error",b))}var d=this._settings;"IMG"!==a.tagName&&"IFRAME"!==a.tagName||(a.addEventListener("load",c),a.addEventListener("error",b),a.classList.add(d.class_loading)),f(a,d.data_srcset,d.data_src),d.callback_set&&d.callback_set(a)},h.prototype._loopThroughElements=function(){var b,c,d=this._settings,e=this._elements,f=e?e.length:0,g=[];for(b=0;b<f;b++)c=e[b],d.skip_invisible&&null===c.offsetParent||a(c,d.container,d.threshold)&&(this._showOnAppear(c),g.push(b),c.wasProcessed=!0);for(;g.length>0;)e.splice(g.pop(),1),d.callback_processed&&d.callback_processed(e.length);0===f&&this._stopScrollHandler()},h.prototype._purgeElements=function(){var a,b,c=this._elements,d=c.length,e=[];for(a=0;a<d;a++)b=c[a],b.wasProcessed&&e.push(a);for(;e.length>0;)c.splice(e.pop(),1)},h.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._handleScrollFn))},h.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._handleScrollFn))},h.prototype.handleScroll=function(){var a,c,d;this._settings&&(c=b(),d=this._settings.throttle,0!==d?(a=d-(c-this._previousLoopTime),a<=0||a>d?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=c,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(g(function(){this._previousLoopTime=b(),this._loopTimeout=null,this._loopThroughElements()},this),a))):this._loopThroughElements())},h.prototype.update=function(){this._elements=d(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},h.prototype.destroy=function(){window.removeEventListener("resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},h});
</script>
<script>
const myLazyLoad = new LazyLoad();
</script>