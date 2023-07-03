# CRUD-API
Basic Scope
+10 The repository with the application contains a Readme.md file containing detailed instructions for installing, running and using the application
+10 GET api/users implemented properly
+10 GET api/users/{userId} implemented properly
+10 POST api/users implemented properly
+10 PUT api/users/{userId} implemented properly
+10 DELETE api/users/{userId} implemented properly
+6 Users are stored in the form described in the technical requirements
+6 Value of port on which application is running is stored in .env file
Advanced Scope
+30 Task implemented on Typescript
+10 Processing of requests to non-existing endpoints implemented properly
+10 Errors on the server side that occur during the processing of a request should be handled and processed properly
+10 Development mode: npm script start:dev implemented properly
+10 Production mode: npm script start:prod implemented properly
Hacker Scope
+30 There are tests for API (not less than 3 scenarios)
+50 There is horizontal scaling for application with a load balancer

1) node > 18
2) npm install
3) npm run start:dev

In another terminal you can check

1) POST /api/users
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Alex",
    "age": 30,
    "hobbies": ["React", "Node"]
  }' \
  http://localhost:4000/api/users

2) GET /api/users 
Retrieves all users.
curl -X GET http://localhost:4000/api/users


3) GET /api/users/{userId}
curl -X GET http://localhost:4000/api/users/user_id

4) PUT /api/users/{userId}
Updates an existing user by their ID. Required fields: username and age. Optional field: 
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Alex-test",
    "age": 35,
    "hobbies": ["React", "Node", "TS"]
  }' \
  http://localhost:4000/api/users/user_id

5) DELETE /api/users/{userId}
Deletes a user by their ID.
curl -X DELETE http://localhost:4000/api/users/user_id

test
npm run test