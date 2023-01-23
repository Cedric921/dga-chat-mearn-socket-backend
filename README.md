# dga-chat-mearn-socket-backend

### By cedric karungu

An api for a real time chat in express, socket.io, mongo, ts in backend and next, redux toolkit in frontend

<br>

base url

```
http://gda-chat-socket.onrender.com
```

This api has to modules

- Users module
- Messages module

# 1. Users

to endpoint to send or to receive message user must have a valid token, we suppose that user is connected if user ( client ) have a valid token

## 1.1 Create an account

endpoint

```
http://gda-chat-socket.onrender.com/api/users/signup
```

Body request

```
{
   "name": "Dieume",
   "lastname":"Muhindo",
   "email":"dieume@gmail.com",
   "password": "123456",
   "username":"dieume"
}
```

Response

```
{
   "_id": "638db1d294adce5b3016c466",
   "name": "Dieume",
   "lastname": "Muhindo",
   "email": "dieume@gmail.com",
   "username": "dieume",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGRiMWQyOTRhZGNlNWIzMDE2YzQ2NiIsImlhdCI6MTY3MDIzMDQ4MiwiZXhwIjoxNjcwMzE2ODgyfQ.LLepTCWyHexlC2nvWzFSvvfI6oOcsDJh_Yec08pbYkU"
}
```

## 1.2 Login

if user has an account, any time you can login to get a valid access token

endpoint

```
http://gda-chat-socket.onrender.com/api/users/login
```

Body request

```
{
   "username": "vb",
   "password": "123456"
}
```

Response

```
{
   "_id": "6362e15b48125878c5770b19",
   "name": "Cedric",
   "lastname": "karungu",
   "email": "cedric@gmail.com",
   "username": "vb",
   "imageUrl": "https://res.cloudinary.com/dteyspzef/image/upload/v1669025861/lmfeh22cbkyudcfv7mml.jpg",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjJlMTViNDgxMjU4NzhjNTc3MGIxOSIsImlhdCI6MTY3MDIzMDcyMiwiZXhwIjoxNjcwMzE3MTIyfQ.8Uzdw3H2J1-t1HKK8EEgA5d1r0Dlo1Nz-sbBRoC5PD0"
}
```
