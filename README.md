# chat-api

## Getting Started

To begin developing 

1. Install dependencies by running `npm install`

  (If you don't already have npm or node installed, follow npm's documentation [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

2. Run the api with `npm run start`


## Database Set Up

The project chat-api utlizes a postgresql database.

Install postgres

```
brew install postgresql
brew services start postgresql
```

Login to postgres:
```
psql postgres
```

Create a new user in postgres with the following credentials:
```
CREATE ROLE guild WITH LOGIN PASSWORD 'guildpassword';
```

Update the users role to create a new database:
```
ALTER ROLE guild CREATEDB;
```

Quit postgres and login:

```
psql -d postgres -U guild
```

Create a new database for the application:
```
CREATE DATABASE chatapi;
```

Create an .env file at the root of the project and add the following:

```
DB_USER=guild
DB_PASSWORD=guildpassword
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=chatapi
```

The commands to create the tabels required to run chat api can be found in `tables.sql`.



## Endpoints

### /users

`GET localhost:3000/users`

Returns all users

Example response:
```
[
  {
    "id":2,
    "username":"abed",
    "created_at":"2022-10-26T01:05:37.388Z"
  },
  {
    "id":1,
    "username":"troy",
    "created_at":"2022-10-26T01:05:37.388Z"
  }
]
```

`GET localhost:3000/users?userId=1`

Returns information for a specific user

Example response:
```
[
  {
    "id":1,
    "username":"troy",
    "created_at":"2022-10-26T01:05:37.388Z"
  }
]
```

`POST localhost:3000/users`

Creates new users and give them an id

Request body:
```
{
	"username": "julie"
}
```

Example Response:
```
[
  {
    "id":3,
    "username":"julie",
    "created_at":"2022-10-26T01:05:37.388Z"
  }
]

### /messages

`GET localhost:3000/messages`

Returns a limit of 100 messages sent in the last 30 days

Example response:
```
[
  {
    "id":8,"senderid":1,
    "recipientid":2,
    "text":"how are you?",
    "created_at":"2022-10-26T02:09:43.911Z"
  },
  {
    "id":3,"senderid":2,
    "recipientid":1,
    "text":"cool. cool, cool, cool.",
    "created_at":"2022-10-26T01:08:15.280Z"
  },
  {
    "id":2,
    "senderid":2,
    "recipientid":1,
    "text":"greetings",
    "created_at":"2022-10-26T01:08:15.280Z"
  },
  {
    "id":1,
    "senderid":1,
    "recipientid":2,
    "text":"hey",
    "created_at":"2022-10-26T01:08:15.280Z"
  }
]
```

`GET localhost:3000/messages?recipientId=1`

Returns all messages sent to a specific recipient withing the last 30 days
```
[
  {
    "id":3,"senderid":2,
    "recipientid":1,
    "text":"cool. cool, cool, cool.",
    "created_at":"2022-10-26T01:08:15.280Z"
  },
  {
    "id":2,
    "senderid":2,
    "recipientid":1,
    "text":"greetings",
    "created_at":"2022-10-26T01:08:15.280Z"
  },
]
```

`localhost:3000/messages?recipientId=2&senderId=1`

Returns all messages send to a recipient from a specific sender within the last 30 days

Example response:

```
[
  {
    "id":1,
    "senderid":1,
    "recipientid":2,
    "text":"hey",
    "created_at":"2022-10-26T01:08:15.280Z"
  },
  {
    "id":8,
    "senderid":1,
    "recipientid":2,
    "text":"how are you?",
    "created_at":"2022-10-26T02:09:43.911Z"
  }
]
```

