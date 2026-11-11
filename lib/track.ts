export function track(event: string, extra?: Record<string, string>) {
  if (typeof window === 'undefined') return
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: window.location.pathname, event, ...extra }),
  }).catch(() => {})
}
