/**
 * ========================================
 * INSTAGRAM-STYLE IMAGE VIEWER
 * ========================================
 * Handles image viewing with like, comment,
 * and share functionality
 */

// Immediately log to confirm script is loading
console.log('Image viewer script loading...');

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================
  const API_URL = '/api';

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  let currentImageIndex = 0;
  let images = [];
  let imageData = {}; // Stores likes, comments for each image

  // ========================================
  // DOM ELEMENTS (initialized in init())
  // ========================================
  let modal, viewerImage, viewerTitle, viewerCaption, closeBtn;
  let prevBtn, nextBtn, likeBtn, likeCount, likesText;
  let commentBtn, commentCount, shareBtn, saveBtn;
  let commentInput, postCommentBtn, commentsList;
  let shareModal, closeShareModal, copyLinkBtn;

  // ========================================
  // INITIALIZATION
  // ========================================
  function init() {
    // Get DOM elements after DOM is ready
    modal = document.getElementById('imageViewerModal');
    viewerImage = document.getElementById('viewerImage');
    viewerTitle = document.getElementById('viewerTitle');
    viewerCaption = document.getElementById('viewerCaption');
    closeBtn = document.getElementById('closeImageViewer');
    prevBtn = document.getElementById('prevImage');
    nextBtn = document.getElementById('nextImage');
    likeBtn = document.getElementById('likeBtn');
    likeCount = document.getElementById('likeCount');
    likesText = document.getElementById('likesText');
    commentBtn = document.getElementById('commentBtn');
    commentCount = document.getElementById('commentCount');
    shareBtn = document.getElementById('shareBtn');
    saveBtn = document.getElementById('saveBtn');
    commentInput = document.getElementById('commentInput');
    postCommentBtn = document.getElementById('postCommentBtn');
    commentsList = document.getElementById('commentsList');
    shareModal = document.getElementById('shareModal');
    closeShareModal = document.getElementById('closeShareModal');
    copyLinkBtn = document.getElementById('copyLinkBtn');

    // Check if modal exists
    if (!modal) {
      console.error('Image viewer modal not found');
      return;
    }

    collectImages();
    bindEvents();
    loadStoredData();
    setupDoubleTap();
  }

  // Collect all portfolio images
  function collectImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-viewer]');
    images = Array.from(portfolioItems).map((item, index) => ({
      index: index,
      src: item.getAttribute('data-image') || item.getAttribute('href'),
      title: item.getAttribute('data-caption') || 'Untitled',
      element: item
    }));

    // Also collect images from stories/journal section
    const storyItems = document.querySelectorAll('.journal-entry img, .story-image');
    storyItems.forEach((img, index) => {
      images.push({
        index: images.length,
        src: img.src || img.getAttribute('data-src'),
        title: img.alt || 'Story Image',
        element: img.closest('a') || img
      });
    });

    console.log('Image viewer: Found', images.length, 'images');
  }

  // ========================================
  // EVENT BINDINGS
  // ========================================
  function bindEvents() {
    // Portfolio items click handler - use capture phase to ensure we get the click first
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-viewer]');
    console.log('Image viewer: Binding click handlers to', portfolioItems.length, 'items');

    portfolioItems.forEach((item, index) => {
      // Remove any existing href behavior
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('Image viewer: Clicked item', index);
        openViewer(index);
        return false;
      };
    });

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', closeViewer);
    }

    const overlay = modal.querySelector('.image-viewer-overlay');
    if (overlay) {
      overlay.addEventListener('click', closeViewer);
    }

    // Navigation
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Like button
    if (likeBtn) likeBtn.addEventListener('click', toggleLike);

    // Save button
    if (saveBtn) saveBtn.addEventListener('click', toggleSave);

    // Share button
    if (shareBtn) shareBtn.addEventListener('click', openShareModal);
    if (closeShareModal) {
      closeShareModal.addEventListener('click', () => shareModal.classList.remove('active'));
    }
    if (shareModal) {
      shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) shareModal.classList.remove('active');
      });
    }

    // Share options
    document.querySelectorAll('.share-option[data-platform]').forEach(btn => {
      btn.addEventListener('click', () => shareToplatform(btn.dataset.platform));
    });
    if (copyLinkBtn) copyLinkBtn.addEventListener('click', copyImageLink);

    // Comments
    if (commentInput) {
      commentInput.addEventListener('input', handleCommentInput);
      commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && postCommentBtn && !postCommentBtn.disabled) {
          postComment();
        }
      });
    }
    if (postCommentBtn) postCommentBtn.addEventListener('click', postComment);

    // Comment button - scroll to comments
    if (commentBtn) {
      commentBtn.addEventListener('click', () => {
        if (commentInput) commentInput.focus();
      });
    }
  }

  // ========================================
  // VIEWER FUNCTIONS
  // ========================================
  function openViewer(index) {
    console.log('Image viewer: Opening image', index);
    if (!modal) {
      console.error('Image viewer: Modal element not found!');
      return;
    }
    if (!images[index]) {
      console.error('Image viewer: Image not found at index', index);
      return;
    }
    currentImageIndex = index;
    updateViewer();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Image viewer: Modal opened');
  }

  // Global function to test viewer manually from console
  window.testImageViewer = function(index) {
    openViewer(index || 0);
  };

  function closeViewer() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateViewer() {
    const image = images[currentImageIndex];
    if (!image) return;

    // Show loading state
    if (viewerImage) {
      viewerImage.style.opacity = '0.5';
      viewerImage.src = image.src;
      viewerImage.onload = () => {
        viewerImage.style.opacity = '1';
      };
    }

    // Update title and caption
    const titleParts = image.title.split(' - ');
    if (viewerTitle) viewerTitle.textContent = titleParts[0] || 'Untitled';
    if (viewerCaption) viewerCaption.textContent = titleParts[1] || 'A creative work from Tashu\'s Studio';

    // Update navigation visibility
    if (prevBtn) prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';

    // Load image data (likes, comments)
    loadImageData(image.src);
  }

  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateViewer();
    }
  }

  function showNextImage() {
    if (currentImageIndex < images.length - 1) {
      currentImageIndex++;
      updateViewer();
    }
  }

  function handleKeyboard(e) {
    if (!modal || !modal.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeViewer();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }

  // ========================================
  // DATA MANAGEMENT
  // ========================================
  function loadStoredData() {
    try {
      const stored = localStorage.getItem('imageViewerData');
      if (stored) {
        imageData = JSON.parse(stored);
      }
    } catch (e) {
      imageData = {};
    }
  }

  function saveStoredData() {
    try {
      localStorage.setItem('imageViewerData', JSON.stringify(imageData));
    } catch (e) {
      console.error('Failed to save data:', e);
    }
  }

  function getImageKey(src) {
    // Create a unique key for each image
    return src.split('/').pop().split('.')[0];
  }

  function loadImageData(src) {
    const key = getImageKey(src);
    const data = imageData[key] || {
      likes: 0,
      liked: false,
      saved: false,
      comments: []
    };

    // Update UI
    if (likeCount) likeCount.textContent = data.likes;
    updateLikesText(data.likes);
    if (likeBtn) {
      likeBtn.classList.toggle('liked', data.liked);
      likeBtn.dataset.liked = data.liked;
    }
    if (saveBtn) {
      saveBtn.classList.toggle('saved', data.saved);
      saveBtn.dataset.saved = data.saved;
    }
    if (commentCount) commentCount.textContent = data.comments.length;

    // Render comments
    renderComments(data.comments);
  }

  // ========================================
  // LIKE FUNCTIONALITY
  // ========================================
  function toggleLike() {
    const image = images[currentImageIndex];
    const key = getImageKey(image.src);

    if (!imageData[key]) {
      imageData[key] = { likes: 0, liked: false, saved: false, comments: [] };
    }

    const data = imageData[key];
    data.liked = !data.liked;
    data.likes = data.liked ? data.likes + 1 : Math.max(0, data.likes - 1);

    // Update UI with animation
    if (likeBtn) likeBtn.classList.toggle('liked', data.liked);
    if (likeCount) likeCount.textContent = data.likes;
    updateLikesText(data.likes);

    // Add heart animation
    if (data.liked) {
      createHeartAnimation();
    }

    saveStoredData();

    // Send to API (optional - for persistence)
    sendLikeToAPI(key, data.liked);
  }

  function updateLikesText(count) {
    if (!likesText) return;
    if (count === 0) {
      likesText.textContent = 'Be the first to like this';
    } else if (count === 1) {
      likesText.textContent = '1 like';
    } else {
      likesText.textContent = `${count} likes`;
    }
  }

  function createHeartAnimation() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      font-size: 80px;
      z-index: 10005;
      pointer-events: none;
      animation: heartPopIn 0.6s ease forwards;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartPopIn {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
      style.remove();
    }, 600);
  }

  // ========================================
  // SAVE FUNCTIONALITY
  // ========================================
  function toggleSave() {
    const image = images[currentImageIndex];
    const key = getImageKey(image.src);

    if (!imageData[key]) {
      imageData[key] = { likes: 0, liked: false, saved: false, comments: [] };
    }

    const data = imageData[key];
    data.saved = !data.saved;

    if (saveBtn) saveBtn.classList.toggle('saved', data.saved);
    saveStoredData();

    showToast(data.saved ? 'Saved to collection' : 'Removed from collection');
  }

  // ========================================
  // COMMENT FUNCTIONALITY
  // ========================================
  function handleCommentInput() {
    if (postCommentBtn && commentInput) {
      postCommentBtn.disabled = commentInput.value.trim().length === 0;
    }
  }

  function postComment() {
    if (!commentInput) return;
    const text = commentInput.value.trim();
    if (!text) return;

    const image = images[currentImageIndex];
    const key = getImageKey(image.src);

    if (!imageData[key]) {
      imageData[key] = { likes: 0, liked: false, saved: false, comments: [] };
    }

    const comment = {
      id: Date.now(),
      username: 'Guest User',
      avatar: 'images/guest-avatar.png',
      text: text,
      time: new Date().toISOString(),
      likes: 0
    };

    imageData[key].comments.push(comment);
    if (commentCount) commentCount.textContent = imageData[key].comments.length;

    // Clear input
    commentInput.value = '';
    if (postCommentBtn) postCommentBtn.disabled = true;

    // Re-render comments
    renderComments(imageData[key].comments);

    saveStoredData();

    // Send to API
    sendCommentToAPI(key, comment);
  }

  function renderComments(comments) {
    if (!commentsList) return;

    if (comments.length === 0) {
      commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
      return;
    }

    commentsList.innerHTML = comments.map(comment => `
      <div class="comment-item" data-id="${comment.id}">
        <img src="${comment.avatar || 'images/guest-avatar.png'}" alt="${comment.username}" class="comment-avatar"
             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(comment.username)}&background=D63447&color=fff'">
        <div class="comment-content">
          <span class="comment-username">${escapeHtml(comment.username)}</span>
          <span class="comment-text">${escapeHtml(comment.text)}</span>
          <div class="comment-time">${formatTime(comment.time)}</div>
        </div>
      </div>
    `).join('');
  }

  function formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  // ========================================
  // SHARE FUNCTIONALITY
  // ========================================
  function openShareModal() {
    if (shareModal) shareModal.classList.add('active');
  }

  function shareToplatform(platform) {
    const image = images[currentImageIndex];
    const url = window.location.origin + '/#portfolio-section';
    const text = `Check out this amazing work: ${image.title} - Tashu's Studio`;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    if (shareModal) shareModal.classList.remove('active');
    showToast('Opening share dialog...');
  }

  function copyImageLink() {
    const image = images[currentImageIndex];
    const url = window.location.origin + image.src;

    navigator.clipboard.writeText(url).then(() => {
      showToast('Link copied to clipboard!');
      if (shareModal) shareModal.classList.remove('active');
    }).catch(() => {
      showToast('Failed to copy link');
    });
  }

  // ========================================
  // API FUNCTIONS (for backend persistence)
  // ========================================
  async function sendLikeToAPI(imageKey, liked) {
    try {
      await fetch(`${API_URL}/interactions/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageKey, liked })
      });
    } catch (e) {
      // Silently fail - data is stored locally
    }
  }

  async function sendCommentToAPI(imageKey, comment) {
    try {
      await fetch(`${API_URL}/interactions/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageKey, comment })
      });
    } catch (e) {
      // Silently fail - data is stored locally
    }
  }

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.viewer-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'viewer-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ========================================
  // DOUBLE TAP TO LIKE (Mobile)
  // ========================================
  function setupDoubleTap() {
    let lastTap = 0;
    if (viewerImage) {
      viewerImage.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
          // Double tap detected
          if (likeBtn && !likeBtn.classList.contains('liked')) {
            toggleLike();
          } else {
            createHeartAnimation();
          }
          e.preventDefault();
        }
        lastTap = currentTime;
      });
    }
  }

  // ========================================
  // INITIALIZE
  // ========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
