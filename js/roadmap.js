/**
 * Music Besties Planning App
 * Roadmap view functionality
 */

// Initialize roadmap functionality
(function() {
  // Check if the element exists before trying to access it
  const noteElement = document.getElementById('note-roadmap');
  if (noteElement) {
    // Load saved notes if they exist
    const savedNote = Storage.loadNote('roadmap');
    if (savedNote) {
      noteElement.value = savedNote;
    }
    
    console.log('Roadmap view initialized');
  }
})();
