async function post(url: string, body: any): Promise<void> {
  const MAX_RETRIES = 3
  const RETRY_DELAY_MS = 500

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) return

    if (attempt < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
    } else {
      throw new Error('Request failed')
    }
  }
}