/**
 * Storage Utility for Music Besties Planning App
 * Handles localStorage operations for persisting data
 */

const Storage = {
  // Save data to localStorage
  save: function(key, data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },
  
  // Load data from localStorage
  load: function(key, defaultValue = null) {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return defaultValue;
      }
      return JSON.parse(serialized);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  },
  
  // Remove data from localStorage
  remove: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  // Clear all app data from localStorage
  clearAll: function() {
    try {
      // Only clear keys that belong to the planning app
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('planning_')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
  
  // Save developer notes for a specific section
  saveNote: function(sectionId, note) {
    const notes = this.load('planning_notes', {});
    notes[sectionId] = note;
    return this.save('planning_notes', notes);
  },
  
  // Load developer notes for a specific section
  loadNote: function(sectionId) {
    const notes = this.load('planning_notes', {});
    return notes[sectionId] || '';
  },
  
  // Load all developer notes
  loadAllNotes: function() {
    return this.load('planning_notes', {});
  }
};
