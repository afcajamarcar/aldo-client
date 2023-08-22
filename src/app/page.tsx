'use client'

import { useState, useEffect } from "react"
import Card from "./components/Card"
import { NOTIFICATIONS } from "./constants/notifications"

const { NO_STOCK, LOW_STOCK, HIGH_STOCK } = NOTIFICATIONS

export default function Home() {
  const [storesInventory, setStoresInventory] = useState<Map<string, string>>(new Map())
  // TODO improve types
  const [stockNotifications, setStockNotifications] = useState<Array<{ store: string, model: string, inventory: string, notification: string }>>([])
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/')

    ws.onmessage = (event: any) => {
      const { store, model, inventory } = JSON.parse(event.data)
      if (Number(inventory) === 0) updateStockNotifications(store, model, inventory, NO_STOCK)
      if (Number(inventory) <= 10) updateStockNotifications(store, model, inventory, LOW_STOCK)
      if (Number(inventory) >= 90) updateStockNotifications(store, model, inventory, HIGH_STOCK)
      setStoresInventory(prevState => new Map(prevState.set(`${store}/${model}`, inventory)))
    }
  }, [])

  const updateStockNotifications = (store: string, model: string, inventory: string, notification: string): void => {
    setStockNotifications(prevState => [
      ...prevState,
      { store, model, inventory, notification: notification }
    ])
  }

  const renderStatusCard = (composedInfo: string): JSX.Element => {
    const nameAndProduct = composedInfo.split('/')
    return (
      <Card
        store={nameAndProduct[0]}
        model={nameAndProduct[1]}
        inventory={storesInventory.get(composedInfo)}
      />
    )
  }

  return (
    <main>
      <div className="grid grid-cols-2">
        <section>
          <h1 className="text-4xl m-10 text-center">Current Inventory Status</h1>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 gap-x-15">
            {Array.from(storesInventory.keys()).map(composedInfo => renderStatusCard(composedInfo))}
          </div>
        </section>
        <section className="justify-self-center">
          <>
            <h1 className="text-4xl m-10 text-center">Stock Notifications</h1>
            {stockNotifications &&
              stockNotifications.map(({ store, model, inventory, notification }) => (
                <Card
                  store={store}
                  model={model}
                  inventory={inventory}
                  notification={notification}
                />
              ))}
          </>
        </section>
      </div>
    </main>
  )
}
