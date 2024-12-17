//-----------------------------------------------------------
// Client side JavaScript for Mustache demo page
//-----------------------------------------------------------

/* global Vue */

var DemoVueJSFrontend = DemoVueJSFrontend || (() => {
	function render(params) {
		try {
			if (typeof Vue === 'undefined')
				throw 'Vue.js not available';

			const data = {
				bannerURL: params.bannerURL // Image banner URL
			};

			const app = typeof $ui !== 'undefined' ?
				// Internal UI use
				$ui.getAjax() :
				// External use (public)
				new Simplicite.Ajax(params.root, 'uipublic');

			const prd = app.getBusinessObject('DemoProduct');

			const vue = Vue.createApp({
				data() { return data; },
				methods: { select(i) { this.item = i; } }
			});

			prd.search(rows => {
				data.list = rows;
				data.item = null;
				vue.mount('#demovuejsfrontend');
			}, null, { inlineDocs: true });
		} catch(e) {
			$('#demovuejsfrontend').text(`Error: ${e.message}`);
		}
	}

	return { render: render };
})();