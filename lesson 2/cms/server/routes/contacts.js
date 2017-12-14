/*eslint-env node*/
var express = require('Express')
var router = express.Router();
var Contact = require('../models/contact.js')
var sequenceGenerator = require('./sequenceGenerator')

function getContacts(req, res) {
  Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
      if (err) {
        return res.status(500).json({
          title: "An error occured getting contacts",
          error: err
        });
      }
      res.status(200).json(contacts);
    })
}

function saveContact(res, contact) {

  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }

  contact.save(function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error occured saving contacts",
        error: err
      });
    }
    getContacts(null, res)
  })
}

function deleteContact(res, contact) {
  contact.remove(function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error occured removing contacts",
        error: err
      });
    }
    getContacts(null, res)
  })
}

router.get('/', function (req, res) {
  getContacts(req, res)
})

router.post("/", function (req, res) {
  var maxContactId = sequenceGenerator.nextId("contacts");
  var contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  })
  saveContact(res, contact)
})

router.patch('/:id', function (req, res) {
  Contact.findOne({
    id: req.params.id
  }, function (err, contact) {
    if (err || !contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {
          contact: 'Contact not found'
        }
      })
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    saveContact(res, contact)
  })
})

router.delete('/:id', function (req, res) {
  var query = {
    id: req.params.id
  };

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {
          contactId: req.params.id
        }
      });
    }

    deleteContact(res, contact)
  })
})

module.exports = router;
