// Tracker logic for anime & manga (local to the browser)
(function(){
  const animeInput = document.getElementById('animeEpisode');
  const mangaInput = document.getElementById('mangaChapter');
  const animeBtn = document.getElementById('updateAnimeBtn');
  const mangaBtn = document.getElementById('updateMangaBtn');
  const animePlus = document.getElementById('animePlus');
  const mangaPlus = document.getElementById('mangaPlus');

  if (animeInput) {
    animeInput.value = localStorage.getItem('animeEpisode') || '';
    animeBtn.addEventListener('click', () => {
      localStorage.setItem('animeEpisode', animeInput.value || '');
    });
    if (animePlus) animePlus.addEventListener('click', () => {
      const cur = parseInt(localStorage.getItem('animeEpisode') || '0', 10);
      const next = isNaN(cur) ? 1 : cur + 1;
      localStorage.setItem('animeEpisode', String(next));
      animeInput.value = String(next);
    });
  }

  if (mangaInput) {
    mangaInput.value = localStorage.getItem('mangaChapter') || '';
    mangaBtn.addEventListener('click', () => {
      localStorage.setItem('mangaChapter', mangaInput.value || '');
    });
    if (mangaPlus) mangaPlus.addEventListener('click', () => {
      const cur = parseInt(localStorage.getItem('mangaChapter') || '0', 10);
      const next = isNaN(cur) ? 1 : cur + 1;
      localStorage.setItem('mangaChapter', String(next));
      mangaInput.value = String(next);
    });
  }
})();
