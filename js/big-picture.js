(function() {
  // Big Picture module
  const BigPicture = {
    // Initialize the big picture functionality
    init: function() {
      console.log('Initializing Big Picture module');
      this.setupSketchActions();
      this.loadSavedSketches();
      this.setupNotes();
      console.log('Big Picture module initialized');
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
            console.log(`Saved sketch: ${sketchId}`);
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
            // Get original content or use current content as fallback
            const originalContent = this.getOriginalSketch(sketchId) || editor.innerText;
            editor.innerText = originalContent;
            console.log(`Reset sketch: ${sketchId}`);
          }
        });
      });
    },
    
    // Save sketch to localStorage
    saveSketch: function(sketchId, content) {
      Storage.save(`bigpicture_sketch_${sketchId}`, content);
    },
    
    // Get original sketch content
    getOriginalSketch: function(sketchId) {
      // Return the saved sketch or null if none exists
      return Storage.load(`bigpicture_sketch_${sketchId}`, null);
    },
    
    // Load saved sketches from localStorage
    loadSavedSketches: function() {
      const sketches = document.querySelectorAll('.ascii-editor');
      
      sketches.forEach(editor => {
        // Find the associated save button to get the sketch id
        const saveButton = editor.closest('.sketch-editor').querySelector('.sketch-save');
        if (saveButton) {
          const sketchId = saveButton.getAttribute('data-sketch');
          if (sketchId) {
            const savedContent = this.getOriginalSketch(sketchId);
            if (savedContent) {
              editor.innerText = savedContent;
              console.log(`Loaded saved sketch: ${sketchId}`);
            }
          }
        }
      });
    },
    
    // Setup notes functionality
    setupNotes: function() {
      const noteInput = document.querySelector('.note-input');
      if (noteInput) {
        // Load saved note
        const savedNote = Storage.load('bigpicture_notes', '');
        noteInput.value = savedNote;
        
        // Save note on input
        noteInput.addEventListener('input', () => {
          Storage.save('bigpicture_notes', noteInput.value);
        });
      }
    }
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    BigPicture.init();
  });
})();
