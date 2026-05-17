import { useState } from "react";

const C = {
  bg: "#07080c",
  panel: "#090b12",
  header: "#0c1018",
  border: "#18202e",
  cyan: "#00c8e8",
  green: "#00e07a",
  red: "#ff2a4a",
  orange: "#ff8c00",
  yellow: "#eec020",
  purple: "#8b5cf6",
  teal: "#00c8a8",
  pink: "#f43f8e",
  lime: "#90d030",
  sky: "#38bdf8",
  text: "#aab8c8",
  dim: "#48586a",
  bright: "#d8e8f4",
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
  code: { background: "#04050a", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "11px 13px", fontFamily: mono, fontSize: "11.5px", overflowX: "auto", whiteSpace: "pre", lineHeight: "1.75" },
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
    <span style={{ color: kc || C.teal, minWidth: "195px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span><span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── Virtual Address Space SVG ─────────────────────────────────────────────── */
const VASLayout = () => (
  <svg viewBox="0 0 760 540" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#48586a" fontSize="10" letterSpacing="2">WINDOWS x64 VIRTUAL ADDRESS SPACE (per-process, 128 TB user + 128 TB kernel)</text>

    {/* Left column: user space */}
    <text x="180" y="32" textAnchor="middle" fill="#00c8e8" fontSize="10" fontWeight="700" letterSpacing="1.5">USER MODE (0x0000 … 0x7FFF FFFFFFFF)</text>
    {[
      { label: "NULL / Reserved", addr: "0x0000000000000000", size: "64 KB", color: "#48586a", desc: "Catch NULL pointer dereferences" },
      { label: "Private Code/Data", addr: "0x0000000000010000", size: "varies", color: "#00c8e8", desc: "Process-specific heap, stack, data" },
      { label: "Shared DLL Region", addr: "0x00007FF000000000", size: "varies", color: "#00e07a", desc: "ntdll, kernel32 mapped shared (CoW)" },
      { label: "Stack (per thread)", addr: "grows downward ↓", size: "1 MB default", color: "#f43f8e", desc: "Each thread gets own stack VAD" },
      { label: "Process Heap(s)", addr: "dynamic allocation", size: "grows up ↑", color: "#ff8c00", desc: "Default heap + custom heaps" },
      { label: "Memory-Mapped Files", addr: "CreateFileMapping()", size: "file-size", color: "#8b5cf6", desc: "DLLs, data files, pagefile sections" },
      { label: "PEB / TEB", addr: "0x00007FF… (fixed)", size: "4 KB each", color: "#eec020", desc: "Process/Thread Env Blocks" },
    ].map(({ label, addr, size, color, desc }, i) => (
      <g key={label}>
        <rect x="10" y={44 + i * 66} width="340" height="58" rx="3" fill={`${color}0d`} stroke={`${color}44`} strokeWidth="1.5" />
        <rect x="10" y={44 + i * 66} width="4" height="58" rx="1" fill={color} />
        <text x="22" y={44 + i * 66 + 20} fill={color} fontSize="10.5" fontWeight="700">{label}</text>
        <text x="22" y={44 + i * 66 + 35} fill="#48586a" fontSize="9">{addr}</text>
        <text x="22" y={44 + i * 66 + 48} fill="#6a7a8c" fontSize="9">{desc}</text>
        <text x="340" y={44 + i * 66 + 20} textAnchor="end" fill={color} fontSize="9" fontWeight="600">{size}</text>
      </g>
    ))}

    {/* Divider */}
    <line x1="360" y1="28" x2="360" y2="512" stroke="#ffffff14" strokeWidth="1" strokeDasharray="5,4" />
    <text x="380" y="280" textAnchor="middle" fill="#ffffff14" fontSize="10" transform="rotate(-90,380,280)">─── KERNEL/USER BOUNDARY ───</text>

    {/* Right column: kernel space */}
    <text x="580" y="32" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="700" letterSpacing="1.5">KERNEL MODE (0xFFFF8000 … 0xFFFFFFFFFFFFFFFF)</text>
    {[
      { label: "System PTE Region", addr: "0xFFFFF680 00000000", size: "256 TB", color: "#8b5cf6", desc: "Page Table Entry mappings" },
      { label: "HAL & Kernel Image", addr: "0xFFFFF800 00000000", size: "varies", color: "#00c8e8", desc: "ntoskrnl.exe, hal.dll" },
      { label: "NonPaged Pool", addr: "dynamic, kernel alloc", size: "up to ~75% RAM", color: "#ff2a4a", desc: "Must stay in RAM. Driver/kernel allocs" },
      { label: "Paged Pool", addr: "dynamic, kernel alloc", size: "up to ~384 GB", color: "#ff8c00", desc: "Can be paged out. Kernel data structs" },
      { label: "System Cache", addr: "dynamic", size: "varies", color: "#00c8a8", desc: "File system cache (CcCached pages)" },
      { label: "Hyper Space", addr: "0xFFFFF880 00000000", size: "512 GB", color: "#f43f8e", desc: "Working set lists, PFN mapping" },
      { label: "Session Space", addr: "per logon session", size: "varies", color: "#eec020", desc: "Win32k.sys, session paged pool" },
    ].map(({ label, addr, size, color, desc }, i) => (
      <g key={label}>
        <rect x="400" y={44 + i * 66} width="350" height="58" rx="3" fill={`${color}0d`} stroke={`${color}44`} strokeWidth="1.5" />
        <rect x="746" y={44 + i * 66} width="4" height="58" rx="1" fill={color} />
        <text x="412" y={44 + i * 66 + 20} fill={color} fontSize="10.5" fontWeight="700">{label}</text>
        <text x="412" y={44 + i * 66 + 35} fill="#48586a" fontSize="9">{addr}</text>
        <text x="412" y={44 + i * 66 + 48} fill="#6a7a8c" fontSize="9">{desc}</text>
        <text x="742" y={44 + i * 66 + 20} textAnchor="end" fill={color} fontSize="9" fontWeight="600">{size}</text>
      </g>
    ))}

    <text x="380" y="530" textAnchor="middle" fill="#48586a" fontSize="9">Canonical address hole: 0x0000800000000000 – 0xFFFF7FFFFFFFFFFF (non-canonical, causes #GP fault if accessed)</text>
  </svg>
);

/* ── Paging / Translation SVG ──────────────────────────────────────────────── */
const PagingDiagram = () => (
  <svg viewBox="0 0 760 360" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#48586a" fontSize="10" letterSpacing="2">4-LEVEL PAGE TABLE WALK — x64 48-bit VA → 52-bit PA (Windows default, no LA57)</text>

    {/* VA breakdown */}
    <rect x="10" y="24" width="740" height="44" rx="3" fill="#090b12" stroke="#00c8e844" strokeWidth="1.5" />
    <text x="380" y="40" textAnchor="middle" fill="#00c8e8" fontSize="10" fontWeight="700">64-BIT VIRTUAL ADDRESS</text>
    {[
      { label: "Sign Ext [63:48]", bits: "16 bits", color: "#48586a", x: 10, w: 80 },
      { label: "PML4 Index [47:39]", bits: "9 bits", color: "#8b5cf6", x: 92, w: 120 },
      { label: "PDPT Index [38:30]", bits: "9 bits", color: "#00c8e8", x: 214, w: 120 },
      { label: "PD Index [29:21]", bits: "9 bits", color: "#00e07a", x: 336, w: 110 },
      { label: "PT Index [20:12]", bits: "9 bits", color: "#ff8c00", x: 448, w: 110 },
      { label: "Page Offset [11:0]", bits: "12 bits", color: "#eec020", x: 560, w: 190 },
    ].map(({ label, bits, color, x, w }) => (
      <g key={label}>
        <rect x={x} y="50" width={w - 2} height="14" rx="1" fill={`${color}33`} stroke={`${color}66`} strokeWidth="1" />
        <text x={x + (w - 2) / 2} y="61" textAnchor="middle" fill={color} fontSize="8.5" fontWeight="700">{label}</text>
      </g>
    ))}

    {/* Walk steps */}
    {[
      { level: "CR3", label: "PML4 Table", desc: "CR3 register holds physical addr of PML4 table (per-process). 512 entries × 8 bytes = 4KB page.", color: "#8b5cf6", x: 10, y: 80 },
      { level: "PML4E", label: "PDPT Table", desc: "PML4 entry → physical addr of PDPT table. Present bit, R/W, U/S, XD (Execute-Disable) flags checked.", color: "#00c8e8", x: 200, y: 140 },
      { level: "PDPTE", label: "Page Dir Table", desc: "PDPT entry → physical addr of PD table. Can be 1GB large page (PDPTE bit 7 set).", color: "#00e07a", x: 390, y: 200 },
      { level: "PDE", label: "Page Table", desc: "PD entry → physical addr of PT table. Can be 2MB large page (PDE bit 7 set). Usually 4KB.", color: "#ff8c00", x: 580, y: 260 },
    ].map(({ level, label, desc, color, x, y }) => (
      <g key={level}>
        <rect x={x} y={y} width="165" height="56" rx="3" fill={`${color}0c`} stroke={`${color}55`} strokeWidth="1.5" />
        <text x={x + 10} y={y + 18} fill={color} fontSize="10" fontWeight="700">{level} → {label}</text>
        <text x={x + 10} y={y + 32} fill="#48586a" fontSize="8.5">{desc.slice(0, 55)}</text>
        <text x={x + 10} y={y + 44} fill="#48586a" fontSize="8.5">{desc.slice(55)}</text>
      </g>
    ))}

    {/* Final PTE */}
    <rect x="10" y="310" width="740" height="42" rx="3" fill="#eec0200c" stroke="#eec02055" strokeWidth="1.5" />
    <text x="380" y="326" textAnchor="middle" fill="#eec020" fontSize="10" fontWeight="700">PTE (Page Table Entry) → Physical Frame Number + Page Offset = Physical Address</text>
    <text x="380" y="342" textAnchor="middle" fill="#48586a" fontSize="9">PTE flags: Present(P) | R/W | User/Supervisor | WriteThrough | CacheDisable | Accessed | Dirty | PAT | Global | NX/XD | Protection Key</text>

    {/* TLB note */}
    <rect x="580" y="88" width="170" height="48" rx="3" fill="#f43f8e0c" stroke="#f43f8e44" strokeWidth="1.5" />
    <text x="665" y="104" textAnchor="middle" fill="#f43f8e" fontSize="10" fontWeight="700">TLB Cache</text>
    <text x="665" y="118" textAnchor="middle" fill="#48586a" fontSize="8.5">Caches recent VA→PA translations</text>
    <text x="665" y="130" textAnchor="middle" fill="#48586a" fontSize="8.5">INVLPG / CR3 reload flushes TLB</text>

    {/* Arrows */}
    {[[168, 170, 200, 168], [358, 228, 390, 228], [548, 288, 580, 288]].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff18" strokeWidth="1.5" markerEnd="url(#arr)" strokeDasharray="4,3" />
    ))}
  </svg>
);

/* ── Pool Allocator Layout ─────────────────────────────────────────────────── */
const PoolLayout = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NONPAGED POOL — Never swapped to disk</div>
        <div style={S.code}>
{`POOL_HEADER (8 bytes per allocation):`}
{`  PreviousSize : USHORT  — prev block size (in pool blocks)`}
{`  PoolIndex    : UCHAR   — index into pool descriptor array`}
{`  BlockSize    : UCHAR   — this block size (in 8-byte units)`}
{`  PoolType     : USHORT  — NonPagedPool / PagedPool / etc.`}
{`  PoolTag      : ULONG   — 4-char ASCII tag (e.g. 'Proc','File')`}
{``}
{`Pool tags (common):`}
{`  'Proc' → EPROCESS allocation`}
{`  'Thre' → ETHREAD allocation`}
{`  'File' → FILE_OBJECT`}
{`  'MmSt' → VAD node`}
{`  'Driv' → DRIVER_OBJECT`}
{`  'IoCo' → IRP completion port`}
{``}
{`# Inspect pool tags live (WinDbg):`}
{`!poolused 2       ; sorted by tag, nonpaged only`}
{`!poolfind Proc 0  ; find all 'Proc' allocs`}
{`!pool <address>   ; examine specific pool block`}
        </div>
      </div>
      <div>
        <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PAGED POOL — Can be paged out to disk</div>
        <div style={{ background: "#0d0a08", border: `1px solid ${C.orange}22`, borderRadius: "4px", padding: "10px", marginBottom: "10px" }}>
          <KV k="Max size" v="Up to ~384 GB on modern Windows" kc={C.orange} />
          <KV k="Typical contents" v="Registry data, file name buffers, driver data structures" kc={C.orange} />
          <KV k="Cannot hold" v="DPC routines, ISR code, anything accessed at IRQL ≥ DISPATCH" kc={C.orange} />
          <KV k="Pool tag tracking" v="Same POOL_HEADER format. !poolused 4 in WinDbg" kc={C.orange} />
        </div>
        <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SEGMENT HEAP (Windows 10+)</div>
        <div style={{ background: "#0c0910", border: `1px solid ${C.purple}22`, borderRadius: "4px", padding: "10px" }}>
          <Row c={C.purple}>Windows 10+ replaced legacy NT Heap with <strong style={{color:C.bright}}>Segment Heap</strong> for user-mode apps (opt-in, or Edge/Chromium default).</Row>
          <Row c={C.purple}>Uses <strong style={{color:C.bright}}>backend (large allocs) + VS segments (variable-size) + Low-Frag Heap buckets</strong>. Metadata randomisation makes pool overflows harder.</Row>
          <Row c={C.purple}><strong style={{color:C.bright}}>Safe unlinking, pointer encoding (heap cookie XOR)</strong> — classic heap spray and unlink attacks mostly mitigated.</Row>
        </div>
      </div>
    </div>
  </div>
);

/* ── Page Frame Number Database ────────────────────────────────────────────── */
const PFNDatabase = () => (
  <div>
    <div style={{ color: C.sky, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PFN DATABASE — MMPFN structure (per physical page)</div>
    <div style={S.grid2}>
      <div style={S.code}>
{`_MMPFN structure fields:`}
{`  u1.Flink       ULONG   — Free/Standby list flink`}
{`  u2.ShareCount  USHORT  — # PTEs pointing to this frame`}
{`  u3.e1          struct`}
{`    .PageLocation UCHAR  — state (see below)`}
{`    .Modified     UCHAR  — page is dirty`}
{`    .ReadInProgress UCHAR — I/O in flight`}
{`  PteAddress     PMMPTE  → PTE that maps this frame`}
{`  u4.PteFrame    ULONG   — PFN of page table page`}
{``}
{`Page states (PageLocation):`}
{`  0 = Active/Valid  (mapped in a working set)`}
{`  1 = Transition    (being evicted)`}
{`  2 = Standby       (clean, reclaimable)`}
{`  3 = Modified      (dirty, awaiting write)`}
{`  4 = ModifiedNoWrite`}
{`  5 = BadMemory     (hardware error)`}
{`  6 = Free          (zeroed candidate)`}
{`  7 = Zero          (ready to use)`}
      </div>
      <div>
        <div style={{ color: C.sky, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PAGE STATE TRANSITIONS</div>
        <svg viewBox="0 0 340 240" style={{ width: "100%", maxWidth: "340px" }}>
          {[
            { label: "Zero", color: "#00e07a", x: 130, y: 20, desc: "Ready" },
            { label: "Free", color: "#00c8e8", x: 20, y: 90, desc: "Untracked" },
            { label: "Active", color: "#8b5cf6", x: 220, y: 90, desc: "In use" },
            { label: "Standby", color: "#ff8c00", x: 20, y: 175, desc: "Clean,reuse" },
            { label: "Modified", color: "#ff2a4a", x: 220, y: 175, desc: "Dirty" },
          ].map(({ label, color, x, y, desc }) => (
            <g key={label}>
              <rect x={x} y={y} width="90" height="36" rx="4" fill={`${color}18`} stroke={`${color}66`} strokeWidth="1.5" />
              <text x={x + 45} y={y + 15} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{label}</text>
              <text x={x + 45} y={y + 28} textAnchor="middle" fill="#48586a" fontSize="8.5">{desc}</text>
            </g>
          ))}
          {/* Arrows */}
          {[
            [175, 38, 265, 90, "fault"],
            [110, 56, 65, 90, "zero"],
            [265, 126, 265, 175, "modified"],
            [220, 193, 110, 193, "writeback"],
            [20, 175, 20, 126, "reclaim"],
            [65, 193, 220, 90, "re-use"],
          ].map(([x1, y1, x2, y2, lbl], i) => (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff18" strokeWidth="1" strokeDasharray="3,2" />
              <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 3} fill="#48586a" fontSize="8">{lbl}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  </div>
);

/* ── Working Set Panel ─────────────────────────────────────────────────────── */
const WorkingSetPanel = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WORKING SET CONCEPTS</div>
        <Row c={C.teal}><strong style={{color:C.bright}}>Working Set (WS)</strong> = the set of virtual pages currently mapped in physical RAM for a process. Pages outside WS are in pagefile or zero/free lists.</Row>
        <Row c={C.teal}>Windows trims working sets when physical memory pressure is high. The <strong style={{color:C.bright}}>Working Set Manager</strong> (Balance Set Manager thread in System process) does this.</Row>
        <Row c={C.teal}>Each process has <strong style={{color:C.bright}}>minimum WS</strong> (guaranteed) and <strong style={{color:C.bright}}>maximum WS</strong> (soft cap). Hard WS limit enforced with <code style={{color:C.cyan}}>SetProcessWorkingSetSize()</code>.</Row>
        <Row c={C.teal}><strong style={{color:C.bright}}>Soft page faults</strong> (page in standby list, just map it) vs <strong style={{color:C.bright}}>hard page faults</strong> (disk read needed) — hard faults cause I/O and are visible in Performance Monitor as Page Faults/sec.</Row>
      </div>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WORKING SET MONITORING</div>
        <div style={S.code}>
{`# Process working set size (KB):`}
{`PS> Get-Process | Select Name,Id,`}
{`    WorkingSet64,PeakWorkingSet64,`}
{`    PagedMemorySize64,VirtualMemorySize64`}
{``}
{`# System-wide memory pressure:`}
{`PS> Get-WmiObject Win32_OperatingSystem |`}
{`    Select FreePhysicalMemory,`}
{`    TotalVisibleMemorySize,`}
{`    FreeVirtualMemory`}
{``}
{`# Performance counter: hard faults:`}
{`PS> (Get-Counter "\\Memory\\Page Faults/sec").CounterSamples`}
{``}
{`# WinDbg: inspect process working set:`}
{`!wsle <process> ; working set list entries`}
{`!memusage       ; system-wide memory summary`}
{`!vm             ; virtual memory stats`}
        </div>
      </div>
    </div>
  </div>
);

/* ── Heap Layout ───────────────────────────────────────────────────────────── */
const HeapLayout = () => (
  <svg viewBox="0 0 760 320" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#48586a" fontSize="10" letterSpacing="2">USER-MODE HEAP ARCHITECTURE (NT Heap + Low Frag Heap)</text>

    {/* NT Heap header */}
    <rect x="10" y="24" width="360" height="280" rx="4" fill="#08090d" stroke="#ff8c0033" strokeWidth="1.5" />
    <text x="190" y="42" textAnchor="middle" fill="#ff8c00" fontSize="11" fontWeight="700">NT HEAP (legacy, pre-Win10 default)</text>

    {[
      { label: "HEAP structure header", color: "#ff8c00", desc: "Signature, Flags, TotalFreeSize, VirtualAllocdBlocks, FreeList[128], LookasideLists, LargeBlocksIndex", h: 60, y: 52 },
      { label: "Heap Segment (HEAP_SEGMENT)", color: "#eec020", desc: "Contiguous virtual memory. Header tracks first/last entry, uncommitted range, first free entry.", h: 50, y: 118 },
      { label: "Free Blocks (HEAP_FREE_ENTRY)", color: "#00e07a", desc: "Doubly-linked free list per bucket size. FreeList[n] for sizes 8n bytes. Classic overflow target.", h: 50, y: 174 },
      { label: "Busy Blocks (HEAP_ENTRY)", color: "#00c8e8", desc: "Size|PreviousSize|Flags|SmallTagIndex|Unused. Heap cookie XOR protects metadata on Vista+.", h: 50, y: 230 },
      { label: "Lookaside Lists (per-thread)", color: "#f43f8e", desc: "Singly-linked per-thread free lists for 8–256 byte allocs. Fast path bypasses global locks.", h: 44, y: 266 },
    ].map(({ label, color, desc, h, y }) => (
      <g key={label}>
        <rect x="16" y={y} width="348" height={h} rx="2" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1" />
        <rect x="16" y={y} width="3" height={h} rx="1" fill={color} />
        <text x="26" y={y + 18} fill={color} fontSize="10" fontWeight="700">{label}</text>
        <text x="26" y={y + 33} fill="#48586a" fontSize="8.5">{desc.slice(0, 65)}</text>
        {desc.length > 65 && <text x="26" y={y + 46} fill="#48586a" fontSize="8.5">{desc.slice(65)}</text>}
      </g>
    ))}

    {/* LFH */}
    <rect x="390" y="24" width="360" height="280" rx="4" fill="#08090d" stroke="#8b5cf633" strokeWidth="1.5" />
    <text x="570" y="42" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="700">LOW FRAGMENTATION HEAP (LFH)</text>

    {[
      { label: "LFH Subsegment (per size bucket)", color: "#8b5cf6", desc: "LFH activates after 18 same-size allocs in a NT Heap bucket. Manages 128 size classes (8–16384 bytes).", h: 60, y: 52 },
      { label: "Bitmap-based free tracking", color: "#00c8a8", desc: "Each subsegment uses a bitmap to track free slots. Randomised selection of free slot (ASLR-like). Defeats deterministic spraying.", h: 60, y: 118 },
      { label: "UserBlock (HEAP_USERDATA_HEADER)", color: "#00c8e8", desc: "Contiguous array of same-size blocks. BusyBitmap shows which slots are in use. Slot index is randomised on alloc.", h: 50, y: 184 },
      { label: "No adjacent free list coalescing", color: "#ff8c00", desc: "LFH does NOT coalesce adjacent free blocks → classic overflow into free list metadata doesn't work directly.", h: 50, y: 240 },
      { label: "Heap Cookie / Encoding", color: "#ff2a4a", desc: "HEAP_ENTRY.Size XOR with heap cookie. Tampering detected on free/alloc → Exception raised → crash-on-corrupt.", h: 44, y: 296 },
    ].map(({ label, color, desc, h, y }) => (
      <g key={label}>
        <rect x="396" y={y} width="348" height={h} rx="2" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1" />
        <rect x="393" y={y} width="3" height={h} rx="1" fill={color} />
        <text x="404" y={y + 18} fill={color} fontSize="10" fontWeight="700">{label}</text>
        <text x="404" y={y + 33} fill="#48586a" fontSize="8.5">{desc.slice(0, 65)}</text>
        {desc.length > 65 && <text x="404" y={y + 46} fill="#48586a" fontSize="8.5">{desc.slice(65)}</text>}
      </g>
    ))}
  </svg>
);

/* ── Memory Workflow ───────────────────────────────────────────────────────── */
const MemWorkflow = () => {
  const steps = [
    { id: "01", label: "malloc() / HeapAlloc() called", sub: "C runtime → ntdll RtlAllocateHeap()", color: C.green, detail: "Size requested. CRT (ucrtbase.dll) may batch multiple mallocs before calling kernel. Small allocs (<16KB) serviced from process heap without syscall." },
    { id: "02", label: "RtlAllocateHeap checks LFH bucket", sub: "Size ≤ 16KB and LFH active for this bucket", color: C.teal, detail: "LFH: find active subsegment for size class. Pick random free slot from UserBlock bitmap. Update BusyBitmap. Return pointer. Zero syscalls." },
    { id: "03", label: "NT Heap fallback (large or new segment)", sub: "RtlpAllocateHeapInternal → segment management", color: C.cyan, detail: "If LFH not active: walk FreeList[size_bucket]. If no free block: allocate new segment via NtAllocateVirtualMemory." },
    { id: "04", label: "NtAllocateVirtualMemory syscall", sub: "Ring 0 Memory Manager — MmAllocateVirtualMemory()", color: C.purple, detail: "MEM_RESERVE creates VAD node (red-black tree entry). MEM_COMMIT marks PTEs as demand-zero. No physical pages assigned yet." },
    { id: "05", label: "First access triggers page fault (#PF)", sub: "CPU exception → KiPageFault → MmAccessFault()", color: C.orange, detail: "PTE is demand-zero (not Present). Memory Manager checks VAD: access valid? Then assigns physical page from Zero page list. Fills PTE. Returns to faulting instruction." },
    { id: "06", label: "Physical page assigned from PFN database", sub: "MiGetPage() → dequeues zero page", color: C.yellow, detail: "Zero page selected (MmZeroPageListHead). PFN entry updated (Active state, PTE back-pointer). TLB not yet updated — next access hits TLB." },
    { id: "07", label: "Working set updated", sub: "MiAddValidPageToWorkingSet()", color: C.teal, detail: "Page added to process Working Set List (MMWSLE entries). Working set size incremented. If at maximum WS → trim older pages (soft fault next access)." },
    { id: "08", label: "HeapFree() → RtlFreeHeap()", sub: "Returns block to LFH bitmap or NT FreeList", color: C.green, detail: "LFH: clear BusyBitmap bit. NT Heap: coalesce adjacent free blocks, return to FreeList[n]. Physical pages may stay (working set) until memory pressure triggers trim." },
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

/* ── Exploit Techniques ────────────────────────────────────────────────────── */
const ExploitPanel = ({ tab }) => {
  const data = {
    heap: [
      { name: "Heap Buffer Overflow (NT Heap)", color: C.red,
        steps: ["Overflow busy heap block → overwrite adjacent HEAP_ENTRY header (size, flags)", "Heap cookie bypass: leak or brute-force XOR cookie value", "Corrupt FreeList[n] Flink/Blink → arbitrary write on next free/alloc", "On Vista+: safe unlinking checks — need HEAP_ENTRY encoding bypass first"],
        detect: "Application Verifier heap page heap mode. PageHeap (gflags +hpa) places guard page after every alloc. ETW heap events. ASAN build.", ioc: "Crash in RtlpFreeHeap / unhandled exception in heap validation — check for preceding write-past-end pattern." },
      { name: "Pool Overflow (Kernel NonPaged)", color: C.orange,
        steps: ["Kernel driver writes beyond allocated pool block", "Overwrites adjacent pool header (tag, size, type)", "Classic: corrupt POOL_HEADER.BlockSize → next free causes bad unlink → arbitrary write", "Modern: Segment Heap in kernel (Win10 20H1+) replaced legacy pool — different exploitation path"],
        detect: "Driver Verifier (/flags 0x9 for pool checking). Special Pool (allocates page-aligned, guard page after). ETW KernelTraceControl pool events.", ioc: "BSOD 0xC2 (BAD_POOL_CALLER), 0x19 (BAD_POOL_HEADER), 0xD1 (DRIVER_IRQL_NOT_LESS_OR_EQUAL)" },
      { name: "Use-After-Free (Heap UAF)", color: C.purple,
        steps: ["Object freed but stale pointer retained", "Attacker fills freed slot with controlled data (heap spray)", "Victim code dereferences stale pointer → reads/writes attacker-controlled object", "Exploit virtual function table (vtable) overwrite via UAF for code execution"],
        detect: "AddressSanitizer (ASAN) in build. Application Verifier 'Heaps' check zeroes freed memory. Windows 10 RS4+: delayed free (deferred frees poison freed blocks).", ioc: "Exception on access of freed address. Pattern: object freed → Alloc of same size → overwrite vtable → virtual call" },
    ],
    bypass: [
      { name: "ASLR Bypass — Partial Overwrite", color: C.red,
        steps: ["ASLR randomises base addresses at boot (image ASLR) or per-alloc (heap/stack)", "If info leak gives partial address: overwrite lowest 12 bits (page offset — never randomised)", "Force re-use of same page: partial pointer overwrite within same page works deterministically", "Brute force (32-bit only): ~256 positions, 1/256 per try — not practical on 64-bit (full 8 bytes random)"],
        detect: "ASLR effectiveness verified by checking process base each run (should differ). ETW image load events with base addresses.", ioc: "Repeated crash with same offset but varying targets = brute-force attempt" },
      { name: "DEP / NX Bypass — ROP Chains", color: C.orange,
        steps: ["DEP marks heap/stack Non-Executable (NX bit in PTE)", "ROP: chain existing code gadgets (ret instructions) already in executable memory", "VirtualProtect() ROP chain: call existing API to mark shellcode page RWX", "JIT spray: trigger JIT compiler to emit attacker-controlled instructions in JIT (executable) memory region"],
        detect: "CET (Control-flow Enforcement Technology) on Intel 11th Gen+: Shadow Stack tracks return addresses separately. CFG validates indirect call targets.", ioc: "Stack containing only return addresses (gadget chain). Memory address of shellcode was previously W, now X." },
      { name: "Kernel SMEP/SMAP Bypass", color: C.purple,
        steps: ["SMEP: CPU blocks kernel from executing user-mode pages (CR4.SMEP bit)", "SMEP bypass: ROP in kernel space, then overwrite CR4 to disable SMEP, then jump to user shellcode", "SMAP: CPU blocks kernel from reading user-mode pages at IRQL >= APC_LEVEL", "Spectre/Meltdown: side-channel — read kernel memory from user mode via timing of cache hits"],
        detect: "Hypervisor-Protected Code Integrity (HVCI) in kernel: VBS enforces CR4.SMEP cannot be cleared even by kernel. KPP protects CR4.", ioc: "BSOD immediately after SMEP bypass (if partial). CR4 modification in kernel without VBS = rootkit indicator." },
    ],
    forensics: [
      { name: "Heap Spray Detection", color: C.cyan,
        steps: ["Attacker fills large memory range with NOP sled + shellcode (spray)", "Goal: any wild pointer dereference hits spray → shellcode executes", "Modern heap spray: fill LFH buckets of specific size with fake objects", "Detection: scan process memory for high-entropy regions or NOP sled patterns (0x90909090)"],
        detect: "PE-sieve: scans for suspicious memory regions. EMET/Windows Defender ExploitGuard: EAF (Export Address Table Filtering) and SimExecFlow.", ioc: "Large private committed memory with no backing file. Uniform byte patterns in heap. RWX permission on heap region." },
      { name: "Pool Tag Memory Forensics", color: C.green,
        steps: ["Every kernel pool allocation carries a 4-byte tag in POOL_HEADER", "Malware often uses fake tags or reuses legitimate tags to blend in", "Forensic tool scans memory dump for POOL_HEADER signatures: look for 'unusual' tags", "Pool tag gap analysis: known-good system has expected tag distribution — outliers = malware"],
        detect: "Volatility 3: windows.poolscanner.PoolScanner — scans memory for pool objects by signature+tag. Finds hidden EPROCESS, ETHREAD, DRIVERs.", ioc: "EPROCESS with custom pool tag or mismatched VadRoot/token structure. Driver with no DRIVER_OBJECT in PsLoadedModuleList." },
    ]
  };
  const items = data[tab] || [];
  return (
    <div>
      {items.map(item => (
        <div key={item.name} style={{ background: "#08090d", border: `1px solid ${item.color}33`, borderRadius: "5px", padding: "14px", marginBottom: "12px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ color: item.color, fontWeight: "800", fontSize: "13px" }}>{item.name}</span>
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: item.color, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ HOW IT WORKS</div>
              {item.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
                  <span style={{ color: item.color, fontSize: "10px", minWidth: "16px", fontWeight: "700" }}>{i + 1}.</span>
                  <span style={{ color: C.dim, fontSize: "11px" }}>{s}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ DETECTION / MITIGATION</div>
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

export default function WindowsStep05() {
  const [archTab, setArchTab] = useState("vas");
  const [intTab,  setIntTab]  = useState("pool");
  const [secTab,  setSecTab]  = useState("attack");
  const [expTab,  setExpTab]  = useState("heap");
  const [monTab,  setMonTab]  = useState("counters");
  const [cmpTab,  setCmpTab]  = useState("vm");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.sky, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 05 · MEMORY ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.sky), background: "linear-gradient(135deg, #090b12 55%, #001828)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 05</div>
                <div style={{ color: C.sky, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Memory Management</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>Virtual Memory · Paging · Pool Allocator · Heap Architecture · Exploit Mitigations · Forensics</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The engine underneath every process — and the primary surface for kernel and user-mode exploitation</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: ADVANCED → EXPERT</Pill>
                <Pill c={C.sky}>DOMAIN: OS INTERNALS / EXPLOIT DEV / FORENSICS</Pill>
                <Pill c={C.purple}>MODULE 05 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Kernel Dev","Exploit Dev","DFIR","Malware Analyst","EDR Engineer","Vulnerability Researcher","SOC L3","Security Architect"].map(r => (
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
              <Row c={C.green}>Every process thinks it has its own giant private address space — <strong style={{color:C.bright}}>virtual memory</strong>. It can't see other processes' memory. This is an illusion created by the CPU + OS working together.</Row>
              <Row c={C.green}>Think of it as a <strong style={{color:C.bright}}>library card system</strong>: each reader (process) gets a catalogue (virtual addresses) listing books (data). The librarian (Memory Manager) fetches the actual book from shelves (RAM) or storage (pagefile) on demand.</Row>
              <Row c={C.green}>If you access a page not in RAM, a <strong style={{color:C.bright}}>page fault</strong> occurs — the OS pauses your program, fetches the data from disk or zero-fills a new page, and resumes. This is transparent to your code.</Row>
              <Row c={C.green}>The <strong style={{color:C.bright}}>heap</strong> is the dynamic memory region processes use for malloc/new. The kernel has its own <strong style={{color:C.bright}}>pool allocator</strong> for driver/kernel object allocations.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>Windows x64 uses a <strong style={{color:C.bright}}>4-level page table hierarchy</strong> (PML4 → PDPT → PD → PT → physical frame). Each level is a 4KB page of 512 eight-byte entries. CR3 register holds the PML4 physical address per-process (loaded on context switch).</Row>
              <Row c={C.purple}>The <strong style={{color:C.bright}}>Memory Manager</strong> (part of the NT Executive) manages: virtual address allocation (VAD tree), physical page tracking (PFN database), working set management, pagefile I/O, and pool allocators.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>NonPaged Pool</strong> (must stay in RAM — used at IRQL ≥ DISPATCH_LEVEL) vs <strong style={{color:C.bright}}>Paged Pool</strong> (can be swapped — used at IRQL &lt; DISPATCH_LEVEL). Tagged allocations with 4-byte ASCII tags (ExAllocatePoolWithTag).</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>ASLR, DEP/NX, CFG, CET, HVCI</strong> are all memory-based exploit mitigations. Understanding the Memory Manager is prerequisite to understanding how modern exploitation bypasses these controls.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["Virtual ≠ Physical", "128 TB VA space per process, but physical RAM is shared. MM maps pages on demand via PFN database + pagefile.", C.cyan],
              ["Page fault = normal", "Most first accesses to committed pages cause a soft/hard fault. Not an error — it's how demand-paging works.", C.green],
              ["Pool tags = forensic fingerprints", "Every kernel allocation tagged with 4 chars. Malware leaves its tags in memory. Volatility scans these to find hidden objects.", C.yellow],
              ["ASLR/DEP/CFG/CET chain", "Each mitigation closes one bypass vector. Attackers chain info-leak + ROP + CFG bypass + SMEP bypass to reach code exec.", C.red],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture ── */}
        <PB title="MEMORY ARCHITECTURE — VAS · PAGING · HEAP · PFN" icon="🗜" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["vas","VA SPACE LAYOUT"],["paging","PAGE TABLE WALK"],["heap","HEAP ARCHITECTURE"],["pfn","PFN DATABASE"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "vas"    && <VASLayout />}
          {archTab === "paging" && <PagingDiagram />}
          {archTab === "heap"   && <HeapLayout />}
          {archTab === "pfn"    && <PFNDatabase />}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — MEMORY ALLOCATION INTERNAL CHAIN" icon="⚙" color={C.orange}>
          <MemWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Performance insight:</strong> Steps 1–2 (LFH fast path) involve <strong style={{color:C.bright}}>zero syscalls</strong>. The entire allocation is served from thread-local structures. Steps 3–7 involve syscalls and potential I/O. This is why HeapAlloc performance degrades under memory pressure — more hard faults, more I/O wait.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL / WINDBG — MEMORY OPERATIONS" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ LIVE MEMORY ANALYSIS</div>
              <div style={S.code}>
{`# System memory summary:`}
{`PS> Get-WmiObject Win32_OperatingSystem |`}
{`    Select TotalVisibleMemorySize,`}
{`    FreePhysicalMemory,TotalVirtualMemorySize`}
{``}
{`# Per-process memory breakdown:`}
{`PS> Get-Process | Sort-Object WorkingSet64 -Desc`}
{`    | Select -First 15 Name,Id,`}
{`      @{N="WS(MB)";E={[math]::Round($_.WorkingSet64/1MB,1)}},`}
{`      @{N="Private(MB)";E={[math]::Round($_.PrivateMemorySize64/1MB,1)}},`}
{`      @{N="Virtual(MB)";E={[math]::Round($_.VirtualMemorySize64/1MB,1)}}`}
{``}
{`# Performance counters for memory pressure:`}
{`PS> Get-Counter -Counter @(`}
{`    "\\Memory\\Available MBytes",`}
{`    "\\Memory\\Page Faults/sec",`}
{`    "\\Memory\\Pages Input/sec",`}
{`    "\\Memory\\Pool Nonpaged Bytes",`}
{`    "\\Memory\\Pool Paged Bytes") -SampleInterval 2`}
{``}
{`# Check committed memory vs limit:`}
{`PS> (Get-Counter "\\Memory\\% Committed Bytes In Use").CounterSamples`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ VIRTUAL MEMORY & POOL INSPECTION</div>
              <div style={S.code}>
{`# VMMap (Sysinternals) — process virtual layout:`}
{`C:\\> vmmap.exe -p <PID>`}
{``}
{`# RAMMap — system-wide page usage by type:`}
{`C:\\> rammap.exe`}
{``}
{`# WinDbg kernel pool inspection:`}
{`!vm              ; virtual memory stats`}
{`!memusage        ; PFN database summary`}
{`!poolused        ; pool usage by tag`}
{`!poolused 2      ; NonPaged only, sorted`}
{`!poolfind Proc 0 ; find all EPROCESS allocs`}
{`!pool <addr>     ; examine specific pool block`}
{``}
{`# WinDbg: VAD tree for process:`}
{`!process 0 0 explorer.exe`}
{`!vad <VadRoot addr>`}
{``}
{`# Check ASLR per-module:`}
{`PS> Get-Process -Name chrome | `}
{`    ForEach { $_.Modules } |`}
{`    Select FileName, BaseAddress`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ EXPLOIT MITIGATION VERIFICATION</div>
            <div style={S.code}>
{`# Check process mitigations (PowerShell 7 / Windows 10+):`}
{`PS> Get-ProcessMitigation -Id (Get-Process lsass).Id`}
{``}
{`# Enable DEP system-wide (should already be on):`}
{`C:\\> bcdedit /set nx AlwaysOn`}
{``}
{`# Verify ASLR and DEP for an image:`}
{`C:\\> dumpbin /headers C:\\Windows\\System32\\ntdll.dll | findstr /i "dynamic base nxcompat"`}
{``}
{`# Enable Kernel HVCI (requires reboot):`}
{`PS> Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard" `}
{`    -Name EnableVirtualizationBasedSecurity -Value 1`}
{``}
{`# Check if Credential Guard / HVCI active:`}
{`PS> Get-WmiObject -ClassName Win32_DeviceGuard `}
{`    -Namespace root\\Microsoft\\Windows\\DeviceGuard | `}
{`    Select VirtualizationBasedSecurityStatus,`}
{`    AvailableSecurityProperties, SecurityServicesRunning`}
{``}
{`# Application Verifier — enable heap page heap for target:`}
{`C:\\> appverif.exe -enable Heaps -for myapp.exe`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — POOL · WORKING SET · PTE FLAGS" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["pool","POOL ALLOCATOR"],["ws","WORKING SETS"],["pte","PTE FLAGS & STATES"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>
          {intTab === "pool" && <PoolLayout />}
          {intTab === "ws"   && <WorkingSetPanel />}
          {intTab === "pte"  && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PTE FLAG BITS (x64)</div>
                <div style={S.code}>
{`Bit  Name             Meaning`}
{`───  ───────────────  ──────────────────────────────`}
{`  0  Present (P)      1=page in RAM; 0=paged out`}
{`  1  R/W              0=read-only; 1=read-write`}
{`  2  U/S              0=supervisor(kernel); 1=user`}
{`  3  PWT              Page-level Write-Through`}
{`  4  PCD              Page-level Cache Disable`}
{`  5  Accessed (A)     Set by CPU on first access`}
{`  6  Dirty (D)        Set by CPU on first write`}
{`  7  PAT/PS           Large page (in PD/PDPT)`}
{`  8  Global (G)       TLB not flushed on CR3 load`}
{` 9-11 AVL             OS-defined (MM uses these)`}
{`12-51 PFN             Physical Frame Number (40 bits)`}
{`52-58 AVL2            More OS-defined bits`}
{`59-62 PKE             Protection Key (Intel MPK)`}
{` 63  NX/XD            No-Execute (DEP bit)`}
                </div>
              </div>
              <div>
                <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SPECIAL PTE STATES</div>
                {[
                  ["Demand-zero PTE", "Present=0, all zeros (or prototype PTE marker). First access → #PF → zero-fill from free list. Used for new committed memory.", C.green],
                  ["Prototype PTE", "Present=0, special flag bits set. Points to shared page (DLL, mapped file). On fault: locate prototype, map shared frame.", C.cyan],
                  ["Pagefile PTE", "Present=0, pagefile index + offset encoded. Page was trimmed → fault reads it back from pagefile.", C.orange],
                  ["Transition PTE", "Present=0, PFN known but page in Standby/Modified list. Fault = soft fault, just map frame (no I/O).", C.teal],
                  ["Guard Page PTE", "MEM_GUARD flag. First access raises STATUS_GUARD_PAGE_VIOLATION exception. Used for stack expansion.", C.purple],
                  ["No-access PTE (NULL region)", "Present=0, no valid backing. Access causes ACCESS_VIOLATION. Used for NULL guard region at low addresses.", C.red],
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

        {/* ── 7: Exploit & Security ── */}
        <PB title="MEMORY EXPLOITATION — HEAP · POOL · BYPASS TECHNIQUES" icon="💥" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["heap","HEAP & POOL EXPLOITS"],["bypass","ASLR/DEP/SMEP BYPASS"],["forensics","MEMORY FORENSICS"]].map(([t, l]) => (
              <button key={t} style={S.tab(expTab === t, C.red)} onClick={() => setExpTab(t)}>{l}</button>
            ))}
          </div>
          <ExploitPanel tab={expTab} />
        </PB>

        {/* ── 8: Security Perspective ── */}
        <PB title="SECURITY PERSPECTIVE — MITIGATIONS & HARDENING" icon="🛡" color={C.orange} accent={C.orange + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["mitigations","defense","hardening"].map(t => (
              <button key={t} style={S.tab(secTab === t, C.orange)} onClick={() => setSecTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {secTab === "mitigations" && (
            <div>
              <div style={S.grid2}>
                {[
                  { name: "ASLR (Address Space Layout Randomisation)", color: C.cyan,
                    how: "Randomises base addresses of image, heap, stack, PEB/TEB at load time. Image ASLR needs /DYNAMICBASE linker flag. Mandatory ASLR forces all images.",
                    limit: "Only effective if no info-leak exists. 32-bit: 256 heap positions (brute-forceable). 64-bit: 248 positions (not brute-forceable).", event: "Verify: dumpbin /headers | grep 'DYNAMIC BASE'" },
                  { name: "DEP / NX (Data Execution Prevention)", color: C.green,
                    how: "CPU NX bit in PTE marks heap/stack pages non-executable. Any attempt to execute data page → access violation. Enforced in hardware.",
                    limit: "ROP chains bypass DEP entirely (use existing executable code). JIT compilers must mark JIT pages as RX (not RWX) to maintain DEP benefit.", event: "Verify: bcdedit | findstr nx; Get-ProcessMitigation" },
                  { name: "CFG (Control Flow Guard)", color: C.purple,
                    how: "Compiler inserts validity check before every indirect call/jump. Valid indirect call targets registered in CFG bitmap. Invalid target → fast-fail exception.",
                    limit: "Covers indirect calls only (direct calls unchecked). Bypass: overwrite vtable to point to valid CFG target that does something useful (pivot).", event: "Linker flag: /guard:cf. Runtime: RtlpValidateUserCallTarget() in ntdll." },
                  { name: "CET / Shadow Stack (Intel 11th Gen+)", color: C.yellow,
                    how: "Separate hardware-managed shadow return stack. Every function call pushes return address to shadow stack. RET instruction compared — mismatch = exception.",
                    limit: "Covers return-address overwrites. ROP via function pointers, vtables, or setjmp/longjmp still possible. x86 ENDBR instruction marks valid indirect targets.", event: "Check: Get-ProcessMitigation -Id <PID> | Select CETUserShadowStack" },
                  { name: "HVCI / VBS (Hypervisor Code Integrity)", color: C.teal,
                    how: "Hyper-V isolates kernel in a higher privilege level. HVCI: all kernel code pages must be signed before execution. Kernel cannot mark its own pages executable (no VirtualProtect from kernel).",
                    limit: "Requires UEFI + VT-x/AMD-V + IOMMU. Some drivers incompatible. Significantly reduces driver exploit surface but not zero.", event: "Check: msinfo32 → Device Guard / Credential Guard status; or securebootvalidation.exe" },
                  { name: "SEHOP (Structured Exception Handler Overwrite Protection)", color: C.pink,
                    how: "Validates SEH chain integrity before dispatching exceptions. Exception chain must end at _except_handler4 (registered valid terminator). Overwrites detected → terminate.",
                    limit: "Only applicable to 32-bit SEH (x86). x64 uses table-based exception handling — SEHOP not needed. Stack cookie (GS) + SEHOP combined on 32-bit.", event: "Registry: HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel → DisableExceptionChainValidation = 0" },
                ].map(({ name, color, how, limit, event }) => (
                  <div key={name} style={{ background: "#09090d", border: `1px solid ${color}33`, borderRadius: "4px", padding: "11px", marginBottom: "10px" }}>
                    <div style={{ color, fontWeight: "700", fontSize: "12px", marginBottom: "8px" }}>▸ {name}</div>
                    <div style={{ marginBottom: "5px" }}><span style={{ color: C.green, fontSize: "10.5px", fontWeight: "700" }}>HOW: </span><span style={{ color: C.dim, fontSize: "10.5px" }}>{how}</span></div>
                    <div style={{ marginBottom: "5px" }}><span style={{ color: C.red, fontSize: "10.5px", fontWeight: "700" }}>LIMIT: </span><span style={{ color: C.dim, fontSize: "10.5px" }}>{limit}</span></div>
                    <div><span style={{ color: color, fontSize: "10.5px", fontWeight: "700" }}>VERIFY: </span><span style={{ color: C.dim, fontSize: "10.5px" }}>{event}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secTab === "defense" && (
            <div style={S.grid2}>
              {[
                ["Enable HVCI + Secure Boot", "Hypervisor-Protected Code Integrity prevents unsigned kernel code. Blocks all BYOVD attacks. Requires compatible hardware/drivers.", C.green],
                ["Mandatory ASLR for all processes", "Process Mitigation Policy: ForceRelocateImages. Prevents non-ASLR images from loading (eliminate info-leak vectors from fixed-base DLLs).", C.cyan],
                ["ACG on sensitive processes", "Arbitrary Code Guard prevents VirtualAlloc(RWX) and VirtualProtect changes in a process. Apply to browser, PDF reader, email client.", C.green],
                ["CET / Shadow Stack adoption", "Require CET-compatible applications via HVCI enforcement. Eliminates 99% of ROP-based exploits on supported hardware.", C.teal],
                ["Driver Verifier in production pools", "Enable Driver Verifier on pool checking in test environment. Special pool in production for suspect drivers. Catches pool overflows early.", C.orange],
                ["Pagefile encryption", "Bitlocker encrypts pagefile (hibernation file too). Credential material paged out to disk is protected at rest. Enable: BitLocker Group Policy.", C.purple],
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
{`# ── ASLR: Force all images to ASLR (mandatory) ──`}
{`PS> Set-ProcessMitigation -System -Enable ForceRelocateImages,`}
{`    BottomUp, HighEntropy`}
{``}
{`# ── DEP: System-wide NX enforcement ──`}
{`C:\\> bcdedit /set nx AlwaysOn`}
{``}
{`# ── Enable HVCI (Device Guard) ──`}
{`PS> Set-ItemProperty `}
{`    "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard"`}
{`    -Name EnableVirtualizationBasedSecurity -Value 1`}
{`PS> Set-ItemProperty `}
{`    "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard"`}
{`    -Name RequirePlatformSecurityFeatures -Value 3`}
{``}
{`# ── Per-process ACG + CIG (e.g. for critical service) ──`}
{`PS> Set-ProcessMitigation -Name "myservice.exe" `}
{`    -Enable ProhibitDynamicCode, BlockNonMicrosoftBinaries`}
{``}
{`# ── Pagefile encryption (via BitLocker GPO) ──`}
{`# GPO: Computer Config → Admin Templates → Windows Components`}
{`#      → BitLocker Drive Encryption → Encrypt pagefile`}
{``}
{`# ── Heap terminate-on-corruption (all processes) ──`}
{`PS> Set-ProcessMitigation -System -Enable TerminateOnError`}
{``}
{`# ── Verify mitigations active on lsass ──`}
{`PS> Get-ProcessMitigation -Id (Get-Process lsass).Id | `}
{`    Select Aslr,Dep,Cfg,Cet,DynamicCode,BinarySignature`}
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING & MEMORY FORENSICS" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["counters","volatility","tools","iocs"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "counters" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PERFORMANCE COUNTERS — KEY MEMORY METRICS</div>
                {[
                  ["\\Memory\\Available MBytes", "Physical RAM immediately usable. Below 200MB = memory pressure. Trigger: increase pagefile or add RAM.", C.green],
                  ["\\Memory\\Page Faults/sec", "Total page faults (soft + hard). High value = thrashing. Distinguish hard faults via Pages Input/sec.", C.orange],
                  ["\\Memory\\Pages Input/sec", "Hard faults only (disk reads). Sustained >20/sec = disk I/O becoming bottleneck.", C.red],
                  ["\\Memory\\Pool Nonpaged Bytes", "Kernel NonPaged pool usage. Unexpected growth = driver leak or kernel exploit allocation pattern.", C.red],
                  ["\\Memory\\Pool Paged Bytes", "Kernel Paged pool. Large registry loads or file cache pressure visible here.", C.orange],
                  ["\\Memory\\% Committed Bytes In Use", "Committed vs limit. Above 80% = risk of OOM. Monitor alongside pagefile size.", C.yellow],
                ].map(([counter, desc, c]) => (
                  <div key={counter} style={{ marginBottom: "8px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "600" }}>{counter}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{desc}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TROUBLESHOOTING — MEMORY LEAK DETECTION</div>
                <div style={S.code}>
{`# Identify pool tag leak (WinDbg):`}
{`!poolused 2`}
{`# Look for tag with huge NonPagedBytes`}
{`# cross-ref tag with driver symbol:`}
{`!poolfind <TAG> 0`}
{``}
{`# Track pool tag over time (Performance Monitor):`}
{`# Counter: \\Pool\\Nonpaged Pool\\<Tag>`}
{``}
{`# Identify process virtual memory leak:`}
{`PS> while($true) {`}
{`    Get-Process myapp | `}
{`    Select @{N="VirtMB";E={`}
{`      [math]::Round($_.VirtualMemorySize64/1MB)}}`}
{`    Start-Sleep 5`}
{`}`}
{``}
{`# VMMap — track allocation type growth:`}
{`C:\\> vmmap.exe -p <PID>`}
{`# Watch: Private Data growing = heap leak`}
{`# Watch: Heap growing = malloc without free`}
{`# Watch: Private (non-heap) = VirtualAlloc leak`}
                </div>
              </div>
            </div>
          )}

          {monTab === "volatility" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ VOLATILITY 3 — MEMORY FORENSICS COMMANDS</div>
              <div style={S.code}>
{`# Acquire memory image (live system):`}
{`C:\\> winpmem_mini_x64.exe -o C:\\ir\\mem.dmp`}
{``}
{`# Process list (walks EPROCESS list):`}
{`vol3 -f mem.dmp windows.pslist.PsList`}
{``}
{`# Process list via PFN scan (finds hidden/unlinked):`}
{`vol3 -f mem.dmp windows.psscan.PsScan`}
{``}
{`# Compare pslist vs psscan — hidden procs:`}
{`# In pslist but not psscan = DKOM hidden process`}
{``}
{`# Find injected memory / shellcode (malfind):`}
{`vol3 -f mem.dmp windows.malfind.Malfind`}
{`# Looks for: Private RWX VAD regions + PE header magic (MZ)`}
{``}
{`# Scan pool for EPROCESS objects (even unlinked):`}
{`vol3 -f mem.dmp windows.poolscanner.PoolScanner --tags Proc`}
{``}
{`# Scan pool for DRIVER_OBJECT (find hidden drivers):`}
{`vol3 -f mem.dmp windows.poolscanner.PoolScanner --tags Driv`}
{``}
{`# Dump VAD regions for a process:`}
{`vol3 -f mem.dmp windows.vadinfo.VadInfo --pid 1200`}
{``}
{`# Dump all DLLs loaded in a process:`}
{`vol3 -f mem.dmp windows.dlllist.DllList --pid 1200`}
{``}
{`# Find kernel hooks (SSDT, IDT):`}
{`vol3 -f mem.dmp windows.ssdt.SSDT`}
{``}
{`# Network connections from memory:`}
{`vol3 -f mem.dmp windows.netstat.NetStat`}
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["RAMMap (Sysinternals)", "rammap.exe", "System-wide physical memory usage: by type (Active, Standby, Free, Modified), by process, by driver. Best for memory pressure diagnosis.", C.cyan],
                ["VMMap (Sysinternals)", "vmmap.exe -p <pid>", "Per-process virtual memory breakdown by type: Image, Heap, Private, Stack, Mapped. Timeline view shows growth pattern (leak detection).", C.green],
                ["WinDbg / WinDbgX", "windbg.exe -z mem.dmp", "Kernel memory analysis: pool inspection, PFN database, VAD walk, EPROCESS/TOKEN dump. Essential for driver debug and kernel forensics.", C.purple],
                ["Volatility 3", "vol3 -f mem.dmp <plugin>", "Offline memory forensics: pslist, psscan, malfind, poolscanner, dlllist, handles, netstat. Cross-platform Python.", C.orange],
                ["PE-sieve + Hollows Hunter", "hollows_hunter.exe", "Scan all processes for injections, hollowing, hooks. Dumps suspicious memory regions to disk. Fast triage tool.", C.red],
                ["Moneta", "moneta64.exe --pid X", "Advanced live process memory scanner: unbacked executable regions, private RWX, IAT hooks, heap anomalies.", C.pink],
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
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ MEMORY-BASED IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["Private RWX VAD region", "Executable memory not backed by any file. Shellcode, reflective DLL, or beacon payload. malfind + VAD scan.", C.red],
                  ["EPROCESS pool tag mismatch", "EPROCESS found by pool scan but absent from ActiveProcessLinks list (DKOM-hidden process). pslist vs psscan delta.", C.red],
                  ["MZ header in heap/private memory", "PE file injected into process heap or private allocation. malfind reports these. High fidelity indicator.", C.orange],
                  ["Non-paged pool exhaustion", "Sudden spike in NonPaged Pool (\\Memory\\Pool Nonpaged Bytes). Driver allocating without freeing = exploit or leak.", C.orange],
                  ["Driver without DRIVER_OBJECT in list", "Driver mapped in kernel VA but absent from PsLoadedModuleList. DKOM-hidden driver. Volatility poolscanner finds by 'Driv' tag.", C.red],
                  ["Heap spray pattern", "Large private committed regions with uniform byte patterns (0x0C0C0C0C, 0x41414141). Scanning with YARA rules.", C.orange],
                  ["Stack ROP chain", "Exception stack trace shows only return addresses (no function calls). RIP after exploit lands in gadget chain. CET shadow stack violation.", C.yellow],
                  ["Pagefile credential artifacts", "Pagefile contains LSASS working set pages that were trimmed. Offline pagefile scan can extract credential material if BitLocker not enabled.", C.red],
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

        {/* ── 10: Windows vs Linux ── */}
        <PB title="WINDOWS vs LINUX — MEMORY MANAGEMENT COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["vm","heap","mitigations","forensics"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            <div style={{ background: "#00101a", border: `1px solid ${C.cyan}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.cyan, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>⊞ WINDOWS</div>
              {cmpTab === "vm" && <>
                <KV k="Page table levels" v="4-level (PML4/PDPT/PD/PT), LA57 optional (5-level)" kc={C.cyan} />
                <KV k="VA split" v="128 TB user / 128 TB kernel (sign-extended)" kc={C.cyan} />
                <KV k="VA descriptor" v="VAD tree (red-black AVL tree per process)" kc={C.cyan} />
                <KV k="Physical page track" v="PFN Database (_MMPFN per page)" kc={C.cyan} />
                <KV k="Pagefile" v="pagefile.sys (multiple supported, encrypted w/ BitLocker)" kc={C.cyan} />
                <KV k="Large pages" v="MEM_LARGE_PAGES flag (2MB). Needs SeLockMemoryPrivilege" kc={C.cyan} />
              </>}
              {cmpTab === "heap" && <>
                <KV k="User heap" v="NT Heap + LFH (user mode). HeapAlloc / RtlAllocateHeap" kc={C.cyan} />
                <KV k="Kernel alloc" v="ExAllocatePoolWithTag (NonPaged/Paged pool)" kc={C.cyan} />
                <KV k="Segment Heap" v="Win10+ opt-in (Edge, UWP apps). Metadata randomisation." kc={C.cyan} />
                <KV k="Pool tags" v="4-byte ASCII tags on every kernel alloc for accounting" kc={C.cyan} />
                <KV k="Heap cookie" v="XOR cookie in HEAP_ENTRY header. Corruption detected on free." kc={C.cyan} />
                <KV k="Safe unlink" v="FreeList Flink/Blink validated before unlink (Vista+)" kc={C.cyan} />
              </>}
              {cmpTab === "mitigations" && <>
                <KV k="ASLR" v="Image + heap + stack + PEB randomisation. Mandatory ASLR via policy." kc={C.cyan} />
                <KV k="DEP/NX" v="PTE NX bit. Hardware enforced. Always-on since Win8." kc={C.cyan} />
                <KV k="CFG" v="Control Flow Guard: compiler + runtime indirect call validation." kc={C.cyan} />
                <KV k="CET" v="Hardware shadow stack (Intel CET / AMD Shadow Stack)" kc={C.cyan} />
                <KV k="HVCI" v="Hypervisor Code Integrity — Hyper-V enforces kernel signing." kc={C.cyan} />
                <KV k="SEHOP" v="SEH chain validation (32-bit only)" kc={C.cyan} />
              </>}
              {cmpTab === "forensics" && <>
                <KV k="Memory image" v="WinPmem, DumpIt, Raw2Dmp, crash dump (BSOD)" kc={C.cyan} />
                <KV k="Analysis tool" v="Volatility 3, WinDbg, RAMMap, VMMap" kc={C.cyan} />
                <KV k="Pool forensics" v="pool tag scan — find hidden EPROCESS/ETHREAD/drivers" kc={C.cyan} />
                <KV k="Pagefile" v="pagefile.sys may contain paged-out credential material" kc={C.cyan} />
                <KV k="Hibernation" v="hiberfil.sys = full RAM snapshot. Excellent forensic source." kc={C.cyan} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: C.dim, fontSize: "18px" }}>⟷</div>
            <div style={{ background: "#0a180a", border: `1px solid ${C.green}22`, borderRadius: "4px", padding: "12px" }}>
              <div style={{ color: C.green, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>🐧 LINUX</div>
              {cmpTab === "vm" && <>
                <KV k="Page table levels" v="4-level (PGD/PUD/PMD/PTE), 5-level with CONFIG_X86_5LEVEL" kc={C.green} />
                <KV k="VA split" v="128 TB user / 128 TB kernel (same on x64 with 4-level)" kc={C.green} />
                <KV k="VA descriptor" v="vm_area_struct (VMA) — red-black tree in mm_struct" kc={C.green} />
                <KV k="Physical page track" v="struct page (per physical frame), mem_map[] array" kc={C.green} />
                <KV k="Pagefile" v="swap partition or swapfile. dm-crypt for encryption." kc={C.green} />
                <KV k="Large pages" v="Huge pages (2MB/1GB). THP (Transparent Huge Pages) auto." kc={C.green} />
              </>}
              {cmpTab === "heap" && <>
                <KV k="User heap" v="ptmalloc2 (glibc malloc) / jemalloc / tcmalloc" kc={C.green} />
                <KV k="Kernel alloc" v="kmalloc (slab), vmalloc, __get_free_pages()" kc={C.green} />
                <KV k="Slab allocator" v="SLUB (default): per-CPU caches for kernel object sizes" kc={C.green} />
                <KV k="Pool tags" v="No built-in tagging. kmemleak for leak detection." kc={C.green} />
                <KV k="Heap cookie" v="No heap cookie in glibc by default. Hardened malloc has it." kc={C.green} />
                <KV k="Safe unlink" v="glibc unlink check (chunk fd/bk pointer validation) since 2.3.4" kc={C.green} />
              </>}
              {cmpTab === "mitigations" && <>
                <KV k="ASLR" v="Kernel ASLR (KASLR), PIE executables, mmap randomisation." kc={C.green} />
                <KV k="DEP/NX" v="PTE NX bit. W^X enforced by kernel for stack/heap." kc={C.green} />
                <KV k="CFG equivalent" v="No CFG. ClangCFI (compiler-based). IBT (Intel CET ENDBR)." kc={C.green} />
                <KV k="CET" v="CET Shadow Stack support in kernel 5.18+. glibc support added." kc={C.green} />
                <KV k="HVCI equiv" v="No direct equiv. Lockdown mode + module signing + IMA." kc={C.green} />
                <KV k="SMEP/SMAP" v="Kernel enforced via CR4 bits. KPTI mitigates Meltdown." kc={C.green} />
              </>}
              {cmpTab === "forensics" && <>
                <KV k="Memory image" v="LiME (loadable kernel module), /proc/kcore, /dev/mem" kc={C.green} />
                <KV k="Analysis tool" v="Volatility 3 (linux profiles), rekall, avml" kc={C.green} />
                <KV k="Slab forensics" v="Slab scan finds task_struct (processes) in memory" kc={C.green} />
                <KV k="Pagefile" v="Swap partition. swapoff -a before imaging for full capture." kc={C.green} />
                <KV k="Hibernation" v="/sys/power/image_size hibernate state. Less common than Windows." kc={C.green} />
              </>}
            </div>
          </div>
        </PB>

        {/* ── 11: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — KERNEL EXPLOIT & MEMORY FORENSICS" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: Kernel Pool Overflow via Vulnerable Driver → SYSTEM → Credential Dump
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ATTACK CHAIN</div>
              <div style={S.code}>
{`# Attacker loads vulnerable signed driver (BYOVD):`}
{`sc create VulnDrv binPath=C:\\temp\\vuln.sys type=kernel`}
{`sc start VulnDrv`}
{``}
{`# Exploit pool overflow in driver IOCTL handler:`}
{`# DeviceIoControl → driver copies user buffer to`}
{`# NonPaged pool alloc without bounds check`}
{`# Overwrites adjacent EPROCESS.Token pointer`}
{``}
{`# Overwrite target: EPROCESS of attacker process`}
{`# Replace Token with pointer to SYSTEM token`}
{`# (found by walking EPROCESS list to PID 4)`}
{``}
{`# Now attacker process runs as SYSTEM:`}
{`C:\\> whoami → NT AUTHORITY\\SYSTEM`}
{``}
{`# Dump LSASS (now with SYSTEM token, PPL bypassed):`}
{`C:\\> rundll32.exe C:\\windows\\System32\\comsvcs.dll`}
{`         MiniDump <lsass_pid> C:\\tmp\\lsass.dmp full`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION & FORENSICS</div>
              <div style={S.code}>
{`# 1. HVCI would have blocked vulnerable driver load:`}
{`#    (driver not WHQL-signed → load denied)`}
{``}
{`# 2. Driver Verifier catches pool overflow in test:`}
{`#    BSOD 0xC2 / 0x19 immediately on overflow`}
{``}
{`# 3. ETW kernel pool events (if enabled):`}
{`xperf -on PROC_THREAD+LOADER+POOL`}
{``}
{`# 4. Memory forensics post-incident:`}
{`vol3 -f mem.dmp windows.psscan.PsScan`}
{`# Find EPROCESS with token pointing to PID 4's token`}
{``}
{`# 5. Pool tag forensics:`}
{`vol3 -f mem.dmp windows.poolscanner.PoolScanner`}
{`    --tags Driv`}
{`# Finds DRIVER_OBJECT for VulnDrv even if unloaded`}
{``}
{`# 6. Sysmon Event 6 — driver loaded:`}
{`Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational"`}
{`    | Where {$_.Id -eq 6}  # Driver load events`}
{`    | Where {$_.Message -notmatch "Microsoft"}`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Prevention", "HVCI + Secure Boot + WDAC driver allow-list = BYOVD impossible. Patch vulnerable drivers. Block vulnerable drivers via DriverSiPolicy.", C.green],
              ["Detection", "Sysmon Event 6 (unsigned/unexpected driver load), ETW pool events, memory forensics pool scan, token lineage anomaly (non-SYSTEM process with SYSTEM token)", C.cyan],
              ["Remediation", "Re-image (kernel compromise = full re-image required). Extract IOCs from memory dump. Hunt for driver load across fleet. Revoke leaked credentials.", C.orange],
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
              [C.green, "Memory Hardening Baseline", [
                "ASLR fully enabled (Mandatory ASLR + BottomUp + HighEntropy via GPO)",
                "DEP: bcdedit /set nx AlwaysOn — no opt-out allowed",
                "HVCI enabled (msinfo32 → Device Guard = Running)",
                "Pagefile encrypted (BitLocker Group Policy — Encrypt pagefile)",
                "Hibernation file encrypted or disabled (powercfg /hibernate off on non-laptops)",
              ]],
              [C.cyan, "Driver & Kernel Pool", [
                "WDAC Driver allow-list deployed (block vulnerable/unsigned drivers)",
                "Driver Verifier enabled in QA/staging (pool corruption detection)",
                "Sysmon Event 6 alerting — unexpected driver load → SIEM rule",
                "Block known vulnerable drivers (DriverSiPolicy + Microsoft HVCI blocklist)",
              ]],
              [C.orange, "Process Memory Monitoring", [
                "Deploy pe-sieve / Hollows Hunter in IR toolkit",
                "Baseline NonPaged Pool usage per system type (server vs workstation)",
                "Alert on \\Memory\\Pool Nonpaged Bytes sustained spike (driver leak or exploit)",
                "Memory dump capability staged (WinPmem) for rapid acquisition",
              ]],
              [C.purple, "Forensic Readiness", [
                "Volatility 3 configured with Windows 10/11 symbols (ISF files)",
                "Pagefile preserved in forensic image (raw disk image, not just OS files)",
                "Hibernation file imaging procedure documented and tested",
                "Pool scanner profiles tested against current OS build",
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
              ["4-level paging = isolation", "CR3 per process → separate VA space. Every process isolation guarantee flows from page table separation enforced by hardware.", C.purple],
              ["PFN database = physical truth", "The PFN database is the authoritative map of what's in RAM. Forensic tools walk it to find hidden allocations that don't appear in process lists.", C.sky],
              ["HVCI = hardest kernel defence", "Hyper-V enforcing code integrity from a higher privilege level is the most significant kernel security advance in modern Windows. Blocks BYOVD at hardware level.", C.teal],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 06: Windows Services & Drivers — SCM, Service Internals, WDM Driver Stack, Driver Security & Malware
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 05 Complete</Pill>
              <Pill c={C.sky}>12 Panels · Memory Internals Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
