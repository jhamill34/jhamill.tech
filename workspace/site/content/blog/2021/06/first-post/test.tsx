import React, { useState } from 'react'

export function Test(): React.ReactElement {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>
}
