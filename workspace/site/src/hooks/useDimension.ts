import { useState, useCallback, useLayoutEffect } from 'react'

export function useDimension<T extends HTMLElement>(): [
  number,
  number,
  T | null,
  (e: T | null) => void
] {
  const [node, setNode] = useState<T | null>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const ref = useCallback<(n: T | null) => void>((node) => {
    setNode(node)
  }, [])

  const layout = useCallback(() => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width)
      setHeight(node.getBoundingClientRect().height)
    }
  }, [node])

  useLayoutEffect(() => {
    layout()
    window.addEventListener('resize', layout)

    return () => {
      window.removeEventListener('resize', layout)
    }
  }, [layout])

  return [width, height, node, ref]
}
