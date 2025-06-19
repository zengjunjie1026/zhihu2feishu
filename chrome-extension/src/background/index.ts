import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('Background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'ZH_ANSWERS') {
    // 广播给所有扩展页面（包括side panel）
    chrome.runtime.sendMessage(message);
  }
});
