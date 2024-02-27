class DemoVueJSFrontend {

	static render(params) {
		try {
			if (typeof Vue === 'undefined') throw 'Vue.js not available';
			console.log('Vue.js ' + Vue.version);
	
			const data = {
				item: null,
				list: null,
				bannerURL: params.bannerURL // Image banner URL
			};
	
			const app = params.pub ?
				// External use (public)
				new Simplicite.Ajax(params.root, 'uipublic') :
				// Internal UI use
				$ui.getAjax();

			const prd = app.getBusinessObject('DemoProduct');
	
			const vue = Vue.createApp({ data: () => data });
	
			prd.search(rows => {
				data.list = rows;
				vue.mount('#demovuejsfrontend');
			}, null, { inlineDocs: true });
		} catch(e) {
			console.error('Render error: ' + e.message);
			$('#demovuejsfrontend').text(e.message);
		}
	}
	
}