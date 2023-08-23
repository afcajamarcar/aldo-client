import { ENDPOINTS } from "@/app/constants/api"

export async function POST (req: Request) {
  const rawRes = await fetch(ENDPOINTS.REPORTS, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await req.json())
  })

  return new Response(JSON.stringify(await rawRes.json()))
}
