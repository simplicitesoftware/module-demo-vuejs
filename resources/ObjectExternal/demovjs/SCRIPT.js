var demovjs = typeof demovjs !== 'undefined' ? demovjs : (function($) {
	var app, prd, data = { list: null, item: null };

	/**
	 * Render
	 * @param root Context path
	 * @param banner Banner URL
	 * @param pub Public?
	 * @function
	 */
	function render(root, banner, pub) {
		try {
			if (typeof Vue === 'undefined') throw 'Vue.js not available';

			if (!pub) $('#demovjs').css('min-height', '1000px');

			data.bannerURL = data.bannerURL || banner; // Image banner URL

			app = app || (pub
					? new Simplicite.Ajax(root, 'api', 'website', 'simplicite')  // External
					: Simplicite.Application  // Internal
				);

			prd = prd || app.getBusinessObject('DemoProduct');

			new Vue({
				el: '#demovjs',
				data: data,
				beforeMount: function() {
					data.list = null;
					data.item = null;
				},
				methods: {
					select: function(item) {
						data.item = item;
					}
				},
			});

			prd.search(function(rows) {
				data.list = rows;
			}, null, {
				inlineDocs: true
			});
		} catch(e) {
			console.error('Render error: ' + e.message);
		}
	}

	return { render: render };	
})(jQuery);