import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      r && setInterval(() => r.update(), 60000); // every 1 minute for dev
    },
    onRegisterError(error) {
      console.error('[PWA] Registration error::', error);
    },
  });

  const closePrompt = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#222',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '8px',
        display: offlineReady || needRefresh ? 'flex' : 'none',
        gap: '10px',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <span>
        {offlineReady ? 'App ready for offline use.' : 'New version available.'}
      </span>
      {needRefresh && (
        <button onClick={() => updateServiceWorker(true)}>Reload</button>
      )}
      <button onClick={closePrompt}>Close</button>
    </div>
  );
}
