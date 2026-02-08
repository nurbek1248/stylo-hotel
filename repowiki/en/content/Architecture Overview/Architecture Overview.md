# Architecture Overview

<cite>
**Referenced Files in This Document**
- [main.tsx](file://src/main.tsx)
- [App.tsx](file://src/App.tsx)
- [theme.tsx](file://src/lib/theme.tsx)
- [i18n.tsx](file://src/lib/i18n.tsx)
- [utils.ts](file://src/lib/utils.ts)
- [Navbar.tsx](file://src/components/Navbar.tsx)
- [Index.tsx](file://src/pages/Index.tsx)
- [use-toast.ts](file://src/hooks/use-toast.ts)
- [use-mobile.tsx](file://src/hooks/use-mobile.tsx)
- [button.tsx](file://src/components/ui/button.tsx)
- [toaster.tsx](file://src/components/ui/toaster.tsx)
- [sonner.tsx](file://src/components/ui/sonner.tsx)
- [package.json](file://package.json)
- [tsconfig.json](file://tsconfig.json)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)

## Introduction
This document describes the architecture of the Stylo Residence Luxe application. It focuses on the high-level design patterns, including the Provider Pattern for global state management, component composition strategy, and routing architecture. It documents the application entry point, provider hierarchy (ThemeProvider, I18nProvider, QueryClientProvider), and component organization. It also explains the separation of concerns between pages, components, hooks, and utilities, along with system boundaries, data flow patterns, and integration points. Finally, it covers React 18 concurrent features, TypeScript type safety enforcement, and performance considerations, and provides architectural diagrams.

## Project Structure
The project follows a feature-based and layer-based organization:
- Entry point initializes the React root and renders the root App component.
- App composes providers for theming, internationalization, routing, and UI toast systems.
- Pages define route handlers and compose domain components.
- Components are grouped under a UI library and feature-specific components.
- Hooks encapsulate reusable logic such as toasts and responsive detection.
- Utilities centralize shared helpers like class merging.

```mermaid
graph TB
subgraph "Entry Point"
MAIN["src/main.tsx"]
end
subgraph "Application Root"
APP["src/App.tsx"]
end
subgraph "Providers"
THEME["src/lib/theme.tsx"]
I18N["src/lib/i18n.tsx"]
ROUTER["React Router DOM"]
QUERY["TanStack React Query"]
TOOLTIP["UI TooltipProvider"]
end
subgraph "Pages"
INDEX["src/pages/Index.tsx"]
end
subgraph "Components"
NAVBAR["src/components/Navbar.tsx"]
end
subgraph "Hooks"
USETOAST["src/hooks/use-toast.ts"]
USEMOBILE["src/hooks/use-mobile.tsx"]
end
subgraph "UI Library"
BUTTON["src/components/ui/button.tsx"]
TOASTER["src/components/ui/toaster.tsx"]
SONNER["src/components/ui/sonner.tsx"]
end
MAIN --> APP
APP --> THEME
APP --> I18N
APP --> ROUTER
APP --> QUERY
APP --> TOOLTIP
APP --> INDEX
INDEX --> NAVBAR
NAVBAR --> I18N
NAVBAR --> THEME
TOASTER --> USETOAST
SONNER --> THEME
```

**Diagram sources**
- [main.tsx](file://src/main.tsx#L1-L6)
- [App.tsx](file://src/App.tsx#L1-L45)
- [theme.tsx](file://src/lib/theme.tsx#L1-L36)
- [i18n.tsx](file://src/lib/i18n.tsx#L1-L173)
- [Index.tsx](file://src/pages/Index.tsx#L1-L28)
- [Navbar.tsx](file://src/components/Navbar.tsx#L1-L133)
- [use-toast.ts](file://src/hooks/use-toast.ts#L1-L187)
- [button.tsx](file://src/components/ui/button.tsx#L1-L48)
- [toaster.tsx](file://src/components/ui/toaster.tsx#L1-L25)
- [sonner.tsx](file://src/components/ui/sonner.tsx#L1-L28)

**Section sources**
- [main.tsx](file://src/main.tsx#L1-L6)
- [App.tsx](file://src/App.tsx#L1-L45)
- [tsconfig.json](file://tsconfig.json#L1-L17)

## Core Components
- Application entry point initializes the React 18 root and mounts the App component.
- App composes providers in a strict order to ensure global state availability:
  - TanStack QueryClientProvider for caching and data fetching.
  - ThemeProvider for light/dark mode and persisted preferences.
  - I18nProvider for multi-language support and persisted language selection.
  - TooltipProvider for UI tooltips.
  - React Router DOM for page routing.
  - UI toast systems (Toaster and Sonner) for notifications.
- Pages are thin route handlers that render feature components.
- Components consume providers via custom hooks (useTheme, useI18n).
- Hooks encapsulate cross-cutting concerns like toasts and responsive checks.

**Section sources**
- [main.tsx](file://src/main.tsx#L1-L6)
- [App.tsx](file://src/App.tsx#L1-L45)
- [theme.tsx](file://src/lib/theme.tsx#L1-L36)
- [i18n.tsx](file://src/lib/i18n.tsx#L1-L173)
- [Index.tsx](file://src/pages/Index.tsx#L1-L28)
- [Navbar.tsx](file://src/components/Navbar.tsx#L1-L133)
- [use-toast.ts](file://src/hooks/use-toast.ts#L1-L187)
- [use-mobile.tsx](file://src/hooks/use-mobile.tsx#L1-L20)

## Architecture Overview
The application employs a layered Provider Pattern to manage global concerns:
- Global state: Theme and language selections are stored in React Context and persisted in localStorage.
- Routing: React Router DOM defines routes and navigates between pages.
- Data fetching: TanStack Query manages server state and caching.
- UI notifications: Two toast systems coexist (Radix-based Toaster and Sonner), both integrated via hooks and providers.
- Component composition: Pages assemble feature components; components use UI primitives and custom hooks.

```mermaid
graph TB
subgraph "Global Providers"
THEME["ThemeProvider<br/>ThemeContext"]
I18N["I18nProvider<br/>I18nContext"]
QUERY["QueryClientProvider<br/>QueryClient"]
TOOLTIP["TooltipProvider"]
end
subgraph "Routing Layer"
ROUTER["BrowserRouter/Routes"]
ROUTES["Routes: '/', '/rooms', '/amenities', '/gallery', '/offers', '/about', '/contact', '/*'"]
end
subgraph "Pages"
PAGES["Index, Rooms, AmenitiesPage, GalleryPage, OffersPage, About, Contact, NotFound"]
end
subgraph "Feature Components"
NAV["Navbar"]
OTHERS["Hero, TrustStrip, FeaturedRooms, AmenitiesSection,<br/>GalleryTeaser, OffersSection, Testimonials, LocationSection, Footer"]
end
subgraph "UI & Notifications"
RADIX_TOASTER["Toaster (Radix)"]
SONNER_TOASTER["Sonner Toaster"]
end
THEME --> I18N
I18N --> ROUTER
ROUTER --> PAGES
PAGES --> NAV
PAGES --> OTHERS
THEME -.-> NAV
I18N -.-> NAV
RADIX_TOASTER -.-> PAGES
SONNER_TOASTER -.-> PAGES
```

**Diagram sources**
- [App.tsx](file://src/App.tsx#L1-L45)
- [theme.tsx](file://src/lib/theme.tsx#L1-L36)
- [i18n.tsx](file://src/lib/i18n.tsx#L1-L173)
- [Index.tsx](file://src/pages/Index.tsx#L1-L28)
- [Navbar.tsx](file://src/components/Navbar.tsx#L1-L133)
- [toaster.tsx](file://src/components/ui/toaster.tsx#L1-L25)
- [sonner.tsx](file://src/components/ui/sonner.tsx#L1-L28)

## Detailed Component Analysis

### Provider Pattern and Global State Management
- ThemeProvider
  - Manages theme state (light/dark) with persistence in localStorage and prefers system preference initially.
  - Exposes a toggle function and a hook to consume the context.
- I18nProvider
  - Manages language state with persistence and provides a translation function keyed by string identifiers.
  - Exposes a hook to consume the context and change language.
- QueryClientProvider
  - Wraps the app to enable React Query’s caching and data fetching capabilities.
- TooltipProvider
  - Enables tooltip behavior across UI components.

```mermaid
classDiagram
class ThemeProvider {
+theme : "light" | "dark"
+toggleTheme() : void
}
class ThemeContext {
+theme : "light" | "dark"
+toggleTheme() : void
}
class I18nProvider {
+lang : "en" | "ru" | "uz"
+setLang(l) : void
+t(key) : string
}
class I18nContext {
+lang : "en" | "ru" | "uz"
+setLang(l) : void
+t(key) : string
}
ThemeProvider --> ThemeContext : "provides"
I18nProvider --> I18nContext : "provides"
```

**Diagram sources**
- [theme.tsx](file://src/lib/theme.tsx#L1-L36)
- [i18n.tsx](file://src/lib/i18n.tsx#L1-L173)

**Section sources**
- [theme.tsx](file://src/lib/theme.tsx#L1-L36)
- [i18n.tsx](file://src/lib/i18n.tsx#L1-L173)

### Routing Architecture
- BrowserRouter and Routes define the application routes.
- Each route maps to a page component.
- A catch-all route handles 404 scenarios.

```mermaid
sequenceDiagram
participant Browser as "Browser"
participant Router as "BrowserRouter"
participant Routes as "Routes"
participant Page as "Page Component"
Browser->>Router : Navigate to "/rooms"
Router->>Routes : Match path "/rooms"
Routes-->>Page : Render Rooms
Browser->>Router : Navigate to "/unknown"
Router->>Routes : No match
Routes-->>Page : Render NotFound
```

**Diagram sources**
- [App.tsx](file://src/App.tsx#L26-L36)

**Section sources**
- [App.tsx](file://src/App.tsx#L1-L45)

### Component Composition Strategy
- Pages are composed of feature components.
- Navbar demonstrates composition by consuming useTheme and useI18n hooks and rendering localized links.
- UI library components expose variants and sizes for consistent styling.

```mermaid
graph LR
PAGE["Index Page"] --> NAV["Navbar"]
PAGE --> HERO["Hero"]
PAGE --> TRUST["TrustStrip"]
PAGE --> FEATURED["FeaturedRooms"]
PAGE --> AMEN["AmenitiesSection"]
PAGE --> GALLERY["GalleryTeaser"]
PAGE --> OFFERS["OffersSection"]
PAGE --> TESTIM["Testimonials"]
PAGE --> LOC["LocationSection"]
PAGE --> FOOTER["Footer"]
NAV --> THEME_HOOK["useTheme()"]
NAV --> I18N_HOOK["useI18n()"]
```

**Diagram sources**
- [Index.tsx](file://src/pages/Index.tsx#L1-L28)
- [Navbar.tsx](file://src/components/Navbar.tsx#L1-L133)
- [theme.tsx](file://src/lib/theme.tsx#L33-L35)
- [i18n.tsx](file://src/lib/i18n.tsx#L170-L172)

**Section sources**
- [Index.tsx](file://src/pages/Index.tsx#L1-L28)
- [Navbar.tsx](file://src/components/Navbar.tsx#L1-L133)

### Notification Systems and Data Flow
- Toaster (Radix-based) and Sonner are integrated at the root level.
- use-toast implements a toast store with actions and a reducer.
- Components trigger toasts via exported toast functions.

```mermaid
sequenceDiagram
participant Page as "Page Component"
participant Hook as "use-toast"
participant Store as "Toast Store"
participant Radix as "Toaster (Radix)"
participant Sonner as "Sonner"
Page->>Hook : toast({ title, description })
Hook->>Store : ADD_TOAST
Store-->>Radix : toasts updated
Store-->>Sonner : toasts updated
Radix-->>Page : render toast
Sonner-->>Page : render toast
```

**Diagram sources**
- [use-toast.ts](file://src/hooks/use-toast.ts#L1-L187)
- [toaster.tsx](file://src/components/ui/toaster.tsx#L1-L25)
- [sonner.tsx](file://src/components/ui/sonner.tsx#L1-L28)

**Section sources**
- [use-toast.ts](file://src/hooks/use-toast.ts#L1-L187)
- [toaster.tsx](file://src/components/ui/toaster.tsx#L1-L25)
- [sonner.tsx](file://src/components/ui/sonner.tsx#L1-L28)

### Utility Functions and Design System
- cn utility merges Tailwind classes safely using clsx and tailwind-merge.
- UI components use class variance authority for consistent variants and sizes.

```mermaid
flowchart TD
Start(["Call cn(...)"]) --> MergeClsx["Merge class names with clsx"]
MergeClsx --> TailwindMerge["Normalize with tailwind-merge"]
TailwindMerge --> Return(["Return final class string"])
```

**Diagram sources**
- [utils.ts](file://src/lib/utils.ts#L1-L7)
- [button.tsx](file://src/components/ui/button.tsx#L1-L48)

**Section sources**
- [utils.ts](file://src/lib/utils.ts#L1-L7)
- [button.tsx](file://src/components/ui/button.tsx#L1-L48)

## Dependency Analysis
External dependencies relevant to architecture:
- React 18 and React DOM for concurrent features and rendering.
- React Router DOM for declarative routing.
- TanStack React Query for caching and data fetching.
- next-themes and Sonner for theme-aware notifications.
- Radix UI components for accessible UI primitives.
- Tailwind CSS ecosystem for styling utilities.

```mermaid
graph TB
REACT["react@^18.3.1"]
REACTDOM["react-dom@^18.3.1"]
ROUTER["react-router-dom@^6.30.1"]
QUERY["@tanstack/react-query@^5.83.0"]
NEXTTHEMES["next-themes@^0.3.0"]
SONNER["sonner@^1.7.4"]
RADIX["@radix-ui/*"]
TWCSS["Tailwind CSS ecosystem"]
REACT --> REACTDOM
REACT --> ROUTER
REACT --> QUERY
REACT --> RADIX
NEXTTHEMES --> SONNER
REACT --> NEXTTHEMES
TWCSS --> RADIX
```

**Diagram sources**
- [package.json](file://package.json#L15-L64)

**Section sources**
- [package.json](file://package.json#L1-L90)

## Performance Considerations
- Provider ordering ensures efficient propagation of theme and language contexts to all components.
- React 18 concurrent features can be leveraged via the root renderer and future enhancements (e.g., automatic batching, transitions).
- TanStack Query caching reduces network requests and improves perceived performance.
- Utility functions like cn minimize class conflicts and reduce reflows.
- Responsive hook useIsMobile enables adaptive rendering for mobile devices.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
- Theme not persisting: Verify localStorage keys and effect toggling in ThemeProvider.
- Language not switching: Confirm I18nProvider lang state and translation key existence.
- Toasts not appearing: Ensure Toaster and Sonner are rendered at root and use-toast is properly imported.
- Navigation issues: Validate route paths and catch-all behavior in Routes.

**Section sources**
- [theme.tsx](file://src/lib/theme.tsx#L13-L22)
- [i18n.tsx](file://src/lib/i18n.tsx#L149-L161)
- [toaster.tsx](file://src/components/ui/toaster.tsx#L4-L24)
- [sonner.tsx](file://src/components/ui/sonner.tsx#L6-L25)
- [App.tsx](file://src/App.tsx#L26-L36)

## Conclusion
The Stylo Residence Luxe application adopts a clean Provider Pattern to centralize global concerns (theme, language, routing, data fetching, and notifications). Pages are thin compositions of feature components, promoting separation of concerns and maintainability. The architecture leverages React 18, TypeScript, and a robust UI system to deliver a scalable and accessible frontend. Future enhancements can utilize React 18 concurrent features and expand the provider stack for advanced caching and analytics integrations.