
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
window.getScrollbarWidth = getScrollbarWidth;


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
window.sleep = sleep;