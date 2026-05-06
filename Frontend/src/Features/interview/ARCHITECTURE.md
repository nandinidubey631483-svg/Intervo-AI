# Interview Feature - 4-Layer Architecture

## Overview
The Interview feature follows a 4-layer architecture pattern that separates concerns and promotes maintainability, testability, and scalability.

## Architecture Layers

### 1. **API/Services Layer**
**Location:** `services/interview.api.js`

- Handles all HTTP requests and API communication
- Directly interacts with the backend
- Exports functions like:
  - `getInterviewReport(id)` - Fetches interview report data
  - `downloadResume(id)` - Fetches resume PDF

**Responsibility:** Raw data fetching from remote sources

---

### 2. **Custom Hooks/Business Logic Layer**
**Location:** `hooks/useInterview.js`

- Contains reusable business logic and state management
- Wraps API calls and adds application logic
- Exports custom hook `useInterview()` with:
  - `report` - Current report state
  - `loading` - Loading state
  - `getReportById(id)` - Fetch and set report
  - `getResumePdf(id)` - Handle resume download

**Responsibility:** Business logic, state management, and side effects

---

### 3. **Context/Global State Layer**
**Location:** `InterviewContext.context.jsx`

- Manages global state that needs to be shared across components
- Provides context consumers for deeply nested components
- Stores data that doesn't need to be prop-drilled

**Responsibility:** Global state management and context provision

---

### 4. **Components/Presentation Layer**
**Location:** `components/`

Individual component files:
- `Sidebar.jsx` - Navigation sidebar component
- `ContentArea.jsx` - Main content display component
- `QuestionCard.jsx` - Individual question card component
- `RightSidebar.jsx` - Score and skills sidebar
- `RoadmapSection.jsx` - Preparation roadmap display
- `LoadingState.jsx` - Loading UI component

**Responsibility:** UI rendering, user interaction handling, props presentation

---

## Data Flow

```
User Action (Click, Navigate)
        ↓
Page Component (Interview.jsx)
        ↓
Custom Hook (useInterview)
        ↓
API Service (interview.api.js)
        ↓
Backend API
        ↓
[Response flows back up]
        ↓
Context/Hook State Update
        ↓
Component Layer Re-render
        ↓
UI Update
```

## File Structure

```
interview/
├── pages/
│   └── Interview.jsx          # Main page component
├── components/
│   ├── index.js              # Component exports
│   ├── Sidebar.jsx           # Left navigation sidebar
│   ├── ContentArea.jsx       # Main content area
│   ├── QuestionCard.jsx      # Question card component
│   ├── RightSidebar.jsx      # Right sidebar with score
│   ├── RoadmapSection.jsx    # Roadmap display
│   └── LoadingState.jsx      # Loading state UI
├── hooks/
│   └── useInterview.js       # Custom hook for business logic
├── services/
│   └── interview.api.js      # API communication
├── InterviewContext.context.jsx  # Global state context
└── styles/
    └── interview.scss        # Component styles
```

## Benefits

✅ **Separation of Concerns** - Each layer has a single responsibility  
✅ **Reusability** - Components and hooks can be reused across features  
✅ **Testability** - Each layer can be tested independently  
✅ **Maintainability** - Easy to locate and modify specific functionality  
✅ **Scalability** - Simple to extend with new features  
✅ **Performance** - Optimized data fetching and rendering  

## Adding New Features

When adding new features to the Interview section:

1. **Data fetching needed?** → Add function to `services/interview.api.js`
2. **Business logic?** → Add to `hooks/useInterview.js`
3. **Global state?** → Update `InterviewContext.context.jsx`
4. **UI component?** → Create new file in `components/`
5. **Display in page?** → Update `Interview.jsx` with the component

## Styling

All component styles are organized in `styles/interview.scss` using BEM methodology:
- Block: `.component-name`
- Element: `.component-name__element`
- Modifier: `.component-name--modifier`

Example:
```scss
.question-card {
  &__header { }
  &__body { }
  &__index { }
  &--open { }
}
```
