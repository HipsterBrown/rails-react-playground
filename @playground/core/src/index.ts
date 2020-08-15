import { Application } from 'stimulus';
import ReactAppController from './controllers/react-app-controller';

function domReady() {
  return new Promise(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });
}

export const startStimulusApplication = async () => {
  const application = Application.start();
  await domReady();
  application.register('react-app', ReactAppController);
};
