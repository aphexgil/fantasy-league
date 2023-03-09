// This function makes a call to the api for the list of players in the database and then returns 12 random players from that list.

const getPlayerData = async () => {
  const players = await fetch(`/api/players`, {
    method: 'GET',
  });
  userPlayerChoices(players);
};

const userPlayerChoices = function (possiblePlayers) {
  var playerArray = [];

  for (let i = 0; i < 12; i++) {
    var randomNum = [Math.floor(Math.random() * possiblePlayers.length)];
    const selectedPlayer = possiblePlayers[randomNum];
    playerArray.push(selectedPlayer);
  }
};

// We need a function that renders the array of random players returned on the page
