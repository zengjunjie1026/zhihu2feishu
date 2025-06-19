(function() {
  // 修改标题
  document.querySelectorAll('.QuestionHeader-title').forEach(el => {
    el.textContent = 'xxx项目文档';
  });
  // 移除侧栏
  document.querySelectorAll('.QuestionHeader-side, .Question-sideColumn').forEach(el => {
    el.remove();
  });
  // 设置主内容宽度为100%
  document.querySelectorAll('.Question-mainColumn').forEach(el => {
    el.style.width = '100%';
  });
  // 轮询隐藏所有 AnswerItem 下的图片和视频
  function hideAnswerMedia() {
    document.querySelectorAll('.AnswerItem').forEach(item => {
      item.querySelectorAll('img, video').forEach(media => {
        media.style.display = 'none';
      });
    });
  }
  hideAnswerMedia();
  setInterval(hideAnswerMedia, 1000);
})(); 