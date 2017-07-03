+++
date = "2017-03-18T14:31:41-04:00"
title = "Discovering Hugo: Part 1"
description = "Documenting my journey into building a new site with Hugo"
+++

Every developer does this - every now and again, they attempt to redo their own website. There's lots of reasons why we do this; sometimes it's because our existing site is looking dated; sometimes we feel that our current site doesn't reflect who we are anymore; and sometimes it's because we want to try out some new technology. In my case, I was feeling all three.

My previous site was built on [WordPress](https://wordpress.org/). I do love WordPress, I really do. I recommend it to any client that wants to maintain the contents of their own site. It's easy to use, it's extremely extendable, and it's a pleasure to build on. But, I felt like I wanted to change things up.

Performance has become something I've been very interested in the past couple of years. Ensuring that sites load quickly is something I find really important. We've all been in situations where we've been on spotty wifi or only had a couple bars on our cell-phone - and a site that we really needed at the time just wasn't accessible.

WordPress can be made to load fast - but it takes work. Caching can be a little tedious at times. I rarely have the time to keep my site updated, nevermind the time it takes to make my personal site purr (my wonderful clients get all of my attention in my "free" time).

So, I was on the market for something new. Something quick and easy. Also, new technology is fun.

## Enter the static site generator

I've been thinking about using a static site generator for awhile now. The idea of an entire site being able to run without a database opens up a lot of possiblities for getting a site up and running really quickly with some serious hosting behind it ([see Github pages](https://pages.github.com/)).

[Jekyll](https://jekyllrb.com/) is the most well-known static site generator out there. I've played around with it before - it seemed fine. But I came across a newer kid on the block that piqued my interest - [Hugo](https://gohugo.io/).

## Hugo

What I liked about Hugo - is its simplicity. Rather than finicking around with Ruby versions and Jekyll, Hugo comes as a cross-platform executable. One [quick download](https://gohugo.io/overview/quickstart/#step-1-install-hugo), a quick command to scaffold out a new site and a built in server to serve the site? Within minutes, I was up and running.

A few days later, with plenty of mucking around (which I'll document over the next little while), I have a performant new site with continuous deployment to a CDN (not to mention HTTPS) - all for free (thanks [Netlify](https://www.netlify.com/) - you've been great so far)!

Initial thoughts on Hugo? I'm really digging it. I've incorporated a build process (Gulp, SASS, webpack); the learning curve was relatively easy; the documentation is pretty good; and with [Smashing Magazine adopting it](https://next.smashingmagazine.com/2017/03/a-little-surprise-is-waiting-for-you-here--meet-the-next-smashing-magazine/) for their redesign, I have a feeling that we're going to start seeing instances of Hugo sites out there.

Check out [part 2 of my discovering Hugo series](/blog/discovering-hugo-2-workflow) where I look at customizing a workflow that includes compiling SASS, image optimization and SVG sprites.
