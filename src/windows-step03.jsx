import { useState } from "react";

const C = {
  bg: "#080b0f",
  panel: "#0b0e15",
  header: "#0f1320",
  border: "#1c2535",
  cyan: "#00c8f0",
  green: "#00e87a",
  red: "#ff3355",
  orange: "#ff9500",
  yellow: "#f0c040",
  purple: "#a855f7",
  teal: "#14b8a6",
  pink: "#f472b6",
  text: "#b8c4d0",
  dim: "#4e5e72",
  bright: "#dde6f0",
};

const mono = "'JetBrains Mono','Cascadia Code','Fira Code',monospace";

const S = {
  root: { background: C.bg, color: C.text, fontFamily: mono, minHeight: "100vh", fontSize: "12.5px", lineHeight: "1.65" },
  bar: { background: C.header, borderBottom: `1px solid ${C.border}`, padding: "7px 20px", display: "flex", alignItems: "center", gap: "14px", position: "sticky", top: 0, zIndex: 100 },
  dot: (c) => ({ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }),
  wrap: { maxWidth: "1220px", margin: "0 auto", padding: "18px 14px", display: "flex", flexDirection: "column", gap: "14px" },
  panel: (c) => ({ background: C.panel, border: `1px solid ${c || C.border}`, borderRadius: "5px", overflow: "hidden" }),
  ph: (c) => ({ background: C.header, borderBottom: `1px solid ${c || C.border}`, padding: "9px 15px", display: "flex", alignItems: "center", gap: "9px" }),
  pt: (c) => ({ color: c || C.cyan, fontWeight: "700", fontSize: "11px", letterSpacing: "1.8px", textTransform: "uppercase" }),
  pb: { padding: "15px" },
  code: { background: "#060810", border: `1px solid ${C.border}`, borderRadius: "4px", padding: "11px 13px", fontFamily: mono, fontSize: "11.5px", overflowX: "auto", whiteSpace: "pre", lineHeight: "1.75" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "11px" },
  grid4: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" },
  badge: (c) => ({ background: `${c}1a`, border: `1px solid ${c}55`, color: c, borderRadius: "3px", padding: "2px 7px", fontSize: "10.5px", fontWeight: "700" }),
  tag: (c) => ({ display: "inline-block", background: `${c}14`, border: `1px solid ${c}40`, color: c, borderRadius: "3px", padding: "1px 6px", fontSize: "10.5px", margin: "2px" }),
  sep: { borderColor: C.border, margin: "11px 0", borderStyle: "dashed", borderWidth: "0 0 1px 0" },
  row: { display: "flex", gap: "9px", marginBottom: "7px", alignItems: "flex-start" },
  bul: (c) => ({ color: c || C.cyan, minWidth: "13px", fontWeight: "700", marginTop: "1px" }),
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
const Tag = ({ c, children }) => <span style={S.tag(c || C.cyan)}>{children}</span>;
const Row = ({ c, b, children }) => (
  <div style={S.row}><span style={S.bul(c)}>{b || "▸"}</span><span style={{ color: C.text }}>{children}</span></div>
);
const KV = ({ k, v, kc }) => (
  <div style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
    <span style={{ color: kc || C.teal, minWidth: "190px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span><span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── NTFS Layout SVG ─────────────────────────────────────────────────────────── */
const NTFSLayout = () => (
  <svg viewBox="0 0 760 300" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    {/* Volume header */}
    <rect x="10" y="10" width="740" height="280" rx="5" fill="#07090e" stroke="#1c2535" strokeWidth="1" />
    <text x="380" y="28" textAnchor="middle" fill="#4e5e72" fontSize="10" letterSpacing="2">NTFS VOLUME LAYOUT (e.g. C:\)</text>

    {/* Sectors */}
    {[
      ["VBR\nBoot Sector", "#00c8f0", 20, 60],
      ["$MFT\n(Master File Table)", "#a855f7", 110, 140],
      ["$MFTMirr\n(MFT Backup)", "#f0c040", 260, 80],
      ["$LogFile\n(Journal)", "#00e87a", 350, 80],
      ["$Bitmap\n(Cluster map)", "#ff9500", 440, 60],
      ["$Boot\n(Bootloader)", "#00c8f0", 510, 60],
      ["Data Region\n(Files & Dirs)", "#14b8a6", 580, 160],
    ].map(([label, color, x, w]) => (
      <g key={label}>
        <rect x={x} y="44" width={w} height="220" rx="3" fill={`${color}0d`} stroke={`${color}44`} strokeWidth="1.5" />
        {label.split("\n").map((l, i) => (
          <text key={i} x={x + w / 2} y={i === 0 ? 80 + i * 15 : 95 + (i - 1) * 13} textAnchor="middle" fill={color} fontSize={i === 0 ? "10" : "9"} fontWeight={i === 0 ? "700" : "400"}>{l}</text>
        ))}
      </g>
    ))}

    {/* MFT internals */}
    <text x="185" y="130" textAnchor="middle" fill="#a855f744" fontSize="9">Record 0: $MFT</text>
    <text x="185" y="143" textAnchor="middle" fill="#a855f744" fontSize="9">Record 1: $MFTMirr</text>
    <text x="185" y="156" textAnchor="middle" fill="#a855f744" fontSize="9">Record 2: $LogFile</text>
    <text x="185" y="169" textAnchor="middle" fill="#a855f744" fontSize="9">Record 3: $Volume</text>
    <text x="185" y="182" textAnchor="middle" fill="#a855f744" fontSize="9">Record 4: $AttrDef</text>
    <text x="185" y="195" textAnchor="middle" fill="#a855f744" fontSize="9">Record 5: . (root dir)</text>
    <text x="185" y="208" textAnchor="middle" fill="#a855f744" fontSize="9">Record 6: $Bitmap</text>
    <text x="185" y="221" textAnchor="middle" fill="#a855f744" fontSize="9">Record 7: $Boot</text>
    <text x="185" y="234" textAnchor="middle" fill="#a855f744" fontSize="9">Record 8: $BadClus</text>
    <text x="185" y="247" textAnchor="middle" fill="#a855f744" fontSize="9">Record N: User files…</text>

    {/* Legend */}
    <text x="20" y="278" fill="#4e5e72" fontSize="9">Each MFT record = 1KB · 1024 bytes · contains file metadata + attribute list · small files stored inline (resident)</text>
  </svg>
);

/* ── MFT Record Diagram ──────────────────────────────────────────────────────── */
const MFTRecord = () => (
  <svg viewBox="0 0 760 360" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="18" textAnchor="middle" fill="#4e5e72" fontSize="10" letterSpacing="2">MFT RECORD STRUCTURE (1024 bytes per record)</text>

    {/* Header */}
    <rect x="10" y="28" width="740" height="44" rx="3" fill="#0f1320" stroke="#00c8f055" strokeWidth="1.5" />
    <text x="380" y="46" textAnchor="middle" fill="#00c8f0" fontSize="11" fontWeight="700">FILE RECORD HEADER</text>
    <text x="380" y="62" textAnchor="middle" fill="#4e5e72" fontSize="9">Signature "FILE" · Sequence Number · Link Count · First Attribute Offset · Flags (In-use/Directory) · LogFile LSN</text>

    {/* Attributes */}
    {[
      { name: "$STANDARD_INFORMATION", type: "0x10", color: "#00e87a", desc: "MACE timestamps (Created/Modified/MFT-Modified/Accessed) · File attributes (Hidden/System/RO) · Owner · Security ID · Quota", y: 82 },
      { name: "$FILE_NAME", type: "0x30", color: "#a855f7", desc: "Filename (Unicode) · Parent directory MFT ref · MACE timestamps (separate set!) · File size in MFT · Namespace (Win32/DOS/POSIX)", y: 132 },
      { name: "$DATA (resident)", type: "0x80", color: "#14b8a6", desc: "File content stored directly in MFT record if ≤ ~700 bytes (resident). No cluster allocation needed. Speed + forensic implication.", y: 182 },
      { name: "$DATA (non-resident)", type: "0x80", color: "#ff9500", desc: "Data runs: compressed list of LCN extents pointing to actual clusters on disk. VCN→LCN mapping. Sparse file support.", y: 232 },
      { name: "$ATTRIBUTE_LIST", type: "0x20", color: "#f0c040", desc: "If attributes overflow 1KB record → extension records. Lists attribute type + record reference for each fragment.", y: 282 },
    ].map(attr => (
      <g key={attr.name}>
        <rect x="10" y={attr.y} width="740" height="44" rx="3" fill={`${attr.color}0d`} stroke={`${attr.color}44`} strokeWidth="1.5" />
        <rect x="10" y={attr.y} width="3" height="44" rx="1" fill={attr.color} />
        <text x="22" y={attr.y + 17} fill={attr.color} fontSize="11" fontWeight="700">{attr.name}</text>
        <text x="22" y={attr.y + 17} dx={attr.name.length * 7 + 8} fill="#4e5e72" fontSize="9">type={attr.type}</text>
        <text x="22" y={attr.y + 33} fill="#6e8090" fontSize="9">{attr.desc}</text>
      </g>
    ))}

    <text x="10" y="355" fill="#4e5e72" fontSize="9">End-of-record marker: 0xFFFFFFFF · Remaining bytes: slack space (may contain forensic artifacts from previous files)</text>
  </svg>
);

/* ── Timestamps Panel ────────────────────────────────────────────────────────── */
const TimestampsPanel = () => (
  <div>
    <div style={{ ...S.grid2, marginBottom: "14px" }}>
      <div>
        <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ MACE TIMESTAMPS — TWO SETS PER FILE</div>
        {[
          ["M — Modified", "$SI Modified", "Last time file CONTENT was written", C.green],
          ["A — Accessed", "$SI Accessed", "Last time file was opened/read", C.cyan],
          ["C — MFT Changed", "$SI MFT-Modified", "Last time MFT record itself changed (metadata edit)", C.purple],
          ["E — Created", "$SI Created", "File birth time — set at creation, rarely changes", C.orange],
        ].map(([label, attr, desc, c]) => (
          <div key={label} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
            <span style={{ ...S.badge(c), minWidth: "130px", textAlign: "center", flexShrink: 0 }}>{label}</span>
            <div>
              <div style={{ color: C.bright, fontSize: "11px", fontWeight: "600" }}>{attr}</div>
              <div style={{ color: C.dim, fontSize: "10.5px" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TIMESTAMP FORENSICS — ATTACK & DEFENSE</div>
        <div style={{ background: "#120808", border: `1px solid ${C.red}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
          <div style={{ color: C.red, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>⚠ TIMESTOMPING ATTACK</div>
          <div style={{ color: C.dim, fontSize: "11px" }}>Attackers use tools (timestomp, Meterpreter timestomp module) to overwrite <strong style={{color:C.bright}}>$STANDARD_INFORMATION</strong> timestamps with fake dates to blend into filesystem. Detection: <strong style={{color:C.yellow}}>$FILE_NAME timestamps are NOT accessible from user mode</strong> — they're in kernel-only MFT path and rarely faked. Mismatch between $SI and $FN = timestomp indicator.</div>
        </div>
        <div style={{ background: "#060e12", border: `1px solid ${C.green}33`, borderRadius: "4px", padding: "10px" }}>
          <div style={{ color: C.green, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>✓ DETECTION METHOD</div>
          <div style={{ color: C.dim, fontSize: "11px" }}>Compare $SI vs $FN timestamps using MFT parsers (MFTECmd, Velociraptor). If $SI Created is earlier than $FN Created → anomaly. Also check $USNJrnl — it logs real modification times independently.</div>
        </div>
      </div>
    </div>
    <div style={S.code}>
{`# Parse MFT and extract all timestamps with MFTECmd (EZ-Tools):
MFTECmd.exe -f "C:\\$MFT" --csv C:\\forensics\\mft_output

# View file timestamps via PowerShell:
$f = Get-Item "C:\\Windows\\System32\\cmd.exe"
$f.CreationTime; $f.LastWriteTime; $f.LastAccessTime

# Note: PowerShell reads $STANDARD_INFORMATION (user-mode accessible)
# $FILE_NAME timestamps need raw MFT parsing (kernel / offline tool)

# Detect timestomping: compare $SI vs $FN using Eric Zimmermann's tools:
# $SI Created < $FN Created → possible timestomp
# $SI all same timestamp → bulk overwrite (timestomp -m -a -c -e file)`}
    </div>
  </div>
);

/* ── ADS Panel ───────────────────────────────────────────────────────────────── */
const ADSPanel = () => (
  <div>
    <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WHAT ARE ALTERNATE DATA STREAMS?</div>
    <Row c={C.orange}>NTFS supports <strong style={{color:C.bright}}>multiple $DATA attributes</strong> per MFT record. The default (unnamed) stream holds the file content. Additional named streams are <strong style={{color:C.bright}}>hidden from normal directory listings</strong> and most AV tools.</Row>
    <Row c={C.orange}>Example: <code style={{color:C.cyan}}>malware.exe:hidden</code> — the <code>:hidden</code> part is a named ADS. <code>dir</code> shows 0 bytes; the ADS is invisible unless you use <code>dir /r</code> or Streams.exe.</Row>
    <hr style={S.sep} />
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ATTACK TECHNIQUES USING ADS</div>
        <div style={S.code}>
{`# Write payload into ADS of innocent file:
C:\\> type malware.exe > notepad.exe:hidden.exe

# Execute directly from ADS:
C:\\> wmic process call create 
         "C:\\legit\\notepad.exe:hidden.exe"

# Store script in ADS:
C:\\> echo powershell -enc BLOB > C:\\tmp\\log.txt:ps1

# Zone.Identifier — legitimate ADS:
# Windows marks downloaded files:
# file.exe:Zone.Identifier
# [ZoneTransfer] ZoneId=3 (Internet zone)

# Attackers DELETE Zone.Identifier to hide origin:
Remove-Item -Path "C:\\tmp\payload.exe" 
    -Stream "Zone.Identifier"`}
        </div>
      </div>
      <div>
        <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION & FORENSICS</div>
        <div style={S.code}>
{`# List all ADS on a file:
PS> Get-Item "C:\\tmp\\log.txt" -Stream *

# List ADS in a directory recursively:
C:\\> dir /r C:\\Users\\Public\

# Sysinternals Streams.exe:
C:\\> streams.exe -s C:\\Users\\Public\

# Read content of a specific ADS:
PS> Get-Content "C:\\tmp\\log.txt" -Stream hidden

# Check Zone.Identifier (download origin):
PS> Get-Content "C:\\Downloads\\setup.exe" 
        -Stream Zone.Identifier
# Output: [ZoneTransfer]
#         ZoneId=3 (Internet)
#         ReferrerUrl=https://evil.com

# MFT parse → find all non-default streams:
MFTECmd.exe -f C:\\$MFT --csv C:\\out --ads`}
        </div>
      </div>
    </div>
  </div>
);

/* ── USN Journal ─────────────────────────────────────────────────────────────── */
const USNPanel = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ $USNJRNL — CHANGE JOURNAL</div>
        <Row c={C.teal}>The <strong style={{color:C.bright}}>$UsnJrnl</strong> (Change Journal) is an NTFS metadata file that records every file system change — create, modify, rename, delete — with reason flags and timestamps.</Row>
        <Row c={C.teal}>Stored in <strong style={{color:C.bright}}>C:\$Extend\$UsnJrnl:$J</strong> (an ADS). Circular buffer — old entries overwritten. Critical for DFIR: tells you what files existed even after deletion.</Row>
        <Row c={C.teal}>Each USN record contains: <strong style={{color:C.bright}}>timestamp, MFT reference, filename, reason flags</strong> (DATA_EXTEND, FILE_CREATE, FILE_DELETE, RENAME_OLD/NEW, etc.).</Row>
        <div style={{ background: "#08100e", border: `1px solid ${C.teal}33`, borderRadius: "4px", padding: "10px", marginTop: "10px" }}>
          <div style={{ color: C.teal, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>Forensic value:</div>
          <div style={{ color: C.dim, fontSize: "11px" }}>Even if attacker deletes files and empties Recycle Bin, $UsnJrnl entries remain until the circular buffer wraps. Tools: MFTECmd (USN mode), Velociraptor artifact Windows.NTFS.USN.</div>
        </div>
      </div>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ USN RECORD STRUCTURE & QUERY</div>
        <div style={S.code}>
{`USN_RECORD_V2 fields:
  RecordLength     DWORD    Total record size
  MajorVersion     WORD     2 (common)
  Usn              LONGLONG Journal offset
  TimeStamp        FILETIME When change happened
  Reason           DWORD    Flags (see below)
  FileAttributes   DWORD    FILE_ATTRIBUTE_*
  FileReferenceNumber DWORDLONG → MFT record
  ParentRefNumber  DWORDLONG → parent dir MFT
  FileNameLength   WORD
  FileName         WCHAR[]  Unicode filename

Reason flags:
  0x00000001  DATA_OVERWRITE
  0x00000002  DATA_EXTEND
  0x00000100  FILE_CREATE
  0x00000200  FILE_DELETE
  0x00001000  RENAME_OLD_NAME
  0x00002000  RENAME_NEW_NAME

# Live query (fsutil):
fsutil usn readjournal C: csv | findstr /i delete

# Forensic parse (offline):
MFTECmd.exe -f "C:\\$Extend\\$UsnJrnl:$J" --csv C:\\out`}
        </div>
      </div>
    </div>
  </div>
);

/* ── Workflow Simulation ──────────────────────────────────────────────────────── */
const FileCreateFlow = () => {
  const steps = [
    { id: "01", label: "Application calls CreateFile()", sub: "kernel32.dll → ntdll.dll NtCreateFile()", color: C.green, detail: "Desired access, sharing flags, creation disposition, file attributes passed as parameters" },
    { id: "02", label: "I/O Manager receives IRP_MJ_CREATE", sub: "ntoskrnl.exe → I/O Request Packet dispatched", color: C.cyan, detail: "IRP constructed; dispatch table routes to NTFS driver stack" },
    { id: "03", label: "Security Reference Monitor check", sub: "File system ACL evaluated against caller token", color: C.purple, detail: "Parent directory DACL checked: caller needs FILE_ADD_FILE right; token SIDs vs ACEs evaluated" },
    { id: "04", label: "NTFS driver allocates MFT record", sub: "ntfs.sys → $Bitmap scanned for free MFT entry", color: C.orange, detail: "MFT record allocated; FILE header written; record sequence number assigned" },
    { id: "05", label: "$STANDARD_INFORMATION written", sub: "MACE timestamps set to current FILETIME", color: C.yellow, detail: "Created=Modified=Accessed=MFT-Changed = now; security ID linked; file attributes set" },
    { id: "06", label: "$FILE_NAME attribute written", sub: "Filename + parent MFT ref + FN timestamps", color: C.teal, detail: "$FILE_NAME timestamps also set to now; parent directory $INDEX_ALLOCATION updated with new entry" },
    { id: "07", label: "Cluster allocation (if > resident threshold)", sub: "$Bitmap updated; data runs written to $DATA", color: C.pink, detail: "NTFS finds contiguous free clusters; VCN→LCN mapping written as data run list; cluster marked allocated in $Bitmap" },
    { id: "08", label: "$LogFile (journal) records transaction", sub: "Redo/undo log written before commit", color: C.green, detail: "Write-ahead log ensures crash recovery. $LogFile stores redo (what to do) and undo (how to roll back) for every metadata change" },
    { id: "09", label: "$UsnJrnl entry written", sub: "FILE_CREATE reason flag logged", color: C.teal, detail: "USN record appended to $J stream: timestamp + filename + MFT ref + FILE_CREATE reason" },
    { id: "10", label: "File handle returned to caller", sub: "Handle stored in process handle table", color: C.cyan, detail: "Kernel file object created; handle index returned; file ready for I/O" },
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

/* ── NTFS vs ext4 ─────────────────────────────────────────────────────────────── */
const ComparePanel = ({ tab }) => {
  const data = {
    structure: [
      ["Master structure", "Master File Table ($MFT) — B-tree of 1KB records", "Inode table + directory entries (htree B-tree)"],
      ["Metadata storage", "All metadata in MFT attributes (typed, extensible)", "Fixed inode struct + xattr for extensions"],
      ["Small file storage", "Resident $DATA in MFT (≤ ~700 bytes, zero clusters)", "Inline data in inode (ext4 inline_data feature)"],
      ["Max file size", "16 EB (theoretical), practical ~16 TB", "16 TB (with 4K blocks)"],
      ["Max volume size", "256 TB (Windows practical limit)", "1 EB (with 64-bit ext4)"],
      ["Named streams", "Multiple $DATA streams (ADS) per file", "No native equivalent; workarounds via xattr"],
      ["Compression", "Built-in NTFS compression (LZ77 per cluster)", "Not built-in; relies on fs-layer (btrfs has it)"],
      ["Encryption", "EFS (per-file DPAPI); BitLocker (volume-level)", "fscrypt (per-directory, kernel 4.1+)"],
    ],
    journal: [
      ["Journal file", "$LogFile (write-ahead log, metadata only)", "/journal (internal to filesystem, metadata only)"],
      ["Change journal", "$UsnJrnl — user-accessible file operation log", "No built-in equivalent; inotify is runtime-only"],
      ["Journal modes", "Metadata journaling (default, no data journal)", "data=journal / data=ordered / data=writeback"],
      ["Recovery", "Replay $LogFile on mount after crash", "Replay journal on mount; fsck if needed"],
      ["Forensic value", "$UsnJrnl survives file deletion (circular buffer)", "No equivalent; inotify events not persistent"],
      ["Log size", "$LogFile typically 64–128 MB, circular", "Default 128 MB, circular"],
    ],
    timestamps: [
      ["Timestamp sets", "2 sets: $STANDARD_INFO + $FILE_NAME (per file)", "1 set: atime/mtime/ctime in inode"],
      ["Precision", "100-nanosecond FILETIME (since 1601-01-01)", "Nanosecond (Linux kernel 2.6+, ext4)"],
      ["Birth time", "crtime in $SI (creation time)", "Available in ext4 (crtime in inode)"],
      ["Epoch base", "January 1, 1601", "January 1, 1970 (Unix epoch)"],
      ["Access time", "atime updates delayed/disabled (perf)", "noatime/relatime mount options common"],
      ["Timestomping", "$FN timestamps hard to fake (kernel-only)", "touch -t fakes mtime/atime; ctime protected"],
    ],
    security: [
      ["Permission model", "ACL (DACL + SACL) — per-file, per-user SID ACEs", "POSIX DAC: rwx per User/Group/Other (9 bits)"],
      ["Granularity", "Granular: Read/Write/Execute/Delete/ChangeACL per SID", "Coarse: 3 classes × 3 permissions"],
      ["Mandatory access", "Integrity levels (Low/Med/High/System) via MIC", "SELinux/AppArmor labels (MAC overlay)"],
      ["Audit", "SACL per object → EventID 4663 on access", "auditd -w /path -p war → audit.log"],
      ["Encryption", "EFS with user cert; transparent to app", "fscrypt: per-directory policy + key management"],
      ["ADS hiding", "Named streams invisible to stat(), ls, most AV", "Extended attrs visible via getxattr()"],
    ],
  };
  const rows = data[tab] || data.structure;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr 2fr", gap: "1px", background: C.border, borderRadius: "4px", overflow: "hidden" }}>
        {["FEATURE", "⊞ NTFS (Windows)", "🐧 ext4 (Linux)"].map((h, i) => (
          <div key={h} style={{ background: C.header, padding: "7px 10px" }}>
            <span style={{ color: [C.dim, C.cyan, C.green][i], fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.5px" }}>{h}</span>
          </div>
        ))}
        {rows.map(([feat, ntfs, ext4], i) => (
          <>
            <div key={feat + "f"} style={{ background: i % 2 === 0 ? "#09090f" : C.panel, padding: "7px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: C.dim, fontSize: "11px" }}>{feat}</span>
            </div>
            <div key={feat + "n"} style={{ background: i % 2 === 0 ? "#080d14" : "#090c14", padding: "7px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: C.cyan, fontSize: "11px" }}>{ntfs}</span>
            </div>
            <div key={feat + "e"} style={{ background: i % 2 === 0 ? "#07100a" : "#08120a", padding: "7px 10px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ color: C.green, fontSize: "11px" }}>{ext4}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default function WindowsStep03() {
  const [secTab, setSecTab] = useState("attack");
  const [monTab, setMonTab] = useState("events");
  const [cmpTab, setCmpTab] = useState("structure");
  const [archTab, setArchTab] = useState("layout");
  const [intTab, setIntTab] = useState("timestamps");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.teal, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 03 · NTFS ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.teal), background: "linear-gradient(135deg, #0b0e15 55%, #001a18)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 03</div>
                <div style={{ color: C.teal, fontSize: "22px", fontWeight: "800", letterSpacing: "0.5px", lineHeight: "1.2" }}>NTFS Internals</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>MFT · ADS · MACE Timestamps · $LogFile · $UsnJrnl · Forensics · Attacks</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The file system under your OS — and under every attack that touches disk</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → ADVANCED</Pill>
                <Pill c={C.teal}>DOMAIN: FS INTERNALS / FORENSICS</Pill>
                <Pill c={C.purple}>MODULE 03 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["DFIR","Red Team","Blue Team","Malware Analyst","Auditor","Infra Engineer","SOC Analyst","Forensics"].map(r => (
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
              <Row c={C.green}>NTFS (New Technology File System) is the filesystem Windows uses to organize everything on disk — files, directories, metadata. Think of it as the <strong style={{color:C.bright}}>library cataloguing system</strong>: every book (file) has a card in the catalogue (MFT entry) with its name, location on shelves (clusters), and who's allowed to borrow it (ACLs).</Row>
              <Row c={C.green}>Before NTFS, Windows used FAT32 — no permissions, no journaling, no encryption, 4GB file size limit. NTFS introduced <strong style={{color:C.bright}}>ACLs, journaling, compression, encryption, and sparse files</strong> in one go.</Row>
              <Row c={C.green}>Every file you've ever created, deleted, renamed, or opened leaves <strong style={{color:C.bright}}>traces in NTFS metadata structures</strong> — even after deletion. This is why forensics analysts can reconstruct activity months after an incident.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>NTFS is a <strong style={{color:C.bright}}>B-tree indexed, journaled filesystem</strong> implemented in ntfs.sys (a kernel-mode driver). The Master File Table (MFT) is literally a database — every file and directory is a row (record) with typed attribute columns.</Row>
              <Row c={C.purple}>Key NTFS metadata files all start with <strong style={{color:C.bright}}>'$'</strong> and occupy the first 26 MFT records: $MFT, $LogFile, $Volume, $AttrDef, $Bitmap, $Boot, $BadClus, $Secure, $UpCase, $Extend. They are regular files but inaccessible from user-mode by default.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Write-ahead logging</strong> via $LogFile ensures metadata consistency after crashes — NTFS replays the log on mount, similar to how PostgreSQL uses WAL. The $UsnJrnl is a higher-level audit trail of all file operations.</Row>
              <Row c={C.purple}>NTFS uses <strong style={{color:C.bright}}>cluster-based allocation</strong> (default 4KB clusters on most volumes). Clusters are tracked by $Bitmap. Small files (&lt;~700B) are stored directly in the MFT record itself (resident data) — zero cluster cost.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["MFT = forensic gold", "Every file ever created leaves an MFT entry. Even after deletion, the record stays (just marked free) until overwritten. File carving exploits this.", C.cyan],
              ["ADS = stealth channel", "Named alternate data streams are invisible to Explorer, dir, and most AV. Malware uses them to hide payloads and executables inside innocent files.", C.red],
              ["Timestamps = evidence", "MACE timestamps in $SI + $FN are the primary timeline evidence in DFIR. Timestomping attacks $SI; $FN is the ground truth.", C.yellow],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture ── */}
        <PB title="NTFS ARCHITECTURE DIAGRAMS" icon="🗜" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["layout","VOLUME LAYOUT"],["mft","MFT RECORD STRUCTURE"],["metadata","METADATA FILES"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "layout" && <NTFSLayout />}
          {archTab === "mft" && <MFTRecord />}
          {archTab === "metadata" && (
            <div style={S.grid2}>
              {[
                ["$MFT (Record 0)", C.purple, "The Master File Table itself. Self-describing: $MFT's own MFT record is record 0. 1KB per record (default). $MFTMirr (record 1) backs up first 4 MFT records for recovery."],
                ["$LogFile (Record 2)", C.green, "Write-ahead journal for metadata. Stores redo/undo log records. Replayed on mount after crash. Forensic value: reveals recent metadata changes. ~64MB circular buffer."],
                ["$Volume (Record 3)", C.cyan, "Volume label, NTFS version (3.1 for Vista+), volume flags (dirty bit = crash recovery needed). fsutil volume query reads this."],
                ["$AttrDef (Record 4)", C.yellow, "Defines all valid attribute types (0x10 = $SI, 0x30 = $FN, 0x80 = $DATA, etc.) with min/max sizes. Custom attribute definitions possible."],
                ["$. (Root Dir, Record 5)", C.teal, "The root directory '\\'. An $INDEX_ALLOCATION attribute stores the B-tree of all top-level filenames. Every directory is an MFT record with $INDEX_ROOT + $INDEX_ALLOCATION."],
                ["$Bitmap (Record 6)", C.orange, "One bit per cluster — 1=allocated, 0=free. Also exists per-directory for MFT allocation tracking. Carving tools use this to find unallocated space."],
                ["$Secure (Record 9)", C.pink, "Centralised security descriptor database. Every file's DACL/SACL is stored here once and shared by reference. Security ID (SID) in $SI points here."],
                ["$Extend\\$UsnJrnl (Record 11+)", C.teal, "Change journal with two streams: $Max (config) and $J (the actual log). Sequential log of all file operations with reason flags. Forensic essential."],
              ].map(([name, c, desc]) => (
                <div key={name} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>{name}</div>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{desc}</div>
                </div>
              ))}
            </div>
          )}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — FILE CREATION INTERNAL PROCESS" icon="⚙" color={C.orange}>
          <FileCreateFlow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Security insight:</strong> Step 3 (SRM ACL check) is why NTFS permissions work — the check happens in kernel before any data is touched. Bypassing it requires a kernel exploit or impersonating a token with the required SID in its DACL match.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL — NTFS OPERATIONS" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NTFS METADATA ACCESS</div>
              <div style={S.code}>
{`# Volume info (NTFS version, cluster size):
PS> fsutil fsinfo volumeinfo C:
PS> fsutil fsinfo ntfsinfo C:

# Read $MFT directly (SYSTEM required):
C:\\> fsutil file layout C:\\Windows\\explorer.exe
# Shows: MFT record number, attribute list,
#        data run extents, timestamps

# Check cluster size:
PS> Get-Volume -DriveLetter C | 
    Select AllocationUnitSize

# Find fragmented files:
C:\\> defrag C: /A /V

# Query volume free/used space at cluster level:
PS> fsutil volume diskfree C:`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ACL & PERMISSION MANAGEMENT</div>
              <div style={S.code}>
{`# View NTFS ACL on file/directory:
PS> Get-Acl "C:\\Sensitive\\data.txt" | Format-List
C:\\> icacls "C:\\Sensitive\\data.txt"

# Grant permission:
C:\\> icacls "C:\\folder" /grant "Domain\\User:(OI)(CI)R"
# OI=ObjectInherit CI=ContainerInherit R=Read

# Remove all inherited ACEs (break inheritance):
C:\\> icacls "C:\\folder" /inheritance:d

# Find world-writable files (security audit):
PS> Get-ChildItem C:\\inetpub -Recurse | 
    ForEach-Object { 
      $acl = Get-Acl $_.FullName
      $acl.Access | Where-Object {
        $_.IdentityReference -match "Everyone|Users" 
        -and $_.FileSystemRights -match "Write|FullControl"
      } | Select-Object @{N="File";E={$_.FullName}}
    }`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ FORENSIC NTFS COMMANDS</div>
            <div style={S.code}>
{`# Enable $UsnJrnl if not active:
fsutil usn createjournal m=0x20000000 a=0x800000 C:

# Query recent changes (live system):
fsutil usn readjournal C: csv | 
    findstr /i "\.exe \.dll \.ps1 \.bat"

# Query change journal for specific file:
fsutil usn queryjournal C:

# Find files with ADS (Alternate Data Streams):
C:\\> dir /r C:\\Users /s | findstr ":"

# Check if file is resident (stored in MFT):
C:\\> fsutil file layout "C:\\small.txt" | findstr "Resident"

# View raw timestamps (FILETIME → datetime):
PS> $f = Get-Item "C:\\Windows\\explorer.exe"
PS> "Created : " + $f.CreationTimeUtc
PS> "Modified: " + $f.LastWriteTimeUtc
PS> "Accessed: " + $f.LastAccessTimeUtc

# Offline MFT parse (EZ-Tools — Eric Zimmermann):
MFTECmd.exe -f "C:\\$MFT" --csv C:\\forensics --csvf mft.csv
MFTECmd.exe -f "C:\\$Extend\\$UsnJrnl:$J" --csv C:\\forensics`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View (ADS + Timestamps) ── */}
        <PB title="INTERNAL SYSTEM VIEW — ADS · TIMESTAMPS · USNJRNL" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["timestamps","MACE TIMESTAMPS"],["ads","ALTERNATE DATA STREAMS"],["usn","$USNJRNL JOURNAL"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>
          {intTab === "timestamps" && <TimestampsPanel />}
          {intTab === "ads" && <ADSPanel />}
          {intTab === "usn" && <USNPanel />}
        </PB>

        {/* ── 7: Security ── */}
        <PB title="SECURITY PERSPECTIVE" icon="🛡" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["attack","defense","redteam"].map(t => (
              <button key={t} style={S.tab(secTab === t, C.red)} onClick={() => setSecTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {secTab === "attack" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NTFS ATTACK TECHNIQUES</div>
                {[
                  ["ADS Payload Hiding", "Store malicious PE inside legitimate file's ADS. Execute via wmic, forfiles, or custom loader. Bypasses many AV scans that check default stream only.", C.red],
                  ["Timestomping", "Overwrite $SI MACE timestamps to match surrounding files and blend into filesystem. Tool: timestomp (Metasploit), SetFileTime() API. $FN remains correct — detection via mismatch.", C.orange],
                  ["$MFT Slack Forensic Evasion", "MFT records have slack space after attributes. Malware has stored data here. Standard file carving misses it.", C.yellow],
                  ["Resident Data Stealth", "Store small payload (<700B) as resident $DATA in MFT of innocent-looking file. Doesn't appear in cluster scan / unallocated space search.", C.purple],
                  ["NTFS Case Sensitivity Abuse", "NTFS is case-insensitive by default. Bypass path-based detections with mixed case: C:\\Windows\\SYSTEM32\\cmd.exe vs C:\\windows\\system32\\CMD.EXE", C.pink],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#120808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ PERMISSION & NTFS BYPASS ATTACKS</div>
                {[
                  ["DLL Search Order Hijacking", "NTFS permissions on DLL search path directories. If %PATH% dir is world-writable, plant malicious DLL before legitimate one in search order.", C.red],
                  ["Writable Service Binary Path", "Service ImagePath points to world-writable directory → replace binary → SCM executes attacker code as SYSTEM on restart.", C.orange],
                  ["Symlink / Junction Attacks", "NTFS junction points and symlinks. Non-admin can create directory junctions → redirect privileged writes to arbitrary locations (CVE pattern: arbitrary file write → SYSTEM).", C.yellow],
                  ["Short Filename (8.3) Bypass", "NTFS maintains 8.3 short names (e.g. PROGRA~1). AppLocker rules on long paths bypassed via equivalent short name.", C.red],
                  ["Opportunistic Locking Abuse", "Oplock on file → trigger TOCTOU race: attacker holds oplock, file checked as safe, then oplock released with swapped content.", C.orange],
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
                ["Audit ADS on critical paths", "Enable Sysmon Event 15 (FileCreateStreamHash) — logs creation of any named ADS with file hash. Catch ADS payload delivery at write time.", C.green],
                ["Protect world-writable dirs", "Audit %PATH% directories, C:\\Temp, C:\\Users\\Public for write permissions. icacls audit script weekly. Remove world-write from system paths.", C.cyan],
                ["Enable $UsnJrnl", "Ensure change journal is enabled and adequately sized (fsutil usn createjournal m=0x10000000 a=0x800000). Forward to SIEM for file activity baseline.", C.green],
                ["Disable 8.3 filename generation", "fsutil behavior set disable8dot3 1 — eliminates short filename bypass vector. Test for application compatibility first.", C.orange],
                ["Monitor symlink/junction creation", "Sysmon Event 23 (FileDelete) + Process Monitor for CreateSymbolicLink calls by non-admin processes. Flag junction creation in sensitive paths.", C.purple],
                ["Harden EFS", "Enforce EFS for sensitive data directories via GPO. Backup recovery agent configured. Monitor for EFS key export (Event 4663 on EFS cert store).", C.yellow],
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
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ RED TEAM NTFS PLAYBOOK</div>
              <div style={S.code}>
{`# === ADS PAYLOAD DELIVERY ===
# Drop payload into ADS of a log file:
type C:\\tools\\beacon.exe > C:\\Windows\\Temp\\debug.log:svc.exe

# Execute from ADS (wmic):
wmic process call create "C:\\Windows\\Temp\\debug.log:svc.exe"

# PowerShell load from ADS:
$bytes = [System.IO.File]::ReadAllBytes(
    [System.IO.Path]::GetFullPath("C:\\tmp\\f.txt") + ":payload")
[System.Reflection.Assembly]::Load($bytes)

# === TIMESTOMPING ===
# Meterpreter timestomp:
meterpreter> timestomp C:\\tmp\\evil.exe -f C:\\Windows\\notepad.exe

# PowerShell timestomp:
$file = "C:\\tmp\\evil.exe"
[System.IO.File]::SetCreationTime($file, "2022-01-01 10:00:00")
[System.IO.File]::SetLastWriteTime($file, "2022-01-01 10:00:00")
[System.IO.File]::SetLastAccessTime($file, "2022-01-01 10:00:00")
# Note: only modifies $SI — $FN timestamps remain original

# === ZONE.IDENTIFIER REMOVAL (hide download origin) ===
Remove-Item -Path "C:\\Users\\user\\Downloads\\payload.exe"
    -Stream "Zone.Identifier" -Force

# === WRITABLE PATH ENUM (DLL hijack recon) ===
# Check each dir in %PATH% for write access:
$env:Path.Split(";") | ForEach-Object {
    $acl = Get-Acl $_
    if ($acl.Access | Where { $_.IdentityReference -match "Users"
        -and $_.FileSystemRights -match "Write"}) { $_ }
}`}
              </div>
            </div>
          )}
        </PB>

        {/* ── 8: Monitoring ── */}
        <PB title="MONITORING & FORENSICS" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","sysmon","tools","artifacts"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WINDOWS EVENT IDs — FILE SYSTEM MONITORING</div>
              <div style={S.grid2}>
                {[
                  ["4656","File object handle requested (pre-access)", C.cyan],
                  ["4658","File handle closed", C.dim],
                  ["4660","File deleted (after 4656 showing DELETE access)", C.red],
                  ["4663","File/dir access: read/write/delete/execute with subject + object details", C.orange],
                  ["4670","File permissions changed — DACL modification", C.red],
                  ["4985","Transaction state change ($TXFLOG - TxF)", C.dim],
                  ["5145","Network share file access audit (if enabled via SACL)", C.cyan],
                  ["4698","Scheduled task created (persists as XML file in Tasks dir)", C.orange],
                ].map(([id, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                    <span style={{ ...S.badge(c), minWidth: "38px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={S.code}>
{`# Enable Object Access audit:
auditpol /set /subcategory:"File System" /success:enable /failure:enable

# Set SACL on sensitive directory (audit all access):
icacls "C:\\Sensitive" /audit "Everyone:(OI)(CI)(F)"

# Query file access events:
Get-WinEvent -LogName Security | Where-Object {$_.Id -eq 4663} |
  Select-Object TimeCreated,
    @{N="Object";E={$_.Properties[6].Value}},
    @{N="Access";E={$_.Properties[8].Value}},
    @{N="Process";E={$_.Properties[11].Value}}`}
                </div>
              </div>
            </div>
          )}

          {monTab === "sysmon" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON FILE SYSTEM EVENTS</div>
              <div style={S.grid2}>
                {[
                  ["Event 11", "FileCreate — logs file creation with hash, process, target path", C.cyan],
                  ["Event 15", "FileCreateStreamHash — ADS creation with stream name + hash. Critical for ADS detection.", C.red],
                  ["Event 23", "FileDelete — file deletion with hash (before delete). Enables 'deleted file' recovery evidence.", C.orange],
                  ["Event 26", "FileDeleteDetected — alternate delete detection path", C.dim],
                ].map(([id, desc, c]) => (
                  <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
                    <span style={{ ...S.badge(c), minWidth: "65px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={S.code}>
{`<!-- Sysmon rule — detect ADS creation: -->
<FileCreateStreamHash onmatch="include">
  <TargetFilename condition="contains">\\Users\\</TargetFilename>
  <TargetFilename condition="contains">\\Temp\\</TargetFilename>
  <TargetFilename condition="contains">\\Public\\</TargetFilename>
</FileCreateStreamHash>

<!-- Detect Zone.Identifier removal: -->
<!-- Any FileCreate of :Zone.Identifier → download origin -->
<!-- Its ABSENCE after download process → suspicious deletion -->

# Query Sysmon Event 15 (ADS creation):
Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational"
  | Where-Object {$_.Id -eq 15}
  | Select TimeCreated,
      @{N="File";E={$_.Properties[4].Value}},
      @{N="Stream";E={$_.Properties[5].Value}},
      @{N="Hash";E={$_.Properties[6].Value}}`}
              </div>
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["MFTECmd (EZ-Tools)", "MFTECmd.exe -f $MFT --csv out", "Parse raw $MFT offline. Extract all files, timestamps ($SI and $FN), ADS entries, resident data. Best-in-class DFIR tool.", C.cyan],
                ["Velociraptor", "Windows.NTFS.MFT artifact", "Agent-based live NTFS forensics. Stream $MFT, $UsnJrnl, $LogFile remotely. Enterprise-scale DFIR platform.", C.green],
                ["Autopsy / Sleuth Kit", "icat / ffind / ils", "Open source forensic suite. Parse disk images. MFT analysis, file carving in unallocated clusters.", C.purple],
                ["Sysinternals Streams", "streams.exe -s C:\\path", "List all ADS on files in a directory tree. Quick triage for ADS presence.", C.orange],
                ["Process Monitor (ProcMon)", "ProcMon with Path filter", "Real-time file I/O tracing. Shows every NTFS operation by process: CreateFile, ReadFile, WriteFile, SetInfo.", C.yellow],
                ["Disk2vhd / FTK Imager", "Physical disk image", "Create forensic image for offline analysis. Preserve MFT slack, unallocated clusters, VSS shadow copies.", C.dim],
              ].map(([t, cmd, d, c]) => (
                <div key={t} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{t}</div>
                  <div style={{ color: C.dim, fontSize: "10px", fontStyle: "italic", marginBottom: "4px" }}>{cmd}</div>
                  <div style={{ color: C.text, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {monTab === "artifacts" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NTFS FORENSIC ARTIFACTS — WHAT SURVIVES DELETION</div>
              <div style={S.grid2}>
                {[
                  ["MFT Record (marked free)", "When a file is deleted, its MFT record is marked as available — NOT zeroed. Filename, timestamps, data runs remain until the record is reused.", C.cyan],
                  ["$UsnJrnl $J Stream", "Circular buffer logs FILE_CREATE, FILE_DELETE events with filename + timestamp. Persists days/weeks after deletion depending on activity.", C.teal],
                  ["$LogFile Redo Log", "Metadata journal entries for recent operations. Small window (64MB) but can reveal last file operations before imaging.", C.green],
                  ["MFT Slack Space", "Each 1KB MFT record may have unused bytes after attribute list. Previous file content or attribute remnants may exist here.", C.purple],
                  ["Unallocated Cluster Data", "Cluster marked free in $Bitmap doesn't zero the data. File carving recovers PE headers, strings, documents from unallocated space.", C.orange],
                  ["VSS Shadow Copies", "Volume Shadow Service snapshots of the entire volume. Include $MFT, $UsnJrnl at point-in-time. Attackers delete them; defenders monitor deletion.", C.yellow],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#09090f", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                    <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                    <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                  </div>
                ))}
              </div>
              <hr style={S.sep} />
              <div style={S.code}>
{`# List VSS shadow copies:
vssadmin list shadows
Get-WmiObject Win32_ShadowCopy | Select DeviceObject, InstallDate

# Access shadow copy via symlink (forensic copy):
mklink /d C:\\shadow \\\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1\\
# Then: MFTECmd.exe -f C:\\shadow\\$MFT --csv C:\\out

# Detect VSS deletion (ransomware indicator):
# EventID 8222 in Application log = shadow copy deleted
# Or Sysmon Event 1: vssadmin.exe / wmic shadowcopy delete / bcdedit
Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" 
  | Where {$_.Id -eq 1} 
  | Where {$_.Message -match "shadowcopy|vssadmin|wbadmin"}`}
              </div>
            </div>
          )}
        </PB>

        {/* ── 9: NTFS vs ext4 ── */}
        <PB title="NTFS vs ext4 — FILESYSTEM COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["structure","journal","timestamps","security"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <ComparePanel tab={cmpTab} />
        </PB>

        {/* ── 10: Enterprise Scenario ── */}
        <PB title="ENTERPRISE SCENARIO — RANSOMWARE NTFS FORENSICS" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: Ransomware Deployed — Reconstruct Attack Timeline from NTFS Artifacts
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WHAT ANALYST FINDS (LIVE SYSTEM)</div>
              <div style={S.code}>
{`# Files encrypted with .locked extension
# VSS shadow copies deleted
# vssadmin.exe called at 04:12 UTC

# Ransom note: C:\\Users\\Public\\README.txt
# Zone.Identifier ABSENT on dropper:
Get-Item "C:\\Users\\jsmith\\Downloads\\invoice.exe"
    -Stream * → only :$DATA (no Zone.Identifier!)
# → manually deleted to hide download source

# ADS on README.txt:
Get-Item "C:\\Users\\Public\\README.txt" -Stream *
# → README.txt:config (contains C2 config!)`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ NTFS ARTIFACT RECONSTRUCTION</div>
              <div style={S.code}>
{`# 1. Mount shadow copy (if any survive):
mklink /d C:\\shadow \\\\?\\GLOBALROOT\\Device\\
         HarddiskVolumeShadowCopy1\\

# 2. Parse $UsnJrnl for timeline:
MFTECmd.exe -f "C:\\shadow\\\`$Extend\\\`$UsnJrnl:\`$J"
    --csv C:\\forensics → filter FILE_DELETE at 04:12

# 3. Recover dropper from MFT slack:
# MFT record for deleted invoice.exe still present
# Data run LCN → read cluster → PE header found

# 4. $LogFile for metadata timeline:
MFTECmd.exe -f "C:\\shadow\\\`$LogFile" --csv C:\\forensics
# Reveals exact sequence of file renames (.locked)

# 5. Timestomp detected:
# invoice.exe: $SI Created = 2020-01-01 (fake)
#              $FN Created = 2024-11-14 03:58 UTC
# → $SI vs $FN mismatch = timestomp confirmed`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Attacker Actions", "Delivered dropper, deleted Zone.Identifier, timestomped binary, ran ransomware, deleted VSS, stored C2 config in ADS", C.orange],
              ["NTFS Evidence Found", "$UsnJrnl file operations, $FN timestamps exposing timestomp, deleted file MFT records, ADS on ransom note, VSS deletion EventID 8222", C.cyan],
              ["Key Takeaway", "Even after ransomware wipe: $UsnJrnl, $LogFile, MFT slack, and unallocated clusters reconstruct the full kill chain from disk alone", C.green],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#09090f", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 11: Checklist ── */}
        <PB title="AUDITOR / SECURITY CHECKLIST — NTFS HARDENING" icon="✓" color={C.green}>
          <div style={S.grid2}>
            {[
              [C.green, "NTFS Configuration", [
                "Disable 8.3 filename generation (fsutil behavior set disable8dot3 1)",
                "Enable $UsnJrnl with adequate size (fsutil usn createjournal)",
                "Confirm NTFS (not FAT32/exFAT) on all OS and data volumes",
                "Set cluster size appropriately (4KB default; 64KB for database servers)",
              ]],
              [C.cyan, "ACL & Permission Audit", [
                "Audit C:\\Windows\\System32 for any non-standard write ACEs",
                "Check all directories in %PATH% — no Users/Everyone write access",
                "Audit C:\\ProgramData and C:\\Users\\Public for excessive permissions",
                "Review icacls on service binary directories for non-SYSTEM write",
              ]],
              [C.orange, "ADS & Timestamp Monitoring", [
                "Deploy Sysmon Event 15 (FileCreateStreamHash) for ADS detection",
                "Alert on Zone.Identifier deletion from downloaded executables",
                "Baseline normal ADS (e.g. :Zone.Identifier, :encryptable) — alert on novel streams",
                "Compare $SI vs $FN timestamps on binaries in sensitive paths quarterly",
              ]],
              [C.purple, "VSS & Recovery Posture", [
                "Verify VSS shadow copies exist and are current (vssadmin list shadows)",
                "Alert on vssadmin.exe / wmic shadowcopy delete execution (Sysmon Event 1)",
                "Offsite backup in addition to VSS — ransomware targets both",
                "Test recovery from shadow copies monthly",
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

        {/* ── 12: Summary ── */}
        <PB title="SUMMARY — KEY TAKEAWAYS" icon="📋" color={C.teal} accent={C.teal + "44"}>
          <div style={S.grid3}>
            {[
              ["MFT is the filesystem database", "Every file = 1KB MFT record with typed attribute columns. Survives deletion. First place forensic analysts look.", C.purple],
              ["Two timestamp sets per file", "$STANDARD_INFO (user-accessible, fakeable) + $FILE_NAME (kernel-only, reliable). Mismatch = timestomp.", C.yellow],
              ["ADS = hidden namespace", "Multiple $DATA attributes per MFT record. Named streams invisible to dir, Explorer, most AV. Sysmon Event 15 is the detector.", C.red],
              ["$LogFile = crash recovery + forensics", "Write-ahead journal ensures consistency. Also reveals last metadata operations — useful in tight forensic windows.", C.green],
              ["$UsnJrnl = audit trail", "FILE_CREATE/DELETE/RENAME logged in $Extend\\$UsnJrnl:$J. Circular buffer. Lives days after deletion. Best source for file timeline.", C.teal],
              ["Unallocated ≠ gone", "Deleted MFT records, cluster data, and $Bitmap free space retain old content until overwritten. File carving recovers it all.", C.cyan],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 04: Process & Thread Internals — EPROCESS, ETHREAD, Handle Tables, Token Architecture & Process Injection
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 03 Complete</Pill>
              <Pill c={C.teal}>12 Panels · NTFS Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
