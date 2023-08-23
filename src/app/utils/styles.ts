import classNames from 'classnames'

export const getCardStyles = (notification: string | undefined) => {
  const notificationConditionalColors = [
    { "text-orange-500": notification === 'Low Stock' },
    { "text-lime-600": notification === 'High Stock' },
    { "text-red-600": notification === 'No Stock' },
  ]

  const cardInfoContainerStyles = classNames(
    "w-40 sm:w-auto shadow-lg h-148 p-4 m-4 border",
    { "grid grid-cols-2": notification }
  )

  const notificationTitleStyles = classNames(
    "font-bold text-lg sm:text-2xl text-center",
    ...notificationConditionalColors,
  )

  const notificationDateStyles = classNames(
    "font-bold text-base sm:text-lg text-center",
    ...notificationConditionalColors,
  )

  const cardInfoTitleStyles = classNames(
    "w-full md:w-auto font-bold text-sm sm:text-lg max-w-xs truncate ...",
    ...notificationConditionalColors,
  )

  const cardInfoStoreNameStyles = classNames(
    "text-sm sm:text-lg",
    ...notificationConditionalColors,
  )

  const cardInfoInventoryStyles = classNames(
    "font-bold text-2xl transition-opacity",
    ...notificationConditionalColors,
  )

  return {
    cardInfoContainerStyles,
    notificationTitleStyles,
    cardInfoTitleStyles,
    cardInfoStoreNameStyles,
    cardInfoInventoryStyles,
    notificationDateStyles,
  }
}
