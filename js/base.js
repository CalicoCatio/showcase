// Slap in the header
function insertHeader() {
	const header = `
	<nav class="navbar fixed-top">
		<div class="container-fluid">
			<a class="navbar-brand" href="/showcase/">
				<img src="/showcase/images/global/favicon.png">
			</a>
			<div id="navbar-end">
				<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#header" aria-controls="header" aria-label="Toggle navigation">
					<i class="bi bi-list burger"></i>
				</button>
			</div>
			<div class="offcanvas offcanvas-end" tabindex="-1" id="header" aria-labelledby="header-label">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="header-label">Where to?</h5>
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div class="offcanvas-body">
					<form class="mt-3" role="search">
						<input id="projectSearch" class="form-control" type="search" placeholder="Search For A Project" aria-label="Search For A Project" aria-describedby="projectSearchInfo">
						<div id="projectSearchInfo" class="form-text">Enter a #tag or name of a project.</div>
					</form>
					<br />
					<ul class="navbar-nav justify-content-center pe-3">
						<li class="nav-item">
							<a class="nav-link" tabindex="0" data-bs-toggle="popover" data-bs-html="true" data-bs-placement="left" data-bs-trigger="hover" data-bs-title="Showcase v4<br /><span class='green-outline'>HTML, CSS, JS</span> <span class='blue-outline'>Bootstrap</span>" data-bs-content="Is the fourth (and hopefully last) iteration of this very website." href="/showcase/projects/showcase.html">Showcase v4</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" tabindex="0" data-bs-toggle="popover" data-bs-html="true" data-bs-placement="left" data-bs-trigger="hover" data-bs-title="Blinded by the Dark<br /><span class='green-outline'>C#</span> <span class='blue-outline'>Monogame</span>" data-bs-content="Is a 2D platformer minigame, originally made as a project in college." href="/showcase/projects/blinded-by-the-dark.html">Blinded by the Dark</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
	`;
	document.body.insertAdjacentHTML('afterbegin', header);

	// Initialize popovers
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}

// Search
const searchObserver = new MutationObserver((mutationsList, searchObserver) => {
	const input = document.querySelector("#projectSearch");
	const output = document.querySelector('.navbar-nav');
	const items = document.querySelectorAll('.navbar-nav .nav-item');

	if (input && output && items.length > 0) {
		searchObserver.disconnect();
		input.addEventListener("input", async () => {
			const query = input.value.trim();
			if (query.length != 0) {
				output.innerHTML = '';
				if (query.charAt(0) === '#') {
					items.forEach(function (item, i) {
						const tempHolder = document.createElement('div');
						tempHolder.innerHTML = item.querySelector('a').getAttribute('data-bs-title');
						const tags = tempHolder.querySelectorAll('span');
						tags.forEach(tag => {
							// Yes Tag
							if (query.substring(1).toUpperCase() == tag.textContent.toUpperCase()) {
								output.insertAdjacentElement('afterbegin', item);
							}
						});
					});
					// No Tag
					if (output.innerHTML.toString() == '') {
						output.innerHTML = `<li class="nav-item justify-content-center d-flex nav-link">There are no projects that have the tag ${query}.</li>`;
					}
				} else {
					items.forEach(function (item, i) {
						const name = item.querySelector('a').textContent;
						// Yes Name
						if (name.toUpperCase().includes(query.toUpperCase())) {
							output.insertAdjacentElement('afterbegin', item);
						}
					});
					if (output.innerHTML.toString() == '') {
						output.innerHTML = `<li class="nav-item justify-content-center d-flex nav-link">There no are projects by the name of ${query}.</li>`;
					}
				}
			} else {
				output.innerHTML = '';
				items.forEach(function (item, i) {
					output.insertAdjacentElement('afterbegin', item);
				});
			}
		});
	}
});

searchObserver.observe(document.body, { childList: true, subtree: true });

// Slap in the footer
function insertFooter() {
	const footer = `
		<footer class="shadow-sm">
			<div class="container-fluid footer-contain">
				<div class="row mt-4">
					<div class="col-lg-5 col-md-5 mb-2 mb-md-0">
						<h5 class="text-uppercase d-flex justify-content-center footer-text">
							info
						</h5>
						<ul class="list-unstyled mb-0">
							<li class="d-flex justify-content-center">
								<a href="/showcase/info/about.html" class="footer-link">
									About
								</a>
							</li>
							<li class="d-flex justify-content-center">
								<a href="/showcase/info/faq.html" class="footer-link">
									FAQ
								</a>
							</li>
							<li class="d-flex justify-content-center">
								<a href="/showcase/info/changelog.html" class="footer-link">
									Changelog
								</a>
							</li>
						</ul>
					</div>
					<div class="col-lg-2 col-md-2 mb-2 mb-md-0">
						<ul class="list-unstyled mb-0">
							<li class="d-flex justify-content-center pb-3">
								<form>
									<input type="button" class="btn btn-outline-secondary" value="Back to Top" onclick="window.location.href='#top'">
								</form>
							</li>
						</ul>
					</div>
					<div class="col-lg-5 col-md-5 mb-2 mb-md-0">
						<h5 class="text-uppercase d-flex justify-content-center footer-text">
							Socials
						</h5>
						<ul class="list-unstyled d-flex justify-content-center gap-3">
							<li>
								<a href="https://youtube.com/@ACalicoCatio" target="_blank" class="footer-link footer-text-large">
									<i class="bi bi-youtube"></i>
								</a>
							</li>
							<li>
								<a href="https://twitch.tv/calicocatio" target="_blank" class="footer-link footer-text-large">
									<i class="bi bi-twitch"></i>
								</a>
							</li>
							<li>
								<a href="https://steamcommunity.com/id/CalicoCatio/" target="_blank" class="footer-link footer-text-large">
									<i class="bi bi-steam"></i>
								</a>
							</li>
							<li>
								<a href="https://discordapp.com/users/706284932254662694" target="_blank" class="footer-link footer-text-large">
									<i class="bi bi-discord"></i>
								</a>
							</li>
							<li>
								<a href="https://reddit.com/user/DogDoge167/" target="_blank" class="footer-link footer-text-large">
									<i class="bi bi-reddit"></i>
								</a>
							</li>
							<li>
								<a href="https://github.com/CalicoCatio" target="_blank" class="footer-link footer-text-large">
									<i class="bi bi-github"></i>
								</a>
							</li>
						</ul>
					</div>
					<span class="d-flex justify-content-end align-items-end">
						<span class="footer-text">
							<span id="myVer">v0.1.1</span>
						</span>
					</span>
				</div>
			</div>
		</footer>
	`;
	document.body.insertAdjacentHTML('beforeend', footer);
}

