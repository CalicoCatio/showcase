btnColor = 'btn-outline-light';
// Apply defaults (0 = Light, 1 = Dark, 2 = Auto)
if (localStorage.getItem('theme')) {
	settingsChanged('theme', true); // True for first load only, false otherwise
} else {
	localStorage.setItem('theme', 2);
}

// Apply defaults (0 = Off, 1 = On, 2 = Auto)
if (localStorage.getItem('animations')) {
	settingsChanged('animations', true); // True for first load only, false otherwise
} else {
	localStorage.setItem('animations', 2);
}

// Apply defaults (0 = Off, 1 = On)
if (!localStorage.getItem('dots')) {
	localStorage.setItem('dots', 1);
} 
settingsChanged('dots', true);

// To comply with Browser/OS level settings
let animOverride = {
	disabled: '',
	animInfo: '',
	dotsInfo: '',
	modifiedStyle: ''
};

function changeOSLevelAnim(motion, firstLoad = false) {
	if (motion.matches) {
		if (localStorage.getItem('animations') == 1) {
			localStorage.setItem('animations', 0);
			settingsChanged('animations', firstLoad);
			if (!firstLoad) {
				document.body.querySelector('#anim0').checked = true; // Dots doesn't need this since that setting change reloads the page
			}
		} if (localStorage.getItem('dots') == 1) {
			localStorage.setItem('dots', 0);
			settingsChanged('dots', false);
		}
		animOverride.disabled = 'disabled';
		animOverride.animInfo = 'Animation Setting is being overriden by OS or Browser level setting.';
		animOverride.dotsInfo = 'Animated Background is being overriden by OS or Browser level setting.'
		animOverride.modifiedStyle = 'm-0';
		if (!firstLoad) {
			document.body.querySelector('#animStyle').classList.add(`${animOverride.modifiedStyle}`);
			document.body.querySelector('#animInfo').textContent = animOverride.animInfo;
			document.body.querySelector('#animDots').textContent = animOverride.dotsInfo;
			document.body.querySelectorAll('.anim-override').forEach((element) => {
				element.disabled = true;
			});
			window.throwToast(true, 'OS/Browser Animation Setting Changed', 'OS/Browser Animation Setting has been changed to <strong>Off</strong>.');
		}
	} else {
		animOverride.disabled = '';
		animOverride.animInfo = '';
		animOverride.dotsInfo = 'Changing this setting will reload the page.'
		animOverride.modifiedStyle = '';
		if (!firstLoad) {
			document.body.querySelector('#animStyle').classList.remove('m-0');
			document.body.querySelector('#animInfo').textContent = animOverride.animInfo;
			document.body.querySelector('#animDots').textContent = animOverride.dotsInfo;
			document.body.querySelectorAll('.anim-override').forEach((element) => {
				element.disabled = false;
			});
			window.throwToast(true, 'OS/Browser Animation Setting Changed', 'OS/Browser Animation Setting has been changed to <strong>On</strong>.')
		}
	}
}
changeOSLevelAnim(window.matchMedia('(prefers-reduced-motion: reduce)'), true);
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', changeOSLevelAnim);

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

						<p class="d-flex justify-content-center ${animOverride.modifiedStyle}" id="animStyle">Animations</p>
						<p class="form-text text-center"" id="animInfo">${animOverride.animInfo}</p>
						<div class="d-flex justify-content-center">
							<input type="radio" class="btn-check anim-override" ${animOverride.disabled} name="animations" id="anim1" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="anim1">On</label>

							<input type="radio" class="btn-check" name="animations" id="anim0" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="anim0">Off</label>

							<input type="radio" class="btn-check" name="animations" id="anim2" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="anim2">Auto Detect</label>
						</div>
						<hr>

						<p class="d-flex justify-content-center m-0">Animated Background</p>
						<p class="form-text text-center"" id="animDots">${animOverride.dotsInfo}</p>
						<div class="d-flex justify-content-center">
							<input type="radio" class="btn-check anim-override" ${animOverride.disabled}  name="dots" id="dot1" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="dot1">On</label>

							<input type="radio" class="btn-check" name="dots" id="dot0" autocomplete="off">
							<label class="btn ${btnColor} m-1" for="dot0">Off</label>
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
					location.reload();
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
					setType = '<strong>Light Mode</strong>';
					break;
				case '1': // Dark
					if (!firstLoad)
						swapButtonTypes(1);
					document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
					setType = '<strong>Dark Mode</strong>';
					break;
				case '2': // Auto
					if (window.matchMedia('(prefers-color-scheme: light)').matches) {
						if (!firstLoad)
							swapButtonTypes(0);
						else
							btnColor = 'btn-outline-dark'
						document.querySelector('HTML').setAttribute('data-bs-theme', 'light');
						setType = '<strong>Auto Detect</strong> (Light Mode)';
					} else {
						if (!firstLoad)
							swapButtonTypes(1);
						document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
						setType = '<strong>Auto Detect</strong> (Dark Mode)';
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
				case '0': // Off
					css = `
					<style id="anim-enforcer">
						*,
						*::before {
							animation: none !important;
							transition: none !important;
							--bs-accordion-btn-icon-transition: none !important;
						}
					</style>
					`;
					setType = '<strong>Off</strong>';
					const animOff = document.querySelector('#anim-enforcer');

					if (animOff) {
						const styleEl = document.createElement('div');
						styleEl.innerHTML = css;
						document.body.replaceChild(styleEl.firstElementChild, animOff);
					} else {
						document.body.insertAdjacentHTML('beforeend', css);
					}
					break;
				case '1': // On
					const animOn = document.querySelector('#anim-enforcer');

					if (animOn) {
						document.body.removeChild(animOn);
					}
					setType = '<strong>On</strong>';
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
						setType = '<strong>Auto Detect</strong> (Off)';
					} else {
						setType = '<strong>Auto Detect</strong> (On)';
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
			switch (localStorage.getItem('dots')) { // Yes, I could use an if but for the sake of consistency, I won't
				case '0': // Off
					// Default state is off, so nothing needs to happen here (thanks to location.reload() @ line 274)
					break;
				case '1': // On
					const script = document.createElement('script');
					script.src = '/showcase/js/dots.js';
					document.body.appendChild(script);
					break;
				default:
					// False = Error message, True = Not error
					window.throwToast(false, 'Background Change Error', 'The background could not be changed due to an error. Reload the page and try again.');
					console.warn(`BACKGROUND CHANGE BLOCKED: Background Setting is out of bounds! (${localStorage.getItem('theme')})`);
					break;
			}
			if (!firstLoad) {
				location.reload();
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