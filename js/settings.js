btnColor = 'btn-outline-light';
// Apply defaults
if (localStorage.getItem('theme')) {
	settingsChanged('theme', true);
} else {
	localStorage.setItem('theme', 2);
}

if (localStorage.getItem('animations')) {
	settingsChanged('animations', true);
} else {
	localStorage.setItem('animations', 2);
}

// Add the settings modal
const settingsObserver = new MutationObserver((mutationsList, settingsObserver) => {
	if (document.querySelector(".navbar-toggler")) {
		settingsObserver.disconnect();
		const modalHTML = `
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
				localStorage.clear();
				location.reload();
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
					window.throwToast(0, 'Theme Change Error', 'Your theme could not be changed due to an error. Reset your settings and try again.');
					console.warn(`THEME CHANGE BLOCKED: Theme Setting is out of bounds! (${localStorage.getItem('theme')})`);
					break;
			}
			if (!firstLoad) {
				window.throwToast(1, 'Theme Changed', `Your theme has sucessfully been changed to ${setType}.`);
			}
		} catch (error) {
			window.throwToast(0, 'Theme Change Error', 'Your theme could not be changed properly due to an error. Try again later');
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
					window.throwToast(0, 'Animation Preference Change Error', 'Your animation preference could not be changed due to an error. Reset your settings and try again.');
					console.warn(`ANIMATION CHANGE BLOCKED: Animation Setting is out of bounds! (${localStorage.getItem('animations')})`);
					break;
			}
			if (!firstLoad) {
				window.throwToast(1, 'Animation Preference Changed', `Your animation preference has sucessfully been changed to ${setType}.`);
			}
		} catch (error) {
			window.throwToast(0, 'Animation Preference Change Error', 'Your animation preference could not be changed properly due to an error. Try again later');
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