const {RetrieveServerIDFromDatabase, SearchMessageWithinServerDatabase} = require('../sequelize/BotCRUDFunctions')
const express = require('express')
const router = express.Router()


router.get('/:wordcloudID/:wordCloudID', (req, res) => {
  res.type('application/json')

  let wordCloudID = req.params.wordCloudID
  let result = RetrieveServerIDFromDatabase(wordCloudID)

  if (result==null) {
    throw new Error("Wordcloud ID does not correspond to any user")
  }
  
  var messages = SearchMessageWithinServerDatabase(result.author, result.serverID)
  res.send(messages)
})

module.exports = router