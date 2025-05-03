/**
 * Music Besties Planning App
 * Components view functionality
 */

// Initialize components functionality
(function() {
  // Check if the element exists before trying to access it
  const noteElement = document.getElementById('note-components');
  if (noteElement) {
    // Load saved notes if they exist
    const savedNote = Storage.loadNote('components');
    if (savedNote) {
      noteElement.value = savedNote;
    }
    
    console.log('Components view initialized');
  }
})();
