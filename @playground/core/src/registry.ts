import { ComponentType, lazy } from 'react';

type LazyComponent = () => Promise<{ default: ComponentType }>;

const islands = import.meta.glob('./islands/*.tsx')
export const getIsland = (name: string) => {
  const island = Object.entries(islands).find(([path]) => path.toLowerCase().includes(name))?.[1]
  if (island) return lazy(island as LazyComponent)
  return null;
}
