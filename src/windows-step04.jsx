import { useState } from "react";

const C = {
  bg: "#07080d",
  panel: "#0a0c14",
  header: "#0e1020",
  border: "#1a2030",
  cyan: "#00bfff",
  green: "#00e57a",
  red: "#ff2d55",
  orange: "#ff8800",
  yellow: "#f0c020",
  purple: "#9d6fff",
  teal: "#00d4b8",
  pink: "#ff5fa0",
  lime: "#a0e040",
  text: "#b0bcc8",
  dim: "#4a5668",
  bright: "#d8e4f0",
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
  code: { background: "#050710", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "11px 13px", fontFamily: mono, fontSize: "11.5px", overflowX: "auto", whiteSpace: "pre", lineHeight: "1.75" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "11px" },
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

/* ─── EPROCESS Structure SVG ─────────────────────────────────────────────── */
const EProcessDiagram = () => (
  <svg viewBox="0 0 760 520" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="16" textAnchor="middle" fill="#4a5668" fontSize="10" letterSpacing="2">EPROCESS KERNEL OBJECT — ntoskrnl.exe (Windows 10/11 x64, simplified)</text>

    {/* Central EPROCESS box */}
    <rect x="200" y="28" width="360" height="420" rx="5" fill="#0a0c14" stroke="#9d6fff55" strokeWidth="1.5" />
    <rect x="200" y="28" width="360" height="28" rx="5" fill="#1a1030" />
    <text x="380" y="47" textAnchor="middle" fill="#9d6fff" fontSize="11" fontWeight="700" letterSpacing="1.5">_EPROCESS (Kernel Object)</text>

    {[
      ["Pcb (_KPROCESS)", "#00bfff", "Kernel process control block — scheduler state, affinity, quantum, base priority, DirectoryTableBase (CR3/page table)", 60],
      ["UniqueProcessId", "#00e57a", "PID — unique 64-bit HANDLE value. System=4, smss=varies. Listed in Task Manager.", 98],
      ["ActiveProcessLinks", "#9d6fff", "Doubly-linked list (LIST_ENTRY) connecting all EPROCESS structs. DKOM hides procs by unlinking from here.", 120],
      ["Token (EX_FAST_REF)", "#f0c020", "Reference to primary access token (_TOKEN). SID, privileges, integrity level. Token theft targets this field.", 142],
      ["ImageFileName[15]", "#00bfff", "Process image name (15 chars, ASCII). Visible in Process Explorer. Truncated — use ImageFilePointer for full path.", 164],
      ["InheritedFromUniqueProcessId", "#ff8800", "Parent PID — used to build process tree. Attackers spoof PPID via CreateProcess(lpAttributeList).", 186],
      ["ObjectTable (HANDLE_TABLE*)", "#ff5fa0", "Pointer to process handle table. Every open handle (files, processes, events) indexed here.", 208],
      ["VadRoot (_MM_AVL_TABLE)", "#00d4b8", "Virtual Address Descriptor tree root. Describes all virtual memory allocations (committed, mapped, free).", 230],
      ["Peb (PEB*)", "#a0e040", "Pointer to Process Environment Block (user-mode). Contains loader data, module list, command line, env vars.", 252],
      ["Win32Process (EWOW64PROCESS*)", "#ff2d55", "Win32 subsystem kernel state. NULL for console-only processes. Links to win32k.sys window structures.", 274],
      ["ActiveThreads (ULONG)", "#00e57a", "Count of live threads. Zero → process terminating. Monitored by PsSetCreateProcessNotifyRoutine callbacks.", 296],
      ["SectionObject (_SECTION*)", "#9d6fff", "Points to image section (file mapping). Shared between all instances of same executable (copy-on-write).", 318],
      ["SecurityPort (HANDLE)", "#f0c020", "Port for security monitor communication (SRM). Used for access check IPC with lsass.", 340],
      ["ProtectedProcess (UCHAR)", "#ff2d55", "PPL level (0=none,1=PPL,2=PP). Protected processes block OpenProcess from non-PPL callers even as SYSTEM.", 362],
      ["MitigationFlags", "#ff8800", "DEP, ASLR, CFG, ACG, CIG, SEHOP, Heap flags per process. Source of modern exploit mitigations.", 384],
      ["... (150+ more fields)", "#4a5668", "ThreadListHead, DebugPort, ExceptionPortData, JobObject, Wow64Process, SignatureLevel, TrustletIdentity...", 406],
    ].map(([name, color, desc, y]) => (
      <g key={name}>
        <rect x="204" y={y} width="352" height="20" rx="1" fill={`${color}08`} stroke={`${color}22`} strokeWidth="0.5" />
        <rect x="204" y={y} width="3" height="20" fill={color} opacity="0.7" />
        <text x="212" y={y + 13} fill={color} fontSize="9.5" fontWeight="700">{name}</text>
        <title>{desc}</title>
      </g>
    ))}

    {/* Connected structures — left side */}
    <rect x="10" y="60" width="175" height="55" rx="3" fill="#0a0c14" stroke="#00bfff44" strokeWidth="1.5" />
    <text x="97" y="78" textAnchor="middle" fill="#00bfff" fontSize="10" fontWeight="700">_KPROCESS</text>
    <text x="97" y="93" textAnchor="middle" fill="#4a5668" fontSize="8.5">KernelTime · UserTime</text>
    <text x="97" y="106" textAnchor="middle" fill="#4a5668" fontSize="8.5">DirectoryTableBase (CR3)</text>
    <line x1="185" y1="84" x2="200" y2="74" stroke="#00bfff33" strokeWidth="1" strokeDasharray="3,2" />

    <rect x="10" y="130" width="175" height="55" rx="3" fill="#0a0c14" stroke="#f0c02044" strokeWidth="1.5" />
    <text x="97" y="148" textAnchor="middle" fill="#f0c020" fontSize="10" fontWeight="700">_TOKEN</text>
    <text x="97" y="163" textAnchor="middle" fill="#4a5668" fontSize="8.5">UserSid · GroupSids</text>
    <text x="97" y="176" textAnchor="middle" fill="#4a5668" fontSize="8.5">Privileges · IntegrityLevel</text>
    <line x1="185" y1="155" x2="200" y2="150" stroke="#f0c02033" strokeWidth="1" strokeDasharray="3,2" />

    <rect x="10" y="200" width="175" height="55" rx="3" fill="#0a0c14" stroke="#ff5fa044" strokeWidth="1.5" />
    <text x="97" y="218" textAnchor="middle" fill="#ff5fa0" fontSize="10" fontWeight="700">HANDLE_TABLE</text>
    <text x="97" y="233" textAnchor="middle" fill="#4a5668" fontSize="8.5">HandleTableCode</text>
    <text x="97" y="246" textAnchor="middle" fill="#4a5668" fontSize="8.5">QuotaProcess · NextHandleNeedingPool</text>
    <line x1="185" y1="225" x2="200" y2="216" stroke="#ff5fa033" strokeWidth="1" strokeDasharray="3,2" />

    <rect x="10" y="270" width="175" height="55" rx="3" fill="#0a0c14" stroke="#00d4b844" strokeWidth="1.5" />
    <text x="97" y="288" textAnchor="middle" fill="#00d4b8" fontSize="10" fontWeight="700">VAD Tree (_VAD)</text>
    <text x="97" y="303" textAnchor="middle" fill="#4a5668" fontSize="8.5">StartingVpn · EndingVpn</text>
    <text x="97" y="316" textAnchor="middle" fill="#4a5668" fontSize="8.5">u.VadFlags (type/protection)</text>
    <line x1="185" y1="295" x2="200" y2="238" stroke="#00d4b833" strokeWidth="1" strokeDasharray="3,2" />

    {/* Right side */}
    <rect x="575" y="60" width="175" height="55" rx="3" fill="#0a0c14" stroke="#a0e04044" strokeWidth="1.5" />
    <text x="662" y="78" textAnchor="middle" fill="#a0e040" fontSize="10" fontWeight="700">PEB (User Mode)</text>
    <text x="662" y="93" textAnchor="middle" fill="#4a5668" fontSize="8.5">Ldr (module list)</text>
    <text x="662" y="106" textAnchor="middle" fill="#4a5668" fontSize="8.5">ProcessParameters · Heap</text>
    <line x1="560" y1="84" x2="575" y2="260" stroke="#a0e04033" strokeWidth="1" strokeDasharray="3,2" />

    <rect x="575" y="130" width="175" height="55" rx="3" fill="#0a0c14" stroke="#9d6fff44" strokeWidth="1.5" />
    <text x="662" y="148" textAnchor="middle" fill="#9d6fff" fontSize="10" fontWeight="700">ActiveProcessLinks</text>
    <text x="662" y="163" textAnchor="middle" fill="#4a5668" fontSize="8.5">Flink → next EPROCESS</text>
    <text x="662" y="176" textAnchor="middle" fill="#4a5668" fontSize="8.5">Blink → prev EPROCESS</text>
    <line x1="560" y1="155" x2="575" y2="148" stroke="#9d6fff33" strokeWidth="1" strokeDasharray="3,2" />

    <rect x="575" y="200" width="175" height="55" rx="3" fill="#0a0c14" stroke="#ff2d5544" strokeWidth="1.5" />
    <text x="662" y="218" textAnchor="middle" fill="#ff2d55" fontSize="10" fontWeight="700">ProtectedProcess</text>
    <text x="662" y="233" textAnchor="middle" fill="#4a5668" fontSize="8.5">PPL signer type</text>
    <text x="662" y="246" textAnchor="middle" fill="#4a5668" fontSize="8.5">Blocks OpenProcess SYSTEM</text>
    <line x1="560" y1="225" x2="575" y2="228" stroke="#ff2d5533" strokeWidth="1" strokeDasharray="3,2" />

    <rect x="575" y="270" width="175" height="55" rx="3" fill="#0a0c14" stroke="#ff880044" strokeWidth="1.5" />
    <text x="662" y="288" textAnchor="middle" fill="#ff8800" fontSize="10" fontWeight="700">MitigationFlags</text>
    <text x="662" y="303" textAnchor="middle" fill="#4a5668" fontSize="8.5">DEP · ASLR · CFG · ACG</text>
    <text x="662" y="316" textAnchor="middle" fill="#4a5668" fontSize="8.5">CIG · SEHOP · HeapTerminate</text>
    <line x1="560" y1="295" x2="575" y2="290" stroke="#ff880033" strokeWidth="1" strokeDasharray="3,2" />

    {/* Thread list */}
    <rect x="230" y="450" width="300" height="58" rx="3" fill="#0a0c14" stroke="#00e57a44" strokeWidth="1.5" />
    <text x="380" y="468" textAnchor="middle" fill="#00e57a" fontSize="10" fontWeight="700">ETHREAD List (ThreadListHead)</text>
    <text x="380" y="483" textAnchor="middle" fill="#4a5668" fontSize="8.5">_ETHREAD[0] → _ETHREAD[1] → ... → _ETHREAD[N]</text>
    <text x="380" y="496" textAnchor="middle" fill="#4a5668" fontSize="8.5">Each ETHREAD contains: _KTHREAD + Win32StartAddr + Tcb + IrpList + ThreadListEntry</text>
    <line x1="380" y1="448" x2="380" y2="450" stroke="#00e57a33" strokeWidth="1" />
  </svg>
);

/* ─── Token Structure ────────────────────────────────────────────────────── */
const TokenDiagram = () => (
  <svg viewBox="0 0 760 300" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="15" textAnchor="middle" fill="#4a5668" fontSize="10" letterSpacing="2">ACCESS TOKEN STRUCTURE (_TOKEN kernel object)</text>

    {[
      { label: "TokenType", desc: "Primary (process) or Impersonation (thread override)", color: "#00bfff", x: 10, y: 28, w: 230 },
      { label: "ImpersonationLevel", desc: "Anonymous / Identification / Impersonation / Delegation", color: "#9d6fff", x: 250, y: 28, w: 250 },
      { label: "TokenId (LUID)", desc: "Unique identifier for this token instance", color: "#f0c020", x: 510, y: 28, w: 240 },
      { label: "AuthenticationId (LUID)", desc: "Logon session ID — ties token to LSA logon session", color: "#00e57a", x: 10, y: 88, w: 230 },
      { label: "UserSid (SID*)", desc: "S-1-5-21-<domain>-<RID> — identity of the user", color: "#ff8800", x: 250, y: 88, w: 250 },
      { label: "GroupCount / Groups[]", desc: "Array of SID_AND_ATTRIBUTES: Administrators, Everyone, INTERACTIVE, Logon SID, integrity SID…", color: "#ff5fa0", x: 510, y: 88, w: 240 },
      { label: "Privileges (LUID_AND_ATTR[])", desc: "SE_DEBUG, SE_IMPERSONATE, SE_SHUTDOWN, SE_BACKUP, SE_RESTORE, SeLoadDriver… + Enabled/Disabled flags", color: "#ff2d55", x: 10, y: 148, w: 740 },
      { label: "DefaultDacl", desc: "ACL applied to new objects created by this token", color: "#00d4b8", x: 10, y: 198, w: 360 },
      { label: "IntegrityLevel (MandatoryPolicy)", desc: "Untrusted(0x0000) / Low(0x1000) / Medium(0x2000) / High(0x3000) / System(0x4000)", color: "#a0e040", x: 380, y: 198, w: 370 },
      { label: "TokenFlags", desc: "HasRestrictions / IsRestricted / WriteRestricted / IsFiltered / IsSandboxed / UIAccess / Virtualized / HasLinkedToken", color: "#9d6fff", x: 10, y: 248, w: 740 },
    ].map(({ label, desc, color, x, y, w }) => (
      <g key={label}>
        <rect x={x} y={y} width={w} height="52" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <rect x={x} y={y} width="3" height="52" rx="1" fill={color} opacity="0.8" />
        <text x={x + 10} y={y + 18} fill={color} fontSize="10" fontWeight="700">{label}</text>
        <text x={x + 10} y={y + 33} fill="#6e7e92" fontSize="9" style={{ whiteSpace: "pre-wrap" }}>{desc.length > 70 ? desc.slice(0, 70) + "…" : desc}</text>
      </g>
    ))}
  </svg>
);

/* ─── Process Creation Flow ──────────────────────────────────────────────── */
const ProcessCreateFlow = () => {
  const steps = [
    { id:"01", label:"CreateProcess() called", sub:"kernel32.dll / kernelbase.dll", color:C.green, detail:"Caller specifies: executable path, command line, creation flags (SUSPENDED, NEW_CONSOLE, DEBUG, etc.), parent handle, startup info" },
    { id:"02", label:"NtCreateUserProcess() syscall", sub:"ntdll.dll → Ring 0 dispatch", color:C.cyan, detail:"Single syscall in Vista+ (replaced older multi-call approach). Passes image path, RTL_USER_PROCESS_PARAMETERS, attribute list (PPID spoofing here)" },
    { id:"03", label:"Image loader validates PE", sub:"ntoskrnl PsCallImageNotifyRoutines", color:C.purple, detail:"NTFS opens image file, validates PE header, checks signature (if WDAC/SRP enforced), resolves import table version" },
    { id:"04", label:"EPROCESS object allocated", sub:"ObCreateObject(PsProcessType)", color:C.orange, detail:"Object Manager allocates kernel paged pool for EPROCESS. UniqueProcessId (PID) assigned from handle table. PsProcessType object type used." },
    { id:"05", label:"VAD tree initialized", sub:"MmInitializeProcessAddressSpace()", color:C.teal, detail:"New virtual address space created (new CR3/page directory). Kernel address space shared; user-mode space is fresh. Minimum working set established." },
    { id:"06", label:"Access token created/inherited", sub:"SeSubProcessToken() or new token", color:C.yellow, detail:"Token cloned from parent (default) or new token if CreateProcessAsUser/WithLogonW used. Integrity level may be reduced. Token linked to logon session." },
    { id:"07", label:"PEB constructed in user space", sub:"RtlCreateProcessParametersEx()", color:C.lime, detail:"Process Environment Block mapped at fixed address (~0x7FF... on x64). Contains: image base, RTL_USER_PROCESS_PARAMETERS, NtGlobalFlag, heap pointer." },
    { id:"08", label:"Initial thread (ETHREAD) created", sub:"NtCreateThread() → KTHREAD init", color:C.green, detail:"Main thread created with entry point = LdrInitializeThunk (loader). Thread stack allocated. KTHREAD kernel object created, linked into EPROCESS ThreadListHead." },
    { id:"09", label:"Notify callbacks fired", sub:"PsSetCreateProcessNotifyRoutine", color:C.red, detail:"All registered kernel callbacks notified (EDR, AV, ETW). Callback receives EPROCESS pointer + create/delete flag. Cannot be cancelled at this point." },
    { id:"10", label:"ntdll.dll loaded + LDR runs", sub:"LdrpInitializeProcess() user-mode", color:C.cyan, detail:"ntdll.dll is the first DLL always loaded. Loader walks import table, loads dependent DLLs, calls DllMain() for each (DLL_PROCESS_ATTACH). TLS callbacks fire before main." },
    { id:"11", label:"main() / WinMain() executes", sub:"CRT startup code → entry point", color:C.green, detail:"C runtime initializes (argc/argv, atexit list, static constructors in C++). Then user's entry point called. Process is now live." },
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

/* ─── Process Tree ───────────────────────────────────────────────────────── */
const ProcessTree = () => {
  const tree = [
    { pid:4,    name:"System",         parent:0,   color:C.cyan,   depth:0, note:"Kernel threads, drivers" },
    { pid:312,  name:"smss.exe",       parent:4,   color:C.green,  depth:1, note:"Session Manager (first user-mode process)" },
    { pid:440,  name:"csrss.exe",      parent:312, color:C.purple, depth:2, note:"Win32 subsystem server (Session 0)" },
    { pid:480,  name:"wininit.exe",    parent:312, color:C.orange, depth:2, note:"Initializes Session 0 services" },
    { pid:560,  name:"services.exe",   parent:480, color:C.yellow, depth:3, note:"Service Control Manager (SCM)" },
    { pid:680,  name:"svchost.exe",    parent:560, color:C.teal,   depth:4, note:"-k netsvcs (BITS, Themes, WSearch...)" },
    { pid:744,  name:"svchost.exe",    parent:560, color:C.teal,   depth:4, note:"-k LocalSystemNetworkRestricted (RPC)" },
    { pid:820,  name:"svchost.exe",    parent:560, color:C.teal,   depth:4, note:"-k DcomLaunch (COM servers)" },
    { pid:900,  name:"lsass.exe",      parent:480, color:C.red,    depth:3, note:"Auth subsystem — credential crown jewel" },
    { pid:920,  name:"lsm.exe",        parent:480, color:C.dim,    depth:3, note:"Local Session Manager" },
    { pid:1040, name:"winlogon.exe",   parent:312, color:C.cyan,   depth:2, note:"Interactive logon (Session 1)" },
    { pid:1120, name:"userinit.exe",   parent:1040,color:C.dim,    depth:3, note:"Starts user shell then exits" },
    { pid:1200, name:"explorer.exe",   parent:1120,color:C.green,  depth:4, note:"User shell (orphaned after userinit exits)" },
    { pid:2240, name:"chrome.exe",     parent:1200,color:C.dim,    depth:5, note:"User app" },
    { pid:3310, name:"powershell.exe", parent:1200,color:C.lime,   depth:5, note:"⚠ spawned by explorer — check parent" },
  ];
  return (
    <div>
      {tree.map(p => (
        <div key={p.pid} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", paddingLeft: `${p.depth * 20}px` }}>
          <span style={{ color: C.dim, fontSize: "10px", minWidth: "36px" }}>{p.pid}</span>
          <span style={{ color: C.border, fontSize: "11px" }}>{p.depth > 0 ? "└─" : "  "}</span>
          <span style={{ color: p.color, fontWeight: "700", fontSize: "11.5px", minWidth: "160px" }}>{p.name}</span>
          <span style={S.badge(p.color)}>{p.pid}</span>
          <span style={{ color: C.dim, fontSize: "10.5px" }}>{p.note}</span>
        </div>
      ))}
      <hr style={S.sep} />
      <div style={{ color: C.dim, fontSize: "11px" }}>
        <strong style={{ color: C.red }}>Red flags:</strong> powershell.exe child of Word/Excel, cmd.exe child of svchost, lsass.exe with unexpected parent, explorer.exe with parent other than userinit/winlogon.
      </div>
    </div>
  );
};

/* ─── Handle Table ───────────────────────────────────────────────────────── */
const HandleTableView = () => (
  <div>
    <div style={{ color: C.pink, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROCESS HANDLE TABLE — chrome.exe (PID 2240)</div>
    <div style={{ display: "grid", gridTemplateColumns: "70px 140px 120px 80px 1fr", gap: "1px", background: C.border, borderRadius: "4px", overflow: "hidden" }}>
      {["HANDLE", "OBJECT TYPE", "GRANTED ACCESS", "FLAGS", "OBJECT NAME / NOTE"].map(h => (
        <div key={h} style={{ background: C.header, padding: "6px 8px" }}>
          <span style={{ color: C.dim, fontWeight: "700", fontSize: "10px" }}>{h}</span>
        </div>
      ))}
      {[
        ["0x04",  "Process",         "0x1FFFFF",  "—",        "chrome.exe self-handle (full access)"],
        ["0x08",  "Thread",          "0x1FFFFF",  "—",        "Main thread handle"],
        ["0x0C",  "File",            "0x120089",  "Inherit",  "C:\\Windows\\System32\\chrome.dll"],
        ["0x10",  "Key",             "0x20019",   "—",        "HKCU\\Software\\Google\\Chrome\\Default"],
        ["0x14",  "Event",           "0x1F0003",  "—",        "(unnamed sync event)"],
        ["0x1C",  "Section",         "0x000F001F","—",        "\\Device\\PhysicalMemory mapping"],
        ["0x20",  "Semaphore",       "0x1F0003",  "—",        "IPC semaphore"],
        ["0x24",  "Mutant",          "0x1F0001",  "—",        "Chrome singleton mutex"],
        ["0x28",  "IoCompletion",    "0x1F0003",  "—",        "Async I/O completion port"],
        ["0xD4",  "Process",         "0x0010",    "—",        "⚠ lsass.exe — PROCESS_VM_READ access!"],
      ].map(([h, type, access, flags, note], i) => (
        [h, type, access, flags, note].map((cell, j) => (
          <div key={`${h}${j}`} style={{ background: i % 2 === 0 ? "#08090d" : C.panel, padding: "5px 8px", borderTop: `1px solid ${C.border}` }}>
            <span style={{ color: [C.yellow, C.cyan, C.purple, C.dim, note.includes("⚠") ? C.red : C.dim][j], fontSize: "10.5px" }}>{cell}</span>
          </div>
        ))
      ))}
    </div>
    <div style={{ marginTop: "8px", color: C.dim, fontSize: "11px" }}>
      <strong style={{ color: C.red }}>⚠ Red flag:</strong> Handle 0xD4 — chrome.exe holds PROCESS_VM_READ on lsass.exe. Legitimate browsers never need this. Indicates credential dumping via MiniDumpWriteDump or ReadProcessMemory. Sysmon Event 10 catches this.
    </div>
  </div>
);

/* ─── Injection Techniques ───────────────────────────────────────────────── */
const InjectionTech = ({ tab }) => {
  const techniques = {
    classic: {
      title: "Classic Injection Techniques",
      items: [
        {
          name: "Classic DLL Injection",
          color: C.red,
          steps: ["OpenProcess(PROCESS_ALL_ACCESS, pid)", "VirtualAllocEx() → allocate RWX memory in target", "WriteProcessMemory() → write DLL path string", "CreateRemoteThread(LoadLibraryA, dllPath) → target loads DLL"],
          detect: "Sysmon Event 8 (CreateRemoteThread), Event 10 (OpenProcess with PROCESS_VM_WRITE), Event 7 (image loaded from unusual path)",
          indicator: "OpenProcess → VirtualAllocEx → WriteProcessMemory → CreateRemoteThread chain",
        },
        {
          name: "Process Hollowing (RunPE)",
          color: C.orange,
          steps: ["CreateProcess(SUSPENDED) → legitimate process suspended", "NtUnmapViewOfSection() → unmap original image from PEB.ImageBase", "VirtualAllocEx() → map malicious PE at same base address", "SetThreadContext() → redirect RIP/EIP to malicious entry point", "ResumeThread() → execution begins in hollowed shell"],
          detect: "PEB.ImageBase ≠ mapped file path on disk. Sysmon Event 1 + Event 7. PEB inconsistency via Process Hacker / Moneta.",
          indicator: "Suspended process + NtUnmapViewOfSection + WriteProcessMemory + SetThreadContext chain",
        },
      ]
    },
    advanced: {
      title: "Advanced / Fileless Techniques",
      items: [
        {
          name: "Process Doppelgänging",
          color: C.purple,
          steps: ["Create NTFS transaction (TxF) with NtCreateTransaction()", "Open legitimate executable inside transaction", "Overwrite file content with malicious PE (transaction not committed)", "NtCreateSection(SEC_IMAGE) from transacted file handle", "NtCreateProcessEx() from that section → process mapped from phantom file", "Rollback transaction → malicious file content NEVER written to disk"],
          detect: "NtCreateTransaction → NtCreateSection from unwritten file. Very few EDRs catch this. Section object owner ≠ any file on disk.",
          indicator: "Transacted file operations + SEC_IMAGE section creation + process from unmapped file",
        },
        {
          name: "Reflective DLL Injection",
          color: C.pink,
          steps: ["DLL contains self-loading 'ReflectiveDllInjection' export", "Shellcode copies DLL bytes into target process memory (no LoadLibrary)", "Reflective loader parses PE headers internally, fixes relocations, resolves imports manually", "No DLL path in PEB loader list → invisible to module enumeration", "EDR module enumeration misses it (must walk VAD tree instead)"],
          detect: "Sysmon Event 7 only fires for loaded modules in PEB. Use VAD scan or pe-sieve to find injected memory regions not in loader list.",
          indicator: "Executable memory region in VAD with no corresponding module in PEB LDR_DATA_TABLE_ENTRY",
        },
        {
          name: "Direct Syscall / Hell's Gate",
          color: C.red,
          steps: ["EDRs hook NTDLL.DLL user-mode exports (NtCreateFile, NtOpenProcess, etc.)", "Malware reads SSN (System Service Number) directly from NTDLL or fresh ntdll copy", "Assembles syscall stub (mov eax, SSN; syscall) in own code", "Calls syscall directly — bypasses all NTDLL hooks entirely", "Variant: Tartarus' Gate reads SSN from disk-mapped ntdll to avoid hooked copy"],
          detect: "ETW ETWTI callstack telemetry. Kernel callbacks still fire. Return address anomaly (syscall not from ntdll). Canary hooks detect it indirectly.",
          indicator: "Syscall instruction RIP not in ntdll address range. Kernel thread origin from RWX shellcode page.",
        },
      ]
    },
    token: {
      title: "Token & Privilege Techniques",
      items: [
        {
          name: "Token Impersonation",
          color: C.yellow,
          steps: ["OpenProcessToken(target, TOKEN_DUPLICATE)", "DuplicateTokenEx() → create impersonation token copy", "ImpersonateLoggedOnUser() or SetThreadToken() → thread now runs as victim", "Or: CreateProcessWithTokenW() → spawn child process with stolen token"],
          detect: "Event 4624 LogonType=9 (NewCredentials impersonation). Event 4648 (explicit cred logon). Unusual token ancestry (e.g. low-priv proc impersonating SYSTEM).",
          indicator: "Non-lsass process duplicating SYSTEM or admin tokens. Mismatched process integrity vs token integrity.",
        },
        {
          name: "Token Privilege Manipulation",
          color: C.green,
          steps: ["AdjustTokenPrivileges() → enable disabled privileges (e.g. SeDebugPrivilege)", "SeDebugPrivilege → OpenProcess(SYSTEM processes) → LSASS dump", "SeImpersonatePrivilege → named pipe server trick → capture SYSTEM token", "SeLoadDriverPrivilege → load unsigned kernel driver (BYOVD)"],
          detect: "Event 4672 (special privileges assigned at logon). Event 4673 (privileged service called). Sysmon Event 1 cmdline of token-manipulating tools (PrintSpoofer, RoguePotato).",
          indicator: "Low-privilege process calling AdjustTokenPrivileges + then accessing privileged resources immediately after",
        },
        {
          name: "PPID Spoofing",
          color: C.teal,
          steps: ["OpenProcess(PROCESS_CREATE_PROCESS) on target parent", "InitializeProcThreadAttributeList() + UpdateProcThreadAttribute(PROC_THREAD_ATTRIBUTE_PARENT_PROCESS)", "CreateProcess() with lpAttributeList → child reports fake parent PID", "Process tree in Task Manager / EDR shows wrong parent → detection bypass"],
          detect: "Process tree inconsistency: child's PPID ≠ actual creating process. Creation time: child born after 'parent' exited. Sysmon Event 1 logs both creator PID and reported PPID.",
          indicator: "Child process PID creation timestamp before parent exists, or PPID points to terminated process",
        },
      ]
    }
  };

  const data = techniques[tab];
  return (
    <div>
      {data.items.map(item => (
        <div key={item.name} style={{ background: "#09090d", border: `1px solid ${item.color}33`, borderRadius: "5px", padding: "14px", marginBottom: "12px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ color: item.color, fontWeight: "800", fontSize: "13px" }}>{item.name}</span>
            <span style={S.badge(item.color)}>INJECTION</span>
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: item.color, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ EXECUTION STEPS</div>
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
              <div style={{ color: C.red, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ IOC SIGNATURE</div>
              <div style={{ background: "#120808", border: `1px solid ${C.red}22`, borderRadius: "3px", padding: "8px" }}>
                <div style={{ color: C.dim, fontSize: "11px" }}>{item.indicator}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WindowsStep04() {
  const [archTab, setArchTab]   = useState("eprocess");
  const [injTab, setInjTab]     = useState("classic");
  const [secTab, setSecTab]     = useState("attack");
  const [monTab, setMonTab]     = useState("events");
  const [cmpTab, setCmpTab]     = useState("process");
  const [intTab, setIntTab]     = useState("tree");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.purple, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 04 · PROCESS ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.purple), background: "linear-gradient(135deg, #0a0c14 55%, #110820)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 04</div>
                <div style={{ color: C.purple, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Process & Thread Internals</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>EPROCESS · ETHREAD · Handle Tables · Token Architecture · Process Injection</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The fundamental unit of execution — and the primary battlefield for attackers and defenders</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → EXPERT</Pill>
                <Pill c={C.purple}>DOMAIN: OS INTERNALS / OFFENSE / DEFENSE</Pill>
                <Pill c={C.orange}>MODULE 04 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Red Team","Blue Team","DFIR","Malware Analyst","EDR Engineer","Security Researcher","SOC L3","Kernel Dev"].map(r => (
                <Tag key={r} c={C.purple}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}>A <strong style={{color:C.bright}}>process</strong> is Windows' unit of resource ownership — it has memory, handles, a security token, and at least one thread. Think of it as a <strong style={{color:C.bright}}>container</strong>: processes are isolated from each other by virtual address spaces.</Row>
              <Row c={C.green}>A <strong style={{color:C.bright}}>thread</strong> is the unit of execution inside a process — the actual CPU instruction stream. One process can have hundreds of threads. The scheduler picks which thread runs on which CPU core at any moment.</Row>
              <Row c={C.green}>Every process has a <strong style={{color:C.bright}}>security token</strong> — a ticket that says who the process runs as, what groups it belongs to, and what privileges it has. This is what Windows checks before allowing any privileged operation.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>In kernel memory, every process is an <strong style={{color:C.bright}}>EPROCESS structure</strong> (~1700 bytes on Win10 x64). Threads are <strong style={{color:C.bright}}>ETHREAD structures</strong> linked into EPROCESS.ThreadListHead. The kernel scheduler works on <strong style={{color:C.bright}}>KTHREAD</strong> (first field of ETHREAD).</Row>
              <Row c={C.purple}>All EPROCESS objects are connected in a <strong style={{color:C.bright}}>doubly-linked list</strong> via ActiveProcessLinks. Walking this list is how tasklist, Get-Process, and Process Explorer enumerate processes. Rootkits unlink their EPROCESS from this list (DKOM) to hide.</Row>
              <Row c={C.purple}>The <strong style={{color:C.bright}}>handle table</strong> (HANDLE_TABLE) tracks every kernel object a process has open — files, registry keys, processes, threads, events. Handle values are indices into this table. Leaking handles = privilege escalation vector.</Row>
              <Row c={C.purple}>The <strong style={{color:C.bright}}>VAD tree</strong> (Virtual Address Descriptor) is a red-black tree describing every committed virtual memory region — mapped files, heaps, stacks, injected code. Malware hunters walk the VAD to find injected memory with no backing file.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Token = identity + privileges", "Every privileged operation checks the calling thread's token. Steal or forge a token → become that user. This is why token attacks are the #1 privilege escalation path.", C.yellow],
              ["Handle = object reference", "Handles are opaque indices. PROCESS_VM_READ handle to lsass = credential dump. Handle leak = unwanted access. Monitor with Event 4656.", C.pink],
              ["Process injection = evasion", "Injecting code into a legitimate process (explorer, svchost) inherits its token, network trust, and AV whitelist status. Hardest detection problem in EDR.", C.red],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture Diagrams ── */}
        <PB title="KERNEL OBJECT ARCHITECTURE — EPROCESS · TOKEN · HANDLE TABLE" icon="🔬" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["eprocess","EPROCESS STRUCTURE"],["token","TOKEN STRUCTURE"],["ethread","ETHREAD / KTHREAD"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "eprocess" && <EProcessDiagram />}
          {archTab === "token"    && <TokenDiagram />}
          {archTab === "ethread"  && (
            <div style={S.grid2}>
              {[
                ["_ETHREAD (full thread object)", C.green, [
                  ["Tcb (_KTHREAD)", "Kernel thread control block — FIRST field. Scheduler state, affinity, priority, quantum, kernel/user stack pointers, APC lists"],
                  ["ThreadListEntry", "Links ETHREAD into EPROCESS.ThreadListHead doubly-linked list"],
                  ["Cid.UniqueProcess", "PID of owning process (cross-check with EPROCESS)"],
                  ["Cid.UniqueThread", "TID — unique thread ID visible in Task Manager"],
                  ["Win32StartAddress", "User-mode start function address (what you passed to CreateThread)"],
                  ["IrpList", "List of pending I/O request packets this thread is waiting on"],
                  ["Token (override)", "If non-null: thread impersonation token overrides process token for this thread only"],
                  ["CrossThreadFlags", "Terminated, DeadThread, HideFromDebugger, ActiveImpersonationInfo flags"],
                ]],
                ["_KTHREAD (scheduler object)", C.cyan, [
                  ["Header (DISPATCHER_HEADER)", "Kernel dispatcher object — used for WaitForSingleObject waits"],
                  ["InitialStack / StackBase / StackLimit", "Kernel stack boundaries (12–24KB default per thread)"],
                  ["TrapFrame (KTRAP_FRAME*)", "Saved user-mode register state when syscall/interrupt occurred"],
                  ["ApcState (KAPC_STATE)", "APC (Async Procedure Call) queues — user/kernel APC lists. Used for APC injection."],
                  ["Priority / BasePriority", "Dynamic priority (0–31) + base priority. Real-time = 16–31, Normal = 1–15"],
                  ["Affinity (KAFFINITY)", "Bitmask of CPUs this thread is allowed to run on"],
                  ["WaitBlock[]", "Array of wait blocks — what kernel objects this thread is waiting on"],
                  ["TebMapped (TEB*)", "Pointer to Thread Environment Block (user-mode per-thread data: TLS, SEH chain, stack base)"],
                ]],
              ].map(([title, c, fields]) => (
                <div key={title} style={{ background: "#09090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "12px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "10px" }}>▸ {title}</div>
                  {fields.map(([name, desc]) => (
                    <div key={name} style={{ marginBottom: "7px" }}>
                      <div style={{ color: c, fontSize: "11px", fontWeight: "600" }}>{name}</div>
                      <div style={{ color: C.dim, fontSize: "10.5px" }}>{desc}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — PROCESS CREATION INTERNAL CHAIN" icon="⚙" color={C.orange}>
          <ProcessCreateFlow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Key security moment:</strong> Step 9 (notify callbacks) is where EDRs learn about every new process. They cannot prevent creation here but can inject monitoring DLL, flag the process, or terminate it post-creation. PPID spoofing attacks Step 2 (attribute list forgery).
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL — PROCESS & TOKEN OPERATIONS" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROCESS ENUMERATION</div>
              <div style={S.code}>
{`# Full process list with parent PID:`}
{`PS> Get-Process | Select-Object Id, Name,`}
{`        @{N="Parent";E={(Get-Process -Id `}
{`          (Get-WmiObject Win32_Process `}
{`          -Filter "ProcessId=$($_.Id)"`}
{`          ).ParentProcessId -EA 0).Name}}`}
{``}
{`# WMI process tree (parent + cmdline):`}
{`PS> Get-WmiObject Win32_Process | `}
{`    Select Name,ProcessId,`}
{`    ParentProcessId,CommandLine`}
{``}
{`# Processes running as SYSTEM:`}
{`PS> Get-Process | Where-Object {`}
{`    (Get-Process -Id $_.Id -IncludeUserName `}
{`    -EA 0).UserName -match "SYSTEM"}`}
{``}
{`# Check process integrity level (Sysinternals):`}
{`C:\\> accesschk.exe -p <PID>`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TOKEN & PRIVILEGE INSPECTION</div>
              <div style={S.code}>
{`# Current process token:`}
{`C:\\> whoami /all`}
{``}
{`# All privileges (including disabled):`}
{`C:\\> whoami /priv`}
{``}
{`# Enable SeDebugPrivilege (C/PowerShell):`}
{`# [PowerShell] AdjustTokenPrivilege wrapper:`}
{`$code = @"`}
{`using System;using System.Runtime.InteropServices;`}
{`// P/Invoke AdjustTokenPrivileges...`}
{`"@`}
{``}
{`# Check token via handle (Sysinternals):`}
{`C:\\> handle.exe -p <pid> -t Token`}
{``}
{`# List all handles of a process:`}
{`C:\\> handle.exe -p <pid>`}
{``}
{`# Find processes with open handle to lsass:`}
{`C:\\> handle.exe lsass.exe -a | findstr /i "pid"`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ KERNEL INTROSPECTION (WinDbg / Live Kernel)</div>
            <div style={S.code}>
{`# WinDbg: walk EPROCESS list (kernel debugger):`}
{`!process 0 0                   ; list all processes`}
{`!process 0 7                   ; all processes + threads`}
{`dt nt!_EPROCESS <addr>         ; dump EPROCESS struct`}
{`dt nt!_TOKEN poi(<EPROCESS+0x4b8>)   ; dump token (offset varies by OS build)`}
{``}
{`# Find EPROCESS for a specific PID:`}
{`!process <PID> 0`}
{``}
{`# Walk thread list from EPROCESS:`}
{`.foreach (thread {!process <PID> 4}) { dt nt!_KTHREAD thread }`}
{``}
{`# VAD tree walk (find injected memory):`}
{`!vad <EPROCESS.VadRoot>`}
{`!vadump                        ; dump all VAD regions for current process`}
{``}
{`# PowerShell via PsFoundation / SysInternals:`}
{`C:\\> vmmap.exe -p <pid>        ; visual VAD / memory map`}
{`C:\\> procexp.exe               ; GUI EPROCESS explorer`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — PROCESS TREE · HANDLE TABLE · VAD" icon="📊" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["tree","PROCESS TREE"],["handles","HANDLE TABLE"],["vad","VAD MEMORY MAP"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>
          {intTab === "tree" && <ProcessTree />}
          {intTab === "handles" && <HandleTableView />}
          {intTab === "vad" && (
            <div>
              <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ VAD MEMORY MAP — explorer.exe (PID 1200) — INJECTED REGION DETECTED</div>
              <div style={{ display: "grid", gridTemplateColumns: "160px 80px 100px 80px 80px 1fr", gap: "1px", background: C.border, borderRadius: "4px", overflow: "hidden" }}>
                {["START VPN", "END VPN", "SIZE", "TYPE", "PROTECT", "BACKING FILE / NOTE"].map(h => (
                  <div key={h} style={{ background: C.header, padding: "6px 8px" }}>
                    <span style={{ color: C.dim, fontWeight: "700", fontSize: "10px" }}>{h}</span>
                  </div>
                ))}
                {[
                  ["0x7FF6A000000", "0x7FF6A1FFFFF", "2 MB",   "Image",   "RX",  "C:\\Windows\\explorer.exe", C.green],
                  ["0x7FF8C000000", "0x7FF8C07FFFF", "512 KB", "Image",   "RX",  "C:\\Windows\\System32\\ntdll.dll", C.green],
                  ["0x7FF8A000000", "0x7FF8A1FFFFF", "2 MB",   "Image",   "RX",  "C:\\Windows\\System32\\kernel32.dll", C.green],
                  ["0x000001A00000", "0x000001BFFFFF","2 MB",   "Private", "RWX", "⚠ No backing file — EXECUTABLE heap (injected shellcode!)", C.red],
                  ["0x000001C00000", "0x000001C0FFFF","64 KB",  "Mapped",  "RW",  "Page file backed (anonymous mapped — injected DLL? pe-sieve check)", C.orange],
                  ["0x000001D00000", "0x000001D1FFFF","128 KB", "Private", "RW",  "Heap region (standard)", C.dim],
                  ["0x00007FF000000", "0x00007FFFFFFFF","128 MB","Private","RW",  "Stack (thread 0 main stack)", C.dim],
                ].map(([start, end, size, type, prot, note, c], i) => (
                  [start, end, size, type, prot, note].map((cell, j) => (
                    <div key={`${i}${j}`} style={{ background: c === C.red ? "#140808" : c === C.orange ? "#120d00" : i % 2 === 0 ? "#08090d" : C.panel, padding: "5px 8px", borderTop: `1px solid ${C.border}` }}>
                      <span style={{ color: j === 5 ? c : [C.yellow, C.yellow, C.dim, C.cyan, C.purple, C.dim][j], fontSize: "10.5px" }}>{cell}</span>
                    </div>
                  ))
                ))}
              </div>
              <div style={{ marginTop: "10px", color: C.dim, fontSize: "11px" }}>
                <strong style={{ color: C.red }}>⚠ IOC:</strong> Private RWX region with no backing file = injected shellcode or reflective DLL. Scan with <strong>pe-sieve</strong>, <strong>Moneta</strong>, or <strong>Hunt-Sleeping-Beacons</strong>. Sysmon Event 10 (OpenProcess) upstream event.
              </div>
            </div>
          )}
        </PB>

        {/* ── 7: Process Injection ── */}
        <PB title="PROCESS INJECTION — TECHNIQUES, DETECTION & IOCs" icon="💉" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["classic","CLASSIC INJECTION"],["advanced","ADVANCED / FILELESS"],["token","TOKEN & PRIVILEGE"]].map(([t, l]) => (
              <button key={t} style={S.tab(injTab === t, C.red)} onClick={() => setInjTab(t)}>{l}</button>
            ))}
          </div>
          <InjectionTech tab={injTab} />
        </PB>

        {/* ── 8 Security ── */}
        <PB title="SECURITY PERSPECTIVE" icon="🛡" color={C.orange} accent={C.orange + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["attack","defense","hardening"].map(t => (
              <button key={t} style={S.tab(secTab === t, C.orange)} onClick={() => setSecTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {secTab === "attack" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROCESS-LEVEL ATTACKS</div>
                {[
                  ["LSASS Memory Dump", "OpenProcess(PROCESS_VM_READ | PROCESS_QUERY_INFO, lsass_pid) → MiniDumpWriteDump() → offline NTLM hash extraction with mimikatz sekurlsa::minidump", C.red],
                  ["DLL Search Order Hijack", "Plant malicious DLL in application directory before legitimate DLL in search path. Process loads it with its own token privileges.", C.orange],
                  ["APC Injection", "QueueUserAPC() → kernel APC queued to target thread → executes in target process context when thread enters alertable wait. No new thread created.", C.yellow],
                  ["Atom Bombing", "GlobalAddAtom() stores shellcode in global atom table → target uses GlobalGetAtomName() → APCs force code execution. Bypasses code integrity checks.", C.purple],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#120808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TOKEN & PRIVILEGE ESCALATION</div>
                {[
                  ["PrintSpoofer / RoguePotato", "SeImpersonatePrivilege abuse. Service account → SYSTEM. Named pipe server + SYSTEM client → steal SYSTEM token. Works even in containers.", C.red],
                  ["God Mode via SE_DEBUG", "SeDebugPrivilege → OpenProcess(SYSTEM) → inject into winlogon.exe or lsass → SYSTEM shell without explicit UAC bypass needed.", C.orange],
                  ["Token Theft via Handles", "Find inherited or leaked SYSTEM-level process handle in a lower-priv process → DuplicateHandle + CreateProcessWithToken → new SYSTEM process.", C.yellow],
                  ["DKOM Process Hiding", "Kernel exploit → write EPROCESS.ActiveProcessLinks to unlink process from doubly-linked list → invisible to tasklist / Get-Process. Still in VAD map.", C.purple],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#120808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>🔥 {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secTab === "defense" && (
            <div style={S.grid2}>
              {[
                ["PPL for LSASS", "HKLM\\..\\LSA RunAsPPL=1 → lsass.exe runs as Protected Process Light. OpenProcess from non-PPL processes blocked even as SYSTEM. Blocks most LSASS dump tools.", C.green],
                ["Credential Guard", "VSM (Hyper-V) isolates LSASS into secure world. NTLM hash + Kerberos TGT not accessible from normal OS even with kernel exploit.", C.cyan],
                ["ACG (Arbitrary Code Guard)", "MitigationFlags per process. Blocks VirtualProtect(RWX) and VirtualAllocEx(RWX) in protected processes. Blocks most shellcode injection.", C.green],
                ["CIG (Code Integrity Guard)", "Only Microsoft-signed DLLs can be loaded into protected process. Blocks DLL injection of unsigned payload. Enabled in EDGE, Teams, etc.", C.cyan],
                ["Kernel Callbacks (EDR hooks)", "PsSetCreateProcessNotifyRoutine, PsSetLoadImageNotifyRoutine — EDRs monitor all process/DLL events at kernel. DKOM doesn't bypass these.", C.purple],
                ["ETW Thread Start Telemetry", "Microsoft-Windows-Threat-Intelligence ETW provider. Logs remote thread creation, APC injection, memory allocation patterns at kernel level.", C.orange],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {secTab === "hardening" && (
            <div style={S.code}>
{`# Enable PPL for LSASS:`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA`}
{`    /v RunAsPPL /t REG_DWORD /d 1 /f`}
{``}
{`# Enable Credential Guard:`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\LSA`}
{`    /v LsaCfgFlags /t REG_DWORD /d 1 /f`}
{``}
{`# Enable ACG for a process via GPO or code:`}
{`# SetProcessMitigationPolicy(ProcessDynamicCodePolicy, ...)`}
{``}
{`# Restrict who can open handles to lsass:`}
{`# Windows Defender Attack Surface Reduction Rule:`}
{`# "Block credential stealing from LSASS"`}
{`# GUID: 9e6c4e1f-7d60-472f-ba1a-a39ef669e4b0`}
{`Set-MpPreference -AttackSurfaceReductionRules_Ids `}
{`    9e6c4e1f-7d60-472f-ba1a-a39ef669e4b0 `}
{`    -AttackSurfaceReductionRules_Actions Enabled`}
{``}
{`# Enable SeDebugPrivilege audit (Event 4673):`}
{`auditpol /set /subcategory:"Sensitive Privilege Use"`}
{`          /success:enable /failure:enable`}
{``}
{`# Disable WDigest (prevents plaintext creds in LSASS):`}
{`reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest`}
{`    /v UseLogonCredential /t REG_DWORD /d 0 /f`}
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING & DETECTION" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","sysmon","tools","iocs"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div>
              <div style={S.grid2}>
                {[
                  ["4688", "Process created — includes: PID, PPID, token elevation type, command line (if audited), creator PID", C.cyan],
                  ["4689", "Process terminated — duration can be calculated with 4688 pair", C.dim],
                  ["4672", "Special privileges assigned at new logon — SeDebug, SeImpersonate, SeTcb", C.red],
                  ["4673", "Privileged service called — tracks privilege use (SeBackup, SeRestore, SeDebug)", C.orange],
                  ["4674", "Privilege use attempt on protected object", C.orange],
                  ["4648", "Explicit credential logon — RunAs, CreateProcessWithLogonW", C.yellow],
                  ["4624", "Successful logon — Type 2 (interactive), Type 3 (network), Type 9 (NewCredentials = RunAs), Type 10 (RemoteInteractive = RDP)", C.green],
                  ["4776", "NTLM credential validation — DC auth event (legacy protocol usage)", C.purple],
                ].map(([id, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                    <span style={{ ...S.badge(c), minWidth: "38px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={S.code}>
{`# Detect suspicious parent-child (4688):`}
{`Get-WinEvent -LogName Security | Where {$_.Id -eq 4688} |`}
{`  ForEach-Object {`}
{`    $e = [xml]$_.ToXml()`}
{`    $parent = $e.Event.EventData.Data | `}
{`      Where {$_.Name -eq "ParentProcessName"} | Select -Expand "#text"`}
{`    $child  = $e.Event.EventData.Data | `}
{`      Where {$_.Name -eq "NewProcessName"} | Select -Expand "#text"`}
{`    if ($parent -match "winword|excel|outlook" -and`}
{`        $child  -match "powershell|cmd|wscript") {`}
{`      [PSCustomObject]@{Time=$_.TimeCreated;Parent=$parent;Child=$child}`}
{`    }`}
{`  }`}
                </div>
              </div>
            </div>
          )}

          {monTab === "sysmon" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON PROCESS & INJECTION EVENTS</div>
              <div style={S.grid2}>
                {[
                  ["Event 1",  "Process Create — hashes, cmdline, PPID, integrity level, logon GUID", C.green],
                  ["Event 5",  "Process Terminated — PID + timestamp (pair with Event 1)", C.dim],
                  ["Event 8",  "CreateRemoteThread — source/target PID + start address. Primary injection detector.", C.red],
                  ["Event 10", "ProcessAccess — OpenProcess call with granted access mask. Catches LSASS dumpers.", C.red],
                  ["Event 17", "PipeEvent — named pipe created (PrintSpoofer detection)", C.orange],
                  ["Event 25", "ProcessTampering — process image changed (hollowing/herpaderping detection)", C.red],
                ].map(([id, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
                    <span style={{ ...S.badge(c), minWidth: "65px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={S.code}>
{`<!-- Sysmon: detect LSASS memory access (Event 10): -->`}
{`<ProcessAccess onmatch="include">`}
{`  <TargetImage condition="is">C:\\Windows\\System32\\lsass.exe</TargetImage>`}
{`  <GrantedAccess condition="contains">0x10</GrantedAccess>`}
{`</ProcessAccess>`}
{``}
{`<!-- Detect remote thread injection (Event 8): -->`}
{`<CreateRemoteThread onmatch="include">`}
{`  <SourceImage condition="is not">C:\\Windows\\System32\\svchost.exe</SourceImage>`}
{`  <TargetImage condition="is not">C:\\Windows\\System32\\svchost.exe</TargetImage>`}
{`</CreateRemoteThread>`}
{``}
{`<!-- Alert on process hollowing (Event 25): -->`}
{`<ProcessTampering onmatch="include" />`}
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["Process Explorer (Sysinternals)", "procexp.exe", "Deep process tree, token info, DLL list, handles, CPU/memory per thread, VirusTotal integration. Best Task Manager replacement.", C.cyan],
                ["Process Monitor (Sysinternals)", "procmon.exe", "Real-time process/file/registry/network event stream with filtering. Best for dynamic malware analysis.", C.green],
                ["PE-sieve", "pe-sieve32/64.exe --pid X", "Scans process memory for injected PE modules, shellcode, hooks. Compares memory vs disk. Finds reflective DLLs.", C.red],
                ["Moneta", "moneta64.exe --pid X", "Advanced memory scanner: finds private RWX regions, unbacked executable memory, IAT hooks in live process.", C.orange],
                ["Volatility 3 (memory forensics)", "vol -f mem.dmp pslist/pstree/malfind", "Offline memory analysis. Walks EPROCESS, VAD, finds injected code in dump. Gold standard for IR.", C.purple],
                ["Hunt-Sleeping-Beacons", "HSB.exe", "Finds C2 implants in memory during sleep phase by scanning for RWX memory + heap obfuscation patterns.", C.pink],
              ].map(([t, cmd, d, c]) => (
                <div key={t} style={{ background: "#09090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{t}</div>
                  <div style={{ color: C.dim, fontSize: "10px", fontStyle: "italic", marginBottom: "4px" }}>{cmd}</div>
                  <div style={{ color: C.text, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {monTab === "iocs" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PROCESS INJECTION / TOKEN THEFT IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["Private RWX memory region", "VAD region: Private + RWX + no file backing → shellcode / reflective DLL injected", C.red],
                  ["OpenProcess on lsass.exe", "Any process opening lsass.exe with PROCESS_VM_READ (0x10) outside of known tools → Sysmon Event 10", C.red],
                  ["CreateRemoteThread cross-process", "Thread created by process A in process B address space → Sysmon Event 8. Legitimate: debuggers only.", C.orange],
                  ["Process tree anomaly", "winword.exe → powershell.exe; svchost.exe → cmd.exe with unusual args; explorer.exe → rundll32 with network access", C.orange],
                  ["PPID inconsistency", "Child timestamp earlier than reported parent, or PPID = terminated process. Indicates PPID spoofing.", C.yellow],
                  ["Event 25 ProcessTampering", "Sysmon detects image change mid-execution — process hollowing / Herpaderping artifact. High fidelity signal.", C.red],
                  ["AdjustTokenPrivileges + SeDebug", "Non-system process enabling SeDebugPrivilege → Event 4673 → followed immediately by OpenProcess on SYSTEM process", C.orange],
                  ["Thread start address in anonymous region", "Thread with Win32StartAddress pointing into private heap or RWX region (not a loaded module) → injected thread", C.red],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#09090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PB>

        {/* ── 10: Windows vs Linux ── */}
        <PB title="WINDOWS vs LINUX — PROCESS MODEL COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["process","threads","security","ipc"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#00101a", border: `1px solid ${C.cyan}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.cyan, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS</div>
              {cmpTab === "process" && <>
                <KV k="Kernel object" v="EPROCESS (1700+ bytes, rich metadata)" kc={C.cyan} />
                <KV k="Process ID" v="HANDLE-based PID (multiple of 4)" kc={C.cyan} />
                <KV k="Address space" v="64-bit: 128 TB user + 128 TB kernel (VA split)" kc={C.cyan} />
                <KV k="Enumeration" v="Walk EPROCESS ActiveProcessLinks list" kc={C.cyan} />
                <KV k="Forking model" v="CreateProcess() — new process, no fork()" kc={C.cyan} />
                <KV k="Job objects" v="Windows Job = process group with shared limits" kc={C.cyan} />
              </>}
              {cmpTab === "threads" && <>
                <KV k="Kernel object" v="ETHREAD contains KTHREAD (scheduler unit)" kc={C.cyan} />
                <KV k="Stack size" v="1 MB default user stack, 12–24 KB kernel stack" kc={C.cyan} />
                <KV k="Fiber support" v="User-mode cooperative scheduling (fibers)" kc={C.cyan} />
                <KV k="TLS" v="TEB (Thread Environment Block) per thread" kc={C.cyan} />
                <KV k="Priority" v="0–31 levels; real-time 16–31 (no SCHED_RR needed)" kc={C.cyan} />
                <KV k="APC" v="Async Procedure Call — kernel & user APC queues" kc={C.cyan} />
              </>}
              {cmpTab === "security" && <>
                <KV k="Identity" v="Access Token (SID + groups + privileges)" kc={C.cyan} />
                <KV k="Integrity" v="Mandatory Integrity Control (Low/Med/High/System)" kc={C.cyan} />
                <KV k="Mitigations" v="DEP,ASLR,CFG,ACG,CIG,SEHOP per MitigationFlags" kc={C.cyan} />
                <KV k="Sandbox" v="AppContainer (UWP), Low integrity level" kc={C.cyan} />
                <KV k="Object ACL" v="Every process/thread has DACL (OpenProcess check)" kc={C.cyan} />
              </>}
              {cmpTab === "ipc" && <>
                <KV k="Named pipes" v="\\.\pipe\name — bidirectional, ACL controlled" kc={C.cyan} />
                <KV k="ALPC" v="Advanced Local Procedure Call — kernel IPC for subsystems" kc={C.cyan} />
                <KV k="Shared memory" v="CreateFileMapping + MapViewOfFile (section objects)" kc={C.cyan} />
                <KV k="COM/DCOM" v="Component Object Model — RPC-based inter-process calls" kc={C.cyan} />
                <KV k="WM_COPYDATA" v="Message-based IPC between GUI windows" kc={C.cyan} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a180a", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX</div>
              {cmpTab === "process" && <>
                <KV k="Kernel object" v="task_struct (~4KB, contains everything: thread + process)" kc={C.green} />
                <KV k="Process ID" v="PID (int, from PID namespace)" kc={C.green} />
                <KV k="Address space" v="mm_struct + VMA list (vm_area_struct red-black tree)" kc={C.green} />
                <KV k="Enumeration" v="Walk task_struct via init_task.tasks list" kc={C.green} />
                <KV k="Forking model" v="fork() clones task_struct with copy-on-write" kc={C.green} />
                <KV k="Process groups" v="cgroups for resource limits; pgroup/session IDs" kc={C.green} />
              </>}
              {cmpTab === "threads" && <>
                <KV k="Kernel object" v="task_struct (threads are processes with shared mm)" kc={C.green} />
                <KV k="Stack size" v="8 MB default user stack (ulimit -s), 16 KB kernel" kc={C.green} />
                <KV k="Fiber support" v="No kernel support; user-space coroutine libs (ucontext)" kc={C.green} />
                <KV k="TLS" v="Thread-local storage via __thread / TLS segment register" kc={C.green} />
                <KV k="Priority" v="nice values (-20 to +19); SCHED_FIFO/RR for real-time" kc={C.green} />
                <KV k="Signals" v="Unix signals — async notification (vs Windows APCs)" kc={C.green} />
              </>}
              {cmpTab === "security" && <>
                <KV k="Identity" v="UID/GID + supplementary groups (no SID)" kc={C.green} />
                <KV k="Integrity" v="No built-in MIC; SELinux/AppArmor provide MAC" kc={C.green} />
                <KV k="Mitigations" v="ASLR, SMEP, SMAP, PIE, stack canaries, seccomp" kc={C.green} />
                <KV k="Sandbox" v="seccomp-bpf (syscall filter), namespaces, cgroups" kc={C.green} />
                <KV k="Object ACL" v="No per-process DACL; proc_ptrace_access_ok() for ptrace" kc={C.green} />
              </>}
              {cmpTab === "ipc" && <>
                <KV k="Named pipes" v="FIFO (mkfifo) — unidirectional, file-based" kc={C.green} />
                <KV k="Unix sockets" v="AF_UNIX sockets — bidirectional, fast local IPC" kc={C.green} />
                <KV k="Shared memory" v="mmap(MAP_SHARED) or POSIX shm_open()" kc={C.green} />
                <KV k="D-Bus" v="Session bus for user IPC (DBus daemon)" kc={C.green} />
                <KV k="Signals" v="SIGTERM, SIGUSR1 etc. — limited data IPC" kc={C.green} />
              </>}
            </div>
          </div>
        </PB>

        {/* ── 11: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — C2 IMPLANT IN SVCHOST DETECTED" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: EDR Alerts on Anomalous svchost.exe Behavior — Process Injection Investigation
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ALERT CHAIN (SIEM / EDR)</div>
              <div style={S.code}>
{`[HIGH]  Sysmon Event 8 — CreateRemoteThread`}
{`  Source: rundll32.exe (PID 4488)`}
{`  Target: svchost.exe  (PID 1204)`}
{`  StartAddr: 0x00001A0000000 (private region!)`}
{``}
{`[HIGH]  Sysmon Event 10 — ProcessAccess`}
{`  Source: svchost.exe (PID 1204) ← injected`}
{`  Target: lsass.exe   (PID 900)`}
{`  Access: 0x1010 (VM_READ + QUERY_INFO)`}
{``}
{`[MED]   Sysmon Event 3 — Network Connection`}
{`  Process: svchost.exe (PID 1204)`}
{`  Dest:    185.220.101.x:443`}
{`  Note:    svchost → external IP = unusual!`}
{``}
{`[MED]   Event 4672 — SeDebugPrivilege used`}
{`  Subject: svchost.exe token`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ INVESTIGATION STEPS</div>
              <div style={S.code}>
{`# 1. Identify injected thread start address:`}
{`# pe-sieve — scan svchost PID 1204`}
{`pe-sieve64.exe --pid 1204 --out C:\\ir`}
{`# → reports: shellcode at 0x1A0000000 (private RWX)`}
{``}
{`# 2. Dump injected region:`}
{`# Moneta:`}
{`moneta64.exe --pid 1204 --dump C:\\ir\\svc_1204`}
{``}
{`# 3. Identify parent of rundll32 (injector):`}
{`Get-WmiObject Win32_Process `}
{`    -Filter "ProcessId=4488" | `}
{`    Select ParentProcessId,CommandLine`}
{`# → Parent: winword.exe (4104) ← phishing doc`}
{``}
{`# 4. Check svchost group (is it a known service?):`}
{`tasklist /svc /fi "PID eq 1204"`}
{`# → services: ← empty!  Not a real service group`}
{``}
{`# 5. Offline memory analysis:`}
{`vol3 -f svc_1204.dmp malfind`}
{`# → confirms Cobalt Strike beacon shellcode`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Kill Chain", "Phishing → winword macro → rundll32 injector → svchost beacon → LSASS dump → lateral movement", C.orange],
              ["Key Evidence", "Event 8 (injection), Event 10 (LSASS access), Event 3 (C2 comms), private RWX region in VAD, no service group in svchost", C.cyan],
              ["Remediation", "Isolate host → pull memory image → remove beacon → reset all credentials touched → hunt for lateral spread via same C2 infra", C.green],
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
              [C.green, "Process Security Baseline", [
                "Verify LSASS is PPL (RunAsPPL=1 in registry; confirms with Process Explorer — pink shield icon)",
                "Credential Guard active (VirtualizationBasedSecurity running in msinfo32)",
                "WDigest UseLogonCredential = 0 (no plaintext in LSASS memory)",
                "SeDebugPrivilege restricted — only SYSTEM/Administrators, not service accounts",
              ]],
              [C.cyan, "Monitoring Coverage", [
                "Process creation audit enabled + command line capture (Event 4688)",
                "Sysmon deployed with Event 8, 10, 25 rules active",
                "LSASS access alerting — any Event 10 with PROCESS_VM_READ on lsass → alert",
                "Parent-child process tree anomaly detection in SIEM (Office → PowerShell)",
              ]],
              [C.orange, "Injection Hardening", [
                "ACG + CIG enabled on browser processes (Edge default; configure custom apps via EMET/ProcessMitigations)",
                "Attack Surface Reduction rule: Block credential stealing from LSASS (enabled, not audit)",
                "AppLocker / WDAC restricts unsigned DLL loading in sensitive processes",
                "DKOM protection: Kernel patch guard (KPP) active on supported hardware",
              ]],
              [C.purple, "Forensic Readiness", [
                "Memory acquisition tool staged (WinPmem, DumpIt) for rapid IR",
                "pe-sieve and Moneta available for live process scan",
                "Volatility profiles for all OS versions in use pre-built",
                "Process baseline captured (normal svchost groups, expected modules per process)",
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
              ["EPROCESS = full process descriptor", "Every running process is a kernel EPROCESS object. Token, VAD, handles, threads, parent PID — all here. Rootkits target ActiveProcessLinks.", C.purple],
              ["Token = identity at runtime", "All access checks use the token. Steal it → become the user. PPL + Credential Guard are the primary defenses for the most valuable tokens (SYSTEM, lsass).", C.yellow],
              ["Process injection = EDR's hardest problem", "Injected code runs inside a legitimate process — inheriting its trust, token, and network identity. VAD scan + kernel callbacks + ETW ETWTI are the only reliable detectors.", C.red],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 05: Memory Management — Virtual Memory, Paging, Working Sets, Pool Allocator, Heap Exploitation & Forensics
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 04 Complete</Pill>
              <Pill c={C.purple}>12 Panels · Process Internals Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
