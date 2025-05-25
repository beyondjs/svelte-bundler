const BundlerProcessors = require('@beyond-js/bundlers-sdk/bundler/processors');

module.exports = class extends BundlerProcessors {
	get dp() {
		return 'svelte.bundler.processors';
	}

	constructor(conditional) {
		super(conditional);
		super.setup(
			new Map([
				// Derived from the module specs: specified in the module.json file
				['conditional-specs', { child: conditional.specs }],
			])
		);
	}

	_process() {
		const specs = this.conditional.specs.source.values;

		/**
		 * All the properties that are not reserved for the module specification
		 * are considered the specs of the 'ts' processor
		 */
		const reserved = ['platforms'];

		const svelte = { specifier: '@beuyond-js/svelte-bundler/processor' };
		for (const [key, value] of Object.entries(specs)) {
			if (reserved.includes(key)) continue;
			svelte[key] = value;
		}

		const processors = new Map([
			['svelte', svelte],
			['ts', { specifier: '@beuyond-js/ts-bundler/processors/ts', files: '*' }],
		]);

		super._process({ processors });
	}
};
