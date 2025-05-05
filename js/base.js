function insertHeader() {
	const header = `
	<nav class="navbar sticky-top">
		<div class="container-fluid">
			<a class="navbar-brand" href="">
				<img src="/Showcase/images/favicon.png">
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#header" aria-controls="header" aria-label="Toggle navigation">
				<i class="bi bi-list burger"></i>
			</button>
			<div class="offcanvas offcanvas-end" tabindex="-1" id="header" aria-labelledby="header-label">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="header-label">Where to?</h5>
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div class="offcanvas-body">
					<form class="mt-3" role="search">
						<input class="form-control" type="search" placeholder="Search For A Feature" aria-label="Search For A Feature" aria-describedby="featureSearchInfo">
						<div id="featureSearchInfo" class="form-text">Results are sorted by the date that they were published (Newest to Oldest).</div>
					</form>
					<br />
					<ul class="navbar-nav justify-content-center pe-3">
						<li class="nav-item">
							<a class="nav-link" href="/Showcase/projects/showcase.html">Showcase v4</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/Showcase/projects/blinded-by-the-dark.html">Blinded by the Dark</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
	`;
	document.body.insertAdjacentHTML('afterbegin', header);
}

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
								<a href="/Showcase/info/about.html" class="footer-link">
									About
								</a>
							</li>
							<li class="d-flex justify-content-center">
								<a href="/Showcase/info/faq.html" class="footer-link">
									FAQ
								</a>
							</li>
							<li class="d-flex justify-content-center">
								<a href="/Showcase/info/changelog.html" class="footer-link">
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
							<li class="d-flex justify-content-center align-items-end h-100">
								<img class="d-inline h-100" src="/Showcase/images/gpl3.png">
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
				</div>
			</div>
			<div class="container-fluid footer-contain">
				<div class="row">
					<div class="col-12 footer-text d-flex justify-content-end align-items-end">
						<span id="myVer">v0.1.0</span>
					</div>
				</div>
			</div>
		</footer>
	`;
	document.body.insertAdjacentHTML('beforeend', footer);
}

function insertBreadcrumb(name1, link1 = null, name2 = null, name3 = null) {
	let breadcrumb = `
		<nav class="ms-3" aria-label="breadcrumb">
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
	`;

	document.querySelector('.navbar-brand').insertAdjacentHTML('afterend', breadcrumb);
}
