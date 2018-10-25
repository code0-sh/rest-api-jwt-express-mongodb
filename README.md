RESTful APIs with JSON Web Tokens
====

# Overview
RESTful APIs using JWT with Express and MongoDB.

- Framework for Node.js - using [Express](http://expressjs.com/) v4.16.1
- Authentication via [JWT](https://jwt.io/)
- Authentication middleware - using [Passport](http://www.passportjs.org/)
- Database - using [MongoDB](https://www.mongodb.com/) v3.6.2
- MongoDB object modeling tool -  using [Mongoose](http://mongoosejs.com/) v5.0.6
- Object schema validation - using [Joi](https://github.com/hapijs/joi)
- Test - using [Jest](https://facebook.github.io/jest/)

# Environment
OS: macOS High Sierra v10.13.3

MongoDB: v3.6.2

Text Editor: Visual Studio Code v1.21.0

Visual Studio Code Plugins
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
- [JavaScript Standard Style](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)

# Install

If you install MongoDB, Yarn using Homebrew

```sh
$ brew install mongodb
$ brew install yarn
```

Login to create DB 
```sh
## start only once
$ mongod --config /usr/local/etc/mongod.conf
# login
$ mongo
# create DB
# Please also set your DB name in config.js
$ use databaseName
```

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/code0-sh/rest-api-jwt-express-mongodb.git
```

then

Defining environment variables
```sh
# create an .env file right under the project
# and describe with reference to .env.sample
NODE_SECRET = "neWKqPh9gkWR"
```

```sh
# required to use Flow
$ yarn global add flow-typed
# required for bcrypt
$ yarn global add node-gyp 
# cd into project root
$ yarn install
# start the api
$ yarn start

# test the api
$ yarn test

# build the api
$ yarn build
# Set NODE_ENV of .env to production
$ node dist/index.js
```

# Usage

The expiration date of the access token is set to 300 seconds, and the refresh token is set to 14 days.
Automatically delete refresh tokens with TTL Indexes.

### POST `/api/users`

Create a new user.

+ Method: `POST`
+ URL: `/api/users`
+ Body:

```json
{
  "name": "tanaka",
  "email": "tanaka@sample.co.jp",
  "password": "FRnuaLJEkvwoVhHe"
}
```

Response `201`
```json
{
  "_id": "5aa63ebcc5005c239cf14dc6",
  "name": "tanaka",
  "email": "tanaka@sample.co.jp",
  "password": "$2a$08$Z41PI0mdhfCCB3sHgjOrAO6tw494qKxqrDRHNu127hkR6Qd.EhlQm",
  "created_at": "2018-03-12T08:47:56.220Z",
  "updated_at": "2018-03-12T08:47:56.220Z"
}
```

### POST `/api/auth/login`

User login.

+ Method: `POST`
+ URL: `/api/auth/login`
+ Body:

```json
{
  "name": "tanaka",
  "email": "tanaka@sample.co.jp",
  "password": "FRnuaLJEkvwoVhHe"
}
```

Response `201`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFuYWthIiwiaWF0IjoxNTIwODQ0NTI0LCJleHAiOjE1MjA4NDQ4MjR9.yxLWEGk7UUQn4o9SDpBRITRr8HMl6McsVNOY8xVQwT4",
    "refresh_token": "YxRS2WQWnz5cvXEeIZy6jxX8LnVQ2Eoz4oipzamqU8cH4l7XZ22SqzzWBEtUS43ca1NrZFETvqrhsdIJxpNRPqW6f2kewCgw8mLK53OBXq0IWfZ2cK9X6C4F36SDuttluuzUPaX0qXozuvR3zRa4BYnHymKok8hukjR4p4amUEPqFSlYir3ziJ8iK4RxGMRPVHl0kc6NYONkZ9oyRIEK0g5WXQflsfRyU02yXXu0Z2dHojsi8rbLMskxa9cfs4SA",
    "message": "Authentication successfully finished."
}
```

### GET `/api/users/me`

Get your user information.

+ Method: `GET`
+ URL: `/api/users/me`
+ Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFuYWthIiwiaWF0IjoxNTIwODQ0NTI0LCJleHAiOjE1MjA4NDQ4MjR9.yxLWEGk7UUQn4o9SDpBRITRr8HMl6McsVNOY8xVQwT4

Response `200`
```json
{
    "_id": "5aa63ebcc5005c239cf14dc6",
    "name": "tanaka",
    "email": "tanaka@sample.co.jp",
    "password": "$2a$08$Z41PI0mdhfCCB3sHgjOrAO6tw494qKxqrDRHNu127hkR6Qd.EhlQm",
    "created_at": "2018-03-12T08:47:56.220Z",
    "updated_at": "2018-03-12T08:47:56.220Z"
}
```

### PUT `/api/users/me`

Update your user information.

+ Method: `PUT`
+ URL: `/api/users/me`
+ Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFuYWthIiwiaWF0IjoxNTIwODQ0NTI0LCJleHAiOjE1MjA4NDQ4MjR9.yxLWEGk7UUQn4o9SDpBRITRr8HMl6McsVNOY8xVQwT4
+ Body:

```json
{
  "email": "tanaka.523@sample.co.jp"
}
```

Response `200`
```json
{
    "_id": "5aa63ebcc5005c239cf14dc6",
    "name": "tanaka",
    "email": "tanaka.523@sample.co.jp",
    "password": "$2a$08$Z41PI0mdhfCCB3sHgjOrAO6tw494qKxqrDRHNu127hkR6Qd.EhlQm",
    "created_at": "2018-03-12T08:47:56.220Z",
    "updated_at": "2018-03-12T08:54:35.481Z"
}
```

### DELETE `/api/users/me`

Delete your user information.

+ Method: `DELETE`
+ URL: `/api/users/me`
+ Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFuYWthIiwiaWF0IjoxNTIwODQ0NTI0LCJleHAiOjE1MjA4NDQ4MjR9.yxLWEGk7UUQn4o9SDpBRITRr8HMl6McsVNOY8xVQwT4

Response `200`
```json
{}
```

### POST `/api/auth/token`

Update your access token and If the authentication information does not exist, it creates it and updates it if it exists.

+ Method: `POST`
+ URL: `/api/auth/token`
+ Body:

```json
{
  "name": "tanaka",
  "refresh_token": "YxRS2WQWnz5cvXEeIZy6jxX8LnVQ2Eoz4oipzamqU8cH4l7XZ22SqzzWBEtUS43ca1NrZFETvqrhsdIJxpNRPqW6f2kewCgw8mLK53OBXq0IWfZ2cK9X6C4F36SDuttluuzUPaX0qXozuvR3zRa4BYnHymKok8hukjR4p4amUEPqFSlYir3ziJ8iK4RxGMRPVHl0kc6NYONkZ9oyRIEK0g5WXQflsfRyU02yXXu0Z2dHojsi8rbLMskxa9cfs4SA"
}
```

Response `201`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGFuYWthIiwiaWF0IjoxNTIwOTAzMzA1LCJleHAiOjE1MjA5MDM2MDV9.W4YGvBpA9N9N7yEPRSFJ07I9-W6h2OXRhJ9FeJOTjuI",
    "refresh_token": "oL4kobpqB8f6LsrSSw1AYaWpgTpwHlKSZtsQ9AT8pm5x4sg18EOV8ssxs7RV7RAYurttN7ptrdtcc2RJVhkgO3anbyahjwD59GaLP9di5hmSFp8ORuMXz1xJuffEadTZKrd5nnC9YC7DMaOCeLqBvtMQCTtcNYxUtv37On356yWLvve6c5LdrKTk774xWyFsqlJxdrMvVSoYls6GO9pymkX1vPt3Ssxu2gp904X0FilZB0R83Fo7gZGAcY5enbB6",
    "message": "Authentication successfully finished."
}
```

# License
[MIT](./LICENSE)
