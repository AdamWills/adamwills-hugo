+++
date = "2017-03-19T12:06:06-04:00"
title = "Discovering Hugo: Part 2 - Customizing the Workflow"
description = "How I added SASS support, image processing and svg sprites to the Victor Hugo boilerplate workflow"

+++

*[Check out Part 1 of my series on getting started with Hugo](/blog/discovering-hugo-1)*

I love automation. Task runners and now module bundlers have become an essential part of building sites for me. Whether it's using CSS preprocessors to help speed up writing CSS or concatenating and minifying JS files, tools that help me produce a project faster is something I have come to rely on. When I discovered that Netlify provides a boilerplate for Hugo sites that includes some of this automation, I knew that I had to give it a try.

Out of the box, [Victor Hugo](https://github.com/netlify/victor-hugo) (Netlify's hugo boilerplate, named after the French novelist of the same name, who's most famous works include Les Misérables and The Hunchback of Notre-Dame), comes with [Gulp](http://gulpjs.com/) and [Webpack](https://webpack.js.org/) to help with your asset pipeline.

## Looking at the gulpfile.js

Victor Hugo comes with a [few gulp tasks](https://github.com/netlify/victor-hugo/blob/master/gulpfile.babel.js) already set up.

The `css` task uses postcss to help you write modern CSS that browsers don't quite support yet ([cssnext](http://cssnext.io/)) and replaces `@import` content with the actual code that it's importing (remember - using @import in plain CSS makes an additional http request).

The `js` task fires up webpack to bundle up your javascript.

Finally, there's a `server` task that uses Browsersync on top of the default hugo server for that lovely CSS injection and auto-reloading that browsersync provides.

This is a great start - but there's a couple things missing that I felt that I wanted for my site to really make it work for me:

1. ability to use SASS
2. image optimization and automation
3. SVG handling

## Adding SASS support

I love writing in [SASS](http://sass-lang.com/). Variables, partials, mixins and nesting help me write CSS incredibly quickly - and efficiency is essential in getting products out the door quickly.

So, by tweaking the `css` task a bit, I was able to easily get up and running with SASS.

First, I needed to add the right packages I needed (I'm using yarn instead of npm):

{{< prism bash >}}yarn add gulp-sass autoprefixer gulp-cssnano{{< /prism >}}

* gulp-sass takes care of processing our SASS into CSS
* autoprefixer handles worrying about vendor prefixes like -webkit and -moz (which are becoming less common nowadays)
* cssnano handles minifying our CSS files

Now, we need to configure our gulpfile to incorporate these new tools. My gulpfile.js file now includes:

{{< prism javascript >}}import autoprefixer from "autoprefixer";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import cssNano from "gulp-cssnano";
...

gulp.task("css", () => (
  gulp.src("./src/scss/*.scss")
    .pipe(sass({
      outputStyle:  "nested",
      precision: 10,
      includePaths: ["node_modules"],
    }))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cssNano())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));{{< /prism >}}

Note: I added node_modules into my includePaths so I can easily include SASS files from libraries that I've installed through npm/yarn. Comes in pretty handy.

## Image optimization

As I am going to be posting some of [my photos](/photography) here and there on my site, having responsive images that are compressed is pretty important to me. Sure, I could do some of these things in Photoshop with some of the more modern export tools available to me - but having my assets pipeline handle things is way easier.

Here is my current process for getting a responsive image up on my site:

1. Export an image from Lightroom/Photoshop into my src/img folder
2. Gulp handles creating responsive versions of that image (small, small retina, regular, regular retina)
3. The build process (only ran during deployment) compresses those images, reducing the image size but retaining quality

Let's take a peek at how I got there.

For the responsive image portion, I'm using [gulp-responsive](https://github.com/mahnunchik/gulp-responsive). So, to install this in our project, we run:

{{< prism bash >}}yarn add gulp-responsive{{< /prism >}}

And my gulpfile now includes:

{{< prism javascript >}}import responsive from "gulp-responsive";
...

gulp.task("img", () =>
  gulp.src("./src/img/**.*")
    .pipe(responsive({
      "*": [{
        width: 480,
        rename: {suffix: "-sm"},
      }, {
        width: 480 * 2,
        rename: {suffix: "-sm@2x"},
      }, {
        width: 675,
      }, {
        width: 675 * 2,
        rename: {suffix: "@2x"},
      }],
    }, {
      silent: true      // Don't spam the console
    }))
    .pipe(gulp.dest("./dist/img")
));
{{< /prism >}}

So now, for each image in my src/img directory, 4 images get created. Then, using a shortcode (which I'll post about later), I can easily create responsive images in my content.

We have a separate task for the build process, as I don't really care about the compression during my local development. The image compression uses [imagemin](https://github.com/imagemin/imagemin) and a few of their plugins (depending on the filetypes). So, let's install those.

{{< prism bash >}}yarn add gulp-imagemin imagemin-mozjpeg{{< /prism >}}

And our image build task in our gulpfile.js:

{{< prism javascript >}}import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";
...

gulp.task("img:build", ["img"], () =>
  gulp.src(["./dist/img/*.{jpg,png,gif,svg}"])
    .pipe(imagemin([
      imagemin.gifsicle(),
      imagemin.optipng(),
      imagemin.svgo(),
      mozjpeg(),
    ]))
    .pipe(gulp.dest("./dist/img"))
);
{{< /prism >}}

Here, we're taking the images that the previous `img` task built and running them through our various compression tools:

* gifsicle for gifs
* optipng for png
* svgo for svg
* mozjpeg for jpegs

Let's take a look at the compression used for my photo here of Anneke van Giersbergen:

{{< img src="/img/anneke" type="jpg" alt="" caption="Anneke van Giersbergen - Tuska 2015" >}}

|File|Original file size|Compressed file size|% savings|
|----|----|----|-----|
|anneke-sm.jpg|12.56k|10.71k|14.7%|
|anneke-sm@2x.jpg|36.61k|30.34k|17.1%|
|anneke.jpg|21.69k|18.14k|16.3%|
|anneke@2x.jpg|64.23k|52.92k|17.6%|

Roughly 16% savings of bandwidth that our user doesn't have to deal with at such little effort? Sounds like a win to me.

## Working with SVG

Any time a logo or icon comes up, I always ensure that I'm using an SVG. Why? With SVGs being vector images, they're scalable to any size and resolution of screen; not to mention how small they are in relation to png files. Throw in the ability to interact with them via CSS and/or JavaScript? It's silly not to use them in today's web.

There's quite a few ways to use SVGs on the web though. As my goal is to make my site as performant as possible, I decided to go with [the SVG sprite approach]()https://css-tricks.com/svg-symbol-good-choice-icons/. Compile all of my SVG logos into a single file, then simply reference them whenever they're needed. No extra http requests required.

Let's add an svg task to our gulpfile to do the legwork for us.

First, let's install gulp-svg-sprite:

{{< prism bash >}}yarn add gulp-svg-sprite{{< /prism >}}

Now, let's create our task:

{{< prism javascript >}}import svgSprite from "gulp-svg-sprite";
...

gulp.task("svg", () =>
  gulp.src("src/svg/*.svg")
    .pipe(svgSprite({
      mode: {
        inline: true,
        symbol: true
      },
      svg: {
        xmlDeclaration: false,
      }
    }))
    .pipe(gulp.dest("./site/layouts/partials"))
);
{{< /prism >}}

Now, all of our svg files that land in our src/svg folder get added to a single file. As we're throwing the result into our partials folder, it becomes very easy to throw it in our template. I'm adding it to my `layouts/partials/footer.html` like so:

{{< prism go >}}{{ partial "symbol/svg/sprite.symbol.svg" . }}{{< /prism >}}

When generating the sprite file, it gives each icon an id that matches the name of the file. So, if your file is github.svg, you can reference that icon using the id of `github`.

Once our sprite is in place, we can show our icons anywhere on our site using the `svg use` element as so:

{{< prism html >}}<svg class="icon"><use xlink:href="#github" /></svg>{{< /prism >}}

## Whew...

While it seems like a lot, it was gradual tweaking that happened as needs arose. While I knew there were things missing in the original workflow that I would want, I waited until there was a need in my project to set them up. Otherwise, I would end up in configuration paralysis - something we all get ourselves caught up in when starting something new. Even as I wrote this, there were tweaks that I made to my workflow.

If you have any feedback, I'd love to hear it. Feel free to [tweet at me](https://twitter.com/adamwillsdev).
