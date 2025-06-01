import { useEffect, useState } from 'react';

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export const useScript = (src: string): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    // Evita SSR crash
    if (typeof window === 'undefined' || !src) return 'idle';

    const existing = document.querySelector(`script[src="${src}"]`);
    return existing ? 'ready' : 'loading';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !src) {
      setStatus('idle');
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${src}"]`,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.getAttribute('data-loaded') === 'true') {
        setStatus('ready');
        return;
      }

      const onScriptLoad = () => setStatus('ready');
      const onScriptError = () => setStatus('error');

      existingScript.addEventListener('load', onScriptLoad);
      existingScript.addEventListener('error', onScriptError);

      return () => {
        existingScript.removeEventListener('load', onScriptLoad);
        existingScript.removeEventListener('error', onScriptError);
      };
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    const onLoad = () => {
      script.setAttribute('data-loaded', 'true');
      setStatus('ready');
    };

    const onError = () => setStatus('error');

    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
      script.remove();
    };
  }, [src]);

  return status;
};
