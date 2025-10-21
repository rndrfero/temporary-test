# Transport Management System

Frontend for managing transport orders and waypoints.

## Tech Stack

- **Vue 3** with TypeScript and Composition API
- **Nuxt 4** for framework and routing
- **Vuetify** for UI components
- **Pinia** for state management
- **json-server** for mock API

## Setup

Install dependencies:

```bash
npm install
```

## Running the App

Start both frontend and mock API:

```bash
npm run dev:all
```

Or run separately:

```bash
# Frontend only (http://localhost:3000)
npm run dev

# Mock API only (http://localhost:3001)
npm run json-server
```

## Features

### Core Features

- Create transport orders with order number, customer name, and date
- Add multiple waypoints per order (address + type)
- List all orders with waypoint count
- Filter orders by date and customer name

### Bonus Features

- Update and delete orders
- Pagination for order listing
- Client-side form validation

## Mock API

Using **json-server** with `db.json`.

API endpoint is hardcoded as `API_BASE_URL` in `app/services/orderApi.ts` (defaults to `http://localhost:3001`).

### API Endpoints

```
GET    /orders                 # List all orders (paginated server-side)
GET    /orders/:id             # Get single order
POST   /orders                 # Create order
PUT    /orders/:id             # Update order
DELETE /orders/:id             # Delete order
```

**Note**: Waypoints are nested within orders. Orders support server-side pagination and sorting via `_page`, `_limit`, and `_sort` query parameters.

### Sample Data

The `db.json` file includes sample orders.

Each order has pickup and delivery waypoints with addresses.

Mock data is stored in `db.json`. Use `db.json.example` as a template and add `db.json` to `.gitignore`.

## Architecture Decisions

### Clean Architecture

- **Services layer**: API communication (`orderApi.ts`)
- **Stores**: State management with Pinia
  - `orderCollectionStore`: Manages order list and filtering
  - `orderRecordStore`: Manages single order CRUD
- **Composables**: Reusable logic
  - `useAsyncState`: Async operation state handling
  - `useValidationRules`: Form validation rules
- **Components**: Presentational and form components
  - `OrderForm`: Order creation/editing
  - `WaypointForm`: Waypoint input
  - `WaypointsTable`: Waypoint display

### Design Choices

- Embedded waypoints in order POST (single transaction)
- Optimistic UI updates for better UX
- Client-side filtering for performance
- Vuetify for rapid, consistent UI development

### Data Model

**Order**:

```typescript
{
  id: number
  number: string        // unique order number
  customerName: string
  date: string         // ISO format
  waypoints: Waypoint[]
}
```

**Waypoint**:

```typescript
{
  id: number;
  orderId: number;
  address: string;
  type: "Pickup" | "Delivery";
}
```

## Project Structure

```
app/
├── components/       # Vue components
├── composables/      # Reusable composition functions
├── pages/           # Nuxt pages/routes
├── services/        # API service layer
├── stores/          # Pinia stores
└── types/           # TypeScript types
```

## Assumptions

- Order numbers are unique but not auto-generated
- Orders can have zero waypoints
- Single-user application (no concurrent editing)

## Features Not Implemented

- Unique order number validation against the API (assumes backend handles validation and returns error on duplicate)

## Production Build

Build the app:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```
