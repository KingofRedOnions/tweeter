/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

// Will need to add a ticket to apply this to each post element
// ever x period of time.
const timeSince = function(seconds) {
  if (seconds < 60) {
    return 'Under a minute ago';
  }
  if (seconds < 3600) {
    return Math.floor(seconds / 60) + ' minutes ago';
  }
  if (seconds < 86400) {
    return Math.floor(seconds / 3600) + ' hours ago';
  }
  // All approximations from here, for now.
  if (seconds < 2592000) {
    return Math.floor(seconds / 86400) + ' days ago';
  }
  if (seconds < 31104000) {
    return Math.floor(seconds / 2592000) + ' months ago';
  }
  return Math.floor(seconds / 31104000) + ' years ago';
};

const renderTweets = function(tweets) {

};

const createTweetElement = function(tweet) {

};

$(document).ready(function() {
  const dateNow = Date.now();
  const dateCreated = new Date(tweet.created_at).getTime();
  console.log((tweet.created_at));
  const timeSincePost = dateNow - dateCreated;
  // Going to implement changing from minutes -> hours -> days.
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
        <time>${timeSince(timeSincePost)}</time>
      <menu>
        <figure>⚑</figure>
        <figure>⟲</figure>
        <figure>❤</figure>
      </menu>
      `
    );
  
    $('.tweet-list').append(tweetElement);
  };
  
  createTweetElement(tweet);
});