// Reset localStorage and ensure mocks content is loaded
(function() {
  // Clear the localStorage
  localStorage.removeItem('lastSection');
  
  // Set the current section to mocks
  localStorage.setItem('lastSection', 'mocks');
  
  console.log('localStorage reset to mocks section');
})();
