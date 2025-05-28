const Processor = require('@beyond-js/bundlers-sdk/bundler/processor');
const Preprocessor = require('./extender/preprocessor');
// const Compiler = require('./compiler');
const InternalModules = require('./outputs/ims');
// const Dependencies = require('@beyond-js/svelte-processor/processor/dependencies');
// const Compiler = require('@beyond-js/svelte-processor/packager/compiler');
// const Js = require('@beyond-js/svelte-processor/packager/js');
// const Css = require('@beyond-js/svelte-processor/packager/css');

module.exports = class extends Processor {
	#compiler;
	get compiler() {
		return this.#compiler;
	}

	constructor(...args) {
		super(...args, {
			extender: {
				Preprocessor,
				extends: ['ts', 'sass'],
			},
			// Dependencies,
			sources: {
				inputs: { extname: ['.svelte'] },
			},
			outputs: { InternalModules },
		});

		// this.#compiler = new Compiler();
	}
};
