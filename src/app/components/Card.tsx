import classNames from 'classnames'

const Card = (
  { store, model, inventory, notification }:
    {
      store: string,
      model: string,
      inventory: string | undefined,
      notification?: string,
    }
): JSX.Element => {
  const notificationConditionalColors = [
    { "text-orange-500": notification === 'Low Stock' },
    { "text-lime-600": notification === 'High Stock' },
    { "text-red-600": notification === 'No Stock' },
  ]
  const cardInfoContainerStyles = classNames(
    "shadow-lg h-148 w-248 p-4 m-4 border",
    { "grid grid-cols-2": notification }
  )

  const notificationTitleStyles = classNames(
    "font-bold text-2xl text-center",
    ...notificationConditionalColors,
  )

  const cardInfoTitleStyles = classNames(
    "font-bold text-lg max-w-xs truncate ...",
    ...notificationConditionalColors,
  )

  const cardInfoStoreNameStyles = classNames(
    "text-lg",
    ...notificationConditionalColors,
  )

  const cardInfoInventoryStyles = classNames(
    "font-bold text-2xl transition-opacity",
    ...notificationConditionalColors,
  )

  return (
    <>
      <div
        className={cardInfoContainerStyles}
        key={`${store}/${model}`}
      >
        {notification && (
          <section className="flex justify-center items-center">
            <h1 className={notificationTitleStyles}>{notification}</h1>
          </section>
        )}
        <section className="flex flex-col justify-center items-center">
          <h1
            aria-label={store}
            title={store}
            className={cardInfoTitleStyles}
          >
            {store}
          </h1>
          <h2 className={cardInfoStoreNameStyles}>{model}</h2>
          <p className={cardInfoInventoryStyles}>{inventory}</p>
        </section>
      </div>
    </>
  )
}

export default Card
