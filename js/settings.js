btnColor = 'btn-outline-light';
// Apply defaults
if (localStorage.getItem('theme')) {
	settingsChanged('theme', true); // True for first load only, false otherwise
} else {
	localStorage.setItem('theme', 2);
}

if (localStorage.getItem('animations')) {
	settingsChanged('animations', true);
} else {
	localStorage.setItem('animations', 2);
}

if (localStorage.getItem('dots')) {
	settingsChanged('dots', true);
} else {
	localStorage.setItem('dots', 0); // Using int instead of bool so three option settings are possible (0 = true)
}

// Add the settings modal
const settingsObserver = new MutationObserver((mutationsList, settingsObserver) => {
	if (document.querySelector(".navbar-toggler")) {
		settingsObserver.disconnect();
		modalHTML = `
		<div class="modal fade" id="settingsModal" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Settings</h5>
					</div>
					<div class="modal-body">

						<p class="d-flex justify-content-center">Theme</p>
						<div class="d-flex justify-content-center">
							<input type="radio" class="btn-check" name="theme" id="theme0" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="theme0">Light Mode</label>

							<input type="radio" class="btn-check" name="theme" id="theme1" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="theme1">Dark Mode</label>

							<input type="radio" class="btn-check" name="theme" id="theme2" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="theme2">Auto Detect</label>
						</div>
						<hr>

						<p class="d-flex justify-content-center">Animations</p>
						<div class="d-flex justify-content-center">
							<input type="radio" class="btn-check" name="animations" id="anim0" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="anim0">On</label>

							<input type="radio" class="btn-check" name="animations" id="anim1" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="anim1">Off</label>

							<input type="radio" class="btn-check" name="animations" id="anim2" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="anim2">Auto Detect</label>
						</div>
						<hr>

						<p class="d-flex justify-content-center">Animated Background</p>
						<div class="d-flex justify-content-center">
							<input type="radio" class="btn-check" name="dots" id="dot0" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="dot0">On</label>

							<input type="radio" class="btn-check" name="dots" id="dot1" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="dot1">Off</label>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-danger" id="resetSettings">Reset Settings</button>
						<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
					</div>
				</div>
			</div>
		</div>
		`;
		const buttonHTML = `
		<button class="btn-stealth navbar-settings" data-bs-toggle="modal" data-bs-target="#settingsModal"><i class="bi bi-gear gear-rotate"></i></button>
		`;

		document.body.insertAdjacentHTML('beforeend', modalHTML);
		document.querySelector('.navbar-toggler').insertAdjacentHTML('beforebegin', buttonHTML);

		document.querySelector('#settingsModal').querySelector(`#theme${localStorage.getItem('theme')}`).checked = true;
		document.querySelector('#settingsModal').querySelector(`#anim${localStorage.getItem('animations')}`).checked = true;
		document.querySelector('#settingsModal').querySelector(`#dot${localStorage.getItem('dots')}`).checked = true;

		// Change stuffs
		document.querySelector('#settingsModal').querySelectorAll('input').forEach((input, index) => {
			input.addEventListener('change', () => {
				if (input.checked) {
					localStorage.setItem(`${input.getAttribute('name')}`, `${parseInt(input.getAttribute('id').match(/\d+$/)[0])}`);
					settingsChanged(`${input.getAttribute('name') }`, false);
				}
			});
		});

		// Handle resets
		resetButton = document.querySelector('#settingsModal').querySelector('#resetSettings');
		resetButton.addEventListener('click', () => {
			if (resetButton.innerHTML == 'Reset Settings') {
				resetButton.innerHTML = 'Are you sure?';
			} else if (resetButton.innerHTML == 'Are you sure?') {
				resetButton.innerHTML = 'This will reset ALL settings.';
			} else if (resetButton.innerHTML = 'This will reset ALL settings.') {
				try {
					localStorage.clear();
					// False = Error message, True = Not error
					window.throwToast(true, 'Settings Reset', 'Your settings were reset to the default.');
				} catch (error) {
					window.throwToast(false, 'Reset Settings Error', 'Your settings could not be reset due to an error. Try again later');
					console.warn(error);
				}
				
			}
		});
	}
});

settingsObserver.observe(document.body, { childList: true, subtree: true });

