/**
 * Music Besties Planning App
 * Alternative Wireframes view functionality
 */

// Initialize alternative wireframes functionality
(function() {
  // Load saved notes if they exist
  const noteElement = document.getElementById('note-wireframes-alt');
  if (noteElement) {
    const savedNote = Storage.loadNote('wireframes-alt');
    if (savedNote) {
      noteElement.value = savedNote;
    }
  }
  
  // Setup event listeners
  setupEventListeners();
  
  console.log('Wireframes Alt view initialized');
})();

// Setup event listeners
function setupEventListeners() {
  // Quick navigation
  const quickNavItems = document.querySelectorAll('.wireframe-quick-nav-item');
  quickNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-index'));
      showWireframe(index);
    });
  });
  
  // Previous button
  const prevButton = document.querySelector('.wireframe-nav-btn.prev');
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      const currentIndex = getCurrentWireframeIndex();
      const wireframes = document.querySelectorAll('.wireframe-detail');
      const prevIndex = (currentIndex - 1 + wireframes.length) % wireframes.length;
      showWireframe(prevIndex);
    });
  }
  
  // Next button
  const nextButton = document.querySelector('.wireframe-nav-btn.next');
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const currentIndex = getCurrentWireframeIndex();
      const wireframes = document.querySelectorAll('.wireframe-detail');
      const nextIndex = (currentIndex + 1) % wireframes.length;
      showWireframe(nextIndex);
    });
  }
  
  // Details toggle
  const detailsToggles = document.querySelectorAll('.details-toggle');
  detailsToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const details = this.nextElementSibling;
      if (details) {
        if (details.style.display === 'block') {
          details.style.display = 'none';
          this.textContent = 'Show Component Details';
        } else {
          details.style.display = 'block';
          this.textContent = 'Hide Component Details';
        }
      }
    });
  });
}

// Show wireframe at specified index
function showWireframe(index) {
  const wireframes = document.querySelectorAll('.wireframe-detail');
  
  // Hide all wireframes
  wireframes.forEach(wireframe => {
    wireframe.style.display = 'none';
  });
  
  // Show selected wireframe
  if (wireframes[index]) {
    wireframes[index].style.display = 'block';
  }
  
  // Update quick nav
  updateQuickNav(index);
  
  // Update pagination
  updatePagination(index);
}

// Update quick navigation
function updateQuickNav(activeIndex) {
  const quickNavItems = document.querySelectorAll('.wireframe-quick-nav-item');
  
  quickNavItems.forEach((item, index) => {
    if (index === activeIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Update pagination
function updatePagination(index) {
  const wireframes = document.querySelectorAll('.wireframe-detail');
  const paginationInfo = document.querySelector('.pagination-info');
  
  if (paginationInfo) {
    paginationInfo.textContent = `Wireframe ${index + 1} of ${wireframes.length}`;
  }
}

// Get current wireframe index
function getCurrentWireframeIndex() {
  const wireframes = document.querySelectorAll('.wireframe-detail');
  
  for (let i = 0; i < wireframes.length; i++) {
    if (wireframes[i].style.display === 'block') {
      return i;
    }
  }
  
  return 0;
}
