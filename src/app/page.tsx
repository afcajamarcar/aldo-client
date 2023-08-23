'use client'

import { useState, useEffect } from "react"
import Image from 'next/image'
import Card from "./components/Card"

import { NOTIFICATIONS } from "./constants/notifications"
import { ENDPOINTS } from "./constants/api"
import { Notification } from "./types/inventory"

const { NO_STOCK, LOW_STOCK, HIGH_STOCK } = NOTIFICATIONS
const { INVENTORY_TAP_SOCKET, NOTIFICATIONS_API } = ENDPOINTS

export default function Home() {
  const [storesInventory, setStoresInventory] = useState<Map<string, string>>(new Map())
  const [stockNotifications, setStockNotifications] = useState<Array<Notification>>([])
  const [downloadingReport, setDownloadingReport] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(INVENTORY_TAP_SOCKET)

    ws.onmessage = (event: any): void => {
      const { store, model, inventory } = JSON.parse(event.data)
      const inventoryToCompare = Number(inventory)
      if (inventoryToCompare === 0) updateStockNotifications({ store, model, inventory, notification: NO_STOCK })
      if (inventoryToCompare <= 10 && inventoryToCompare != 0) updateStockNotifications({ store, model, inventory, notification: LOW_STOCK })
      if (inventoryToCompare >= 90) updateStockNotifications({ store, model, inventory, notification: HIGH_STOCK })

      setStoresInventory(prevState => new Map(prevState.set(`${store}/${model}`, inventory)))
    }
  }, [])

  const updateStockNotifications = async (notificationInfo: Notification): Promise<void> => {
    const { store, model, inventory, notification } = notificationInfo
    let createdAt = ''
    try {
      const rawResponse = await fetch(NOTIFICATIONS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notification: { store, model, inventory, notification_status: notification } })
      })
      const res = await rawResponse.json()
      createdAt = res.message
    } catch (error) {
      // TODO look for a better way to tell the user that notifications are not beign saved
      console.error(error)
    }
    setStockNotifications(prevState => [
      ...prevState,
      { store, model, inventory, notification, createdAt }
    ])
  }

  const downloadReport = async (): Promise<void> => {
    try {
      setDownloadingReport(true)
      const rawResponse = await fetch(NOTIFICATIONS_API, {
        method: 'GET',
      })
      const blob = await rawResponse.blob()
      const blobToDownload = new Blob([blob], { type: blob.type });
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blobToDownload)
      a.click()
      setDownloadingReport(false)
    } catch (error) {
      // TODO look for a better way to tell the user that the file could not be downloaded
      console.error(error)
      setDownloadingReport(false)
    }
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
      <div className="fixed bottom-4 right-4">
        <button className="bg-lime-600 hover:bg-lime-700 rounded-full w-20 h-20 flex items-center justify-center shadow-lg disabled:opacity-75"
          disabled={downloadingReport}
          onClick={() => downloadReport()}
        >
          <Image
            src="/spreadsheet_icon.svg"
            alt="Download report"
            width={50}
            height={50}
            priority
          />
        </button>
      </div>
      <div className="grid grid-cols-2">
        <section>
          <h1 className="text-2xl md:text-4xl m-10 text-center">Current Inventory Status</h1>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 gap-x-15">
            {Array.from(storesInventory.keys()).map(composedInfo => renderStatusCard(composedInfo))}
          </div>
        </section>
        <section className="justify-self-center">
          <>
            <h1 className="text-2xl md:text-4xl m-10 text-center">Stock Notifications</h1>
            {stockNotifications &&
              stockNotifications.map(({ store, model, inventory, notification, createdAt }) => (
                <Card
                  store={store}
                  model={model}
                  inventory={inventory}
                  notification={notification}
                  createdAt={createdAt}
                />
              ))}
          </>
        </section>
      </div>
    </main>
  )
}
