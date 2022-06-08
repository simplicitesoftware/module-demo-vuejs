var DemoVueJSFrontend = DemoVueJSFrontend || (function($) {
	let app, prd;
	const data = { item: null, list: null };

	/**
	 * Render for Vue.js 2.x
	 * @function
	 */
	function render2() {
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
		}, null, { inlineDocs: true });
	}
	
	/**
	 * Render for Vue.js 3.x
	 * @function
	 */
	function render3() {
		const vue = Vue.createApp({ data: () => data });

		prd.search(rows => {
			data.list = rows;
			vue.mount('#demovuejsfrontend');
		}, null, { inlineDocs: true });
	}

	/**
	 * Render
	 * @param params Parameters
	 * @function
	 */
	function render(params) {
		try {
			if (typeof Vue === 'undefined') throw 'Vue.js not available';
			console.log('Vue.js ' + Vue.version);
	
			data.bannerURL = data.bannerURL || params.bannerURL; // Image banner URL
	
			app = app || (params.pub
					? new Simplicite.Ajax(params.root, 'api', 'website', 'simplicite')  // External
					: Simplicite.Application  // Internal
				);
	
			prd = prd || app.getBusinessObject('DemoProduct');
	
			if (Vue.version.startsWith('2.'))
				render2()
			else
				render3();
		} catch(e) {
			console.error('Render error: ' + e.message);
			$('#demovuejsfrontend').text(e.message);
		}
	}
	
	return { render: render };
})(jQuery);