# React on Rails Playground

An example repo setup for serving React components through Rails using [pnpm workspaces](https://pnpm.io/workspaces), [Vite Ruby](https://vite-ruby.netlify.app/), and [Stimulus](https://stimulus.hotwired.dev).

## Overview

While the original motivation for this setup was to support a monorepo with multiple Rails apps and engines and sharing JS assets, like Stimulus controllers and React components, among them, this simplified example shows a nice workflow where the JS assets can be built in isolation with modern tooling and served through the dependent Rails app like any other package.

[pnpm workspaces](https://pnpm.io/workspaces) are used to connect the internal JS package with the Rails app without needing to publish the package to a remote registry. The `@playground` directory is used to allow for multiple internal packages to be scoped under the `workspaces` field in the root `package.json`, but it's not required. `@playground/core` is scaffolded using [`create-vite-app`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) and a React template because it is quick and comes with standard tooling for building TypeScript + React packages. The Rails app (`playground`) is generated like normal, then uses the `bundle exec vite install` command after adding `vite_rails` to the Gemfile.

## Dev Workflow

When building components before integrating into the Rails app, run `pnpm storybook` in the `@playground/core` directory to start the Storybook server. [Learn more about Storybook and writing component stories.](https://storybook.js.org/docs/react/writing-stories/introduction) You'll find an example under the `@playground/core/stories/` directory.

To serve a React component in the Rails app, a [Stimlus controller](https://stimulusjs.org/) (`react-app-controller.tsx`) is used to mount the component on demand. First, the component must be added to the `@playground/core/src/registry.ts` file:

```ts
import Thing from './components/Thing';

const apps: AppRegistry = {
  thing: Thing,
};
```

The actual `registry.ts` uses [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports) and the [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) API to split the bundled component and lazily load one when the Stimulus controller requests it.

To invoke the Stimulus controller in your Rails view:

```erb
<div data-controller="react-app" data-react-app-name="thing" ></div>
```

Or the [ViewComponent](https://github.com/github/view_component) can be used instead:

```erb
<%= render ReactAppComponent.new(name: "thing") %>
```

While iterating on the component in Rails, running `./bin/vite dev` within the Rails directory (`playground`) and `pnpm start` within the package workspace (`@playground/code`) will auto-reload the page when the source files change.

If the React component should receive initial props from the Rails view, that can be done in two different ways:

```erb
<div data-controller="react-app" data-react-app-name="thing" data-react-app-initial-props="<%= {propName: 'some value'}.to_json %>"></div>
```

The hash could be an instance variable, it just needs to be stringified JSON data to be parsed by the Stimulus controller.

Or:

```erb
<%= render ReactAppComponent.new(name: "thing", initial_props: {propName: 'some value'}) %>
```

The `initial_props` argument for the ViewComponent will automatically stringify the hash for the rendered HTML output.
