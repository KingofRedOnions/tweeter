/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const tweetElement = $('<article></article>')
      .addClass('tweet');
  
    tweetElement.append(
      `
      <header>
        <img src=${tweet.user.avatars}>
        <p>${tweet.user.name}</p>
        <p>${tweet.user.handle}</p>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <time>${tweet.created_at}</time>
      <menu>
        <figure>⚑</figure>
        <figure>⟲</figure>
        <figure>❤</figure>
      </menu>
      `
    );
  
    $('.tweet-list').append(tweetElement);
  };
  
  const tweet =  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
  
  createTweetElement(tweet);
});

