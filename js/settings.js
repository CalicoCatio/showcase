// Grab important local storage stuffs

// Themes
if (localStorage.getItem('theme')) {
	const themeInt = localStorage.getItem('theme');
} else {
	localStorage.setItem('theme', 2);
}

if (localStorage.getItem('animations')) {
	const animationsInt = localStorage.getItem('animations');
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
						Color Theme
						<div class="form-check">
							<input class="form-check-input" type="radio" name="colorTheme" id="lightModeTheme">
							<label class="form-check-label" for="lightModeTheme">
								Light Mode
							</label>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="radio" name="colorTheme" id="darkModeTheme">
							<label class="form-check-label" for="darkModeTheme">
								Dark Mode
							</label>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="radio" name="colorTheme" id="autoTheme">
							<label class="form-check-label" for="autoTheme">
								Auto
							</label>
						</div>
						<hr>
						Animations
						<div class="form-check">
							<input class="form-check-input" type="radio" name="animations" id="onAnim">
							<label class="form-check-label" for="onAnim">
								On
							</label>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="radio" name="animations" id="offAnim">
							<label class="form-check-label" for="offAnim">
								Off
							</label>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="radio" name="animations" id="autoAnim">
							<label class="form-check-label" for="autoAnim">
								Auto
							</label>
						</div>
					</div>
					<div class="modal-footer">
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

		// Color Theme
		document.querySelectorAll('input[name="colorTheme"]').forEach((input, index, array) => {
			input.addEventListener('change', () => {
				if (input.checked) {
					localStorage.setItem('theme', index);
					settingsChanged('theme');
				}
			});
		});
		// Animations
		document.querySelectorAll('input[name="animations"]').forEach((input, index, array) => {
			input.addEventListener('change', () => {
				if (input.checked) {
					localStorage.setItem('animations', index);
					settingsChanged('animations');
				}
			});
		});
	}
});

settingsObserver.observe(document.body, { childList: true, subtree: true });

// Apply settings changes
function settingsChanged(event) {
	if (event === 'theme') {
		setType = null;
		switch (localStorage.getItem('theme')) {
			case '0': // Light
				document.querySelector('HTML').setAttribute('data-bs-theme', 'light');
				setType = 'light';
				break;
			case '1': // Dark
				document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
				setType = 'dark';
				break;
			case '2': // Auto
				if (window.matchMedia('(prefers-color-scheme: light)').matches) {
					document.querySelector('HTML').setAttribute('data-bs-theme', 'light');
				} else {
					document.querySelector('HTML').setAttribute('data-bs-theme', 'dark');
				}
				setType = 'auto';
				break;
		}
		console.log(setType);
		window.throwToast(1, "Theme Changed", `Your color theme has sucessfully been changed to ${setType}.`);
	} else if (event === 'animations') {
		switch (localStorage.getItem('animations')) {
			case '0': // On
				setType = 'on';
				break;
			case '1': // Off
				setType = 'off';
				break;
			case '2': // Auto
				setType = 'auto';
				break;
		}
		window.throwToast(1, "Animation Preference Changed", `Your animation preference has sucessfully been changed to ${setType}.`);
	}
}