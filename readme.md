The implementation is done in teh node with the express js and mongodb.
Setup guide
Run below Commands to start the Project
npm install
npm start



When you run the server for the first time it will automatically create the admin user and the regular user can register.

Here are the routes

Authentication
🔹 POST /auth/signup → Register user
🔹 POST /auth/login → Get JWT
Product Management
🔹 POST /products → Add new product (Admin only)
🔹 GET /products → Get list of products
Order Management
🔹 POST /orders → Place an order
🔹 GET /orders → View all user orders
🔹 PATCH /orders/:id/status → Update order status (Admin)
🔹 DELETE /orders/:id → Cancel order (before shipment)