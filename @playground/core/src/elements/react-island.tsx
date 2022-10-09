import { controller, attr } from '@github/catalyst'
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import registry from '../registry';

@controller
export class ReactIslandElement extends HTMLElement {
  @attr name = '';
  @attr props = '{}';

  connectedCallback() {
    const Island = this.island;

    if (Island) {
      createRoot(this).render(
        <Suspense fallback="Loading..." >
        <Island { ...this.initialProps } />
      </Suspense>
      )
    } else {
      console.warn(`Could not resolve island with name: '${this.name}'`)
    }
  }

  get island() {
    return registry.getApp(this.name || '')
  }

  get initialProps() {
    return JSON.parse(this.props);
  }
}
