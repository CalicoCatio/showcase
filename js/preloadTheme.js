// Grab the theme to load
if (localStorage.getItem('theme')) {
	switch (localStorage.getItem('theme')) {
		case '1': // Dark
			document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
		case '2': // Auto
			if (window.matchMedia('(prefers-color-scheme: light)').matches) {
				document.querySelector('HTML').setAttribute('data-bs-theme', 'light');
			} else {
				document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
			}
			break;
	}
} else {
	localStorage.setItem('theme', 2);
}