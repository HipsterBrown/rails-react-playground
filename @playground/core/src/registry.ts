import { ComponentType } from 'react';
import { Thing } from './components/Thing';

interface AppRegistry {
  [key: string]: ComponentType;
}

const apps: AppRegistry = {
  thing: Thing,
};

const getApp = (name: string) => apps[name];

export default {
  getApp,
};
