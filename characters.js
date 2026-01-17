// Tabs
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.querySelector(btn.dataset.target);
    if (target) target.classList.add('active');
  });
});


document.querySelectorAll('.character-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.remove('click-anim');
    void card.offsetWidth; // restart animation
    card.classList.add('click-anim');
    const name = card.dataset.name;
    window.location.href = `opcharacters/${name}.html`;
  });
});
