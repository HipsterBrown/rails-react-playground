import type { Plugin } from 'vite';

export function solidIslands() {
  const MODULE_ID = 'virtual:solid-islands'
  const RESOLVED_MODULE_ID = `\0${MODULE_ID}`
  const ELEMENT_MODULE_ID = 'virtual:elements/solid-island'
  const RESOLVED_ELEMENT_MODULE_ID = `\0${ELEMENT_MODULE_ID}`

  return <Plugin>{
    name: "solid-islands",
    enforce: "pre",
    resolveId(id: string) {
      if (id === MODULE_ID) return RESOLVED_MODULE_ID
      if (id === ELEMENT_MODULE_ID) return RESOLVED_ELEMENT_MODULE_ID
    },
    load(id: string) {
      if (id === RESOLVED_MODULE_ID) {
        return `
import { lazyDefine } from '@github/catalyst'
lazyDefine('solid-island', () => import('${ELEMENT_MODULE_ID}'))
        `
      }
      if (id === RESOLVED_ELEMENT_MODULE_ID) {
        return `
import { lazy } from 'solid-js';
import { render, template, createComponent, Suspense } from 'solid-js/web';

const islands = import.meta.glob(['/**/islands/*.tsx', '/**/islands/*.jsx'])
export const getIsland = (name) => {
  const island = Object.entries(islands).find(([path]) => path.toLowerCase().includes(name))?.[1]
  if (island) return lazy(island)
  return null;
}

const tmpl = template("<div></div>", 2)

export class SolidIslandElement extends HTMLElement {
  connectedCallback() {
    const Island = this.island;

    if (Island) {
      const self = this;
      const fallback = this.fallback;
      this.innerHTML = "";
      render(
        () => createComponent(Suspense, { fallback, get children() { return createComponent(Island, self.initialProps) } }),
        this
      )
    } else {
      console.warn("Could not resolve island with name:", this.name);
    }
  }

  get fallback() {
    return (() => {
      const el = tmpl.cloneNode(true);
      el.innerHTML = this.innerHTML || "<p>Loading...</p>";
      return el;
    })();
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
customElements.define('solid-island', SolidIslandElement)
        `
      }
    }
  }
}
