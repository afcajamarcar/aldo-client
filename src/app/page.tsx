'use client'

import { useState, useEffect } from "react"
import Card from "./components/Card"

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
      <section className="max-w-screen-md">
        <h1 className="text-4xl m-10 text-center">Current Inventory Status</h1>
        <div className="grid grid-cols-2 gap-2 gap-x-15">
          {Array.from(data.keys()).map(key => (
            <Card
              composedInfo={key}
              inventory={data.get(key)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
