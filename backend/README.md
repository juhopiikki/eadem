# Start

`./gradlew bootRun`

# Use

`http://localhost:8080/mental/status`

# Operations

## User

```
curl localhost:8080/mental/users/create \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"username":"User","location":"Something","description":"Citizen of earth"}'
```

Get user by id
```
curl localhost:8080/mental/users/getById \
  -H "Content-Type: application/json" \
  -X POST \
  -d '"d97b8baa-b626-4615-b142-fa6687887bfa"'
```

Update user description
```
curl localhost:8080/mental/users/updateDescription \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"usersid":"d97b8baa-b626-4615-b142-fa6687887bfa","description":"Citizen of earth"}'
```

Update user name
```
curl localhost:8080/mental/users/updateName \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"usersid":"d97b8baa-b626-4615-b142-fa6687887bfa","username":"Maniboi"}'
```

## Record

```
curl localhost:8080/mental/record/create \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"usersid":"USERS_ID_HERE"}"'
```

Increase record like by one
```
curl localhost:8080/mental/record/likeIncrease \
  -H "Content-Type: application/json" \
  -X POST \
  -d '"record-id-here"'
```

Get top n records
```
curl localhost:8080/mental/record/getTop \
  -H "Content-Type: application/json" \
  -X POST \
  -d '10'
```

Get record by id
```
curl localhost:8080/mental/record/getById \
  -H "Content-Type: application/json" \
  -X POST \
  -d '"RECORD_ID_HERE"'
```

Get all records of a user
```
curl localhost:8080/mental/record/getByUserId \
  -H "Content-Type: application/json" \
  -X POST \
  -d '"USER_ID_HERE"'
```

Delete record (from saved and records)
```
curl localhost:8080/mental/record/deleteById \
  -H "Content-Type: application/json" \
  -X POST \
  -d '"RECORD_ID_HERE"'
```

## Saved

```
curl localhost:8080/mental/saved/create \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"usersid":"USERS_ID_HERE", "recordid":"RECORD_ID_HERE"}"'
```

Get top n saved
```
curl localhost:8080/mental/saved/getTop \
  -H "Content-Type: application/json" \
  -X POST \
  -d '10'
```

Get users saved Records
```
curl localhost:8080/mental/saved/getSaved \
  -H "Content-Type: application/json" \
  -X POST \
  -d '"USERS_ID_HERE"'
```

Delete saved record from users saved
```
curl localhost:8080/mental/saved/delete \
  -H "Content-Type: application/json" \
  -X POST \
  -d '"SAVED_ID_HERE"'
```
