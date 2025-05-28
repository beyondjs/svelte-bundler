// const mformat = require('@beyond-js/mformat');
const InternalModules = require('@beyond-js/bundlers-sdk/bundler/processor/outputs/ims');

module.exports = class extends InternalModules {
	get dp() {
		return 'svelte.ims';
	}

	_buildSource(compiled) {
		let { code, map, url, hash } = compiled;

		// Transform to CJS
		const cjs = mformat({ code, map, mode: 'cjs' });
		if (cjs.errors?.length) return { errors: [{ message: cjs.errors, kind: 'html' }] };

		let id = this.createImID(compiled.relative.file);
		const im = { id, url, hash, code: cjs.code, map: cjs.map };
		return { im };
	}
};
