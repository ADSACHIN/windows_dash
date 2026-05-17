import { useState } from "react";

const C = {
  bg: "#06070b",
  panel: "#080910",
  header: "#0a0c18",
  border: "#121c30",
  cyan: "#00a8d8",
  green: "#00c858",
  red: "#f81830",
  orange: "#f07800",
  yellow: "#d8a808",
  purple: "#7030d8",
  teal: "#00a888",
  pink: "#d01878",
  lime: "#68b008",
  sky: "#1890e8",
  gold: "#b07008",
  blue: "#1848d8",
  indigo: "#4030b8",
  text: "#90a8bc",
  dim: "#303e50",
  bright: "#b8d0e8",
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
  code: { background: "#030408", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "11px 13px", fontFamily: mono, fontSize: "11.5px", overflowX: "auto", whiteSpace: "pre", lineHeight: "1.75" },
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
const KV = ({ k, v, kc }) => (
  <div style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
    <span style={{ color: kc || C.teal, minWidth: "200px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span><span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── Security Architecture Overview SVG ───────────────────────────────── */
const SecurityArch = () => (
  <svg viewBox="0 0 760 560" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#303e50" fontSize="10" letterSpacing="2">WINDOWS SECURITY ARCHITECTURE — LAYERED DEFENCE MODEL</text>

    {/* VBS / Hypervisor layer — outermost */}
    <rect x="10" y="22" width="740" height="528" rx="6" fill="#07060c" stroke="#7030d833" strokeWidth="2" />
    <text x="380" y="42" textAnchor="middle" fill="#7030d8" fontSize="11" fontWeight="800" letterSpacing="1.5">VIRTUALIZATION-BASED SECURITY (VBS) — Hyper-V Ring -1</text>
    <text x="380" y="57" textAnchor="middle" fill="#303e50" fontSize="9">HVCI · Credential Guard · UEFI Secure Boot · TPM sealing · VTL 0/1 boundary</text>

    {/* Kernel layer */}
    <rect x="24" y="66" width="712" height="234" rx="4" fill="#080810" stroke="#00a8d833" strokeWidth="1.5" />
    <text x="380" y="84" textAnchor="middle" fill="#00a8d8" fontSize="10" fontWeight="700" letterSpacing="1.5">KERNEL MODE (Ring 0) — SECURITY ENFORCEMENT LAYER</text>

    {[
      { label: "Security Reference Monitor (SRM)", color: C.red, x: 30, y: 92, w: 210, desc: "Access checks on every object open. Token SID vs ACE evaluation. Cannot be bypassed from user mode." },
      { label: "Kernel Patch Guard (KPP)", color: C.orange, x: 255, y: 92, w: 200, desc: "Monitors SSDT, IDT, GDT, MSRs, callbacks. Tampering → BSOD 0x109. Obfuscated + random-interval checks." },
      { label: "SMEP / SMAP / CET (CPU)", color: C.purple, x: 470, y: 92, w: 200, desc: "SMEP: kernel can't exec user pages. SMAP: kernel can't read user pages without STAC. CET: shadow stack." },
      { label: "WFP (Windows Filtering Platform)", color: C.teal, x: 685, y: 92, w: 39, desc: "Firewall callout layers." },
      { label: "PatchGuard-protected structures", color: C.yellow, x: 30, y: 164, w: 210, desc: "Process callbacks, image load callbacks, SSDT table, IDT — all monitored for integrity." },
      { label: "HVCI (Hypervisor Code Integrity)", color: C.green, x: 255, y: 164, w: 200, desc: "All kernel pages must be WHQL-signed before becoming executable. Enforced by Hyper-V from VTL 1." },
      { label: "Driver Signing Enforcement", color: C.sky, x: 470, y: 164, w: 200, desc: "64-bit: all kernel drivers must carry WHQL signature. Test signing blocked by Secure Boot." },
      { label: "HAL + Mitigation flags per process", color: C.lime, x: 685, y: 164, w: 38, desc: "" },
    ].map(({ label, color, x, y, w, desc }) => (
      <g key={label}>
        <rect x={x} y={y} width={w} height={62} rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + w/2} y={y + 18} textAnchor="middle" fill={color} fontSize={w > 150 ? "9.5" : "8"} fontWeight="700">{label}</text>
        <text x={x + w/2} y={y + 34} textAnchor="middle" fill="#303e50" fontSize="8">{desc.slice(0, 36)}</text>
        {desc.length > 36 && <text x={x + w/2} y={y + 47} textAnchor="middle" fill="#303e50" fontSize="8">{desc.slice(36, 72)}</text>}
      </g>
    ))}

    {/* Boundary */}
    <line x1="24" y1="302" x2="736" y2="302" stroke="#ffffff0e" strokeWidth="1" strokeDasharray="6,4" />
    <text x="380" y="301" textAnchor="middle" fill="#ffffff18" fontSize="9">─── KERNEL / USER BOUNDARY ───</text>

    {/* User mode integrity layers */}
    <rect x="24" y="308" width="712" height="236" rx="4" fill="#070810" stroke="#00c85833" strokeWidth="1.5" />
    <text x="380" y="326" textAnchor="middle" fill="#00c858" fontSize="10" fontWeight="700" letterSpacing="1.5">USER MODE — MANDATORY INTEGRITY CONTROL + SANDBOXING</text>

    {/* MIC levels */}
    {[
      { label: "System (0x4000)", desc: "NT AUTHORITY\\SYSTEM processes. OS core components. Cannot be written to by High IL.", color: C.red, x: 30, y: 334 },
      { label: "High (0x3000)", desc: "Elevated admin token. Run as Administrator. UAC consent elevation required to reach here.", color: C.orange, x: 225, y: 334 },
      { label: "Medium (0x2000)", desc: "Default for logged-in users. Standard apps. Most processes run here. Can't write to High IL objects.", color: C.yellow, x: 420, y: 334 },
      { label: "Low (0x1000)", desc: "IE Protected Mode, sandboxed browsers. Limited file/reg write. Temp folders only. Isolated.", color: C.green, x: 615, y: 334 },
    ].map(({ label, desc, color, x, y }) => (
      <g key={label}>
        <rect x={x} y={y} width="182" height="62" rx="3" fill={`${color}0c`} stroke={`${color}55`} strokeWidth="1.5" />
        <text x={x + 91} y={y + 18} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label}</text>
        <text x={x + 91} y={y + 34} textAnchor="middle" fill="#303e50" fontSize="8.5">{desc.slice(0, 30)}</text>
        <text x={x + 91} y={y + 48} textAnchor="middle" fill="#303e50" fontSize="8.5">{desc.slice(30)}</text>
      </g>
    ))}

    {/* Sandbox / AppContainer */}
    <rect x="30" y="410" width="696" height="128" rx="4" fill="#07080d" stroke="#7030d833" strokeWidth="1" />
    <text x="380" y="428" textAnchor="middle" fill="#7030d8" fontSize="10" fontWeight="700">SANDBOXING & ISOLATION MECHANISMS</text>
    {[
      { label: "AppContainer\n(UWP / Edge)", color: C.purple, x: 38, desc: "Capability-based access. SID S-1-15-2-*. No network/file unless granted.", y: 436 },
      { label: "Protected Process\n(PP/PPL)", color: C.red, x: 186, desc: "SignerType restricts who can open handle. Credential Guard uses PP.", y: 436 },
      { label: "Job Objects\n(process groups)", color: C.teal, x: 334, desc: "Resource limits: memory, CPU, handle count. Container-like isolation.", y: 436 },
      { label: "Windows Sandbox\n(VM-based)", color: C.sky, x: 482, desc: "Hyper-V VM with snapshot. Throwaway environment. No persistence.", y: 436 },
      { label: "WSL 2\n(Linux in Hyper-V)", color: C.lime, x: 630, desc: "Lightweight VM. Linux kernel. Isolated from host NTFS by default.", y: 436 },
    ].map(({ label, color, x, desc, y }) => (
      <g key={label}>
        <rect x={x} y={y} width="138" height="92" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 69} y={y + 18} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 69} y={y + 32} textAnchor="middle" fill={color} fontSize="8.5">{label.split("\n")[1]}</text>
        <text x={x + 69} y={y + 52} textAnchor="middle" fill="#303e50" fontSize="8">{desc.slice(0, 30)}</text>
        <text x={x + 69} y={y + 65} textAnchor="middle" fill="#303e50" fontSize="8">{desc.slice(30)}</text>
      </g>
    ))}
  </svg>
);

