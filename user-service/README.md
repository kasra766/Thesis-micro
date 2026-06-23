# User Service

The User Service manages user profiles.

## Responsibilities

* User creation
* User retrieval
* User updates
* User deletion

## Port

3002

## Database

user-db

## RabbitMQ

### Consumed Events

* user_registered

### Published Events

* user_created

## Notes

User records are created asynchronously after registration through RabbitMQ events.
