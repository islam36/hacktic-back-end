# BACKEND FOR HACKTIC RH APP

## technologies
- node.js
- express
- mongodb
- jsonwebtokens (for authentication)

## endpoints (routes)
```
POST /login
POST /register

GET /users
GET /users/:userId
PUT /users/:userId
DELETE /users/:userId

GET /events
POST /events
GET /events/:eventId
PUT /events/:eventId
DELETE /events/:eventId

GET /tasks
POST /tasks
GET /tasks/:taskId
PUT /tasks/:taskId
DELETE /tasks/:taskId
```

### `email-script.js`
This script sends an email to each eticien that contains its `authCode` which will be used to register only ETIC memebers. Each code can be used only one time.
