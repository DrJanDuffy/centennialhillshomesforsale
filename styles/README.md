# CSS Architecture & Design System

## Overview

This project uses a modular CSS architecture with a comprehensive design system
for consistency, maintainability, and scalability.

## File Structure

```bash
styles/
├── design-system.css    # Design tokens, utilities, and base components
├── components.css       # Page-specific components and layouts
├── globals.css         # Global imports and overrides
└── README.md           # This documentation
```

## Design System (`design-system.css`)

### Design Tokens

All design decisions are centralized in CSS custom properties (variables) under `:root`:

#### Color Palette

- `--primary-color`: Main brand color (#2563eb)
- `--secondary-color`: Secondary brand color (#059669)
- `--accent-color`: Accent color (#f59e0b)
- `--text-primary`: Primary text color (#1f2937)
- `--text-secondary`: Secondary text color (#6b7280)
- `--bg-primary`: Primary background (#ffffff)
- `--bg-secondary`: Secondary background (#f8fafc)

#### Spacing Scale

- `--space-xs`: 0.25rem
- `--space-sm`: 0.5rem
- `--space-md`: 1rem
- `--space-lg`: 1.5rem
- `--space-xl`: 2rem
- `--space-2xl`: 3rem
- `--space-3xl`: 4rem

#### Typography Scale

- `--font-size-xs` through `--font-size-5xl`
- `--font-weight-light` through `--font-weight-extrabold`
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

#### Shadow System

- `--shadow-sm` through `--shadow-2xl`

#### Border Radius Scale

- `--radius-sm` through `--radius-full`

### Utility Classes

#### Layout Utilities

- `.container`: Max-width container with responsive padding
- `.section`: Standard section with padding
- `.main-content`: Main content area

#### Grid System

- `.grid`: CSS Grid container
- `.grid-cols-1` through `.grid-cols-4`: Column definitions
- `.grid-cols-auto`: Auto-fit grid with minmax(250px, 1fr)

#### Flexbox Utilities

- `.flex`, `.flex-col`, `.flex-row`
- `.items-center`, `.items-start`, `.items-end`
- `.justify-center`, `.justify-between`, etc.

#### Spacing Utilities

- `.m-0` through `.m-5`: Margin utilities
- `.mt-0` through `.mt-5`: Top margin
- `.mb-0` through `.mb-5`: Bottom margin
- `.ml-0` through `.ml-5`: Left margin
- `.mr-0` through `.mr-5`: Right margin
- `.p-0` through `.p-5`: Padding utilities
- `.pt-0` through `.pt-5`: Top padding
- `.pb-0` through `.pb-5`: Bottom padding
- `.pl-0` through `.pl-5`: Left padding
- `.pr-0` through `.pr-5`: Right padding

#### Typography Utilities

- `.text-xs` through `.text-5xl`: Font sizes
- `.font-light` through `.font-extrabold`: Font weights
- `.text-left`, `.text-center`, `.text-right`: Text alignment
- `.text-primary`, `.text-secondary`, `.text-light`: Text colors

#### Background Utilities

- `.bg-primary`, `.bg-secondary`, `.bg-tertiary`, `.bg-dark`

#### Border Utilities

- `.border`, `.border-0`, `.border-t`, `.border-b`, `.border-l`, `.border-r`
- `.rounded-sm` through `.rounded-full`

#### Shadow Utilities

- `.shadow-sm` through `.shadow-2xl`, `.shadow-none`

#### Display & Position Utilities

- `.block`, `.inline-block`, `.inline`, `.flex`, `.grid`, `.hidden`
- `.static`, `.fixed`, `.absolute`, `.relative`, `.sticky`
- `.z-0` through `.z-50`, `.z-auto`

#### Responsive Utilities

- `.sm:`, `.md:`, `.lg:`, `.xl:` prefixes for responsive variants

### Component System

#### Button Components

```css
.btn                    /* Base button */
.btn-primary           /* Primary variant */
.btn-secondary         /* Secondary variant */
.btn-outline           /* Outline variant */
.btn-ghost             /* Ghost variant */
.btn-sm                /* Small size */
.btn-lg                /* Large size */
```

#### Card Components

```css
.card                  /* Base card */
.card-header           /* Card header */
.card-body             /* Card body */
.card-footer           /* Card footer */
```

#### Form Components

```css
.form-group            /* Form group container */
.form-label            /* Form label */
.form-input            /* Text input */
.form-select           /* Select dropdown */
.form-textarea         /* Textarea */
```

## Components (`components.css`)

### Header & Navigation

- `.header`: Fixed header with backdrop blur
- `.header-content`: Header layout container
- `.header-brand`: Brand/logo area
- `.nav`: Navigation container
- `.nav-menu`: Navigation menu
- `.nav-link`: Navigation links
- `.menu-toggle`: Mobile menu toggle

### Hero Sections

- `.hero-section`: Full-height hero section
- `.hero-background`: Hero background image
- `.hero-overlay`: Hero overlay
- `.hero-content`: Hero content container
- `.hero-title`: Hero title
- `.hero-subtitle`: Hero subtitle
- `.hero-features`: Hero feature list
- `.hero-stats`: Hero statistics
- `.hero-buttons`: Hero call-to-action buttons

### Footer

- `.footer`: Main footer
- `.footer-content`: Footer layout
- `.footer-section`: Footer sections
- `.footer-bottom`: Footer bottom

### Widget Containers

- `.widget-container`: Standard widget wrapper
- RealScout widget overrides for proper styling

## Usage Examples

### Creating a Button

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary btn-lg">Large Secondary</button>
<a href="#" class="btn btn-outline">Link Button</a>
```

### Creating a Card

```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Creating a Grid Layout

```html
<div class="grid grid-cols-auto gap-4">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

### Responsive Design

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div class="card">Responsive Item</div>
</div>
```

### Spacing Usage Example

```html
<div class="p-4 mt-2 mb-3">
  <h2 class="text-2xl font-bold mb-2">Title</h2>
  <p class="text-secondary">Content with spacing</p>
</div>
```

## Best Practices

### 1. Use Design Tokens

Always use CSS custom properties instead of hardcoded values:

```css
/* ✅ Good */
color: var(--text-primary);
padding: var(--space-lg);

/* ❌ Bad */
color: #1f2937;
padding: 1.5rem;
```

### 2. Leverage Utility Classes

Use utility classes for common patterns:

```html
<!-- ✅ Good -->
<div class="flex items-center justify-between p-4">

<!-- ❌ Bad -->
<div style="display: flex; align-items: center;
     justify-content: space-between; padding: 1rem;">
```

### 3. Component Composition

Compose components using utility classes:

```html
<!-- ✅ Good -->
<div class="card p-6">
  <h3 class="text-xl font-semibold mb-4">Title</h3>
  <p class="text-secondary mb-4">Content</p>
  <div class="flex gap-2">
    <button class="btn btn-primary">Save</button>
    <button class="btn btn-outline">Cancel</button>
  </div>
</div>
```

### 4. Responsive Design

Use responsive prefixes for mobile-first design:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Content -->
</div>
```

## Accessibility Features

- Focus states for all interactive elements
- Proper color contrast ratios
- Screen reader support with `.sr-only` class
- Reduced motion support
- Touch-friendly button sizes (44px minimum)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Performance

- CSS custom properties for efficient theming
- Minimal CSS output with utility-first approach
- Optimized for critical rendering path
- Reduced motion support for performance

## Customization

To customize the design system:

1. Modify variables in `design-system.css` under `:root`
2. Add new utility classes following the existing patterns
3. Create new components in `components.css`
4. Use the existing responsive breakpoints

## Migration Guide

When migrating from old CSS:

1. Replace hardcoded colors with design tokens
2. Replace custom spacing with utility classes
3. Replace custom components with design system components
4. Update responsive breakpoints to use the new system
5. Remove duplicate or conflicting styles
