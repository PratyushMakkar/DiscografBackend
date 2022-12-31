const {RetrieveWordcloudIDFromDatabase, UpdateWordcloudIDInDatabase} = require('../sequelize/BotCRUDFunctions')
const {WordcloudIDContent} = require('../Models/MessageContent')
const express = require('express')

const router = express.Router()
router.post('/update/:ServID/:AuthorID', (req, res) => {
  const content = new WordcloudIDContent(
    req.params.ServID,
    req.params.AuthorID
  )
  
  const result = UpdateWordcloudIDInDatabase(content)
  res.type('application/json')
  res.send(result)
})

router.get('/:ServID/:AuthorID', async (req, res) => {
  const content = new WordcloudIDContent(
    req.params.ServID,
    req.params.AuthorID
  )

  const result = await (await (RetrieveWordcloudIDFromDatabase(content))).at(0)
  res.type('application/json')
  res.send(result)
})

module.exports = router