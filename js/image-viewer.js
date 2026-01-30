/**
 * ========================================
 * INSTAGRAM-STYLE IMAGE VIEWER
 * ========================================
 * Handles image viewing with like, comment,
 * and share functionality
 */

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
  // DOM ELEMENTS
  // ========================================
  const modal = document.getElementById('imageViewerModal');
  const viewerImage = document.getElementById('viewerImage');
  const viewerTitle = document.getElementById('viewerTitle');
  const viewerCaption = document.getElementById('viewerCaption');
  const closeBtn = document.getElementById('closeImageViewer');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');
  const likeBtn = document.getElementById('likeBtn');
  const likeCount = document.getElementById('likeCount');
  const likesText = document.getElementById('likesText');
  const commentBtn = document.getElementById('commentBtn');
  const commentCount = document.getElementById('commentCount');
  const shareBtn = document.getElementById('shareBtn');
  const saveBtn = document.getElementById('saveBtn');
  const commentInput = document.getElementById('commentInput');
  const postCommentBtn = document.getElementById('postCommentBtn');
  const commentsList = document.getElementById('commentsList');
  const shareModal = document.getElementById('shareModal');
  const closeShareModal = document.getElementById('closeShareModal');
  const copyLinkBtn = document.getElementById('copyLinkBtn');

  // ========================================
  // INITIALIZATION
  // ========================================
  function init() {
    collectImages();
    bindEvents();
    loadStoredData();
  }

  // Collect all portfolio images
  function collectImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-viewer]');
    images = Array.from(portfolioItems).map((item, index) => ({
      index: index,
      src: item.getAttribute('href'),
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
  }

  // ========================================
  // EVENT BINDINGS
  // ========================================
  function bindEvents() {
    // Prevent default fancybox and use custom viewer
    document.querySelectorAll('.portfolio-item[data-viewer]').forEach((item, index) => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openViewer(index);
      });
    });

    // Close modal
    closeBtn.addEventListener('click', closeViewer);
    modal.querySelector('.image-viewer-overlay').addEventListener('click', closeViewer);

    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Like button
    likeBtn.addEventListener('click', toggleLike);

    // Save button
    saveBtn.addEventListener('click', toggleSave);

    // Share button
    shareBtn.addEventListener('click', openShareModal);
    closeShareModal.addEventListener('click', () => shareModal.classList.remove('active'));
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) shareModal.classList.remove('active');
    });

    // Share options
    document.querySelectorAll('.share-option[data-platform]').forEach(btn => {
      btn.addEventListener('click', () => shareToplatform(btn.dataset.platform));
    });
    copyLinkBtn.addEventListener('click', copyImageLink);

    // Comments
    commentInput.addEventListener('input', handleCommentInput);
    postCommentBtn.addEventListener('click', postComment);
    commentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !postCommentBtn.disabled) {
        postComment();
      }
    });

    // Comment button - scroll to comments
    commentBtn.addEventListener('click', () => {
      commentInput.focus();
    });
  }

  // ========================================
  // VIEWER FUNCTIONS
  // ========================================
  function openViewer(index) {
    currentImageIndex = index;
    updateViewer();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeViewer() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateViewer() {
    const image = images[currentImageIndex];
    if (!image) return;

    // Show loading state
    viewerImage.style.opacity = '0.5';

    // Update image
    viewerImage.src = image.src;
    viewerImage.onload = () => {
      viewerImage.style.opacity = '1';
    };

    // Update title and caption
    const titleParts = image.title.split(' - ');
    viewerTitle.textContent = titleParts[0] || 'Untitled';
    viewerCaption.textContent = titleParts[1] || 'A creative work from Tashu\'s Studio';

    // Update navigation visibility
    prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';

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
    if (!modal.classList.contains('active')) return;

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
    likeCount.textContent = data.likes;
    updateLikesText(data.likes);
    likeBtn.classList.toggle('liked', data.liked);
    likeBtn.dataset.liked = data.liked;
    saveBtn.classList.toggle('saved', data.saved);
    saveBtn.dataset.saved = data.saved;
    commentCount.textContent = data.comments.length;

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
    likeBtn.classList.toggle('liked', data.liked);
    likeCount.textContent = data.likes;
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

    saveBtn.classList.toggle('saved', data.saved);
    saveStoredData();

    showToast(data.saved ? 'Saved to collection' : 'Removed from collection');
  }

  // ========================================
  // COMMENT FUNCTIONALITY
  // ========================================
  function handleCommentInput() {
    postCommentBtn.disabled = commentInput.value.trim().length === 0;
  }

  function postComment() {
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
    commentCount.textContent = imageData[key].comments.length;

    // Clear input
    commentInput.value = '';
    postCommentBtn.disabled = true;

    // Re-render comments
    renderComments(imageData[key].comments);

    saveStoredData();

    // Send to API
    sendCommentToAPI(key, comment);
  }

  function renderComments(comments) {
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
    shareModal.classList.add('active');
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

    shareModal.classList.remove('active');
    showToast('Opening share dialog...');
  }

  function copyImageLink() {
    const image = images[currentImageIndex];
    const url = window.location.origin + image.src;

    navigator.clipboard.writeText(url).then(() => {
      showToast('Link copied to clipboard!');
      shareModal.classList.remove('active');
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
  let lastTap = 0;
  if (viewerImage) {
    viewerImage.addEventListener('click', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        // Double tap detected
        if (!likeBtn.classList.contains('liked')) {
          toggleLike();
        } else {
          createHeartAnimation();
        }
        e.preventDefault();
      }
      lastTap = currentTime;
    });
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