// Slap in a custom breadcrumb inside the header
function insertBreadcrumb(name1, link1 = null, name2 = null, name3 = null) {
	let breadcrumb = `
		<nav class="text-truncate d-none d-sm-block" aria-label="breadcrumb">
			<ol class="breadcrumb mb-0">
	`;

	if (!name2) {
		// Homepage only
		breadcrumb += `
			<li class="breadcrumb-item active" aria-current="page">${name1}</li>
		`;
	} else if (!name3) {
		// 2-level breadcrumb
		breadcrumb += `
			<li class="breadcrumb-item">
				<a href="${link1}">${name1}</a>
			</li>
			<li class="breadcrumb-item active" aria-current="page">${name2}</li>
		`;
	} else {
		// 3-level breadcrumb
		breadcrumb += `
			<li class="breadcrumb-item">
				<a href="${link1}">${name1}</a>
			</li>
			<li class="breadcrumb-item">${name2}</li>
			<li class="breadcrumb-item active" aria-current="page">${name3}</li>
		`;
	}

	breadcrumb += `
			</ol>
		</nav>
		<span class="d-block d-sm-none">
	`;

	// For phones, since the breadcrumbs are too big for their screens
	if (!name2) {
		// Homepage only
		breadcrumb += `
			${name1}
		`;
	} else if (!name3) {
		// 2-level breadcrumb
		breadcrumb += `
			${name2}
		`;
	} else {
		// 3-level breadcrumb
		breadcrumb += `
			${name3}
		`;
	}
	breadcrumb += `
		</span>
	`;

	document.querySelector('.navbar-brand').insertAdjacentHTML('afterend', breadcrumb);
}

// Hide the scrollbar when offcanvas/modals are open
const scrollbarObserver = new MutationObserver((mutations, scrollbarObserver) => {
	// Offcanvas
	if (document.querySelector('.navbar')) {
		const navDOM = document.querySelector('.navbar');
		if (!navDOM._scrollbarListeners) {
			navDOM._scrollbarListeners = true;

			const orignalPaddingNav = parseFloat(getComputedStyle(navDOM).paddingRight);

			const scrollWidth = window.getScrollbarWidth();

			navDOM.addEventListener('show.bs.offcanvas', function () {
				document.documentElement.style.overflow = 'hidden';
				document.body.style.paddingRight = `${scrollWidth}px`;
				navDOM.style.paddingRight = `${orignalPaddingNav + scrollWidth}px`; // Line 269

				const toasts = document.querySelector('.toast-container');
				if (toasts) {
					toasts.style.marginRight = `${scrollWidth}px`;
				}
			});

			navDOM.addEventListener('hide.bs.offcanvas', function () {
				document.body.style.paddingRight = `${window.scrollWidth}px`;
			});

			navDOM.addEventListener('hidden.bs.offcanvas', function () {
				document.documentElement.style.overflow = '';
				document.body.style.paddingRight = 0;
				navDOM.style.paddingRight = `${orignalPaddingNav}px`;
				const toasts = document.querySelector('.toast-container');
				if (toasts) {
					toasts.style.marginRight = '';
				}
			});
		}
	}

	// Modals
	if (document.querySelector('.modal')) {
		document.querySelectorAll('.modal').forEach((modal, index, modalArray) => {
			if (!modal._scrollbarListeners) {
				modal._scrollbarListeners = true;
				const nav = document.querySelector('.navbar');
				if (nav) {
					orignalPaddingNav = parseFloat(getComputedStyle(nav).paddingRight);
				}
				const scrollWidth = window.getScrollbarWidth();

				modal.addEventListener('show.bs.modal', function () {
					document.documentElement.style.overflow = 'hidden';					
					document.body.style.paddingRight = `${scrollWidth}px`;
					nav.style.paddingRight = `${orignalPaddingNav + scrollWidth}px`;
					const toasts = document.querySelector('.toast-container');
					if (toasts) {
						toasts.style.marginRight = `${scrollWidth}px`;
					}
				});

				modal.addEventListener('hidden.bs.modal', function () {
					document.documentElement.style.overflow = '';
					document.body.style.paddingRight = 0;
					nav.style.paddingRight = `${orignalPaddingNav}px`;
					const toasts = document.querySelector('.toast-container');
					if (toasts) {
						toasts.style.marginRight = '';
					}
				});
			}
		});
	}
});

scrollbarObserver.observe(document.body, { childList: true, subtree: true });

// Add the image inspector
if (document.querySelector('.image-inspector')) {
	document.querySelectorAll('.image-inspector').forEach((button, index, array) => {
		button.addEventListener('click', () => {
			const image = button.children[0];

		});
	});
}