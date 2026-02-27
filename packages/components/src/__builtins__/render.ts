import { ReactElement } from 'react'
import { createRoot, Root } from 'react-dom/client'

const MARK = '__antd_mobile_root__'

type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: Root
}

export function render(node: ReactElement, container: ContainerType) {
  const root = container[MARK] || createRoot(container)
  root.render(node)
  container[MARK] = root
}

export async function unmount(container: ContainerType) {
  return Promise.resolve().then(() => {
    container[MARK]?.unmount()
    delete container[MARK]
  })
}
