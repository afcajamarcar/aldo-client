const Card = (
  { composedInfo, inventory }:
    { composedInfo: string, inventory: string | undefined }): JSX.Element => {
  const nameAndProduct = composedInfo.split('/')

  return (
    <section
      className="flex flex-col justify-center items-center shadow-lg h-148 w-248 p-4 m-4 border"
      key={composedInfo}
    >
      <h1
        aria-label={nameAndProduct[0]}
        title={nameAndProduct[0]}
        className="font-bold text-lg max-w-xs truncate ...">
          {nameAndProduct[0]}
      </h1>
      <h2 className="text-lg">{nameAndProduct[1]}</h2>
      <p className="font-bold text-2xl transition-opacity">{inventory}</p>
    </section>
  )
}

export default Card