/* ── UAC Architecture SVG ──────────────────────────────────────────────── */
const UACArch = () => (
  <svg viewBox="0 0 760 400" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#303e50" fontSize="10" letterSpacing="2">UAC — USER ACCOUNT CONTROL ELEVATION FLOW</text>

    {/* Standard token path */}
    <rect x="10" y="24" width="340" height="360" rx="4" fill="#07080d" stroke="#00c85833" strokeWidth="1.5" />
    <text x="185" y="44" textAnchor="middle" fill="#00c858" fontSize="10" fontWeight="700">STANDARD USER / FILTERED TOKEN PATH</text>

    {[
      { label: "User logs on interactively", color: C.cyan, y: 54 },
      { label: "LSASS creates TWO tokens", color: C.teal, y: 94 },
      { label: "Filtered Token (Medium IL)", color: C.yellow, y: 134, desc: "Groups: Admins group DISABLED\nPrivileges: most removed\nIntegrity: Medium (0x2000)" },
      { label: "Full Admin Token (High IL)", color: C.orange, y: 214, desc: "Groups: Admins ENABLED\nPrivileges: all present\nIntegrity: High (0x3000)\n→ stored, not used by default" },
      { label: "Desktop runs with Filtered Token", color: C.green, y: 294, desc: "explorer.exe, all apps = Medium IL\nNo admin access without elevation" },
    ].map(({ label, color, y, desc }) => (
      <g key={label}>
        <rect x="18" y={y} width="324" height={desc ? 72 : 32} rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x="180" y={y + 18} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label}</text>
        {desc && desc.split("\n").map((d, i) => (
          <text key={d} x="180" y={y + 34 + i * 13} textAnchor="middle" fill="#303e50" fontSize="8.5">{d}</text>
        ))}
        {y < 294 && <line x1="180" y1={y + (desc ? 72 : 32)} x2="180" y2={y + (desc ? 82 : 42)} stroke={`${color}44`} strokeWidth="1" />}
      </g>
    ))}

    {/* Elevation path */}
    <rect x="410" y="24" width="340" height="360" rx="4" fill="#07080d" stroke="#f0780033" strokeWidth="1.5" />
    <text x="580" y="44" textAnchor="middle" fill="#f07800" fontSize="10" fontWeight="700">ELEVATION REQUEST PATH</text>

    {[
      { label: "App requests elevation\n(requireAdministrator manifest)", color: C.orange, y: 54, h: 44 },
      { label: "AIS (AppInfo Service) checks\nauto-elevation eligibility", color: C.yellow, y: 108, h: 44 },
      { label: "Auto-elevation? (MS signed + allowed list)", color: C.cyan, y: 162, h: 32 },
    ].map(({ label, color, y, h }) => (
      <g key={label}>
        <rect x="418" y={y} width="324" height={h} rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        {label.split("\n").map((l, i) => (
          <text key={l} x="580" y={y + 18 + i * 14} textAnchor="middle" fill={color} fontSize="9.5" fontWeight={i===0?"700":"400"}>{l}</text>
        ))}
      </g>
    ))}

    {/* Decision branches */}
    <text x="518" y="212" fill="#00c858" fontSize="9" fontWeight="700">YES → Silent elevation</text>
    <text x="618" y="212" fill="#f07800" fontSize="9" fontWeight="700">NO → Consent.exe</text>

    <rect x="418" y="220" width="148" height="44" rx="3" fill="#00c8580c" stroke="#00c85844" strokeWidth="1.5" />
    <text x="492" y="238" textAnchor="middle" fill="#00c858" fontSize="9" fontWeight="700">Silent Elevation</text>
    <text x="492" y="252" textAnchor="middle" fill="#303e50" fontSize="8.5">No prompt shown</text>
    <text x="492" y="264" textAnchor="middle" fill="#303e50" fontSize="8.5">High IL token created</text>

    <rect x="578" y="220" width="164" height="44" rx="3" fill="#f078000c" stroke="#f0780044" strokeWidth="1.5" />
    <text x="660" y="238" textAnchor="middle" fill="#f07800" fontSize="9" fontWeight="700">Consent.exe (secure desktop)</text>
    <text x="660" y="252" textAnchor="middle" fill="#303e50" fontSize="8.5">UAC dialog shown</text>
    <text x="660" y="264" textAnchor="middle" fill="#303e50" fontSize="8.5">User approves/cancels</text>

    {/* Token creation */}
    <rect x="418" y="278" width="324" height="44" rx="3" fill="#7030d80c" stroke="#7030d844" strokeWidth="1.5" />
    <text x="580" y="296" textAnchor="middle" fill="#7030d8" fontSize="10" fontWeight="700">High IL Token Linked to Filtered Token</text>
    <text x="580" y="312" textAnchor="middle" fill="#303e50" fontSize="8.5">NtCreateToken() → High IL process created → Elevated app runs as admin</text>

    {/* UAC bypass note */}
    <rect x="418" y="334" width="324" height="44" rx="3" fill="#f018300c" stroke="#f0183033" strokeWidth="1.5" />
    <text x="580" y="352" textAnchor="middle" fill="#f01830" fontSize="9.5" fontWeight="700">⚠ UAC BYPASS TARGETS</text>
    <text x="580" y="367" textAnchor="middle" fill="#303e50" fontSize="8.5">Auto-elevation abuse: eventvwr, fodhelper, sdclt, ComputerDefaults</text>
    <text x="580" y="379" textAnchor="middle" fill="#303e50" fontSize="8.5">COM object hijacking → DLL side-loading in high-IL context</text>
  </svg>
);

