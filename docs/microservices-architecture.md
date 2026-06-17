# Microservices Architecture

## Services

### Gateway
Public entry point.

### Auth Service
Authentication and JWT.

Database:
auth_db

### User Service
User management.

Database:
user_db

### Product Service
Product catalog.

Database:
product_db

### Order Service
Order processing.

Database:
order_db

## Communication

Gateway -> Services (REST)

Future:
RabbitMQ events

## Databases

auth_db
user_db
product_db
order_db
