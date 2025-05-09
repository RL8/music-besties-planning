(function() {
  // Mocks module
  const Mocks = {
    // Initialize the mocks functionality
    init: function() {
      console.log('Initializing Mocks module');
      this.setupTabNavigation();
      
      // Add a slight delay for detail tabs to ensure DOM is ready
      setTimeout(() => {
        this.setupDetailTabNavigation();
        this.setupCommentSystem();
        this.loadComments();
        console.log('Mocks module initialized');
      }, 50);
    },
    
    // Setup tab navigation
    setupTabNavigation: function() {
      // Use the centralized tab navigation function with explicit options
      console.log('Setting up mocks tab navigation');
      PlanningApp.setupTabs('.mocks-tabs', {
        debug: true,
        buttonSelector: '.tab-button, .tabs__button',
        paneSelector: '.tab-pane, .tabs__pane',
        activeClass: 'active'
      });
    },
    
    // Setup detail tab navigation (for the right panel)
    setupDetailTabNavigation: function() {
      // Get all detail tab containers
      const detailTabContainers = document.querySelectorAll('.detail-tabs');
      
      console.log(`Setting up ${detailTabContainers.length} detail tab navigation instances`);
      
      // Initialize each container separately
      detailTabContainers.forEach((container, index) => {
        PlanningApp.setupTabs(`.detail-tabs:nth-of-type(${index + 1})`, {
          debug: true,
          buttonSelector: '.detail-tab-button',
          paneSelector: '.detail-tab-pane',
          activeClass: 'active',
          tabAttribute: ['data-tab', 'data-detail-tab']
        });
      });
    },
    
    // Setup comment system
    setupCommentSystem: function() {
      const commentButtons = document.querySelectorAll('.comment-submit');
      
      commentButtons.forEach(button => {
        button.addEventListener('click', function() {
          const sectionId = this.getAttribute('data-section');
          const commentForm = this.closest('.comment-form');
          const commentInput = commentForm.querySelector('.comment-input');
          const authorInput = commentForm.querySelector('.comment-author');
          const commentsList = document.getElementById(`${sectionId.split('-')[0]}-comments`);
          
          const commentText = commentInput.value.trim();
          const author = authorInput.value.trim() || 'Anonymous';
          
          if (commentText) {
            // Create new comment
            const comment = {
              id: Date.now(),
              author: author,
              text: commentText,
              date: new Date().toISOString(),
              replies: []
            };
            
            // Add to comments list
            Mocks.addComment(sectionId, comment);
            
            // Clear inputs
            commentInput.value = '';
            
            // Save to localStorage
            Mocks.saveComments(sectionId);
          }
        });
      });
    },
    
    // Add a comment to the DOM
    addComment: function(sectionId, comment) {
      const commentsList = document.getElementById(`${sectionId.split('-')[0]}-comments`);
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
      commentElement.dataset.id = comment.id;
      
      const date = new Date(comment.date);
      const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
      
      commentElement.innerHTML = `
        <div class="comment-header">
          <span class="comment-author-name">${comment.author}</span>
          <span class="comment-date">${formattedDate}</span>
        </div>
        <div class="comment-body">${comment.text}</div>
        <div class="comment-actions">
          <button class="comment-reply" data-parent-id="${comment.id}">Reply</button>
          <button class="comment-edit" data-comment-id="${comment.id}">Edit</button>
          <button class="comment-delete" data-comment-id="${comment.id}">Delete</button>
        </div>
      `;
      
      // Insert at the beginning (newest first)
      if (commentsList.firstChild) {
        commentsList.insertBefore(commentElement, commentsList.firstChild);
      } else {
        commentsList.appendChild(commentElement);
      }
      
      // Add reply functionality
      const replyButton = commentElement.querySelector('.comment-reply');
      replyButton.addEventListener('click', function() {
        alert('Reply functionality will be implemented in a future update.');
      });
      
      // Add edit functionality
      const editButton = commentElement.querySelector('.comment-edit');
      editButton.addEventListener('click', function() {
        const commentId = this.getAttribute('data-comment-id');
        Mocks.editComment(sectionId, commentId);
      });
      
      // Add delete functionality
      const deleteButton = commentElement.querySelector('.comment-delete');
      deleteButton.addEventListener('click', function() {
        const commentId = this.getAttribute('data-comment-id');
        Mocks.deleteComment(sectionId, commentId);
      });
    },
    
    // Edit a comment
    editComment: function(sectionId, commentId) {
      const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
      const commentBody = commentElement.querySelector('.comment-body');
      const currentText = commentBody.textContent;
      
      // Replace comment body with textarea
      commentBody.innerHTML = `
        <textarea class="edit-comment-input">${currentText}</textarea>
        <div class="edit-actions">
          <button class="save-edit">Save</button>
          <button class="cancel-edit">Cancel</button>
        </div>
      `;
      
      const textarea = commentBody.querySelector('.edit-comment-input');
      textarea.focus();
      
      // Add save functionality
      const saveButton = commentBody.querySelector('.save-edit');
      saveButton.addEventListener('click', function() {
        const newText = textarea.value.trim();
        if (newText) {
          commentBody.innerHTML = newText;
          Mocks.saveComments(sectionId);
        }
      });
      
      // Add cancel functionality
      const cancelButton = commentBody.querySelector('.cancel-edit');
      cancelButton.addEventListener('click', function() {
        commentBody.innerHTML = currentText;
      });
    },
    
    // Delete a comment
    deleteComment: function(sectionId, commentId) {
      if (confirm('Are you sure you want to delete this comment?')) {
        const commentElement = document.querySelector(`.comment[data-id="${commentId}"]`);
        if (commentElement) {
          commentElement.remove();
          Mocks.saveComments(sectionId);
        }
      }
    },
    
    // Load comments from localStorage
    loadComments: function() {
      const sections = ['dashboard', 'edit-rankings', 'sidebar', 'profile', 'friends', 'comparison'];
      
      sections.forEach(section => {
        const sectionId = `${section}-mock`;
        const comments = Storage.loadComments(sectionId) || [];
        
        // Sort comments by date (newest first)
        comments.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Add each comment to the DOM
        comments.forEach(comment => {
          Mocks.addComment(sectionId, comment);
        });
      });
    },
    
    // Save comments to localStorage
    saveComments: function(sectionId) {
      const commentsList = document.getElementById(`${sectionId.split('-')[0]}-comments`);
      const commentElements = commentsList.querySelectorAll('.comment');
      
      // Convert DOM elements to data objects
      const comments = Array.from(commentElements).map(el => {
        return {
          id: el.dataset.commentId,
          author: el.querySelector('.comment-author').textContent,
          text: el.querySelector('.comment-text').textContent,
          date: el.querySelector('.comment-date').dataset.timestamp
        };
      });
      
      // Save to localStorage using the Storage utility
      Storage.saveComments(sectionId, comments);
    }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    Mocks.init();
  });
  
  // Also initialize when this script is loaded
  // This is needed because the script is loaded dynamically after DOM content loaded
  Mocks.init();
})();
