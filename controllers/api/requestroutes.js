const router = require('express').Router();
const { requestroutes, } = require('../../models');
const RequestRoutes = require('../../models/request');
// importing information from the models folder in the request.js class file.

// GET all request
router.get('/', async (req, res) => {
  // the get('/'), async(promise code) and the request file's request and response from computer is in the first steps of the get.
  try {
    const request = await
      // await is telling the code that it will wait until they receive the code communication info from the async promise code and the request from the request and the response from the developers/server.
      Request.findAll();
    res.status(200).json(requestData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const requestData = await request.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(requestData);
  }catch(err){
    res.status(400).json(err);
  }
}
)
// CREATE a request
router.post('/', async (req, res) => {
  try {
    const requestData = await Request.create(req.body);
    res.status(200).json(requestData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a request
router.delete('/:id', async (req, res) => {
  try {
    const requestData = await Request.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!requestData) {
      res.status(404).json({ message: 'No request found with this id!' });
      return;
    }

    res.status(200).json(requestData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;