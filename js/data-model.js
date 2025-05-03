/**
 * Music Besties Planning App
 * Data Model view functionality
 */

// Initialize data model functionality
(function() {
  // Check if the element exists before trying to access it
  const noteElement = document.getElementById('note-data-model');
  if (noteElement) {
    // Load saved notes if they exist
    const savedNote = Storage.loadNote('data-model');
    if (savedNote) {
      noteElement.value = savedNote;
    }
    
    console.log('Data Model view initialized');
  }
})();
