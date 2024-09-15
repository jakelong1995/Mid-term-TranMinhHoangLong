# User Profile Management API

This project is a Node.js-based API for managing user profiles, including image uploads and user data management.

## Features

- User registration and authentication
- User profile management
- Image upload functionality (using Cloudinary)
- RESTful API endpoints for users and profiles

## Project Structure

- `services/userService.js`: Contains user-related business logic
- `routes/`:
  - `users.js`: User-related routes
  - `profiles.js`: Profile-related routes
  - `index.js`: Main router file
- `helpers/`:
  - `cloudinaryUploadImage.js`: Helper for uploading images to Cloudinary
  - `uploadImage.js`: General image upload helper

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env` file (see `.env.example` for required variables)
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Users

- `GET /users/:userId`: Get user information
- `PUT /users/:userId`: Update user information
- `DELETE /users/:userId`: Delete user account
- `POST /users/upload/`: Upload user avatar

### Profiles

- `POST /profiles`: Create a new profile (Register)
- `GET /profiles/:profileId`: Get profile information
- `PUT /profiles/:profileId`: Update profile information
- `DELETE /profiles/:profileId`: Delete profile

For more detailed information on request/response formats, please refer to the API documentation below.

## API Documentation

### Users

#### Get User Information

- **URL**: `/users/:userId`
- **Method**: `GET`
- **Description**: Retrieve information for a specific user

#### Update User Information

- **URL**: `/users/:userId`
- **Method**: `PUT`
- **Description**: Update information for a specific user

#### Delete User Account

- **URL**: `/users/:userId`
- **Method**: `DELETE`
- **Description**: Delete a user account

#### Upload User Avatar

- **URL**: `/users/upload/`
- **Method**: `POST`
- **Description**: Upload an avatar image for a user
- **Note**: This endpoint uses local image upload middleware

### Profiles

#### Create Profile (Register)

- **URL**: `/profiles`
- **Method**: `POST`
- **Description**: Create a new user profile

#### Get Profile Information

- **URL**: `/profiles/:profileId`
- **Method**: `GET`
- **Description**: Retrieve information for a specific profile

#### Update Profile Information

- **URL**: `/profiles/:profileId`
- **Method**: `PUT`
- **Description**: Update information for a specific profile

#### Delete Profile

- **URL**: `/profiles/:profileId`
- **Method**: `DELETE`
- **Description**: Delete a user profile

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `PORT`: The port on which the server will run
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
