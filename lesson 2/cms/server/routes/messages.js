/*eslint-env node*/
var express = require('Express')
var router = express.Router();
var Message = require('../models/message.js')
var sequenceGenerator = require('./sequenceGenerator')

function getMessages(req, res) {
  Message.find().exec(function (err, messages) {
    if (err) {
      return res.status(500).json({
        title: "An error occured getting messages",
        error: err
      });
    }
    res.status(200).json(messages);
  })
}

function saveMessage(res, message) {
  message.save(function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error occured saving messages",
        error: err
      });
    }
    getMessages(null, res)
  })
}

function deleteMessage(res, message) {
  message.remove(function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error occured removing messages",
        error: err
      });
    }
    getMessages(null, res)
  })
}

router.get('/', function (req, res) {
  getMessages(req, res)
})

router.post("/", function (req, res) {
  var maxMessageId = sequenceGenerator.nextId("messages");
  var message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  })
  saveMessage(res, message)
})

router.patch('/:id', function (req, res) {
  Message.findOne({
    id: req.params.id
  }, function (err, message) {
    if (err || !message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {
          message: 'Message not found'
        }
      })
    }

    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    saveMessage(res, message)
  })
})

router.delete('/:id', function (req, res) {
  var query = {
    id: req.params.id
  };

  Message.findOne(query, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {
          messageId: req.params.id
        }
      });
    }

    deleteMessage(res, message)
  })
})

module.exports = router;
