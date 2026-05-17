import { useState } from "react";

const C = {
  bg: "#08090d",
  panel: "#0c0f16",
  header: "#10141e",
  border: "#1a2236",
  borderHi: "#243352",
  cyan: "#00d4ff",
  green: "#00e87a",
  red: "#ff3d5a",
  orange: "#ff8f00",
  yellow: "#f5c518",
  purple: "#b06dff",
  pink: "#ff5fa0",
  text: "#c4ccd8",
  dim: "#5a6478",
  bright: "#e8edf5",
};

const mono = "'JetBrains Mono','Cascadia Code','Fira Code',monospace";

const S = {
  root: { background: C.bg, color: C.text, fontFamily: mono, minHeight: "100vh", fontSize: "12.5px", lineHeight: "1.65" },
  bar: {
    background: C.header, borderBottom: `1px solid ${C.border}`,
    padding: "7px 20px", display: "flex", alignItems: "center", gap: "14px",
    position: "sticky", top: 0, zIndex: 100,
  },
  dot: (c) => ({ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }),
  wrap: { maxWidth: "1220px", margin: "0 auto", padding: "18px 14px", display: "flex", flexDirection: "column", gap: "14px" },
  panel: (c) => ({ background: C.panel, border: `1px solid ${c || C.border}`, borderRadius: "5px", overflow: "hidden" }),
  ph: (c) => ({
    background: C.header, borderBottom: `1px solid ${c || C.border}`,
    padding: "9px 15px", display: "flex", alignItems: "center", gap: "9px",
  }),
  pt: (c) => ({ color: c || C.cyan, fontWeight: "700", fontSize: "11px", letterSpacing: "1.8px", textTransform: "uppercase" }),
  pb: { padding: "15px" },
  code: {
    background: "#070a10", border: `1px solid ${C.border}`, borderRadius: "4px",
    padding: "11px 13px", fontFamily: mono, fontSize: "11.5px", overflowX: "auto",
    whiteSpace: "pre", lineHeight: "1.75",
  },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "11px" },
  badge: (c) => ({
    background: `${c}1a`, border: `1px solid ${c}55`, color: c,
    borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: "700",
  }),
  tag: (c) => ({
    display: "inline-block", background: `${c}14`, border: `1px solid ${c}40`,
    color: c, borderRadius: "3px", padding: "1px 6px", fontSize: "10.5px", margin: "2px",
  }),
  sep: { borderColor: C.border, margin: "11px 0", borderStyle: "dashed", borderWidth: "0 0 1px 0" },
  row: { display: "flex", gap: "9px", marginBottom: "7px", alignItems: "flex-start" },
  bul: (c) => ({ color: c || C.cyan, minWidth: "13px", fontWeight: "700", marginTop: "1px" }),
  tab: (a, c) => ({
    padding: "6px 13px", cursor: "pointer", fontFamily: mono,
    background: a ? `${c}1a` : "transparent", border: `1px solid ${a ? c : C.border}`,
    borderRadius: "4px", color: a ? c : C.dim, fontSize: "10.5px",
    fontWeight: a ? "700" : "400", letterSpacing: "0.5px", transition: "all 0.15s",
  }),
  kv: (kc) => ({ display: "flex", gap: "8px", marginBottom: "5px" }),
};

const PB = ({ title, icon, color, accent, children }) => (
  <div style={S.panel(accent || color || C.border)}>
    <div style={S.ph(accent || color || C.border)}>
      <span>{icon}</span>
      <span style={S.pt(color || C.cyan)}>{title}</span>
    </div>
    <div style={S.pb}>{children}</div>
  </div>
);

