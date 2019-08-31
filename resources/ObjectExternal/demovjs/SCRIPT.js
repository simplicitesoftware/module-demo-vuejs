var demovjs = typeof VJSDemo !== 'undefined' ? VJSDemo : (function($) {
	var app, prd, vue, data = { products: null };
	
	/**
	 * Render
	 * @param root Context path
	 * @param banner Banner URL
	 * @param pub Public?
	 * @function
	 */
	function render(root, banner, pub) {
		data.bannerURL = banner; // Image banner URL
		data.toFixed = function() { return function(n, r) { return parseFloat(r(n)).toFixed(2); } }; // Rendering for decimal
		if (!pub) $("#demovjs").css("min-height", "1000px");
		vue = new Vue({ el: '#demovjs', data: data });
		app = pub ? new Simplicite.Ajax(root, 'api', 'website', 'simplicite') : new Simplicite.Ajax();
		prd = app.getBusinessObject('DemoProduct');
		prd.search(function(rows) {
			data.products = rows;
		}, null, { inlineDocs: true });
	}

	return { render: render };	
})(jQuery);