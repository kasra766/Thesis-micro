# Thesis Microservices Architecture

A NestJS-based microservices e-commerce system developed as part of a thesis project to compare Monolithic and Microservices architectures.

## Architecture Overview

The system is composed of the following services:

* API Gateway
* Auth Service
* User Service
* Product Service
* Order Service
* Notification Service

Each service owns its own database and communicates through REST APIs and RabbitMQ events.

## Architecture Diagram

```text
Client
   │
   ▼
API Gateway
   │
   ├── Auth Service ─────── Auth Database
   ├── User Service ─────── User Database
   ├── Product Service ──── Product Database
   ├── Order Service ────── Order Database
   └── Notification Service

RabbitMQ Events
   ├── user_registered
   ├── user_created
   └── order_created
```

## Technology Stack

* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* RabbitMQ
* JWT Authentication
* Docker & Docker Compose
* Swagger
* k6

## Services

### API Gateway

Responsible for:

* Routing requests
* Authentication
* Authorization
* Aggregating service responses

### Auth Service

Responsible for:

* User authentication
* Password hashing
* JWT generation
* Role management

### User Service

Responsible for:

* User profile management
* User CRUD operations

### Product Service

Responsible for:

* Product management
* Product CRUD operations
* Pagination and search

### Order Service

Responsible for:

* Order creation
* Order management
* Order history

### Notification Service

Responsible for:

* Consuming RabbitMQ events
* Processing asynchronous notifications

## Event-Driven Communication

### User Registration Flow

```text
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

### Order Creation Flow

```text
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

## Installation

Clone repository:

```bash
git clone <repository-url>
cd Thesis-micro
```

Start infrastructure:

```bash
docker compose up -d
```

## Database Migration

Auth Service:

```bash
docker exec -it auth-service npx prisma migrate deploy
```

User Service:

```bash
docker exec -it user-service npx prisma migrate deploy
```

Product Service:

```bash
docker exec -it product-service npx prisma migrate deploy
```

Order Service:

```bash
docker exec -it order-service npx prisma migrate deploy
```

## Database Seeding

Auth Service:

```bash
docker exec -it auth-service npx prisma db seed
```

User Service:

```bash
docker exec -it user-service npx prisma db seed
```

Product Service:

```bash
docker exec -it product-service npx prisma db seed
```

Order Service:

```bash
docker exec -it order-service npx prisma db seed
```

## Default Administrator

```text
Email: admin@thesis.com
Password: 123456
```

## API Documentation

Swagger UI:

```text
http://localhost:3000/docs
```

## RabbitMQ

Management UI:

```text
http://localhost:15672
```

Default credentials:

```text
Username: guest
Password: guest
```

## Performance Testing

k6 scripts are located in:

```text
k6/
```

Examples:

```bash
k6 run k6/auth-login.js
k6 run k6/products-list.js
k6 run k6/orders-create.js
k6 run k6/mixed-workload.js
```

## Project Goals

* Compare Monolithic and Microservices architectures
* Evaluate scalability
* Evaluate performance
* Demonstrate event-driven communication
* Analyze architectural trade-offs

## Author

Kasra Mohammadpour

Master Thesis Project
