# Start

`./gradlew bootRun`

# Use

`http://localhost:8080/mental/status`

# Create

## User

```
curl localhost:8080/mental/users/create \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"username":"User","location":"Something","description":"Citizen of earth"}'
```

## Record

```
curl localhost:8080/mental/record/create \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"usersid":"USERS_ID_HERE"}'
```

## Saved

```
curl localhost:8080/mental/saved/create \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"usersid":"USERS_ID_HERE", "recordid":"RECORD_ID_HERE"}'
```
