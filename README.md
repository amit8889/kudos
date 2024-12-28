# Kudos App

This is a Kudos application built with Node.js and MongoDB. The application allows users to send kudos to each other, along with badges and reasons for the kudos. Users can also like kudos given by others.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Entity Relationship Diagram](#entity-relationship-diagram)

## Getting Started

Follow these instructions to set up and run the Kudos application on your local machine for development and testing purposes.

## Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running on your machine or access to a MongoDB Atlas cluster.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kudos-app.git
   cd kudos-app
   ```
2. Install dependencies:
   ```base 
   npm install
    ```
3. Create a .env file in the root directory and add your MongoDB connection string:
   ```base 
   MONGO_URI=mongodb://localhost:27017/kudos-app
   PORT:5000
    ```
## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. Install dependencies:
   ```base 
   npm install
    ```
## Entity Relationship Diagram

![ER Diagram](https://i.imgur.com/ukPzGJI.png)

```
    Table users {
      _id ObjectId
      name String
      email String
      createdAt Date
    }

    Table badges {
      _id ObjectId
      label String
      createdAt Date
    }

    Table kudos {
      _id ObjectId
      sender ObjectId [ref: > users._id]
      receiver ObjectId [ref: > users._id]
      badge ObjectId [ref: > badges._id]
      reason String
      createdAt Date
    }

    Table kudoslikes {
      _id ObjectId
      userId ObjectId [ref: > users._id]
      kudosId ObjectId [ref: > kudos._id]
      createdAt Date
    }
```