import { ComponentType, lazy } from 'react';

type LazyComponent = () => Promise<{ default: ComponentType }>;

interface AppRegistry {
  [key: string]: LazyComponent;
}

const apps: AppRegistry = {
  thing: () => import('./components/Thing'),
  app: () => import('./components/App'),
};

const getApp = (name: string) => lazy(apps[name]);

export default {
  getApp,
};
