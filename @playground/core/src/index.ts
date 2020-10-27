import { Application } from 'stimulus';
// @ts-ignore magic path for rollup-plugin-stimulus
import controllers from 'stimulus-controllers';

export const startStimulusApplication = async () => {
  const application = Application.start();
  application.load(controllers);
};
