# Users & Products Management System

A React application for managing and displaying users and products data with advanced filtering, pagination, and search capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Features Breakdown](#features-breakdown)
- [Component Documentation](#component-documentation)
- [State Management](#state-management)
- [Styling](#styling)

## ✨ Features

### Users Page (`/users`)

- ✅ Display users in a data table (12 columns)
- ✅ Filter by: First Name, Last Name, Age, Email
- ✅ Client-side search across all fields
- ✅ Pagination with customizable page size (5, 10, 20, 50)
- ✅ Real-time API integration

### Products Page (`/products`)

- ✅ Display products in a data table (12 columns)
- ✅ Filter by: Title, Brand, Category
- ✅ Category tabs: ALL and Laptops
- ✅ Client-side search across all fields
- ✅ Pagination with customizable page size (5, 10, 20, 50)
- ✅ Real-time API integration

### Shared Features

- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Consistent UI/UX
- ✅ Reusable components

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Context API** - State management
- **Custom Hooks** - Reusable logic
- **Vite** - Build tool
- **CSS Variables** - Theming

## 📁 Project Structure

```
src/
├── api/
│   └── axiosClient.js          # Axios configuration for API calls
│
├── components/                  # Reusable UI components
│   ├── DataTable.jsx           # Data table component
│   ├── Filters.jsx             # Filter inputs component
│   ├── Loader.jsx              # Loading spinner
│   ├── PageSizeSelector.jsx    # Page size dropdown
│   ├── Pagination.jsx          # Pagination controls
│   ├── SearchBox.jsx           # Search input with toggle
│   └── Tabs.jsx                # Tab navigation
│
├── context/
│   └── AppContext.jsx          # Global state management
│
├── hooks/
│   └── useFetch.js             # Custom hook for data fetching
│
├── layouts/
│   └── MainLayout.jsx          # Main layout with navigation
│
├── pages/
│   ├── Users.jsx               # Users page
│   └── Products.jsx            # Products page
│
├── router/
│   └── AppRouter.jsx           # Route configuration
│
└── styles/
    ├── colors.css              # Color variables
    └── global.css              # Global styles
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task1react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📖 Usage

### Navigation

- Navigate to `/users` to view the Users page
- Navigate to `/products` to view the Products page
- Use the navigation bar at the top to switch between pages

### Filtering

#### Users Page

- **First Name Filter**: Type in the First Name field to filter users
- **Last Name Filter**: Type in the Last Name field to filter users
- **Age Filter**: Type age number to filter by exact age match
- **Email Filter**: Type in the Email field to filter users

**Note**: When you type in one filter, other filters are automatically reset (API limitation).

#### Products Page

- **Title Filter**: Type product title to filter
- **Brand Filter**: Type brand name to filter
- **Category Filter**: Type category name to filter
- **Tabs**: Click "ALL" to show all products, "Laptops" to show only laptops

**Note**: When you type in one filter, other filters are automatically reset (API limitation).

### Search

- Click the search icon to reveal the search input
- Type any value to search across all fields in the current data
- Search works on the client-side (filters already loaded data)

### Pagination

- Use Previous/Next buttons to navigate pages
- Click page numbers to jump to specific pages
- Change page size using the "Page Size" dropdown (5, 10, 20, 50)
- Pagination automatically updates based on filtered results

## 🔌 API Integration

### API Endpoint

The application uses [DummyJSON API](https://dummyjson.com/):

- **Base URL**: `https://dummyjson.com`
- **Users Endpoint**: `/users` or `/users/search`
- **Products Endpoint**: `/products`, `/products/search`, or `/products/category/{category}`

### API Parameters

#### Users

- `limit`: Number of items per page
- `skip`: Number of items to skip (for pagination)
- `q`: Search query (when using search endpoint)

#### Products

- `limit`: Number of items per page
- `skip`: Number of items to skip (for pagination)
- `q`: Search query (when using search endpoint)
- `category`: Category filter (when filtering by category)

### API Client Configuration

The API client is configured in `src/api/axiosClient.js`:

```javascript
const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});
```

## 🎯 Features Breakdown

### 1. Data Table

- Displays data in a structured table format
- 12 columns for both Users and Products
- Responsive design with hover effects
- Handles different data types (strings, numbers, arrays, objects)

### 2. Filters

- **API Filters**: Send requests to API (Users: firstName, lastName, age, email | Products: title, brand, category)
- **Client-side Search**: Filters loaded data without API calls
- **Auto-reset**: Setting one filter resets others (per API requirements)

### 3. Pagination

- Server-side pagination (API-based)
- Dynamic page number calculation
- Previous/Next navigation
- Ellipsis for large page ranges
- Active page highlighting

### 4. Page Size Selector

- Dropdown with options: 5, 10, 20, 50
- Default: 5 items per page
- Automatically resets to page 1 when changed
- Updates pagination accordingly

### 5. Search Box

- Toggle visibility on icon click
- Client-side filtering
- Searches across all fields in loaded data
- Case-insensitive search

### 6. Tabs (Products Only)

- "ALL" tab: Shows all products
- "Laptops" tab: Filters products by category "laptops"
- Active tab highlighting
- Smooth transitions

## 🧩 Component Documentation

### DataTable

**Purpose**: Display data in table format

**Props**:

- `columns` (Array): Column configuration `[{ key: 'id', label: 'ID' }, ...]`
- `data` (Array): Data to display

**Usage**:

```jsx
<DataTable columns={columns} data={users} />
```

### Filters

**Purpose**: Render filter input fields

**Props**:

- `filterFields` (Array): Filter configuration `[{ key: 'firstName', label: 'First Name' }, ...]`

**Usage**:

```jsx
<Filters
  filterFields={[
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
  ]}
/>
```

### Pagination

**Purpose**: Display pagination controls

**Props**: None (uses Context API)

**Features**:

- Previous/Next buttons
- Page number buttons
- Ellipsis for large ranges
- Disabled states

### PageSizeSelector

**Purpose**: Select items per page

**Props**: None (uses Context API)

**Options**: 5, 10, 20, 50

### SearchBox

**Purpose**: Toggle search input

**Props**: None (uses Context API)

**Behavior**: Client-side filtering

### Tabs

**Purpose**: Tab navigation

**Props**:

- `tabs` (Array): Tab labels `['ALL', 'Laptops']`

**Usage**:

```jsx
<Tabs tabs={["ALL", "Laptops"]} />
```

## 🗄️ State Management

### Context API Structure

The application uses React Context API for global state management:

```javascript
{
  data: [],              // Fetched data
  loading: false,        // Loading state
  error: null,           // Error message
  currentPage: 1,        // Current page number
  pageSize: 5,           // Items per page
  total: 0,              // Total items count
  totalPages: 0,         // Total pages count
  searchQuery: "",       // Client-side search query
  apiFilters: {},       // API filter parameters
  activeTab: "ALL"       // Active tab (for products)
}
```

### Available Actions

- `setLoading(boolean)`: Set loading state
- `setData(object)`: Update data and pagination info
- `setError(string)`: Set error message
- `setPage(number)`: Change current page
- `setPageSize(number)`: Change page size
- `setSearch(string)`: Update search query
- `setApiFilter(key, value)`: Set API filter (resets others)
- `resetApiFilters()`: Clear all API filters
- `setActiveTab(string)`: Set active tab

### Usage in Components

```jsx
import { useAppContext } from "../context/AppContext";

function MyComponent() {
  const { state, actions } = useAppContext();

  // Access state
  const currentPage = state.currentPage;

  // Update state
  actions.setPage(2);
}
```

## 🎨 Styling

### Color Scheme

The application uses a custom color palette defined in `src/styles/colors.css`:

```css
--color-black: #322625
--color-grey: #ebebeb
--color-blue: #c0e3e5
--color-yellow: #fdc936
```

### Typography

- **Font Family**: Neutra Text
- **Font Weights**: 400, 500, 600, 700

### Styling Approach

- **Inline Styles**: Components use inline styles for flexibility
- **CSS Variables**: Colors defined as CSS variables for consistency
- **Global Styles**: Base styles and resets in `global.css`

### Customization

To change colors, edit `src/styles/colors.css`:

```css
:root {
  --color-black: #your-color;
  --color-grey: #your-color;
  --color-blue: #your-color;
  --color-yellow: #your-color;
}
```

## 🔧 Custom Hooks

### useFetch

**Purpose**: Fetch data from API with automatic state management

**Parameters**:

- `endpoint` (string): API endpoint (e.g., '/users', '/products')
- `options` (object): Optional configuration

**Returns**:

```javascript
{
  data: [],        // Filtered data (includes client-side search)
  loading: boolean,
  error: string,
  total: number,
  totalPages: number,
  currentPage: number,
  pageSize: number
}
```

**Usage**:

```jsx
const { data, loading, error, total } = useFetch("/users");
```

**Features**:

- Automatic API calls on state changes
- Handles pagination
- Handles filters
- Client-side search filtering
- Loading and error states

## 📝 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Structure

- **Components**: Functional components with hooks
- **State**: Context API for global state, useState for local state
- **Styling**: Inline styles with CSS variables
- **API**: Axios with interceptors
- **Routing**: React Router DOM

## 🐛 Known Limitations

1. **API Filtering**: DummyJSON API doesn't support multiple filters simultaneously. When one filter is set, others are reset.

2. **Numeric Filters**: Age filtering requires fetching more data and filtering client-side for accuracy.

3. **Search**: Client-side search only works on already loaded data, not the entire dataset.

## 📚 Learning Resources

For detailed React concepts and comparisons with Laravel Livewire, see:

- `REACT_LEARNING_GUIDE.md` - Comprehensive learning guide
- `QUICK_REFERENCE.md` - Quick reference cheat sheet

## 🤝 Contributing

This is a learning project. Feel free to:

- Add new features
- Improve existing components
- Optimize performance
- Enhance UI/UX

## 🎉 Features Summary

✅ Two pages (Users & Products)  
✅ Reusable components  
✅ API integration with DummyJSON  
✅ Context API for state management  
✅ Pagination with customizable page size  
✅ Client-side search  
✅ API filters  
✅ Category tabs (Products)  
✅ Responsive design  
✅ Loading states  
✅ Error handling  
✅ Custom color scheme  
✅ Neutra Text font family
