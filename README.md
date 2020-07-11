# Node.js API Specification

### Description

An online community of comic book enthusiasts, has contacted you to help them develop a new REST API service for their new social network of comic book lovers. 

They have a front-end and mobile app already in development, but are looking for a developer to outline, plan and build the REST API service and DB to support their desired app features.

---
### Commands
- **npm run build**
    ###### build the project on the ./dist folder
- **npm run dev**
    ###### run the application in dev mode
- **npm run start**
    ###### run the application in prod mode
- **npm run prod**
    ###### build and run the application in prod mode
- **npm run test**
    ###### run tests    
- **npm run coverage**
    ###### run tests with coverages
- **docker-compose build**
    ###### build the application in an image
- **docker-compose up**
    ###### run the application on a docker container
        
---
### Models
- **User**
    - **username**: String - required
    - **name**: String - required
    - **password**: String - required
    - **active**: Boolean - default true - It's not been used
    - **admin**: Boolean - default false - It's not been used
    - **token**: String - Auto managed
    - **createdAt**: Date - Auto managed
    - **updatedAt**: Date - Auto managed
    
- **Post**
    - **description** - String - required
    - **username** - String - required
    - **name** - String - required
    - **createdAt**: Date - Auto managed
    - **updatedAt**: Date - Auto managed 
    
- **Comment**
    - **description** - String - required
    - **username** - String - required
    - **name** - String - required
    - **postId** - ObjectId - Auto managed - required
    - **createdAt**: Date - Auto managed
    - **updatedAt**: Date - Auto managed 
---
### Routes
Base: /api/v1/
- **User**
  - public
    - **/users** - POST - (Create a new user)
    - **/users/login** - POST - (Login)
  - protected
    - **/users/logout** - POST - (Logout)
- **Post**
   - protected
     - **/posts** - GET - (Find all paginated posts)
     - **/posts** - POST - (Create a new post)
- **Comment**
   - protected
     - **/comments** - GET - (Find all paginated comments)
     - **/comments/:postId** - POST - (Create a new comment on a post)
