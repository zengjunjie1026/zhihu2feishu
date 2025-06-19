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
    console.log('SidePanel mounted');
    chrome.storage.local.get('zh_copied_answers', (result) => {
      console.log('side panel storage:', result);
      if (Array.isArray(result.zh_copied_answers)) {
        setAnswers(result.zh_copied_answers);
      }
    });
    function handleStorage(changes: any, area: string) {
      console.log('storage changed', changes, area);
      if (area === 'local' && changes.zh_copied_answers) {
        setAnswers(changes.zh_copied_answers.newValue || []);
      }
    }
    chrome.storage.onChanged.addListener(handleStorage);
    return () => chrome.storage.onChanged.removeListener(handleStorage);
  }, []);

  console.log('Rendering SidePanel', answers);

  const goGithubSite = () => chrome.tabs.create(PROJECT_URL_OBJECT);

  return (
    <div className={cn('App', isLight ? 'bg-slate-50' : 'bg-gray-800')}>
      {/* <header className={cn('App-header', isLight ? 'text-gray-900' : 'text-gray-100')}>
        <button onClick={goGithubSite}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button>
        <p>
          Edit <code>pages/side-panel/src/SidePanel.tsx</code>
        </p>
        <ToggleButton onClick={exampleThemeStorage.toggle}>{t('toggleTheme')}</ToggleButton>
      </header> */}
      <div style={{ padding: 24, background: '#f8fafc', minHeight: '100vh' }}>
        <h2 style={{ marginBottom: 16 }}>已复制答案</h2>
        <ul style={{ listStyle: 'decimal', paddingLeft: 24, margin: 0 }}>
          {answers.map((ans, idx) => (
            <li key={idx} style={{ marginBottom: 18, padding: 12, background: '#fff', borderRadius: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', textAlign: 'left', fontSize: 15, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
              {ans}
            </li>
          ))}
        </ul>
        {answers.length === 0 && <div style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>暂无已复制答案</div>}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <LoadingSpinner />), ErrorDisplay);
