'use client'

import { useState, useEffect } from "react"

export default function Home() {
  const [data, setData] = useState<Map<String, Number>>(new Map())
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/')
    console.log('Connection stablished');

    ws.onmessage = (event: any) => {
      const { store, model, inventory } = JSON.parse(event.data)
      setData(prevState => new Map(prevState.set(`${store}/${model}`, inventory)))
    }
  }, [])

  console.log(data);

  return (
    <main>
    </main>
  )
}
