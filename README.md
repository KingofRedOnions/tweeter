# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Usage

There is a 'Write a new tweet' button at the top right that will slide down the new tweet box.  For the purpose of the demo, submitting a tweet will send the text to the server in a POST request, the server will generate a random name and ID, and then the client will request new tweets and prepend them to the list.

The site will dynamical change between mobile and desktop layouts at 1024px.

When scrolling down, the site will also pop a corner button that will allow you to immediately skip to the top of the page.

## Dependencies

- Express
- Node 5.10.x or above
