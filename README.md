# NC News 📰
![Javascript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)
![Node.js](https://img.shields.io/badge/node.js-f1f6ff?logo=node.js&logoColor=6bbf47&style=for-the-badge)
![Postgres](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)


![ScreenShot](https://github.com/arpstha/nc_news/blob/main/screenshot.png?raw=true)

## SUMMARY

This project was a part of Northcoders bootcamp project Jan 2024 - Apr 2024.

NC News is a web application that allows users to read and interact with news articles. Users can view articles, comments, and vote on both articles and comments. Additionally, users  can post new articles, comment on existing articles, and delete their own comments.

This project is built using Node.js and Express for the backend, with a PostgreSQL database to store articles, comments, and user data. The frontend is developed using React.js, providing a responsive and interactive user interface.


## MAIN FEATURES
- View a list of all articles
- View a list of all articles of a certain topic
- View an individual article
- Like on an article
- View a list of comments associated with an article
- Post a new comment to an existing article (as a valid user)
- Sort articles based on: date, author, or number of likes
- Order sorted articles in ascending or descending order
- Delete comments (as a valid user)
- Have responsive error handling for invalid URL paths

## Links

| Description               |                     Link                      |
| :------------------------:| :-------------------------------------------: |
| Hosted version of project | https://65f4778740a9b700086a628e--extraordinary-cheesecake-bdc2d0.netlify.app |
| Back-end API              | https://nc-news-6vx3.onrender.com/api/        |
| Front-end repo            | https://github.com/arpstha/fe_nc_news         |
| Creator's Github profile  |        https://github.com/arpstha             |

# Set-up instructions

## Prerequisites

Please ensure the following are installed:

- Node
- Postgres
- node package manager

### How to clone

To clone this repository, within your terminal, navigate to an appropriate directory and use the commands

```
git clone https://github.com/arpstha/nc_news.git
cd nc_news
```

### Dependencies

To install all dependencies required run:

```
npm install
```
### The following dependencies should have been installed:###

dotenv
express
pg
pg-format

### Developer dependencies for testing: ###

jest
supertest
jest-sorted

* A note for Linux users: you'll need to set up a user.js file with your postgres username and password:*

{ user: 'username', password: 'password' }

### Creating Databases ####
Create two .env files in order to link to the development and test databases These files should be named:

**.env.dev** </br>
**.env.test**</br>

Inside each file add:  PGDATABASE=nc_news and  PGDATABASE=nc_news_test depending on the file.

Create the databases by running the following command in your terminal (ensure Postgres is running before starting):

```
npm run setup-dbs
```
The console should confirm the two databases have been created.

>DROP DATABASE</br>
DROP DATABASE</br>
CREATE DATABASE</br>
CREATE DATABASE</br>

If an error occurs, please ensure your have named/set up the .env files as stated, and that they are in the root level of your directory. Follow .env-example file root if needed.


The development database can then be seeded by running the following command in the terminal:
```
 npm run seed
 ```
The console should confirm that four tables have been inserted into. If an error occurs, please ensure you have created the databases prior to seeding.


To run the server locally, type the code below into your terminal. 
```
npm start
```
The terminal should confirm that it has started listening
>Listening on 9090...</br>


Method requests (GET, PATCH, POST, DELETE) can now be performed at http://localhost:9090 using your API endpoint testing tool of choice i.e. postman, insomnia etc
The available routes and methods can be found below

### Routes ###

The server has the following 14 endpoints:

GET /api/topics which serves a list of topics

POST /api/topics adds a new topic to the database

GET /api/articles/:article_id, which responds with the article corresponding to the article_id passed in

POST /api/articles adds a new article to the topic in the post object

PATCH /api/articles/:article_id modifies the votes on the article in question

DELETE /api/articles/:article_id deletes the article selected by its id

POST /api/articles/:article_id/comments adds a new comment to the requested article

GET /api/articles/:article_id/comments gets all the comments belonging to the requested article

GET /api/articles gets all the articles in the database

GET /api/comments responds with all the comments in the database

GET /api/users responds with all the usernames in the database

GET /api/users:username responds the details of the username requested

DELETE /api/comments/:comment_id deletes the requested comment

GET /api serves a json object of the path above, with example responses

### Testing ###

The tests created can be found in the: '__tests__/app.test.js' directory

To run the testing suite, type the code below in your terminal
```
npm run test
```
Please ensure you have the testing dependencies listed above installed, in order to ensure the tests complete successfully.

This should seed the test-database with the test data, before each test.

The terminal should confirm that this is happening..

> be-nc-news@1.0.0 test</br>
>jest</br>
>PASS  __tests__/utils.test.js</br>
>PASS  __tests__/app.test.js</br>
>Test Suites: 2 passed, 2 total</br>
>Tests:       60 passed, 60 total</br>
>Snapshots:   0 total</br>
>Time:        3.394 s</br>
>Ran all test suites.</br>