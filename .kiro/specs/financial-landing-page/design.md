# Design Document

## Overview

The financial services landing page will be built as a modern, single-page application using HTML5, CSS3, and vanilla JavaScript. The design emphasizes clean aesthetics, professional imagery, and intuitive user experience with a focus on trust and credibility. The page will feature a soft green color palette that conveys growth and stability, consistent with financial services branding.

## Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3 (with CSS Grid and Flexbox), Vanilla JavaScript
- **Styling**: Custom CSS with CSS variables for consistent theming
- **Icons**: Font Awesome or custom SVG icons
- **Images**: Optimized web formats (WebP with fallbacks)
- **Responsive Design**: Mobile-first approach with CSS media queries

### File Structure
```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   └── calculator.js
│   └── img/
│       ├── hero-bg.jpg
│       ├── dashboard-mockup.png
│       ├── testimonial-photos/
│       └── learning-thumbnails/
```

## Components and Interfaces

### 1. Header Component
- **Purpose**: Navigation and branding
- **Elements**: Logo, navigation menu, contact button
- **Behavior**: Sticky header with smooth scroll navigation
- **Responsive**: Hamburger menu on mobile devices

### 2. Hero Section Component
- **Purpose**: Primary value proposition and call-to-action
- **Elements**: 
  - Main headline: "Your Investment Needs TRUST, EXPERTISE, CONSISTENCY"
  - Supporting text
  - Primary CTA button
  - Hero image/background
- **Layout**: Split layout with text on left, visual on right
- **Responsive**: Stacked layout on mobile

### 3. Services Grid Component
- **Purpose**: Showcase 6 core services
- **Elements**: Service cards with icons, titles, descriptions
- **Layout**: 3x2 grid on desktop, 2x3 on tablet, 1x6 on mobile
- **Services**:
  - Investment Planning
  - Wealth Building  
  - Estate & Tax Planning
  - Retirement Planning
  - Financial Planning
  - Insurance Services

### 4. Financial Dashboard Component
- **Purpose**: Demonstrate platform capabilities
- **Elements**: 
  - Section headline
  - Dashboard mockup images
  - Feature highlights
- **Layout**: Image showcase with accompanying text
- **Interactive**: Hover effects on dashboard elements

### 5. Testimonials Component
- **Purpose**: Build trust through social proof
- **Elements**: 
  - Client photos
  - Star ratings
  - Testimonial text
  - Client names and titles
- **Layout**: 3-column grid with card-based design
- **Responsive**: Single column on mobile

### 6. Learning Academy Component
- **Purpose**: Educational resource showcase
- **Elements**: Article cards with thumbnails, titles, descriptions
- **Layout**: 3x2 grid layout
- **Interactive**: Hover effects and click handlers

### 7. Calculator Component
- **Purpose**: Interactive financial calculation tool
- **Elements**: 
  - Input fields
  - Calculation buttons
  - Results display
- **Functionality**: Real-time calculations using JavaScript
- **Types**: Investment calculator, loan calculator, retirement calculator

### 8. Footer Component
- **Purpose**: Contact information and site navigation
- **Elements**: 
  - Company information
  - Quick links
  - Social media icons
  - Contact details
- **Layout**: Multi-column layout with organized sections

## Data Models

### Service Item
```javascript
{
  id: string,
  title: string,
  description: string,
  icon: string,
  featured: boolean
}
```

### Testimonial
```javascript
{
  id: string,
  clientName: string,
  clientTitle: string,
  photo: string,
  rating: number,
  text: string,
  date: string
}
```

### Learning Resource
```javascript
{
  id: string,
  title: string,
  description: string,
  thumbnail: string,
  category: string,
  readTime: string,
  url: string
}
```

### Calculator Input
```javascript
{
  principal: number,
  rate: number,
  time: number,
  compounding: string,
  additionalContributions: number
}
```

## Error Handling

### Image Loading
- Implement lazy loading for images
- Provide fallback images for broken links
- Use progressive image enhancement (WebP with JPEG fallbacks)

### JavaScript Errors
- Graceful degradation for calculator functionality
- Form validation with user-friendly error messages
- Console error logging for debugging

### Responsive Breakpoints
- Handle edge cases for unusual screen sizes
- Ensure content remains accessible when CSS fails to load
- Progressive enhancement approach

## Testing Strategy

### Cross-Browser Testing
- Test on Chrome, Firefox, Safari, Edge
- Verify CSS Grid and Flexbox support
- Test JavaScript functionality across browsers

### Responsive Testing
- Test on multiple device sizes (320px to 1920px)
- Verify touch interactions on mobile devices
- Test orientation changes on tablets

### Performance Testing
- Optimize images for web delivery
- Minimize CSS and JavaScript files
- Test loading times on various connection speeds

### Accessibility Testing
- Ensure proper heading hierarchy (h1-h6)
- Implement ARIA labels where needed
- Test keyboard navigation
- Verify color contrast ratios
- Test with screen readers

### Functional Testing
- Verify all links and buttons work correctly
- Test calculator functionality with various inputs
- Validate form submissions
- Test smooth scrolling navigation

## Visual Design Specifications

### Color Palette
- **Primary Green**: #7CB342 (trust, growth)
- **Light Green**: #AED581 (accents, highlights)
- **Dark Green**: #558B2F (text, borders)
- **Neutral Gray**: #F5F5F5 (backgrounds)
- **Dark Gray**: #424242 (text)
- **White**: #FFFFFF (cards, sections)

### Typography
- **Primary Font**: 'Inter' or 'Roboto' (clean, professional)
- **Heading Font**: 'Poppins' (modern, friendly)
- **Font Sizes**: 
  - H1: 3rem (desktop), 2rem (mobile)
  - H2: 2.5rem (desktop), 1.75rem (mobile)
  - Body: 1rem
  - Small: 0.875rem

### Spacing System
- **Base Unit**: 8px
- **Small**: 16px
- **Medium**: 32px
- **Large**: 64px
- **XL**: 96px

### Component Styling
- **Cards**: White background, subtle shadow, 8px border radius
- **Buttons**: Primary green, white text, 6px border radius, hover effects
- **Icons**: 24px standard size, consistent style
- **Images**: Rounded corners, optimized aspect ratios