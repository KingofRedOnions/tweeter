/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const submitTweet = function() {
  const $tweetForm = $('.new-tweet > form');

  $tweetForm.submit((event) => {
    event.preventDefault();

    if (!$tweetForm[0][0].value && 
        !$tweetForm[0][0].value.length > 0) {
      alert('Please enter text before submitting your tweet.');
      return;
    } else if ($tweetForm[0][0].value.length > 140) {
      alert('Please keep your tweets below 140 characters.');
      return;
    }

    $.ajax('/tweets/', {
      method: 'POST',
      data: $tweetForm.serialize(),
    })
      .done((data, status, xhr) => {
        console.log('It worked');
        console.log(xhr, status, data);
      })
      .fail((xhr, status, err) => {
        console.log(xhr, status, err);
      });
  });
};

const loadTweets = function(cb) {

  $.ajax('/tweets/', {
    method: 'GET'
  })
    .done((data, status, xhr) => {
      cb(data);
    });
};

// Will need to add a ticket to apply this to each post element
// ever x period of time.
// I'm not sure this is working right now..
const timeSince = function(seconds) {
  if (seconds < 60000) {
    return 'Under a minute ago';
  }
  if (seconds < 3600000) {
    return Math.floor(seconds / 60000) + ' minutes ago';
  }
  if (seconds < 86400000) {
    return Math.floor(seconds / 3600000) + ' hours ago';
  }
  // All approximations from here, for now.
  if (seconds < 2592000000) {
    return Math.floor(seconds / 86400000) + ' days ago';
  }
  if (seconds < 31104000000) {
    return Math.floor(seconds / 2592000000) + ' months ago';
  }
  return Math.floor(seconds / 31104000000) + ' years ago';
};

const renderTweets = function(tweets) {
  // First sort the tweets from newest to oldest.
  let sortedTweets = tweets;
  sortedTweets.sort((a, b) => b.created_at - a.created_at);
  const $tweets = $(".tweet-list");

  for (const tweet of tweets) {
    $tweets.append(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweet) {
  const dateNow = Date.now();
  const dateCreated = new Date(tweet.created_at).getTime();
  const timeSincePost = dateNow - dateCreated;

  const $tweetElement = $(`
  <article class="tweet">
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
  </article>
  `);

  return $tweetElement;
};

$(document).ready(function() {
  submitTweet();
  loadTweets(renderTweets);
});