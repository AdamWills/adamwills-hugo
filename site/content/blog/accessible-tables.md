+++
date = "2017-03-11T14:03:37-05:00"
title = "Creating Accessible HTML Tables Without Knowing HTML"
description = "Ever need to build an accessible HTML but didn't know how? Here's a great place to start!"

+++

Part of the benefit of using a content management system like WordPress is that users don’t need to rely on anyone else to update their content or have any knowledge of HTML, the language of the web. This works great in most situations, but what happens when there’s some nuances that users aren’t able to do themselves without having an intermediate knowledge of HTML?

<!--more-->

A recent problem arose, where users needed to create some tables on their page, but to maintain a level of accessibility. The default WordPress editor doesn’t even have a feature to create tables.  Sure, we could install TinyMCE Advanced and have users generate tables that way – but it still doesn’t give the tables the accessibility features that are required.

## Hang on a second – what exactly makes an table accessible?

### Captions

While captions aren’t required to make an HTML table accessible, they can help. A caption is simply a summary of the contents of the table. The caption is the first inside of the table element, as follows:

{{< prism html >}}<table>
    <caption>Field Goal Percentage over the last 3 years</caption>
    ...
{{< /prism >}}


### Row and Column Headings

The more important part in making an HTML table accessible is to define the column and row headings. This allows screen reader users to make sense of tables and repeat the heading names with each table cell. For example, take the table below:

|Player|2012|2011|2010|
|------|----|----|----|
|LeBron James|56.5%|53.1%|51.0%|
|James Harden|45.2%|43.8%|49.1%|
|Kevin Durant|51.0%|49.6%|46.2%|

#### Inaccessible Table HTML
{{< prism html >}}<table class="table">
    <tr>
      <td>Player</td><td>2012</td><td>2011</td><td>2010</td>
    </tr>
    <tr>
      <td>LeBron James</td><td>56.5%</td><td>53.1%</td><td>51.0%</td>
    </tr>
    <tr>
      <td>James Harden</td><td>45.2%</td><td>43.8%</td><td>49.1%</td>
    </tr>
    <tr>
      <td>Kevin Durant</td><td>51.0%</td><td>49.6%</td><td>46.2%</td>
    </tr>
  </table>
{{< /prism >}}

The table above while technically correct, doesn’t have the row and column headings defined. So, when a screen reader begins to read out the table data, it does so from top to bottom, left to right.

>Table with four columns and four rows. Player, 2012, 2011, 2010. LeBron James, 56.5%, 53.1%, 51.0%. James Harden, 45.2%, 43.8%, 49.1%. Kevin Durant, 51.0%, 49.6%, 46.2%

Now thing about hearing that – and this is a relatively simple table. By the end of the table, are you going to remember what each of those numbers represent? Now take a look at the example below.

<table class="table">
<caption>Field Goal Percentage over the last 3 years</caption>
<thead>
<tr>
<th scope="col">Player</th><th scope="col">2012</th><th scope="col">2011</th><th scope="col">2010</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">LeBron James</th><td>56.5%</td><td>53.1%</td><td>51.0%</td>
</tr>
<tr>
<th scope="row">James Harden</th><td>45.2%</td><td>43.8%</td><td>49.1%</td>
</tr>
<tr>
<th scope="row">Kevin Durant</th><td>51.0%</td><td>49.6%</td><td>46.2%</td>
</tr>
</tbody>
</table>

{{< prism html >}}<table class="table">
    <caption>Field Goal Percentage over the last 3 years</caption>
    <thead>
      <tr>
        <th scope="col">Player</th><th scope="col">2012</th><th scope="col">2011</th><th scope="col">2010</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">LeBron James</th><td>56.5%</td><td>53.1%</td><td>51.0%</td>
      </tr>
      <tr>
        <th scope="row">James Harden</th><td>45.2%</td><td>43.8%</td><td>49.1%</td>
      </tr>
      <tr>
        <th scope="row">Kevin Durant</th><td>51.0%</td><td>49.6%</td><td>46.2%</td>
      </tr>
    </tbody>
  </table>
{{< /prism >}}

First of all, for visual users, we can clearly see what cell items are headings, thanks to some quick CSS – so properly marking headings is beneficial for everyone.

However, the increase in usability for screen reader users is huge. Let’s look at how a screen reader can interpret the table above.

> Table with four columns and four rows. Field Goal Percentage over the last 3 years. Player, 2012, 2011, 2010 Player – LeBron James, 2012 – 56.5%, 2011 – 53.1%, 2010 – 51.0%. Player – James Harden, 2012 – 45.2%, 2011 – 43.8%, 2010 – 49.1%. Player – Kevin Durant, 2012 – 51.0%, 2011 – 49.6%, 2010 – 46.2%

Notice how the screen reader says the column name before each cell so that it’s very clear what data is being read? Imagine reading a large table of data and how much easier it would be to understand the data within it using this method.

## Ok, I get it. Now what were you saying about creating tables again?

So to recap, we have a number of WordPress users who need to ensure their content is accessible, but they don’t have the HTML background to write the code necessary to create a proper HTML table in their content. I looked at online generators that spit out HTML code for tables – but they didn’t have the accessibility features in them. So, what does any programmer do? Open up a text editor and start coding!

## A solution!

In a short amount of time (thanks to previously written [jquery-csv](https://github.com/evanplaice/jquery-csv)), I created a simple web app to create semantic and accessible HTML tables: [HTML Table Generator](http://adamwills.github.io/csv-accessible-table/).

Users can paste in the contents of a CSV file (from Excel – a program that many people are familiar with), add some options depending on the format of their data, and the application spits out the HTML of their table!

## Ok – so who is this tool for?

Anyone can use this tool. I’ve found myself needing to build some tables – and while there are a lot of shortcuts in my text editor, generating all of the code is much quicker and simpler than hand-coding it all, even knowing the HTML involved.

This could also be given to clients who need to implement tables in their CMS systems, but don’t have the know how to really get down and dirty with the syntax necessary for a table of data.

## Where does this go from here?

While this is a solid solution, perhaps there’s some better solutions that could result from this – for example, a WordPress plugin to allow editors the ability to paste in CSV data in a short-code, and the table gets generated by the server. I’d be interested to know what directions this could take.

Also, if you’re an accessibility or JavaScript expert, I’d love to get your feedback on the project – whether it’s [the JavaScript used to generate the tables](https://github.com/AdamWills/csv-accessible-table/blob/master/assets/js/main.js) or the HTML code that is generated. The project is [available over at GitHub](https://github.com/AdamWills/csv-accessible-table/).

If you find this tool useful at all – leave a comment and let me know!



