// Load saved progress onto home
(function(){
  const ep = localStorage.getItem('animeEpisode') || '—';
  const ch = localStorage.getItem('mangaChapter') || '—';
  const epSpan = document.getElementById('homeAnimeEp');
  const chSpan = document.getElementById('homeMangaCh');
  if (epSpan) epSpan.textContent = ep;
  if (chSpan) chSpan.textContent = ch;

  // Quick post to backend
  const btn = document.getElementById('qp-post');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const username = document.getElementById('qp-username').value.trim();
    const category = document.getElementById('qp-category').value;
    const content = document.getElementById('qp-content').value.trim();
    const status = document.getElementById('qp-status');
    if (!content) { status.textContent = 'Write something first.'; return; }
    try {
      const res = await fetch(`${CONFIG.API_URL}/posts`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ username, content, title: '(Quick post)', category })
      });
      if (!res.ok) throw new Error('Failed');
      status.textContent = 'Posted! Head to Forums to see it.';
      document.getElementById('qp-content').value = '';
    } catch (e) {
      status.textContent = 'Could not post. Check API_URL in js/config.example.js';
    }
  });
})();
