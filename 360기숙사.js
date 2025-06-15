const commentList = document.getElementById('comment-list');
const COMMENT_KEY = 'school_comments';

function appendComment(username, comment) {
  const newComment = document.createElement('li');
  newComment.innerHTML = `<strong>${username}</strong>: ${comment}`;
  commentList.prepend(newComment);
}

function loadComments() {
  const saved = localStorage.getItem(COMMENT_KEY);
  if (saved) {
    const comments = JSON.parse(saved);
    comments.forEach(({ username, comment }) => {
      appendComment(username, comment);
    });
  }
}

document.getElementById('comment-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (username && comment) {
    appendComment(username, comment);

    const saved = localStorage.getItem(COMMENT_KEY);
    const comments = saved ? JSON.parse(saved) : [];

    comments.push({ username, comment });
    localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));

    document.getElementById('username').value = '';
    document.getElementById('comment').value = '';
  }
});

window.addEventListener('DOMContentLoaded', loadComments);
