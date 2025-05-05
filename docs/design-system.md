# Music Besties Planning App - Design System

This document outlines the design system for the Music Besties Planning App, including design tokens, naming conventions, and component patterns. It serves as a reference for maintaining consistency throughout the application.

## Design Tokens

Design tokens are the visual design atoms of the design system – specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to ensure flexibility and consistency.

### Colors

| Token Name | Value | Usage |
|------------|-------|-------|
| `--color-primary` | #3498db | Primary actions, active tabs, links |
| `--color-secondary` | #f8f9fa | Backgrounds, secondary elements |
| `--color-text` | #333333 | Main text color |
| `--color-text-light` | #666666 | Secondary text, descriptions |
| `--color-success` | #28a745 | Completed status indicators |
| `--color-danger` | #dc3545 | Not started status indicators |
| `--color-warning` | #ffc107 | In progress status indicators |
| `--color-white` | #ffffff | White backgrounds |
| `--color-gray-100` | #f8f9fa | Lightest gray (backgrounds) |
| `--color-gray-200` | #e9ecef | Light gray (borders) |
| `--color-gray-300` | #dee2e6 | Medium light gray (dividers) |
| `--color-gray-400` | #ced4da | Medium gray (disabled states) |
| `--color-gray-500` | #adb5bd | Medium dark gray (placeholder text) |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-xs` | 4px | Tiny spacing, icon padding |
| `--spacing-sm` | 8px | Small spacing, tight elements |
| `--spacing-md` | 16px | Medium spacing, standard padding |
| `--spacing-lg` | 24px | Large spacing, section padding |
| `--spacing-xl` | 32px | Extra large spacing, section margins |
| `--spacing-xxl` | 48px | Double extra large spacing, major sections |

### Typography

| Token Name | Value | Usage |
|------------|-------|-------|
| `--font-size-xs` | 12px | Very small text, captions |
| `--font-size-sm` | 14px | Small text, secondary information |
| `--font-size-md` | 16px | Body text, default size |
| `--font-size-lg` | 20px | Large text, section headings |
| `--font-size-xl` | 24px | Extra large text, page titles |
| `--font-weight-normal` | 400 | Normal text weight |
| `--font-weight-bold` | 700 | Bold text weight |
| `--line-height-tight` | 1.2 | Tight line height for headings |
| `--line-height-normal` | 1.5 | Normal line height for body text |

### Effects

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-sm` | 0 1px 3px rgba(0,0,0,0.1) | Subtle shadow for small elements |
| `--shadow-md` | 0 2px 4px rgba(0,0,0,0.1) | Medium shadow for cards and containers |
| `--shadow-lg` | 0 4px 6px rgba(0,0,0,0.1) | Large shadow for modals and popovers |
| `--radius-sm` | 4px | Small border radius for buttons |
| `--radius-md` | 8px | Medium border radius for cards |
| `--radius-lg` | 12px | Large border radius for modals |
| `--transition-fast` | 0.1s ease | Fast transitions |
| `--transition-normal` | 0.2s ease | Normal transitions |

## Naming Conventions

The app uses a modified BEM (Block, Element, Modifier) naming convention for CSS classes:

### Pattern

```
.block
.block__element
.block--modifier
.block__element--modifier
```

### Examples

```
.tabs
.tabs__button
.tabs--vertical
.tabs__button--active
```

### Rules

1. Block names should be descriptive of the component's purpose
2. Element names should describe their role within the block
3. Modifier names should describe the variation
4. Use kebab-case for multi-word names (e.g., `.section-header`)
5. Keep names concise but descriptive

## Implementation Status

The design tokens and naming conventions documented here represent the target state for the application. The current implementation is in the process of being updated to follow these guidelines.

As of May 2025, the following has been implemented:
- Centralized tab navigation functionality
- Common CSS styles for tabs in common-styles.css

Future work includes:
- Converting hard-coded values to design tokens
- Updating class names to follow BEM convention
- Creating a visual style guide page
