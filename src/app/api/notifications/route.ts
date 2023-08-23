export async function POST (req: Request) {
  const rawRes = await fetch('http://127.0.0.1:3000/notifications', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await req.json())
  })

  return new Response(JSON.stringify(await rawRes.json()))
}
