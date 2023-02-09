# Blogging API
This is an api for a blogging app.

---

## Requirements 
1. Users should be able to register as bloggers
2. Bloggers should be able to login with Passport using JWT
3. Anyone (Visitors and Bloggers) should be able to get list of blog posts
4. Anyone (Visitors and Bloggers) should be able to get a particular blog post
5. Bloggers should be able to get a list of their blog posts
6. Bloggers should be able to get one of their blog posts
7. Bloggers should be able to edit their blog posts
8. Bloggers should be able to delete their blog posts
9. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- create your .env file
- run `npm run start`

---
## Base URL
- somehostsite.com


## Models
---

### Blogger
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  firstname |  string |  required |
|  lastname | string  |  required |
|  username  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |
|  country |  string |  optional  |


### BlogPost
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title |  string |  required |
|  description | string  |  required|
|  author  |  string |  required  |
|  state     | string  |  required, default: draft, enum: ['draft', 'published'] |
|  blogPostBody  |  string |  required  |
|  tags  |  [string] |
|  read_count |   number, default: 0  |
|  reading_time |  string |
|  createAt |  date |  required |
|  lastUpdateAt |  date |  required |



## APIs
---

### Signup Blogger

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": " bee@example.com",
  "password": "Password1",
  "firstname": "boluwatife",
  "lastname": "bee",
  "username": 'bee5"
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": " bee@example.com",
        "password": "Password1",
        "firstname": "boluwatife",
        "lastname": "bee",
        "username": 'bee5",
    }
}
```
---
### Login Blogger

- Route: /login
- Method: POST
- Body: 
```
{
   "username": 'bee5",
   "password": "Pword1"
}
```

- Responses

Success
```
{
    message: 'Logged in Successfully',
    token: 'sjlkafjkldsfjsd'
}
```

---

### Get A BlogPost

- Route: /blogposts/:id
- Method: GET
- Responses

Success
```
{
  "_id": "636442af5af2ac544da4483e",
  "title": "The Old shall lead.",
  "description": "The Old shall lead by wisdom.",
  "author": "Older Yog 1894@mail.com",
  "state": "published",
  "read_count": 1,
  "reading_time": "1 min read",
  "tags": [
    "Old",
    "Lead",
    "Young"
  ],
  "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
  "createAt": "2022-11-03T22:37:35.986Z",
  "lastUpdateAt": "2022-11-03T22:37:35.986Z",
  "__v": 0
}
```
---

### Get All BlogPosts

- Route: /blogposts
- Method: GET
- Query params: 
    - author
    - tags
    - read_count
    - reading_time
    - page (default: 1)
    - per_page (default: 20)
    - order_by (default: createAt)
    - blogPost (options: asc | desc)
- Responses

Success
```
{
  "status": true,
  "blogPosts": [
    {
      "_id": "636442af5af2ac544da4483e",
      "title": "The Old shall lead.",
      "description": "The Old shall lead by wisdom.",
      "author": "Older Young 1234@mail.com",
      "state": "published",
      "read_count": 0,
      "reading_time": "1 min read",
      "tags": [
        "Old",
        "Lead",
        "Young"
      ],
      "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
      "createAt": "2022-11-03T22:37:35.986Z",
      "lastUpdateAt": "2022-11-03T22:37:35.986Z",
      "__v": 0,
    },
    {
      "_id": "636443115af2ac544da44842",
      "viewedBy": [],
      "title": "The Old shall us.",
      "description": "The Old shall lead by maturity.",
      "author": "Older Young 1234@mail.com",
      "state": "published",
      "read_count": 0,
      "reading_time": "2 min read",
      "tags": [
        "Old",
        "Leader",
        "Younger"
      ],
      "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here. Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
      "createAt": "2022-11-03T22:39:13.709Z",
      "lastUpdateAt": "2022-11-03T22:39:13.709Z",
      "__v": 0
    }
  ]
}
```
---

### Create A BlogPost

- Route: /blogposts
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  "title": "The Old blss us.",
  "description": "The Old shall lead by maturity.",
  "tags": ["Old", "Leader", "Younger"],
  "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here."
}
```

- Responses

