/* Forum frontend that talks to the backend API */
const API = () => CONFIG.API_URL;

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}

async function fetchJSON(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function fmtDate(d) { return new Date(d).toLocaleString(); }

function renderPost(container, post) {
  const tpl = document.getElementById('postItemTemplate');
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.dataset.id = post._id;

  node.querySelector('.post-title').textContent = post.title || '(No title)';
  node.querySelector('.post-meta').textContent =
    `${post.username || 'Anonymous'} • ${post.category || 'general'} • ${fmtDate(post.createdAt)}`;
  node.querySelector('.post-content').textContent = post.content;

  const replyList = node.querySelector('.reply-list');
  const replies = post.replies || [];
  replies.forEach(r => {
    const div = el('div', 'reply');
    div.textContent = `${r.username || 'Anonymous'}: ${r.content} (${fmtDate(r.createdAt)})`;
    replyList.appendChild(div);
  });

  const replySend = node.querySelector('.reply-send');
  replySend.addEventListener('click', async () => {
    const u = node.querySelector('.reply-username').value.trim();
    const c = node.querySelector('.reply-content').value.trim();
    if (!c) return;
    replySend.disabled = true;
    try {
      await fetchJSON(`${API()}/posts/${post._id}/replies`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ username: u, content: c })
      });
      await loadPosts(); // refresh list
    } catch(e) {
      alert('Failed to send reply. Check API_URL in js/config.js');
    } finally { replySend.disabled = false; }
  });

  container.appendChild(node);
}

async function loadPosts() {
  const list = document.getElementById('forumPosts');
  const filter = document.getElementById('filterCategory').value;
  list.innerHTML = '';
  try {
    const qs = filter === 'all' ? '' : `?category=${encodeURIComponent(filter)}`;
    const posts = await fetchJSON(`${API()}/posts${qs}`);
    posts.forEach(p => renderPost(list, p));
  } catch (e) {
    list.innerHTML = '<p class="muted">Could not fetch posts. Start the backend and set API_URL in js/config.js.</p>';
  }
}

document.getElementById('postBtn').addEventListener('click', async () => {
  const username = document.getElementById('username').value.trim();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const category = document.getElementById('category').value;
  const status = document.getElementById('postStatus');

  if (!content) { status.textContent = 'Write something first.'; return; }

  try {
    await fetchJSON(`${API()}/posts`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username, title, content, category })
    });
    document.getElementById('content').value = '';
    document.getElementById('title').value = '';
    status.textContent = 'Posted!';
    await loadPosts();
  } catch (e) {
    status.textContent = 'Failed to post. Check backend & API_URL.';
  }
});

document.getElementById('filterCategory').addEventListener('change', loadPosts);
window.addEventListener('DOMContentLoaded', loadPosts);
