# System Architecture

## Overview

This project implements an e-commerce platform using a Microservices Architecture built with NestJS.

The system consists of independent services responsible for authentication, users, products, orders, and notifications.

Communication between services is performed through REST APIs and RabbitMQ events.

---

# Microservices Architecture

```text
                     Client
                        │
                        ▼
                  API Gateway
                        │
 ┌──────────────┬──────────────┬──────────────┬──────────────┐
 ▼              ▼              ▼              ▼              ▼

Auth        User        Product       Order      Notification
Service     Service     Service       Service      Service

 ▼            ▼            ▼             ▼
Auth DB    User DB    Product DB    Order DB
```

## Components

### API Gateway

Responsibilities:

* Single entry point for clients
* Request routing
* JWT authentication
* Role authorization
* Aggregating service responses

Port:

```text
3000
```

---

### Auth Service

Responsibilities:

* User registration
* User login
* Password hashing
* JWT generation
* Role management

Port:

```text
3001
```

Database:

```text
auth-db
```

---

### User Service

Responsibilities:

* User profile management
* User CRUD operations

Port:

```text
3002
```

Database:

```text
user-db
```

---

### Product Service

Responsibilities:

* Product management
* Product CRUD operations
* Search and pagination

Port:

```text
3003
```

Database:

```text
product-db
```

---

### Order Service

Responsibilities:

* Order creation
* Order history
* Order management

Port:

```text
3004
```

Database:

```text
order-db
```

---

### Notification Service

Responsibilities:

* Processing asynchronous notifications
* Consuming RabbitMQ events

Port:

```text
3005
```

---

# Database per Service Pattern

Each microservice owns its own database.

Benefits:

* Loose coupling
* Independent scaling
* Independent deployment
* Service autonomy

```text
Auth Service    → Auth Database
User Service    → User Database
Product Service → Product Database
Order Service   → Order Database
```

---

# Event-Driven Communication

RabbitMQ is used for asynchronous communication.

## User Registration Flow

```text
Client
  │
  ▼
Gateway
  │
  ▼
Auth Service
  │
  └── user_registered
           │
           ▼
      User Service
           │
           └── user_created
                    │
                    ▼
             Auth Service
```

Description:

1. User submits registration request.
2. Auth Service creates authentication record.
3. Auth Service publishes user_registered event.
4. User Service creates user profile.
5. User Service publishes user_created event.
6. Auth Service stores generated userId.

---

## Order Creation Flow

```text
Client
  │
  ▼
Gateway
  │
  ▼
Order Service
  │
  └── order_created
           │
           ▼
 Notification Service
```

Description:

1. User creates an order.
2. Order Service stores the order.
3. Order Service publishes order_created event.
4. Notification Service consumes the event.

---

# Security Architecture

Authentication:

* JWT tokens
* Passport JWT Strategy

Authorization:

* Role-based access control
* ADMIN role
* USER role

Protected routes use:

```text
JwtAuthGuard
RolesGuard
```

---

# API Documentation

Swagger is available through:

```text
http://localhost:3000/docs
```

---

# Performance Testing

Performance tests were implemented using k6.

Tested scenarios:

* User login
* Product listing
* Order creation
* Mixed workload

The same benchmark suite is executed against both the Monolithic and Microservices implementations for comparison.
