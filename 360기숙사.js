// 댓글 목록 요소와 key 설정
const commentList = document.getElementById('comment-list');
const COMMENT_KEY = 'school_comments';

// 저장된 댓글 불러오기
function loadComments() {
  const saved = localStorage.getItem(COMMENT_KEY);
  if (saved) {
    const comments = JSON.parse(saved);
    comments.forEach(({ username, comment }) => {
      appendComment(username, comment);
    });
  }
}

// 댓글 추가 함수
function appendComment(username, comment) {
  const newComment = document.createElement('li');
  newComment.innerHTML = `<strong>${username}</strong>: ${comment}`;
  commentList.prepend(newComment);
}

// 폼 제출 이벤트
document.getElementById('comment-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (username && comment) {
    appendComment(username, comment);

    // 기존 저장된 댓글 가져오기
    const saved = localStorage.getItem(COMMENT_KEY);
    const comments = saved ? JSON.parse(saved) : [];

    // 새 댓글 추가
    comments.push({ username, comment });

    // 다시 저장
    localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));

    // 입력창 초기화
    document.getElementById('username').value = '';
    document.getElementById('comment').value = '';
  }
});

// 페이지 로드 시 기존 댓글 불러오기
window.addEventListener('DOMContentLoaded', loadComments);
