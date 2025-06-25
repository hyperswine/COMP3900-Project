# AGVN Frontend Architecture & UI Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [Page Architecture](#page-architecture)
6. [UI Design System](#ui-design-system)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Authentication Flow](#authentication-flow)
10. [Responsive Design](#responsive-design)

## Project Overview

**AGVN (Australian Government Virtual Network)** is a modern web application designed to facilitate citizen engagement with the Australian Government. The platform provides citizens with tools to participate in democratic processes, stay informed about policies, and interact with government services.

### Key Features

- **Democratic Participation**: Voting, polling, and policy feedback
- **Information Access**: Government departments, policies, and initiatives
- **Citizen Engagement**: Contribution tracking and budget visualization
- **Virtual Currency**: G-Coin system for civic participation rewards
- **Real-time Updates**: Notifications and live data

## Technical Stack

### Frontend Framework

- **Next.js 15.3.4** - React-based full-stack framework
- **React 19.1.0** - Component-based UI library
- **TypeScript** - Type-safe JavaScript

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (@mui/material)** - React component library
- **Styled Components** - CSS-in-JS styling

### Data Visualization

- **Chart.js 4.4.0** - Canvas-based charts
- **React-ChartJS-2** - React wrapper for Chart.js
- **Recharts** - React-based charting library

### State Management & Data Fetching

- **React Hook Form** - Form state management
- **Axios** - HTTP client for API calls
- **Universal-Cookie** - Cookie management for authentication

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Next.js Built-in TypeScript support**

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── about/                   # About page
│   ├── actions/                 # Government actions
│   ├── aeros/                   # G-Coin system
│   ├── auth/                    # Authentication pages
│   ├── budget/                  # Budget visualization
│   ├── contribute/              # Citizen contributions
│   ├── departments/             # Government departments
│   ├── initiatives/             # Government initiatives
│   ├── notifications/           # User notifications
│   ├── policies/                # Policy management
│   ├── profile/                 # User profile
│   ├── vote/                    # Voting system
│   ├── layout.tsx               # Root layout
│   ├── loading.tsx              # Global loading component
│   ├── not-found.tsx            # 404 page
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
│   ├── Actions/                 # Action-related components
│   ├── Auth/                    # Authentication components
│   ├── Banner/                  # Banner/hero components
│   ├── ChatWidget/              # AI chatbot interface
│   ├── CheckMany/               # Multi-select checkbox
│   ├── CheckOne/                # Single checkbox
│   ├── ContributeChart/         # Contribution visualization
│   ├── CubeMesh/                # 3D visualization
│   ├── GCoinChart/              # G-Coin analytics
│   ├── GenericModal/            # Modal dialogs
│   ├── HowLikely/               # Likelihood rating
│   ├── HowMuch/                 # Amount input
│   ├── InfoCard/                # Information cards
│   ├── PageTitle/               # Page title component
│   ├── PollTextArea/            # Poll text input
│   ├── PoorToGood/              # Rating scale
│   ├── Popup/                   # Popup notifications
│   ├── Select/                  # Custom select dropdown
│   ├── TheFooter/               # Global footer
│   ├── TheHeader/               # Global header & navigation
│   └── TheLayout/               # Layout wrapper
├── styles/
│   └── globals.css              # Global styles
└── custom.d.ts                  # TypeScript declarations
```

## Core Components

### TheLayout Component

**Location**: `src/components/TheLayout/index.tsx`

The main layout wrapper that provides:

- **Header Navigation**: Global navigation bar
- **Footer**: Site-wide footer
- **Chat Widget**: AI-powered assistance
- **Authentication Context**: User state management

**Features**:

- Responsive design with mobile menu
- Integrated chatbot functionality
- Cookie-based authentication
- Dark/light theme toggle

### TheHeader Component

**Location**: `src/components/TheHeader/index.tsx`

Multi-level navigation system:

1. **Top Navigation**: Logo and main sections
2. **Secondary Navigation**: System branding and user actions
3. **Main Navigation**: Action items and dropdown menus

**Key Features**:

- **Responsive Design**: Mobile hamburger menu
- **User Authentication**: Login/logout functionality
- **Theme Toggle**: Dark/light mode switching
- **Notification Access**: Quick access to notifications

### Banner Component

**Location**: `src/components/TheHeader/index.tsx`

Dynamic banner system with two layouts:

1. **With Quote**: Split layout (title/subtitle left, quote right)
2. **Without Quote**: Centered layout with larger text

**Adaptive Behavior**:

- Fetches random quotes from external API
- Automatically adjusts layout based on content
- Hover effects and transitions

### InfoCard Components

**Location**: `src/components/InfoCard/`

Multiple card variants:

- **LeftCard**: Horizontal layout with image and content
- **DownCard**: Vertical layout for grid displays
- **Expandable Cards**: Modal popup for detailed content

## Page Architecture

### 1. Home Page (`/`)

**File**: `src/app/page.tsx`

**Purpose**: Landing page and navigation hub

**UI Elements**:

- Welcome banner with system introduction
- Grid of navigation cards leading to main sections:
  - Current Policies
  - Actions we're taking
  - Our Departments
  - Aeros (G-Coin)

**Design**:

- Clean, minimal design
- Large typography for accessibility
- Card-based navigation with hover effects

### 2. About Page (`/about`)

**File**: `src/app/about/page.tsx`

**Purpose**: System information and explanation

**Content Sections**:

- A-GVN System overview
- Mission statement
- Technical approach
- Benefits to citizens

**UI Features**:

- Banner with inspirational quote
- Two-column layout (text + logo)
- Professional typography

### 3. Departments Page (`/departments`)

**File**: `src/app/departments/page.tsx`

**Purpose**: Government department information

**UI Design**:

- **Modern Grid Layout**: Responsive card grid
- **Department Cards**: Each featuring:
  - Department logo/image
  - Title and subtitle
  - Hover effects (lift animation, image scaling)
  - "Learn more" call-to-action
- **Modal Details**: Expandable detailed view
- **Feedback Section**: User input for department feedback

**Responsive Behavior**:

- 1 column (mobile) → 2 columns (tablet) → 3 columns (laptop) → 4 columns (desktop)

### 4. Vote Page (`/vote`)

**File**: `src/app/vote/page.tsx`

**Purpose**: Democratic participation through voting

**Features**:

- Policy listing with voting options
- Authentication-gated access
- Real-time vote submission
- Policy categorization
- Cost information display

### 5. Actions Page (`/actions`)

**Purpose**: Government actions and initiatives

**Typical Content**:

- Crisis response actions
- Policy implementations
- Public service announcements

### 6. Policies Page (`/policies`)

**Purpose**: Policy information and management

**Features**:

- Policy browsing and filtering
- Detailed policy information
- Public feedback mechanisms

### 7. Contribute Page (`/contribute`)

**Purpose**: Citizen contribution tracking

**Features**:

- Contribution visualization
- Impact metrics
- G-Coin integration

### 8. Profile Page (`/profile`)

**Purpose**: User account management

**Features**:

- Personal information
- Voting history
- Contribution tracking
- Notification preferences

### 9. Authentication Pages (`/auth`)

**Purpose**: User authentication flow

**Pages**:

- Sign in
- Sign up
- Password recovery
- Account verification

## UI Design System

### Color Palette

- **Primary**: Blue tones for government branding
- **Secondary**: Gray scale for content hierarchy
- **Accent**: Red for interactive elements and CTAs
- **Status Colors**: Green (success), Yellow (warning), Red (error)

### Typography Scale

- **Display**: `text-6xl` (96px) for hero titles
- **Heading 1**: `text-4xl` (36px) for page titles
- **Heading 2**: `text-2xl` (24px) for section titles
- **Body Large**: `text-xl` (20px) for emphasis
- **Body**: `text-base` (16px) for regular content
- **Small**: `text-sm` (14px) for metadata

### Spacing System

- **Consistent Grid**: 4px base unit
- **Component Padding**: `p-4`, `p-6`, `p-8`
- **Section Margins**: `mb-8`, `mb-12`, `mb-16`
- **Container Spacing**: `container mx-auto px-4`

### Component Patterns

#### Cards

```css
.card-base {
  @apply bg-white rounded-xl shadow-lg hover:shadow-xl;
  @apply transition-all duration-300 cursor-pointer;
  @apply transform hover:-translate-y-2;
}
```

#### Buttons

```css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white font-medium rounded-md;
  @apply hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
```

#### Forms

```css
.form-input {
  @apply w-full p-3 border border-gray-300 rounded-md;
  @apply focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
```

### Animation System

- **Hover Effects**: Scale, translate, shadow changes
- **Transitions**: 300ms duration with ease-in-out
- **Loading States**: Smooth opacity changes
- **Modal Animations**: Fade in/out with backdrop

## State Management

### Authentication State

- **Cookie-based**: Using `universal-cookie` library
- **Token Storage**: JWT tokens in HTTP-only cookies
- **Route Protection**: Page-level authentication checks

### Form State

- **React Hook Form**: For complex forms with validation
- **Local State**: `useState` for simple form inputs
- **Validation**: Real-time validation with error states

### API State

- **Loading States**: Boolean flags for async operations
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages and redirects

## API Integration

### Base Configuration

- **Base URL**: `http://localhost:8000/api/v1/`
- **HTTP Client**: Axios with interceptors
- **Authentication**: Bearer token in headers

### API Endpoints

- `/auth/*` - Authentication endpoints
- `/vote/*` - Voting system
- `/policies/*` - Policy management
- `/departments/*` - Department information
- `/feedback` - User feedback submission

### Error Handling

- Network error recovery
- User-friendly error messages
- Fallback content for failed requests

## Authentication Flow

### Sign In Process

1. User enters credentials
2. Frontend validates input
3. API call to `/auth/signin`
4. JWT token stored in cookies
5. Redirect to dashboard/intended page

### Protected Routes

- Authentication check in layout component
- Redirect to sign-in for unauthenticated users
- Role-based access control where applicable

### Session Management

- Token refresh mechanisms
- Automatic logout on token expiry
- Remember me functionality

## Responsive Design

### Breakpoint System

- **Mobile**: `< 768px` (sm)
- **Tablet**: `768px - 1024px` (md)
- **Laptop**: `1024px - 1280px` (lg)
- **Desktop**: `> 1280px` (xl)

### Mobile-First Approach

- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interface elements

### Navigation Adaptation

- **Mobile**: Hamburger menu with slide-out drawer
- **Desktop**: Full horizontal navigation
- **Tablet**: Condensed horizontal navigation

### Grid Adaptations

```css
/* Department cards example */
.department-grid {
  @apply grid gap-6;
  @apply grid-cols-1;          /* Mobile: 1 column */
  @apply md:grid-cols-2;       /* Tablet: 2 columns */
  @apply lg:grid-cols-3;       /* Laptop: 3 columns */
  @apply xl:grid-cols-4;       /* Desktop: 4 columns */
}
```

### Image Optimization

- Next.js Image component for optimization
- Responsive image sizing
- Lazy loading for performance

## Performance Considerations

### Code Splitting

- Automatic route-based code splitting via Next.js
- Component-level lazy loading where appropriate
- Dynamic imports for heavy components

### Asset Optimization

- Image optimization with Next.js Image component
- SVG icons for scalability
- Font optimization with Next.js font loading

### Caching Strategy

- Static asset caching
- API response caching where appropriate
- Browser caching headers

## Accessibility Features

### Keyboard Navigation

- Tab order management
- Focus indicators
- Keyboard shortcuts for common actions

### Screen Reader Support

- Semantic HTML structure
- ARIA labels and descriptions
- Alt text for images

### Color Contrast

- WCAG 2.1 AA compliance
- High contrast mode support
- Color-blind friendly palette

## Future Enhancements

### Planned Features

1. **Real-time Updates**: WebSocket integration for live data
2. **Progressive Web App**: Offline functionality and app-like experience
3. **Advanced Analytics**: Detailed user engagement metrics
4. **Multi-language Support**: Internationalization for diverse users
5. **Advanced Visualizations**: Interactive charts and data exploration tools

### Technical Improvements

1. **Performance Optimization**: Bundle splitting and lazy loading
2. **Testing Suite**: Unit, integration, and e2e tests
3. **CI/CD Pipeline**: Automated testing and deployment
4. **Security Enhancements**: CSP headers and security audits
5. **Monitoring**: Error tracking and performance monitoring

---

*This document serves as a comprehensive guide to the AGVN frontend architecture and should be updated as the system evolves.*
