/**
 * Music Besties Planning App
 * Core application functionality
 */

// Main application object
const PlanningApp = {
  // Current active section
  currentSection: null,
  
  // Initialize the application
  init: function() {
    // Clear localStorage to ensure fresh start each time
    localStorage.removeItem('lastSection');
    
    // Always start with mocks section in this branch
    this.currentSection = 'mocks';
    
    // Setup navigation
    this.setupNavigation();
    
    // Load initial content
    this.loadContent(this.currentSection);
    
    console.log('Planning App initialized with mocks focus');
  },
  
  // Setup navigation event listeners
  setupNavigation: function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get section from data attribute
        const section = link.getAttribute('data-section');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Load content
        this.loadContent(section);
      });
    });
  },
  
  // Load content for a section
  loadContent: function(section) {
    // Show loading state
    const contentEl = document.getElementById('content');
    contentEl.innerHTML = '<div class="loading">Loading...</div>';
    
    // Only allow mocks and sketches sections
    if (section !== 'mocks' && section !== 'sketches') {
      console.log(`Section "${section}" is not available, defaulting to mocks`);
      section = 'mocks';
    }
    
    // Fetch the view
    fetch(`views/${section}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${section}`);
        }
        return response.text();
      })
      .then(html => {
        // Update content
        contentEl.innerHTML = html;
        
        // Update current section
        this.currentSection = section;
        
        // Save to localStorage
        localStorage.setItem('lastSection', section);
        
        // Load section-specific script
        this.loadScript(`js/${section}.js`);
        
        // Load section-specific styles
        this.loadStyles(`css/${section}.css`);
      })
      .catch(error => {
        console.error('Error loading content:', error);
        contentEl.innerHTML = `<div class="error">Error loading content: ${error.message}</div>`;
      });
  },
  
  // Load a script dynamically
  loadScript: function(src) {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        return resolve();
      }
      
      // Create script element
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      
      // Add to document
      document.body.appendChild(script);
    });
  },
  
  // Load styles dynamically
  loadStyles: function(href) {
    // Check if stylesheet is already loaded
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) {
      return;
    }
    
    // Create link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    // Add to document
    document.head.appendChild(link);
  },
  
  // Centralized tab navigation setup
  setupTabs: function(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error(`Tab container ${containerSelector} not found`);
      return;
    }
    
    const tabButtons = container.querySelectorAll('.tab-button');
    console.log(`Found ${tabButtons.length} tab buttons in ${containerSelector}`);
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get the tab to show
        const tabId = this.getAttribute('data-tab');
        console.log(`Tab clicked: ${tabId} in ${containerSelector}`);
        
        // Remove active class from all buttons in this container
        container.querySelectorAll('.tab-button').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Remove active class from all panes related to this container
        const tabPanes = document.querySelectorAll('.tab-pane');
        tabPanes.forEach(pane => {
          if (pane.id === tabId || pane.id === `${tabId}-tab`) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
        
        // Add active class to clicked button
        this.classList.add('active');
      });
    });
  }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  PlanningApp.init();
});
