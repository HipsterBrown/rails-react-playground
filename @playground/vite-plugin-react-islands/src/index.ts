import type { Plugin } from 'vite';

export function reactIslands() {
  const MODULE_ID = 'virtual:react-islands'
  const RESOLVED_MODULE_ID = `\0${MODULE_ID}`
  const ELEMENT_MODULE_ID = 'virtual:elements/react-island'
  const RESOLVED_ELEMENT_MODULE_ID = `\0${ELEMENT_MODULE_ID}`

  return <Plugin>{
    name: "react-islands",
    enforce: "pre",
    resolveId(id: string) {
      if (id === MODULE_ID) return RESOLVED_MODULE_ID
      if (id === ELEMENT_MODULE_ID) return RESOLVED_ELEMENT_MODULE_ID
    },
    load(id: string) {
      if (id === RESOLVED_MODULE_ID) {
        return `
import { lazyDefine } from '@github/catalyst'
lazyDefine('react-island', () => import(${ELEMENT_MODULE_ID}))
        `
      }
      if (id === RESOLVED_ELEMENT_MODULE_ID) {
        return `
import { lazy, Suspense } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';
import { createRoot } from 'react-dom/client';

const islands = import.meta.glob(['/**/islands/*.tsx', '/**/islands/*.jsx'])
export const getIsland = (name) => {
  const island = Object.entries(islands).find(([path]) => path.toLowerCase().includes(name))?.[1]
  if (island) return lazy(island)
  return null;
}

export class ReactIslandElement extends HTMLElement {
  connectedCallback() {
    const Island = this.island;

    if (Island) {
      createRoot(this).render(
        _jsx(Suspense, { fallback: "Loading...", children: _jsx(Island, this.initialProps) })
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
customElements.define('react-island', ReactIslandElement)
        `
      }
    }
  }
}
