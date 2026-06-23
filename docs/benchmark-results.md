# Benchmark Results

## Test Environment

### Hardware

* CPU:
* RAM:
* Storage:

### Software

* Ubuntu:
* Docker:
* PostgreSQL:
* RabbitMQ:
* Node.js:

---

# Login Benchmark

## k6 Configuration

* Duration:
* Virtual Users:

### Results

| Metric          | Monolith | Microservices |
| --------------- | -------- | ------------- |
| Average Latency |          |               |
| p95 Latency     |          |               |
| Requests/sec    |          |               |
| Error Rate      |          |               |

### Analysis

Observations:

---

# Product Listing Benchmark

## Endpoint

```http
GET /products?page=1&limit=20
```

### Results

| Metric          | Monolith | Microservices |
| --------------- | -------- | ------------- |
| Average Latency |          |               |
| p95 Latency     |          |               |
| Requests/sec    |          |               |
| Error Rate      |          |               |

### Analysis

Observations:

---

# Order Creation Benchmark

## Endpoint

```http
POST /orders
```

### Results

| Metric          | Monolith | Microservices |
| --------------- | -------- | ------------- |
| Average Latency |          |               |
| p95 Latency     |          |               |
| Requests/sec    |          |               |
| Error Rate      |          |               |

### Analysis

Observations:

---

# Mixed Workload Benchmark

### Results

| Metric          | Monolith | Microservices |
| --------------- | -------- | ------------- |
| Average Latency |          |               |
| p95 Latency     |          |               |
| Requests/sec    |          |               |
| Error Rate      |          |               |

### Analysis

Observations:

---

# Final Comparison

## Advantages of Monolith

* Simpler deployment
* Lower communication overhead
* Easier local development

## Advantages of Microservices

* Independent deployment
* Better scalability
* Service isolation
* Technology flexibility
* Event-driven architecture

## Conclusion

The Microservices architecture introduces communication overhead but provides greater scalability, maintainability, and fault isolation compared to the Monolithic architecture.
