/// <reference types="vite/client" />
import { lazyDefine } from '@github/catalyst'

const elements = import.meta.glob('./elements/*')

Object.entries(elements).forEach(([path, fn]) => {
  const name = path.split('/').at(-1)?.split('.').at(0)
  if (name) {
    lazyDefine(name, fn)
  }
})
