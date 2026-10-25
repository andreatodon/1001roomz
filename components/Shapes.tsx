import type { StyleIcon } from '@/lib/types'

/** I simboli geometrici delle card stile, ripresi dal design. */
export function StyleShape({ icon = 'square' }: { icon?: StyleIcon }) {
  switch (icon) {
    case 'odyssey':
      return (
        <div aria-hidden="true" style={{ position: 'relative', width: 70, height: 70 }}>
          <div className="bracket bracket-tl" style={{ position: 'absolute', inset: 0 }} />
          <div
            style={{
              position: 'absolute',
              top: 26,
              left: 26,
              width: 18,
              height: 18,
              background: 'var(--red)',
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      )
    case 'brackets':
      return <Brackets size={70} arm={40} />
    case 'circle':
      return <div aria-hidden="true" style={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid currentColor' }} />
    case 'rectangle':
      return <div aria-hidden="true" style={{ width: 70, height: 50, border: '3px solid currentColor' }} />
    case 'square':
    default:
      return <div aria-hidden="true" style={{ width: 70, height: 70, border: '3px solid currentColor' }} />
  }
}

export function Brackets({ size, arm }: { size: number; arm: number }) {
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: size, height: size }}>
      <div className="bracket bracket-tl" style={{ position: 'absolute', top: 0, left: 0, width: arm, height: arm }} />
      <div className="bracket bracket-br" style={{ position: 'absolute', bottom: 0, right: 0, width: arm, height: arm }} />
    </div>
  )
}
