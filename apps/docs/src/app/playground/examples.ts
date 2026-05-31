/** Playground example snippets — one per component. */

export interface PlaygroundExample {
  label: string;
  icon: string;
  code: string;
}

export const EXAMPLES: Record<string, PlaygroundExample> = {
  box: {
    label: "Box",
    icon: "⬡",
    code: `function Demo() {
  return (
    <VStack gap={16} style={{ maxWidth: 340 }}>
      <Box bg="#024CCE" p={20} rounded={12}>
        <Text style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Hello, Stareezy UI</Text>
        <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>A fully typed design token system.</Text>
      </Box>
      <HStack gap={8}>
        <Box bg="#E6EDFA" p={12} rounded={8} style={{ flex: 1, textAlign: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: 600, color: '#024CCE' }}>celurenBlue</Text>
        </Box>
        <Box bg="#F3FFE3" p={12} rounded={8} style={{ flex: 1, textAlign: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: 600, color: '#4D8D01' }}>lawnGreen</Text>
        </Box>
        <Box bg="#FFE9EC" p={12} rounded={8} style={{ flex: 1, textAlign: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: 600, color: '#C20219' }}>crimsonRed</Text>
        </Box>
      </HStack>
    </VStack>
  );
}`,
  },
  button: {
    label: "Button",
    icon: "◈",
    code: `function Demo() {
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const handleLoad = () => { setLoading(true); setTimeout(() => setLoading(false), 1500); };
  return (
    <VStack gap={20} style={{ maxWidth: 360 }}>
      <HStack gap={10} style={{ flexWrap: 'wrap' }}>
        <Button variant="primary" text="Primary" />
        <Button variant="secondary" text="Secondary" />
        <Button variant="tertiary" text="Tertiary" />
        <Button variant="danger" text="Danger" />
      </HStack>
      <HStack gap={10} style={{ flexWrap: 'wrap' }}>
        <Button variant="primary" size="sm" text="Small" />
        <Button variant="primary" size="md" text="Medium" />
        <Button variant="primary" size="lg" text="Large" />
        <Button variant="primary" size="xl" text="XL" />
      </HStack>
      <HStack gap={10}>
        <Button variant="primary" text={\`Clicked \${count}x\`} onClick={() => setCount(c => c + 1)} />
        <Button variant="secondary" text={loading ? "Loading…" : "Load"} loading={loading} onClick={handleLoad} />
        <Button variant="primary" text="Disabled" disabled />
      </HStack>
    </VStack>
  );
}`,
  },
  input: {
    label: "Input",
    icon: "⌨",
    code: `function Demo() {
  const [val, setVal] = React.useState('');
  const [email, setEmail] = React.useState('');
  const emailError = email && !email.includes('@') ? 'Enter a valid email.' : '';
  return (
    <VStack gap={16} style={{ maxWidth: 360 }}>
      <Input label="Full Name" placeholder="Enter your name" value={val} onInput={e => setVal(e.target.value)} hint="Appears on your profile." />
      <Input label="Email" placeholder="you@example.com" value={email} onInput={e => setEmail(e.target.value)} error={emailError} required />
      <Input label="Password" placeholder="••••••••" type="password" />
      <Input label="Disabled" value="Cannot edit" disabled />
      <Input label="Search" placeholder="Search…" leftIcon="🔍" />
    </VStack>
  );
}`,
  },
  switch: {
    label: "Switch",
    icon: "⊙",
    code: `function Demo() {
  const [notif, setNotif] = React.useState(true);
  const [dark, setDark] = React.useState(false);
  const [save, setSave] = React.useState(true);
  const [analytics, setAnalytics] = React.useState(false);
  const rows = [
    { label: 'Push notifications', desc: 'Receive alerts', val: notif, set: setNotif, color: '#024CCE' },
    { label: 'Dark mode', desc: 'Switch to dark theme', val: dark, set: setDark, color: '#8b5cf6' },
    { label: 'Auto-save', desc: 'Save automatically', val: save, set: setSave, color: '#10b981' },
    { label: 'Analytics', desc: 'Help improve product', val: analytics, set: setAnalytics, color: '#f59e0b' },
  ];
  return (
    <VStack gap={0} style={{ maxWidth: 340, border: '1px solid #E3ECF4', borderRadius: 12, overflow: 'hidden' }}>
      {rows.map(({ label, desc, val, set, color }, i) => (
        <HStack key={label} alignItems="center" justifyContent="space-between" p={16}
          style={{ borderBottom: i < rows.length - 1 ? '1px solid #E3ECF4' : 'none', background: '#fff' }}>
          <VStack gap={2}>
            <Text style={{ fontSize: 14, fontWeight: 600, color: '#0F1010' }}>{label}</Text>
            <Text style={{ fontSize: 12, color: '#7D868E' }}>{desc}</Text>
          </VStack>
          <Switch value={val} onChange={set} activeColor={color} />
        </HStack>
      ))}
    </VStack>
  );
}`,
  },
  checkbox: {
    label: "Checkbox",
    icon: "☑",
    code: `function Demo() {
  const [items, setItems] = React.useState({ react: true, typescript: true, tailwind: false, nextjs: false, vitest: true });
  const keys = Object.keys(items);
  const allChecked = keys.every(k => items[k]);
  const someChecked = keys.some(k => items[k]);
  const toggle = k => setItems(p => ({ ...p, [k]: !p[k] }));
  const toggleAll = () => { const n = !allChecked; setItems(Object.fromEntries(keys.map(k => [k, n]))); };
  return (
    <VStack gap={12} style={{ maxWidth: 280 }}>
      <Checkbox checked={allChecked} indeterminate={!allChecked && someChecked} onChange={toggleAll}
        label={<Text style={{ fontWeight: 700, fontSize: 14 }}>Select all</Text>} size="md" />
      <Box style={{ height: 1, background: '#E3ECF4' }} />
      {keys.map(k => (
        <Checkbox key={k} checked={items[k]} onChange={() => toggle(k)}
          label={k.charAt(0).toUpperCase() + k.slice(1)} size="md" />
      ))}
      <Box bg="#E6EDFA" p={10} rounded={8}>
        <Text style={{ fontSize: 12, color: '#024CCE', fontWeight: 500 }}>
          Selected: {keys.filter(k => items[k]).join(', ') || 'none'}
        </Text>
      </Box>
    </VStack>
  );
}`,
  },
  dropdown: {
    label: "Dropdown",
    icon: "▾",
    code: `function Demo() {
  const [fw, setFw] = React.useState('');
  const [langs, setLangs] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const frameworks = [
    { value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' }, { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'SolidJS' },
  ];
  const allLangs = [
    { value: 'js', label: 'JavaScript', group: 'Web' }, { value: 'ts', label: 'TypeScript', group: 'Web' },
    { value: 'py', label: 'Python', group: 'Backend' }, { value: 'go', label: 'Go', group: 'Backend' },
  ];
  const filtered = search ? frameworks.filter(f => f.label.toLowerCase().includes(search.toLowerCase())) : frameworks;
  return (
    <VStack gap={20} style={{ maxWidth: 320 }}>
      <Dropdown options={frameworks} value={fw} onChange={setFw} label="Framework" placeholder="Select a framework" size="md" />
      <Dropdown options={filtered} label="Async search" placeholder="Type to filter..." searchable searchValue={search} onSearchChange={setSearch} size="md" />
      <Dropdown options={allLangs} value={langs} onChange={setLangs} label="Languages (multi)" placeholder="Select languages" multiple size="md" />
      {fw && <Box bg="#E6EDFA" p={10} rounded={8}><Text style={{ fontSize: 12, color: '#024CCE', fontWeight: 500 }}>Selected: {fw}</Text></Box>}
    </VStack>
  );
}`,
  },
  tabs: {
    label: "Tabs",
    icon: "⊟",
    code: `function Demo() {
  const [active, setActive] = React.useState('overview');
  const [variant, setVariant] = React.useState('underline');
  const items = [
    { key: 'overview', label: 'Overview' }, { key: 'specs', label: 'Specs' },
    { key: 'reviews', label: 'Reviews', badge: '12' }, { key: 'faq', label: 'FAQ' },
  ];
  const content = { overview: 'Overview: A fully typed, cross-platform design token system.', specs: 'Specs: cross-platform, typed tokens, O(1) runtime.', reviews: '12 reviews — average rating 4.8/5.', faq: 'Q: Does it work on React Native? A: Yes!' };
  return (
    <VStack gap={20} style={{ maxWidth: 400 }}>
      <HStack gap={8}>
        {['underline','pills','card'].map(v => (
          <button key={v} onClick={() => setVariant(v)}
            style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #D9E6F0', background: variant === v ? '#024CCE' : '#fff', color: variant === v ? '#fff' : '#0F1010', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {v}
          </button>
        ))}
      </HStack>
      <Tabs items={items} activeKey={active} onChange={setActive} variant={variant} />
      <Box bg="#f8faff" p={16} rounded={10} style={{ border: '1px solid #E3ECF4' }}>
        <Text style={{ fontSize: 14, color: '#515253', lineHeight: 1.6 }}>{content[active]}</Text>
      </Box>
    </VStack>
  );
}`,
  },
  accordion: {
    label: "Accordion",
    icon: "⊞",
    code: `function Demo() {
  const items = [
    { key: '1', title: 'What is Stareezy UI?', content: 'A fully typed, cross-platform design token system and component library for React Native and web.' },
    { key: '2', title: 'How do tokens work?', content: 'Tokens are plain objects with an id and value. The runtime resolves them in O(1) via a Map lookup.' },
    { key: '3', title: 'Is it cross-platform?', content: 'Yes — the same component API works on web and React Native. One source of truth.' },
    { key: '4', title: 'Disabled item', content: 'This item cannot be opened.', disabled: true },
  ];
  return <VStack gap={20} style={{ maxWidth: 420 }}><Accordion items={items} variant="separated" /></VStack>;
}`,
  },
  progress: {
    label: "Progress",
    icon: "▬",
    code: `function Demo() {
  const [val, setVal] = React.useState(65);
  React.useEffect(() => { const id = setInterval(() => setVal(v => v >= 100 ? 0 : v + 1), 80); return () => clearInterval(id); }, []);
  return (
    <VStack gap={20} style={{ maxWidth: 360 }}>
      <Progress value={val} showPercentage label="Animated" color="#024CCE" />
      <Progress value={78} showPercentage label="Gradient" variant="gradient" />
      <Progress value={55} showPercentage label="Striped" variant="striped" />
      <Progress value={90} showPercentage label="Success" color="#10b981" trackColor="#d1fae5" size="lg" />
      <Progress value={30} showPercentage label="Warning" color="#f59e0b" trackColor="#fef3c7" size="sm" />
      <CircularProgress value={val} size="lg" showValue color="#024CCE" />
    </VStack>
  );
}`,
  },
  avatar: {
    label: "Avatar",
    icon: "◉",
    code: `function Demo() {
  return (
    <VStack gap={24} style={{ maxWidth: 360 }}>
      <VStack gap={8}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: '#7D868E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sizes</Text>
        <HStack gap={12} alignItems="center">
          {['xs','sm','md','lg','xl','2xl'].map(s => <Avatar key={s} name="Bintang R" size={s} />)}
        </HStack>
      </VStack>
      <VStack gap={8}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: '#7D868E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</Text>
        <HStack gap={16} alignItems="center">
          <Avatar name="Online" size="lg" status="online" />
          <Avatar name="Away" size="lg" status="away" />
          <Avatar name="Busy" size="lg" status="busy" />
          <Avatar name="Offline" size="lg" status="offline" />
        </HStack>
      </VStack>
      <VStack gap={8}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: '#7D868E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Shapes</Text>
        <HStack gap={16} alignItems="center">
          <Avatar name="Circle" size="xl" shape="circle" />
          <Avatar name="Rounded" size="xl" shape="rounded" />
          <Avatar name="Square" size="xl" shape="square" />
        </HStack>
      </VStack>
    </VStack>
  );
}`,
  },
  slider: {
    label: "Slider",
    icon: "⊸",
    code: `function Demo() {
  const [vol, setVol] = React.useState(60);
  const [bright, setBright] = React.useState(80);
  const [temp, setTemp] = React.useState(22);
  return (
    <VStack gap={24} style={{ maxWidth: 360 }}>
      <VStack gap={8}>
        <HStack justifyContent="space-between"><Text style={{ fontSize: 14, fontWeight: 600 }}>🔊 Volume</Text><Text style={{ fontSize: 14, color: '#024CCE', fontWeight: 700 }}>{vol}%</Text></HStack>
        <Slider value={vol} onChange={setVol} color="#024CCE" size="md" />
      </VStack>
      <VStack gap={8}>
        <HStack justifyContent="space-between"><Text style={{ fontSize: 14, fontWeight: 600 }}>☀ Brightness</Text><Text style={{ fontSize: 14, color: '#f59e0b', fontWeight: 700 }}>{bright}%</Text></HStack>
        <Slider value={bright} onChange={setBright} color="#f59e0b" trackColor="#fef3c7" size="md" />
      </VStack>
      <VStack gap={8}>
        <HStack justifyContent="space-between"><Text style={{ fontSize: 14, fontWeight: 600 }}>🌡 Temperature</Text><Text style={{ fontSize: 14, color: '#10b981', fontWeight: 700 }}>{temp}°C</Text></HStack>
        <Slider value={temp} onChange={setTemp} min={16} max={30} step={1} color="#10b981" trackColor="#d1fae5" marks={[{value:16,label:'16°'},{value:22,label:'22°'},{value:30,label:'30°'}]} size="md" />
      </VStack>
    </VStack>
  );
}`,
  },
  spinner: {
    label: "Spinner",
    icon: "↻",
    code: `function Demo() {
  return (
    <VStack gap={24} style={{ maxWidth: 360 }}>
      <VStack gap={8}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: '#7D868E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sizes</Text>
        <HStack gap={20} alignItems="center">{['xs','sm','md','lg','xl'].map(s => <Spinner key={s} size={s} />)}</HStack>
      </VStack>
      <VStack gap={8}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: '#7D868E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Variants</Text>
        <HStack gap={32} alignItems="center">
          <VStack gap={6} alignItems="center"><Spinner variant="ring" size="lg" /><Text style={{ fontSize: 11, color: '#7D868E' }}>ring</Text></VStack>
          <VStack gap={6} alignItems="center"><Spinner variant="dots" size="lg" /><Text style={{ fontSize: 11, color: '#7D868E' }}>dots</Text></VStack>
          <VStack gap={6} alignItems="center"><Spinner variant="pulse" size="lg" /><Text style={{ fontSize: 11, color: '#7D868E' }}>pulse</Text></VStack>
        </HStack>
      </VStack>
      <VStack gap={8}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: '#7D868E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Colors</Text>
        <HStack gap={20} alignItems="center">
          <Spinner size="lg" color="#024CCE" /><Spinner size="lg" color="#8b5cf6" /><Spinner size="lg" color="#10b981" /><Spinner size="lg" color="#f59e0b" /><Spinner size="lg" color="#f43f5e" />
        </HStack>
      </VStack>
    </VStack>
  );
}`,
  },
  skeleton: {
    label: "Skeleton",
    icon: "▭",
    code: `function Demo() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => { const id = setTimeout(() => setLoaded(true), 2000); return () => clearTimeout(id); }, []);
  if (loaded) {
    return (
      <VStack gap={16} style={{ maxWidth: 320 }}>
        <HStack gap={12} alignItems="center">
          <Avatar name="Bintang R" size="lg" status="online" />
          <VStack gap={4}><Text style={{ fontSize: 15, fontWeight: 700 }}>Bintang</Text><Text style={{ fontSize: 13, color: '#7D868E' }}>Senior Engineer</Text></VStack>
        </HStack>
        <Box bg="#f8faff" p={14} rounded={10} style={{ border: '1px solid #E3ECF4' }}>
          <Text style={{ fontSize: 14, color: '#515253', lineHeight: 1.6 }}>Building beautiful cross-platform UIs with typed design tokens.</Text>
        </Box>
        <Button variant="secondary" text="↺ Reset" onClick={() => setLoaded(false)} size="sm" />
      </VStack>
    );
  }
  return (
    <VStack gap={16} style={{ maxWidth: 320 }}>
      <HStack gap={12} alignItems="center">
        <Skeleton variant="circular" style={{ width: 48, height: 48 }} />
        <VStack gap={6} style={{ flex: 1 }}>
          <Skeleton variant="text" style={{ width: '70%', height: '1em' }} />
          <Skeleton variant="text" style={{ width: '50%', height: '0.85em' }} />
        </VStack>
      </HStack>
      <Skeleton variant="rounded" style={{ width: '100%', height: 80 }} />
      <Skeleton variant="text" lines={3} style={{ width: '100%' }} />
      <Text style={{ fontSize: 12, color: '#7D868E' }}>Loading… (2s)</Text>
    </VStack>
  );
}`,
  },
  divider: {
    label: "Divider",
    icon: "─",
    code: `function Demo() {
  return (
    <VStack gap={0} style={{ maxWidth: 360 }}>
      <Box p={16}><Text style={{ fontSize: 14, fontWeight: 600 }}>Section A</Text><Text style={{ fontSize: 13, color: '#7D868E', marginTop: 4 }}>Content above the divider.</Text></Box>
      <Divider />
      <Box p={16}><Text style={{ fontSize: 14, fontWeight: 600 }}>Section B</Text><Text style={{ fontSize: 13, color: '#7D868E', marginTop: 4 }}>Content below the divider.</Text></Box>
      <Divider label="OR" />
      <Box p={16}><Text style={{ fontSize: 14, fontWeight: 600 }}>Section C</Text><Text style={{ fontSize: 13, color: '#7D868E', marginTop: 4 }}>After a labeled divider.</Text></Box>
      <Divider label="Continue with" labelPosition="left" color="#024CCE" />
      <HStack gap={10} p={16}>
        <Button variant="secondary" text="Google" size="sm" fullWidth />
        <Button variant="secondary" text="GitHub" size="sm" fullWidth />
      </HStack>
    </VStack>
  );
}`,
  },
  clipboard: {
    label: "Clipboard",
    icon: "⎘",
    code: `function Demo() {
  return (
    <VStack gap={16} style={{ maxWidth: 380 }}>
      <VStack gap={6}><Text style={{ fontSize: 13, fontWeight: 600, color: '#0F1010' }}>Install command</Text><Clipboard value="pnpm add @stareezy-ui/components @stareezy-ui/tokens" /></VStack>
      <VStack gap={6}><Text style={{ fontSize: 13, fontWeight: 600, color: '#0F1010' }}>API Key</Text><Clipboard value="sk-live-abc123xyz789" displayValue="sk-live-••••••••••789" /></VStack>
      <VStack gap={6}><Text style={{ fontSize: 13, fontWeight: 600, color: '#0F1010' }}>Import snippet</Text><Clipboard value="import { Box, Text, Button } from '@stareezy-ui/components'" /></VStack>
    </VStack>
  );
}`,
  },
  modal: {
    label: "Modal",
    icon: "⬜",
    code: `function Demo() {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState('md');
  return (
    <VStack gap={16} style={{ maxWidth: 360 }}>
      <HStack gap={8} style={{ flexWrap: 'wrap' }}>
        {['xs','sm','md','lg'].map(s => (
          <Button key={s} variant={size === s ? 'primary' : 'secondary'} text={s.toUpperCase()} size="sm" onClick={() => setSize(s)} />
        ))}
      </HStack>
      <Button variant="primary" text="Open Modal" onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} title="Modal Title" size={size}
        footer={<HStack gap={8} justifyContent="flex-end"><Button variant="secondary" text="Cancel" size="sm" onClick={() => setOpen(false)} /><Button variant="primary" text="Confirm" size="sm" onClick={() => setOpen(false)} /></HStack>}>
        <Text style={{ fontSize: 14, color: '#515253', lineHeight: 1.6 }}>This is the modal body. You can put any content here — forms, images, lists, or any React nodes.</Text>
      </Modal>
    </VStack>
  );
}`,
  },
  resizer: {
    label: "Resizer",
    icon: "⤡",
    code: `function Demo() {
  const [size, setSize] = React.useState({ width: 300, height: 160 });
  return (
    <VStack gap={12} style={{ maxWidth: 500 }}>
      <Resizer direction="both" defaultWidth={300} defaultHeight={160} onResize={setSize}
        style={{ border: '1px solid #D9E6F0', borderRadius: 10, overflow: 'hidden' }}>
        <Box bg="#E6EDFA" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 13, color: '#024CCE', fontWeight: 600 }}>Drag the handle to resize</Text>
        </Box>
      </Resizer>
      <Text style={{ fontSize: 12, color: '#7D868E' }}>Size: {Math.round(size.width)} × {Math.round(size.height)}px</Text>
    </VStack>
  );
}`,
  },
  tokens: {
    label: "Tokens",
    icon: "◈",
    code: `function Demo() {
  const swatches = [
    { label: 'celurenBlue[500]', value: '#024CCE' }, { label: 'lawnGreen[500]', value: '#81EB02' },
    { label: 'crimsonRed[500]', value: '#F2021F' }, { label: 'brightYellowCrayola[500]', value: '#FBAE2E' },
    { label: 'turquiseBlue[500]', value: '#14F1D8' }, { label: 'violet[500]', value: '#8b5cf6' },
  ];
  return (
    <VStack gap={8} style={{ maxWidth: 300 }}>
      {swatches.map(({ label, value }) => (
        <HStack key={label} alignItems="center" gap={12} p={10}
          style={{ borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: value, flexShrink: 0 }} />
          <Text style={{ fontSize: 12, fontFamily: 'monospace', color: '#e2e8f0' }}>{label}</Text>
          <Text style={{ fontSize: 11, fontFamily: 'monospace', color: '#8892a4', marginLeft: 'auto' }}>{value}</Text>
        </HStack>
      ))}
    </VStack>
  );
}`,
  },
};

export const INSPECTOR_TOKENS = [
  { id: "celurenBlue-500", value: "#024CCE", prop: "bg" },
  { id: "spacing-4", value: "16px", prop: "p" },
  { id: "radius-md", value: "8px", prop: "rounded" },
  { id: "neutral-10", value: "#FFFFFF", prop: "color" },
  { id: "crimsonRed-500", value: "#F2021F", prop: "borderColor" },
  { id: "lawnGreen-500", value: "#81EB02", prop: "bg" },
];

export const BREAKPOINTS = [
  { label: "Mobile", icon: "📱", width: 375 },
  { label: "Tablet", icon: "📟", width: 768 },
  { label: "Desktop", icon: "🖥", width: "100%" as const },
];

export const GENERATED_CSS = `:root {
  --celurenBlue-500: #024CCE;
  --spacing-4: 16px;
  --radius-md: 8px;
}
.sz-bg-celurenBlue-500 { background-color: var(--celurenBlue-500); }
.sz-p-spacing-4 { padding: var(--spacing-4); }
.sz-rounded-radius-md { border-radius: var(--radius-md); }`;
