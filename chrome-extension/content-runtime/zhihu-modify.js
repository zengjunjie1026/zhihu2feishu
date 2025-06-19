(function() {
  // 修改标题
  document.querySelectorAll('.QuestionHeader-title').forEach(el => {
    el.textContent = 'xxx项目文档';
  });
  // 移除侧栏
  document.querySelectorAll('.QuestionHeader-side, .Question-sideColumn').forEach(el => {
    el.remove();
  });
})(); 