/* ── MIC / Integrity Level Deep Dive ────────────────────────────────────── */
const MICDeepDive = () => (
  <div>
    <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>▸ MANDATORY INTEGRITY CONTROL — OBJECT WRITE-UP POLICY</div>
    <div style={S.grid2}>
      <div>
        <div style={S.code}>
{`MIC enforcement rules:`}
{``}
{`NO-WRITE-UP (default policy):`}
{`  A process CANNOT write to objects with`}
{`  higher integrity level than itself.`}
{``}
{`  Medium IL process → High IL object: DENIED`}
{`  Low IL process   → Medium IL object: DENIED`}
{`  Low IL process   → High IL object: DENIED`}
{``}
{`Allowed directions:`}
{`  High IL → writes Medium IL objects: OK`}
{`  High IL → writes Low IL objects: OK`}
{`  Medium IL → writes Low IL objects: OK`}
{``}
{`SACL integrity label on every securable object:`}
{`  MANDATORY_LABEL_ACE:`}
{`    SID: S-1-16-<level>  (integrity SID)`}
{`    Policy: 0x1 = NoWriteUp`}
{`            0x2 = NoReadUp`}
{`            0x4 = NoExecuteUp`}
{``}
{`# Check file integrity label:`}
{`icacls C:\\Windows\\System32\\cmd.exe`}
{`# Output: Mandatory Label\High Mandatory Level`}
{``}
{`# Check process integrity level:`}
{`PS> (New-Object System.Security.Principal.`}
{`    WindowsIdentity.GetCurrent()).Owner`}
{`PS> Get-Process | ForEach {`}
{`    $h = OpenProcess(...); GetTokenInformation...}`}
        </div>
      </div>
      <div>
        <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ INTEGRITY LEVEL × ATTACK SURFACE MATRIX</div>
        {[
          { il: "System (0x4000)", sid: "S-1-16-16384", color: C.red, processes: "csrss, lsass, smss, wininit, System", writes: "Anything", reads: "Anything", attack: "Kernel exploit or PPL bypass required to reach. Primary target for rootkits." },
          { il: "High (0x3000)", sid: "S-1-16-12288", color: C.orange, processes: "Elevated cmd.exe, services.exe, mmc.exe (elevated)", writes: "Medium + Low IL objects", reads: "All", attack: "UAC bypass to reach without user consent. Token elevation or impersonation attacks." },
          { il: "Medium (0x2000)", sid: "S-1-16-8192", color: C.yellow, processes: "explorer.exe, chrome.exe, most user apps", writes: "Medium + Low IL only", reads: "High + Medium + Low", attack: "Default landing zone for exploits. Can't write to High IL (UAC objects, protected paths)." },
          { il: "Low (0x1000)", sid: "S-1-16-4096", color: C.green, processes: "IE Protected Mode, sandboxed browser tabs, email attachments", writes: "Only Low IL locations (%TEMP%\\Low)", reads: "Medium + Low only", attack: "Sandbox escape required to reach Medium IL. Exploit must break out of Low IL boundary." },
          { il: "Untrusted (0x0)", sid: "S-1-16-0", color: C.dim, processes: "Anonymous processes, some AppContainer components", writes: "Only Untrusted objects", reads: "Very limited", attack: "Most restrictive. Used for AppContainer low-trust contexts and anonymous access tokens." },
        ].map(({ il, sid, color, processes, writes, attack }) => (
          <div key={il} style={{ background: "#07080c", border: `1px solid ${color}33`, borderRadius: "4px", padding: "9px", marginBottom: "8px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
              <span style={{ color, fontWeight: "700", fontSize: "11.5px" }}>{il}</span>
              <span style={S.badge(color)}>{sid}</span>
            </div>
            <div style={{ color: C.dim, fontSize: "10.5px", marginBottom: "3px" }}>
              <strong style={{ color: C.teal }}>Examples:</strong> {processes}
            </div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>
              <strong style={{ color: C.red }}>Attack surface:</strong> {attack}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── AppContainer Internals ─────────────────────────────────────────────── */
const AppContainerPanel = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ APPCONTAINER SANDBOX ARCHITECTURE</div>
        <div style={S.code}>
{`AppContainer = UWP app isolation model`}
{`Used by: Edge (legacy/Chromium), UWP apps,`}
{`         Windows Store apps, Office sandboxed`}
{``}
{`Token structure for AppContainer process:`}
{`  IntegrityLevel:  Low (0x1000)`}
{`  UserSID:         Regular user SID`}
{`  AppContainerSID: S-1-15-2-<package-specific>`}
{`  Capabilities:    Declared in package manifest`}
{`    internetClient`}
{`    privateNetworkClientServer`}
{`    picturesLibrary`}
{`    microphone`}
{`    ... (each granted as group SID)`}
{``}
{`File system access:`}
{`  C:\\Users\\%user%\\AppData\\Local\\Packages\\`}
{`    <PackageName>\\  → Full access (own sandbox)`}
{`  C:\\Windows\\     → Read only (system files)`}
{`  C:\\Users\\*\\Documents → DENIED (no capability)`}
{`  Network outbound → DENIED (no internetClient cap)`}
{``}
{`Registry access:`}
{`  HKCU\\Software\\Classes\\<Package>  → own store`}
{`  HKCU\\Software\\ → Read only`}
{`  HKLM\\             → Read only`}
{``}
{`Named objects:`}
{`  AppContainer processes use isolated object namespace`}
{`  \\Sessions\\X\\AppContainerNamedObjects\\<SID>`}
{`  Cannot communicate with non-AppContainer by default`}
        </div>
      </div>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ CAPABILITY SYSTEM & BROKER ARCHITECTURE</div>
        {[
          ["Capability-based access", "Apps declare required capabilities in package manifest. OS grants each capability as a group SID in the process token. No capability = no access, even if file ACL allows.", C.purple],
          ["App Broker (RuntimeBroker.exe)", "Mediates between AppContainer apps and full-trust OS. User prompt for first-time capability use (location, camera). Runs at Medium IL as trusted intermediary.", C.teal],
          ["LPAC (Less Privileged AppContainer)", "Edge/Chromium uses LPAC — even more restricted than standard AppContainer. Fewer capabilities, isolated COM activation. Render processes have LPAC, broker has AppContainer.", C.cyan],
          ["AppContainer escape history", "CVE-2021-31955 (kernel pool), various sandbox escapes. Each exploits broker trust boundaries or misconfigured object namespace ACLs.", C.red],
          ["Detection — AppContainer processes", "Process token has AppContainerSid in groups. Use Process Explorer → Security → Groups to identify. AppContainer = SID starting S-1-15-2-*.", C.green],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Exploit Mitigations Table ────────────────────────────────────────────*/
const MitigationsTable = () => {
  const mitigations = [
    { name: "ASLR", full: "Address Space Layout Randomisation", since: "Vista", how: "Randomises base addresses of images, heap, stack, PEB/TEB at load time. 64-bit: 248 possible positions — not brute-forceable.", bypass: "Info-leak (pointer leak) reveals base → compute actual addresses. Fix: eliminate all info-leaks; mandatory ASLR.", color: C.cyan, level: "OS" },
    { name: "DEP/NX", full: "Data Execution Prevention / No-Execute", since: "XP SP2", how: "CPU NX bit marks heap/stack pages non-executable. Code execution from data pages → access violation. Hardware-enforced.", bypass: "ROP (Return Oriented Programming) chains use existing executable code — DEP doesn't prevent. Fix: CET (shadow stack).", color: C.green, level: "CPU+OS" },
    { name: "SEHOP", full: "Structured Exception Handler Overwrite Protection", since: "Vista SP1", how: "Validates SEH chain integrity before dispatching exceptions. Chain must end at registered valid terminator. 32-bit only.", bypass: "Not applicable on 64-bit (table-based EH). On 32-bit: bypass via heap info-leak of cookie value.", color: C.teal, level: "OS" },
    { name: "Stack Canary (GS)", full: "Stack Buffer Overrun Detection (/GS)", since: "VS2002", how: "Compiler places random canary between local vars and return address. On function return: verify canary. Mismatch → terminate.", bypass: "Info-leak of canary value → overwrite canary with correct value. Or overwrite exception handler (before SEH fires).", color: C.yellow, level: "Compiler" },
    { name: "CFG", full: "Control Flow Guard", since: "Win8.1", how: "Compiler instruments every indirect call/jump with validity check against bitmap of valid targets. Invalid → fast-fail.", bypass: "Overwrite indirect call target with a valid CFG target that does something useful (pivot). Direct calls unchecked.", color: C.orange, level: "Compiler+OS" },
    { name: "CET", full: "Control-flow Enforcement Technology (Shadow Stack)", since: "Win10 20H1+", how: "Hardware shadow stack (separate, read-only to software). Every CALL pushes return address there. RET compares with shadow — mismatch → exception.", bypass: "Requires compromising shadow stack (separate hardware page). JOP/COP chains still possible. setjmp/longjmp exceptions.", color: C.purple, level: "CPU+OS" },
    { name: "SMEP", full: "Supervisor Mode Execution Prevention", since: "Ivy Bridge+", how: "CPU blocks kernel (supervisor) from executing user-mode pages. CR4.SMEP=1. Kernel shellcode in user space → fault.", bypass: "ROP chain in kernel space. Or modify CR4 to clear SMEP (blocked by HVCI). Or use existing kernel code only.", color: C.red, level: "CPU" },
    { name: "SMAP", full: "Supervisor Mode Access Prevention", since: "Broadwell+", how: "CPU blocks kernel from reading/writing user-mode pages without STAC instruction. Prevents kernel from accessing user buffers accidentally.", bypass: "Find kernel code path that uses STAC before user-mode access. Complex to exploit around.", color: C.pink, level: "CPU" },
    { name: "HVCI", full: "Hypervisor Code Integrity", since: "Win10 1607", how: "Hyper-V enforces that all kernel pages must be signed before becoming executable. Cannot mark kernel page as RWX.", bypass: "Requires Hyper-V compromise (Ring -1 level attack). Effectively unbypassable on properly configured system.", color: C.lime, level: "Hypervisor" },
    { name: "ACG", full: "Arbitrary Code Guard", since: "Win10 1703", how: "Per-process: blocks VirtualAlloc(RWX) and VirtualProtect to change existing pages to executable. Prevents JIT spray and shellcode allocation.", bypass: "Cannot allocate new executable memory. JIT compiler must use ACG-compatible pattern (write to separate non-exec page, then flip — one-time).", color: C.sky, level: "OS (per-process)" },
    { name: "CIG", full: "Code Integrity Guard", since: "Win10 1607", how: "Only Microsoft-signed DLLs can load into the process. Unsigned DLL injection blocked at image load. Edge, Teams, LSASS use this.", bypass: "Cannot inject unsigned DLL. Must compromise a trusted DLL or exploit a signed DLL. High bar.", color: C.gold, level: "OS (per-process)" },
    { name: "KPP", full: "Kernel Patch Guard", since: "Vista x64", how: "Verifies integrity of critical kernel structures (SSDT, IDT, GDT, callbacks) at random intervals. Mismatch → BSOD 0x109.", bypass: "Disable via BYOVD + kernel exploit before KPP check fires. Or accept BSOD risk. HVCI makes bypass near-impossible.", color: C.indigo, level: "OS (kernel)" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "80px 60px 180px 1fr 1fr", gap: "1px", background: C.border, borderRadius: "4px 4px 0 0", overflow: "hidden" }}>
        {["NAME","SINCE","FULL NAME","HOW IT WORKS","BYPASS (what it doesn't stop)"].map(h => (
          <div key={h} style={{ background: C.header, padding: "7px 8px" }}>
            <span style={{ color: C.dim, fontWeight: "700", fontSize: "10px" }}>{h}</span>
          </div>
        ))}
      </div>
      <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 4px 4px", overflow: "hidden" }}>
        {mitigations.map(({ name, full, since, how, bypass, color, level }, i) => (
          <div key={name} style={{ display: "grid", gridTemplateColumns: "80px 60px 180px 1fr 1fr", gap: "1px", background: i % 2 === 0 ? "#06070b" : C.panel, borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ padding: "7px 8px" }}><span style={{ color, fontWeight: "700", fontSize: "11px" }}>{name}</span><br/><span style={{ color: C.dim, fontSize: "9px" }}>{level}</span></div>
            <div style={{ padding: "7px 8px" }}><span style={{ color: C.dim, fontSize: "10.5px" }}>{since}</span></div>
            <div style={{ padding: "7px 8px" }}><span style={{ color: color, fontSize: "10px" }}>{full}</span></div>
            <div style={{ padding: "7px 8px" }}><span style={{ color: C.text, fontSize: "10.5px" }}>{how}</span></div>
            <div style={{ padding: "7px 8px" }}><span style={{ color: C.dim, fontSize: "10.5px" }}>{bypass}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── PPL Architecture ───────────────────────────────────────────────────── */
const PPLPanel = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROTECTED PROCESS (PP) & PROTECTED PROCESS LIGHT (PPL)</div>
        <div style={S.code}>
{`Protected Process (PP) — Windows Vista+`}
{`  EPROCESS.ProtectedProcess = 1`}
{`  SignerType: WinSystem, WinTcb, etc.`}
{`  Only PP processes with higher/equal signer`}
{`  type can open a handle to another PP.`}
{``}
{`Protected Process Light (PPL) — Win8.1+`}
{`  EPROCESS.SignatureLevel (4 bits) + ProtectionLevel`}
{`  PPL hierarchy (SignerType, higher = more powerful):`}
{``}
{`  PS_PROTECTED_SYSTEM (7)        → PsProtectedSignerSystem`}
{`  PS_PROTECTED_WINTCB (6)        → Windows kernel, lsass w/ CG`}
{`  PS_PROTECTED_WINDOWS (5)       → Core OS services`}
{`  PS_PROTECTED_LSALGT (4)        → lsass with RunAsPPL=1`}
{`  PS_PROTECTED_ANTIMALWARE (3)   → AV/EDR processes`}
{`  PS_PROTECTED_AUTHENTICODE (2)  → Authenticode-signed`}
{`  PS_PROTECTED_NONE (0)          → Not protected`}
{``}
{`Rule: process B can OpenProcess on A only if:`}
{`  B.SignerType >= A.SignerType`}
{`  OR B is PP and A is PPL`}
{``}
{`# Verify lsass PPL status:`}
{`# Process Explorer → lsass → pink shield icon = PPL`}
{`# Registry: HKLM\System\...\Control\Lsa\RunAsPPL = 1`}
        </div>
      </div>
      <div>
        <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WHY PPL MATTERS FOR SECURITY</div>
        {[
          ["LSASS dump prevention", "With RunAsPPL=1: lsass.exe runs as PPL type LSA. Standard processes (even SYSTEM) get ACCESS_DENIED on OpenProcess. Most credential dumping tools fail silently.", C.green],
          ["AV/EDR self-protection", "Security vendors register their processes as PPL_ANTIMALWARE. Malware running at Medium/High IL cannot terminate or inject into AV process.", C.cyan],
          ["EDR driver integrity", "PPL processes can only load PPL-compatible drivers (matching or higher SignerType). Prevents injection of unsigned DLLs into protected processes (CIG enforced).", C.teal],
          ["BYOVD still works (partially)", "A vulnerable signed kernel driver (BYOVD) running at Ring 0 can modify EPROCESS.ProtectionLevel directly — bypassing PPL from kernel. HVCI closes this by preventing unsigned driver load.", C.red],
          ["PPL bypass via kernel exploits", "Direct kernel object manipulation (DKOM) can zero out ProtectionLevel field. Only mitigation is HVCI + KPP monitoring the EPROCESS structures.", C.orange],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Security Workflow ─────────────────────────────────────────────────── */
const SecWorkflow = () => {
  const steps = [
    { id:"01", label:"Process makes privileged API call", sub:"e.g. OpenProcess(lsass.exe, PROCESS_VM_READ)", color:C.cyan, detail:"User-mode call. Winsock / kernel32 / advapi32 marshal the request. Parameters validated (address range, flags). NtOpenProcess syscall dispatched to kernel via SYSCALL instruction." },
    { id:"02", label:"Kernel receives IRP / syscall", sub:"KiSystemCall64 → NtOpenProcess dispatch table", color:C.purple, detail:"Ring 3 → Ring 0 transition. CPU validates privilege level. System call table entry resolves to NtOpenProcess. Stack frame saved in KTRAP_FRAME." },
    { id:"03", label:"Security Reference Monitor evaluates", sub:"SeAccessCheck() against target object DACL", color:C.red, detail:"SRM reads caller's access token (SID, privileges, integrity level). Reads target object's security descriptor (DACL + mandatory label). Each ACE evaluated in order. Result: ALLOW / DENY." },
    { id:"04", label:"PPL check performed", sub:"If target is PPL/PP: check signer type hierarchy", color:C.orange, detail:"Kernel checks EPROCESS.SignatureLevel of target (lsass). Compares with caller's protection level. If caller is unprotected (Medium/High IL regular process) and target is PPL_LSA: ACCESS_DENIED returned immediately." },
    { id:"05", label:"WFP filter evaluated (if network)", sub:"Windows Filtering Platform callout layers", color:C.pink, detail:"For network-related calls: WFP evaluates all registered filters at applicable layer (ALE_AUTH_CONNECT, OUTBOUND_TRANSPORT). Firewall rules, EDR callout drivers, VPN callouts all evaluated." },
    { id:"06", label:"Integrity level check (MIC)", sub:"MandatoryLabel SID comparison", color:C.yellow, detail:"Object's mandatory label checked against caller's integrity level. If NO-WRITE-UP policy and caller IL < object IL: write access denied regardless of DACL result. Read access may still be permitted." },
    { id:"07", label:"Handle created in caller's handle table", sub:"ObCreateHandle() on success", color:C.green, detail:"If all checks pass: kernel object referenced, handle entry added to caller's handle table. Handle value (multiple of 4) returned to user-mode. Granted access mask stored in handle table entry." },
    { id:"08", label:"AMSI / ETW / EDR callbacks", sub:"Parallel telemetry — cannot block but can alert", color:C.teal, detail:"ETW providers record the operation. EDR's kernel callbacks (registered via PsSetCreateProcessNotifyRoutine, ObRegisterCallbacks) notified. AMSI receives content if applicable. All generate telemetry independently of access decision." },
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

/* ── UAC Bypass Techniques (Educational) ───────────────────────────────── */
const UACBypassPanel = () => (
  <div>
    <div style={{ color: C.orange, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>
      ▸ UAC BYPASS TECHNIQUES — HOW AUTO-ELEVATION IS ABUSED & HOW TO DEFEND
    </div>
    <div style={{ background: "#100808", border: `1px solid ${C.red}33`, borderRadius: "4px", padding: "10px", marginBottom: "12px" }}>
      <div style={{ color: C.red, fontWeight: "700", fontSize: "11px" }}>Why UAC bypasses exist:</div>
      <div style={{ color: C.dim, fontSize: "11px", marginTop: "4px" }}>Auto-elevation allows certain Microsoft-signed executables to elevate silently without prompting the user. These executables are exploited by placing malicious code in locations they load — registry keys, DLL search paths, or COM objects they activate. UAC bypasses require <strong style={{color:C.bright}}>already having Medium IL code execution</strong> — they escalate from Medium to High IL, not from non-admin to admin.</div>
    </div>
    <div style={S.grid2}>
      {[
        { name: "eventvwr.exe hijack", color: C.orange, how: "eventvwr.exe reads HKCU\\Software\\Classes\\mscfile\\shell\\open\\command before HKLM. Attacker writes malicious EXE path here. eventvwr (auto-elevates) executes it at High IL.", detect: "Sysmon Event 13: HKCU\\...\\mscfile registry write from non-admin context. eventvwr.exe spawning unexpected child (Sysmon Event 1).", defend: "Remove non-admin write access to HKCU\\Software\\Classes via registry ACL OR disable auto-elevation via GPO: ConsentPromptBehaviorAdmin = 2 (always prompt)." },
        { name: "fodhelper.exe hijack", color: C.yellow, how: "fodhelper.exe reads HKCU\\Software\\Classes\\ms-settings\\shell\\open\\command. Write DelegateExecute value → any command runs at High IL when fodhelper auto-elevates.", detect: "Sysmon Event 13 on HKCU\\...\\ms-settings. fodhelper.exe spawning child process (Sysmon Event 1). Child has higher IL than expected parent.", defend: "Monitor ms-settings registry key in HKCU. WDAC policy restricts which processes can be spawned by auto-elevated binaries." },
        { name: "CMSTPLUA COM hijack", color: C.purple, how: "CMSTP.exe has a registered COM object ({3E5FC7F9-9A51-4367-9063-A120244FBEC7}) that runs with auto-elevation. Calling this COM object's method allows code execution at High IL.", detect: "CMSTP.exe spawned from unusual parent. COM activation of CMSTPLUA GUID. Sysmon Event 1: cmstp.exe with non-standard arguments.", defend: "WDAC policy blocking cmstp.exe invocation or restricting COM object access. GPO: always-prompt elevation." },
        { name: "sdclt.exe / CompMgmtLauncher", color: C.teal, how: "sdclt.exe reads HKCU registry for DelegateExecute before launching control.exe. Replace with malicious path → High IL execution. CompMgmtLauncher similarly reads HKCU for file association.", detect: "Sysmon Event 13 on backup-related HKCU keys. Unexpected process spawned by sdclt.exe. Timeline: HKCU write → sdclt execution → child process within seconds.", defend: "AppLocker/WDAC restricts sdclt.exe invocation. Monitoring HKCU writes for auto-elevation exploit patterns (DelegateExecute subkey creation)." },
      ].map(({ name, color, how, detect, defend }) => (
        <div key={name} style={{ background: "#08090d", border: `1px solid ${color}33`, borderRadius: "5px", padding: "12px", marginBottom: "10px" }}>
          <div style={{ color, fontWeight: "800", fontSize: "12px", marginBottom: "8px" }}>{name}</div>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: color, fontSize: "10px", fontWeight: "700" }}>HOW: </span>
            <span style={{ color: C.dim, fontSize: "10.5px" }}>{how}</span>
          </div>
          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: C.green, fontSize: "10px", fontWeight: "700" }}>DETECT: </span>
            <span style={{ color: C.dim, fontSize: "10.5px" }}>{detect}</span>
          </div>
          <div>
            <span style={{ color: C.cyan, fontSize: "10px", fontWeight: "700" }}>DEFEND: </span>
            <span style={{ color: C.dim, fontSize: "10.5px" }}>{defend}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function WindowsStep12() {
  const [archTab, setArchTab] = useState("overview");
  const [intTab,  setIntTab]  = useState("mitigations");
  const [secTab,  setSecTab]  = useState("uac_bypass");
  const [defTab,  setDefTab]  = useState("config");
  const [cmpTab,  setCmpTab]  = useState("sandbox");
  const [monTab,  setMonTab]  = useState("events");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.red, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 12 · SECURITY ARCHITECTURE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.red), background: "linear-gradient(135deg, #080910 55%, #180008)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 12</div>
                <div style={{ color: C.red, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Windows Security Architecture</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>UAC · Integrity Levels · MIC · AppContainer · PPL · Exploit Mitigations · VBS · Sandbox</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The layered security model built into every version of Windows — and what makes modern exploitation so hard</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → EXPERT</Pill>
                <Pill c={C.red}>DOMAIN: SECURITY ARCHITECTURE / HARDENING</Pill>
                <Pill c={C.purple}>MODULE 12 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Security Architect","Red Team","Blue Team","Exploit Dev","EDR Engineer","Kernel Dev","DFIR","Vulnerability Researcher","Auditor"].map(r => (
                <Tag key={r} c={C.red}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}>Windows security is <strong style={{color:C.bright}}>layered like an onion</strong>. At the outermost layer is Hyper-V virtualisation. Inside that is the kernel with hardware-enforced protections. Inside that is the user-mode security model with integrity levels and sandboxing. Each layer makes the next harder to compromise.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>UAC (User Account Control)</strong> gives you two tokens when you log in as an admin: a restricted one for everyday use, and the full admin token locked away until you approve elevation. This prevents malware from silently using admin rights without your knowledge.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Integrity Levels</strong> (part of Mandatory Integrity Control) label every process and object with a trust level — System, High, Medium, Low. A Medium-level process (your browser) cannot write to High-level objects (system registry keys) even if the DACL would normally allow it.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Exploit mitigations</strong> (ASLR, DEP, CFG, CET, SMEP, SMAP, HVCI) are a stack of hardware and software controls that make exploiting memory corruption vulnerabilities extremely difficult. Each one closes a different exploitation technique — attackers need to chain multiple bypasses.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}><strong style={{color:C.bright}}>MIC (Mandatory Integrity Control)</strong> uses a Mandatory Label ACE in every object's SACL. The ACE contains an integrity SID (S-1-16-XXXX) and a policy (NO-WRITE-UP). The SRM enforces this: a process cannot write to objects with higher IL regardless of DACL. Implemented in the kernel's access check path.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>AppContainer</strong> adds a third dimension to the security model: capability-based access control. The token carries an AppContainer SID (S-1-15-2-*) and declared capabilities (each a group SID). Every file/reg/COM access checked against capabilities. Object Manager looks up AppContainer SID in object ACL.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>PPL (Protected Process Light)</strong> adds a digital signature-based hierarchy to process protection. The EPROCESS structure has a SignatureLevel field. OpenProcess is blocked if the calling process has insufficient signer type. Enforced in the kernel's ObpCallPreOperationCallbacks path.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>VBS (Virtualization-Based Security)</strong> uses Hyper-V to create a higher-privilege context (VTL 1) where Credential Guard and HVCI run. VTL 0 (normal OS) cannot access VTL 1 memory or modify its code integrity policy — even kernel-level exploits in VTL 0 cannot escape to VTL 1.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["Integrity levels = write-up barrier", "Medium process cannot write to High IL objects. Browser (Medium) cannot modify system registry (High). Core principle that limits damage from app compromise.", C.yellow],
              ["PPL = credential dump blocker", "lsass with RunAsPPL cannot be read by regular SYSTEM processes. Most LSASS dump tools fail silently. Gold standard credential protection on managed endpoints.", C.red],
              ["VBS/HVCI = kernel shield", "Hypervisor enforcing code integrity from Ring -1. BYOVD impossible. Kernel exploitation surface dramatically reduced. Highest-impact security control available on modern hardware.", C.purple],
              ["Mitigations = exploit chain breaker", "Each mitigation removes one exploitation primitive. ASLR removes fixed addresses. DEP removes data execution. CFG removes indirect control flow. CET removes ROP. Chain-breaking defence-in-depth.", C.cyan],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture Diagrams ── */}
        <PB title="SECURITY ARCHITECTURE — OVERVIEW · UAC · MIC · APPCONTAINER" icon="🏛" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["overview","SECURITY OVERVIEW"],["uac","UAC ARCHITECTURE"],["mic","MIC / INTEGRITY LEVELS"],["appcontainer","APPCONTAINER SANDBOX"],["ppl","PPL ARCHITECTURE"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "overview"     && <SecurityArch />}
          {archTab === "uac"          && <UACArch />}
          {archTab === "mic"          && <MICDeepDive />}
          {archTab === "appcontainer" && <AppContainerPanel />}
          {archTab === "ppl"          && <PPLPanel />}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — PRIVILEGED API CALL SECURITY CHECK CHAIN" icon="⚙" color={C.orange}>
          <SecWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Key insight:</strong> The security check at Step 3 (SRM) and Step 4 (PPL) happen BEFORE any data is accessed. These are kernel-enforced and cannot be bypassed from user mode — they require either a kernel exploit, a BYOVD attack, or a misconfigured token/object. Steps 5–8 are additional layers that operate in parallel and generate telemetry regardless of the access decision.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL — SECURITY POSTURE VERIFICATION" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ VBS / HVCI / CREDENTIAL GUARD VERIFICATION</div>
              <div style={S.code}>
{`# Check VBS and Credential Guard status:`}
{`PS> Get-WmiObject -Namespace root\Microsoft\Windows\DeviceGuard`}
{`    -Class Win32_DeviceGuard | Select`}
{`    SecurityServicesRunning,`}
{`    VirtualizationBasedSecurityStatus,`}
{`    AvailableSecurityProperties`}
{``}
{`# SecurityServicesRunning values:`}
{`# 1 = Credential Guard`}
{`# 2 = HVCI`}
{`# 3 = System Guard`}
{``}
{`# Or via msinfo32 → System Summary:`}
{`# "Device Guard Virtualization based security: Running"`}
{`# "Device Guard Credential Guard: Running"`}
{``}
{`# Check HVCI enforcement:`}
{`PS> (Get-WmiObject Win32_DeviceGuard `}
{`    -Namespace root\Microsoft\Windows\DeviceGuard`}
{`    ).SecurityServicesRunning -contains 2`}
{``}
{`# Verify Secure Boot:`}
{`Confirm-SecureBootUEFI  # True = Secure Boot active`}
{``}
{`# Check TPM status:`}
{`Get-Tpm | Select TpmPresent, TpmReady, TpmEnabled`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROCESS MITIGATIONS & INTEGRITY LEVELS</div>
              <div style={S.code}>
{`# Check all process mitigations for a PID:`}
{`PS> Get-ProcessMitigation -Id (Get-Process lsass).Id`}
{``}
{`# Check system-wide mitigation policy:`}
{`PS> Get-ProcessMitigation -System`}
{``}
{`# Get process integrity level:`}
{`PS> $proc = Get-Process -Name explorer`}
{`PS> $handle = [System.Diagnostics.Process]::GetProcessById(`}
{`    $proc.Id).Handle`}
{`# (use Sysinternals AccessChk for easy check):`}
{`C:\\> accesschk.exe -p explorer.exe`}
{``}
{`# Check PPL status on lsass:`}
{`# Process Explorer → lsass → pink shield = PPL`}
{`# Or WinDbg:`}
{`# dt nt!_EPROCESS <lsass_addr> Protection`}
{``}
{`# Verify ASLR for specific image:`}
{`C:\\> dumpbin /headers C:\\Windows\\System32\\lsass.exe`}
{`    | findstr /i "dynamic base"`}
{`# Must show: DYNAMIC_BASE`}
{``}
{`# Check UAC settings:`}
{`PS> (Get-ItemProperty HKLM:\SOFTWARE\Microsoft\Windows`}
{`    \CurrentVersion\Policies\System).ConsentPromptBehaviorAdmin`}
{`# 2 = Always prompt (most secure)`}
{`# 5 = Prompt for non-Windows binaries (default)`}
{`# 0 = No prompt (DISABLE - dangerous)`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ENABLING SECURITY FEATURES</div>
            <div style={S.code}>
{`# Enable VBS + HVCI (requires reboot):`}
{`PS> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\DeviceGuard"`}
{`    -Name EnableVirtualizationBasedSecurity -Value 1`}
{`PS> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\DeviceGuard"`}
{`    -Name RequirePlatformSecurityFeatures -Value 3  # Secure Boot + DMA`}
{`PS> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity"`}
{`    -Name Enabled -Value 1`}
{``}
{`# Enable Credential Guard:`}
{`PS> Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\LSA"`}
{`    -Name LsaCfgFlags -Value 1  # 1 = enabled, 2 = UEFI locked`}
{``}
{`# Enable PPL for lsass:`}
{`PS> Set-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa"`}
{`    -Name RunAsPPL -Value 1`}
{``}
{`# Set UAC to always-prompt (most secure):`}
{`PS> Set-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System"`}
{`    -Name ConsentPromptBehaviorAdmin -Value 2`}
{``}
{`# Enable mandatory ASLR system-wide:`}
{`PS> Set-ProcessMitigation -System -Enable ForceRelocateImages,BottomUp,HighEntropy`}
{``}
{`# Enable CET for all new processes (policy-based):`}
{`PS> Set-ProcessMitigation -System -Enable CETUserShadowStack`}
            </div>
          </div>
        </PB>

        {/* ── 6: Exploit Mitigations ── */}
        <PB title="EXPLOIT MITIGATION REFERENCE — HOW EACH CONTROL WORKS & ITS LIMITS" icon="🛡" color={C.orange} accent={C.orange + "33"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["mitigations","MITIGATION TABLE"],["uac_bypass","UAC BYPASS ANALYSIS"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.orange)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>
          {intTab === "mitigations" && <MitigationsTable />}
          {intTab === "uac_bypass"  && <UACBypassPanel />}
        </PB>

        {/* ── 7: Security Perspective ── */}
        <PB title="ATTACK SURFACE ANALYSIS — BYPASSING SECURITY LAYERS" icon="🔍" color={C.red} accent={C.red + "33"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["uac_bypass","sandbox_escape","mitigation_chain"].map(t => (
              <button key={t} style={S.tab(secTab === t, C.red)} onClick={() => setSecTab(t)}>{t.replace(/_/g," ").toUpperCase()}</button>
            ))}
          </div>

          {secTab === "uac_bypass" && (
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ UAC BYPASS — ROOT CAUSE & DETECTION STRATEGY</div>
              <div style={S.grid2}>
                <div>
                  <Row c={C.orange}>UAC bypasses work by <strong style={{color:C.bright}}>abusing auto-elevation</strong>: certain MS-signed executables elevate silently. Attackers make those executables load attacker-controlled code by hijacking their HKCU registry reads or DLL search paths.</Row>
                  <Row c={C.orange}>The <strong style={{color:C.bright}}>root privilege required</strong>: already have Medium IL code execution (standard user on a local admin account). UAC bypass doesn't give you admin if you're not already a local admin — it just skips the prompt.</Row>
                  <Row c={C.orange}><strong style={{color:C.bright}}>Detection pattern</strong>: auto-elevating process spawns unexpected child; HKCU registry key written then auto-elevating binary executed within seconds; child process has higher IL than grandparent.</Row>
                  <div style={S.code}>
{`# Detect UAC bypass pattern (SIEM query):`}
{`Event 4688 (Process Create):`}
{`  NewProcessName = eventvwr.exe OR fodhelper.exe`}
{`  → next Event 4688 within 5 seconds`}
{`  → child process NOT mmc.exe (expected)`}
{``}
{`Sysmon correlation:`}
{`  Event 13 (Registry Write) to HKCU\\...\\ms-settings`}
{`  → Event 1 (Process Create): fodhelper.exe`}
{`  → Event 1: unexpected child within 2 seconds`}
                  </div>
                </div>
                <div>
                  <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DEFENCE AGAINST UAC BYPASSES</div>
                  {[
                    ["ConsentPromptBehaviorAdmin = 2", "Always-prompt mode. No auto-elevation for ANY binary, even MS-signed. Eliminates all auto-elevation-based UAC bypasses. Some operational friction.", C.green],
                    ["PromptOnSecureDesktop = 1", "UAC prompt on secure desktop. Prevents UI automation attacks (mouse click injection). Default ON — verify it's not disabled.", C.teal],
                    ["WDAC Application Control", "WDAC policy restricts which processes can be spawned from auto-elevated binaries. Breaks the execution chain even if registry hijack succeeds.", C.cyan],
                    ["Monitor HKCU auto-elevation keys", "SIEM/Sysmon alert on writes to: HKCU\\Software\\Classes\\mscfile, ms-settings, Folder\\shell, Environment key. Any write followed by auto-elevating process = investigation.", C.orange],
                    ["Remove users from local Admins", "UAC bypass only works if user is local admin (filtered token exists). Removing admin rights eliminates UAC bypass entirely — no admin token to bypass to.", C.purple],
                  ].map(([t, d, c]) => (
                    <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                      <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>✓ {t}</div>
                      <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {secTab === "sandbox_escape" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SANDBOX ESCAPE CATEGORIES</div>
                {[
                  ["Kernel exploit (any sandbox)", "All sandboxes run code in the same kernel. A kernel vulnerability allows escaping any sandbox — AppContainer, PPL, even VBS VTL boundary. HVCI + KPP reduce the kernel attack surface.", C.red],
                  ["Broker process exploit", "Most sandboxes use a higher-IL broker (RuntimeBroker.exe, RPCSS, COM surrogate). Exploiting the broker gives the sandbox's requested capabilities. Attack surface: IPC between sandbox and broker.", C.orange],
                  ["Object namespace escape", "AppContainer processes use isolated named object namespace. Misconfigured objects shared across the boundary (events, mutexes, shared memory sections) can be used to communicate with higher-IL processes.", C.yellow],
                  ["File system / registry ACL misconfiguration", "If sandbox can write to a location that a higher-IL process reads (DLL path, config file), classic privilege escalation. Carefully auditing what Low IL can write to prevents this.", C.purple],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#100808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ STRENGTHENING SANDBOX CONTAINMENT</div>
                {[
                  ["Enable HVCI + Secure Boot", "Dramatically reduces kernel attack surface. Unsigned drivers blocked. BYOVD impossible. Kernel exploit mitigations (SMEP, SMAP, KPP) remain active.", C.green],
                  ["CET (shadow stack) for browsers", "Browsers with ACG + CIG + CET represent the current state-of-the-art sandbox. Significantly increases exploitation difficulty even after vulnerability is found.", C.cyan],
                  ["Monitor broker process behaviour", "RuntimeBroker.exe, RPCSS, DllHost.exe are high-value broker processes. Alert on unexpected child processes spawned by these. Sysmon Event 1 parent-child chain monitoring.", C.teal],
                  ["Network egress restriction", "AppContainer apps with internetClient capability can reach internet. Block outbound from sandbox processes to non-proxy destinations via WFP firewall rules.", C.orange],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>✓ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secTab === "mitigation_chain" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>▸ MODERN EXPLOIT CHAIN — WHAT AN ATTACKER MUST OVERCOME</div>
              <div style={{ color: C.dim, fontSize: "11px", marginBottom: "12px" }}>To achieve reliable code execution on a fully-hardened Windows 11 system with all mitigations enabled, an attacker needs to chain multiple bypasses. Each step is an independently challenging research problem:</div>
              {[
                { step: "1. Find a memory corruption vulnerability", need: "Memory safety bug in a reachable attack surface (browser renderer, document parser, kernel driver)", hard: "Modern code auditing, fuzzing, sandboxed attack surfaces reduce reachable bugs", color: C.red },
                { step: "2. Bypass ASLR", need: "Information leak — side channel, format string, or uninitialized memory that reveals a pointer", hard: "64-bit ASLR has 248 entropy. Mandatory ASLR forces all images. Need independent info-leak first.", color: C.orange },
                { step: "3. Bypass DEP/NX", need: "ROP chain using existing code gadgets in executable regions", hard: "CFG validates indirect call targets — limits useful gadget targets. CET prevents ROP via shadow stack.", color: C.yellow },
                { step: "4. Bypass CFG / CET", need: "Direct call gadgets (unchecked by CFG), JOP chains, or shadow stack corruption", hard: "ACG prevents new executable memory. JOP limited by code layout. Shadow stack physically separate.", color: C.purple },
                { step: "5. Achieve code execution (user mode)", need: "Execute shellcode or full ROP/JOP payload", hard: "ACG + CIG mean no new executable pages, only MS-signed DLLs. Limited capabilities from Low IL.", color: C.teal },
                { step: "6. Sandbox escape (if in AppContainer)", need: "Exploit kernel vulnerability or broker process", hard: "SMEP/SMAP block trivial kernel exploits. HVCI blocks unsigned kernel code. KPP detects structure tampering.", color: C.cyan },
                { step: "7. Escalate to admin/SYSTEM", need: "UAC bypass (if local admin) or token impersonation / kernel exploit", hard: "HVCI prevents DKOM from kernel. PPL prevents token theft from protected processes. UAC always-prompt closes auto-elevation.", color: C.sky },
              ].map(({ step, need, hard, color }) => (
                <div key={step} style={{ display: "flex", gap: "12px", marginBottom: "10px", background: "#07080c", border: `1px solid ${color}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ ...S.badge(color), marginBottom: "4px" }}>{step.split(".")[0]}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color, fontWeight: "700", fontSize: "11px" }}>{step.slice(3)}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px", marginTop: "3px" }}><strong style={{ color: C.text }}>Needs:</strong> {need}</div>
                    <div style={{ color: C.green, fontSize: "10.5px" }}><strong style={{ color: C.green }}>Mitigation:</strong> {hard}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PB>

        {/* ── 8: Defence ── */}
        <PB title="DEFENCE — HARDENING SECURITY ARCHITECTURE" icon="🔒" color={C.green} accent={C.green + "33"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["config","vbs","per_process"].map(t => (
              <button key={t} style={S.tab(defTab === t, C.green)} onClick={() => setDefTab(t)}>{t.replace("_"," ").toUpperCase()}</button>
            ))}
          </div>

          {defTab === "config" && (
            <div style={S.grid2}>
              {[
                ["Enable VBS + HVCI + Credential Guard", "Highest-impact triple control. Prevents BYOVD, protects LSASS credentials, enforces kernel code integrity from Hyper-V. Requires compatible hardware (VT-x + IOMMU + UEFI + TPM 2.0).", C.green],
                ["PPL for lsass (RunAsPPL=1)", "Blocks most LSASS dump tools even from SYSTEM. Works without VBS. Should be enabled on all managed endpoints immediately. Verify with Process Explorer pink shield on lsass.", C.cyan],
                ["Disable WDigest (UseLogonCredential=0)", "Removes plaintext credential storage from LSASS memory. Default off since Win 8.1 but can be re-enabled by attacker. Verify registry value = 0 on all endpoints.", C.teal],
                ["UAC ConsentPromptBehaviorAdmin = 2", "Always-prompt UAC. No auto-elevation for any binary. Eliminates all auto-elevation-based UAC bypass techniques. Deploy via GPO.", C.orange],
                ["Mandatory ASLR system-wide", "ForceRelocateImages policy: all processes use ASLR even if not opted in. BottomUp + HighEntropy maximises randomisation entropy on 64-bit.", C.yellow],
                ["ACG + CIG for high-risk apps", "Browser, PDF reader, email client — enable Arbitrary Code Guard and Code Integrity Guard via process mitigation policy. Eliminates most shellcode injection.", C.purple],
                ["Remove local admin rights", "Standard users cannot UAC-bypass (nothing to bypass to). Tiered admin model + LAPS removes shared admin credentials. Single biggest enterprise security improvement.", C.green],
                ["Enable CET (shadow stack) system-wide", "Windows 11 + Intel 11th Gen+: enable CET via policy. Shadow stack eliminates ROP-based exploit chains. Near-zero application compatibility impact.", C.indigo],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {defTab === "vbs" && (
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ VBS DEPLOYMENT CHECKLIST</div>
              <div style={S.grid2}>
                <div>
                  <div style={{ color: C.teal, fontWeight: "700", marginBottom: "6px", fontSize: "11px" }}>Hardware prerequisites:</div>
                  {["64-bit CPU with VT-x (Intel) or AMD-V","IOMMU (Intel VT-d or AMD-Vi) — required for HVCI","UEFI firmware (not legacy BIOS) with Secure Boot","TPM 2.0 module (for UEFI lock sealing)","WDDM 2.0 compatible GPU driver","All kernel drivers WHQL-signed + HVCI compatible"].map(r => (
                    <div key={r} style={{ display: "flex", gap: "6px", marginBottom: "5px" }}>
                      <span style={{ color: C.dim }}>☐</span>
                      <span style={{ color: C.dim, fontSize: "11px" }}>{r}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "6px", fontSize: "11px" }}>Pre-deployment steps:</div>
                  {[
                    "Run HVCI compatibility check: Get-HgsClientConfiguration",
                    "Identify incompatible drivers: dism /online /get-drivers — check HVCI-incompatible list",
                    "Update or remove HVCI-incompatible drivers (anticheat, old AV, USB drivers)",
                    "Test on pilot group before enterprise rollout",
                    "Enable Hyper-V role first (optional — VBS doesn't require Hyper-V feature)",
                    "Deploy via GPO or MDM (Microsoft Endpoint Manager / Intune)",
                    "Verify post-deployment via msinfo32 → Device Guard section",
                  ].map(r => (
                    <div key={r} style={{ display: "flex", gap: "6px", marginBottom: "5px" }}>
                      <span style={{ color: C.dim }}>☐</span>
                      <span style={{ color: C.dim, fontSize: "11px" }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {defTab === "per_process" && (
            <div style={S.code}>
{`# Per-process mitigation hardening (via SetProcessMitigationPolicy):`}
{``}
{`# Set mitigations for a specific application:`}
{`PS> Set-ProcessMitigation -Name "outlook.exe"`}
{`    -Enable ForceRelocateImages,BottomUp,HighEntropy,`}
{`            DEP,EmulateAtlThunks,`}
{`            SEHOP,`}
{`            TerminateOnError,`}
{`            BlockNonMicrosoftBinaries,`}
{`            ProhibitDynamicCode`}
{``}
{`# For browser renderer (ACG + CIG):`}
{`PS> Set-ProcessMitigation -Name "chrome.exe"`}
{`    -Enable ProhibitDynamicCode,BlockNonMicrosoftBinaries`}
{``}
{`# For JEA/WinRM endpoint:`}
{`PS> Set-ProcessMitigation -Name "wsmprovhost.exe"`}
{`    -Enable ForceRelocateImages,TerminateOnError`}
{``}
{`# System-wide baseline:`}
{`PS> Set-ProcessMitigation -System`}
{`    -Enable ForceRelocateImages,`}
{`            BottomUp,`}
{`            HighEntropy,`}
{`            StrictHandleCheck,`}
{`            TerminateOnError`}
{``}
{`# Verify per-process:`}
{`PS> Get-ProcessMitigation -Name lsass.exe`}
{`PS> Get-ProcessMitigation -Id (Get-Process -Name lsass).Id`}
{``}
{`# Export all process mitigation settings:`}
{`PS> Get-ProcessMitigation -RegistryConfigFilePath C:\mitigation_export.xml`}
{``}
{`# Deploy via GPO:`}
{`# Computer Config → Admin Templates → MS Security Guide`}
{`# → Process Mitigation Options = XML config path`}
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING — SECURITY ARCHITECTURE EVENTS & DETECTION" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","iocs","tools"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div style={S.grid2}>
              {[
                ["4688 + integrity level mismatch", "Process created with higher IL than parent without UAC consent event. Or medium-IL child spawned by high-IL parent unexpectedly. Token lineage anomaly.", C.orange],
                ["4673 — Sensitive privilege use", "SeDebugPrivilege used (needed to read other process memory). SeImpersonatePrivilege used. SeLoadDriverPrivilege used. All warrant investigation.", C.red],
                ["Event 4703 — Token right adjusted", "Token privilege enabled/disabled. AdjustTokenPrivileges() called. Low-priv process enabling SeDebugPrivilege = escalation attempt.", C.orange],
                ["Sysmon 25 — Process Tampering", "Process image changed at runtime (hollowing, herpaderping). High-fidelity — indicates code injection bypassing image load monitoring.", C.red],
                ["Sysmon 10 on lsass + access mask", "LSASS accessed with PROCESS_VM_READ (0x10). With PPL active: should fail for non-PPL. Success = PPL bypassed or PPL not active.", C.red],
                ["System Integrity — BSOD 0x109", "KPP detected tampered kernel structure (SSDT, IDT, callback). Indicates rootkit activity. Pull memory dump before system recovers.", C.red],
                ["Sysmon 6 — Unsigned driver load", "Driver loaded without WHQL signature. BYOVD indicator. With HVCI active: shouldn't be possible. Without HVCI: high-priority alert.", C.orange],
                ["4656 on high-value registry keys", "Access to HKLM\\SAM, HKLM\\SECURITY, HKLM\\CurrentControlSet\\Control\\LSA with non-SYSTEM account. Credential access attempt.", C.red],
              ].map(([t, d, c]) => (
                <div key={t} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                  <span style={{ ...S.badge(c), minWidth: "60px", textAlign: "center", flexShrink: 0, fontSize: "9px" }}>{t.split(" ")[0]}</span>
                  <span style={{ color: C.dim, fontSize: "11px" }}>{d}</span>
                </div>
              ))}
            </div>
          )}

          {monTab === "iocs" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SECURITY ARCHITECTURE BYPASS IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["HKCU auto-elevation key write + elevated child spawn", "Classic UAC bypass. HKCU\\Software\\Classes\\mscfile or ms-settings written then auto-elevating binary executes unexpected child within seconds.", C.red],
                  ["Process IL higher than parent without UAC Event 4703", "Unexpected elevation. Medium IL process spawns High IL child without 4703 consent event. Token elevation without proper audit trail.", C.red],
                  ["LSASS OpenProcess success with PPL active", "PPL bypassed or not active. Non-PPL process successfully opening LSASS with VM_READ. Credential dump in progress or imminent.", C.red],
                  ["BSOD 0x109 on production DC/server", "KPP triggered. Kernel structure tampered. Rootkit or BYOVD attack in progress. Collect memory dump before recovery reboot.", C.red],
                  ["Sysmon Event 25 (ProcessTampering)", "Process hollowing or herpaderping detected. Binary in memory doesn't match binary on disk. Payload injection confirmed.", C.red],
                  ["Driver load from non-System32\\drivers path with HVCI off", "BYOVD setup. Legitimate signed driver loaded from unusual path. Hash-check against LOLDrivers.io immediately.", C.orange],
                  ["ConsentPromptBehaviorAdmin changed to 0", "UAC disabled silently. Registry change removes all elevation prompts. Attacker eliminating future UAC friction.", C.red],
                  ["VBS service state change (unexpected)", "Windows Defender Credential Guard or HVCI service stopped. Attacker disabling security features. Alert on any DeviceGuard service state change.", C.orange],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["Process Explorer (Sysinternals)", "procexp.exe", "Shows integrity level and protection level per process. Pink shield = PPL/PP. Verify lsass has pink shield when RunAsPPL=1. VirusTotal hash check integration.", C.cyan],
                ["Get-ProcessMitigation (PowerShell)", "Built-in cmdlet", "Enumerate all exploit mitigations per process or system-wide. Scriptable — run as compliance check across fleet via PSSession.", C.green],
                ["AccessChk (Sysinternals)", "accesschk.exe -p lsass", "Show token integrity level, privileges, and group SIDs for a process. Quick integrity level and privilege audit.", C.teal],
                ["Microsoft Attack Surface Analyzer", "AttackSurfaceAnalyzer.exe", "Scans system before/after software install or config change. Compares attack surface: registry, files, network, services, users, mitigations.", C.orange],
                ["Windows Security Health Assessment", "msinfo32 / Security Center", "Built-in: Device Guard, Credential Guard, VBS status. System Summary → Device Guard section shows all VBS component status.", C.purple],
                ["AppContainerAnalyzer", "AppContainerAnalyzer.exe", "Analyse AppContainer sandbox — what capabilities are granted, what file/reg paths are accessible, COM activation permissions.", C.sky],
              ].map(([t, cmd, d, c]) => (
                <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{t}</div>
                  <div style={{ color: C.dim, fontSize: "10px", fontStyle: "italic", marginBottom: "4px" }}>{cmd}</div>
                  <div style={{ color: C.text, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}
        </PB>

        {/* ── 10: Comparison ── */}
        <PB title="WINDOWS vs LINUX — SECURITY ARCHITECTURE COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["sandbox","mitigations","privilege","integrity"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#00101a", border: `1px solid ${C.cyan}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.cyan, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS</div>
              {cmpTab === "sandbox" && <>
                <KV k="Sandbox tech" v="AppContainer (capability SIDs, IL=Low)" kc={C.cyan} />
                <KV k="Browser sandbox" v="LPAC + ACG + CIG (Edge/Chromium)" kc={C.cyan} />
                <KV k="Isolation mechanism" v="Token-based (AppContainer SID in groups)" kc={C.cyan} />
                <KV k="File access control" v="Capability-based + NTFS ACL with AppContainer SID" kc={C.cyan} />
                <KV k="Broker process" v="RuntimeBroker.exe mediates privileged requests" kc={C.cyan} />
                <KV k="VM-based isolation" v="Windows Sandbox (Hyper-V), VBS (Credential Guard)" kc={C.cyan} />
              </>}
              {cmpTab === "mitigations" && <>
                <KV k="ASLR" v="Image+heap+stack ASLR, mandatory ASLR policy" kc={C.cyan} />
                <KV k="DEP/NX" v="Always-on hardware NX enforcement" kc={C.cyan} />
                <KV k="CFG" v="Control Flow Guard (compiler + runtime)" kc={C.cyan} />
                <KV k="CET" v="Intel CET shadow stack (Win10+, hardware)" kc={C.cyan} />
                <KV k="SMEP/SMAP" v="CR4 bit enforcement + HVCI prevents disabling" kc={C.cyan} />
                <KV k="ACG/CIG" v="Per-process: block new executable pages + unsigned DLLs" kc={C.cyan} />
              </>}
              {cmpTab === "privilege" && <>
                <KV k="Admin mechanism" v="Filtered token (Medium IL) + UAC elevation" kc={C.cyan} />
                <KV k="Root equivalent" v="SYSTEM account (S-1-5-18) + SeXxx privileges" kc={C.cyan} />
                <KV k="Privilege check" v="Token privilege list (AdjustTokenPrivileges to enable)" kc={C.cyan} />
                <KV k="Credential isolation" v="Credential Guard (VBS) isolates NT hashes + TGTs" kc={C.cyan} />
                <KV k="Protected process" v="PPL signer-type hierarchy per EPROCESS" kc={C.cyan} />
              </>}
              {cmpTab === "integrity" && <>
                <KV k="Integrity model" v="Mandatory Integrity Control (MIC) — 5 IL levels" kc={C.cyan} />
                <KV k="Labels" v="Mandatory Label ACE in SACL on every object" kc={C.cyan} />
                <KV k="Policy" v="NO-WRITE-UP default: lower IL can't write to higher IL" kc={C.cyan} />
                <KV k="AppContainer" v="Capability SIDs add 3rd axis (capabilities)" kc={C.cyan} />
                <KV k="Kernel integrity" v="HVCI + KPP enforce kernel code/structure integrity" kc={C.cyan} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a180a", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX</div>
              {cmpTab === "sandbox" && <>
                <KV k="Sandbox tech" v="seccomp-bpf (syscall filter) + namespaces + cgroups" kc={C.green} />
                <KV k="Browser sandbox" v="seccomp + namespaces (Chromium on Linux)" kc={C.green} />
                <KV k="Isolation mechanism" v="Namespaces (PID, net, mnt, user) per container" kc={C.green} />
                <KV k="File access control" v="POSIX DAC + SELinux/AppArmor labels" kc={C.green} />
                <KV k="Broker process" v="No standard broker — dbus mediates some requests" kc={C.green} />
                <KV k="VM-based isolation" v="KVM/QEMU VMs, kata-containers (VM per container)" kc={C.green} />
              </>}
              {cmpTab === "mitigations" && <>
                <KV k="ASLR" v="KASLR (kernel), PIE executables, mmap randomisation" kc={C.green} />
                <KV k="DEP/NX" v="PTE NX bit, W^X enforcement" kc={C.green} />
                <KV k="CFG equiv" v="ClangCFI (compiler), IBT (Intel CET ENDBR instructions)" kc={C.green} />
                <KV k="CET" v="CET shadow stack kernel 5.18+, glibc 2.35+" kc={C.green} />
                <KV k="SMEP/SMAP" v="CR4 enforcement, KPTI mitigates Meltdown" kc={C.green} />
                <KV k="ACG equiv" v="No direct equiv. W^X + seccomp prevents exec injection" kc={C.green} />
              </>}
              {cmpTab === "privilege" && <>
                <KV k="Admin mechanism" v="sudo (time-limited root), su, setuid binaries" kc={C.green} />
                <KV k="Root equivalent" v="UID 0 (root). Capabilities split root into fine-grained" kc={C.green} />
                <KV k="Privilege check" v="Linux capabilities (cap_net_admin, cap_setuid, etc.)" kc={C.green} />
                <KV k="Credential isolation" v="No equiv. LUKS for disk. Memory encryption (SEV)" kc={C.green} />
                <KV k="Protected process" v="No equiv. ptrace_scope limits ptrace access somewhat" kc={C.green} />
              </>}
              {cmpTab === "integrity" && <>
                <KV k="Integrity model" v="No built-in MIC. SELinux/AppArmor = MAC." kc={C.green} />
                <KV k="Labels" v="SELinux: type:role:user:level per object" kc={C.green} />
                <KV k="Policy" v="Bell-LaPadula optional via SELinux MLS policy" kc={C.green} />
                <KV k="Containers" v="seccomp-bpf filters capabilities (no 'capabilities SID')" kc={C.green} />
                <KV k="Kernel integrity" v="IMA (Integrity Measurement Architecture) + module signing + Lockdown mode" kc={C.green} />
              </>}
            </div>
          </div>
        </PB>

        {/* ── 11: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — DEMONSTRATING DEFENCE-IN-DEPTH VALUE" icon="⚠" color={C.orange} accent={C.orange + "33"}>
          <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔍 SCENARIO: Same Exploit — Two Different Outcomes Depending on Security Architecture Deployment
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ UNPROTECTED SYSTEM (defaults only)</div>
              <div style={S.code}>
{`Attack: Browser exploit → sandbox escape → SYSTEM`}
{``}
{`Step 1: Browser heap overflow (0-day)`}
{`  ASLR: basic (image-only, not mandatory) → info-leak`}
{`        gives renderer base → ASLR bypassed`}
{``}
{`Step 2: ROP chain to bypass DEP`}
{`  CFG: not enforced on old app → ROP works`}
{`  ACG: not enabled → new RWX allocation succeeds`}
{`  Result: shellcode executing in renderer`}
{``}
{`Step 3: Sandbox escape (Low → Medium IL)`}
{`  Kernel: unpatched driver vulnerability`}
{`  BYOVD: load vulnerable signed driver`}
{`  Kernel exploit: SMEP/SMAP present but no HVCI`}
{`  → Patch SMEP in CR4 → run shellcode in kernel`}
{`  Result: kernel code execution → SYSTEM token`}
{``}
{`Step 4: LSASS dump`}
{`  PPL: not enabled (RunAsPPL not set)`}
{`  OpenProcess(lsass, PROCESS_ALL_ACCESS) → OK`}
{`  MiniDumpWriteDump → hashes extracted`}
{``}
{`Step 5: Persistence`}
{`  WMI subscription, service, run key`}
{`  All available → persistence trivially planted`}
{``}
{`Total: < 30 minutes, fully automated, no user prompt`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ HARDENED SYSTEM (all controls enabled)</div>
              <div style={S.code}>
{`Step 1: Same browser heap overflow`}
{`  ASLR: Mandatory ASLR + High Entropy → 248 positions`}
{`        Info-leak blocked by ACG (no pointer spray)`}
{`  RESULT: Cannot reliably locate code to ROP to`}
{``}
{`Step 2: ROP chain attempt`}
{`  CFG: indirect calls validated → limited gadgets`}
{`  CET: shadow stack → return addresses verified`}
{`       ROP chain crashes on first mismatched RET`}
{`  ACG: cannot allocate new RWX page for shellcode`}
{`  RESULT: Exploitation requires novel CET bypass`}
{``}
{`Step 3: Sandbox escape attempt`}
{`  HVCI: all kernel code must be WHQL-signed`}
{`  BYOVD: vulnerable driver load → ACCESS DENIED`}
{`  Kernel exploit: no unsigned code can execute`}
{`  KPP: monitoring kernel structures`}
{`  RESULT: Sandbox escape requires Ring-1 exploit`}
{``}
{`Step 4: Credential theft attempt (if Step 3 succeeds)`}
{`  PPL: lsass.exe protected (RunAsPPL=1)`}
{`  Credential Guard: hashes in VTL 1 (inaccessible)`}
{`  RESULT: No credentials obtainable even with SYSTEM`}
{``}
{`Step 5: Persistence attempt`}
{`  WMI: Sysmon 19/20/21 fires → SIEM alert T+0`}
{`  Service: Event 7045 → SIEM alert T+0`}
{`  Registry: Sysmon 13 on Run keys → SIEM alert T+0`}
{`  RESULT: Every persistence mechanism monitored`}
{``}
{`Total: Attack chain broken at Step 2 (CET/ACG)`}
{`       Attacker needs novel research for each layer`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Each layer is independently valuable", "Even if one layer fails (info-leak bypasses ASLR), the next layer (CET blocks ROP) stops the chain. Defence-in-depth means attacker must research and chain multiple novel bypasses.", C.cyan],
              ["Hardware matters enormously", "CET requires Intel 11th Gen+ or AMD Zen 3+. SMEP/SMAP require post-2012 CPUs. HVCI requires VT-x + IOMMU. Modern hardware = dramatically stronger security posture.", C.orange],
              ["Monitoring catches what mitigations miss", "Even if all mitigations are bypassed, logging (Sysmon Event 25 for process tampering, Event 10 for LSASS access) generates alerts. The combination of prevention + detection is essential.", C.green],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#07080c", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px" }}>
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
              [C.red, "Tier 1 — Credential & Kernel Protection", [
                "VBS enabled: Get-WmiObject Win32_DeviceGuard → VirtualizationBasedSecurityStatus = 2",
                "HVCI active: SecurityServicesRunning includes 2 (HypervisorEnforcedCodeIntegrity)",
                "Credential Guard running: SecurityServicesRunning includes 1",
                "LSASS PPL enabled: RunAsPPL = 1 in LSA registry key",
                "WDigest disabled: UseLogonCredential = 0",
                "Secure Boot active: Confirm-SecureBootUEFI = True",
              ]],
              [C.orange, "Tier 2 — Process Isolation & UAC", [
                "UAC ConsentPromptBehaviorAdmin = 2 (always prompt) on sensitive systems",
                "PromptOnSecureDesktop = 1 (UAC on secure desktop)",
                "No standard users have local admin rights (LAPS deployed instead)",
                "Mandatory ASLR + BottomUp + HighEntropy: Get-ProcessMitigation -System",
                "DEP system-wide: bcdedit → nx AlwaysOn",
                "CET enabled: Get-ProcessMitigation -System | Select CETUserShadowStack",
              ]],
              [C.cyan, "Tier 3 — Per-Application Hardening", [
                "ACG + CIG enabled on browser, email client, PDF reader",
                "Confirm browser uses LPAC sandbox (Edge: AppContainer + LPAC in token)",
                "High-risk admin tools have Process Mitigation policies applied",
                "JEA configured for all remote administration (no unrestricted PSSession to servers)",
                "Windows Sandbox deployed for opening untrusted files/attachments",
              ]],
              [C.purple, "Tier 4 — Detection Coverage", [
                "Event 4703 (token privilege adjustment) alerting in SIEM",
                "Sysmon Event 25 (ProcessTampering) = CRITICAL alert",
                "UAC bypass pattern detection: HKCU auto-elevation key write + elevated child",
                "VBS service state change monitoring (Credential Guard / HVCI stop = CRITICAL)",
                "BYOVD: Sysmon Event 6 (driver load) hash checked against LOLDrivers.io",
              ]],
            ].map(([c, title, items]) => (
              <div key={title} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "12px" }}>
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
              ["Integrity levels = write-up wall", "The MIC NO-WRITE-UP policy means Medium IL processes (most malware landing zone) cannot modify High IL objects even with valid credentials. Fundamental constraint on post-compromise impact.", C.yellow],
              ["VBS is the highest-value single control", "Enabling VBS + HVCI + Credential Guard simultaneously blocks BYOVD kernel exploitation, protects credential material from kernel exploits, and enforces code integrity. Single deployment, maximum security gain.", C.purple],
              ["Mitigations buy time, monitoring delivers detection", "No mitigation is permanent — researchers eventually find bypasses. The role of mitigations is to buy time and raise the cost of exploitation. Monitoring catches the activity that mitigations don't block.", C.cyan],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "5px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
          <hr style={S.sep} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ color: C.dim, fontSize: "11px" }}>
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 13: Malware Analysis & DFIR — PE Structure, Malware Behaviours, Memory Forensics & Incident Response
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 12 Complete</Pill>
              <Pill c={C.red}>12 Panels · Security Architecture Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
