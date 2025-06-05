function getScrollbarWidth() {

	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll';
	document.body.appendChild(outer);

	const inner = document.createElement('div');
	outer.appendChild(inner);

	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

	outer.parentNode.removeChild(outer);

	return scrollbarWidth;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function throwToast(type, title, body) {
	if (type == 0) {
		type = 'fail';
	} else if (type == 1) {
		type = 'success';
	}
	toastHTML = `
		<div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="toast-header">
				<div class="div-box ${type}"></div>
				<strong class="me-auto">${title}</strong>
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
			<div class="toast-body">
				${body}
			</div>
		</div>
	`;

	extraHTML = `
		<div class="toast-container position-fixed bottom-0 end-0 p-3">
		</div>
	`;

	document.querySelector('.toast-container').insertAdjacentHTML('afterbegin', toastHTML);
	const toastDOM = document.querySelector('#toast');
	const toast = new bootstrap.Toast(toastDOM);
	toast.show();

	toastDOM.addEventListener('hidden.bs.toast', () => {
		toastDOM.remove();
	});
}

function addToastCointainer() {
	extraHTML = `
		<div class="toast-container position-fixed bottom-0 end-0 p-3">
		</div>
	`;

	if (!document.querySelector('.toast-container')) {
		document.body.insertAdjacentHTML('beforeend', extraHTML);
	}
}

addToastCointainer();