# Tabs Component

The tabs component is a navigation pattern that allows users to switch between different views within the same context. It's used throughout the Music Besties Planning App for section navigation.

## Current Implementation

The tabs component is currently implemented with the following structure:

```html
<div class="mocks-tabs">
  <div class="tab-nav">
    <button class="tab-button active" data-tab="overview">Overview</button>
    <button class="tab-button" data-tab="dashboard">Dashboard</button>
    <!-- Additional tab buttons -->
  </div>
  
  <div class="tab-content">
    <div class="tab-pane active" id="overview-tab">
      <!-- Tab content -->
    </div>
    <div class="tab-pane" id="dashboard-tab">
      <!-- Tab content -->
    </div>
    <!-- Additional tab panes -->
  </div>
</div>
```

The JavaScript functionality has been centralized in `app.js`:

```javascript
// In app.js
setupTabs: function(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const tabButtons = container.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the tab to show
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and panes
      container.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // ... additional functionality
    });
  });
}
```

## Recommended Pattern

For future development, we recommend the following BEM-based pattern:

```html
<div class="tabs">
  <div class="tabs__nav">
    <button class="tabs__button tabs__button--active" data-tab="overview">Overview</button>
    <button class="tabs__button" data-tab="dashboard">Dashboard</button>
  </div>
  
  <div class="tabs__content">
    <div class="tabs__pane tabs__pane--active" id="overview">
      <!-- Tab content -->
    </div>
    <div class="tabs__pane" id="dashboard">
      <!-- Tab content -->
    </div>
  </div>
</div>
```

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.tabs` | Container for the entire tabs component |
| `.tabs__nav` | Container for tab buttons |
| `.tabs__button` | Individual tab button |
| `.tabs__button--active` | Active state for tab button |
| `.tabs__content` | Container for tab content panes |
| `.tabs__pane` | Individual tab content pane |
| `.tabs__pane--active` | Active state for tab pane |

## Design Tokens

The tabs component uses the following design tokens:

| Token | Usage |
|-------|-------|
| `--color-primary` | Active tab indicator |
| `--color-text` | Tab text color |
| `--color-gray-200` | Tab borders |
| `--spacing-md` | Tab padding |
| `--radius-md` | Container border radius |
| `--shadow-md` | Container shadow |
| `--transition-normal` | Tab state transitions |

## JavaScript API

```javascript
// Initialize tabs
PlanningApp.setupTabs('.tabs');

// For tabs with non-standard structure
PlanningApp.setupTabs('.custom-tabs', {
  buttonSelector: '.custom-tabs__button',
  paneSelector: '.custom-tabs__pane',
  activeClass: 'is-active'
});
```

## Accessibility Considerations

- Use `role="tablist"` on the tab container
- Use `role="tab"` on tab buttons
- Use `role="tabpanel"` on tab panes
- Use `aria-selected="true"` on the active tab
- Ensure keyboard navigation works (arrow keys, tab)

## Implementation Notes

The current implementation has been partially centralized:

- ✅ JavaScript functionality is centralized in `app.js`
- ⚠️ CSS is partially centralized in `common-styles.css`
- ❌ HTML structure varies between sections

Future improvements should focus on:
1. Standardizing the HTML structure
2. Completing the CSS centralization
3. Enhancing accessibility
4. Using consistent naming conventions
