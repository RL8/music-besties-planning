# Status Indicators Component

Status indicators are visual elements that show the current state of a feature or item. They're used throughout the Music Besties Planning App to indicate completion status.

## Current Implementation

Status indicators are currently implemented with the following structure:

```html
<span class="status-indicator status-completed">[🟢 Completed]</span>
<span class="status-indicator status-not-started">[🔴 Not Started]</span>
```

The CSS is partially centralized in `common-styles.css`:

```css
.status-indicator {
  font-size: 0.8em;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
}

.status-completed {
  color: #28a745;
}

.status-not-started {
  color: #dc3545;
}
```

## Recommended Pattern

For future development, we recommend the following BEM-based pattern:

```html
<span class="status status--completed">Completed</span>
<span class="status status--not-started">Not Started</span>
<span class="status status--in-progress">In Progress</span>
```

## CSS Classes

| Class | Purpose |
|-------|---------|
| `.status` | Base class for all status indicators |
| `.status--completed` | Completed state (green) |
| `.status--not-started` | Not started state (red) |
| `.status--in-progress` | In progress state (yellow) |

## Design Tokens

The status indicator component uses the following design tokens:

| Token | Usage |
|-------|-------|
| `--color-success` | Completed status |
| `--color-danger` | Not started status |
| `--color-warning` | In progress status |
| `--font-size-xs` | Status text size |
| `--spacing-xs` | Internal padding |
| `--radius-sm` | Border radius |

## Variants

### Text-Only Variant

```html
<span class="status status--completed">Completed</span>
```

### Icon + Text Variant

```html
<span class="status status--completed">
  <span class="status__icon">🟢</span>
  <span class="status__text">Completed</span>
</span>
```

### Badge Variant

```html
<span class="status status--completed status--badge">Completed</span>
```

## Usage Guidelines

- Use status indicators consistently across the application
- Place them near the item they're describing
- Maintain consistent wording for each status
- Ensure sufficient color contrast for accessibility
- Consider adding icons for better visual distinction

## Implementation Notes

The current implementation is partially centralized:

- ✅ Basic CSS is centralized in `common-styles.css`
- ⚠️ Some status styles are still in section-specific CSS
- ⚠️ No JavaScript functionality is currently associated with status indicators

Future improvements should focus on:
1. Standardizing the HTML structure
2. Completing the CSS centralization
3. Using consistent naming conventions
4. Adding appropriate ARIA attributes for accessibility
