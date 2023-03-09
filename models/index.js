const User = require('./User');
const Team = require('./Team');
const Player = require('./Player');

User.belongsTo(Team, {
  foreignKey: 'user_id',
});

Team.belongsTo(User, {
  foreignKey: 'team_id',
});

Team.belongsTo(Player, {
  as: 'player_one_info',
  foreignKey: 'player_one',
});

Team.belongsTo(Player, {
  as: 'player_two_info',
  foreignKey: 'player_two',
});

Team.belongsTo(Player, {
  as: 'player_three_info',
  foreignKey: 'player_three',
});
// Player.hasOne(Team, {
//   foreignKey: 'player_one',
// });

// Team.hasOne(Player, {
//   foreignKey: 'player_three',
// });

module.exports = { User, Team, Player };
