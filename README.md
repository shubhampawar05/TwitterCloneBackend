# Twitter Clone API

This is a Twitter clone API built using Node.js, Express, and MongoDB. It provides a set of endpoints for user authentication, tweet management, and social features.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
  - [User Endpoints](#user-endpoints)
  - [Tweet Endpoints](#tweet-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
2. Install the dependencies:
3. Set up the environment variables:
- Create a `.env` file in the root directory.
- Add the following variables:
  ```
  MONGO_URL=<your-mongodb-connection-string>
  PORT=<your-preferred-port-number>
  ```
4. Start the server:
The server will start running on the specified port.

## Endpoints

### User Endpoints

| Endpoint        | HTTP Method | Description                                 |
| --------------- | ----------- | ------------------------------------------- |
| `/api/v1/user/register` | `POST`      | Register a new user                        |
| `/api/v1/user/login`    | `POST`      | Login an existing user                     |
| `/api/v1/user/logout`   | `GET`       | Logout the current user                    |
| `/api/v1/user/bookmark/:tweetId` | `GET` | Bookmark a tweet                         |
| `/api/v1/user/profile/:userID`   | `GET` | Get the profile of a user                |
| `/api/v1/user/otherUser`         | `GET` | Get the profiles of other users          |
| `/api/v1/user/follow/:followerId`| `GET` | Follow another user                      |
| `/api/v1/user/UnFollow/:unfollowerId` | `GET` | Unfollow another user              |

### Tweet Endpoints

| Endpoint        | HTTP Method | Description                                 |
| --------------- | ----------- | ------------------------------------------- |
| `/api/v1/tweet/create` | `POST`      | Create a new tweet                        |
| `/api/v1/tweet/delete/:tweetId` | `POST` | Delete a tweet                        |
| `/api/v1/tweet/like/:tweetId`   | `POST` | Like or dislike a tweet               |
| `/api/v1/tweet/alltweets`       | `GET`  | Get all tweets                         |
| `/api/v1/tweet/followingtweets` | `GET`  | Get tweets of users you're following  |

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt
- Dotenv

## Contributing

Contributions are welcome If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
