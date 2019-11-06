// Unhides the skip to top button when 400 pixels down the page.
const scrollListener = function() {
  $(document).scroll((event) => {
    if ($(document).scrollTop() > 400) {
      $('#skip-to-top').removeClass('hidden');
    } else {
      $('#skip-to-top').addClass('hidden');
    }
  });
};

// Drag window to top of document.
const skipToTop = function() {
  $('#skip-to-top').click(() => {
    $(document).scrollTop(0);
  });
};

// Manages remaining character ticker.
const characterTicker = function() {
  const tweetText = $(".new-tweet > form > textarea");
  const tweetTicker = $(".new-tweet > form > .counter");
  let remainingChar = 140;

  tweetText.on('keyup', () => {
    remainingChar = 140 - tweetText.val().length;
    tweetTicker.text(remainingChar);

    if (remainingChar >= 0) {
      tweetTicker.removeClass('invalid');
    } else {
      tweetTicker.addClass('invalid');
    }
  });
};

$(document).ready(function() {
  characterTicker();
  scrollListener();
  skipToTop();
});