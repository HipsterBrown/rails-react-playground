import { Controller } from 'stimulus';
import React from 'react';
import { render } from 'react-dom';
import registry from '../registry';

export default class extends Controller {
  connect() {
    const App = this.app;

    if (App) {
      render(<App {...this.initialProps} />, this.element);
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
