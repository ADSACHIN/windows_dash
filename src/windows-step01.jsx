import { useState } from "react";

const palette = {
  bg: "#0a0c10",
  panel: "#0d1117",
  border: "#1e2a3a",
  borderBright: "#2a3f55",
  accent: "#00d4ff",
  accentGreen: "#00ff88",
  accentRed: "#ff4444",
  accentOrange: "#ff8c00",
  accentYellow: "#ffd700",
  accentPurple: "#9b59b6",
  text: "#c9d1d9",
  textDim: "#6e7681",
  textBright: "#e6edf3",
  header: "#161b22",
};

const styles = {
  root: {
    background: palette.bg,
    color: palette.text,
    fontFamily: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace",
    minHeight: "100vh",
    padding: "0",
    fontSize: "13px",
    lineHeight: "1.6",
  },
  topBar: {
    background: palette.header,
    borderBottom: `1px solid ${palette.border}`,
    padding: "8px 20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topBarDot: (color) => ({
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: color,
    display: "inline-block",
  }),
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  panel: (accent) => ({
    background: palette.panel,
    border: `1px solid ${accent || palette.border}`,
    borderRadius: "6px",
    overflow: "hidden",
  }),
  panelHeader: (accent) => ({
    background: palette.header,
    borderBottom: `1px solid ${accent || palette.border}`,
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }),
  panelTitle: (color) => ({
    color: color || palette.accent,
    fontWeight: "700",
    fontSize: "12px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  }),
  panelBody: {
    padding: "16px",
  },
  code: {
    background: "#0d1117",
    border: `1px solid ${palette.border}`,
    borderRadius: "4px",
    padding: "12px 14px",
    fontFamily: "inherit",
    fontSize: "12px",
    overflowX: "auto",
    whiteSpace: "pre",
    lineHeight: "1.7",
  },
  badge: (color) => ({
    background: `${color}22`,
    border: `1px solid ${color}66`,
    color: color,
    borderRadius: "3px",
    padding: "2px 8px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  }),
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "12px",
  },
  tag: (color) => ({
    display: "inline-block",
    background: `${color}18`,
    border: `1px solid ${color}44`,
    color: color,
    borderRadius: "3px",
    padding: "1px 6px",
    fontSize: "11px",
    margin: "2px",
  }),
  separator: {
    borderColor: palette.border,
    margin: "12px 0",
    borderStyle: "dashed",
    borderWidth: "0 0 1px 0",
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "8px",
  },
  bullet: (color) => ({
    color: color || palette.accent,
    minWidth: "14px",
    marginTop: "1px",
    fontWeight: "700",
  }),
};

const Icon = ({ name }) => {
  const icons = {
    shield: "🛡",
    cpu: "⚙",
    lock: "🔒",
    eye: "👁",
    alert: "⚠",
    check: "✓",
    cross: "✗",
    arrow: "→",
    cmd: "⌨",
    folder: "📁",
    network: "🌐",
    user: "👤",
    kernel: "🔧",
    mem: "💾",
    proc: "📊",
    log: "📋",
    key: "🔑",
    fire: "🔥",
    box: "□",
    dot: "●",
    win: "⊞",
    linux: "🐧",
    term: ">",
  };
  return <span>{icons[name] || "•"}</span>;
};

const Pill = ({ children, color }) => (
  <span style={styles.badge(color || palette.accent)}>{children}</span>
);

const PanelBox = ({ title, icon, color, children, accent }) => (
  <div style={styles.panel(accent || color || palette.border)}>
    <div style={styles.panelHeader(accent || color || palette.border)}>
      <Icon name={icon} />
      <span style={styles.panelTitle(color || palette.accent)}>{title}</span>
    </div>
    <div style={styles.panelBody}>{children}</div>
  </div>
);

const Row = ({ bullet, color, children }) => (
  <div style={styles.row}>
    <span style={styles.bullet(color)}>{bullet || "▸"}</span>
    <span style={{ color: palette.text }}>{children}</span>
  </div>
);

const KV = ({ k, v, kColor }) => (
  <div style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
    <span style={{ color: kColor || palette.accentGreen, minWidth: "180px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: palette.textDim }}>:</span>
    <span style={{ color: palette.textBright }}>{v}</span>
  </div>
);

// ─── Architecture Diagram (SVG) ───────────────────────────────────────────────
const ArchDiagram = () => (
  <svg viewBox="0 0 760 520" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Hardware layer */}
    <rect x="10" y="460" width="740" height="48" rx="4" fill="#0d1117" stroke="#ff8c0066" strokeWidth="1.5" />
    <text x="380" y="479" textAnchor="middle" fill="#ff8c00" fontSize="11" fontWeight="700" letterSpacing="2">HARDWARE LAYER</text>
    <text x="380" y="496" textAnchor="middle" fill="#6e7681" fontSize="10">CPU · RAM · Disk · NIC · GPU · USB Controllers</text>

    {/* HAL */}
    <rect x="10" y="406" width="740" height="44" rx="4" fill="#0d1117" stroke="#ffd70066" strokeWidth="1.5" />
    <text x="380" y="425" textAnchor="middle" fill="#ffd700" fontSize="11" fontWeight="700" letterSpacing="2">HAL — Hardware Abstraction Layer</text>
    <text x="380" y="442" textAnchor="middle" fill="#6e7681" fontSize="10">Abstracts hardware differences · hal.dll · Kernel interfaces uniformly with hardware through HAL</text>

    {/* Kernel mode box */}
    <rect x="10" y="190" width="740" height="206" rx="4" fill="#0a1520" stroke="#00d4ff44" strokeWidth="1" />
    <text x="20" y="210" fill="#00d4ff" fontSize="10" fontWeight="700" letterSpacing="2">KERNEL MODE (Ring 0) — Unrestricted hardware access</text>

    {/* NT Kernel */}
    <rect x="20" y="218" width="200" height="72" rx="3" fill="#0d1117" stroke="#00d4ff88" strokeWidth="1.5" />
    <text x="120" y="237" textAnchor="middle" fill="#00d4ff" fontSize="11" fontWeight="700">NT KERNEL</text>
    <text x="120" y="252" textAnchor="middle" fill="#6e7681" fontSize="9">ntoskrnl.exe</text>
    <text x="120" y="266" textAnchor="middle" fill="#c9d1d9" fontSize="9">Thread Scheduling</text>
    <text x="120" y="278" textAnchor="middle" fill="#c9d1d9" fontSize="9">Interrupt Handling · SMP</text>

    {/* Executive */}
    <rect x="234" y="218" width="200" height="72" rx="3" fill="#0d1117" stroke="#9b59b688" strokeWidth="1.5" />
    <text x="334" y="237" textAnchor="middle" fill="#9b59b6" fontSize="11" fontWeight="700">EXECUTIVE LAYER</text>
    <text x="334" y="252" textAnchor="middle" fill="#6e7681" fontSize="9">Object Manager · I/O Manager</text>
    <text x="334" y="266" textAnchor="middle" fill="#c9d1d9" fontSize="9">Process Manager · Memory Mgr</text>
    <text x="334" y="280" textAnchor="middle" fill="#c9d1d9" fontSize="9">Security Reference Monitor</text>

    {/* Drivers */}
    <rect x="448" y="218" width="200" height="72" rx="3" fill="#0d1117" stroke="#00ff8888" strokeWidth="1.5" />
    <text x="548" y="237" textAnchor="middle" fill="#00ff88" fontSize="11" fontWeight="700">KERNEL DRIVERS</text>
    <text x="548" y="252" textAnchor="middle" fill="#6e7681" fontSize="9">WDM · KMDF Drivers</text>
    <text x="548" y="266" textAnchor="middle" fill="#c9d1d9" fontSize="9">File System Drivers (NTFS)</text>
    <text x="548" y="280" textAnchor="middle" fill="#c9d1d9" fontSize="9">Network · Storage Drivers</text>

    {/* Win32k.sys */}
    <rect x="662" y="218" width="80" height="72" rx="3" fill="#0d1117" stroke="#ff444488" strokeWidth="1.5" />
    <text x="702" y="237" textAnchor="middle" fill="#ff4444" fontSize="10" fontWeight="700">Win32k</text>
    <text x="702" y="250" textAnchor="middle" fill="#6e7681" fontSize="9">.sys</text>
    <text x="702" y="264" textAnchor="middle" fill="#c9d1d9" fontSize="9">GDI/USER</text>
    <text x="702" y="278" textAnchor="middle" fill="#c9d1d9" fontSize="9">Windowing</text>

    {/* Kernel low layer components */}
    <rect x="20" y="302" width="722" height="82" rx="3" fill="#060d18" stroke="#1e2a3a" strokeWidth="1" />
    <text x="30" y="320" fill="#6e7681" fontSize="10" fontWeight="700" letterSpacing="1">KERNEL SUB-COMPONENTS</text>
    {[
      ["Cache Manager", 80], ["Config Manager\n(Registry)", 210], ["PnP Manager", 330],
      ["Power Manager", 440], ["SRM", 530], ["LPC/ALPC", 610], ["ETW", 690]
    ].map(([label, x]) => (
      <g key={label}>
        <rect x={x} y="328" width={label.length > 10 ? 100 : 80} height="46" rx="2" fill="#0d1117" stroke="#1e2a3a" strokeWidth="1" />
        <text x={x + (label.length > 10 ? 50 : 40)} y="354" textAnchor="middle" fill="#8b9ac7" fontSize="9">{label}</text>
      </g>
    ))}

    {/* User mode box */}
    <rect x="10" y="20" width="740" height="160" rx="4" fill="#0a150a" stroke="#00ff8844" strokeWidth="1" />
    <text x="20" y="40" fill="#00ff88" fontSize="10" fontWeight="700" letterSpacing="2">USER MODE (Ring 3) — Restricted, isolated processes</text>

    {/* Subsystems */}
    {[
      ["Win32\nSubsystem", "#00d4ff", 30],
      ["POSIX\nSubsystem", "#9b59b6", 160],
      ["WoW64\n(32-bit on 64)", "#ffd700", 290],
      ["NTDLL.DLL\nSystem Bridge", "#ff8c00", 420],
      ["CSRSS.EXE\nClient/Server", "#ff4444", 555],
      ["SMSS.EXE\nSession Mgr", "#00ff88", 670],
    ].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x} y="52" width="110" height="56" rx="3" fill="#0d1117" stroke={`${color}66`} strokeWidth="1.5" />
        <text x={x + 55} y="80" textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 55} y="96" textAnchor="middle" fill="#6e7681" fontSize="9">{label.split("\n")[1]}</text>
      </g>
    ))}

    {/* Apps */}
    {[
      ["Explorer.exe", 30], ["svchost.exe", 155], ["lsass.exe", 280],
      ["cmd.exe", 400], ["Chrome.exe", 510], ["Your Apps", 630],
    ].map(([label, x]) => (
      <g key={label}>
        <rect x={x} y="120" width="105" height="40" rx="3" fill="#060d18" stroke="#1e2a3a" strokeWidth="1" />
        <text x={x + 52} y="145" textAnchor="middle" fill="#8b9ac7" fontSize="10">{label}</text>
      </g>
    ))}

    {/* Boundary line */}
    <line x1="10" y1="185" x2="750" y2="185" stroke="#ffffff22" strokeWidth="1" strokeDasharray="6,4" />
    <text x="380" y="183" textAnchor="middle" fill="#ffffff44" fontSize="10">─────── KERNEL/USER BOUNDARY (SYSCALL INTERFACE) ───────</text>

    {/* Arrows */}
    <line x1="380" y1="400" x2="380" y2="388" stroke="#ffd70066" strokeWidth="1.5" markerEnd="url(#arr)" />
    <line x1="380" y1="454" x2="380" y2="442" stroke="#ff8c0066" strokeWidth="1.5" />
    <text x="540" y="398" fill="#ffd70044" fontSize="9">HAL abstracts</text>
  </svg>
);

