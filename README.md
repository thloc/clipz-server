# Clipz_Server

## Setup and run
Setup this project, run the following commands on your terminal.
```bash
1. Clone the project
2. Navigate to the project directory `cd clipz_server`
3. Install neccesary packages, modules `npm install`
4. To run the project `npm start`
```

Star docker
`docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=_H4Pdx mongo`
```bash
use dbClipz

db.createUser(
  {
    user: "root",
    pwd: passwordPrompt(),
    roles: [ { role: "readWrite", db: "dbClipz" }]
  }
)
```
