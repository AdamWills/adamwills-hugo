+++
title = "Slimming Down Bootstrap"
date = "2017-03-25T10:13:34-04:00"
description = "I dive into how you can use Bootstrap without the bloat by using their scss files."
tags = [ "gulp", "sass", "bootstrap", "performance" ]
+++

[Bootstrap](https://github.com/twbs/bootstrap). It's one of the most common and well-known code libraries on the web - which of course makes it one of the most controversial. For people who love Bootstrap, it gives them the ability to very rapidly build their product; for those who are on the other side of the fence, it leads to bloated websites that all look the same.

Like a lot things that are heavily debated, there's some compromises that I think both parties can get behind.

Note: this article is under the assumption that you're familiar with SASS.

## A closer look at Bootstrap

I've been using [Bootstrap 4](https://v4-alpha.getbootstrap.com/) for awhile now. Despite it still being in alpha, I've found some good success in using and testing it - so I'm going to focus on the newest version for this (although the same things still apply to Bootstrap 3).

If we look at the source code on Github, we see the familiar `dist` folder that contains compiled CSS and JavaScript files - but if we look a bit deeper at the `scss` and `js` folders, we seem some smaller chunks of code.

Within our `scss` folder, let's take a peek at [bootstrap.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/bootstrap.scss). What we see is a load of imports that draws in those smaller pieces of scss. Another scss file of note is the [_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss) file.

## SASS and !default

Examining the `_variables.scss` file, we notice that whenever a variable is declared, it is followed by a `!default` flag. Let's take a look at how that flag works.

Let's examine the following code - and this might be how Bootstrap most often gets used.


{{< prism scss >}}/* In Bootstrap (simplified): */
$link-color: #0275d8 !default;
...
a {
  color: $link-color;
}

/* In custom.scss */
a {
    color: #d40d0a;
}{{< /prism>}}

The downside of doing things this way is that our output is going to be twice as big as it needs to be:

{{< prism css >}}/* compiled.css: */
a { color: #0275d8; }
a { color: #d40d0a; }
{{< /prism>}}

What if we were to redefine what `$link-color` was before our code compiled? Thankfully, that's what the `!default` flag is for.

Let's examine the first line in the example above:

{{< prism scss >}}/* In Bootstrap (simplified): */
$link-color: #0275d8 !default;{{< /prism>}}

What this line says is: assign this color to $link-colour **unless it has already been defined**.

So, if we use a technique of defining a variable **before** our Bootstrap file, we can actually modify the code that Bootstrap itself outputs. 

Let's go back to our example.

{{< prism scss >}}/* In our custom _variables.scss file: */
$link-color: #d40d0a;

/* In Bootstrap (simplified): */
$link-color: #0275d8 !default;
...
a {
  color: $link-color;
}{{< /prism>}}

This will output:

{{< prism css >}}/* compiled.css: */
a { color: #d40d0a; }
{{< /prism>}}

So, we see a couple of benefits in declaring variables before including our Bootstrap `scss` files in our build process:

1. We're writing less code. Instead of overriding code, we're simply overriding variables.
2. We're outputting less code - always great for performance.

## Only using what we need

The other benefit of using Bootstrap's scss files is that we can be a little more granular with the code that we include in our project. Don't use alerts and modals? Don't include those pieces. Let's take a look at my app.scss file (my main scss file that simply imports other partial scss files):

{{< prism scss >}}@import 'variables';

// Core variables and mixins
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

// Reset and dependencies
@import "bootstrap/scss/normalize";

// Core CSS
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/images";
@import "bootstrap/scss/tables";
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/nav";
@import "bootstrap/scss/tables";
...
{{< /prism>}}

At the top of the file is my custom variables file which overrides any Bootstrap variables that are used (colours, font-sizes, etc.). Immediately following that are the specific Bootstrap files that I'm including.

My strategy for slimming down things - start with the required core components and some basic files (normalize, reboot and type) - and as I start to add content, I add related files (tables, buttons).

I can use the same techniques with Bootstrap's JavaScript files. The build process that I'm using takes advantage of webpack, which makes including pieces of JavaScript incredibly easy.

However, I'm not actually using **any** of Bootstrap's JavaScript functionality. Not that any of it is bad - at this stage of my site, there isn't a need for it.

## Results

So, while there is a little bit of work behind this - it's actually quite minimal and well worth the effort.

|Type|Bootstrap|Me|Savings|
|---|---|---|---|
|CSS|23.1KB|5.5KB|76%|
|JS|13.7KB|7.2KB|47%|

If you want to see a little more about what I'm doing, the [source code to this site is available on Github](https://github.com/AdamWills/adamwills-hugo).

## Recap

I love Bootstrap. It allows me to create sites way quicker than writing all of my CSS by hand. Could my CSS be leaner if I did so? Perhaps. But until I'm working on a site where every byte of savings helps, I'm happy with the results that I'm getting using some of the techniques outlined here. 

Balancing performance versus how much time you spend on performance is different on a project by project basis. I'd love to be able to get sites as fast as they could possibly be for every project I work on - but the reality is that it takes time; and not all clients have that time (ie budget) to work with.

So, do what you can with what you have. If you're already working on a project with a build process, taking a few steps to slim down some of the libraries you're working with can lead to some easy wins.
