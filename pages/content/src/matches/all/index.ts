import { sampleFunction } from '@src/sample-function';

console.log('[CEB] All content script loaded');

void sampleFunction();

// 创建悬浮按钮
const btn = document.createElement('button');
btn.innerText = '复制答案';
btn.style.position = 'fixed';
btn.style.bottom = '40px';
btn.style.right = '40px';
btn.style.zIndex = '99999';
btn.style.padding = '12px 24px';
btn.style.background = '#1677ff';
btn.style.color = '#fff';
btn.style.border = 'none';
btn.style.borderRadius = '8px';
btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
btn.style.fontSize = '16px';
btn.style.cursor = 'pointer';
btn.style.opacity = '0.9';
btn.style.transition = 'opacity 0.2s';
btn.onmouseenter = () => btn.style.opacity = '1';
btn.onmouseleave = () => btn.style.opacity = '0.9';

btn.onclick = async () => {
  try {
    const answerEls = document.querySelectorAll('[class*=RichContent]');
    const answers: string[] = [];
    answerEls.forEach(el => {
      const text = (el as HTMLElement).innerText;
      if (text.trim()) answers.push(text.trim());
    });
    if (answers.length > 0) {
      await navigator.clipboard.writeText(answers.join('\n\n'));
      chrome.storage.local.set({ zh_copied_answers: answers });
      btn.innerText = '已复制!';
      setTimeout(() => { btn.innerText = '复制答案'; }, 1500);
    } else {
      btn.innerText = '未找到答案';
      setTimeout(() => { btn.innerText = '复制答案'; }, 1500);
    }
  } catch (err) {
    btn.innerText = '复制失败';
    setTimeout(() => { btn.innerText = '复制答案'; }, 1500);
    console.error('复制或存储失败:', err);
  }
};

document.body.appendChild(btn);
