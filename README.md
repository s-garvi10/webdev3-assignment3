# Inventory and Data Management System

A RESTful backend service built with **Node.js**, **Express.js**, and **MongoDB** (via **Mongoose**) for managing product catalogs, tracking stock levels, handling inventory changes safely, and running analytics reports through aggregation pipelines.

---

## 🛠️ Technology Stack

- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework for routing and middleware
- **MongoDB** - NoSQL database for flexible document storage
- **Mongoose** - Object Data Modeling (ODM) with schema validation
- **dotenv** - Environment variable management

---

##  Project Structure

```text
inventory-management-system/
│
├── config/
│   └── db.js                
├── controller/
│   └── productController.js  
├── middleware/
│   ├── errorHandler.js       
│   └── validate.js           
├── model/
│   └── Product.js            
├── routes/
│   └── productRoutes.js      
├── .env                      
├── package.json              
└── index.js                 
```

---

