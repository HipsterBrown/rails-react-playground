# Preact in Rails Playground

An example repo setup for serving Preact components through Rails using [pnpm workspaces](https://pnpm.io/workspaces), [Vite Ruby](https://vite-ruby.netlify.app/), and [Catalyst](https://github.github.io/catalyst/).

## Overview

While the original motivation for this setup was to support a monorepo with multiple Rails apps and engines and sharing JS assets, like custom elements and Preact components, among them, this simplified example shows a nice workflow where the JS assets can be built in isolation with modern tooling and served through the dependent Rails app like any other package.

[pnpm workspaces](https://pnpm.io/workspaces) are used to connect the internal JS package with the Rails app without needing to publish the package to a remote registry. The `@playground` directory is used to allow for multiple internal packages to be scoped under the `packages` field in the root `pnpm-workspace.yaml`, but it's not required. `@playground/core` is scaffolded using [`create-vite-app`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) and a Preact template because it is quick and comes with standard tooling for building TypeScript + Preact packages. The Rails app (`playground`) is generated without Webpacker, then uses the `bundle exec vite install` command after adding `vite_rails` to the Gemfile.

## Dev Workflow

When building components before integrating into the Rails app, run `pnpm storybook` in the `@playground/core` directory to start the Storybook server. [Learn more about Storybook and writing component stories.](https://storybook.js.org/docs/react/writing-stories/introduction) You'll find an example under the `@playground/core/stories/` directory.

To serve a Preact component in the Rails app, a [custom element powered by Catalyst](https://github.github.io/catalyst/) (`react-island.tsx`) is used to mount the component on demand. Any component file placed in the `@playground/core/src/islands` directory will be automatically registered by the `vite-plugin-react-islands` build plugin which is executed through the `import 'virtual:react-islands'` in the `src/index.ts` of the core internal package. This is similar to the conventions use by [Fresh](https://fresh.deno.dev/docs/concepts/islands).

The plugin uses [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) and the [Preact.lazy](https://preactjs.com/guide/v10/switching-to-preact#suspense) API to split the bundled component and lazily load one when the custom element requests it.

To invoke the custom element in your Rails view:

```erb
<preact-island data-name="thing" ></preact-island>
```

Or the [ViewComponent](https://github.com/github/view_component) can be used instead:

```erb
<%= render PreactIslandComponent.new(name: "thing") %>
```

While iterating on the component in Rails, running `foreman start -f Procfile.dev` within the Rails directory (`playground`) and `pnpm start` within the package workspace (`@playground/code`) will auto-reload the page when the source files change.

If the Preact component should receive initial props from the Rails view, that can be done in two different ways:

```erb
<preact-island data-name="thing" data-props="<%= {propName: 'some value'}.to_json %>"></preact-island>
```

The hash could be an instance variable, it just needs to be stringified JSON data to be parsed by the custom element.

Or:

```erb
<%= render PreactIslandComponent.new(name: "thing", initial_props: {propName: 'some value'}) %>
```

The `initial_props` argument for the ViewComponent will automatically stringify the hash for the rendered HTML output.

Because the `preact-island` island is [lazily-defined](https://github.github.io/catalyst/guide/lazy-elements/), the loading behavior can be controlled through the `data-load-on` attribute:

```erb
<preact-island data-name="thing" data-load-on="visible"></preact-island>
```

Or with the companion ViewComponent:

```erb
<%= render PreactIslandComponent.new(name: "thing", load_on: 'visible') %>
```
