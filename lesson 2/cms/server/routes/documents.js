/*eslint-env node*/
var express = require('Express')
var router = express.Router();
var Document = require('../models/document.js')
var sequenceGenerator = require('./sequenceGenerator')

function getDocuments(req, res) {
  Document.find().exec(function (err, documents) {
    if (err) {
      return res.status(500).json({
        title: "An error occured getting documents",
        error: err
      });
    }
    res.status(200).json(documents);
  })
}

function saveDocument(res, document) {
  document.save(function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error occured saving documents",
        error: err
      });
    }
    getDocuments(null, res)
  })
}

function deleteDocument(res, document) {
  document.remove(function (err) {
    if (err) {
      return res.status(500).json({
        title: "An error occured removing documents",
        error: err
      });
    }
    getDocuments(null, res)
  })
}

router.get('/', function (req, res) {
  getDocuments(req, res)
})

router.post("/", function (req, res) {
  var maxDocumentId = sequenceGenerator.nextId("documents");
  var document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  })
  saveDocument(res, document)
})

router.patch('/:id', function (req, res) {
  Document.findOne({
    id: req.params.id
  }, function (err, document) {
    if (err || !document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {
          document: 'Document not found'
        }
      })
    }

    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(res, document)
  })
})

router.delete('/:id', function (req, res) {
  var query = {
    id: req.params.id
  };

  Document.findOne(query, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {
          documentId: req.params.id
        }
      });
    }

    deleteDocument(res, document)
  })
})

module.exports = router;
