package com.simplicite.extobjects.DemoVueJS;

import com.simplicite.util.AppLog;
import com.simplicite.util.ExternalObject;
import com.simplicite.util.tools.HTMLTool;
import com.simplicite.util.tools.Parameters;
import com.simplicite.webapp.web.BootstrapWebPage;

/**
 * Vue.js demo
 */
public class demovjs extends ExternalObject {
	private static final long serialVersionUID = 1L;

	/**
	 * Display method
	 * @param params Request parameters
	 */
	@Override
	public Object display(Parameters params) {
		try {
			boolean pub = isPublic();
			setDecoration(!pub);
			String render = getName() + ".render('" + HTMLTool.getRoot() + "', '" + HTMLTool.getResourceImageURL(this, "BANNER") + "', " + pub + ");";
			if (pub) { // Public page version (standalone Bootstrap page)
				BootstrapWebPage wp = new BootstrapWebPage(params.getRoot(), getDisplay(), false);
				wp.setFavicon(HTMLTool.getResourceIconURL(this, "FAVICON"));
				wp.appendAjax(true);
				wp.appendJSInclude(HTMLTool.getResourceJSURL(getGrant(), "VUEJS"));
				wp.appendJSInclude(HTMLTool.getResourceJSURL(this, "SCRIPT"));
				wp.appendCSSInclude(HTMLTool.getResourceCSSURL(this, "STYLES"));
				wp.append(HTMLTool.getResourceHTMLContent(this, "HTML"));
				wp.setReady(render);
				return wp.toString();
			} else { // Private page version
				appendJSInclude(HTMLTool.getResourceJSURL(getGrant(), "VUEJS"));
				return javascript(render);
			}
		} catch (Exception e) {
			AppLog.error(getClass(), "display", null, e, getGrant());
			return e.getMessage();
		}
	}
}
