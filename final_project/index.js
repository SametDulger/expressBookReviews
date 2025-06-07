const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, 
  })
);

app.use("/customer/auth/*", (req, res, next) => {
  if (req.session?.authorization) {
    next();
  } else {
    res.status(401).json({ message: "Access restricted! Please sign in to continue." });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
