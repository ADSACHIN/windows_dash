import { useState } from 'react'
import './App.css'
import WindowsStep01 from './windows-step01'
import WindowsStep02 from './windows-step02'
import WindowsStep03 from './windows-step03'
import WindowsStep04 from './windows-step04'
import WindowsStep05 from './windows-step05'
import WindowsStep06 from './windows-step06'
import WindowsStep07 from './windows-step07'
import WindowsStep08 from './windows-step08'
import WindowsStep09 from './windows-step09'
import WindowsStep10 from './windows-step10'
import WindowsStep11 from './windows-step11'
import WindowsStep12 from './windows-step12'

const STEPS = [
  { label: "Step 01", component: <WindowsStep01 /> },
  { label: "Step 02", component: <WindowsStep02 /> },
  { label: "Step 03", component: <WindowsStep03 /> },
  { label: "Step 04", component: <WindowsStep04 /> },
  { label: "Step 05", component: <WindowsStep05 /> },
  { label: "Step 06", component: <WindowsStep06 /> },
  { label: "Step 07", component: <WindowsStep07 /> },
  { label: "Step 08", component: <WindowsStep08 /> },
  { label: "Step 09", component: <WindowsStep09 /> },
  { label: "Step 10", component: <WindowsStep10 /> },
  { label: "Step 11", component: <WindowsStep11 /> },
  { label: "Step 12", component: <WindowsStep12 /> },
]

function App() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((s) => Math.max(0, s - 1))
  const next = () => setCurrent((s) => Math.min(STEPS.length - 1, s + 1))

  const isFirst = current === 0
  const isLast  = current === STEPS.length - 1

  return (
    <div style={styles.root}>

      {/* Top Nav */}
      <nav style={styles.navbar}>
        <span style={styles.navTitle}>Windows Forensics</span>

        <div style={styles.pills}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ ...styles.pill, ...(i === current ? styles.pillActive : {}) }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <span style={styles.navCounter}>{current + 1} / {STEPS.length}</span>
      </nav>

      {/* Page Content */}
      <main style={styles.main}>
        {STEPS[current].component}
      </main>

      {/* Bottom Nav */}
      <div style={styles.bottomBar}>
        <button
          onClick={prev}
          disabled={isFirst}
          style={{ ...styles.navBtn, ...(isFirst ? styles.navBtnDisabled : {}) }}
        >
          ← Previous
        </button>

        <span style={styles.stepLabel}>{STEPS[current].label}</span>

        <button
          onClick={next}
          disabled={isLast}
          style={{ ...styles.navBtn, ...(isLast ? styles.navBtnDisabled : {}) }}
        >
          Next →
        </button>
      </div>

    </div>
  )
}

export default App

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100%',
    background: '#0d1117',
    fontFamily: "'Courier New', monospace",
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    background: '#161b22',
    borderBottom: '1px solid #30363d',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    gap: '16px',
  },
  navTitle: {
    color: '#58a6ff',
    fontWeight: '700',
    fontSize: '13px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  pills: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
  },
  pill: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '1px solid #30363d',
    background: '#0d1117',
    color: '#8b949e',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: "'Courier New', monospace",
  },
  pillActive: {
    background: '#1f6feb',
    border: '1px solid #58a6ff',
    color: '#ffffff',
    boxShadow: '0 0 8px #1f6feb88',
  },
  navCounter: {
    color: '#8b949e',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  },
  main: {
    flex: 1,
    width: '100%',
    overflowX: 'auto',
  },
  bottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 32px',
    background: '#161b22',
    borderTop: '1px solid #30363d',
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
  },
  navBtn: {
    padding: '8px 24px',
    background: '#21262d',
    border: '1px solid #30363d',
    borderRadius: '6px',
    color: '#c9d1d9',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    letterSpacing: '0.5px',
    transition: 'all 0.15s',
  },
  navBtnDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  stepLabel: {
    color: '#58a6ff',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
}
