const router = require('express').Router();
const { Player } = require('../../models');
const withAuth = require('../../utils/auth');

// GET ROUTES

// Get all players

router.get('/', async (req, res) => {
  try {
    const playerData = await Player.findAll();
    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single player

router.get('/:id', async (req, res) => {
  try {
    const playerData = await Player.findByPk(req.params.id);

    if (!playerData) {
      res.status(404).json({ message: 'No player found with this id!' });
      return;
    }

    res.status(200).json(playerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST ROUTES

// Create a player

router.post('/', withAuth, async (req, res) => {
  try {
    const newPlayer = await Player.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPlayer);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
