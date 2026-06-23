# Auth Service

The Auth Service manages authentication and authorization.

## Responsibilities

* User registration
* User login
* Password hashing
* JWT generation
* Role management

## Port

3001

## Database

auth-db

## RabbitMQ

### Published Events

* user_registered

### Consumed Events

* user_created

## Authentication

JWT-based authentication using Passport JWT Strategy.
