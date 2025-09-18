const express = require('express');
const app = express();
const path = require('path');

const fs = require('fs');
// First, add CSP headers with proper directives
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'"
  );
  next();
});

// Add a general static files middleware as fallback
app.use(express.static(path.join(__dirname)));
