Michael Popovich Digital Business Card — Full Replacement v7

This is a complete replacement for the current www/ directory.

Themes
------
7  Water
6  Nature
8  Dark Geometric
2  Wave Minimal
10 City Sunset

v7 visual refinements
---------------------
- Water now uses a high-resolution crop containing essentially all ocean water,
  with the sky/horizon removed so the page reads as a full-water theme.
- Nature now uses a higher-resolution mountain-lake scene with strong evergreen
  greenery and mountain massing.
- City Sunset now uses a higher-resolution, denser Manhattan high-rise scene.
- Dark Geometric and Wave Minimal are unchanged from the approved v6 rendering.

Existing behavior retained
--------------------------
- Main desktop card: 46rem wide x 18.75rem tall.
- Portrait: original static/images/michael.jpg, unchanged and rendered square.
- Six icons: two rows of three, desktop diameter 4.125rem.
- Themes auto-switch every 30 seconds.
- Clicking Michael's photo advances immediately to the next theme and restarts
  the 30-second timer.

See ATTRIBUTIONS.txt for theme-photo licensing details.

Theme image loading / CDN behavior
----------------------------------
This version eagerly preloads the five theme background assets once when the page
starts. themes.js also keeps Image objects for those assets alive for the lifetime
of the page. Theme rotation only changes the data-theme attribute; it does not
create new image URLs or add cache-busting query strings.

For S3/CloudFront, set long-lived caching metadata on static assets for the best
result, for example:

  Cache-Control: public, max-age=31536000, immutable

Use shorter caching for index.html and invalidate/version static assets when they
change. With those headers, each visitor should normally download each theme image
once, then reuse the browser cache throughout the session and on later visits.
