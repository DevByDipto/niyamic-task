async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs: number
): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === retries) throw err
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
  throw new Error('Unreachable')
}

export async function sendEvent(event: Event) {
  await retry(
    () => post('/api/events', { id: event.id, payload: event.payload }),
    3,
    500
  )
}