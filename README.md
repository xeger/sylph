# Sylph

This is a tiny but full-featured bootstrapper/loader for single-page
applications. To use it, simply load it using a `script` tag on your
index page. To ensure minimal interference with the app that is
eventually loaded, put sylph and its script inside a special div
with

```html
<div id="#sylph">
  <script src="/scripts/sylph.js"/>
</div>
```

Sylph is configured using meta tags in the `head` section of the page
into which it is loaded. the following meta tags are supported:

description
: App name displayed while loading.
author
: Creator/copyright info displayed while loading.
application-root
: Absolute or relative base URL for application files
application-bases
: Comma-separated list of base paths under application root
application-files
: Comma-separated list of subpaths (relative to base) to CSS and script files
application-debug
: Enable debug logging if present (regardless of content)

To make developers happier, root and bases can be customized using query-string
patterns of your choosing. To let people experiment with local or pre-production
UIs, you might:

```html
	<meta name="application-query-base" content="ui=>alt/*">
	<meta name="application-query-root" content="ui.local=>http://localhost:8080">
```

This allows your developers to load `https://example.org?ui=foo` in order
to experiment with the version of the app that is published under the
`foo/` prefix of your root. If you need two files, `app.js` and `app.css`,
both will be loaded relative to this alternative base. Or, they can
use `https://example.org?ui.local` to run with a local dev-mode UI!

If specified in the query string, root and base entirely replace the
defaults specified in HTML metadata.

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
