(function() {
  // Sketches module
  const Sketches = {
    // Initialize the sketches functionality
    init: function() {
      console.log('Initializing Sketches module');
      this.setupTabNavigation();
      this.setupSketchActions();
      this.loadSavedSketches();
      this.setupNotes();
      console.log('Sketches module initialized');
    },
    
    // Setup tab navigation
    setupTabNavigation: function() {
      // Use the centralized tab navigation function
      PlanningApp.setupTabs('.sketches-tabs');
    },
    
    // Setup sketch save and reset actions
    setupSketchActions: function() {
      // Save buttons
      const saveButtons = document.querySelectorAll('.sketch-save');
      saveButtons.forEach(button => {
        button.addEventListener('click', () => {
          const sketchId = button.getAttribute('data-sketch');
          const editorContainer = button.closest('.sketch-editor');
          const editor = editorContainer.querySelector('.ascii-editor');
          
          if (editor && sketchId) {
            this.saveSketch(sketchId, editor.innerText);
            // Visual feedback
            button.textContent = 'Saved!';
            setTimeout(() => {
              button.textContent = 'Save';
            }, 1500);
          }
        });
      });
      
      // Reset buttons
      const resetButtons = document.querySelectorAll('.sketch-reset');
      resetButtons.forEach(button => {
        button.addEventListener('click', () => {
          const sketchId = button.getAttribute('data-sketch');
          const editorContainer = button.closest('.sketch-editor');
          const editor = editorContainer.querySelector('.ascii-editor');
          
          if (editor && sketchId) {
            // Get original content from data attribute or localStorage default
            const originalContent = this.getOriginalSketch(sketchId);
            editor.innerText = originalContent;
            
            // Visual feedback
            button.textContent = 'Reset!';
            setTimeout(() => {
              button.textContent = 'Reset';
            }, 1500);
          }
        });
      });
    },
    
    // Save sketch to localStorage
    saveSketch: function(sketchId, content) {
      localStorage.setItem(`sketch_${sketchId}`, content);
    },
    
    // Get original sketch content
    getOriginalSketch: function(sketchId) {
      // First try to get from data attribute
      const editor = document.querySelector(`.sketch-editor [data-sketch="${sketchId}"]`).closest('.sketch-editor').querySelector('.ascii-editor');
      const original = editor.getAttribute('data-original');
      
      if (original) {
        return original;
      }
      
      // If not found, return the current content (first-time save becomes the original)
      return editor.innerText;
    },
    
    // Load saved sketches from localStorage
    loadSavedSketches: function() {
      const editors = document.querySelectorAll('.ascii-editor');
      
      editors.forEach(editor => {
        const saveButton = editor.closest('.sketch-editor').querySelector('.sketch-save');
        if (saveButton) {
          const sketchId = saveButton.getAttribute('data-sketch');
          
          if (sketchId) {
            // Store original content as data attribute
            editor.setAttribute('data-original', editor.innerText);
            
            // Load saved content if exists
            const savedContent = localStorage.getItem(`sketch_${sketchId}`);
            if (savedContent) {
              editor.innerText = savedContent;
            }
          }
        }
      });
    },
    
    // Setup notes functionality
    setupNotes: function() {
      const noteInputs = document.querySelectorAll('.note-input');
      
      noteInputs.forEach(input => {
        const sectionId = input.getAttribute('data-section');
        
        // Load saved note
        const savedNote = localStorage.getItem(`note_${sectionId}`);
        if (savedNote) {
          input.value = savedNote;
        }
        
        // Save note on input
        input.addEventListener('input', () => {
          localStorage.setItem(`note_${sectionId}`, input.value);
        });
      });
    }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    Sketches.init();
  });
})();
