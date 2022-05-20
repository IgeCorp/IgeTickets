[![IgeTickets Docker Image](https://github.com/IgeCorp/IgeTickets/actions/workflows/docker-image.yml/badge.svg?branch=master)](https://github.com/IgeCorp/IgeTickets/actions/workflows/docker-image.yml)

# Requirements

Nodejs version superior or equal to [16.x](https://nodejs.org/en/download/) (LTS version recommended)

A sql database like [MariaDB](https://mariadb.org/) database installed on your machine (MariaDB 10.x recommended)

A code editor like [VS Code](https://code.visualstudio.com/) or [IntelliJ IDEA](https://www.jetbrains.com/idea/)

(Optional) [Git](https://git-scm.com/) installed on your machine

# Intsallation

`npm install` to install all of the dependencies

Create a .env file in the root directory of the project.
(take a look at the .env.example file for more information)

Please note that the database is not created by default.
To create it, run the following command:

```shell
~$ mysql -u <user> -p
<your password>

~$ CREATE DATABASE <database name>;
```

*The tables are created automatically by the code*

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
TEST_GUILD=YOUR_GUILD_FOR_TESTS
DB_HOST=localhost
DB_IP=YOUR_MACHINE_IP_WHERE_THE_DATABASE_IS
DB=YOUR_DATABASE_NAME
DB_USER=YOUR_DATABASE_USER
DB_PASSWD=YOUR_DATABASE_USER_PASSWORD
```

# Usage

`npm run dev` to start the development mode

`npm run build` to build the project in javascript

`npm run pretest` to test the project in javascript

`npm run start` to start the project in production mode

# Contributing

Start by make a fork of the [repository](https://github.com/IgeCorp/IgeTickets)

Then make a [pull request](https://github.com/IgeCorp/IgeTickets/pulls) with your changes.

All pull requests are welcome.

# About

All pull request are verified manually before being merged.
