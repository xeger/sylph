# Sylph

This is a tiny but full-featured bootstrapper/loader for single-page
applications. To use it, simply load it using a `<script src=>` tag
on your index page.

Sylph is configured using meta tags in the `head` section of the page
into which it is loaded. the following meta tags are supported:

description
: App name displayed while loading.
author
: Creator/copyright info displayed while loading.
application-roots
: Comma-separated list of absolute base URLs for application files (no trailing slash)
application-files
: Comma-separated list of subpaths to CSS and script files (no leading slash)

## Get started

Start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000).
You will briefly see a spinner, then the screen will turn black because
the dummy app has been loaded.

Edit index.html and change the root or files to refer to something
nonexistent; notice that Sylph displays an error. Use dev tools to
slow down the network; notice that Sylph displays a splash screen
with a spinner.

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```
