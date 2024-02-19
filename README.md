# Northcoders News API

Please follow the following instructions to create the environment variables to run it locally.

    This project needs two databases: one is for dev enviroment and another for test enviroment.

    You will need to create two .env files in the project folder for it to work: .env.test and .env.development. Into each file please add PGDATABASE=<your database name>, the database name should match on the "/db/setup.sql" . Make sure both .env files are git ignored (.gitignore) so that its  hidden away from others who has access to this repo.