function Header() {
    const header = `
	<nav class="navbar sticky-top">
		<div class="container-fluid">
			<a class="navbar-brand" href="">
				<img src="/images/favicon.png">
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
					<form class="d-flex mt-3" role="search">
						<input class="form-control" type="search" placeholder="Search For A Page" aria-label="Search For A Page">
					</form>
					<br />
					<ul class="navbar-nav justify-content-center pe-3">
						<li class="nav-item">
							<a class="nav-link" href="/feature/blinded-by-the-dark.html">Blinded by the Dark</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
    `;
	document.body.insertAdjacentHTML('afterbegin', header);
}