const svelte = require('svelte/compiler');
const Preprocessor = require('@beyond-js/bundlers-sdk/bundler/processor/extender/preprocessor/singly');

module.exports = class extends Preprocessor {
	async _source(item) {
		try {
			const extensions = new Map();

			const update = (type, output) => {
				if (!output || !output.code) return;
				let { code, map } = output;

				if (type === 'script') {
					// Svelte components files export SvelteComponent as default
					code += `${code}\n\n`;
					code += `declare const Component: import('svelte/internal').SvelteComponent;\n`;
					code += 'export default Component;';
					item.extensions.set('tsc', { code, map });
				} else if (type === 'style') {
					item.extensions.set('sass', { code, map });
				}
			};

			await svelte.preprocess(
				source.content,
				{
					script: processed => update('script', processed),
					style: processed => update('style', processed),
				},
				{ filename: source.file }
			);

			return { extensions };
		} catch (exc) {
			return item.set({ errors: [exc.message] });
		}
	}
};
