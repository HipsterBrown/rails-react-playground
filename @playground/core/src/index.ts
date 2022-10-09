/// <reference types="vite/client" />

import { Application } from '@hotwired/stimulus';
import { registerControllers } from 'stimulus-vite-helpers';
const controllers = import.meta.glob('./controllers/*-controller.ts*', { eager: true })

export const startStimulusApplication = async () => {
  const application = Application.start();
  registerControllers(application, controllers)
};
