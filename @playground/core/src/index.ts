import { Application } from 'stimulus';
import ReactAppController from './controllers/react-app-controller';

// class StimulusAppBootstrapper {
//   private readonly definitions: Definition[];
//
//   constructor(definitions: Definition[]) {
//     this.definitions = definitions;
//   }
//
//   initialize() {
//     const application = Application.start();
//
//     return this.loadApplication(application);
//   }
//
//   private async loadApplication(application: Application) {
//     await this.domReady();
//     application.load(this.definitions);
//     return application;
//   }
//
//   private domReady() {
//     return new Promise(resolve => {
//       if (document.readyState === 'loading') {
//         document.addEventListener('DOMContentLoaded', resolve);
//       } else {
//         resolve();
//       }
//     });
//   }
// }
function domReady() {
  return new Promise(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });
}

// const context = require.context('./controllers', true, /controller\.(ts|tsx)$/);
// const definitions = definitionsFromContext(context);

export const startStimulusApplication = async () => {
  const application = Application.start();
  await domReady();
  application.register('react-app', ReactAppController);
};
