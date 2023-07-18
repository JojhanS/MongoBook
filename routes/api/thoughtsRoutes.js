const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controller/thoughtsController');
  

// /api/thoughts
router.route('/').get(getThoughts).post(createthoughts);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').put(updateThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').delete(deleteThought);

// /api/thoughts/create
router.route('/create').post(createThought)

// POST /api/thoughts/:thoughtId/reactions
router.post('/:thoughtsId/reactions/create', createReaction);

// DELETE /api/thoughts/:thoughtId/reactions
router.delete('/:thoughtsId/reactions/delete', deleteReaction);


module.exports = router;
