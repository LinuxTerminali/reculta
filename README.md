# simple-auth
A simple auth in nodejs




## Commands

Clone this project then 

```bash
npm install
npm start 
```
to run this project

## Playing locally

First, you will need to install and run [MongoDB](https://www.mongodb.com/) in another terminal instance.

```bash
$ mongod
```
> Note  you need to set enviorment variable "database" and "secret" where database is your mongo client address. 

## Types of users 
1. Admin: Can do almost everything including deleting a user
2. Manager: Can change user roles
3. TeamLead: Can create Task,
4. Member: Can change task status(By default)

## Task Status

1. Pending(By default)
2. inProgress
3. Completed

Create a user (register):
```bash
curl -X POST \
  http://localhost:3000/api/auth/register \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@test.com"}'
  ```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
    "success": true,
    "url": "https://ethereal.email/message/...."
}
```
where using url you can check your password

Authenticate the user (log in):
```bash
curl -X POST \
  http://localhost:3000/api/auth/login \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@test.com", "password":"password"}'
  ```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9......",
    "user": {
        "_id": "5c3b2bf04db24e0022f8dba6",
        "email": "test@test.com",
        "role": "Member"
    }
}
```

Now you can use the `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` token (it's usually greater than this) to call user protected APIs. For example, you can create a new `delete user`, `change user role` or `task`, `change task status` API.

## Delete user, only an admin can delete roles
```bash
curl -X POST \
  http://localhost:3000/api/change-role \
  -H 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"email":"test2@test.com", "new_role":"TeamLead"}'```
  
  
## Change user role, only a manager or admin can change roles
```bash
curl -X POST \
  http://localhost:3000/api/change-role \
  -H 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"email":"test2@test.com", "new_role":"TeamLead"}'
  ```

## Create task, only a temlead or admin can create task

```bash
curl -X POST \
  http://localhost:3000/api/task/create \
  -H 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \

  -d '{"name":"create users"}'
  ```


## Change task status, only a member or admin can change status

```bash
curl -X POST \
  http://localhost:3000/api/task/status \
  -H 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{"name":"test routes", "status":"inProgress"}'
  ```


