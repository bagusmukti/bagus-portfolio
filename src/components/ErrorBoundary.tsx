import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', fontFamily: 'monospace',
        background: '#f7f6fc', color: '#1e1a3a', padding: '2rem', gap: '1rem',
      }}>
        <div style={{ fontSize: '2rem' }}>⚠️</div>
        <h2 style={{ margin: 0, fontFamily: 'serif' }}>Ada error di kode</h2>
        <pre style={{
          background: '#fff', border: '1px solid #e0dff8', borderRadius: '8px',
          padding: '1rem 1.5rem', maxWidth: '700px', width: '100%',
          overflowX: 'auto', fontSize: '0.8rem', color: '#e8826a',
        }}>
          {error.message}
        </pre>
        <p style={{ color: '#6a6898', fontSize: '0.85rem', margin: 0 }}>
          Cek console browser (F12) untuk detail lengkap, lalu perbaiki file yang error.
        </p>
        <button
          onClick={() => this.setState({ error: null })}
          style={{
            padding: '0.5rem 1.5rem', borderRadius: '50px', border: 'none',
            background: '#4a4580', color: '#fff', cursor: 'pointer', fontSize: '0.85rem',
          }}
        >
          Coba lagi
        </button>
      </div>
    )
  }
}
