import { useState } from "react";

const C = {
  bg: "#070810",
  panel: "#090b16",
  header: "#0d1020",
  border: "#1a2240",
  cyan: "#00d0ff",
  green: "#00e888",
  red: "#ff2255",
  orange: "#ff9000",
  yellow: "#f0c830",
  purple: "#a060ff",
  teal: "#00d8c0",
  pink: "#f040a0",
  lime: "#88d820",
  sky: "#40b8f8",
  gold: "#d8a020",
  text: "#b0c0d8",
  dim: "#485870",
  bright: "#d8eaf8",
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

/* ── Service Architecture SVG ─────────────────────────────────────────── */
const ServiceArch = () => (
  <svg viewBox="0 0 760 500" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#485870" fontSize="10" letterSpacing="2">WINDOWS SERVICE ARCHITECTURE — SCM · SVCHOST · SERVICE PROCESSES</text>

    {/* User Mode boundary */}
    <rect x="10" y="22" width="740" height="320" rx="4" fill="#08090e" stroke="#00e88822" strokeWidth="1" />
    <text x="20" y="40" fill="#00e888" fontSize="10" fontWeight="700" letterSpacing="2">USER MODE</text>

    {/* SCM box */}
    <rect x="270" y="48" width="220" height="68" rx="4" fill="#0a0c18" stroke="#f0c83055" strokeWidth="2" />
    <text x="380" y="70" textAnchor="middle" fill="#f0c830" fontSize="11" fontWeight="800">services.exe</text>
    <text x="380" y="85" textAnchor="middle" fill="#f0c830" fontSize="10" fontWeight="700">Service Control Manager (SCM)</text>
    <text x="380" y="100" textAnchor="middle" fill="#485870" fontSize="9">PID usually ~560 · Parent: wininit.exe · SYSTEM token</text>

    {/* Management tools */}
    <rect x="20" y="55" width="220" height="54" rx="3" fill="#0a0c18" stroke="#00d0ff33" strokeWidth="1.5" />
    <text x="130" y="76" textAnchor="middle" fill="#00d0ff" fontSize="10" fontWeight="700">Management Interfaces</text>
    <text x="130" y="93" textAnchor="middle" fill="#485870" fontSize="9">services.msc · sc.exe · PowerShell · DCOM/WMI</text>
    <line x1="240" y1="82" x2="270" y2="82" stroke="#00d0ff33" strokeWidth="1.5" strokeDasharray="4,3" />

    {/* Service database */}
    <rect x="520" y="55" width="220" height="54" rx="3" fill="#0a0c18" stroke="#a060ff33" strokeWidth="1.5" />
    <text x="630" y="76" textAnchor="middle" fill="#a060ff" fontSize="10" fontWeight="700">Service Database</text>
    <text x="630" y="93" textAnchor="middle" fill="#485870" fontSize="9">HKLM\SYSTEM\CurrentControlSet\Services</text>
    <line x1="490" y1="82" x2="520" y2="82" stroke="#a060ff33" strokeWidth="1.5" strokeDasharray="4,3" />

    {/* svchost instances */}
    {[
      { group: "-k netsvcs", services: ["BITS","Themes","WSearch","WUpdate"], color: C.cyan, x: 20, y: 138 },
      { group: "-k LocalSystem", services: ["RPC","DCOM","PnP"], color: C.teal, x: 210, y: 138 },
      { group: "-k LocalService", services: ["Spooler*","DNS Client","DHCP"], color: C.green, x: 400, y: 138 },
      { group: "-k NetworkService", services: ["Dnscache","NtpClient"], color: C.sky, x: 590, y: 138 },
    ].map(({ group, services, color, x, y }) => (
      <g key={group}>
        <rect x={x} y={y} width="178" height="80" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 89} y={y + 18} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">svchost.exe</text>
        <text x={x + 89} y={y + 31} textAnchor="middle" fill={color} fontSize="8.5">{group}</text>
        {services.map((s, i) => (
          <text key={s} x={x + 89} y={y + 46 + i * 13} textAnchor="middle" fill="#485870" fontSize="8.5">{s}</text>
        ))}
        <line x1={x + 89} y1={138} x2={380} y2={116} stroke={`${color}22`} strokeWidth="1" strokeDasharray="3,3" />
      </g>
    ))}

    {/* Own-process services */}
    <rect x="20" y="238" width="720" height="88" rx="3" fill="#09090d" stroke="#ff900033" strokeWidth="1" />
    <text x="30" y="256" fill="#ff9000" fontSize="10" fontWeight="700">OWN-PROCESS SERVICES (each runs in dedicated process)</text>
    {[
      ["lsass.exe\nLocal Security", "#ff2255", 30],
      ["spoolsv.exe\nPrint Spooler", "#ff9000", 160],
      ["MsMpEng.exe\nDefender", "#00e888", 290],
      ["sqlservr.exe\nSQL Server", "#00d0ff", 420],
      ["IIS w3svc\nWeb Server", "#a060ff", 550],
      ["Custom.exe\nUser Service", "#f0c830", 660],
    ].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x} y={262} width="118" height="54" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 59} y={282} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 59} y={297} textAnchor="middle" fill="#485870" fontSize="8.5">{label.split("\n")[1]}</text>
      </g>
    ))}

    {/* Kernel mode */}
    <rect x="10" y="352" width="740" height="138" rx="4" fill="#06070e" stroke="#a060ff22" strokeWidth="1" />
    <text x="20" y="370" fill="#a060ff" fontSize="10" fontWeight="700" letterSpacing="2">KERNEL MODE — DRIVER SERVICES</text>
    {[
      { name: "NTFS.sys\nFile System", color: C.teal, x: 20 },
      { name: "tcpip.sys\nNetwork Stack", color: C.sky, x: 170 },
      { name: "NDISwan.sys\nNDIS Driver", color: C.cyan, x: 320 },
      { name: "storport.sys\nStorage", color: C.orange, x: 470 },
      { name: "MiniFilter\nDrivers (AVs)", color: C.green, x: 600 },
    ].map(({ name, color, x }) => (
      <g key={name}>
        <rect x={x} y={378} width="138" height="100" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 69} y={400} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{name.split("\n")[0]}</text>
        <text x={x + 69} y={415} textAnchor="middle" fill="#485870" fontSize="8.5">{name.split("\n")[1]}</text>
        <text x={x + 69} y={428} textAnchor="middle" fill="#485870" fontSize="8">Start: Boot/System/Auto</text>
        <text x={x + 69} y={462} textAnchor="middle" fill={color} fontSize="8">Ring 0</text>
      </g>
    ))}

    {/* Boundary */}
    <line x1="10" y1="348" x2="750" y2="348" stroke="#ffffff10" strokeWidth="1" strokeDasharray="6,4" />
    <text x="380" y="347" textAnchor="middle" fill="#ffffff18" fontSize="9">─── KERNEL / USER BOUNDARY ───</text>
  </svg>
);

