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
    
    // Only allow valid sections
    if (section !== 'mocks' && section !== 'sketches' && section !== 'big-picture') {
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
        
        // Load section-specific styles first
        this.loadStyles(`css/${section}.css`);
        
        // Load section-specific script with a delay to ensure DOM is ready
        setTimeout(() => {
          this.loadScript(`js/${section}.js`);
        }, 200);
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
  
  // Clean up event listeners before adding new ones
  cleanupEventListeners: function(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Simple way to remove all event listeners - clone and replace the element
    const tabButtons = container.querySelectorAll('.tab-button, .tabs__button');
    tabButtons.forEach(button => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
    });
    
    console.log(`Cleaned up event listeners in ${containerSelector}`);
  },
  
  // Centralized tab navigation setup
  setupTabs: function(containerSelector, options = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error(`Tab container ${containerSelector} not found`);
      return;
    }
    
    // Clean up existing event listeners first
    this.cleanupEventListeners(containerSelector);
    
    // Default options
    const defaults = {
      buttonSelector: '.tab-button, .tabs__button', // Support both naming conventions
      paneSelector: '.tab-pane, .tabs__pane',       // Support both naming conventions
      activeClass: 'active',                        // Default active class
      bemActiveClass: '--active',                   // BEM modifier for active state
      tabAttribute: ['data-tab', 'data-detail-tab'], // Support multiple attribute names
      debug: true                                   // Enable debug logging by default
    };
    
    // Merge defaults with provided options
    const settings = { ...defaults, ...options };
    
    // Find all tab buttons
    const tabButtons = container.querySelectorAll(settings.buttonSelector);
    
    if (settings.debug) {
      console.log(`Found ${tabButtons.length} tab buttons in ${containerSelector}`);
    }
    
    // Add ARIA attributes for accessibility
    if (container.getAttribute('role') !== 'tablist') {
      container.setAttribute('role', 'tablist');
    }
    
    // Add click event listener using event delegation for better reliability
    container.addEventListener('click', function(event) {
      // Find the closest button element if the click was on a child element
      const button = event.target.closest(settings.buttonSelector);
      
      // If no button was clicked or it's not in this container, ignore
      if (!button || !container.contains(button)) {
        return;
      }
      
      console.log('Tab button clicked via delegation:', button);
      
      // Get tab ID from data attribute
      let tabId = null;
      
      // Check for multiple possible attribute names
      if (Array.isArray(settings.tabAttribute)) {
        for (const attr of settings.tabAttribute) {
          if (button.hasAttribute(attr)) {
            tabId = button.getAttribute(attr);
            break;
          }
        }
      } else {
        tabId = button.getAttribute(settings.tabAttribute);
      }
      
      if (!tabId) {
        console.error('Tab button clicked but missing tab identifier attribute', button);
        return;
      }
      
      if (settings.debug) {
        console.log(`Tab clicked: ${tabId} in ${containerSelector}`);
      }
      
      // Remove active class from all buttons
      const tabButtons = container.querySelectorAll(settings.buttonSelector);
      tabButtons.forEach(btn => {
        btn.classList.remove(settings.activeClass);
        btn.setAttribute('aria-selected', 'false');
        
        // Also handle BEM class if present
        if (btn.classList.contains('tabs__button')) {
          btn.classList.remove('tabs__button--active');
        }
      });
      
      // Add active class to clicked button
      button.classList.add(settings.activeClass);
      button.setAttribute('aria-selected', 'true');
      
      // Also add BEM active class if using BEM naming
      if (button.classList.contains('tabs__button')) {
        button.classList.add('tabs__button--active');
      }
      
      // Find and activate the corresponding tab pane
      const tabPanes = container.querySelectorAll(settings.paneSelector);
      tabPanes.forEach(pane => {
        pane.classList.remove(settings.activeClass);
        pane.setAttribute('aria-hidden', 'true');
        
        // Also handle BEM class if present
        if (pane.classList.contains('tabs__pane')) {
          pane.classList.remove('tabs__pane--active');
        }
      });
      
      // Find the target pane by ID
      // Try different ID patterns - exact match, with -tab suffix, or without -tab suffix
      let targetPane = document.getElementById(tabId);
      
      // If not found with exact ID, try with -tab suffix
      if (!targetPane) {
        targetPane = document.getElementById(tabId + '-tab');
      }
      
      // If still not found, try removing -tab suffix
      if (!targetPane && tabId.endsWith('-tab')) {
        targetPane = document.getElementById(tabId.replace('-tab', ''));
      }
      
      if (targetPane) {
        targetPane.classList.add(settings.activeClass);
        targetPane.setAttribute('aria-hidden', 'false');
        
        // Also add BEM active class if using BEM naming
        if (targetPane.classList.contains('tabs__pane')) {
          targetPane.classList.add('tabs__pane--active');
        }
        
        if (settings.debug) {
          console.log(`Tab pane activated: ${targetPane.id}`);
        }
      } else {
        console.error(`Tab pane with ID ${tabId} not found after trying all patterns`);
      }
    });
  },
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  PlanningApp.init();
});
