# Redis setup

Run the following command to set up a local Redis instance

```bash
docker run --name course-gpt-redis -d \
  -p 6379:6379 \
  redis:latest \
  redis-server --maxmemory-policy noeviction
```

To connect to the instance use `redis-cli -h localhost 6379`