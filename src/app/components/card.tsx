const Card = (
  { composedInfo, inventory }:
  { composedInfo: string, inventory: string | undefined }): JSX.Element => {
  const nameAndProduct = composedInfo.split('/')

  return (
    <section
      className="flex flex-col justify-center items-center"
      key={composedInfo}
    >
      <h1>{nameAndProduct[0]}</h1>
      <h2>{nameAndProduct[1]}</h2>
      <p>{inventory}</p>
    </section>
  )
}

export default Card
