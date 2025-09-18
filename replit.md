# Rentify - Premium Rental Platform

## Overview

Rentify is a premium rental marketplace that allows users to rent luxury items across multiple categories including watches, cars, electronics, furniture, jewelry, and fashion. The platform focuses on high-end, luxury items with a sleek, modern user interface designed to appeal to affluent customers seeking temporary access to premium products. All pricing is displayed in Indian Rupees (₹) to serve the Indian market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript for simplicity and performance
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox for adaptive layouts
- **Component-Based Structure**: Modular JavaScript architecture with separated concerns for product management, cart functionality, and UI interactions
- **State Management**: Client-side state management for cart, wishlist, and product filtering using JavaScript objects and local storage

### Design System
- **CSS Custom Properties**: Centralized design tokens for colors, shadows, spacing, and transitions
- **Typography**: Inter font family for modern, clean readability
- **Color Palette**: Professional blue primary color scheme with red accents for calls-to-action
- **Interactive Elements**: Consistent hover states, transitions, and micro-interactions for enhanced user experience

### Data Architecture
- **Static Product Data**: Products stored as JavaScript objects with structured properties (id, name, category, price, image, description, featured status)
- **Category System**: Hierarchical categorization supporting filtering and navigation
- **Image Management**: Organized asset structure with stock images stored in dedicated directories

### User Interface Components
- **Navigation System**: Sticky header with search functionality, category navigation, and action buttons
- **Product Display**: Grid-based layout with card components featuring images, pricing, and quick actions
- **Shopping Features**: Integrated cart and wishlist functionality with real-time counters and state persistence
- **Search and Filter**: Real-time search with category-based filtering capabilities

## External Dependencies

### Frontend Libraries
- **Font Awesome 6.0.0**: Icon library for consistent iconography across the platform
- **Google Fonts (Inter)**: Typography system for modern, professional text rendering

### Asset Management
- **Stock Images**: Local image assets stored in `attached_assets/stock_images/` directory
- **Image Optimization**: Structured naming convention for organized asset management

### Browser APIs
- **Local Storage**: For persisting user cart and wishlist data across sessions
- **DOM Manipulation**: Native JavaScript APIs for dynamic content updates and user interactions

### Potential Integration Points
- **Payment Processing**: Ready for integration with payment gateways (Stripe, PayPal)
- **Authentication System**: Architecture supports future user authentication implementation
- **Backend API**: Frontend structure designed to easily integrate with REST or GraphQL APIs
- **Database Integration**: Product data structure ready for database migration and dynamic content management