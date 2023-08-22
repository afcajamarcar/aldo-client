const Card = (
  { store, model, inventory }:
    {
      store: string,
      model: string,
      inventory: string | undefined,
      notification?: string,
    }
): JSX.Element => (
  <section
    className="flex flex-col justify-center items-center shadow-lg h-148 w-248 p-4 m-4 border"
    key={`${store}/${model}`}
  >
    <h1
      aria-label={store}
      title={store}
      className="font-bold text-lg max-w-xs truncate ..."
    >
      {store}
    </h1>
    <h2 className="text-lg">{model}</h2>
    <p className="font-bold text-2xl transition-opacity">{inventory}</p>
  </section>
)

export default Card
