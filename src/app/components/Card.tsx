const Card = (
  { composedInfo, inventory }:
  { composedInfo: string, inventory: string | undefined }): JSX.Element => {
  const nameAndProduct = composedInfo.split('/')

  return (
    <section
      className="flex flex-col justify-center items-center box-border h-148 w-248 p-4 m-4 border-4"
      key={composedInfo}
    >
      <h1 className="font-bold text-lg max-w-xs truncate ...">{nameAndProduct[0]}</h1>
      <h2>{nameAndProduct[1]}</h2>
      <p>{inventory}</p>
    </section>
  )
}

export default Card
