# Note-Taking RESTful API with Google OAuth



A RESTful API for a simple note-taking application. Users can create, read, update, and delete notes. The API is secured using Google OAuth for authentication.



**Created by:** Jhon Kenneth Alcala  



---



## Project Setup



1. Clone the repository.

2. Install dependencies:



```bash

npm install

```



## Run tests



```bash

# unit tests

$ npm run test

```





# MongoDB Setup



## Create a MongoDB Cluster



- Go to `https://www.mongodb.com/cloud/atlas/register` and sign in with your Google account.

- You will redirect to this UI

![mongodb-overview](./image-md/mongodb-overview.png)

- Then click the clusters > click +Create

- Select the Free Cluster. Optionally, rename it and click `Create Deployment`.



![mongodb-createDeployment](./image-md/mongodb-create.png)



- Then it will show something like this



![mongodb-afterDeployment](./image-md/mongodb-after-deployment.png)

- Click drivers



- Copy the connectionString. This is an example

`mongodb+srv://<db_username>:<db_password>@notes-cluster-v2.4jgvu5b.mongodb.net/?appName=notes-cluster-v2`



- Replace <db_username> and <db_password> with your credentials.

- Set the connection string in your `.env` file:



```

MONGODB_URI=<mongodb_uri>

```



# MongoDB username and password



- Go to `Database & Network Access` > `Add New Database User`

- Build-in Role. Set the role to `Atlas Admin`



![mongodb-users](./image-md/mongodb-users.png)



- In the Bottom , select `Add user`



# MongoDB Cluster



- Navigate to `Database` > `Cluster` > `Browse Collection` to view or manage your data.



![mongodb-collection](./image-md/mongodb-collection.png)



# Google OAuth Setup



- Go to this website `https://console.cloud.google.com/`

- Sign in with a Google account

- You will be prompted to this UI



![google-ui](./image-md/google-ui.png)



- Then click the `Select a project`

- Click the `New Project`

- Change the name to your desired name. Then click `Create`



![google-create-project](./image-md/google-create-project.png)



- When you successfully create a project, click the project



![google-project](./image-md/google-project.png)



- The Cloud Hub UI will appear



![google-ui](./image-md/google-project-ui.png)



# Create API Google ID and Secret



- Click on `API & Services` > `Credentials` >  Choose `OAuth consent screen`



![google-api](./image-md/google-api.png)



- Click the Create OAuth



![google-create](./image-md/create-oauth.png)



- It will show something like this



**Note** - Application Type should be `Web Application` change the name in your desired name.



![create-1](./image-md/create-oauth-1.png)



- Authorized JavaScript origins should be `http://localhost:3000`

- Authorized redirect URIs should be `http://localhost:3000/api/auth/google/callback`

- Then click Create

![create-2](./image-md/create-oauth-2.png)



This is the result of successful creation.



![success](./image-md/create-success.png)





Replace the client id and client secret in .env



```

GOOGLE_CLIENT_ID=<id>

GOOGLE_CLIENT_SECRET=<secret>

GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

```



## Download POSTman



1. Go to `https://www.postman.com/downloads/`

2. Download the Windows 64-bit

3. After installing it , you need to log in to Gmail. It will show something like this

![postman](./image-md/postman.png)





## Compile and run the project

```
# development

$ npm run start

# watch mode

$ npm run start:dev

```

## Run the project
1. Go to http://localhost:3000/api/auth/google

- Sign in to your Gmail. After that, it will show something like this

![google-signin](./image-md/localhost-google-signin.png)


Note: Copy the **Token** and save it in a notepad. The token will be used for the authentication of creating/updating/deleting/getting notes.

- Then, if you go to MongoDB, it will show the created user

![created-user](./image-md/mongodb-create-user.png)

## Using the API Call

1. From POSTman, create a new request by clicking the + button

![postman-create](./image-md/postman-create.png)

# API/POST

- For API POST, use the following URL:

`http://localhost:3000/api/notes`



- You need to add authorization, and then `Auth Type` should be `Token`, and then paste the copied token



![postman-token](./image-md/postman-header.png)



- Then go to the body and paste the following



```

{

  "title": "Sample Note 1",

  "content": "Hey hey hey",

  "tags": ["personal", "todo"],

  "category": "Daily"

}

```



- The postman should have a result.

![postman-post](./image-md/postman-post.png)



- It will save to MongoDB



![postman-mongodb-post](./image-md/postman-mongodb-post.png)



# API/GET

- For API GET, use the following URL:

`http://localhost:3000/api/notes`



- You need to add authorization, and then `Auth Type` should be `Token`, and then paste the copied token



![postman-token](./image-md/postman-get-header.png)



The result should be like this.



```

{

    "total": 1,

    "page": 1,

    "limit": 5,

    "totalPages": 1,

    "notes": [

        {

            "_id": "6909e867bc59f059954f9180",

            "title": "Sample Note 1",

            "content": "Hey hey hey",

            "userId": "6909cb10498f6d43577d3769",

            "createdAt": "2025-11-04T11:49:59.110Z",

            "updatedAt": "2025-11-04T11:49:59.110Z",

            "__v": 0

        }

    ]

}

```



# Using the note ID

- For API GET with noteId, used the following URL:

`http://localhost:3000/api/notes/noteId`



- You need to add authorization, and then `Auth Type` should be `Token`, and then paste the copied token



![postman-get-noteid](./image-md/postman-get-nodeid.png)



# API/PUT



 For API PUT, use the following URL:

`http://localhost:3000/api/notes/noteId`



- You need to add authorization, and then `Auth Type` should be `Token`, and then paste the copied token



![postman-get-noteid](./image-md/postman-get-nodeid.png)



- Sample body that needs to be sent



```

{

  "title": "Sample Note 2",

  "content": "No No No",

  "tags": ["personal", "todo"],

  "category": "Daily"

}

```



The result will be 

![postman-put-result](./image-md/postman-put-result.png)



and it will update it in the MongoDB

![postman-put-mongodb](./image-md/postman-put-mongodb.png)



# API/DELETE



 For API DELETE, use the following URL:

`http://localhost:3000/api/notes/noteId`



- You need to add authorization, and then `Auth Type` should be `Token`, and then paste the copied token



![postman-delete-header](./image-md/postman-delete-header)



**NOTE:** - Only Admin Role can delete a record. If the role is user, it will prompt an error



```

{

    "message": "Forbidden Access. Admin access only",

    "error": "Forbidden",

    "statusCode": 403

}

```



- If the role is Admin, it should be deleted successfully



![postman-delete](./image-md/postman-delete.png)



# Make the role become an admin



- Update it in MongoDB in the users collection, change the role to admin



![change-admin](./image-md/mongodb-change.png)



- Restart the App