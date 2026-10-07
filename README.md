# Simple Order Tracking System

A lightweight web-based order tracking application. Users can track an order using **any one** of:

- Order ID
- Consumer ID
- Consumer mobile number

No OTP, login, or authentication is required for this demo.

## Sample order

- Order ID: `1234`
- Consumer ID: `1234`
- Consumer Mobile: `7854962417`

All three values return the same order.

## Run locally

Requirements: Node.js 18+

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Run in GitHub Codespaces

1. Create a new GitHub repository.
2. Upload all files from this package.
3. Open the repository in GitHub Codespaces.
4. Run:

```bash
npm install
npm start
```

5. Codespaces will expose port `3000`. Open the forwarded port.

## API

### Track order

```http
GET /api/orders/track?identifier=1234
```

The same endpoint works with the consumer ID or mobile number:

```http
GET /api/orders/track?identifier=7854962417
```

### Get all sample orders

```http
GET /api/orders
```

### Health check

```http
GET /api/health
```

## Data

Sample orders are stored in `data/orders.json` so the project is easy to understand and demo. For a production implementation, replace this with a database or an order-management API and add the appropriate security, authorization, rate limiting, audit logging, and PII controls.
