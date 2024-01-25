# Task-Management
Task Management Application
This repository contains the source code for a simple task management web application built using the MERN stack and AWS services. The application allows users to register, log in, and manage their tasks.

Project Structure
client: The frontend React application.
server: The backend Node.js and Express.js application.
aws: AWS services configuration and scripts.

Prerequisites
Node.js (>= 14.0.0)
MongoDB
AWS CLI

Setup Instructions
1. Clone the repository:
git clone https://github.com/Chitra1711/Task-Management.git
2.Install dependencies:
cd Task-Management
npm install
3.Set up environment variables:
Create a .env file in the root directory and add the following variables:
MONGODB_URI=<your-mongodb-connection-string>
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
JWT_SECRET=<your-jwt-secret>
4. Run the application:
npm start
The application will be accessible at http://localhost:3000.

AWS Services
The application integrates with AWS services for storage and serverless processing:
1.Tasks are stored in an AWS DynamoDB database.
2.AWS Lambda is used for serverless processing, such as task validation before saving.

Testing
Unit tests are located in the client/src and server/src directories. You can run tests using the following commands:
npm test

Deployment
The application can be deployed using AWS Amplify, Heroku, or Netlify. For AWS Amplify, follow the official documentation to deploy the application.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
