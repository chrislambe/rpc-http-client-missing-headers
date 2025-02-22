# Streaming RPC HTTP client missing headers

## Run the server

```shell
npm run server
```

## ...then run the client in another session

```shell
npm run client
```

## Expected result

```
timestamp=2025-02-21T23:58:29.440Z level=INFO fiber=#0 message="Running the client"
timestamp=2025-02-21T23:58:30.491Z level=INFO fiber=#1 message=1
timestamp=2025-02-21T23:58:31.492Z level=INFO fiber=#1 message=2
timestamp=2025-02-21T23:58:32.495Z level=INFO fiber=#1 message=3
timestamp=2025-02-21T23:58:33.500Z level=INFO fiber=#1 message=4
timestamp=2025-02-21T23:58:34.502Z level=INFO fiber=#1 message=5
```

## Actual result

401 HTTP status due to the missing `Authorization` header.