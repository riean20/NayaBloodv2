import { useEffect, useState } from 'react';

export default function App() {
  const [height, setHeight] = useState(1400);
  useEffect(() => {
    const frame = document.getElementById('naya-preview');
    const resize = () => {
      try { setHeight(Math.max(1400, frame.contentDocument.documentElement.scrollHeight + 40)); } catch {}
    };
    frame.addEventListener('load', resize);
    const timer = setInterval(resize, 1000);
    return () => { frame.removeEventListener('load', resize); clearInterval(timer); };
  }, []);
  return <iframe id="naya-preview" title="NayaBlood Trial website preview" src="/prototype/index.html" style={{ display: 'block', width: '100%', height, border: 0 }} />;
}
