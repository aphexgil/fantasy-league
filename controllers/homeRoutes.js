const router = require('express').Router();
const { Player, Team, User } = require('../models');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/createteam', withAuth, async (req, res) => {
  try {
    res.render('createteam', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/buildteam', withAuth, async (req, res) => {
  try {
    const playerData = await Player.findAll();
    const players = playerData.map((player) => player.get({ plain: true }));

    var playerArray = [];

    for (let i = 0; i < 12; i++) {
      var randomNum = [Math.floor(Math.random() * players.length)];
      const removePlayer = players.splice(randomNum, 1);
      playerArray.push(removePlayer[0]);
    }
    console.log(playerArray);

    res.render('buildTeam', {
      logged_in: req.session.logged_in,
      playerArray,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// we want to find and render the team that matches the user_id

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.session.user_id, {
      include: [
        { model: Player, as: 'player_one_info' },
        { model: Player, as: 'player_two_info' },
        { model: Player, as: 'player_three_info' },
      ],
    });
    const team = teamData.get({ plain: true });

    res.render('dashboard', {
      logged_in: req.session.logged_in,
      team,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/results', withAuth, async (req, res) => {
  try {
    const teamData = await Team.findAll({
      include: [
        { model: Player, as: 'player_one_info' },
        { model: Player, as: 'player_two_info' },
        { model: Player, as: 'player_three_info' },
      ],
    });
    let teams = teamData.map((team) => team.get({ plain: true }));
    const orderedTeams = [];

    let teamsInfo = teams.map((team) => ({
      ...team,
      fantasy_total:
        team.player_one_info.fantasy_points +
        team.player_two_info.fantasy_points +
        team.player_three_info.fantasy_points,
    }));

    for (var i = 0; i < teamsInfo.length; i++) {
      let total =
        teamsInfo[i].player_one_info.fantasy_points +
        teamsInfo[i].player_two_info.fantasy_points +
        teamsInfo[i].player_three_info.fantasy_points;
      let j = 0;
      while (j < orderedTeams.length) {
        if (
          total <
          orderedTeams[j].player_one_info.fantasy_points +
            orderedTeams[j].player_two_info.fantasy_points +
            orderedTeams[j].player_three_info.fantasy_points
        ) {
          j++;
        } else {
          break;
        }
      }
      orderedTeams.splice(j, 0, teamsInfo[i]);
    }

    teamsInfo = orderedTeams;

    const today = dayjs().format('M/D/YYYY');

    res.render('results', {
      logged_in: req.session.logged_in,
      today,
      teamsInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
