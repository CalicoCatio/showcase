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
							<a class="nav-link" tabindex="0" data-bs-toggle="popover" data-bs-html="true" data-bs-placement="left" data-bs-trigger="hover" data-bs-title="Showcase v4<br /><span class='green-outline'>HTML</span> <span class='blue-outline'>Bootstrap</span>" data-bs-content="Is the fourth (and hopefully last) iteration of this very website." href="/showcase/projects/showcase">Showcase v4</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" tabindex="0" data-bs-toggle="popover" data-bs-html="true" data-bs-placement="left" data-bs-trigger="hover" data-bs-title="Blinded by the Dark<br /><span class='green-outline'>C#</span> <span class='blue-outline'>Monogame</span>" data-bs-content="Is a 2D platformer minigame, originally made as a project in college." href="/showcase/projects/blinded-by-the-dark">Blinded by the Dark</a>
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
			let query = input.value.trim();
			if (query.length != 0) {
				output.innerHTML = '';
				if (query.charAt(0) === '#') {
					items.forEach(function (item, i) {
						const tempHolder = document.createElement('div');
						tempHolder.innerHTML = item.querySelector('a').getAttribute('data-bs-title');
						const tags = tempHolder.querySelectorAll('span');
						tags.forEach(tag => {
							// There is a project with tag Tag
							if (query.substring(1).toUpperCase() == tag.textContent.toUpperCase()) {
								output.insertAdjacentElement('afterbegin', item);
							}
						});
					});
					// There is not a project with tag Tag
					if (output.innerHTML.toString() == '') {
						if (query == '#') {
							output.innerHTML = `<li class="nav-item justify-content-center d-flex nav-link text-center">The entered tag is blank.</li>`;
						} else {
							query = query.substring(1);
							output.innerHTML = `<li class="nav-item justify-content-center d-flex nav-link text-center">There are no projects that have the tag ${query}.</li>`;
						}
					}
				} else {
					items.forEach(function (item, i) {
						const name = item.querySelector('a').textContent;
						// There is a project with name Name
						if (name.toUpperCase().includes(query.toUpperCase())) {
							output.insertAdjacentElement('afterbegin', item);
						}
					});
					// There is not a project with name Name
					if (output.innerHTML.toString() == '') {
						output.innerHTML = `<li class="nav-item justify-content-center d-flex nav-link text-center">There no are projects by the name of ${query}.</li>`;
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
						<h5 class="text-uppercase d-flex justify-content-center footer-text" id="infoHeader">
							Info
						</h5>
						<ul class="list-unstyled mb-0">
							<li class="d-flex justify-content-center">
								<a href="/showcase/info/about" class="footer-link">
									About
								</a>
							</li>
							<li class="d-flex justify-content-center">
								<a href="/showcase/info/faq" class="footer-link">
									FAQ
								</a>
							</li>
							<li class="d-flex justify-content-center">
								<a href="/showcase/info/changelog" class="footer-link">
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
						<ul class="list-unstyled mb-0 d-flex justify-content-center gap-3">
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
								<a href="https://github.com/CalicoCatio" target="_blank" class="footer-link footer-text-large">
									<i class="bi bi-github"></i>
								</a>
							</li>
						</ul>
					</div>
					<span class="d-flex justify-content-end align-items-end">
						<span class="footer-text">
							<span id="myVer">v4.2.4</span>
						</span>
					</span>
				</div>
			</div>
		</footer>
	`;
	document.body.insertAdjacentHTML('beforeend', footer);
}

// Slap in a custom breadcrumb inside the header
function insertBreadcrumb(name1, link1 = null, name2 = null, link2 = null, name3 = null) {
	let breadcrumb = `
		<nav class="text-truncate d-none d-sm-block" aria-label="breadcrumb">
			<ol class="breadcrumb mb-0">
	`;

	if (!name2) {
		breadcrumb += `
			<li class="breadcrumb-item active" aria-current="page">${name1}</li>
		`;
	} else if (!name3) {
		breadcrumb += `
			<li class="breadcrumb-item">
				<a ${link1}>${name1}</a>
			</li>
			<li class="breadcrumb-item active" aria-current="page">${name2}</li>
		`;
	} else if (!link2) {
		breadcrumb += `
			<li class="breadcrumb-item">
				<a ${link1}>${name1}</a>
			</li>
			<li class="breadcrumb-item active">
				${name2}
			</li>
			<li class="breadcrumb-item active" aria-current="page">${name3}</li>
		`;
	} else {
		breadcrumb += `
			<li class="breadcrumb-item">
				<a ${link1}>${name1}</a>
			</li>
			<li class="breadcrumb-item">
				<a ${link2}>${name2}</a>
			</li>
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

			navDOM.addEventListener('show.bs.offcanvas', function () {
				const scrollWidth = window.getScrollbarWidth();
				document.documentElement.style.overflow = 'hidden';
				document.body.style.paddingRight = `${scrollWidth}px`;
				navDOM.style.paddingRight = `${orignalPaddingNav + scrollWidth}px`;

				const toasts = document.querySelector('.toast-container');
				if (toasts) {
					toasts.style.marginRight = `${scrollWidth}px`;
				}
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

				modal.addEventListener('show.bs.modal', function () {
					const scrollWidth = window.getScrollbarWidth();
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

// These are always there by default
insertHeader();
insertFooter();
