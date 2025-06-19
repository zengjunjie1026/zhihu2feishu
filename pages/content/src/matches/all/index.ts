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
  const answerEls = document.querySelectorAll('.AnswerItem');
  let allText = '';
  answerEls.forEach(el => {
    allText += (el as HTMLElement).innerText + '\n\n';
  });
  if (allText.trim()) {
    await navigator.clipboard.writeText(allText.trim());
    btn.innerText = '已复制!';
    setTimeout(() => { btn.innerText = '复制答案'; }, 1500);
  } else {
    btn.innerText = '未找到答案';
    setTimeout(() => { btn.innerText = '复制答案'; }, 1500);
  }
};

document.body.appendChild(btn);