// ─── Login Flow ───────────────────────────────────────────────────────────────
const LoginFlow = () => {
  const steps = [
    { id: "01", label: "Physical Boot", desc: "UEFI/BIOS POST → Bootmgr loads", color: palette.accentOrange, proc: "bootmgr.exe" },
    { id: "02", label: "OS Loader", desc: "winload.efi → loads ntoskrnl.exe + hal.dll into memory", color: palette.accentYellow, proc: "winload.efi" },
    { id: "03", label: "Session Manager", desc: "smss.exe — first user-mode process (PID 4 is System)", color: palette.accentGreen, proc: "smss.exe" },
    { id: "04", label: "Winlogon", desc: "winlogon.exe — manages secure desktop, SAS (Ctrl+Alt+Del)", color: palette.accent, proc: "winlogon.exe" },
    { id: "05", label: "LSASS", desc: "lsass.exe — credential validation, Kerberos/NTLM auth packages", color: palette.accentPurple, proc: "lsass.exe" },
    { id: "06", label: "SAM / AD Auth", desc: "Credential checked against SAM DB or Active Directory / KDC", color: palette.accentRed, proc: "SAM / kerberos.dll" },
    { id: "07", label: "Access Token", desc: "Token created: SID + group SIDs + privileges + integrity level", color: palette.accentGreen, proc: "NtCreateToken()" },
    { id: "08", label: "Explorer Shell", desc: "explorer.exe spawned with token — user desktop rendered", color: palette.accent, proc: "explorer.exe" },
  ];
  return (
    <div>
      {steps.map((s, i) => (
        <div key={s.id} style={{ display: "flex", gap: "0", marginBottom: "0" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "32px" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: `${s.color}22`, border: `1.5px solid ${s.color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", color: s.color, fontWeight: "700", flexShrink: 0,
            }}>{s.id}</div>
            {i < steps.length - 1 && <div style={{ width: "1px", height: "28px", background: `${s.color}44` }} />}
          </div>
          <div style={{ paddingLeft: "10px", paddingBottom: "8px", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: s.color, fontWeight: "700", fontSize: "12px" }}>{s.label}</span>
              <span style={styles.badge(s.color)}>{s.proc}</span>
            </div>
            <div style={{ color: palette.textDim, fontSize: "11px", marginTop: "2px" }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TAB_STYLE = (active, color) => ({
  padding: "7px 14px",
  cursor: "pointer",
  background: active ? `${color}22` : "transparent",
  border: `1px solid ${active ? color : palette.border}`,
  borderRadius: "4px",
  color: active ? color : palette.textDim,
  fontSize: "11px",
  fontWeight: active ? "700" : "400",
  letterSpacing: "0.5px",
  transition: "all 0.15s",
  fontFamily: "inherit",
});

export default function WindowsStep01() {
  const [secTab, setSecTab] = useState("attack");
  const [cmpTab, setCmpTab] = useState("kernel");

  return (
    <div style={styles.root}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={styles.topBarDot("#ff4444")} />
          <span style={styles.topBarDot("#ffd700")} />
          <span style={styles.topBarDot("#00ff88")} />
        </div>
        <span style={{ color: palette.accentGreen, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: palette.textDim, fontSize: "10px", marginLeft: "auto" }}>MODULE 01 · SESSION ACTIVE · NT 10.0</span>
        <div style={styles.topBarDot(palette.accentGreen)} />
      </div>

      <div style={styles.container}>

        {/* ── PANEL 1: Title ── */}
        <div style={{ ...styles.panel(palette.accent), background: "linear-gradient(135deg, #0d1117 60%, #001a2e)" }}>
          <div style={styles.panelBody}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: palette.textDim, fontSize: "10px", letterSpacing: "3px", marginBottom: "6px" }}>WINDOWS INTERNALS CURRICULUM · STEP 01</div>
                <div style={{ color: palette.accent, fontSize: "22px", fontWeight: "800", letterSpacing: "1px", lineHeight: "1.2" }}>
                  What Exactly Is Windows?
                </div>
                <div style={{ color: palette.textDim, fontSize: "12px", marginTop: "6px" }}>
                  NT Architecture · Kernel Internals · Enterprise Foundation
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                <Pill color={palette.accentGreen}>LEVEL: BEGINNER → ADVANCED</Pill>
                <Pill color={palette.accentOrange}>DOMAIN: OS INTERNALS</Pill>
                <Pill color={palette.accentPurple}>ROLE: ALL TRACKS</Pill>
              </div>
            </div>
            <hr style={styles.separator} />
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["SysAdmin","Security Engineer","DFIR","Red Team","Blue Team","Auditor","Infra Engineer"].map(r => (
                <span key={r} style={styles.tag(palette.accent)}>{r}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── PANEL 2: Concept ── */}
        <PanelBox title="CONCEPT EXPLANATION" icon="cpu" color={palette.accent}>
          <div style={styles.grid2}>
            <div>
              <div style={{ color: palette.accentGreen, fontWeight: "700", marginBottom: "8px", fontSize: "12px" }}>▸ BEGINNER VIEW</div>
              <Row color={palette.accentGreen}>Windows is an <strong style={{color:palette.textBright}}>operating system</strong> — software that sits between hardware and your applications, managing every resource: CPU time, memory, disk, and peripherals.</Row>
              <Row color={palette.accentGreen}>Think of it as a <strong style={{color:palette.textBright}}>city government</strong>: it issues permits (permissions), manages roads (buses/I/O), and ensures citizens (processes) don't crash into each other.</Row>
              <Row color={palette.accentGreen}>Windows is not DOS. DOS was single-tasking, single-user, no memory protection. Windows NT was a ground-up rewrite in the early 1990s.</Row>
            </div>
            <div>
              <div style={{ color: palette.accentPurple, fontWeight: "700", marginBottom: "8px", fontSize: "12px" }}>▸ TECHNICAL INTERNALS</div>
              <Row color={palette.accentPurple}>Windows NT is a <strong style={{color:palette.textBright}}>hybrid kernel</strong> — monolithic kernel core with user-mode subsystems layered on top. Written in C/C++, with some ASM for platform-critical paths.</Row>
              <Row color={palette.accentPurple}>The kernel exposes <strong style={{color:palette.textBright}}>native API (NtXxx/ZwXxx syscalls)</strong> via NTDLL.DLL. Win32 API is a higher-level wrapper translated into NT syscalls through ntdll.</Row>
              <Row color={palette.accentPurple}>All isolation is enforced by CPU <strong style={{color:palette.textBright}}>privilege rings</strong>: kernel runs at Ring 0 with full hardware access; apps run at Ring 3 and must use syscalls to request services.</Row>
            </div>
          </div>
          <hr style={styles.separator} />
          <div style={{ color: palette.accentOrange, fontWeight: "700", marginBottom: "8px", fontSize: "12px" }}>▸ WHY IT EXISTS / ENTERPRISE RELEVANCE</div>
          <div style={styles.grid3}>
            {[
              ["~90% Desktop market share", "Dominates enterprise endpoints worldwide", palette.accentGreen],
              ["Active Directory ecosystem", "Identity, auth, policy — entire enterprise depends on it", palette.accent],
              ["Attack surface reality", "Most malware targets Windows — DFIR/Blue Team must master it", palette.accentRed],
            ].map(([title, desc, color]) => (
              <div key={title} style={{ background: "#060d18", border: `1px solid ${color}33`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>{title}</div>
                <div style={{ color: palette.textDim, fontSize: "11px" }}>{desc}</div>
              </div>
            ))}
          </div>
        </PanelBox>

        {/* ── PANEL 3: Architecture Diagram ── */}
        <PanelBox title="WINDOWS NT ARCHITECTURE DIAGRAM" icon="kernel" color={palette.accentPurple} accent={palette.accentPurple + "55"}>
          <ArchDiagram />
          <hr style={styles.separator} />
          <div style={styles.grid3}>
            {[
              ["Ring 0 – Kernel Mode", "ntoskrnl.exe, hal.dll, kernel drivers. Direct hardware access. A crash = BSOD.", palette.accent],
              ["Ring 3 – User Mode", "Explorer, Chrome, lsass, svchost. Isolated via virtual address space. A crash = process dies only.", palette.accentGreen],
              ["Syscall boundary", "User code calls NtXxx via ntdll → CPU switches rings via SYSCALL instruction → kernel services request.", palette.accentPurple],
            ].map(([title, desc, color]) => (
              <div key={title} style={{ background: "#060d18", border: `1px solid ${color}33`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>{title}</div>
                <div style={{ color: palette.textDim, fontSize: "11px" }}>{desc}</div>
              </div>
            ))}
          </div>
        </PanelBox>

        {/* ── PANEL 4: Login Flow ── */}
        <PanelBox title="WORKFLOW SIMULATION — WINDOWS LOGIN PROCESS" icon="key" color={palette.accentOrange}>
          <LoginFlow />
          <hr style={styles.separator} />
          <div style={styles.code}>
            <span style={{color:palette.textDim}}>// Verify the live boot flow on your system:</span>{"\n"}
            <span style={{color:palette.accentGreen}}>Get-WinEvent</span> -LogName System | <span style={{color:palette.accentGreen}}>Where-Object</span> {"{"}$_.Id -in 12,13{"}"} | <span style={{color:palette.accentGreen}}>Select-Object</span> TimeCreated,Message{"\n"}
            <span style={{color:palette.textDim}}># EventID 12 = OS Start, EventID 13 = OS Shutdown</span>
          </div>
        </PanelBox>

        {/* ── PANEL 5: Commands ── */}
        <PanelBox title="CMD / POWERSHELL SIMULATION" icon="cmd" color={palette.accentGreen}>
          <div style={styles.grid2}>
            <div>
              <div style={{ color: palette.accentYellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSTEM ENUMERATION</div>
              <div style={styles.code}>
{`PS> Get-ComputerInfo | Select-Object `}
{`      WindowsVersion, OsArchitecture`}
{``}
{`PS> winver              # GUI version dialog`}
{`PS> systeminfo          # Full OS + hotfix info`}
{`PS> [System.Environment]::OSVersion`}
{``}
<span style={{color:palette.textDim}}>{`# Output:`}</span>
{`WindowsVersion : 10.0.19045.0
OsArchitecture : 64-bit`}
              </div>
            </div>
            <div>
              <div style={{ color: palette.accentYellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROCESS & KERNEL VIEW</div>
              <div style={styles.code}>
{`PS> Get-Process | Sort-Object CPU -Desc`}
{`    | Select -First 10`}
{``}
{`PS> tasklist /v /fo list`}
{``}
{`# See kernel mode processes (PID 4 = System):`}
{`PS> Get-Process -Id 4`}
{``}
{`# View loaded kernel modules:`}
{`PS> Get-WmiObject Win32_SystemDriver`}
{`    | Select Name, State, PathName`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: palette.accentYellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PRIVILEGE & TOKEN INSPECTION</div>
            <div style={styles.code}>
{`# Current user privileges:`}
{`C:\\> whoami /priv`}

{`# Current user group memberships & SIDs:`}
{`C:\\> whoami /groups /fo list`}

{`# Full token details (requires Sysinternals):`}
{`C:\\> accesschk.exe -a *`}

{`# View running services and their process host:`}
{`PS> Get-Service | Where-Object {$_.Status -eq "Running"}`}
{`PS> tasklist /svc`}
            </div>
          </div>
        </PanelBox>

        {/* ── PANEL 6: Internal System View ── */}
        <PanelBox title="INTERNAL SYSTEM VIEW — PROCESS TREE & TOKEN STRUCTURE" icon="proc" color={palette.accentPurple}>
          <div style={styles.grid2}>
            <div>
              <div style={{ color: palette.accentGreen, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROCESS TREE (NORMAL STATE)</div>
              <div style={styles.code}>
{`System (PID 4)           [Ring 0 kernel]
  └─ smss.exe (PID 312)  [Session Manager]
       └─ csrss.exe       [Win32 subsystem]
       └─ wininit.exe
            └─ services.exe  [SCM]
            │    └─ svchost.exe (×12+)
            └─ lsass.exe     [Auth / Creds]
            └─ lsm.exe       [Local Session]
  └─ winlogon.exe
       └─ userinit.exe
            └─ explorer.exe  [Shell]
                 └─ chrome.exe
                 └─ notepad.exe`}
              </div>
            </div>
            <div>
              <div style={{ color: palette.accent, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ACCESS TOKEN STRUCTURE</div>
              <div style={styles.code}>
{`Token Type    : Primary / Impersonation
User SID      : S-1-5-21-...-1001
Group SIDs    : Administrators (S-1-5-32-544)
               Everyone (S-1-1-0)
               INTERACTIVE (S-1-5-4)
Privileges    : SeShutdownPrivilege      [disabled]
               SeChangeNotifyPrivilege  [enabled]
               SeImpersonatePrivilege   [enabled]
Integrity Lvl : Medium (0x2000)
Session ID    : 1
`}
              </div>
              <div style={{ color: palette.textDim, fontSize: "11px", marginTop: "8px" }}>
                Every process inherits a token from its parent. Privilege escalation = manipulating this token to gain higher SIDs or enable disabled privileges.
              </div>
            </div>
          </div>
        </PanelBox>

        {/* ── PANEL 7: Security Perspective ── */}
        <PanelBox title="SECURITY PERSPECTIVE" icon="shield" color={palette.accentRed} accent={palette.accentRed + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["attack", "defense", "hardening"].map(t => (
              <button key={t} style={TAB_STYLE(secTab === t, palette.accentRed)} onClick={() => setSecTab(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {secTab === "attack" && (
            <div style={styles.grid2}>
              <div>
                <div style={{ color: palette.accentRed, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ATTACK SURFACE — WINDOWS INTERNALS</div>
                {[
                  ["LSASS Dumping", "lsass.exe holds plaintext creds / NTLM hashes in memory. MiniDump → mimikatz sekurlsa::logonpasswords", palette.accentRed],
                  ["Token Impersonation", "SeImpersonatePrivilege → steal SYSTEM token via named pipe abuse (PrintSpoofer, RoguePotato)", palette.accentOrange],
                  ["DLL Hijacking", "Missing DLL in search path → attacker plants malicious DLL. Process loads it with elevated token", palette.accentYellow],
                  ["UAC Bypass", "Auto-elevation COM objects → bypass UAC without prompt via DLL side-loading", palette.accentPurple],
                  ["Registry Persistence", "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run → execute on every login", palette.accentRed],
                ].map(([title, desc, color]) => (
                  <div key={title} style={{ background: "#1a0808", border: `1px solid ${color}44`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                    <div style={{ color, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>⚠ {title}</div>
                    <div style={{ color: palette.textDim, fontSize: "11px" }}>{desc}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: palette.accentOrange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ KERNEL ATTACK SURFACE</div>
                {[
                  ["Driver Exploitation", "Vulnerable signed drivers (BYOVD) → kernel-level code execution, disable EDR", palette.accentRed],
                  ["Syscall Hooking", "EDRs hook NTDLL syscalls — malware uses direct syscalls (Hell's Gate) to bypass", palette.accentOrange],
                  ["DKOM", "Direct Kernel Object Manipulation — hide processes by unlinking EPROCESS structures", palette.accentYellow],
                  ["Kernel Callbacks", "PsSetCreateProcessNotifyRoutine — EDRs register; rootkits remove/blind them", palette.accentPurple],
                ].map(([title, desc, color]) => (
                  <div key={title} style={{ background: "#1a0d00", border: `1px solid ${color}44`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                    <div style={{ color, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>🔥 {title}</div>
                    <div style={{ color: palette.textDim, fontSize: "11px" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secTab === "defense" && (
            <div>
              <div style={styles.grid2}>
                {[
                  ["Credential Guard", "Isolates LSASS in Hyper-V VSM. NTLM hashes and Kerberos tickets no longer extractable from memory even with SYSTEM access", palette.accentGreen],
                  ["Protected Process Light (PPL)", "lsass.exe runs as PPL — prevents non-PPL processes from opening handles even as SYSTEM", palette.accentGreen],
                  ["Windows Defender AppLocker", "Whitelist which executables, scripts, DLLs can run. Blocks most LOLBin abuse and script kiddie payloads", palette.accent],
                  ["Attack Surface Reduction (ASR)", "Defender ASR rules block: Office macros spawning child procs, LSASS access, credential theft, network persistence", palette.accent],
                  ["WDAC (Windows Defender App Control)", "Kernel-enforced code integrity. Even kernel drivers must be signed — blocks BYOVD attacks", palette.accentPurple],
                  ["Secure Boot + TPM", "UEFI Secure Boot ensures only signed boot components load. TPM seals Credential Guard keys", palette.accentYellow],
                ].map(([title, desc, color]) => (
                  <div key={title} style={{ background: "#081208", border: `1px solid ${color}44`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                    <div style={{ color, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {title}</div>
                    <div style={{ color: palette.textDim, fontSize: "11px" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secTab === "hardening" && (
            <div style={styles.code}>
{`# Enable Credential Guard via Group Policy or registry:`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA `}
{`    /v LsaCfgFlags /t REG_DWORD /d 1 /f`}
{``}
{`# Enable PPL for LSASS:`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA `}
{`    /v RunAsPPL /t REG_DWORD /d 1 /f`}
{``}
{`# Disable NTLM v1 (legacy, broken):`}
{`Set-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa `}
{`    -Name "LmCompatibilityLevel" -Value 5`}
{``}
{`# Enable PowerShell Script Block Logging:`}
{`Set-ItemProperty HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows`}
{`    \\PowerShell\\ScriptBlockLogging -Name EnableScriptBlockLogging -Value 1`}
{``}
{`# Restrict anonymous SID enumeration:`}
{`Set-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa `}
{`    -Name RestrictAnonymous -Value 1`}
            </div>
          )}
        </PanelBox>

        {/* ── PANEL 8: Monitoring ── */}
        <PanelBox title="MONITORING & TROUBLESHOOTING" icon="eye" color={palette.accentYellow}>
          <div style={styles.grid2}>
            <div>
              <div style={{ color: palette.accentYellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ KEY EVENT IDs TO MONITOR</div>
              {[
                ["4624", "Successful logon — track logon type (3=network, 10=remote interactive)", palette.accentGreen],
                ["4625", "Failed logon — brute force indicator", palette.accentRed],
                ["4688", "Process creation — new process + parent PID + command line", palette.accent],
                ["4698", "Scheduled task created — persistence indicator", palette.accentOrange],
                ["4672", "Special privileges assigned at logon — high privilege account activity", palette.accentPurple],
                ["7045", "New service installed — malware/driver drops here", palette.accentRed],
                ["4720", "User account created", palette.accentYellow],
              ].map(([id, desc, color]) => (
                <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "6px", alignItems: "flex-start" }}>
                  <span style={{ ...styles.badge(color), minWidth: "40px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                  <span style={{ color: palette.textDim, fontSize: "11px" }}>{desc}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: palette.accentGreen, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON RULE TARGETS</div>
              <div style={styles.code}>
{`Event 1  : Process Create (cmdline, hash)`}
{`Event 3  : Network Connection`}
{`Event 7  : Image Loaded (DLL loads)`}
{`Event 10 : Process Access (LSASS read!)`}
{`Event 11 : File Create`}
{`Event 13 : Registry Value Set`}
{`Event 22 : DNS Query`}
{``}
{`# Install Sysmon with SwiftOnSecurity config:`}
{`sysmon64.exe -accepteula -i sysmonconfig.xml`}
{``}
{`# Query Sysmon events in PowerShell:`}
{`Get-WinEvent -LogName "Microsoft-Windows`}
{`  -Sysmon/Operational" | Where Id -eq 10`}
              </div>
            </div>
          </div>
        </PanelBox>

        {/* ── PANEL 9: Windows vs Linux ── */}
        <PanelBox title="WINDOWS vs LINUX COMPARISON" icon="linux" color={palette.accent}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["kernel","auth","logging","permissions"].map(t => (
              <button key={t} style={TAB_STYLE(cmpTab === t, palette.accent)} onClick={() => setCmpTab(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 16px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#001a2e", border: `1px solid ${palette.accent}33`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: palette.accent, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS</div>
              {cmpTab === "kernel" && <>
                <KV k="Kernel type" v="Hybrid (monolithic core + subsystems)" kColor={palette.accent} />
                <KV k="Core binary" v="ntoskrnl.exe + hal.dll" kColor={palette.accent} />
                <KV k="Drivers" v="WDM / KMDF / UMDF, must be WHQL signed" kColor={palette.accent} />
                <KV k="Config storage" v="Registry (binary hive files)" kColor={palette.accent} />
                <KV k="Scheduler" v="Priority-based preemptive (0–31 levels)" kColor={palette.accent} />
                <KV k="Crash behavior" v="BSOD + memory dump (minidump/complete)" kColor={palette.accent} />
              </>}
              {cmpTab === "auth" && <>
                <KV k="Primary protocol" v="Kerberos v5 (domain), NTLM (fallback)" kColor={palette.accent} />
                <KV k="Identity store" v="SAM (local), Active Directory (domain)" kColor={palette.accent} />
                <KV k="Credential cache" v="LSASS memory (plaintext / hashes)" kColor={palette.accent} />
                <KV k="MFA" v="Windows Hello, Smart Card, Azure MFA" kColor={palette.accent} />
                <KV k="SSO" v="Kerberos tickets across AD forest" kColor={palette.accent} />
              </>}
              {cmpTab === "logging" && <>
                <KV k="Log format" v="EVTX binary (Event Log XML)" kColor={palette.accent} />
                <KV k="Service" v="Windows Event Log service (wevtsvc)" kColor={palette.accent} />
                <KV k="Viewer" v="Event Viewer, wevtutil, Get-WinEvent" kColor={palette.accent} />
                <KV k="Key logs" v="Security, System, Application, Sysmon" kColor={palette.accent} />
                <KV k="Audit policy" v="GPO-driven, granular subcategory control" kColor={palette.accent} />
              </>}
              {cmpTab === "permissions" && <>
                <KV k="Model" v="ACL (DACL + SACL) on every object" kColor={palette.accent} />
                <KV k="Permissions" v="Full Control, Modify, Read, Write (per ACE)" kColor={palette.accent} />
                <KV k="Ownership" v="File owner can always change permissions" kColor={palette.accent} />
                <KV k="Integrity" v="Mandatory Integrity Control (Low/Med/High/System)" kColor={palette.accent} />
                <KV k="GUI" v="icacls, Security tab in file properties" kColor={palette.accent} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: palette.textDim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a1a0a", border: `1px solid ${palette.accentGreen}33`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: palette.accentGreen, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX</div>
              {cmpTab === "kernel" && <>
                <KV k="Kernel type" v="Monolithic (modules loaded at runtime)" kColor={palette.accentGreen} />
                <KV k="Core binary" v="vmlinuz / linux kernel image" kColor={palette.accentGreen} />
                <KV k="Drivers" v="LKM (insmod/modprobe), no signing req by default" kColor={palette.accentGreen} />
                <KV k="Config storage" v="Text files under /etc, /proc, /sys" kColor={palette.accentGreen} />
                <KV k="Scheduler" v="CFS (Completely Fair Scheduler), nice values" kColor={palette.accentGreen} />
                <KV k="Crash behavior" v="kernel panic, oops, kdump / crash utility" kColor={palette.accentGreen} />
              </>}
              {cmpTab === "auth" && <>
                <KV k="Primary protocol" v="PAM framework, SSH keys, LDAP, SSSD" kColor={palette.accentGreen} />
                <KV k="Identity store" v="/etc/passwd + /etc/shadow (local)" kColor={palette.accentGreen} />
                <KV k="Credential cache" v="Kernel keyring, not in user-space memory" kColor={palette.accentGreen} />
                <KV k="MFA" v="TOTP via PAM (google-authenticator module)" kColor={palette.accentGreen} />
                <KV k="SSO" v="Kerberos (krb5), SAML (shibd), OIDC" kColor={palette.accentGreen} />
              </>}
              {cmpTab === "logging" && <>
                <KV k="Log format" v="Plain text (syslog) + journald binary" kColor={palette.accentGreen} />
                <KV k="Service" v="rsyslog / syslog-ng / journald (systemd)" kColor={palette.accentGreen} />
                <KV k="Viewer" v="journalctl, tail, grep, auditd ausearch" kColor={palette.accentGreen} />
                <KV k="Key logs" v="/var/log/auth.log, syslog, audit.log" kColor={palette.accentGreen} />
                <KV k="Audit policy" v="auditd rules (/etc/audit/rules.d/)" kColor={palette.accentGreen} />
              </>}
              {cmpTab === "permissions" && <>
                <KV k="Model" v="DAC: User/Group/Other + rwx bits (octal)" kColor={palette.accentGreen} />
                <KV k="Permissions" v="read(4), write(2), execute(1) per UGO" kColor={palette.accentGreen} />
                <KV k="Ownership" v="Only root can change file owner (chown)" kColor={palette.accentGreen} />
                <KV k="Integrity" v="SELinux/AppArmor (MAC on top of DAC)" kColor={palette.accentGreen} />
                <KV k="GUI" v="chmod, chown, getfacl/setfacl (POSIX ACL)" kColor={palette.accentGreen} />
              </>}
            </div>
          </div>
        </PanelBox>

        {/* ── PANEL 10: Enterprise Scenario ── */}
        <PanelBox title="ENTERPRISE SCENARIO — REAL WORLD CASE" icon="alert" color={palette.accentOrange} accent={palette.accentOrange + "44"}>
          <div style={{ color: palette.accentRed, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: Unauthorized SYSTEM-Level Process Detected by EDR
          </div>
          <div style={styles.grid2}>
            <div>
              <div style={{ color: palette.accentOrange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ALERT DETAILS</div>
              <div style={styles.code}>
{`EDR Alert: Suspicious Parent-Child Chain`}
{`  Parent : svchost.exe (PID 1204)`}
{`  Child  : cmd.exe (PID 4488)`}
{`  Cmdline: cmd.exe /c whoami > C:\\temp\\o.txt`}
{`  User   : NT AUTHORITY\\SYSTEM`}
{`  Time   : 02:14:37 UTC`}
{`  IntLvl : System (0x4000)`}
{``}
{`EventID 4688 captured in Security log`}
{`Sysmon Event 1 also captured`}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ color: palette.accentRed, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>Root Cause Options:</div>
                <Row color={palette.accentRed} bullet="①">Legitimate admin script run via SCCM / Scheduled Task</Row>
                <Row color={palette.accentRed} bullet="②">Service binary compromise (DLL hijack or binary replacement)</Row>
                <Row color={palette.accentRed} bullet="③">Token impersonation from lower-priv process</Row>
              </div>
            </div>
            <div>
              <div style={{ color: palette.accentGreen, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ INVESTIGATION STEPS</div>
              <div style={styles.code}>
{`# 1. Identify parent process chain:`}
{`Get-WmiObject Win32_Process | `}
{`  Where {$_.ProcessId -eq 1204} | `}
{`  Select Name, ProcessId, ParentProcessId`}
{``}
{`# 2. Check service host grouping:`}
{`tasklist /svc /fi "PID eq 1204"`}
{``}
{`# 3. Verify binary integrity:`}
{`Get-AuthenticodeSignature `}
{`  "C:\\Windows\\System32\\svchost.exe"`}
{``}
{`# 4. Check Autoruns for persistence:`}
{`autorunsc.exe -a * -c -h | `}
{`  findstr /i "cmd.exe temp"`}
              </div>
            </div>
          </div>
        </PanelBox>

        {/* ── PANEL 11: Auditor Checklist ── */}
        <PanelBox title="AUDITOR / SECURITY CHECKLIST — STEP 01 BASELINE" icon="check" color={palette.accentGreen}>
          <div style={styles.grid2}>
            {[
              [palette.accentGreen, "OS & Patch", [
                "Confirm OS is supported (not EOL)",
                "All critical patches applied (check systeminfo hotfixes)",
                "Windows Update configured (WSUS or Windows Update)",
                "Edition is Enterprise or Education (not Home)",
              ]],
              [palette.accent, "Kernel & Boot", [
                "Secure Boot enabled in UEFI",
                "Code Integrity enabled (WDAC or Secure Boot Policy)",
                "No unsigned kernel-mode drivers (driverquery /FO LIST | findstr /i sign)",
                "BitLocker enabled on system drive (TPM-based)",
              ]],
              [palette.accentPurple, "Authentication", [
                "NTLM v1 disabled (LmCompatibilityLevel ≥ 5)",
                "Credential Guard enabled (lsass.exe VSM isolation)",
                "PPL for LSASS enabled (RunAsPPL = 1)",
                "Local admin account renamed and disabled where not needed",
              ]],
              [palette.accentOrange, "Logging", [
                "Advanced Audit Policy configured (not legacy Basic Audit)",
                "PowerShell Script Block Logging enabled",
                "Sysmon deployed with tuned config",
                "EVTX logs forwarded to SIEM (WEF configured)",
              ]],
            ].map(([color, title, items]) => (
              <div key={title} style={{ background: "#060d18", border: `1px solid ${color}33`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color, fontWeight: "700", fontSize: "11px", marginBottom: "8px" }}>▸ {title}</div>
                {items.map(item => (
                  <div key={item} style={{ display: "flex", gap: "6px", marginBottom: "5px" }}>
                    <span style={{ color: palette.textDim, fontSize: "11px" }}>☐</span>
                    <span style={{ color: palette.textDim, fontSize: "11px" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </PanelBox>

        {/* ── PANEL 12: Summary ── */}
        <PanelBox title="SUMMARY — KEY TAKEAWAYS" icon="log" color={palette.accent} accent={palette.accent + "55"}>
          <div style={styles.grid3}>
            {[
              ["Windows NT is not DOS", "Complete ground-up redesign. Preemptive multitasking, memory protection, multi-user by design since NT 3.1 (1993).", palette.accentGreen],
              ["Hybrid kernel architecture", "Core kernel (ntoskrnl) + HAL + Executive subsystems. Not purely monolithic like Linux. Executive runs in kernel space.", palette.accent],
              ["Ring 0 / Ring 3 boundary", "Hardware-enforced privilege rings. All security isolation flows from this: processes can't read each other's memory without explicit handles.", palette.accentPurple],
              ["LSASS is the crown jewel", "All credentials flow through lsass.exe. Attackers go there first. Defenders protect it with PPL + Credential Guard.", palette.accentRed],
              ["Everything is an object", "Processes, threads, tokens, files, reg keys — all managed by Object Manager. ACLs control access to each.", palette.accentOrange],
              ["Enterprise runs on AD + Kerberos", "Windows dominates enterprise because of Group Policy + Active Directory. Everything is managed centrally.", palette.accentYellow],
            ].map(([title, desc, color]) => (
              <div key={title} style={{ background: "#060d18", border: `1px solid ${color}33`, borderRadius: "5px", padding: "12px" }}>
                <div style={{ color, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ {title}</div>
                <div style={{ color: palette.textDim, fontSize: "11px" }}>{desc}</div>
              </div>
            ))}
          </div>
          <hr style={styles.separator} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ color: palette.textDim, fontSize: "11px" }}>
              <span style={{ color: palette.accentGreen }}>NEXT MODULE →</span> Step 02: Windows Registry — Architecture, Hives, Attack Surface & Forensics
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill color={palette.accentGreen}>Step 01 Complete</Pill>
              <Pill color={palette.accent}>12 Panels Covered</Pill>
            </div>
          </div>
        </PanelBox>

      </div>
    </div>
  );
}
