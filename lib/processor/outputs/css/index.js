const ProcessorCode = require('@beyond-js/bundles-sdk/processor/packager/code');
const SourceMap = require('@beyond-js/bundles-sdk/source-map');
module.exports = class extends ProcessorCode {
	get dp() {
		return 'svelte.code.css';
	}

	_build(hmr, diagnostics) {
		void hmr;
		void diagnostics;

		const sourcemap = new SourceMap();

		this.compiler.files.forEach(compiled => {
			if (!compiled.css) return;
			sourcemap.concat(compiled.css, compiled.url, compiled.cssMap);
		});
		return { code: sourcemap };
	}
};
