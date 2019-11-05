$(document).ready(function() {
  const tweetText = $(".new-tweet > form > textarea");
  const tweetTicker = $(".counter");

  tweetText.on('keydown', (key) => {
    remainingChar = 140 - tweetText.val().length;
    tweetTicker.text(remainingChar);
  });
});