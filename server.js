const express = require('express');
const path = require('path');
const orders = require('./data/orders.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function normalize(value) {
  return String(value ?? '').trim().toLowerCase();
}

function findOrders(identifier) {
  const value = normalize(identifier);
  if (!value) return [];

  return orders.filter(order =>
    normalize(order.orderId) === value ||
    normalize(order.consumerId) === value ||
    normalize(order.consumerMobile) === value
  );
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/api/orders/track', (req, res) => {
  const identifier = req.query.identifier;
  if (!identifier) {
    return res.status(400).json({ success: false, message: 'Please provide Order ID, Consumer ID, or Consumer Mobile number.' });
  }

  const matches = findOrders(identifier);
  if (!matches.length) {
    return res.status(404).json({ success: false, message: 'No order found for the supplied information.' });
  }

  res.json({ success: true, count: matches.length, orders: matches });
});

app.get('/api/orders', (req, res) => {
  res.json({ count: orders.length, orders });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Order Tracking System running on http://localhost:${PORT}`);
});
