# Bonnier Publications Coding Challenge
This repository contains a [Laravel](https://laravel.com/docs/7.x) and [VueJS](https://vuejs.org/) starter application, that doesn't quite work.

There are specified some tasks below, which needs to be solved to complete this coding challenge.

Fork the repository, commit your solution, and send the URL to your forked repository.

The estimated time spent on this challenge is around 5 hours.

## Project description
Bob is a freelancer that wants to keep track of how much time he spends working on different projects.
At any given time he is working on different projects, giving each of them a unique name.
He needs to be able to log the date, the time he starts, and the time he stops working on a project, so that he knows how many hours in total he has spent on it.
He needs to be able to start and stop the same project multiple times.
For a GUI, Bob does not need much, but he must be able to see an overview of the time spent on his projects, create new projects, and add entries to existing ones.

## Tasks:
These objectives are mandatory:
* New user registration should be disabled.
* Verify project names are unique and display error when submitting existing name.
* Calculate total hours spend on project and display in the overview.
* Add functionality to support adding entries to projects.
* It should be possible to delete entries and projects.
* Make auth middleware global, instead of in constructors of controllers.
* If the user isn't logged in, all URLs should redirect to the login page.
## Bonus:
These objectives are optional:
* Improve existing code, if anything sticks out to you.
* When adding or updating a project, make the project overview automatically update.
* Add tests to prove functionality.


## Tasks Done:
These objectives are mandatory:
* New user registration should be disabled.
* Verify project names are unique and display error when submitting existing name.
* Calculate total hours spend on project and display in the overview.
* Add functionality to support adding entries to projects.
* It should be possible to delete entries and projects.
* Make auth middleware global, instead of in constructors of controllers.
* If the user isn't logged in, all URLs should redirect to the login page.

These objectives are optional:
* Improve existing code, if anything sticks out to you.
* When adding or updating a project, make the project overview automatically update.
* Add tests to prove functionality.

## Cypress
For this project I deside use the E2E Cypress test. How run the test?
* cd [Project - URL]/Cypress
* npm install
* npm cypress:open 


