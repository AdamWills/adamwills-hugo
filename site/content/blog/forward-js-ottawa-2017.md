+++
title = "Notes from Forward JS Ottawa 2017"
date = "2017-04-09T16:53:09-04:00"
description = "My notes from the 2017 edition of ForwardJS Ottawa, a conference all about JavaScript"

+++

{{< img src="/img/adobe-window" type="jpg" alt="Window from the Adobe Conference Center, covered with Creative Cloud icons"  >}}

This past week I attended the first [ForwardJS Ottawa](https://forwardjs.com/ottawa) conference - the first venture into Canada from the San Francisco based event. Held at the Adobe Conference Centre downtown, it was an intimate affair with some great talks from some knowledgable speakers.

Here's a quick recap from my notes...

## Developing Desktop Apps with Electron & Ember

*Talk by [Aidan Nulman](https://twitter.com/anulman)*

* electron architecture helps manage security and memory leaks for you
* [electron-forge](https://beta.electronforge.io/) wraps best community build tools
* disclaimer: "serves" via fs - avoid prefixing "/" for filenames/paths
* be careful - you have full privileges of host OS
* memory leaks are a major issue (unresolved/rejected promises)
* recommend single page application frameworks for electron apps (electron-forge ships with react + ng template)
* autoupdates => signing apps is strongly encouraged, but not required
* mac + win apps can autoupdate with [Squirrel](https://github.com/Squirrel)

### Recap
This was my first dive into Electron - I've been familiar of the technology through Atom and Slack, but Aiden was able to break things down pretty clearly. While I don't use Ember myself, a lot of the information was transferrable to any single page app technology.


## Building Performant Hybrid Apps with Ember

*Talk by [Alex Blom](https://twitter.com/AlexBlom)*

* WKWebView is a newer and more performant web view (as opposed to the default UIWebView)
* Cursor pointer everything can help with weird/delayed click events
* HammerJS for touch events (but watch out for ghost clicks... click event happens after touch). disable click events.
* [Smoke & Mirrors](https://github.com/runspired/smoke-and-mirrors) - library for infinite scrolling (uses occlusion based scroll)

### Recap
Great talk from Alex, which focused a lot on the importance of performance of mobile apps. Sure, hybrid apps have a low dev entry point, but often, they feel like a web page rather than an app. Alex's tips on how to get around that were super helpful.

## Practical promises

*Talk by [Bojan Djurkovic](https://twitter.com/bojantweets)*

* Always use catch!
* [pify](https://github.com/sindresorhus/pify) for promisifying callback style functions
* [p-map](https://github.com/sindresorhus/p-map) combines promises and mapping
* [Recommended resource for learning promises](https://github.com/wbinnssmith/awesome-promises)
* [got](https://github.com/sindresorhus/got) for http requests
* Promises not available? Use [Bluebird](http://bluebirdjs.com/docs/getting-started.html)!

### Recap

I had a vague understanding of promises - but Bojan was able to really make it make sense for me. Great insight into some of the challenges in JS that can be dealt with in some practical ways.

## Label Goes Here (aka Diagrams, Motherfuckers!)

*Talk by [Sarah Groff Hennigh-Palermo](https://twitter.com/superSGP)*

* 4 spectrums of learning (sequential vs global)
* overview first, zoom and filter, then details-on-demand
* diagrams for refactoring!
* [mermaid](https://knsv.github.io/mermaid/) -> diagrams from markdown?
* drawing your own diagrams is important -> the process itself can often point out "weird" things

### Recap
Not a technical talk, but a massive amount of great information (my notes feel inadequate in hindsight) from Sarah. Visualizing workflows and functionality can not only help others who are jumping into a code base, but can be incredibly helpful in noticing inefficiences, bugs and questionable logic for yourself. The most inspiring talk of the day. 

## Breaking Down Design Patterns: Pub/Sub, Flux & Redux

*Talk by [Ryan Christiani](https://twitter.com/RChristiani)*

* Essential Reading: JavaScript Design Patterns (Addy Osmani)

### Recap
Work beckoned and my focus was pulled into Slack conversations. So instead, here's a plugin for Ryan's new book, [Let's Learn ES6](https://letslearnes6.com/). He knows his stuff.

## Building Mobile Apps with Vue.js

*Talk by [Simon MacDonald](https://twitter.com/macdonst)*

* [Framework 7!](https://framework7.io/)
* Content Security Policy!
* Live demos are tricky!
* [Slides available here](http://slides.com/simonmacdonald/building-mobile-apps-with-vue-js)

### Recap
Great presentation from Simon. Been really interested in checking out Vue.js for awhile and I like the idea of using a framework like this for hybrid mobile app development. Definitely want to try this out at some point and this will be a great intro on how to get started.

## Building Universal JavaScript Applications with React

*Talk by [Rami Sayar](https://twitter.com/macdonst)*

* Distracted by work again. Sorry, Rami.

### Recap
There's no doubt that Rami knows what he's talking about (I've seen him speak before and it was wonderful) - but between work and my lack of experience with React, I wasn't able to absorb much.

## Final words...

It's great to see new conferences popping up in Canada, and ForwardJS Ottawa was a great first edition. The space was beautiful, the speakers were all knowledgable and great speakers, and the organization was top notch. 

It was my first time in Ottawa in about 20 years, so I mostly used this as an excuse to see a little bit of the city and meet some new people - in my brief time there, I was able to do both.

Looking forward to another edition next year and will have to stay a bit longer and see more of what Ottawa has to offer.