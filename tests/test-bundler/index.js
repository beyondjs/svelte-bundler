const Workspace = require('beyond/workspace');
require('colors');

const workspace = new Workspace(__dirname);

(async () => {
	await workspace.packages.ready;
	for (const pkg of workspace.packages.values()) {
		await pkg.ready;
		await pkg.modules.ready;

		// Show package information
		const { errors, warnings } = pkg.bundlers;
		console.log('Package:'.green.bold, pkg.vname.green);
		console.log(`  • Registered bundlers: ${[...pkg.bundlers.keys()].join(', ')}`);
		errors.length && console.log(`  • Bundlers errors: ${[...pkg.bundlers.errors].join(', ')}`);
		warnings.length && console.log(`  • Bundlers warnings: ${[...pkg.bundlers.warnings].join(', ')}`);

		// Show modules information
		console.log('\nShow modules information\n'.green.bold);

		for (const module of pkg.modules.values()) {
			await module.ready;
			console.log('Module:'.green.bold, module.subpath?.green);

			const { errors, warnings } = module;
			errors?.length && console.log(`  • Errors found: [...${errors}].join(', ')}`);
			warnings?.length && console.log(`  • Warnings found: [...${warnings}].join(', ')}`);

			await module.conditionals.ready;
			console.log('  • Conditionals:', [...module.conditionals.keys()].join(', '));

			const conditional = module.conditionals.get('default');
			if (conditional) {
				await conditional.processors.ready;
				const { errors, warnings } = conditional.processors;
				errors?.length && console.log(`  • Processors errors:', ${[...errors].join(', ')}`);
				warnings?.length && console.log(`  • Processors warnings:', ${[...warnings].join(', ')}`);

				const svelte = conditional.processors.get('svelte');
				console.log('  • Svelte processor:', svelte ? 'found'.green : 'not found'.red);
				if (svelte) {
					await svelte.ready;
					console.log('    • Specs:', svelte.specs.values);
					console.log('    • Inputs:', [...svelte.sources.inputs.keys()].join(', '));

					await svelte.extender.preprocessor.ready;
					console.log('    • Extender preprocessor size:', svelte.extender.preprocessor.size);
				}
			} else {
				console.log('  • No default bundler found');
			}
		}
	}

	console.log('End!');
})().catch(exc => console.error(exc));
