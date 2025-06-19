import '@src/SidePanel.css';
import { t } from '@extension/i18n';
import { PROJECT_URL_OBJECT, useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { cn, ErrorDisplay, LoadingSpinner, ToggleButton } from '@extension/ui';
import React, { useEffect, useState } from 'react';

const SidePanel = () => {
  const { isLight } = useStorage(exampleThemeStorage);
  const logo = isLight ? 'side-panel/logo_vertical.svg' : 'side-panel/logo_vertical_dark.svg';

  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    function handleMessage(message: any) {
      if (message && message.type === 'ZH_ANSWERS' && Array.isArray(message.answers)) {
        setAnswers(message.answers);
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const goGithubSite = () => chrome.tabs.create(PROJECT_URL_OBJECT);

  return (
    <div className={cn('App', isLight ? 'bg-slate-50' : 'bg-gray-800')}>
      <header className={cn('App-header', isLight ? 'text-gray-900' : 'text-gray-100')}>
        <button onClick={goGithubSite}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button>
        <p>
          Edit <code>pages/side-panel/src/SidePanel.tsx</code>
        </p>
        <ToggleButton onClick={exampleThemeStorage.toggle}>{t('toggleTheme')}</ToggleButton>
      </header>
      {answers.length > 0 && (
        <div style={{ marginTop: 24, textAlign: 'left', maxWidth: 600 }}>
          <h3>已复制的答案：</h3>
          <ul style={{ paddingLeft: 20 }}>
            {answers.map((ans, idx) => (
              <li key={idx} style={{ marginBottom: 12, background: isLight ? '#f1f5f9' : '#222', padding: 12, borderRadius: 6 }}>{ans}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <LoadingSpinner />), ErrorDisplay);
