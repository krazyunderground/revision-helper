export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../runtime/components/error.svelte"),
	() => import("../../src/routes/create.svelte"),
	() => import("../../src/routes/edit.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/revise.svelte")
];

export const dictionary = {
	"": [[0, 4], [1]],
	"create": [[0, 2], [1]],
	"edit": [[0, 3], [1]],
	"revise": [[0, 5], [1]]
};