const Pill = ({ c, children }) => <span style={S.badge(c || C.cyan)}>{children}</span>;
const Tag = ({ c, children }) => <span style={S.tag(c || C.cyan)}>{children}</span>;
const Row = ({ c, b, children }) => (
  <div style={S.row}><span style={S.bul(c)}>{b || "▸"}</span><span style={{ color: C.text }}>{children}</span></div>
);
const KV = ({ k, v, kc }) => (
  <div style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
    <span style={{ color: kc || C.green, minWidth: "200px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span>
    <span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── Registry Tree Diagram ─────────────────────────────────────────────────── */
const RegTree = () => {
  const hives = [
    { key: "HKEY_LOCAL_MACHINE (HKLM)", color: C.cyan, file: "SYSTEM · SOFTWARE · SAM · SECURITY · HARDWARE", desc: "Machine-wide settings, drivers, services, installed software. Most attack targets here." },
    { key: "HKEY_CURRENT_USER (HKCU)", color: C.green, file: "NTUSER.DAT (per user profile)", desc: "Current logged-in user settings, persistence run keys, shell extensions." },
    { key: "HKEY_USERS (HKU)", color: C.purple, file: "All loaded user hives", desc: "Contains HKCU for each logged-on user + default profile. SID-based subkeys." },
    { key: "HKEY_CLASSES_ROOT (HKCR)", color: C.orange, file: "Merged HKLM\\SOFTWARE\\Classes + HKCU\\...", desc: "File associations, COM class registrations. COM hijacking lives here." },
    { key: "HKEY_CURRENT_CONFIG (HKCC)", color: C.yellow, file: "Pointer → HKLM\\SYSTEM\\CurrentControlSet\\Hardware Profiles\\Current", desc: "Current hardware profile (display settings, printer config)." },
  ];
  return (
    <div>
      <div style={{ fontWeight: "700", color: C.cyan, fontSize: "11px", letterSpacing: "1.5px", marginBottom: "12px" }}>▸ REGISTRY ROOT KEYS (HIVES)</div>
      {hives.map((h, i) => (
        <div key={h.key} style={{ display: "flex", gap: "0", marginBottom: "4px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "28px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "3px", background: `${h.color}18`, border: `1px solid ${h.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: h.color, fontWeight: "700" }}>H{i + 1}</div>
            {i < hives.length - 1 && <div style={{ width: "1px", height: "18px", background: `${h.color}33` }} />}
          </div>
          <div style={{ paddingLeft: "10px", paddingBottom: "6px", flex: 1, background: `${h.color}06`, border: `1px solid ${h.color}1a`, borderRadius: "4px", marginLeft: "4px", padding: "7px 10px", marginBottom: "4px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: h.color, fontWeight: "700", fontSize: "11.5px" }}>{h.key}</span>
              <span style={S.badge(h.color)}>{h.file}</span>
            </div>
            <div style={{ color: C.dim, fontSize: "11px", marginTop: "3px" }}>{h.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Hive Architecture SVG ─────────────────────────────────────────────────── */
const HiveArch = () => (
  <svg viewBox="0 0 760 340" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    {/* Physical hive files on disk */}
    <rect x="10" y="260" width="740" height="68" rx="4" fill="#0c0f16" stroke="#ff8f0055" strokeWidth="1.5" />
    <text x="380" y="278" textAnchor="middle" fill="#ff8f00" fontSize="11" fontWeight="700" letterSpacing="2">PHYSICAL HIVE FILES ON DISK — C:\Windows\System32\config\</text>
    {[["SYSTEM", 30],["SOFTWARE", 140],["SAM", 255],["SECURITY", 330],["DEFAULT", 420],["NTUSER.DAT", 505],["UsrClass.dat", 620]].map(([n, x]) => (
      <g key={n}>
        <rect x={x} y="290" width={n.length > 7 ? 100 : 76} height="28" rx="3" fill="#0a0c12" stroke="#ff8f0044" strokeWidth="1" />
        <text x={x + (n.length > 7 ? 50 : 38)} y="309" textAnchor="middle" fill="#ff8f00" fontSize="9.5">{n}</text>
      </g>
    ))}

    {/* Registry Manager / Config Manager */}
    <rect x="200" y="190" width="360" height="58" rx="4" fill="#0c0f16" stroke="#b06dff55" strokeWidth="1.5" />
    <text x="380" y="212" textAnchor="middle" fill="#b06dff" fontSize="11" fontWeight="700">CONFIGURATION MANAGER (CM)</text>
    <text x="380" y="228" textAnchor="middle" fill="#5a6478" fontSize="10">Kernel-mode registry driver · cmapi.sys · maps hives into kernel memory</text>
    <text x="380" y="242" textAnchor="middle" fill="#5a6478" fontSize="10">HIVELIST cell → master table of all loaded hives · log-based transaction support</text>

    {/* In-memory structure */}
    <rect x="10" y="100" width="740" height="78" rx="4" fill="#080b14" stroke="#00d4ff44" strokeWidth="1" />
    <text x="20" y="118" fill="#00d4ff" fontSize="10" fontWeight="700" letterSpacing="2">IN-MEMORY REGISTRY (KERNEL) — HBASE_BLOCK structure</text>
    {[
      ["Key Node\n(CM_KEY_NODE)", "#00d4ff", 20],
      ["Value Node\n(CM_KEY_VALUE)", "#00e87a", 180],
      ["Data Cell\n(value data)", "#f5c518", 340],
      ["Security Cell\n(SD pointer)", "#b06dff", 500],
      ["Key Hash\n(fast name lookup)", "#ff3d5a", 640],
    ].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x} y="128" width="130" height="40" rx="3" fill="#0c0f16" stroke={`${color}55`} strokeWidth="1.5" />
        <text x={x + 65} y="147" textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 65} y="161" textAnchor="middle" fill="#5a6478" fontSize="9">{label.split("\n")[1]}</text>
      </g>
    ))}

    {/* User mode */}
    <rect x="10" y="20" width="740" height="68" rx="4" fill="#080e0c" stroke="#00e87a44" strokeWidth="1" />
    <text x="20" y="38" fill="#00e87a" fontSize="10" fontWeight="700" letterSpacing="2">USER MODE API LAYER</text>
    {[
      ["RegOpenKeyEx()\nadvapi32.dll", C.green, 20],
      ["RegQueryValueEx()\nadvapi32.dll", C.cyan, 200],
      ["Reg* PowerShell\nCmdlets", C.purple, 380],
      ["NtOpenKey()\nntdll.dll → syscall", C.orange, 555],
      ["WMI StdRegProv\nroot\\default", C.yellow, 650],
    ].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x} y="44" width={x > 600 ? 100 : 160} height="34" rx="3" fill="#0c0f16" stroke={`${color}44`} strokeWidth="1" />
        <text x={x + (x > 600 ? 50 : 80)} y="60" textAnchor="middle" fill={color} fontSize="9.5">{label.split("\n")[0]}</text>
        <text x={x + (x > 600 ? 50 : 80)} y="73" textAnchor="middle" fill="#5a6478" fontSize="8.5">{label.split("\n")[1]}</text>
      </g>
    ))}

    {/* Arrows */}
    <line x1="380" y1="88" x2="380" y2="100" stroke="#ffffff22" strokeWidth="1.5" />
    <line x1="380" y1="178" x2="380" y2="190" stroke="#b06dff44" strokeWidth="1.5" />
    <line x1="380" y1="248" x2="380" y2="260" stroke="#ff8f0044" strokeWidth="1.5" />
    <text x="400" y="97" fill="#5a6478" fontSize="9">syscall → kernel</text>
    <text x="390" y="187" fill="#5a6478" fontSize="9">CM loads hive</text>
  </svg>
);

/* ── Registry Value Types ──────────────────────────────────────────────────── */
const ValueTypes = () => {
  const types = [
    ["REG_SZ", "0x01", "String (null-terminated Unicode)", "C:\\Windows\\System32\\cmd.exe", C.cyan],
    ["REG_EXPAND_SZ", "0x02", "Expandable string with env vars", "%SystemRoot%\\System32\\svchost.exe", C.green],
    ["REG_BINARY", "0x03", "Raw binary data", "Security descriptors, hardware settings", C.purple],
    ["REG_DWORD", "0x04", "32-bit unsigned integer", "EnableLUA = 0x00000001", C.orange],
    ["REG_QWORD", "0x0B", "64-bit unsigned integer", "Large counters, timestamps", C.yellow],
    ["REG_MULTI_SZ", "0x07", "Multiple null-terminated strings", "Service DependOnService list", C.pink],
    ["REG_NONE", "0x00", "No defined type", "Rare, sometimes used for obfuscation", C.red],
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 2fr 2fr 1fr", gap: "0", background: C.header, padding: "6px 10px", borderRadius: "3px 3px 0 0", marginBottom: "1px" }}>
        {["TYPE NAME", "ID", "DESCRIPTION", "EXAMPLE VALUE", "COLOR"].map(h => (
          <span key={h} style={{ color: C.dim, fontSize: "10px", fontWeight: "700", letterSpacing: "1px" }}>{h}</span>
        ))}
      </div>
      {types.map((t, i) => (
        <div key={t[0]} style={{ display: "grid", gridTemplateColumns: "1fr 60px 2fr 2fr 1fr", gap: "0", padding: "7px 10px", background: i % 2 === 0 ? "#09090f" : C.panel, borderBottom: `1px solid ${C.border}` }}>
          <span style={{ color: t[4], fontWeight: "700", fontSize: "11px" }}>{t[0]}</span>
          <span style={{ color: C.dim, fontSize: "11px" }}>{t[1]}</span>
          <span style={{ color: C.text, fontSize: "11px" }}>{t[2]}</span>
          <span style={{ color: C.dim, fontSize: "10.5px", fontStyle: "italic" }}>{t[3]}</span>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: t[4], marginTop: "2px" }} />
        </div>
      ))}
    </div>
  );
};

/* ── Registry Workflow Simulation ──────────────────────────────────────────── */
const RegWorkflow = () => {
  const steps = [
    { label: "App calls RegOpenKeyEx()", sub: "User mode: advapi32.dll", color: C.green, detail: "HKLM\\SYSTEM\\CurrentControlSet\\Services\\EventLog, KEY_READ access requested" },
    { label: "advapi32 → NtOpenKey()", sub: "ntdll.dll converts to NT native API", color: C.cyan, detail: "ObjectAttributes struct built with key path; OBJECT_ATTRIBUTES initialized" },
    { label: "SYSCALL instruction", sub: "Ring 3 → Ring 0 privilege switch", color: C.purple, detail: "System call number resolved; CPU switches to kernel stack; KiSystemCall64 dispatch" },
    { label: "Config Manager (CM)", sub: "cmapi.sys processes NtOpenKey", color: C.orange, detail: "Walks the key tree from root; locates CM_KEY_NODE in memory; validates SID permissions via SRM" },
    { label: "Security Reference Monitor", sub: "Access check against DACL", color: C.red, detail: "Token SIDs compared against key's security descriptor; GENERIC_READ translated to KEY_QUERY_VALUE | KEY_ENUMERATE_SUB_KEYS" },
    { label: "Handle returned to caller", sub: "HKEY handle stored in process handle table", color: C.green, detail: "Kernel object handle created; process Object Table entry added; handle value returned to user mode" },
    { label: "RegQueryValueEx()", sub: "Read value data into buffer", color: C.cyan, detail: "NtQueryValueKey syscall → CM reads CM_KEY_VALUE node → data cell fetched → copied to user buffer" },
  ];
  return (
    <div>
      {steps.map((s, i) => (
        <div key={s.label} style={{ display: "flex", gap: "0" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30px" }}>
            <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: `${s.color}18`, border: `1.5px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: s.color, fontWeight: "700", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</div>
            {i < steps.length - 1 && <div style={{ width: "1px", height: "32px", background: `${s.color}33` }} />}
          </div>
          <div style={{ paddingLeft: "10px", paddingBottom: "10px", flex: 1 }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: s.color, fontWeight: "700", fontSize: "12px" }}>{s.label}</span>
              <span style={S.badge(s.color)}>{s.sub}</span>
            </div>
            <div style={{ color: C.dim, fontSize: "11px", marginTop: "3px", fontStyle: "italic" }}>{s.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Important Registry Keys ───────────────────────────────────────────────── */
const ImportantKeys = () => {
  const keys = [
    {
      path: "HKLM\\SYSTEM\\CurrentControlSet\\Services",
      color: C.cyan, category: "Services",
      desc: "Every Windows service defined here. Subkey per service: ImagePath, Start type (2=Auto,3=Manual,4=Disabled), Type, ObjectName.",
      attack: "Malware installs as service: Start=2, ImagePath=C:\\evil.exe",
    },
    {
      path: "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
      color: C.red, category: "Persistence",
      desc: "Programs run for ALL users at every login. Classic persistence location. HKCU variant targets only current user.",
      attack: "reg add HKCU\\...\\Run /v Updater /d C:\\tmp\\beacon.exe",
    },
    {
      path: "HKLM\\SAM\\SAM\\Domains\\Account\\Users",
      color: C.purple, category: "Credentials",
      desc: "Local user account database. Contains NTLM password hashes in binary. Requires SYSTEM + special privileges to access directly.",
      attack: "reg save HKLM\\SAM sam.hive → offline crack with secretsdump",
    },
    {
      path: "HKLM\\SECURITY\\Policy\\Secrets",
      color: C.red, category: "Credentials",
      desc: "DPAPI-protected secrets: service account passwords, cached domain creds, LSA secrets. Only readable by SYSTEM.",
      attack: "lsadump::secrets (mimikatz) → extracts service account plaintext creds",
    },
    {
      path: "HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA",
      color: C.orange, category: "Auth Config",
      desc: "Controls NTLM, Kerberos, PPL for LSASS, Credential Guard settings. Critical security configuration.",
      attack: "Attackers modify LsaCfgFlags=0 to disable Credential Guard",
    },
    {
      path: "HKCR\\CLSID\\{...}\\InprocServer32",
      color: C.yellow, category: "COM Hijacking",
      desc: "Maps COM class GUIDs to DLL paths. If DLL missing from HKCR but HKCU override possible → COM hijack persistence.",
      attack: "Register HKCU CLSID override → DLL loaded in high-priv context",
    },
    {
      path: "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options",
      color: C.pink, category: "Debugger Hijack",
      desc: "Allows setting a 'Debugger' value for any process name — OS will launch specified binary instead. Classic accessibility backdoor.",
      attack: "Debugger=cmd.exe under sethc.exe → Sticky Keys backdoor for RDP",
    },
    {
      path: "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\KnownDLLs",
      color: C.green, category: "DLL Loading",
      desc: "Lists DLLs that Windows loads from System32 only — prevents DLL hijacking for these. Missing from this list = hijackable.",
      attack: "DLL not in KnownDLLs + missing from app dir → plant in current dir",
    },
  ];
  return (
    <div>
      {keys.map(k => (
        <div key={k.path} style={{ background: "#070a12", border: `1px solid ${k.color}22`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "5px" }}>
            <span style={S.badge(k.color)}>{k.category}</span>
            <span style={{ color: k.color, fontWeight: "700", fontSize: "11px", fontFamily: mono }}>{k.path}</span>
          </div>
          <div style={{ color: C.text, fontSize: "11px", marginBottom: "4px" }}>{k.desc}</div>
          <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
            <span style={{ color: C.red, fontSize: "10px", fontWeight: "700" }}>⚠ ATTACK:</span>
            <span style={{ color: C.dim, fontSize: "10.5px", fontStyle: "italic" }}>{k.attack}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Forensics Panel ───────────────────────────────────────────────────────── */
const ForensicsTimeline = () => {
  const items = [
    { ts: "T+00:00", evt: "attacker gains foothold via phishing macro", color: C.orange },
    { ts: "T+00:12", evt: "reg query HKLM\\SAM (blocked by SYSTEM ACL)", color: C.dim },
    { ts: "T+00:14", evt: "New Run key created: HKCU\\..\\Run\\WindowsUpdate → C:\\Users\\Public\\svchost32.exe", color: C.red },
    { ts: "T+00:31", evt: "HKLM\\..\\Services\\EvilSvc created with Start=2, ImagePath=C:\\Users\\Public\\svchost32.exe", color: C.red },
    { ts: "T+01:45", evt: "Sysmon Event 13: Registry value set — detected by SIEM rule", color: C.yellow },
    { ts: "T+02:00", evt: "EDR alert: Unsigned binary registered as service", color: C.cyan },
    { ts: "T+02:04", evt: "Analyst pulls: Get-Item HKCU:\\..\\Run; checks LastWriteTime of key", color: C.green },
    { ts: "T+02:15", evt: "reg export + offline analysis with RegRipper confirms lateral movement prep", color: C.green },
  ];
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "6px", alignItems: "flex-start" }}>
          <span style={{ color: C.dim, fontSize: "10.5px", minWidth: "60px", paddingTop: "1px" }}>{it.ts}</span>
          <div style={{ width: "1px", background: `${it.color}55`, alignSelf: "stretch" }} />
          <span style={{ color: it.color, fontSize: "11px" }}>{it.evt}</span>
        </div>
      ))}
    </div>
  );
};

export default function WindowsStep02() {
  const [secTab, setSecTab] = useState("attack");
  const [monTab, setMonTab] = useState("events");
  const [cmpTab, setCmpTab] = useState("structure");
  const [viewTab, setViewTab] = useState("hives");

  return (
    <div style={S.root}>
      {/* Top bar */}
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.green, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 02 · REGISTRY ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── Panel 1: Title ── */}
        <div style={{ ...S.panel(C.orange), background: "linear-gradient(135deg, #0c0f16 55%, #1a0e00)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 02</div>
                <div style={{ color: C.orange, fontSize: "22px", fontWeight: "800", letterSpacing: "0.5px", lineHeight: "1.2" }}>Windows Registry</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>Architecture · Hives · Internals · Attack Surface · Forensics</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The central nervous system of Windows — and attackers' favourite playground</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: BEGINNER → ADVANCED</Pill>
                <Pill c={C.orange}>DOMAIN: OS INTERNALS / SECURITY</Pill>
                <Pill c={C.purple}>MODULE 02 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["SysAdmin","Red Team","Blue Team","DFIR","Auditor","Malware Analyst","Infra Engineer","Security Engineer"].map(r => (
                <Tag key={r} c={C.orange}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── Panel 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}>The Registry is Windows' <strong style={{color:C.bright}}>central configuration database</strong> — a hierarchical key-value store that holds settings for the OS, hardware, drivers, services, and every installed application.</Row>
              <Row c={C.green}>Think of it like a <strong style={{color:C.bright}}>filing cabinet</strong>: the drawers are root hives (HKLM, HKCU), folders are keys, and documents inside are values. Windows reads this cabinet constantly — on boot, login, every process start, every I/O operation.</Row>
              <Row c={C.green}>Before the Registry (pre-NT 3.1), settings were scattered in <strong style={{color:C.bright}}>INI files</strong> (.ini) — fragile, no ACLs, no transactions. Registry replaced this chaos with a structured, permission-controlled database.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>Registry is implemented by the <strong style={{color:C.bright}}>Configuration Manager (CM)</strong> — a kernel-mode component within ntoskrnl.exe. Physical hive files are memory-mapped using the <strong style={{color:C.bright}}>Cache Manager</strong>.</Row>
              <Row c={C.purple}>Each hive is a <strong style={{color:C.bright}}>binary database</strong> (REGF format) consisting of cells: key nodes (CM_KEY_NODE), value nodes (CM_KEY_VALUE), security cells (SD), and data cells. All indexed via a B-tree structure for O(log n) lookup.</Row>
              <Row c={C.purple}>Registry operations are <strong style={{color:C.bright}}>transactional</strong>: the CM maintains a log file (.LOG1/.LOG2) so partial writes can be rolled back after a crash — similar to journal-based filesystems.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Access control</strong> is per-key via Security Descriptors (DACLs). Every RegOpenKey call goes through the Security Reference Monitor (SRM) — same model as file system ACLs.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Boot dependency", "HKLM\\SYSTEM loaded by bootmgr before ntoskrnl — the kernel literally reads its own config from Registry before fully starting", C.cyan],
              ["Attack magnet", "Persistence, credential storage, auth config, COM registration, service definitions — attackers abuse all of it", C.red],
              ["Forensic goldmine", "LastWriteTime on every key, hive transaction logs, VSS shadow copies — timeline reconstruction is possible", C.yellow],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── Panel 3: Architecture ── */}
        <PB title="REGISTRY ARCHITECTURE — HIVE DIAGRAM" icon="🗜" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["hives", "ROOT HIVES"], ["arch", "INTERNAL ARCH"], ["types", "VALUE TYPES"]].map(([t, l]) => (
              <button key={t} style={S.tab(viewTab === t, C.purple)} onClick={() => setViewTab(t)}>{l}</button>
            ))}
          </div>
          {viewTab === "hives" && <RegTree />}
          {viewTab === "arch" && <HiveArch />}
          {viewTab === "types" && <ValueTypes />}
        </PB>

        {/* ── Panel 4: Workflow ── */}
        <PB title="WORKFLOW — REGISTRY ACCESS INTERNAL PROCESS" icon="⚙" color={C.orange}>
          <RegWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Key insight for security:</strong> Every registry access is mediated by the SRM. This is why HKLM\SAM requires SYSTEM — the DACL explicitly denies Administrators by default. Attackers bypass this by obtaining a SYSTEM token first.
          </div>
        </PB>

        {/* ── Panel 5: Commands ── */}
        <PB title="CMD / POWERSHELL — REGISTRY OPERATIONS" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ READ & ENUMERATE</div>
              <div style={S.code}>
{`# List subkeys of a hive path:`}
{`PS> Get-ChildItem HKLM:\\SYSTEM\\CurrentControlSet\\Services`}
{`    | Select Name, PSChildName`}
{``}
{`# Read a specific value:`}
{`PS> Get-ItemProperty `}
{`    "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion"`}
{`    -Name ProductName, CurrentBuild`}
{``}
{`# CMD equivalent:`}
{`C:\\> reg query HKLM\\SOFTWARE\\Microsoft\\Windows NT`}
{`              \\CurrentVersion /v ProductName`}
{``}
{`# Export an entire subtree:`}
{`C:\\> reg export HKLM\\SYSTEM system_backup.reg`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WRITE & PERSISTENCE</div>
              <div style={S.code}>
{`# Add a Run key (persistence):`}
{`C:\\> reg add HKCU\\Software\\Microsoft\\Windows`}
{`          \\CurrentVersion\\Run `}
{`     /v "Updater" /t REG_SZ `}
{`     /d "C:\\Users\\Public\\update.exe" /f`}
{``}
{`# Create registry value via PowerShell:`}
{`PS> New-ItemProperty `}
{`    -Path "HKCU:\\...\\Run" `}
{`    -Name "Updater" `}
{`    -Value "C:\\update.exe" `}
{`    -PropertyType String`}
{``}
{`# Delete a value:`}
{`PS> Remove-ItemProperty -Path "HKCU:\\...\\Run" `}
{`    -Name "Updater"`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ FORENSIC / AUDIT OPERATIONS</div>
            <div style={S.code}>
{`# Check LastWriteTime of a registry key (forensic):`}
{`PS> $key = [Microsoft.Win32.Registry]::LocalMachine.OpenSubKey(`}
{`    "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run")`}
{`PS> $key.GetValue("") ; $key | Get-Member`}
{``}
{`# Use reg save to extract SAM/SECURITY hives (SYSTEM required):`}
{`C:\\> reg save HKLM\\SAM C:\\temp\\sam.hive`}
{`C:\\> reg save HKLM\\SECURITY C:\\temp\\security.hive`}
{`C:\\> reg save HKLM\\SYSTEM C:\\temp\\system.hive`}
{`# Then: impacket-secretsdump -sam sam.hive -security security.hive -system system.hive LOCAL`}
{``}
{`# Find all Run/RunOnce keys recursively:`}
{`PS> Get-ChildItem -Path "HKLM:\\SOFTWARE","HKCU:\\SOFTWARE" -Recurse `}
{`    | Where-Object { $_.PSChildName -match "^Run" }`}
            </div>
          </div>
        </PB>

        {/* ── Panel 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — HIVE BINARY FORMAT & CELL STRUCTURE" icon="🔬" color={C.purple}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ REGF BINARY FORMAT (hive file on disk)</div>
              <div style={S.code}>
{`Offset  Size  Field`}
{`──────  ────  ─────────────────────────────`}
{`0x000   4     Signature: "regf" (magic)`}
{`0x004   4     Primary sequence number`}
{`0x008   4     Secondary sequence number`}
{`0x010   8     Last written timestamp (FILETIME)`}
{`0x018   4     Major version (must be 1)`}
{`0x01C   4     Minor version (3–6 depending on OS)`}
{`0x020   4     Type (0=primary, 1=log)`}
{`0x024   4     Format (1=direct mapped)`}
{`0x028   4     Root cell offset → first CM_KEY_NODE`}
{`0x02C   4     Hive bins data size`}
{`0x030   4     Clustering factor`}
{`0x034   64    File name (Unicode)`}
{`...`}
{`0x1FC   4     Checksum (XOR of header DWORDs)`}
{`0x200   →     First hive bin (4KB aligned blocks)`}
              </div>
            </div>
            <div>
              <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ CM_KEY_NODE STRUCTURE (per key)</div>
              <div style={S.code}>
{`Field              Size  Description`}
{`──────────────     ────  ─────────────────────`}
{`Signature          2     "nk" (0x6B6E)`}
{`Flags              2     Volatile/Hive root/..`}
{`LastWriteTime      8     FILETIME (100ns units)`}
{`SubKeyCounts       4×2   Stable + volatile`}
{`SubKeyListOffset   4     → CM_KEY_FAST_INDEX`}
{`ValueCount         4     Number of values`}
{`ValueListOffset    4     → array of value offsets`}
{`SecurityOffset     4     → CM_KEY_SECURITY`}
{`ClassOffset        4     → class name cell`}
{`MaxNameLen         2     Max subkey name length`}
{`NameLength         2     This key's name length`}
{`Name               var   Key name (ASCII or Unicode)`}
              </div>
              <div style={{ marginTop: "8px", color: C.dim, fontSize: "11px" }}>
                <strong style={{ color: C.cyan }}>LastWriteTime</strong> on CM_KEY_NODE is critical for forensics — it's the only timestamp on registry keys (no create time separately). A key modified at 2 AM during an incident is a red flag.
              </div>
            </div>
          </div>
        </PB>

        {/* ── Panel 6b: Important Keys ── */}
        <PB title="CRITICAL REGISTRY KEYS — ATTACK & DEFENSE MAP" icon="🗝" color={C.yellow}>
          <ImportantKeys />
        </PB>

        {/* ── Panel 7: Security ── */}
        <PB title="SECURITY PERSPECTIVE" icon="🛡" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["attack", "defense", "redteam"].map(t => (
              <button key={t} style={S.tab(secTab === t, C.red)} onClick={() => setSecTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {secTab === "attack" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PERSISTENCE TECHNIQUES</div>
                {[
                  ["Run / RunOnce Keys", "HKCU\\..\\Run — no admin needed; survives reboot; per-user or machine-wide variant", C.red],
                  ["Scheduled Task via Registry", "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Schedule\\TaskCache — task XML stored here", C.orange],
                  ["AppInit_DLLs", "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Windows\\AppInit_DLLs — DLL injected into every GUI process", C.yellow],
                  ["Winlogon Notify", "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon — Userinit / Shell replacement", C.red],
                  ["COM Hijacking", "HKCU override of HKCR CLSID → no admin needed, executes in calling process context", C.purple],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#140a0a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ CREDENTIAL THEFT VIA REGISTRY</div>
                {[
                  ["SAM Hive Extraction", "reg save HKLM\\SAM + HKLM\\SYSTEM → extract NTLM hashes offline. VSS shadow copy bypass possible.", C.red],
                  ["LSA Secrets", "HKLM\\SECURITY\\Policy\\Secrets — service account passwords, DPAPI master keys, cached domain creds", C.red],
                  ["AutoLogon Credentials", "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon — DefaultPassword in CLEARTEXT", C.orange],
                  ["VPN/WiFi PSKs", "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\NetworkList — SSIDs; wlan creds in Credential Manager", C.yellow],
                  ["Cached Domain Credentials", "HKLM\\SECURITY\\Cache — MSCASHv2 hashes of last 10 domain logons. Crackable offline.", C.red],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#140a0a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>🔑 {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secTab === "defense" && (
            <div style={S.grid2}>
              {[
                ["Registry ACL Hardening", "Restrict write access to HKLM\\..\\Run, \\Services, \\Winlogon to SYSTEM only via Group Policy. Audit DACL misconfigurations.", C.green],
                ["Credential Guard", "Isolates LSASS — SAM/SECURITY hive data still exists but cached cred extraction from memory blocked. Hive offline extraction still possible with SYSTEM.", C.cyan],
                ["AppLocker + WDAC", "Block DLL registration via AppInit_DLLs by enforcing WDAC code integrity. Controlled by registry — protect the registry to protect the policy.", C.green],
                ["Enable Registry Auditing", "GPO: Security Settings → Local Policies → Audit Object Access → enable Success+Failure. Then set SACL on specific keys (HKLM\\SAM, \\Run).", C.cyan],
                ["Block reg.exe via AppLocker", "Prevent low-priv users from using reg.exe/regedit.exe for direct hive manipulation. Use AppLocker publisher rules.", C.purple],
                ["Disable AutoLogon", "Remove DefaultPassword and AutoAdminLogon values. Use BitLocker + pre-boot PIN instead of AutoLogon for unattended machines.", C.orange],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {secTab === "redteam" && (
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ RED TEAM REGISTRY PLAYBOOK</div>
              <div style={S.code}>
{`# === ENUMERATION (No admin needed) ===`}
{`# Check AutoLogon creds:`}
{`reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon"`}
{`# Look for: DefaultUsername, DefaultPassword, AutoAdminLogon`}
{``}
{`# Find all Run/RunOnce entries:`}
{`reg query HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run`}
{`reg query HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run`}
{``}
{`# === PERSISTENCE (No admin — HKCU) ===`}
{`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" `}
{`    /v "WindowsUpdate" /t REG_SZ /d "C:\\Users\\Public\\payload.exe" /f`}
{``}
{`# === COM HIJACKING (No admin) ===`}
{`# Find missing CLSID being loaded by high-priv process:`}
{`# 1. Run ProcMon with filter: Operation=RegOpenKey, Result=NAME NOT FOUND`}
{`# 2. Note HKCU-writable CLSIDs in HKCR path`}
{`# 3. Register payload:`}
{`reg add "HKCU\\Software\\Classes\\CLSID\\{GUID}\\InprocServer32"`}
{`    /ve /t REG_SZ /d "C:\\payload.dll" /f`}
{``}
{`# === CREDENTIAL HARVEST (SYSTEM required) ===`}
{`reg save HKLM\\SAM C:\\Windows\\Temp\\s.hiv`}
{`reg save HKLM\\SECURITY C:\\Windows\\Temp\\sec.hiv`}
{`reg save HKLM\\SYSTEM C:\\Windows\\Temp\\sys.hiv`}
{`# Transfer hives → secretsdump.py -sam s.hiv -security sec.hiv -system sys.hiv LOCAL`}
              </div>
            </div>
          )}
        </PB>

        {/* ── Panel 8: Monitoring ── */}
        <PB title="MONITORING & FORENSICS" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events", "sysmon", "timeline", "tools"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WINDOWS EVENT IDs — REGISTRY MONITORING</div>
              <div style={S.grid2}>
                {[
                  ["4656", "Registry key handle requested — who tried to open what key", C.cyan],
                  ["4657", "Registry value modified — KEY/VALUE name + new data (if Object Access audit enabled)", C.red],
                  ["4658", "Handle to registry object closed", C.dim],
                  ["4660", "Registry key deleted", C.orange],
                  ["4663", "Access to registry object — granular operation tracking", C.cyan],
                  ["4670", "Registry object permissions changed — DACL modification", C.red],
                ].map(([id, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                    <span style={{ ...S.badge(c), minWidth: "38px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={S.code}>
{`# Enable registry audit via PowerShell:`}
{`auditpol /set /subcategory:"Registry" /success:enable /failure:enable`}
{``}
{`# Query registry modification events:`}
{`Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4657} | `}
{`  Select-Object TimeCreated, @{N='Key';E={$_.Properties[5].Value}},`}
{`    @{N='Value';E={$_.Properties[6].Value}},`}
{`    @{N='NewData';E={$_.Properties[10].Value}}`}
              </div>
            </div>
          )}

          {monTab === "sysmon" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON REGISTRY EVENTS</div>
              <div style={S.grid2}>
                {[
                  ["Event 12", "RegistryEvent (Object create/delete) — key created or deleted", C.cyan],
                  ["Event 13", "RegistryEvent (Value Set) — value written; logs target key + new value", C.red],
                  ["Event 14", "RegistryEvent (Key/Value Rename) — rename operation captured", C.orange],
                ].map(([id, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
                    <span style={{ ...S.badge(c), minWidth: "65px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={S.code}>
{`<!-- Sysmon rule — detect Run key writes: -->`}
{`<RegistryEvent onmatch="include">`}
{`  <TargetObject condition="contains">\\CurrentVersion\\Run</TargetObject>`}
{`  <TargetObject condition="contains">\\CurrentVersion\\RunOnce</TargetObject>`}
{`  <TargetObject condition="contains">\\Winlogon\\Shell</TargetObject>`}
{`  <TargetObject condition="contains">AppInit_DLLs</TargetObject>`}
{`</RegistryEvent>`}
{``}
{`# Query Sysmon Event 13 via PowerShell:`}
{`Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational"`}
{`  | Where-Object {$_.Id -eq 13}`}
{`  | Select-Object TimeCreated,`}
{`      @{N="Key";E={$_.Properties[5].Value}}`}
              </div>
            </div>
          )}

          {monTab === "timeline" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ INCIDENT TIMELINE — REGISTRY-BASED ATTACK CHAIN</div>
              <ForensicsTimeline />
              <hr style={S.sep} />
              <div style={{ color: C.dim, fontSize: "11px" }}>
                <strong style={{ color: C.yellow }}>Forensic note:</strong> Registry hive <code>LastWriteTime</code> is stored per key in CM_KEY_NODE as a Windows FILETIME (100-nanosecond intervals since Jan 1, 1601). Parse with: <code style={{ color: C.cyan }}>[datetime]::FromFileTime($timestamp)</code>. Tool: <strong>RegRipper, Registry Explorer (EZ-Tools), Autopsy</strong>.
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["Sysinternals Autoruns", "autoruns.exe / autorunsc.exe", "Gold standard for persistence detection. Shows every registry-based autostart location. VirusTotal integration.", C.cyan],
                ["Sysinternals RegMon / Process Monitor", "procmon.exe with Registry filter", "Real-time registry I/O tracing. Filter by process, operation, path. Essential for malware analysis.", C.green],
                ["Registry Explorer (Eric Zimmermann)", "RegistryExplorer.exe", "Parse offline hive files. View timestamps. Search across all hives. Best DFIR registry tool.", C.purple],
                ["RegRipper", "rip.exe -r SAM -f sam", "Plugin-based offline hive parser. 200+ plugins for known forensic artifacts. Used in Autopsy.", C.orange],
                ["AccessChk (Sysinternals)", "accesschk.exe -kvuqsw HKLM\\...", "Audit registry key ACLs. Find world-writable or user-writable privileged keys.", C.yellow],
                ["Reg.exe / Regedit.exe", "Built-in Windows tools", "reg query/add/delete/save/restore/export/import. Regedit for GUI browsing.", C.dim],
              ].map(([t, cmd, d, c]) => (
                <div key={t} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{t}</div>
                  <div style={{ color: C.dim, fontSize: "10px", fontStyle: "italic", marginBottom: "4px" }}>{cmd}</div>
                  <div style={{ color: C.text, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}
        </PB>

        {/* ── Panel 9: Windows vs Linux ── */}
        <PB title="WINDOWS REGISTRY vs LINUX /etc CONFIGURATION" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["structure","access","forensics","attack"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#00101a", border: `1px solid ${C.cyan}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.cyan, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS REGISTRY</div>
              {cmpTab === "structure" && <>
                <KV k="Format" v="Binary REGF hive files (CM managed)" kc={C.cyan} />
                <KV k="Location" v="C:\\Windows\\System32\\config\\ (HKLM)" kc={C.cyan} />
                <KV k="Hierarchy" v="Root → Key → Subkey → Value (typed)" kc={C.cyan} />
                <KV k="Access model" v="Per-key ACLs (DACL) + SACLs for audit" kc={C.cyan} />
                <KV k="Transaction" v="LOG1/LOG2 journal files (crash recovery)" kc={C.cyan} />
                <KV k="In-memory" v="Config Manager maps hives; cached in CM" kc={C.cyan} />
              </>}
              {cmpTab === "access" && <>
                <KV k="Primary tool" v="regedit.exe (GUI), reg.exe (CLI)" kc={C.cyan} />
                <KV k="PowerShell" v="Get-Item HKLM:\\..., Set-ItemProperty" kc={C.cyan} />
                <KV k="API" v="RegOpenKeyEx, RegQueryValueEx (advapi32)" kc={C.cyan} />
                <KV k="Remote" v="RegConnectRegistry() over SMB (pipe:\\winreg)" kc={C.cyan} />
                <KV k="Audit" v="Enable Object Access audit + SACL on key" kc={C.cyan} />
              </>}
              {cmpTab === "forensics" && <>
                <KV k="Timestamps" v="LastWriteTime per key (CM_KEY_NODE)" kc={C.cyan} />
                <KV k="Deleted keys" v="Remain in hive slack space until compaction" kc={C.cyan} />
                <KV k="Shadow copies" v="VSS snapshots preserve historical hives" kc={C.cyan} />
                <KV k="Offline parse" v="Registry Explorer, RegRipper, Autopsy" kc={C.cyan} />
                <KV k="Log files" v=".LOG1/.LOG2 contain partial writes (forensic)" kc={C.cyan} />
              </>}
              {cmpTab === "attack" && <>
                <KV k="Persistence" v="Run/RunOnce/Services/AppInit_DLLs keys" kc={C.cyan} />
                <KV k="Creds" v="HKLM\\SAM, \\SECURITY\\Policy\\Secrets" kc={C.cyan} />
                <KV k="No-admin" v="HKCU writable by any user — COM hijack" kc={C.cyan} />
                <KV k="Remote" v="Lateral movement via remote registry (445)" kc={C.cyan} />
                <KV k="Fileless" v="Store payload in REG_BINARY value; powershell load from registry" kc={C.cyan} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a180a", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX /etc EQUIVALENT</div>
              {cmpTab === "structure" && <>
                <KV k="Format" v="Plain text files (human readable)" kc={C.green} />
                <KV k="Location" v="/etc/ (system), ~/.config/ (user), /proc/ (kernel)" kc={C.green} />
                <KV k="Hierarchy" v="Directory tree → text files → key=value lines" kc={C.green} />
                <KV k="Access model" v="POSIX DAC (rwx bits) + SELinux/AppArmor" kc={C.green} />
                <KV k="Transaction" v="No built-in; some configs use atomic rename" kc={C.green} />
                <KV k="In-memory" v="/proc & /sys pseudo-filesystems (live kernel state)" kc={C.green} />
              </>}
              {cmpTab === "access" && <>
                <KV k="Primary tool" v="vim/nano (GUI: gedit), cat, echo" kc={C.green} />
                <KV k="Shell" v="echo 'key=val' >> /etc/conf, sed -i substitution" kc={C.green} />
                <KV k="API" v="open() → read/write → close() (standard file I/O)" kc={C.green} />
                <KV k="Remote" v="SSH, SCP, Ansible (no special protocol needed)" kc={C.green} />
                <KV k="Audit" v="auditd (-w /etc/passwd -p war) watches files" kc={C.green} />
              </>}
              {cmpTab === "forensics" && <>
                <KV k="Timestamps" v="mtime/atime/ctime per file (inode)" kc={C.green} />
                <KV k="Deleted files" v="inode unlinked; data may remain in slack" kc={C.green} />
                <KV k="Snapshots" v="LVM snapshots, Btrfs snapshots (if configured)" kc={C.green} />
                <KV k="Offline parse" v="mount image → cat files; timeline with mactime" kc={C.green} />
                <KV k="Log files" v="/var/log/auth.log, syslog, auditd audit.log" kc={C.green} />
              </>}
              {cmpTab === "attack" && <>
                <KV k="Persistence" v="/etc/crontab, ~/.bashrc, /etc/profile.d/, systemd units" kc={C.green} />
                <KV k="Creds" v="/etc/shadow (hashed), ~/.ssh/id_rsa, /proc/1/mem" kc={C.green} />
                <KV k="No-root" v="~/.bashrc, ~/.profile, user crontabs writable" kc={C.green} />
                <KV k="Remote" v="SSH authorized_keys, /etc/hosts.allow manipulation" kc={C.green} />
                <KV k="Fileless" v="memfd_create() → execute in-memory (no file on disk)" kc={C.green} />
              </>}
            </div>
          </div>
        </PB>

        {/* ── Panel 10: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — REGISTRY-BASED INCIDENT" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: SOC Alert — Malware Achieves Persistence via Multiple Registry Techniques
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION ALERT (SIEM / EDR)</div>
              <div style={S.code}>
{`[HIGH] Sysmon Event 13 - Registry Value Set`}
{`  Host    : WKSTN-042.corp.local`}
{`  Process : powershell.exe (PID 7744)`}
{`  Parent  : winword.exe (PID 6320)  ← suspicious!`}
{`  Key     : HKCU\\..\\CurrentVersion\\Run`}
{`  Value   : "MSUpdate"`}
{`  Data    : powershell.exe -enc [base64blob]`}
{`  Time    : 03:42:11 UTC`}
{``}
{`[MEDIUM] Sysmon Event 7 - Image Loaded`}
{`  Process : svchost.exe (PID 2244)`}
{`  DLL     : C:\\Users\\Public\\wbemdisp.dll`}
{`  Signed  : false ← unsigned DLL in svchost!`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DFIR INVESTIGATION</div>
              <div style={S.code}>
{`# Step 1: Identify what's in the Run key`}
{`reg query HKCU\\..\\CurrentVersion\\Run`}
{``}
{`# Step 2: Decode the base64 payload`}
{`[System.Text.Encoding]::Unicode.GetString(`}
{`  [System.Convert]::FromBase64String("[blob]"))`}
{``}
{`# Step 3: Check AppInit_DLLs for DLL injection`}
{`reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT`}
{`  \\CurrentVersion\\Windows" /v AppInit_DLLs`}
{``}
{`# Step 4: Autoruns for full persistence picture`}
{`autorunsc.exe -a * -c -h -s > C:\\ir\\autoruns.csv`}
{``}
{`# Step 5: Remediate`}
{`reg delete HKCU\\..\\CurrentVersion\\Run /v MSUpdate /f`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Root Cause", "Phishing doc (winword.exe) spawned PowerShell that wrote Run key and dropped unsigned DLL into Public folder", C.orange],
              ["Detection Gap", "AppInit_DLLs injection requires HKLM write — suggests SYSTEM access or UAC bypass also occurred", C.red],
              ["Remediation", "Remove Run key → remove DLL → re-image endpoint → reset user creds → hunt for lateral movement", C.green],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090f", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── Panel 11: Auditor Checklist ── */}
        <PB title="AUDITOR / SECURITY CHECKLIST — REGISTRY HARDENING" icon="✓" color={C.green}>
          <div style={S.grid2}>
            {[
              [C.green, "Persistence Key Review", [
                "Enumerate all Run/RunOnce entries (machine + user scope)",
                "Verify every Run entry is signed and expected software",
                "Audit Winlogon Shell and Userinit values",
                "Check AppInit_DLLs — should be empty in hardened environments",
                "Review Image File Execution Options for debugger values",
              ]],
              [C.cyan, "Service & Driver Integrity", [
                "List all services (reg query HKLM\\..\\Services) — compare to baseline",
                "Flag services with ImagePath outside System32 or Program Files",
                "Check service Start type — unauthorized Auto-start services",
                "Verify all service binaries are digitally signed (Get-AuthenticodeSignature)",
              ]],
              [C.orange, "Credential Exposure Check", [
                "Check Winlogon DefaultPassword — must not exist or be empty",
                "Audit HKLM\\SECURITY — verify only SYSTEM has access",
                "Confirm Credential Guard enabled (LsaCfgFlags = 1 in HKLM\\..\\LSA)",
                "Verify PPL for LSASS (RunAsPPL = 1)",
                "Check WDigest UseLogonCredential = 0 (disables plaintext in memory)",
              ]],
              [C.purple, "ACL & Audit Posture", [
                "Audit registry ACLs: no world-writable HKLM keys (accesschk)",
                "Enable Object Access audit with SACL on Run, Services, SAM, Winlogon",
                "Confirm Sysmon Event 12/13/14 rules deployed",
                "Verify EVTX logs shipped to SIEM (no local-only audit trail)",
              ]],
            ].map(([c, title, items]) => (
              <div key={title} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "12px" }}>
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
        </PB>

        {/* ── Panel 12: Summary ── */}
        <PB title="SUMMARY — KEY TAKEAWAYS" icon="📋" color={C.cyan} accent={C.cyan + "44"}>
          <div style={S.grid3}>
            {[
              ["Registry = OS nervous system", "Every Windows component reads/writes Registry constantly. Services, auth, drivers, UI — all configured here.", C.green],
              ["REGF binary format", "Hives are binary databases with REGF header, hive bins, and typed cells (key nodes, value nodes, data cells). Not human-readable unlike /etc.", C.cyan],
              ["Kernel-managed (Config Manager)", "CM in ntoskrnl maps hives into memory. Transactional writes via LOG files. Access mediated by SRM per-key ACLs.", C.purple],
              ["HKLM\\SAM = crown jewel", "Local user NTLM hashes live here. Requires SYSTEM to read. reg save + secretsdump is the standard harvest path.", C.red],
              ["Run keys = persistence hotspot", "Both HKLM (admin) and HKCU (any user) Run keys execute at login. Monitor with Sysmon Event 13 + Autoruns.", C.orange],
              ["LastWriteTime = timeline anchor", "Every key has a LastWriteTime (FILETIME). DFIR uses this to reconstruct attacker timeline from offline hive analysis.", C.yellow],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "5px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
          <hr style={S.sep} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ color: C.dim, fontSize: "11px" }}>
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 03: NTFS Internals — MFT, ADS, Timestamps, File System Forensics & Attacks
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 02 Complete</Pill>
              <Pill c={C.cyan}>12 Panels · Registry Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
