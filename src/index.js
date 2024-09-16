const Dependencies = require('@beyond-js/svelte-processor/processor/dependencies');
const Preprocessor = require('@beyond-js/svelte-processor/preprocessor');
const Compiler = require('@beyond-js/svelte-processor/packager/compiler');
const Js = require('@beyond-js/svelte-processor/packager/js');
const Css = require('@beyond-js/svelte-processor/packager/css');

module.exports = {
	name: 'svelte',
	sources: {
		extname: ['.svelte'],
	},
	Dependencies,
	extender: {
		Preprocessor,
		extends: ['ts', 'sass'],
	},
	packager: {
		compiler: () => Compiler,
		Js,
		Css,
	},
};
