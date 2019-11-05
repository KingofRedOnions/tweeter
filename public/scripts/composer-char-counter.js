$(document).ready(function() {
  const tweetText = $(".new-tweet > form > textarea");
  const tweetTicker = $(".counter");
  let remainingChar = 140;

  tweetText.on('keyup', (key) => {
    remainingChar = 140 - tweetText.val().length;
    tweetTicker.text(remainingChar);

    if (remainingChar >= 0) {
      tweetTicker.css('color', '#545149');
    } else {
      tweetTicker.css('color', 'red');
    }
  });
});