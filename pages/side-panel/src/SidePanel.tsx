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
    // 初次加载时读取
    chrome.storage.local.get('zh_copied_answers', (result) => {
      if (Array.isArray(result.zh_copied_answers)) {
        setAnswers(result.zh_copied_answers);
      }
    });
    // 监听 storage 变化
    function handleStorage(changes: any, area: string) {
      if (area === 'local' && changes.zh_copied_answers) {
        setAnswers(changes.zh_copied_answers.newValue || []);
      }
    }
    chrome.storage.onChanged.addListener(handleStorage);
    return () => chrome.storage.onChanged.removeListener(handleStorage);
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
      <div>
        <h2>调试：已复制答案</h2>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
        <ul>
          {answers.map((ans, idx) => (
            <li key={idx} style={{ margin: 8, padding: 8, border: '1px solid #ccc' }}>{ans}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <LoadingSpinner />), ErrorDisplay);
