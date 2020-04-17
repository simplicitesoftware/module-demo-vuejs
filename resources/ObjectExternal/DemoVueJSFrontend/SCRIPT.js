var DemoVueJSFrontend = typeof DemoVueJSFrontend !== 'undefined' ? DemoVueJSFrontend : (function($) {
	var app, prd, data = { list: null, item: null };

	/**
	 * Render
	 * @param params Parameters
	 * @function
	 */
	function render(params) {
		try {
			if (typeof Vue === 'undefined') throw 'Vue.js not available';

			if (!params.pub) $('#demovuejsfrontend').css('min-height', '1000px');

			data.bannerURL = data.bannerURL || params.bannerURL; // Image banner URL

			app = app || (params.pub
					? new Simplicite.Ajax(params.root, 'api', 'website', 'simplicite')  // External
					: Simplicite.Application  // Internal
				);

			prd = prd || app.getBusinessObject('DemoProduct');

			new Vue({
				el: '#demovuejsfrontend',
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