/* ── Driver Stack SVG ─────────────────────────────────────────────────── */
const DriverStackDiagram = () => (
  <svg viewBox="0 0 760 460" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#485870" fontSize="10" letterSpacing="2">WDM I/O DRIVER STACK — IRP FLOW (e.g. disk write path)</text>

    {/* Application */}
    <rect x="240" y="22" width="280" height="38" rx="3" fill="#0a0c18" stroke="#00e88855" strokeWidth="1.5" />
    <text x="380" y="38" textAnchor="middle" fill="#00e888" fontSize="10.5" fontWeight="700">Application / User Mode (WriteFile)</text>
    <text x="380" y="52" textAnchor="middle" fill="#485870" fontSize="9">NtWriteFile syscall → I/O Manager creates IRP</text>

    {/* Arrow down */}
    <line x1="380" y1="60" x2="380" y2="78" stroke="#00e88844" strokeWidth="1.5" />
    <text x="400" y="72" fill="#485870" fontSize="9">IRP_MJ_WRITE</text>

    {/* Stack layers */}
    {[
      { name: "File System Driver", detail: "NTFS.sys — processes file I/O semantics, path resolution, metadata update, caching via Cache Manager", color: C.cyan, y: 80 },
      { name: "File System Filter (MiniFilter)", detail: "fltmgr.sys framework — AV/EDR pre/post callbacks. FltRegisterFilter() + altitude. Kapersky=320000, Defender=328010", color: C.purple, y: 155 },
      { name: "Volume Manager", detail: "volmgr.sys / VolSnap.sys — logical volume, RAID, VSS snapshots, BitLocker (fvevol.sys) encryption layer", color: C.teal, y: 230 },
      { name: "Disk Class Driver", detail: "disk.sys — generic disk class operations, partition management, device object per partition", color: C.orange, y: 305 },
      { name: "Port/Miniport Driver", detail: "storport.sys (class) + OEM miniport (e.g. iaStorAC.sys Intel). Translates IRP to hardware command (SCSI/AHCI/NVMe)", color: C.yellow, y: 380 },
    ].map(({ name, detail, color, y }, i) => (
      <g key={name}>
        <rect x="80" y={y} width="600" height="66" rx="3" fill={`${color}0c`} stroke={`${color}55`} strokeWidth="1.5" />
        <rect x="80" y={y} width="4" height="66" rx="1" fill={color} />
        <text x="94" y={y + 22} fill={color} fontSize="11" fontWeight="700">{name}</text>
        <text x="94" y={y + 38} fill="#485870" fontSize="9">{detail.slice(0, 80)}</text>
        {detail.length > 80 && <text x="94" y={y + 51} fill="#485870" fontSize="9">{detail.slice(80)}</text>}
        <text x="668" y={y + 22} textAnchor="end" fill={color} fontSize="9" fontWeight="600">Layer {i + 1}</text>
        {i < 4 && <line x1="380" y1={y + 66} x2="380" y2={y + 75} stroke={`${color}44`} strokeWidth="1.5" />}
      </g>
    ))}

    {/* Hardware */}
    <rect x="180" y="450" width="400" height="8" rx="2" fill="#485870" />
    <text x="380" y="462" textAnchor="middle" fill="#485870" fontSize="9">Hardware (NVMe / AHCI / SAS Controller)</text>

    {/* IRP note */}
    <rect x="10" y="170" width="65" height="80" rx="3" fill="#0a0c18" stroke="#f0c83033" strokeWidth="1" />
    <text x="42" y="190" textAnchor="middle" fill="#f0c830" fontSize="9" fontWeight="700">IRP</text>
    <text x="42" y="204" textAnchor="middle" fill="#485870" fontSize="8">passes</text>
    <text x="42" y="217" textAnchor="middle" fill="#485870" fontSize="8">down</text>
    <text x="42" y="230" textAnchor="middle" fill="#485870" fontSize="8">stack</text>
    <text x="42" y="244" textAnchor="middle" fill="#f0c830" fontSize="8">↓</text>

    <rect x="685" y="170" width="65" height="80" rx="3" fill="#0a0c18" stroke="#00e88833" strokeWidth="1" />
    <text x="717" y="190" textAnchor="middle" fill="#00e888" fontSize="9" fontWeight="700">COMPLETE</text>
    <text x="717" y="204" textAnchor="middle" fill="#485870" fontSize="8">bubbles</text>
    <text x="717" y="217" textAnchor="middle" fill="#485870" fontSize="8">back</text>
    <text x="717" y="230" textAnchor="middle" fill="#485870" fontSize="8">up</text>
    <text x="717" y="244" textAnchor="middle" fill="#00e888" fontSize="8">↑</text>
  </svg>
);