// Apply settings changes
function settingsChanged(event, firstLoad) {
	if (event === 'theme') {
		setType = null;
		try {
			switch (localStorage.getItem('theme')) {
				case '0': // Light
					if (!firstLoad)
						swapButtonTypes(0);
					else
						btnColor = 'btn-outline-dark'
					document.querySelector('HTML').setAttribute('data-bs-theme', 'light');
					setType = '<strong>light mode</strong>';
					break;
				case '1': // Dark
					if (!firstLoad)
						swapButtonTypes(1);
					document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
					setType = '<strong>dark mode</strong>';
					break;
				case '2': // Auto
					if (window.matchMedia('(prefers-color-scheme: light)').matches) {
						if (!firstLoad)
							swapButtonTypes(0);
						else
							btnColor = 'btn-outline-dark'
						document.querySelector('HTML').setAttribute('data-bs-theme', 'light');
						setType = '<strong>auto detect</strong> (light mode)';
					} else {
						if (!firstLoad)
							swapButtonTypes(1);
						document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
						setType = '<strong>auto detect</strong> (dark mode)';
					}
					break;
				default:
					// False = Error message, True = Not error
					window.throwToast(false, 'Theme Change Error', 'Your theme could not be changed due to an error. Reload the page and try again.');
					console.warn(`THEME CHANGE BLOCKED: Theme Setting is out of bounds! (${localStorage.getItem('theme')})`);
					break;
			}
			if (!firstLoad) {
				window.throwToast(true, 'Theme Changed', `Your theme has been changed to ${setType}.`);
			}
		} catch (error) {
			window.throwToast(false, 'Theme Change Error', 'Your theme could not be changed due to an error. Try again later.');
			console.warn(error);
		}
	} else if (event === 'animations') {
		try {
			switch (localStorage.getItem('animations')) {
				case '0': // On
					const animOn = document.querySelector('#anim-enforcer');

					if (animOn) {
						document.body.removeChild(animOn);
					}
					setType = '<strong>on</strong>';
					break;
				case '1': // Off
					css = `
					<style id="anim-enforcer">
						*,
						*::before {
							animation: none !important;
							transition: none !important;
						}
					</style>
					`;
					setType = '<strong>off</strong>';
					const animOff = document.querySelector('#anim-enforcer');

					if (animOff) {
						const styleEl = document.createElement('div');
						styleEl.innerHTML = css;
						document.body.replaceChild(styleEl.firstElementChild, animOff);
					} else {
						document.body.insertAdjacentHTML('beforeend', css);
					}
					break;
				case '2': // Auto
					css = `
					<style id="anim-enforcer">
						@media (prefers-reduced-motion: reduce) {
							*,
							*::before {
								animation: none !important;
								transition: none !important;
							}
						}
					</style>
					`;
					const animAuto = document.querySelector('#anim-enforcer');

					if (animAuto) {
						const styleEl = document.createElement('div');
						styleEl.innerHTML = css;
						document.body.replaceChild(styleEl.firstElementChild, animAuto);
					} else {
						document.body.insertAdjacentHTML('beforeend', css);
					}
					if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
						setType = '<strong>auto detect</strong> (off)';
					} else {
						setType = '<strong>auto detect</strong> (on)';
					}
					break;
				default:
					// False = Error message, True = Not error
					window.throwToast(false, 'Animation Preference Change Error', 'Your animation preference could not be changed due to an error. Reload the page and try again.');
					console.warn(`ANIMATION CHANGE BLOCKED: Animation Setting is out of bounds! (${localStorage.getItem('animations')})`);
					break;
			}
			if (!firstLoad) {
				window.throwToast(true, 'Animation Preference Changed', `Your animation preference has been changed to ${setType}.`);
			}
		} catch (error) {
			window.throwToast(false, 'Animation Preference Change Error', 'Your animation preference could not be changed due to an error. Try again later.');
			console.warn(error);
		}
	} else if (event === 'dots') {
		try {
			switch (localStorage.getItem('dots')) {
				case '0': // On
					if (!firstLoad) {
						const script = document.createElement('script');
						script.src = '/showcase/js/dots.js';
						document.body.appendChild(script);
						setType = '<strong>shown</strong>';
					} else {

					}
					break;
				case '1': // Off
					if (!firstLoad) {
						document.querySelector('script[src*="/showcase/js/dots.js"]').remove();
						document.body.querySelector('#dotsCanvas').remove();
						setType = '<strong>hidden</strong>';
					} else {

					}
					break;
				default:
					// False = Error message, True = Not error
					window.throwToast(false, 'Background Change Error', 'The background could not be changed due to an error. Reload the page and try again.');
					console.warn(`BACKGROUND CHANGE BLOCKED: Background Setting is out of bounds! (${localStorage.getItem('theme')})`);
					break;
			}
			if (!firstLoad) {
				window.throwToast(true, 'Background Changed', `The background has been ${setType}.`);
			}
		} catch (error) {
			window.throwToast(false, 'Background Change Error', 'The background could not be changed due to an error. Try again later.');
			console.warn(error);
		}
	}
}

function swapButtonTypes(type) {
	switch (type) {
		case 0:
			if (document.querySelector('#settingsModal').querySelector('.btn-outline-light')) {
				document.querySelector('#settingsModal').querySelectorAll('.btn-outline-light').forEach((input) => {
					input.classList.remove('btn-outline-light');
					input.classList.add('btn-outline-dark');
				});
			}
			break;
		case 1:
			if (document.querySelector('#settingsModal').querySelector('.btn-outline-dark')) {
				document.querySelector('#settingsModal').querySelectorAll('.btn-outline-dark').forEach((input) => {
					input.classList.remove('btn-outline-dark');
					input.classList.add('btn-outline-light');
				});
			}
			break;
	}
}