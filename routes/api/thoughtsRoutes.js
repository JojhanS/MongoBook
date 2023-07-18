const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  } = require('../../controller/thoughtsController');
  

// /api/thoughts
router.route('/').get(getThoughts)

// /api/thoughts/:thoughtId
router.route('/:thoughtsId').get(getSingleThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtsId').put(updateThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtsId').delete(deleteThought);

// /api/thoughts/create
router.route('/create').post(createThought)

// POST /api/thoughts/:thoughtId/reactions
router.post('/:thoughtId/reactions/create', addReaction);

// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
router.delete('/:thoughtId/reactions/delete', removeReaction);


module.exports = router;
