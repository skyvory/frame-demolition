# Frame Demolition
Enabling route to load abstracted file layer in select sites.
Layman's term: add-on to provide download ability for sites that have no download button.

## Description
This is a browser add-on directed for some certain sites of which implementation utilize some non-standard or non-native technology like pdf-on-canvas, image-on-canvas, on-client compression, or context menu anihillator for instances, of which usability render user restricted on what to do with the targeted files.

## Installation
Currently only supporitng Firefox Browser. Live installation could be done through [AMO] (addons.mozilla.org).

## Built Using
- [Jetpack Manager] (https://github.com/mozilla-jetpack/jpm)
Mozilla's tool for creating add-on for Firefox.
- [Materialize CSS] (https://github.com/Dogfalo/materialize)
Design interface.
- [jQuery] (https://github.com/jquery/jquery)
DOM manipulation.
- [JSZip] (https://github.com/Stuk/jszip)
Zipping downloaded files.

## Prove on unreliability
Some of afforementioned technology proven to be unreliable despite the site's effort to obfuscated the method to deliver their contents to the visitors.
Take dewey (link purposely unmentioned), for example. Their digital colletion would fail to load in case user has download manager installed, which automatically fetch the background request directly pointing to the dynamically loaded files and stop the original request processing altogether.
