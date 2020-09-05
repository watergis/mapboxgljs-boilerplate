# mapboxgljs-boilerplate
![](https://github.com/watergis/mapboxgljs-boilerplate/workflows/Node.js%20CI/badge.svg)
![GitHub](https://img.shields.io/github/license/watergis/mapboxgljs-boilerplate)
[![Gitter](https://badges.gitter.im/narwassco/community.svg)](https://gitter.im/narwassco/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This is the template of Mapbox GL JS implementation for Water Services Providers.

## Installation

```
git clone https://github.com/watergis/mapboxgljs-boilerplate.git
cd mapboxgljs-boilerplate
npm i
```

## Configuration
Please edit your own settings on `config.js` such as mapbox accessToken, stylefile URL, etc.

```js
{
    accessToken : process.env.ACCESSTOKEN,
    attribution : 'Your attribution',
    styles : [
        { title: 'Style Name', uri: 'Stylefile URL',}, 
    ],
    center: [35.87063, -1.08551],
    zoom: 13,
    search:{ //if searching window is not necessary, please delete "search" property from config.js
        url: 'GeoJSON URL for searching',
        target: ['connno', 'serialno'], //target column name for searching
        format: (p) => {return `${p.customer}, ${p.connno}, ${p.serialno}, ${p.village}`}, //format of searching result
        place_type: ['meter'],
        placeholder: 'Search CONN NO or S/N',
        zoom: 17,
    },
    popup: { //if popup is not necessary, please delete "popup" property from config.js
        //target of layer name which you want to show popup
        target: ['meter','flow meter','valve','washout','firehydrant','tank','pipeline'/**,'intake','wtp'*/]
    }
}
```

## for Development

```
npm start
```
Then, local server will be launched automatically. You can access to http://localhost:8080/ and check how your development works before deploying to gh-pages.

## Before deploying
### put `Mapbox AccessToken` and `CNAME` in `.env` file
Before deploying to your Github pages, please make sure configuring your `AccessToken` and `CNAME` in `.env`. 

```js
ACCESSTOKEN=Your public access token for Mapbox
CNAME=Your custom domain. If you don't have custom domain, just delete it.
```

### Insert Script of Google Analytics from `index.html`
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=Your Google Analytics Code"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'Your Google Analytics Code');
</script>
```

## Build

```
npm run build
```
Then, `bundle.js` will be created under `dist` direcotry.

## Deploy to gh-pages

```
npm run deploy
```

## Attribution

When you use printed map, please includes attribution as follows.

If you can include HTML, use this code snippet that includes links to Mapbox & OpenStreetMap:
```html
© NARWASSCO, Ltd. © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>Powered by the United Nations Vector Tile Toolkit
```

For print output or if you can’t include links, use this text-only attribution:
```
© NARWASSCO, Ltd. ©Mapbox ©OpenStreetMap contributors, Powered by the United Nations Vector Tile Toolkit
```
