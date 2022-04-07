const express = require('express');
const user_controller = require('../controllers/userController');
const router = express.Router();

/* GET users listing. */
router.get('/', user_controller.user_list);
router.delete('/:id', user_controller.delete_user);
router.put('/:id', user_controller.update_user);
router.get('/comments', user_controller.comment_list);
router.delete('/comments/:id', user_controller.delete_comment);
router.post('/comments/:id', user_controller.post_comment);
router.put('/comments/:id', user_controller.update_comment);
router.post('/signup', user_controller.user_signup_post);
router.post('/login', user_controller.user_login_post, (req, res) => {
  console.log(req.body);
  req.session.save(() => {
    if (!req.user) {
      console.log('User not found!');
      res.send(req.body);
    } else {
      console.log('Signed in');
      res.send(req.body);
    }
  });
});

router.get('/logout', user_controller.user_logout);

module.exports = router;