- **Websocket**
   - public
     - Same server host address server and port defined on [WEBSOCKET_PORT](README.md#environment)
---
### Environment
|   Variable     | Description         |  default      |
| -------------  | :------------------ | ------------: |
| PORT           | Server port         |  3001         |
| WEBSOCKET_PORT | Websocket port      |  3002         |
| MONGODB_HOST   | Mongo host          |  localhost    |
| MONGODB_PORT   | Mongo port          |  27017        |
| MONGODB_BASE   | Mongo database      |  comicclan    |
| LOG_LEVEL      | Level to print logs |  INFO ([log4js](https://www.npmjs.com/package/log4js))|
| LOG_DAYS       | Days to keep logs   |  15           |
| LOG_PATH       | path to save logs   |  logs/        |
| CORS_WHITELIST | Allow orign request |  ''           |
| SECURE_SECRET  | Secret word to token|  ?            |
---
### Examples

---
##### Creating new user
POST - http://localhost:3001/api/v1/users
- header
    ```textmate
    Origin - ?
    ```
- body
    ```json
   {
     "username": "ahaertel",
     "name": "Arthur Haertel",
     "password": "123456"
   }
    ```
- payload
    ```json
    {
      "success": true
    }
    ```
---  
##### Login with crated user
POST - http://localhost:3001/api/v1/users/login
- header
    ```textmate
    Origin - ?
    ```
- body
    ```json
    {
      "username": "ahaertel",
      "password": "123456"
    }
    ```
- payload
    ```json
    {
      "_id": "5e87b0f818f3c7532903a9c8",
      "active": true,
      "admin": false,
      "username": "ahaertel",
      "name": "Arthur Haertel",
      "createdAt": "2020-04-03T21:56:08.162Z",
      "updatedAt": "2020-04-03T22:01:27.108Z",
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFlcnRlbCIsImlhdCI6MTU4NTk1MTMxOH0.vYgTaw-KK1Fv-rko1ccO23u9Hel_oK0dCFHGihN_paY"
    }
    ```
---
##### Logout with logged user
POST - http://localhost:3001/api/v1/users/logout
- header
    ```textmate
    Origin - ?
    Authorization - Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFlcnRlbCIsImlhdCI6MTU4NTk1MTMxOH0.vYgTaw-KK1Fv-rko1ccO23u9Hel_oK0dCFHGihN_paY
    ```
- payload
    ```json
    {
      "success": true
    }
    ```
---
---
##### Create a new post
POST - http://localhost:3001/api/v1/posts
- header
    ```textmate
    Origin - ?
    Authorization - Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFlcnRlbCIsImlhdCI6MTU4NTk1MTMxOH0.vYgTaw-KK1Fv-rko1ccO23u9Hel_oK0dCFHGihN_paY
    ```
- body
    ```json
    {
      "description": "new post to test"
    }
    ```
- payload
    ```json
    {
      "success": true
    }
    ```
---
##### Find all posts
GET - http://localhost:3001/api/v1/posts
- header
    ```textmate
    Origin - ?
    Authorization - Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFlcnRlbCIsImlhdCI6MTU4NTk1MTMxOH0.vYgTaw-KK1Fv-rko1ccO23u9Hel_oK0dCFHGihN_paY
    ```
- query
    ```json
    {
      "pagination": {
        "start": 0,
        "step": 30,
        "sort": {
          "description": 1
        }
      }
    }
    ```
- payload
    ```json
    {
      "count": 3,
      "data": [
        {
          "_id": "5e8777a718f3c7532903a9c6",
          "username": "ahaertel",
          "description": "post 1",
          "name": "Arthur Haertel",
          "createdAt": "2020-04-03T17:51:35.071Z",
          "updatedAt": "2020-04-03T17:51:35.071Z"
        },
        {
          "_id": "5e8776e32ac4a6514c4e6446",
          "username": "ahaertel",
          "description": "post 2",
          "name": "Arthur Haertel",
          "createdAt": "2020-04-03T17:48:19.386Z",
          "updatedAt": "2020-04-03T17:48:19.386Z"
        },
        {
          "_id": "5e8776cf2ac4a6514c4e6445",
          "username": "ahaertel",
          "description": "post 3",
          "name": "Arthur Haertel",
          "createdAt": "2020-04-03T17:47:59.840Z",
          "updatedAt": "2020-04-03T17:47:59.840Z"
        }
      ]
    }
    ```
---
---
##### Create a new comment
POST - http://localhost:3001/api/v1/comments/5e8776b44d4b414fb9aaae38
- header
    ```textmate
    Origin - ?
    Authorization - Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFlcnRlbCIsImlhdCI6MTU4NTk1MTMxOH0.vYgTaw-KK1Fv-rko1ccO23u9Hel_oK0dCFHGihN_paY
    ```
- body
    ```json
    {
      "description": "A new comment in some post"
    }
    ```
- payload
    ```json
    {
      "success": true
    }
    ```
---
##### Find all comments
GET - http://localhost:3001/api/v1/comments
- header
    ```textmate
    Origin - ?
    Authorization - Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFlcnRlbCIsImlhdCI6MTU4NTk1MTMxOH0.vYgTaw-KK1Fv-rko1ccO23u9Hel_oK0dCFHGihN_paY
    ```
- query
    ```json
    {
      "pagination": {
        "start": 0,
        "step": 20,
        "sort": {
          "createdAt": -1
        }
      }
    }
    ```
- payload
    ```json
    {
      "count": 1,
      "data": [
        {
          "name": "Arthur Haertel",
          "username": "ahaertel",
          "description": "post 2",
          "comments": [
            {
              "description": "A new comment in some post",
              "name": "Arthur Haertel",
              "createdAt": "2020-04-03T22:23:01.047Z",
              "username": "ahaertel"
            }
          ]
        }
      ]
    }
    ```
---
### Main technologies

- typescript@3.8.3
- node@12.16.1
- mongoose@5.9.6
- ws@7.2.3
- express@4.17.1
- mocha@7.1.1
- MongoDB@3.6.3

---
### Extras

Dump is not needed
