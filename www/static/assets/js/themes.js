(function () {
	'use strict';

	var themes = ['minimal', 'nature', 'geometric', 'water', 'sunset'];
	var themeColors = {
		water: '#dceef7',
		nature: '#dfe7dc',
		geometric: '#0e0e0e',
		minimal: '#f4f8fa',
		sunset: '#d8825d'
	};

	/*
	 * Keep one Image object alive for every theme background for the lifetime of
	 * the page. Combined with the <link rel="preload"> hints in index.html, this
	 * makes all theme imagery load once up front and then be reused when the
	 * data-theme attribute changes.
	 *
	 * The CSS uses these exact same URLs, so browsers resolve them to the same
	 * cached resources rather than issuing a new request every 30 seconds.
	 */
	var themeAssets = [
		'static/images/theme-minimal.svg',
		'static/images/theme-nature-photo.jpg',
		'static/images/theme-geometric-photo.svg',
		'static/images/theme-water-photo.jpg',
		'static/images/theme-city-photo.jpg'
	];
	var preloadedThemeImages = [];

	function preloadThemeImages() {
		themeAssets.forEach(function (src) {
			var image = new Image();
			image.decoding = 'async';
			image.src = src;
			preloadedThemeImages.push(image);
		});
	}

	var intervalMs = 30000;
	var index = 0;
	var body = document.body;
	var themeColorMeta = document.querySelector('meta[name="theme-color"]');
	var portraitButton = document.getElementById('theme-advance');
	var timerId = null;

	/*
	 * CSP-safe page reveal.
	 *
	 * The original template removed "is-loading" from an inline <script> in
	 * index.html. A strict Content-Security-Policy correctly blocks that inline
	 * script, which leaves #cards and #footer at opacity: 0 even though they are
	 * present and clickable.
	 *
	 * Keep the initialization in this external file instead. Because themes.js
	 * is loaded at the end of <body>, the DOM is already available and the card
	 * can be revealed immediately without waiting for large background images.
	 */
	function revealPage() {
		body.classList.remove('is-loading');

		if (navigator.userAgent.match(/(MSIE|rv:11\.0)/)) {
			body.classList.add('is-ie');
		}
	}

	function applyTheme(theme) {
		body.setAttribute('data-theme', theme);
		if (themeColorMeta && themeColors[theme]) {
			themeColorMeta.setAttribute('content', themeColors[theme]);
		}
	}

	function scheduleNextTheme() {
		if (timerId !== null) {
			window.clearTimeout(timerId);
		}
		timerId = window.setTimeout(function () {
			nextTheme();
			scheduleNextTheme();
		}, intervalMs);
	}

	function nextTheme() {
		index = (index + 1) % themes.length;
		applyTheme(themes[index]);
	}

	function advanceThemeNow() {
		nextTheme();
		// A manual click gets a complete 30 seconds before the next automatic change.
		scheduleNextTheme();
	}

	// Reveal the interface from this CSP-approved external script.
	revealPage();

	// Warm all theme imagery once before rotation begins.
	preloadThemeImages();
	applyTheme(themes[index]);
	scheduleNextTheme();

	if (portraitButton) {
		portraitButton.addEventListener('click', advanceThemeNow);
	}
}());
