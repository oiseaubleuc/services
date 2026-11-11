export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
      style={{
        background:
          'radial-gradient(1200px 600px at 50% -10%, rgba(234, 179, 8, 0.08), transparent 55%), radial-gradient(800px 400px at 90% 80%, rgba(59, 130, 246, 0.06), transparent 50%), #0a0a0f',
      }}
    />
  )
}
