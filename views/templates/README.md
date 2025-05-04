# Templates and Common Styles Guide

This guide explains how to use the templates and common styles to maintain consistency in the Music Besties Planning App documentation.

## Common Styles

The `common-styles.css` file contains reusable CSS classes that replace commonly used inline styles. Using these classes helps maintain consistency and makes updates easier.

### Key Classes

- **Layout Classes**: `component-container`, `component-header`, `flex-row`, `flex-1`, `flex-2`
- **Text Classes**: `component-description`, `text-secondary`, `text-title`
- **Container Classes**: `preview-container`, `props-table`
- **Utility Classes**: `mt-10`, `mb-15`, `text-center`

## Component Documentation Template

The `component-template.html` file provides a consistent structure for documenting components. Copy this template when adding new component documentation.

### Usage

1. Copy the template from `views/templates/component-template.html`
2. Replace placeholder content with actual component details
3. Add to the appropriate section in `components.html`

## UI Snippets

The `ui-snippets.html` file contains reusable HTML snippets for common UI elements used in mockups.

### Available Snippets

- **Chips**: Basic and ranked chip components
- **Cards**: Basic and ranked dashboard cards
- **Sidebar Panel**: Structure for the sliding sidebar
- **Modal Dialog**: Confirmation modal structure

### Usage

1. Reference `views/templates/ui-snippets.html` when creating mockups
2. Copy the appropriate snippet
3. Customize as needed for your specific mockup

## Benefits

- **Consistency**: All documentation follows the same structure and style
- **Maintainability**: Updates to common elements can be made in one place
- **Efficiency**: Less duplication of code across documentation files

## Example

See the updated `DashboardCard.vue` component documentation in `components.html` for an example of how to use these common styles and templates.
