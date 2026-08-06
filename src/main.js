// glitter generator + form handler
// ===== GENERATE GLITTER =====
function spawnGlitter() {
  const container = document.getElementById('glitter-container');
  const count = 80;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'glitter-piece';
    const size = 4 + Math.random() * 8;
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.top = Math.random() * 100 + '%';
    piece.style.background = Math.random() > 0.6 ? 'var(--lime)' : 'var(--pink)';
    piece.style.animationDelay = (Math.random() * 5) + 's';
    piece.style.animationDuration = (2 + Math.random() * 3) + 's';
    container.appendChild(piece);
  }
}
spawnGlitter();

// ===== FORMPREE HANDLER (with client-side feedback) =====
const form = document.getElementById('enquiry-form');
const statusDiv = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    statusDiv.innerHTML = '⏳ Sending...';
    statusDiv.style.color = '#333';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        statusDiv.innerHTML = '✅ Your enquiry was sent! We’ll be in touch soon. ✨';
        statusDiv.style.color = 'var(--lime)';
        form.reset();
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      statusDiv.innerHTML = '❌ Oops! Something went wrong. Please try again or email us directly.';
      statusDiv.style.color = 'var(--pink)';
    }
  });
}