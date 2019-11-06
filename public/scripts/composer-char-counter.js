const scrollListener = function() {
  $(document).scroll((event) => {
    if ($(document).scrollTop() > 400) {
      $('#skip-to-top').removeClass('hidden');
    } else {
      $('#skip-to-top').addClass('hidden');
    }
  });
};

const skipToTop = function() {
  $('#skip-to-top').click(() => {
    $(document).scrollTop(0);
  });
};

$(document).ready(function() {
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

  scrollListener();
  skipToTop();
});