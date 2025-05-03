/**
 * Music Besties Planning App
 * Story Map view functionality
 */

// Initialize story map functionality
(function() {
  // Check if the element exists before trying to access it
  const noteElement = document.getElementById('note-story-map');
  if (noteElement) {
    // Load saved notes if they exist
    const savedNote = Storage.loadNote('story-map');
    if (savedNote) {
      noteElement.value = savedNote;
    }
    
    console.log('Story Map view initialized');
  }
})();
