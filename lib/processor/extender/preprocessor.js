const svelte = require('svelte/compiler');
const Preprocessor = require('@beyond-js/bundlers-sdk/bundler/processor/extender/preprocessor');

module.exports = class extends Preprocessor {
	async _preprocess(item) {
		try {
			const update = (type, output) => {
				if (!output || !output.content) return;
				let { content, map } = output;

				if (type === 'script' && output.attributes.lang === 'ts') {
					// Svelte components files export SvelteComponent as default
					content += `${content}\n\n`;
					content += `declare const Component: import('svelte/internal').SvelteComponent;\n`;
					content += 'export default Component;';
					item.extensions.set('tsc', { content, map });
				} else if (type === 'style') {
					item.extensions.set('sass', { content, map });
				}
			};

			await svelte.preprocess(
				item.source.content,
				{
					script: processed => update('script', processed),
					style: processed => update('style', processed),
				},
				{ filename: item.source.file }
			);
		} catch (exc) {
			return item.set({ errors: [exc.message] });
		}
	}
};
