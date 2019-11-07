/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let lastUpdate = 0;

const submitOnEnter = function() {
  const $tweetText = $('.new-tweet > form > textArea');
  const $tweetForm = $('.new-tweet > form');

  $tweetText.keydown((key) => {
    if (key.key === 'Enter') {
      key.preventDefault();
      $tweetForm.submit();
    }
  });
};

const submitTweet = function() {
  const $tweetForm = $('.new-tweet > form');
  const $tweetText = $('.new-tweet > form > textArea');
  const $tweetError = $('.new-tweet > form > label');

  $tweetForm.submit((event) => {
    event.preventDefault();
    $tweetError.addClass('hidden');

    if (!$tweetText.val() &&
        !$tweetText.val() > 0) {
      $tweetError
        .text('Please enter text before submitting your tweet.')
        .removeClass('hidden');
      return;
    } else if ($tweetText.val().length > 140) {
      $tweetError
        .text('Please keep your tweets below 140 characters.')
        .removeClass('hidden');
      return;
    }

    $.ajax('/tweets/', {
      method: 'POST',
      data: $tweetForm.serialize(),
    })
      .done(() => {
        $tweetText.val('');
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
  seconds /= 1000;

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

// Preventative measure for cross site scripting.
// Escapes user provided strings.
const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Hides or unhides the compose tweet box
const toggleTweet = function(element) {
  element.click(() => {
    if ($('.container').hasClass('expanded')) {
      $('.new-tweet > form > textArea').blur();
    } else {
      $('.new-tweet > form > textArea').focus();
    }
    $('.container').toggleClass('expanded');
  });
};

$(document).ready(function() {
  submitTweet();
  submitOnEnter();
  loadTweets(renderTweets);
  toggleTweet($('nav > div'));
});