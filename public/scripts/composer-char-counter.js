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
});