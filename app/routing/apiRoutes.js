// linking to the friends array
var friends = require("../data/friends");

// ROUTING
module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    
    // Start of friend comparison. This variale will hold the best match eventually
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    // Get users survey post and parse it
    var userData = req.body;
    var userScores = userData.scores;

    // This variable will hold the difference between friend scores during a survey post
    var totalDifference;

    // Here we loop through all the friend possibilities in the database
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // We then loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    // Push the user's data to the friends array
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);
  });
};