Success
```
{
  "status": true,
  "NewBlogPost": {
    "title": "The Old blss us.",
    "description": "The Old shall lead by maturity.",
    "author": "Boluwatife derftgyhuj 1234@mail.com",
    "state": "draft",
    "read_count": 0,
    "reading_time": "1 min read",
    "tags": [
      "Old",
      "Leader",
      "Younger"
    ],
    "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
    "_id": "63681bcfdac8378668922128",
    "createAt": "2022-11-06T20:40:47.012Z",
    "lastUpdateAt": "2022-11-06T20:40:47.012Z",
    "__v": 0
  }
}
```
---
### Get My BlogPost

- Route: /blogposts/:id
- Method: GET
- - Header
    - Authorization: Bearer {token}
- Query params: 
    - author
- Responses

Success
```
{
  "_id": "636442af5af2ac544da4483e",
  "title": "The Old shall lead.",
  "description": "The Old shall lead by wisdom.",
  "author": "Older Young 1234@mail.com",
  "state": "draft",
  "read_count": 0,
  "reading_time": "1 min read",
  "tags": [
    "Old",
    "Lead",
    "Young"
  ],
  "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
  "createAt": "2022-11-03T22:37:35.986Z",
  "lastUpdateAt": "2022-11-03T22:37:35.986Z",
  "__v": 0
}
```
---

### Get All My BlogPosts

- Route: /blogposts
- Method: GET
- - Header
    - Authorization: Bearer {token}
- Query params: 
    - author
    - state
    - page (default: 1)
    - per_page (default: 20)
- Responses

Success
```
{
  "status": true,
  "blogPosts": [
    {
      "_id": "636442af5af2ac544da4483e",
      "title": "The Old shall lead.",
      "description": "The Old shall lead by wisdom.",
      "author": "Older Yo 12uuu@mail.com",
      "state": "draft",
      "read_count": 0,
      "reading_time": "1 min read",
      "tags": [
        "Old",
        "Lead",
        "Young"
      ],
      "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
      "createAt": "2022-11-03T22:37:35.986Z",
      "lastUpdateAt": "2022-11-03T22:37:35.986Z",
      "__v": 0,
      "read_count": 1
    },
    {
      "_id": "636443115af2ac544da44842",
      "title": "The Old shall us.",
      "description": "The Old shall lead by maturity.",
      "author": "Older Young",
      "state": "published",
      "read_count": 0,
      "reading_time": "2 min read",
      "tags": [
        "Old",
        "Leader",
        "Younger"
      ],
      "blogPostBody": "Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here. Replit, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
      "createAt": "2022-11-03T22:39:13.709Z",
      "lastUpdateAt": "2022-11-03T22:39:13.709Z",
      "__v": 0
    }
  ]
}
```
---

### Edit A BlogPost

- Route: /blogposts/:id
- Method: PATCH
- Header:
    - Authorization: Bearer {token}
- Body: 
```
{
  "state": "published"
}
```
- Responses

Success
```
{
  "_id": "63681bcfdac8378668922128",
  "title": "The Old blss us.",
  "description": "The Old shall lead by maturity.",
  "author": "Boluwatife derftgyhuj 1234@mail.com",
  "state": "published",
  "read_count": 0,
  "reading_time": "1 min read",
  "tags": [
    "Old",
    "Leader",
    "Younger"
  ],
  "blogPostBody": "Replica, and programming in general, just took a huge leap forward. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. No longer are you restricted to writing on computers that go “clickity clackity”. Now you can write on screens that go “tippity tappity”. In all seriousness, the Repit Mobile app is a new, enjoyable approach to programming on mobile The Replit Mobile app is available on Android and iOS. If you’d like to learn more about features like the coding joystick and smart suggestion, you’ll find every unique mobile feature here.",
  "createAt": "2022-11-06T20:40:47.012Z",
  "lastUpdateAt": "2022-11-06T20:43:55.918Z",
  "__v": 0
}
```


### Delete A BlogPost

- Route: /blogposts/:id
- Method: DELETE
- Header:
    - Authorization: Bearer {token}
- Responses
```

Success
```
{
    message: ''The Old will need us.' succesfully deleted!'
}
```

Deployed at https://dark-crow-pleat.cyclic.app/

## Contributor
- Boluwatife Moronkeji
