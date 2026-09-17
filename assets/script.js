// =========================================================
// LINK-IN-BIO PAGE — VANILLA JS
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const shareBtn = document.getElementById('shareBtn');
  const toast = document.getElementById('toast');

  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  async function handleShare() {
    const shareData = {
      title: document.title,
      text: 'Check out my links!',
      url: window.location.href
    };

    // Prefer native share sheet when available (mostly mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled the share dialog — no need to show an error
        if (err && err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
      return;
    }

    // Fallback: copy the current URL to the clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    } catch (err) {
      // Final fallback for older browsers without Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = window.location.href;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('Link copied to clipboard');
      } catch (copyErr) {
        showToast('Unable to copy link');
      }
      document.body.removeChild(textarea);
    }
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', handleShare);
  }
});
