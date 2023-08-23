import { Notification } from "../types/inventory"
import { getCardStyles } from '../utils/styles'
import { formatDate } from '../utils/format'

const Card = ({
  store,
  model,
  inventory,
  notification,
  createdAt
}: Notification): JSX.Element => {
  const {
    cardInfoContainerStyles,
    notificationTitleStyles,
    cardInfoTitleStyles,
    cardInfoStoreNameStyles,
    cardInfoInventoryStyles,
    notificationDateStyles,
  } = getCardStyles(notification)

  return (
    <>
      <div
        className={cardInfoContainerStyles}
        key={`${store}/${model}`}
      >
        {notification && (
          <section className="flex flex-col justify-center items-center">
            <h1 className={notificationTitleStyles}>{notification}</h1>
            <p className={notificationDateStyles}>{formatDate(createdAt)}</p>
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