/* ── Service Start Types ──────────────────────────────────────────────── */
const StartTypeTable = () => {
  const types = [
    ["0", "Boot",     "Loaded by bootmgr/OS loader before kernel init. E.g. disk, volume drivers (must be NonPaged pool only)", C.red],
    ["1", "System",   "Loaded by I/O manager during kernel init Phase 1. E.g. NTFS.sys, tcpip.sys, fltmgr.sys", C.orange],
    ["2", "Automatic","Started by SCM after system boot completes. E.g. Spooler, BITS, Windows Update", C.yellow],
    ["3", "Manual",   "Started on demand (by SCM request, trigger, or API call). E.g. Print Spooler (trigger: printer connected)", C.green],
    ["4", "Disabled", "Cannot be started. Use for attack surface reduction — disable unused services (Telnet, FTP, Remote Registry)", C.dim],
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "40px 100px 1fr 80px", gap: "1px", background: C.border, borderRadius: "4px", overflow: "hidden" }}>
        {["VAL", "TYPE", "DESCRIPTION + EXAMPLES", ""].map(h => (
          <div key={h} style={{ background: C.header, padding: "6px 10px" }}>
            <span style={{ color: C.dim, fontWeight: "700", fontSize: "10px" }}>{h}</span>
          </div>
        ))}
        {types.map(([val, type, desc, c]) => (
          <>
            <div key={val+"v"} style={{ background: "#08090d", padding: "8px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: c, fontWeight: "700", fontSize: "12px" }}>{val}</span>
            </div>
            <div key={val+"t"} style={{ background: "#08090d", padding: "8px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{type}</span>
            </div>
            <div key={val+"d"} style={{ background: "#08090d", padding: "8px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
            </div>
            <div key={val+"b"} style={{ background: "#08090d", padding: "8px 10px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center" }}>
              <span style={S.badge(c)}>{type}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

/* ── Service Workflow ─────────────────────────────────────────────────── */
const ServiceFlow = () => {
  const steps = [
    { id:"01", label:"sc create / registry write", sub:"HKLM\\SYSTEM\\CurrentControlSet\\Services\\<Name>", color:C.green, detail:"Service registration: ImagePath (binary path), Start type (2=Auto,3=Manual,4=Disabled), Type (0x10=own process, 0x20=shared svchost), ObjectName (account to run as), Description, FailureActions." },
    { id:"02", label:"SCM reads service database", sub:"services.exe startup — HKLM\\...\\Services enumeration", color:C.yellow, detail:"SCM builds in-memory service table at boot. Reads all keys under Services hive. Creates service records with dependency graph for ordered startup." },
    { id:"03", label:"Dependency resolution", sub:"DependOnService / DependOnGroup ordering", color:C.cyan, detail:"SCM builds directed graph. e.g. W32Time depends on RpcSs → RpcSs starts first. Group dependencies (e.g. TDI group) resolved before individual services." },
    { id:"04", label:"CreateProcess for service binary", sub:"services.exe calls CreateProcessAsUser()", color:C.purple, detail:"SCM creates process with configured token (LocalSystem / LocalService / NetworkService / custom user). Service binary loads and calls StartServiceCtrlDispatcher()." },
    { id:"05", label:"ServiceMain() registered", sub:"StartServiceCtrlDispatcher → SCM handshake", color:C.orange, detail:"Service binary calls StartServiceCtrlDispatcher() with table of ServiceMain functions. SCM gets named pipe connection. Service officially registered." },
    { id:"06", label:"SERVICE_CONTROL_START dispatched", sub:"HandlerEx() function receives control code", color:C.teal, detail:"SCM sends START control via named pipe. Service's HandlerEx() processes it. Service sets status to SERVICE_START_PENDING, then SERVICE_RUNNING when ready." },
    { id:"07", label:"Service runs — heartbeat via SCM", sub:"SetServiceStatus() periodic updates", color:C.green, detail:"Service periodically calls SetServiceStatus() with checkpoint increments to signal progress. SCM uses this to detect hung services (ServicesPipeTimeout = 60s default)." },
    { id:"08", label:"Stop / failure actions", sub:"SERVICE_CONTROL_STOP or crash recovery", color:C.red, detail:"On STOP: HandlerEx processes STOP → SERVICE_STOP_PENDING → clean shutdown. On crash: SCM applies FailureActions (Restart, Run program, Reboot). SC_ACTION_RESTART retries up to 3 times." },
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

/* ── Svchost Groups ───────────────────────────────────────────────────── */
const SvchostTable = () => {
  const groups = [
    ["-k netsvcs", "SYSTEM", "BITS, EventLog, Schedule (Task Scheduler), Themes, WSearch, WUpdate, WinRM, SessionEnv", C.cyan],
    ["-k LocalSystemNetworkRestricted", "SYSTEM", "NlaSvc (Network Location Awareness), RpcSs, DcomLaunch, TermService (RDP)", C.teal],
    ["-k LocalService", "LOCAL SERVICE", "Dnscache, EventSystem, SSDP, upnphost, bthserv, lmhosts, nsi", C.green],
    ["-k LocalServiceNetworkRestricted", "LOCAL SERVICE", "AudioSrv, hidserv, WdiServiceHost", C.lime],
    ["-k NetworkService", "NETWORK SERVICE", "CryptSvc, Dhcp, lanmanworkstation (SMB client), NtpClient, W32tm", C.sky],
    ["-k DcomLaunch", "SYSTEM", "DcomLaunch (DCOM activation), PlugPlay (PnP), Power", C.yellow],
    ["-k GPSvcGroup", "SYSTEM", "gpsvc (Group Policy Client) — reads/applies GPOs, registry settings", C.purple],
    ["-k imgsvc", "LOCAL SERVICE", "StiSvc (Windows Image Acquisition — scanner/camera support)", C.dim],
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "180px 130px 1fr", gap: "1px", background: C.border, borderRadius: "4px", overflow: "hidden" }}>
        {["GROUP KEY (-k)", "RUNS AS", "HOSTED SERVICES (selection)"].map(h => (
          <div key={h} style={{ background: C.header, padding: "7px 10px" }}>
            <span style={{ color: C.dim, fontWeight: "700", fontSize: "10px" }}>{h}</span>
          </div>
        ))}
        {groups.map(([grp, acct, svcs, c], i) => (
          <>
            <div key={grp+"g"} style={{ background: i % 2 === 0 ? "#08090d" : C.panel, padding: "7px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{grp}</span>
            </div>
            <div key={grp+"a"} style={{ background: i % 2 === 0 ? "#08090d" : C.panel, padding: "7px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={S.badge(c)}>{acct}</span>
            </div>
            <div key={grp+"s"} style={{ background: i % 2 === 0 ? "#08090d" : C.panel, padding: "7px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: C.dim, fontSize: "10.5px" }}>{svcs}</span>
            </div>
          </>
        ))}
      </div>
      <div style={{ marginTop: "10px", color: C.dim, fontSize: "11px" }}>
        <strong style={{ color: C.orange }}>Security note:</strong> SYSTEM-account svchost groups are high-value targets. Malware masquerades as svchost.exe — validate by checking parent (must be services.exe) and registered service group via <code style={{color:C.cyan}}>tasklist /svc /fi "PID eq &lt;pid&gt;"</code>. A svchost with no registered services = suspicious.
      </div>
    </div>
  );
};

/* ── Driver Security Techniques ───────────────────────────────────────── */
const DriverSecPanel = ({ tab }) => {
  const data = {
    byovd: [
      { name: "BYOVD — Bring Your Own Vulnerable Driver", color: C.red,
        desc: "Attacker loads a legitimate, signed (WHQL) kernel driver that contains an exploitable vulnerability. Since it's signed, it bypasses driver signing enforcement and Secure Boot.",
        steps: ["Obtain or download known-vulnerable signed driver (e.g. RTCore64.sys, gdrv.sys, DBUtil_2_3.sys)", "Load driver via sc create + sc start (requires admin, not SYSTEM)", "Exploit driver's IOCTL interface to achieve arbitrary kernel read/write", "Use kernel R/W to: disable EDR callbacks, elevate token, disable PPL, patch Kernel Patch Guard","Attacker now has full kernel control with no unsigned code"],
        detect: "Sysmon Event 6 (driver loaded). Microsoft HVCI vulnerable driver blocklist. Defender periodic driver hash scanning.", ioc: "Sysmon Event 6 showing driver from non-standard path. Hash matches known-vulnerable driver DB (loldrivers.io)." },
      { name: "Unsigned Driver Load (Test Signing / Debug Mode)", color: C.orange,
        desc: "In developer/test environments, bcdedit /set testsigning on or kernel debug mode allows loading unsigned drivers. Attackers enable this to load custom malicious kernel code.",
        steps: ["Enable test signing: bcdedit /set testsigning on (requires admin)", "Alternatively: attach kernel debugger (WinDbg) → automatic unsigned driver load permission", "Load arbitrary kernel driver → full Ring 0 access", "Modern mitigation: Secure Boot prevents TestSigning flag from persisting across reboot"],
        detect: "Sysmon Event 6 unsigned driver alert. bcdedit output check: testsigning should be Off. Secure Boot status in UEFI.", ioc: "BCD entry TestSigning=Yes. Unsigned driver in Sysmon Event 6. Kernel debugger attached (Event 4 in System log)." },
    ],
    rootkit: [
      { name: "DKOM — Direct Kernel Object Manipulation", color: C.purple,
        desc: "Kernel-level rootkit technique: directly write to kernel structures to hide processes, drivers, network connections, or registry keys from user-mode enumeration.",
        steps: ["Gain kernel code execution (via BYOVD or kernel exploit)", "Locate EPROCESS for target process in memory", "Unlink EPROCESS from ActiveProcessLinks doubly-linked list", "Process invisible to tasklist / Get-Process / Task Manager", "Also: remove DRIVER_OBJECT from PsLoadedModuleList to hide driver module"],
        detect: "Cross-view detection: pslist (walks EPROCESS list) vs psscan (scans physical memory for POOL_HEADER 'Proc'). Delta = hidden processes. Volatility malfind.", ioc: "EPROCESS found by pool scan but absent from linked list. Missing entries in PsLoadedModuleList vs physical memory scan." },
      { name: "SSDT Hooking (Shadow SSDT)", color: C.pink,
        desc: "System Service Descriptor Table maps syscall numbers to kernel function pointers. Rootkits overwrite SSDT entries to intercept syscalls and lie to user-mode.",
        steps: ["Map SSDT address (ntoskrnl export or hardcoded offset)", "Disable write protection: clear CR0.WP bit (or use MDL mapping)", "Overwrite SSDT[NtQuerySystemInformation] with rootkit handler", "Rootkit handler filters process list before returning to caller", "KPP (Kernel Patch Guard) detects and BSODs within 5–10 minutes"],
        detect: "Volatility windows.ssdt.SSDT — compares live SSDT to expected ntoskrnl exports. Any hook is an IOC. KPP detection causes automatic BSOD.", ioc: "SSDT entry pointing outside ntoskrnl.exe or win32k.sys address range. KPP BSOD 0x109 (CRITICAL_STRUCTURE_CORRUPTION)." },
      { name: "Minifilter Driver Manipulation", color: C.red,
        desc: "EDR/AV products register as file system minifilter drivers at specific altitudes. Rootkits deregister them, corrupt their callbacks, or register at higher altitude to intercept first.",
        steps: ["Enumerate registered minifilters: FltEnumerateFilters()", "Identify EDR filter (e.g. altitude 328010 = Windows Defender)", "Call FltUnregisterFilter() or corrupt CALLBACK_NODE structures in kernel", "EDR loses filesystem visibility — file creates/deletes/reads no longer monitored", "Or: register malicious filter at higher altitude (lower number) to intercept first"],
        detect: "Kernel Patch Guard protects some callback structures. ETW ThreatIntelligence provider. Periodic filter enumeration check from user-mode.", ioc: "FltMgr filter list missing expected EDR filter. Unexpected altitude registration. KPP BSOD if protected structures tampered." },
    ],
    defense: [
      { name: "HVCI + WDAC Driver Allowlist", color: C.green,
        desc: "Hypervisor-Protected Code Integrity + Windows Defender Application Control policy for drivers. Only WHQL-signed drivers on allowlist can load. Blocks BYOVD completely.",
        steps: ["Enable VBS in UEFI (VT-x + IOMMU + UEFI Secure Boot required)", "HVCI enforces all kernel code must be signed before execution", "WDAC driver policy restricts to approved driver list (not just any WHQL signed)", "Microsoft HVCI blocklist + LOLDrivers.io for known-vulnerable driver hashes", "Result: even if attacker has admin, cannot load unsigned or vulnerable drivers"],
        detect: "msinfo32 → Device Guard VBS status = Running. Get-WmiObject Win32_DeviceGuard.", ioc: "Legitimate system: SecurityServicesRunning includes HypervisorEnforcedCodeIntegrity (2)." },
      { name: "Kernel Patch Guard (KPP)", color: C.cyan,
        desc: "Microsoft's integrity monitoring for critical kernel structures: SSDT, IDT, GDT, MSRs, callback tables. Runs periodic checks from random timer. Mismatch = BSOD 0x109.",
        steps: ["KPP initialised during boot with encrypted verification data", "Random-interval timer fires (5–10 min typical)", "KPP decrypts and verifies critical structures against baseline", "Any tampering (SSDT hook, IDT modification, callback removal) → BUGCHECK_CRITICAL_STRUCTURE_CORRUPTION", "KPP itself obfuscated and encrypted to prevent rootkit disabling"],
        detect: "BSOD 0x109 on a production machine = active rootkit detected. Minidump analysis reveals which structure was corrupted.", ioc: "BSOD 0x109 with Parameter1 indicating tampered structure type." },
    ]
  };
  const items = data[tab] || [];
  return (
    <div>
      {items.map(item => (
        <div key={item.name} style={{ background: "#08090d", border: `1px solid ${item.color}33`, borderRadius: "5px", padding: "14px", marginBottom: "12px" }}>
          <div style={{ color: item.color, fontWeight: "800", fontSize: "13px", marginBottom: "6px" }}>{item.name}</div>
          <div style={{ color: C.dim, fontSize: "11px", marginBottom: "10px", borderLeft: `2px solid ${item.color}44`, paddingLeft: "10px" }}>{item.desc}</div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: item.color, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ STEPS / HOW IT WORKS</div>
              {item.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
                  <span style={{ color: item.color, fontSize: "10px", minWidth: "16px", fontWeight: "700" }}>{i + 1}.</span>
                  <span style={{ color: C.dim, fontSize: "11px" }}>{s}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ DETECTION</div>
              <div style={{ background: "#08120a", border: `1px solid ${C.green}22`, borderRadius: "3px", padding: "8px", marginBottom: "8px" }}>
                <div style={{ color: C.dim, fontSize: "11px" }}>{item.detect}</div>
              </div>
              {item.ioc && <>
                <div style={{ color: C.red, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ IOC SIGNATURE</div>
                <div style={{ background: "#120808", border: `1px solid ${C.red}22`, borderRadius: "3px", padding: "8px" }}>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{item.ioc}</div>
                </div>
              </>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WindowsStep06() {
  const [archTab, setArchTab] = useState("services");
  const [intTab,  setIntTab]  = useState("svchost");
  const [secTab,  setSecTab]  = useState("byovd");
  const [monTab,  setMonTab]  = useState("events");
  const [cmpTab,  setCmpTab]  = useState("model");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.gold, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 06 · SERVICE & DRIVER ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.gold), background: "linear-gradient(135deg, #090b16 55%, #1a1000)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 06</div>
                <div style={{ color: C.gold, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Services & Drivers</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>SCM Internals · svchost Architecture · WDM Driver Stack · BYOVD · Rootkits · Driver Security</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The persistent infrastructure of Windows — and the deepest attack surface in the OS</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → EXPERT</Pill>
                <Pill c={C.gold}>DOMAIN: OS INTERNALS / KERNEL / RED-BLUE</Pill>
                <Pill c={C.purple}>MODULE 06 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["SysAdmin","Red Team","Blue Team","DFIR","Kernel Dev","Driver Dev","Malware Analyst","EDR Engineer","Auditor"].map(r => (
                <Tag key={r} c={C.gold}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}>A <strong style={{color:C.bright}}>Windows Service</strong> is a long-running background program managed by the <strong style={{color:C.bright}}>Service Control Manager (SCM)</strong>. Like a Unix daemon — starts on boot, runs without a user logged in, no window or UI.</Row>
              <Row c={C.green}>Services run under specific accounts: <strong style={{color:C.bright}}>LocalSystem</strong> (most powerful — almost like SYSTEM), <strong style={{color:C.bright}}>LocalService</strong> (reduced privileges, local-only), <strong style={{color:C.bright}}>NetworkService</strong> (reduced + network identity), or a custom user account.</Row>
              <Row c={C.green}>A <strong style={{color:C.bright}}>driver</strong> is a kernel-mode program (Ring 0) that lets Windows talk to hardware — or extends kernel functionality. Your NIC, disk controller, keyboard, GPU all have drivers. So do antivirus engines, VPN clients, and monitoring tools.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>svchost.exe</strong> is a shared host process — dozens of services run inside a single svchost to save memory. Each group (netsvcs, LocalService, etc.) maps to a DLL-based service implementation.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>SCM (<strong style={{color:C.bright}}>services.exe</strong>) reads the service database from <strong style={{color:C.bright}}>HKLM\SYSTEM\CurrentControlSet\Services</strong> at boot. Each key = one service or driver with: ImagePath, Start, Type, ObjectName, FailureActions.</Row>
              <Row c={C.purple}>The <strong style={{color:C.bright}}>WDM (Windows Driver Model)</strong> defines how kernel drivers are structured. Each driver creates Device Objects, registers dispatch routines (IRP handlers), and chains into I/O stacks. IRPs (I/O Request Packets) flow down and complete back up the stack.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>MiniFilter drivers</strong> (via fltmgr.sys) intercept file system operations at defined altitudes. EDRs register as minifilters to watch every file create/read/write/delete. Rootkits target minifilter callbacks to blind EDRs.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Driver signing enforcement</strong>: on 64-bit Windows, all kernel drivers must be signed. HVCI raises the bar — only WHQL-approved drivers. BYOVD exploits legitimate signed drivers with vulnerabilities to reach kernel code exec.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["services.exe = process parent", "All auto-start service processes are children of services.exe. Verify PPID to detect service masquerading.", C.yellow],
              ["svchost = shared host", "One svchost can host 10+ services. Each group isolated by token and restricted network access. Compromise one service = compromise group.", C.cyan],
              ["drivers = Ring 0", "Every kernel driver runs with full hardware access. A driver bug = potential SYSTEM exploit. A malicious driver = full OS compromise.", C.red],
              ["BYOVD = escalation path", "Bring Your Own Vulnerable Driver: load legit signed driver with known kernel bug → exploit → disable EDR or elevate privileges.", C.orange],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture ── */}
        <PB title="ARCHITECTURE DIAGRAMS — SERVICE STACK · DRIVER I/O STACK" icon="🗜" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["services","SERVICE ARCHITECTURE"],["drivers","WDM DRIVER I/O STACK"],["types","SERVICE START TYPES"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "services" && <ServiceArch />}
          {archTab === "drivers"  && <DriverStackDiagram />}
          {archTab === "types"    && <StartTypeTable />}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — SERVICE LIFECYCLE INTERNAL CHAIN" icon="⚙" color={C.orange}>
          <ServiceFlow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Forensic note:</strong> FailureActions in the service registry key define what SCM does on crash — restart, run a program, or reboot. Malware often sets FailureActions to <strong style={{color:C.bright}}>re-execute itself</strong> on crash, ensuring persistence even after partial cleanup.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL / SC.EXE — SERVICE & DRIVER OPERATIONS" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SERVICE ENUMERATION & MANAGEMENT</div>
              <div style={S.code}>
{`# List all services + status + binary path:`}
{`PS> Get-Service | Select Name,Status,StartType`}
{`PS> Get-WmiObject Win32_Service | `}
{`    Select Name,State,StartMode,PathName,`}
{`    StartName,ProcessId`}
{``}
{`# Services running as SYSTEM (high value targets):`}
{`PS> Get-WmiObject Win32_Service | `}
{`    Where {$_.StartName -eq "LocalSystem"} |`}
{`    Select Name,PathName,State`}
{``}
{`# Find services with unquoted paths (vuln):`}
{`PS> Get-WmiObject Win32_Service | `}
{`    Where {$_.PathName -notmatch '"' `}
{`        -and $_.PathName -match ' '} |`}
{`    Select Name,PathName`}
{``}
{`# Service binary path from registry:`}
{`reg query HKLM\\SYSTEM\\CurrentControlSet\\Services`}
{`         \\EventLog /v ImagePath`}
{``}
{`# Create / start / stop service:`}
{`sc create MySvc binPath="C:\\svc.exe" start=auto`}
{`sc start MySvc`}
{`sc stop MySvc`}
{`sc delete MySvc`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DRIVER ENUMERATION & ANALYSIS</div>
              <div style={S.code}>
{`# List all loaded drivers:`}
{`PS> Get-WmiObject Win32_SystemDriver |`}
{`    Select Name,State,StartMode,PathName |`}
{`    Sort-Object Name`}
{``}
{`# List using driverquery:`}
{`C:\\> driverquery /fo list /v`}
{``}
{`# Check driver signatures:`}
{`PS> Get-WmiObject Win32_SystemDriver |`}
{`    ForEach-Object {`}
{`      $sig = Get-AuthenticodeSignature $_.PathName`}
{`      [PSCustomObject]@{`}
{`        Name=$_.Name`}
{`        Signed=$sig.Status`}
{`        Signer=$sig.SignerCertificate.Subject`}
{`      }`}
{`    }`}
{``}
{`# Inspect minifilter altitudes:`}
{`fltmc instances`}
{`fltmc filters`}
{``}
{`# WinDbg: list all drivers in kernel:`}
{`lm m *          ; list all loaded modules`}
{`!drivers        ; show driver objects`}
{`!drvobj <name>  ; dump DRIVER_OBJECT struct`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SERVICE SECURITY AUDIT COMMANDS</div>
            <div style={S.code}>
{`# Check service ACLs (who can start/stop/configure):`}
{`C:\\> sc sdshow <ServiceName>`}
{`# Output is SDDL: D:(A;;CCLCSWRPWPDTLOCRRC;;;SY)...`}
{`# Convert to readable with PowerShell:`}
{`PS> $sddl = (sc.exe sdshow Spooler) -join ""`}
{`PS> ConvertFrom-SddlString $sddl | Select -ExpandProperty DiscretionaryAcl`}
{``}
{`# Find world-writable service binary directories:`}
{`PS> Get-WmiObject Win32_Service | ForEach {`}
{`    $path = ($_.PathName -replace '"','') -replace ' .*',''`}
{`    $dir  = Split-Path $path -Parent`}
{`    $acl  = Get-Acl $dir -EA 0`}
{`    $acl.Access | Where {`}
{`      $_.IdentityReference -match "Users|Everyone"`}
{`      -and $_.FileSystemRights -match "Write|FullControl"`}
{`    } | Select @{N="Service";E={$_.Name}}, @{N="Dir";E={$dir}}`}
{`}`}
{``}
{`# Autoruns — most thorough service/driver persistence review:`}
{`autorunsc.exe -a d -c -h -s  ; drivers`}
{`autorunsc.exe -a s -c -h -s  ; services`}
{`# -h = show file hashes, -s = verify signatures, -c = CSV output`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — SVCHOST · DRIVER OBJECTS · IRP" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["svchost","SVCHOST GROUPS"],["driverobj","DRIVER_OBJECT STRUCT"],["irp","IRP STRUCTURE"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>

          {intTab === "svchost" && <SvchostTable />}

          {intTab === "driverobj" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DRIVER_OBJECT — kernel struct per driver</div>
                <div style={S.code}>
{`_DRIVER_OBJECT fields:`}
{`  Type            SHORT   = 4 (driver object type)`}
{`  Size            SHORT   = sizeof(_DRIVER_OBJECT)`}
{`  DeviceObject    PDEVICE_OBJECT → linked list of`}
{`                  all Device Objects this driver owns`}
{`  Flags           ULONG   DRVO_BUILT_IN_DRIVER etc.`}
{`  DriverStart     PVOID   → base VA of driver image`}
{`  DriverSize      ULONG   image size in bytes`}
{`  DriverSection   PLDR_DATA_TABLE_ENTRY → module list`}
{`  DriverExtension PDRIVER_EXTENSION → driver context`}
{`  DriverName      UNICODE_STRING → "\\Driver\\disk"`}
{`  HardwareDatabase PUNICODE_STRING`}
{`  FastIoDispatch  PFAST_IO_DISPATCH → fast I/O table`}
{`  DriverInit      PDRIVER_INITIALIZE → DriverEntry()`}
{`  DriverStartIo   PDRIVER_STARTIO`}
{`  DriverUnload    PDRIVER_UNLOAD → cleanup routine`}
{`  MajorFunction   PDRIVER_DISPATCH[IRP_MJ_MAXIMUM]`}
{`    [0]  IRP_MJ_CREATE           → CreateFile`}
{`    [2]  IRP_MJ_CLOSE            → CloseHandle`}
{`    [3]  IRP_MJ_READ             → ReadFile`}
{`    [4]  IRP_MJ_WRITE            → WriteFile`}
{`    [14] IRP_MJ_DEVICE_CONTROL   → DeviceIoControl`}
{`    [27] IRP_MJ_MAXIMUM_FUNCTION`}
                </div>
              </div>
              <div>
                <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DEVICE_OBJECT — kernel struct per device</div>
                <div style={S.code}>
{`_DEVICE_OBJECT fields:`}
{`  Type            SHORT   = 3 (device object)`}
{`  Size            USHORT`}
{`  ReferenceCount  LONG    open handle count`}
{`  DriverObject    PDRIVER_OBJECT → owning driver`}
{`  NextDevice      PDEVICE_OBJECT → linked list`}
{`  AttachedDevice  PDEVICE_OBJECT → upper filter`}
{`  CurrentIrp      PIRP    → IRP being processed`}
{`  DeviceType      ULONG   FILE_DEVICE_DISK etc.`}
{`  Characteristics ULONG   FILE_DEVICE_SECURE_OPEN`}
{`  Flags           ULONG   DO_BUFFERED_IO etc.`}
{`  DeviceExtension PVOID   → driver-defined context`}
{`  StackSize       CHAR    → I/O stack depth`}
{``}
{`# WinDbg: enumerate device objects for a driver`}
{`!devobj \\Driver\\disk`}
{`dt nt!_DEVICE_OBJECT <address>`}
{``}
{`# List all device names (user-visible symlinks):`}
{`# \\Device\\HarddiskVolume3 → C:`}
{`# \\Device\\Tcp → tcpip.sys TCP stack`}
                </div>
              </div>
            </div>
          )}

          {intTab === "irp" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ IRP — I/O REQUEST PACKET</div>
                <div style={S.code}>
{`_IRP (I/O Request Packet):`}
{`  Type          SHORT   = 6 (IRP)`}
{`  Size          USHORT  total IRP size`}
{`  MdlAddress    PMDL    → memory descriptor list`}
{`                        (for direct I/O)`}
{`  Flags         ULONG   IRP_NOCACHE, IRP_PAGING_IO..`}
{`  AssociatedIrp union:`}
{`    SystemBuffer  PVOID → buffered I/O data`}
{`    MasterIrp     PIRP  → for associated IRPs`}
{`  IoStatus      IO_STATUS_BLOCK:`}
{`    Status      NTSTATUS  completion status`}
{`    Information ULONG_PTR bytes transferred`}
{`  RequestorMode KPROCESSOR_MODE KernelMode/UserMode`}
{`  Cancel        BOOLEAN  IRP cancelled?`}
{`  CancelRoutine PDRIVER_CANCEL → cancel callback`}
{`  UserBuffer    PVOID → direct user-mode buffer`}
{`  Tail.Overlay.CurrentStackLocation → IO_STACK_LOCATION`}
{``}
{`IO_STACK_LOCATION (per driver in stack):`}
{`  MajorFunction UCHAR  IRP_MJ_READ etc.`}
{`  Parameters    union  (read/write/ioctl params)`}
{`  DeviceObject  PDEVICE_OBJECT`}
{`  FileObject    PFILE_OBJECT`}
{`  CompletionRoutine → callback when done`}
                </div>
              </div>
              <div>
                <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ IRP FLOW EXAMPLE — ReadFile()</div>
                {[
                  ["User calls ReadFile(handle, buf, len)", "kernel32 → NtReadFile() syscall", C.green],
                  ["I/O Manager creates IRP_MJ_READ", "Allocates IRP + IO_STACK_LOCATION per stack driver", C.cyan],
                  ["IRP dispatched to top-level driver", "File System (NTFS) receives IRP first", C.purple],
                  ["NTFS processes file semantics", "Checks cache, resolves clusters, may send sub-IRP to storage", C.orange],
                  ["Minifilter callbacks fire", "Pre-read callback in EDR: can modify, block, or redirect IRP", C.teal],
                  ["Storage driver handles hardware I/O", "storport → miniport → NVMe/AHCI command issued", C.yellow],
                  ["Completion routine fires upward", "Each driver's completion routine called as IRP completes", C.green],
                  ["IoCompleteRequest() to I/O Manager", "Status + bytes returned to caller. User buffer filled.", C.cyan],
                ].map(([act, det, c], i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ color: c, fontSize: "10px", minWidth: "16px", fontWeight: "700" }}>{i + 1}.</span>
                    <div>
                      <div style={{ color: c, fontSize: "11px", fontWeight: "600" }}>{act}</div>
                      <div style={{ color: C.dim, fontSize: "10.5px" }}>{det}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PB>

        {/* ── 7: Driver Security ── */}
        <PB title="DRIVER & SERVICE SECURITY — BYOVD · ROOTKITS · DEFENSES" icon="🛡" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["byovd","BYOVD & UNSIGNED DRIVERS"],["rootkit","ROOTKIT TECHNIQUES"],["defense","KERNEL DEFENSES"]].map(([t, l]) => (
              <button key={t} style={S.tab(secTab === t, C.red)} onClick={() => setSecTab(t)}>{l}</button>
            ))}
          </div>
          <DriverSecPanel tab={secTab} />
        </PB>

        {/* ── 8: Service Abuse ── */}
        <PB title="SERVICE ABUSE — PERSISTENCE · ESCALATION · LATERAL MOVEMENT" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SERVICE-BASED ATTACKS</div>
              {[
                ["Service Binary Replacement", "Attacker replaces service binary with malicious PE. SCM restarts service → malicious binary runs as SYSTEM. Requires write access to service directory.", C.red],
                ["Unquoted Service Path", "Service ImagePath: C:\\Program Files\\Evil App\\svc.exe. Windows tries C:\\Program.exe → C:\\Program Files\\Evil.exe first. Plant malicious binary at ambiguous path.", C.orange],
                ["Service ACL Misconfiguration", "SERVICE_ALL_ACCESS or SERVICE_CHANGE_CONFIG granted to non-admin users. sc config <svc> binPath=C:\\evil.exe → next restart = code exec as SYSTEM.", C.yellow],
                ["Service DLL Injection (svchost)", "Services hosted in svchost load a DLL specified in HKLM\\..\\Services\\<name>\\Parameters\\ServiceDll. Overwrite this value to load malicious DLL.", C.purple],
                ["Malicious Service Registration", "Register new service pointing to payload. Requires admin but persists across reboots. sc create + Start=Auto = guaranteed execution on every boot.", C.red],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#120808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
                  <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION & HARDENING</div>
              {[
                ["Monitor service creation (Event 7045)", "Any new service installed triggers Event 7045 in System log. Alert on services with paths outside System32/Program Files.", C.green],
                ["Audit service binary directories", "All service binary paths should have restricted write ACLs. Script weekly audit of service path write permissions.", C.cyan],
                ["Quote all service paths", "Use icacls or sc.exe to ensure ImagePath values are quoted: 'C:\\Program Files\\App\\svc.exe'. Group Policy: verify via Autoruns output.", C.green],
                ["Restrict Service ACLs", "Default service DACLs often overly permissive. Use sc sdset to restrict SERVICE_CHANGE_CONFIG to SYSTEM/Administrators only.", C.cyan],
                ["Monitor ServiceDll registry changes", "Sysmon Event 13 (Registry Value Set) on HKLM\\..\\Services\\*\\Parameters\\ServiceDll. Any change = suspicious.", C.orange],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>✓ {t}</div>
                  <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ RED TEAM SERVICE PLAYBOOK</div>
            <div style={S.code}>
{`# === ENUM — find exploitable service configs ===`}
{`# Unquoted paths:`}
{`wmic service get name,pathname,startmode | `}
{`    findstr /i "auto" | findstr /iv '"' | findstr /iv "C:\\Windows"`}
{``}
{`# Weak ACLs on service binary dir:`}
{`accesschk.exe -uvqc * -w  ; world-writable services`}
{`accesschk.exe -duvw "C:\\Program Files" ; dir write check`}
{``}
{`# Weak SERVICE_CHANGE_CONFIG ACL:`}
{`accesschk.exe -uwcv Everyone *  ; services Everyone can config`}
{``}
{`# === EXPLOIT — misconfigured service ===`}
{`# Change binary path (if SERVICE_CHANGE_CONFIG granted):`}
{`sc config <vuln_svc> binPath= "cmd /c net user hacker P@ss /add"`}
{`sc start <vuln_svc>  ; executes cmd as SYSTEM`}
{``}
{`# Malicious service for persistence:`}
{`sc create PersistSvc binPath="C:\\Windows\\Temp\\beacon.exe" `}
{`         start=auto obj=LocalSystem`}
{`sc failure PersistSvc reset=86400 actions=restart/5000`}
{`# ↑ FailureActions: restart after 5 seconds on crash → resilient`}
{``}
{`# ServiceDll injection (svchost service):`}
{`reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\SomeSvc\\Parameters"`}
{`    /v ServiceDll /t REG_EXPAND_SZ /d "C:\\evil.dll" /f`}
            </div>
          </div>
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING — EVENTS · SYSMON · DRIVER TELEMETRY" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","sysmon","tools","iocs"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div>
              <div style={S.grid2}>
                {[
                  ["7045", "System", "New service installed. Name, binary path, start type, account. HIGH PRIORITY alert.", C.red],
                  ["7034", "System", "Service crashed unexpectedly. Crash count tracks FailureActions retries.", C.orange],
                  ["7036", "System", "Service state changed (started/stopped). Volume is high — filter to critical services.", C.dim],
                  ["7040", "System", "Service start type changed. e.g. Disabled→Automatic. Persistence indicator.", C.orange],
                  ["4697", "Security", "Service installed (same as 7045 but from Security log if audit enabled). Includes token info.", C.red],
                  ["6", "Sysmon", "Driver loaded: path, hash, signature. Critical for BYOVD detection.", C.red],
                  ["4", "System", "Kernel debugger connected. TestSigning mode implied. Immediate alert.", C.red],
                  ["1102","Security","Audit log cleared. Often precedes/follows service/driver-based attack.", C.red],
                ].map(([id, log, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0 }}>
                      <span style={{ ...S.badge(c), minWidth: "38px", textAlign: "center" }}>{id}</span>
                      <span style={{ color: C.dim, fontSize: "9px", textAlign: "center" }}>{log}</span>
                    </div>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={S.code}>
{`# Alert on new service (Event 7045):`}
{`Get-WinEvent -LogName System | Where {$_.Id -eq 7045} |`}
{`  Select TimeCreated,`}
{`    @{N="ServiceName";E={$_.Properties[0].Value}},`}
{`    @{N="ImagePath";E={$_.Properties[1].Value}},`}
{`    @{N="StartType";E={$_.Properties[2].Value}},`}
{`    @{N="Account";E={$_.Properties[4].Value}}`}
{``}
{`# Alert on service path outside System32/ProgramFiles:`}
{`# SIEM rule: Event 7045 where ImagePath not match`}
{`# "C:\\Windows\\System32" OR "C:\\Program Files"`}
                </div>
              </div>
            </div>
          )}

          {monTab === "sysmon" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON DRIVER & SERVICE RULES</div>
              <div style={S.code}>
{`<!-- Event 6: Driver load — catch BYOVD -->`}
{`<DriverLoad onmatch="include">`}
{`  <!-- Alert on unsigned drivers -->`}
{`  <Signed condition="is">false</Signed>`}
{`</DriverLoad>`}
{``}
{`<!-- Alert on drivers outside System32/Drivers -->`}
{`<DriverLoad onmatch="include">`}
{`  <ImageLoaded condition="not contains">Windows\\System32\\drivers</ImageLoaded>`}
{`  <ImageLoaded condition="not contains">Windows\\SysWOW64\\drivers</ImageLoaded>`}
{`</DriverLoad>`}
{``}
{`<!-- Event 13: ServiceDll registry change -->`}
{`<RegistryEvent onmatch="include">`}
{`  <TargetObject condition="contains">ServiceDll</TargetObject>`}
{`</RegistryEvent>`}
{``}
{`<!-- Event 1: Suspicious service process creation -->`}
{`<!-- svchost without -k flag is suspicious -->`}
{`<ProcessCreate onmatch="include">`}
{`  <Image condition="end with">svchost.exe</Image>`}
{`  <CommandLine condition="not contains">-k </CommandLine>`}
{`</ProcessCreate>`}
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["Autoruns (Sysinternals)", "autorunsc.exe -a s,d -h -s", "Gold standard for service/driver persistence. Lists every autostart location with signature verification and VirusTotal hash check. CSV output for SIEM.", C.cyan],
                ["sc.exe + sc sdshow", "sc query type=all state=all", "Built-in service control tool. sdshow reveals service ACLs in SDDL format. Quick triage for misconfigured service permissions.", C.green],
                ["Accesschk (Sysinternals)", "accesschk.exe -uwcv Everyone *", "Audit service ACLs. Finds services any user can modify (SERVICE_CHANGE_CONFIG). Critical for privilege escalation recon.", C.orange],
                ["LOLDrivers.io", "API / hash check", "Community database of known-vulnerable signed drivers used in BYOVD attacks. Cross-reference loaded driver hashes against this DB.", C.red],
                ["WinDbg + !drivers", "!drivers / lm m *", "Kernel-level driver enumeration. Finds hidden drivers not in PsLoadedModuleList. Essential for rootkit analysis.", C.purple],
                ["fltmc.exe", "fltmc instances / filters", "List registered minifilter drivers and their altitudes. Verify EDR minifilter is present. Detect altitude registration anomalies.", C.teal],
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
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SERVICE & DRIVER IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["New service with path outside Windows/ProgramFiles", "Event 7045 ImagePath in %TEMP%, %APPDATA%, C:\\Users\\Public. High fidelity persistence IOC.", C.red],
                  ["svchost.exe without -k argument", "Legitimate svchost always has -k <group>. Malware masquerades without it. Event 4688 + Sysmon Event 1 cmdline check.", C.red],
                  ["svchost.exe parent ≠ services.exe", "All legitimate svchost instances have services.exe (PID ~560) as parent. Any other parent = injection or masquerading.", C.red],
                  ["Unsigned driver load (Sysmon Event 6)", "Any unsigned or self-signed driver on production system. Cross-reference hash against LOLDrivers.io.", C.orange],
                  ["Driver in non-standard path", "Legitimate drivers in C:\\Windows\\System32\\drivers. Driver in %TEMP%, %APPDATA%, or user-writable path = highly suspicious.", C.orange],
                  ["fltmc filter list missing EDR filter", "If Defender / CrowdStrike / SentinelOne filter absent from fltmc output = minifilter was unregistered (rootkit activity).", C.red],
                  ["Service FailureActions re-exec payload", "Event 7034 (crash) followed by immediate Event 7036 (start) repeatedly. FailureActions set to restart malicious service.", C.orange],
                  ["BSOD 0x109 CRITICAL_STRUCTURE_CORRUPTION", "Kernel Patch Guard detected tampering. Active rootkit attempted SSDT/IDT/callback modification. Immediate forensic priority.", C.red],
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
        <PB title="WINDOWS SERVICES vs LINUX DAEMONS — COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["model","drivers","security","persistence"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#00101a", border: `1px solid ${C.cyan}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.cyan, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS</div>
              {cmpTab === "model" && <>
                <KV k="Service manager" v="services.exe (SCM) — central, single manager" kc={C.cyan} />
                <KV k="Config store" v="HKLM\\SYSTEM\\CurrentControlSet\\Services (registry)" kc={C.cyan} />
                <KV k="Service accounts" v="LocalSystem, LocalService, NetworkService, custom" kc={C.cyan} />
                <KV k="Shared hosting" v="svchost.exe — multiple services per process (-k group)" kc={C.cyan} />
                <KV k="Failure actions" v="Restart / Run Program / Reboot (SCM-managed)" kc={C.cyan} />
                <KV k="Dependencies" v="DependOnService / DependOnGroup in registry" kc={C.cyan} />
              </>}
              {cmpTab === "drivers" && <>
                <KV k="Driver model" v="WDM (Windows Driver Model) / KMDF / UMDF" kc={C.cyan} />
                <KV k="I/O model" v="IRP-based stack (Device Objects + dispatch table)" kc={C.cyan} />
                <KV k="File system filter" v="MiniFilter framework (fltmgr.sys) + altitude" kc={C.cyan} />
                <KV k="Driver signing" v="WHQL required on 64-bit. HVCI = WHQL + allowlist." kc={C.cyan} />
                <KV k="Driver dev kit" v="WDK (Windows Driver Kit) + Visual Studio" kc={C.cyan} />
                <KV k="Crash impact" v="Driver bug → BSOD (system crash)" kc={C.cyan} />
              </>}
              {cmpTab === "security" && <>
                <KV k="Service sandbox" v="MIC integrity levels + token restriction per service" kc={C.cyan} />
                <KV k="Driver enforcement" v="KPP (Kernel Patch Guard) + HVCI" kc={C.cyan} />
                <KV k="Code signing" v="Mandatory WHQL on 64-bit for drivers" kc={C.cyan} />
                <KV k="EDR integration" v="Kernel callbacks + minifilter + ETW + ELAM" kc={C.cyan} />
                <KV k="Namespace isolation" v="Services share OS namespace (no Linux-style namespaces by default)" kc={C.cyan} />
              </>}
              {cmpTab === "persistence" && <>
                <KV k="Auto-start" v="Start=2 (Auto) in service registry key" kc={C.cyan} />
                <KV k="Trigger start" v="SERVICE_TRIGGER — USB insert, network change, ETW event" kc={C.cyan} />
                <KV k="Detection" v="Autoruns.exe, Event 7045, Registry Sysmon Event 13" kc={C.cyan} />
                <KV k="Resilience" v="FailureActions: automatic restart on crash, up to 3 times" kc={C.cyan} />
                <KV k="Removal" v="sc delete or reg delete (requires admin)" kc={C.cyan} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a180a", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX</div>
              {cmpTab === "model" && <>
                <KV k="Service manager" v="systemd (PID 1) / SysVinit / OpenRC / runit" kc={C.green} />
                <KV k="Config store" v="/etc/systemd/system/*.service (text unit files)" kc={C.green} />
                <KV k="Service accounts" v="Dedicated user per service (e.g. www-data, postgres)" kc={C.green} />
                <KV k="Shared hosting" v="No equivalent — each unit is its own process" kc={C.green} />
                <KV k="Failure actions" v="Restart=on-failure, StartLimitBurst (systemd)" kc={C.green} />
                <KV k="Dependencies" v="After=, Requires=, Wants= in unit file" kc={C.green} />
              </>}
              {cmpTab === "drivers" && <>
                <KV k="Driver model" v="LKM (Loadable Kernel Modules), character/block devices" kc={C.green} />
                <KV k="I/O model" v="VFS + file_operations struct (open/read/write/ioctl)" kc={C.green} />
                <KV k="File system filter" v="No MiniFilter equiv; LSM hooks (SELinux/AppArmor) + inotify" kc={C.green} />
                <KV k="Driver signing" v="Optional module signing (CONFIG_MODULE_SIG). Secure Boot lockdown." kc={C.green} />
                <KV k="Driver dev kit" v="Linux kernel headers + Makefile (in-tree or out-of-tree)" kc={C.green} />
                <KV k="Crash impact" v="Module bug → kernel panic (or oops, recoverable)" kc={C.green} />
              </>}
              {cmpTab === "security" && <>
                <KV k="Service sandbox" v="systemd sandboxing: CapabilityBoundingSet, NoNewPrivileges, PrivateTmp" kc={C.green} />
                <KV k="Driver enforcement" v="Module signing + Secure Boot lockdown mode" kc={C.green} />
                <KV k="Code signing" v="Optional PKCS#7 module signing; enforced with Secure Boot" kc={C.green} />
                <KV k="EDR integration" v="LSM hooks (SELinux/AppArmor), kprobes, eBPF tracing, auditd" kc={C.green} />
                <KV k="Namespace isolation" v="Linux namespaces (PID/net/mnt/user) per service (containers)" kc={C.green} />
              </>}
              {cmpTab === "persistence" && <>
                <KV k="Auto-start" v="WantedBy=multi-user.target in [Install] section" kc={C.green} />
                <KV k="Trigger start" v="socket activation, path activation, timer units" kc={C.green} />
                <KV k="Detection" v="systemctl list-units, /etc/systemd/system/ file audit, auditd" kc={C.green} />
                <KV k="Resilience" v="Restart=always + StartLimitIntervalSec=0 (infinite restart)" kc={C.green} />
                <KV k="Removal" v="systemctl disable + rm unit file (root required)" kc={C.green} />
              </>}
            </div>
          </div>
        </PB>

        {/* ── 11: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — BYOVD DRIVER ATTACK ON EDR" icon="🔥" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: APT Loads Vulnerable Driver to Blind EDR → Deploy Ransomware Undetected
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ATTACK CHAIN (OBSERVED IN WILD)</div>
              <div style={S.code}>
{`# Step 1: Initial access (phishing → admin shell)`}
{``}
{`# Step 2: Load vulnerable driver (RTCore64.sys)`}
{`sc create RTCore64 `}
{`    binPath="C:\\Windows\\Temp\\RTCore64.sys" `}
{`    type=kernel start=demand`}
{`sc start RTCore64`}
{``}
{`# Sysmon Event 6 fires — but EDR already targeted next`}
{``}
{`# Step 3: Exploit IOCTL to get kernel R/W`}
{`# Enumerate kernel callbacks via known offsets`}
{`# Remove EDR's PsSetCreateProcessNotifyRoutine callback`}
{`# Remove EDR's PsSetLoadImageNotifyRoutine callback`}
{`# Unregister EDR's minifilter (FltUnregisterFilter)`}
{``}
{`# Step 4: EDR is now blind`}
{`# No process creation events`}
{`# No file system visibility`}
{`# No network callback intercepts`}
{``}
{`# Step 5: Deploy ransomware at scale`}
{`# PsExec lateral movement to all hosts`}
{`# Encrypt file shares, delete VSS, ransom note`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION OPPORTUNITIES</div>
              <div style={S.code}>
{`# 1. Sysmon Event 6 — driver load alert BEFORE EDR blinded:`}
{`#    RTCore64.sys hash in LOLDrivers.io DB`}
{`#    SIEM rule: Event 6 + LOLDriver hash match = CRITICAL`}
{``}
{`# 2. HVCI would have blocked RTCore64 load:`}
{`#    RTCore64.sys is on Microsoft HVCI blocklist`}
{`#    With HVCI: sc start RTCore64 → Access Denied`}
{``}
{`# 3. fltmc output change (if monitored):`}
{`fltmc filters  ; before → EDR filter present`}
{`fltmc filters  ; after  → EDR filter MISSING`}
{``}
{`# 4. EDR self-monitoring (some vendors):`}
{`#    EDR detects own callback removal via periodic check`}
{`#    Triggers offline alert even without local visibility`}
{``}
{`# 5. Memory forensics after incident:`}
{`vol3 -f mem.dmp windows.poolscanner.PoolScanner `}
{`    --tags Driv   ; finds RTCore64 DRIVER_OBJECT`}
{`# Even if driver unloaded — pool memory may retain tag`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Prevention", "HVCI + WDAC driver allowlist = BYOVD impossible. Microsoft blocklist updated regularly. Deploy LOLDrivers hash blocklist in Defender.", C.green],
              ["Detection", "Sysmon Event 6 with hash check against LOLDrivers.io. fltmc periodic monitoring. EDR self-integrity checks. Kernel callback audit from protected process.", C.cyan],
              ["Remediation", "Re-image all compromised hosts. Pull memory dumps before re-image. Revoke all credentials from affected systems. Hunt for ransomware staging across fleet.", C.orange],
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
              [C.green, "Service Hardening Baseline", [
                "All auto-start services audited — disable unused (Remote Registry, Telnet, FTP, IIS if not needed)",
                "No services running as LocalSystem unless required — prefer LocalService/NetworkService",
                "All service ImagePath values are quoted (no unquoted path vulnerabilities)",
                "Service binary directories: write-restricted to SYSTEM/Administrators only",
                "Event 7045 alerting active in SIEM — any new service = investigation",
              ]],
              [C.cyan, "Driver Security", [
                "HVCI enabled (VBS running, HVCI = 2 in Win32_DeviceGuard.SecurityServicesRunning)",
                "Microsoft HVCI driver blocklist deployed (includes RTCore64, DBUtil, gdrv, etc.)",
                "Sysmon Event 6 alerting — unsigned or non-System32\\drivers path = alert",
                "fltmc filters output baselined — alert on EDR filter disappearing",
                "bcdedit output: testsigning = No, nointegritychecks = No",
              ]],
              [C.orange, "SCM & svchost Monitoring", [
                "All svchost instances have services.exe as parent (verify via process tree)",
                "All svchost instances have registered services (tasklist /svc validation)",
                "ServiceDll registry paths baselined — Sysmon Event 13 on any change",
                "Service FailureActions reviewed — no auto-restart to suspicious paths",
              ]],
              [C.purple, "Forensic Readiness", [
                "Autoruns output baselined for all systems — delta alerts on new service/driver entries",
                "WinDbg kernel symbols pre-downloaded for IR analysis (sym path configured)",
                "Driver hash database (LOLDrivers.io) integrated into SIEM enrichment",
                "Memory acquisition procedure includes driver enumeration via !drivers (WinDbg) / Volatility poolscanner",
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
              ["SCM = persistence hub", "The service registry and SCM are the most reliable persistence locations in Windows. Every attacker's second step after initial access is establishing a service.", C.gold],
              ["svchost = camouflage", "Malware masquerades as svchost. Validate parent (services.exe), registered service group, and that the process hosts actual services. Anomaly = investigation.", C.cyan],
              ["HVCI = driver zero-trust", "With HVCI active, even admin-level attackers cannot load unsigned or vulnerable drivers. It's the single highest-impact kernel security control available.", C.green],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 07: Windows Authentication — NTLM, Kerberos, LSASS, SAM, Credential Guard & Attack Techniques
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 06 Complete</Pill>
              <Pill c={C.gold}>12 Panels · Services & Drivers Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
