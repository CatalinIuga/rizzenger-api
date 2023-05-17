# RIZZENGER

## Database

- Users
- Conversations
- Messages

## Users

- id
- name
- email
- password (hash)
- avatar (string)
- created_at (timestamp)
- online (boolean)

## Conversations

- id
- name (string), null
- created_at (timestamp)
- participants (array of users)
- avatar (string)

## Messages

- id
- conversation_id
- sender_id (user)
- content (string)
- created_at (timestamp)
- read_at (timestamp), null
- deleted (boolean)

## API

### Users

- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id

### Conversations

- GET /conversations
- GET /conversations/:id
- POST /conversations
- PUT /conversations/:id
- DELETE /conversations/:id

### Messages

- GET /messages
- GET /messages/:id
- POST /messages
- PUT /messages/:id
- DELETE /messages/:id

## Websocket

### Events

- connection
- disconnect
- message
- typing
- read
- delete
- create
- update
- delete
- join
- leave

### Payloads

- message
- typing
- read
- delete
- create
- update
- delete
- join
- leave
