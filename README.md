# 86agency-Technial-Assignment

# A Simple Social Media Application :-

- This is a Social Media App which allows users to Login & Signup And make a Post.
- It also allows user to Like a Post, Comment on A post, Delete a Post.
- This App is build using Node.js, Express.js, and MongoDB (NEM) as the backend stack.

# Overview of all the routes :-

| METHOD | ENDPOINT                | DESCRIPTION                                                                                     | STATUS CODE |
| ------ | ----------------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| POST   | /api/auth/signup        | This endpoint allows users to register. Hash the password on store.                             | 201         |
| POST   | /api/auth/login         | This endpoint allows users to login through email and password                                  | 201         |
| GET    | /api/users              | This endpoint returns a list of all registered users.                                           | 200         |
| POST   | /api/users/follow/:id   | This endpoint returns a list of all followed people of a specific user identified by its ID.    | 200         |
| POST   | /api/users/unfollow/:id | This endpoint allows the user to send a follow request to another user identified by its ID.    | 201         |
| GET    | /api/posts              | This endpoint returns a list of all posts.                                                      | 200         |
| GET    | /api/posts/:id          | This endpoint returns the details of a specific post identified by its ID.                      | 200         |
| POST   | /api/posts              | This endpoint allows the user to create a new post.                                             | 201         |
| POST   | /api/posts/like/:id     | This endpoint allows users to like a specific post identified by its ID.                        | 201         |
| POST   | /api/posts/comment/:id  | This endpoint allows users to comment on a specific post identified by its ID.                  | 201         |
| PUT    | /api/posts/:id          | This endpoint allows users to update the text or image of a specific post identified by its ID. | 204         |
| DELETE | /api/posts/:id          | This endpoint allows users to delete a specific post identified by its ID.                      | 202         |

# The Models Used in Creation of Database :-

## User Model :-

- The blue print of an instance of how a user gets saved in the database

```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  followed: [{ type: ObjectId, ref: 'User' }],
}

```

## Post model :-

- The blue print of an instance of how a Post gets saved in the database

```
{
  _id: ObjectId,
  userID: { type: ObjectId, ref: 'User' },
  Title: String,
  Content: String,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    userID: { type: ObjectId, ref: 'User' },
    Content: String,
    createdAt: Date
  }]
  createdAt: Date,
}

```

# Detailed Explanation of all the routes:-

### POST /api/signup

- This endpoint allows users to register. It Hashes the password while storing on Database.
- It requires User Details in a form of json object in request.body
- Sample User Detail Object -

```
 {
  name: String,
  email: String,
  password: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  followed: [{ type: ObjectId, ref: 'User' }]
 }

```

- If user already exists it returns `{ Message: "You Have Already Registered", success: true, exist: false,}`
- If signup is succesfull it returns `{ Message: "Registration  Successful", success: true, exist: false, instance }`
- Else it returns the appropriate error message

---

### POST /api/login

- This endpoint allows users to login. It returns JWT token on login.
- It requires Email and Password in req.body
- Sample Object :-

```
 {
    "email": "k@gmail.com",
    "password": "kunal143",
 }

```

- If the User Doesnt exists it returns ` { Message: "You are not Registered", success: false, exist: false }`
- If Login Is Successful it returns the UserInfo And A Token " `{ Message: "Login Successful", token, success: true, exist: true, user }`
- If the Password is wrong `{ Message: "Wrong Credentials" }`
- In else cases it will return appropriate Error messages

---

### GET /api/users

- It returns all the users
- status code : `200`

---

### GET /api/users/:id

- It requires the user id in url parameters
- It returns the particular posts with this posts id

---

### GET /api/posts/:id/

- It requires the post id in url parameters
- It returns the particular post with this posts id

---

### POST /api/posts

- This endpoint allows the user to Post a new posts
- It also requires the Authorization token in the Headers.
- Sample posts

```
{
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}

```

- It returns the Message, New Post has been posted
- It also returns And The posts object

---

### POST /api/posts/like/:id

- This endpoint allows the user to like a post of another user
- It requires the posts ID in the url Params.
- It also requires the Authorization token in the Headers.
- It returns `{ Message: "New Like Added", Post }`

---

### DELETE /api/posts/comment/:id

- This endpoint allows the user to comment a post of another user
- It requires the posts ID in the url Params.
- It also requires the Authorization token in the Headers.
- `{ Message: "New comment has been posted", Post }`

---

Thankyou for Visiting 💝
