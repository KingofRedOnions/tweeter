/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let lastUpdate = 0;

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
        loadTweets(updateTweets);
      })
      .fail((xhr, status, err) => {
        console.log(xhr, status, err);
      });
  });
};

const updateTweets = function(data) {
  let newLastUpdate = lastUpdate;
  const newTweets = data.filter(x => {
    if (x.created_at > lastUpdate) {
      newLastUpdate = x.created_at;
    }
    console.log(x.created_at);
    return x.created_at > lastUpdate;
  });
  lastUpdate = newLastUpdate;

  renderTweetsTop(newTweets);
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
  lastUpdate = sortedTweets[0].created_at;
  const $tweets = $(".tweet-list");

  for (const tweet of tweets) {
    $tweets.append(createTweetElement(tweet));
  }
};

const renderTweetsTop = function(tweets) {
  // These are being prepended, so sort from oldest to newest.
  let sortedTweets = tweets;
  sortedTweets.sort((a, b) => a.created_at - b.created_at);
  const $tweets = $(".tweet-list");

  for (const tweet of tweets) {
    $tweets.prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweet) {
  const dateNow = Date.now();
  const dateCreated = new Date(tweet.created_at).getTime();
  const timeSincePost = dateNow - dateCreated;

  console.log(document.createTextNode(tweet.content.text));

  const $tweetElement = $(`
  <article class="tweet">
    <header>
      <img src=${tweet.user.avatars}>
      <p>${tweet.user.name}</p>
      <p>${tweet.user.handle}</p>
    </header>

    <p>${escape(tweet.content.text)}</p>

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

const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {
  submitTweet();
  loadTweets(renderTweets);
});