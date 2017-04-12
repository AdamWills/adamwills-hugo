+++
date = "2017-03-18T15:21:36-04:00"
title = "Dealing with version conflicts between Hugo and Netlify"

+++

{{% update %}}
**Update**: Netlify has added a much easier way to specify which version of Hugo to use - details are [available here](https://www.netlify.com/blog/2017/04/11/netlify-plus-hugo-0.20-and-beyond/).
{{% /update %}}

One of the trickier issues that I dealt with when getting started with Hugo and deploying to Netlify involved what I later found out to be a conflict of versions. Netlify by default is running Hugo 0.17 - but if you're like myself and are newer to Hugo, you might be running a newer version. In my case, the newset version was 0.19.

When I was deploying to Netlify (through their pretty slick integration with Github), I kept getting issues that didn't seem related to versions - but seemed more like I had issues with my templating. In my case, I kept getting the following:

{{< prism bash nowrap >}} ERROR: 2017/03/18 02:43:09 general.go:212: Error while rendering section : template: _default/list.html:8:15: executing "_default/list.html" at <.Pages>: can't evaluate field Pages in type *hugolib.Node
{{< /prism >}}

However, whenever I built the site locally, I wasn't having any issues. After chatting with support (which was great), we concluded that it was indeed a version issue.

Thankfully, despite not running Hugo 0.19 by default, there are ways to trigger using different versions of Hugo in your specific instance.

When triggering your build command, usually `hugo build`, you could just specify (either through the web interface, or through their netlify.toml file) to specify the version. Instead of running `hugo build`, simple run `hugo0.19 build`.

As I was using their recommended boilerplate, [Victor Hugo](https://github.com/netlify/victor-hugo), to start with, I was using npm and guild to run my builds rather than the default hugo build command, which made this not quite as straight forward.

There ended up being 2 things we needed to do to get things running.

## 1. Set an environmental variable that we could use inside of our gulpfile

Once you create a site in Netlify, go to the settings page and find the **Build environment variables** field. Add a value here (I chose NETLIFY, but it doesn't really matter) - and set it to 1.

{{< img src="/img/netlify-env-variables" type="png" alt="Screenshot of the Build environment variables setting" >}}

## 2. Update your gulpfile to change the hugo binary based on the environment

Your current gulpfile (again, based on the default Victor Hugo setup), has a line something like this:

{{< prism javascript >}}const hugoBin = "hugo";{{< /prism >}}

Let's update this to take into account the environment variable that we adjusted in step 1.

{{< prism javascript >}}const hugoBin = process.env.NETLIFY ? "hugo_0.19" : "hugo";{{< /prism >}}

Now, when running the `hugo` command, locally, we'll just use `hugo`, but during the build process on Netlify, it will use `hugo0.19`. 

Compilation issues resolved!
