'use client'

import { useState, useEffect } from "react"

export default function Home() {
  const [data, setData] = useState<Map<string, string>>(new Map())
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/')

    ws.onmessage = (event: any) => {
      const { store, model, inventory } = JSON.parse(event.data)
      setData(prevState => new Map(prevState.set(`${store}/${model}`, inventory)))
    }
  }, [])

  return (
    <main>
      <div className="grid grid-cols-2 gap-2">
        {Array.from(data.keys()).map(key => (
          <section className="flex flex-col justify-center items-center"
            id={key}
          >
            <h1>{key.split('/')[0]}</h1>
            <h2>{key.split('/')[1]}</h2>
            <p>{data.get(key)}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
