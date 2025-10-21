# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

The structure follows json-server conventions, so when you query an order with \_embed=waypoints, it will automatically include the related waypoints. You can also query waypoints directly at /waypoints or filter by order like /waypoints?orderId=2.

```
GET    /orders                    # List all orders
GET    /orders/:orderId           # Get single order (with embedded waypoints)
POST   /orders                    # Create order (optionally with waypoints)
PUT    /orders/:orderId           # Update order
PATCH  /orders/:orderId           # Partial update order
DELETE /orders/:orderId           # Delete order (cascade delete waypoints)

GET    /orders/:orderId/waypoints              # List waypoints for an order
GET    /orders/:orderId/waypoints/:waypointId  # Get single waypoint
POST   /orders/:orderId/waypoints              # Create waypoint for order
PUT    /orders/:orderId/waypoints/:waypointId  # Update waypoint
PATCH  /orders/:orderId/waypoints/:waypointId  # Partial update waypoint
DELETE /orders/:orderId/waypoints/:waypointId  # Delete waypoint
```
