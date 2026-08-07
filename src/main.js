// glitter generator + form handler
// ===== GENERATE GLITTER =====
function spawnGlitter() {
  const container = document.getElementById('glitter-container');
  const isMobile = window.innerWidth < 768;

  // Mobile: fewer, smaller, softer pieces
  const count = isMobile ? 30 : 80;
  const sizeMin = isMobile ? 2 : 4;
  const sizeMax = isMobile ? 6 : 12;
  const opacityBase = isMobile ? 0.4 : 1;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'glitter-piece';
    const size = sizeMin + Math.random() * (sizeMax - sizeMin);
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.top = Math.random() * 100 + '%';
    piece.style.background = Math.random() > 0.6 ? 'var(--lime)' : 'var(--pink)';
    piece.style.animationDelay = (Math.random() * 5) + 's';
    piece.style.animationDuration = (2 + Math.random() * 3) + 's';
    piece.style.opacity = opacityBase;
    container.appendChild(piece);
  }
}
spawnGlitter();

// ===== FORM HANDLER (with Pop-up Modal) =====
const form = document.getElementById('enquiry-form');
const modal = document.getElementById('success-modal');
const closeBtns = document.querySelectorAll('#close-modal-btn, #close-modal-btn-bottom');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        // Show the modal
        modal.style.display = 'flex';
        form.reset(); // Clear the form
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      alert('❌ Oops! Something went wrong. Please try again or email us directly.');
    }
  });
}

// ===== CLOSE MODAL =====
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});

// Click outside the window to close (optional, but nice UX)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
