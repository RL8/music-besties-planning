(function() {
  // Mocks module
  const Mocks = {
    // Initialize the mocks functionality
    init: function() {
      this.setupTabNavigation();
      this.loadSavedNotes();
      console.log('Mocks module initialized');
    },
    
    // Setup tab navigation
    setupTabNavigation: function() {
      const tabButtons = document.querySelectorAll('.tab-button');
      console.log('Found tab buttons:', tabButtons.length);
      
      tabButtons.forEach(button => {
        // Add click event listener (using function directly to preserve button as 'this')
        button.addEventListener('click', function() {
          // Get the tab to show
          const tabId = this.getAttribute('data-tab');
          console.log('Tab clicked:', tabId);
          
          // Remove active class from all buttons and panes
          document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
          });
          
          document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
          });
          
          // Add active class to clicked button and corresponding pane
          this.classList.add('active');
          const targetPane = document.getElementById(`${tabId}-tab`);
          if (targetPane) {
            targetPane.classList.add('active');
          } else {
            console.error(`Tab pane with id ${tabId}-tab not found`);
          }
        });
      });
    },
    
    // Load saved notes from localStorage
    loadSavedNotes: function() {
      const noteInputs = document.querySelectorAll('.note-input');
      
      noteInputs.forEach(input => {
        const sectionId = input.getAttribute('data-section');
        const savedNote = Storage.loadNote(sectionId);
        
        if (savedNote) {
          input.value = savedNote;
        }
      });
      
      // Add event listeners to save notes on blur
      noteInputs.forEach(input => {
        input.addEventListener('blur', function() {
          const sectionId = this.getAttribute('data-section');
          Storage.saveNote(sectionId, this.value);
        });
      });
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
