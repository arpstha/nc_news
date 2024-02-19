# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).


1. This project needs two databases: one is for dev enviroment and another for test enviroment.

    You will need to create two .env files in the project folder for it to work: .env.test and .env.development. Into each file please add PGDATABASE=<your database name>, you can find correct database name in  "/db/setup.sql" . Make sure both .env files are git ignored (.gitignore) so that its  hidden away from others who has access to this repo.