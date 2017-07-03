+++
date = "2017-04-30T15:58:25-04:00"
title = "Responsive Images in Hugo"
description = "How I'm using gulp and Hugo shortcodes for easy responsive images"
tags = [ "gulp", "performance", "images", "responsive", "hugo", "javascript" ]
+++

I don't have a lot of imagery on my site. My current priority here is content and performance. However, it's hard to have a photography section without images. In line with my priorities, I wanted to make sure that when I am displaying images, I'm doing them as in a way that combines quality with performance. Of course, making them easy to add to my site is always important.

So, in my new site, there were a few things that I could do to help automate things.

1. Add image resizing to my workflow
2. Use shortcodes to display images in a responsive manner
3. Lazyload images accordingly

## Automatically resize images

I talk about my [build process using gulp here](/blog/discovering-hugo-2-workflow/#image-optimization).

## Using shortcodes to display dynamic images

The [documentation on using shortcodes in Hugo](http://gohugo.io/extras/shortcodes/) is quite thorough, but we'll go through the shortcode that I'm using in some detail.

First, let's take a look at the whole thing:

{{< prism xml >}}<!-- How the shortcode is used: -->
{{&lt; img src="/img/ascendia" type="jpg" alt="" caption="Ascendia - ProgPower 2016" >}}

<!-- The shortcode functionality - in layouts/shortcodes/img.html -->
<div class="picture">
  {{ if .Get "caption"}}
  <figure>
  {{ end }}
    <picture>
      <!-- Large screens -->
      <source
        media="(min-width: 535px)"
        data-original-set="{{ .Get "src" }}.{{ .Get "type" }} 1x,
                {{ .Get "src" }}@2x.{{ .Get "type" }} 2x">
      <!-- Small screens -->
      <source
        media="(max-width: 534px)"
        data-original-set="{{ .Get "src" }}-sm.{{ .Get "type" }} 1x,
                {{ .Get "src" }}-sm@2x.{{ .Get "type" }} 2x">
      <!-- Fallback -->
      <img
        data-original="{{ .Get "src" }}.{{ .Get "type" }}"
        data-original-set="{{ .Get "src" }}@2x.{{ .Get "type" }} 2x"
        alt="{{ .Get "alt" }}"{{ if .Get "caption"}} class="img-fluid figure-img"{{ end }}>
    </picture>
  {{ if .Get "caption"}}
    <figcaption>{{ .Get "caption" }}</figcaption>
  </figure>
  {{ end }}
</div>{{< /prism >}}

Let's break this down a bit. We'll start off with the call to the shortcode - this is what I throw in my markdown posts.

{{< prism xml >}}<!-- How the shortcode is used: -->
{{&lt; img src="/img/ascendia" type="jpg" alt="" caption="Ascendia - ProgPower 2016" >}}{{< /prism >}}

This is a custom shortcode, so all of the naming and parameters are arbitrary - this isn't a default Hugo feature. I'm using a shortcode that I've named `img` along with a number of parameters - the path of the image, the type of image, alt text, and a caption. In this example, I'm using a blank alt text as I'm supplying a caption instead - there's no reason to duplicate content.

Let's walk through what's happening in the shortcode itself.

{{< prism xml >}}{{ if .Get "caption"}}
  <figure>
{{ end }}
...
{{ if .Get "caption"}}
    <figcaption>{{ .Get "caption" }}</figcaption>
  </figure>
{{ end }}{{< /prism >}}

If we supply a caption parameter in our shortcode, we're going to use the [figure element](https://developer.mozilla.org/en/docs/Web/HTML/Element/figure) to group the image along with the related caption (using the [figcaption element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)). You can see that the `.Get "parameter-name"` gets the value of a parameter supplied by the shortcode call. 

{{< prism xml >}}<picture>
    <!-- Large screens -->
    <source
    media="(min-width: 535px)"
    data-original-set="{{ .Get "src" }}.{{ .Get "type" }} 1x,
            {{ .Get "src" }}@2x.{{ .Get "type" }} 2x">
    <!-- Small screens -->
    <source
    media="(max-width: 534px)"
    data-original-set="{{ .Get "src" }}-sm.{{ .Get "type" }} 1x,
            {{ .Get "src" }}-sm@2x.{{ .Get "type" }} 2x">
    <!-- Fallback -->
    <img
    data-original="{{ .Get "src" }}.{{ .Get "type" }}"
    data-original-set="{{ .Get "src" }}@2x.{{ .Get "type" }} 2x"
    alt="{{ .Get "alt" }}"{{ if .Get "caption"}} class="img-fluid figure-img"{{ end }}>
</picture>{{< /prism >}}

Now, we're using the [picture element](https://developer.mozilla.org/en/docs/Web/HTML/Element/picture) to actually display the image itself.

We are supplying 2 sources - one for smaller devices and one for other devices. Within each source, we're also supplying both a retina version and standard resolution to ensure that our images look crisp when needed.

You'll notice that our shortcode doesn't actually supply a `src` or `srcset` parameter though - which is what actually outputs the image. We'll get to that in the next section about lazy loading.

The 3rd element - the `img` element - is just for IE, as IE doesn't support the picture element properly - so the normal image should just show.

So, in short, using Hugo shortcodes turns our simple, one-line image code into a complex, responsive image. Having to retype or copy/paste all of the code for a responsive image can be quite tedious and error-prone, so automation is key.

## Lazyloading images

On pages with a large number of images, having users load every image at once can really slow down the user's experience. And if the user isn't actually going to scroll through all of your images, having them load them all can be a bit of a waste. Lazyloading has been around for awhile, and there's a large number of libraries that have matured over the years.

I needed something that also worked with responsive images - and Andrea Verlicchi's [Vanilla Lazyload](https://github.com/verlok/lazyload) library does this well.

I've included the library as a script in my build process then it's just a single line to implement:

{{< prism javascript >}}const myLazyLoad = new lazyLoad();{{< /prism >}}

For more on using the library, head over and check out the documentation.

## Wrapping up

While this seems like a lot of work, this is another case of taking some time up front to save you the time down the road.

You can always view the [full source code](https://github.com/AdamWills/adamwills-hugo) for my site over on Github.
