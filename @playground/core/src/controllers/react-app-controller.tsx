import { Controller } from '@hotwired/stimulus';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import registry from '../registry';

export default class extends Controller {
  connect() {
    const App = this.app;

    if (App) {
      createRoot(this.element).render(
        <Suspense fallback="Loading...">
          <App {...this.initialProps} />
        </Suspense>
      );
    } else {
      console.warn(`Could not resolve app with name: '${this.name}'`);
    }
  }

  get app() {
    return registry.getApp(this.name || '');
  }

  get name() {
    return this.data.get('name');
  }

  get initialProps() {
    return JSON.parse(this.data.get('initial-props') || '{}');
  }
}
