import type { Plugin } from 'vite';

export function preactIslands() {
  const MODULE_ID = 'virtual:preact-islands'
  const RESOLVED_MODULE_ID = `\0${MODULE_ID}`
  const ELEMENT_MODULE_ID = 'virtual:elements/preact-island'
  const RESOLVED_ELEMENT_MODULE_ID = `\0${ELEMENT_MODULE_ID}`

  return <Plugin>{
    name: "preact-islands",
    enforce: "pre",
    resolveId(id: string) {
      console.log('debug vite-plugin-react-islands: ', id)
      if (id === MODULE_ID) return RESOLVED_MODULE_ID
      if (id === ELEMENT_MODULE_ID) return RESOLVED_ELEMENT_MODULE_ID
    },
    load(id: string) {
      if (id === RESOLVED_MODULE_ID) {
        return `
import { lazyDefine } from '@github/catalyst'
lazyDefine('preact-island', () => import('${ELEMENT_MODULE_ID}'))
        `
      }
      if (id === RESOLVED_ELEMENT_MODULE_ID) {
        return `
import { lazy, Suspense } from 'preact/compat';
import { h, render } from 'preact';

const islands = import.meta.glob(['/**/islands/*.tsx', '/**/islands/*.jsx'])
export const getIsland = (name) => {
  const island = Object.entries(islands).find(([path]) => path.toLowerCase().includes(name))?.[1]
  if (island) return lazy(island)
  return null;
}

export class PreactIslandElement extends HTMLElement {
  connectedCallback() {
    const Island = this.island;

    if (Island) {
      render(
        h(Suspense, { fallback: "Loading..." }, h(Island, this.initialProps)),
        this
      )
    } else {
      console.warn("Could not resolve island with name:", this.name);
    }
  }

  get name() {
    return this.dataset.name || "";
  }

  get island() {
    return getIsland(this.name);
  }

  get initialProps() {
    return JSON.parse(this.dataset.props || '{}');
  }
}
customElements.define('preact-island', PreactIslandElement)
        `
      }
    }
  }
}
