const {RetrieveWordcloudIDFromDatabase, UpdateWordcloudIDInDatabase} = require('../sequelize/BotCRUDFunctions')
const {WordcloudIDContent} = require('../Models/MessageContent')
const express = require('express')

const router = express.Router()
router.post('/update/:ServID/:AuthorID', (req, res) => {
  const content = new WordcloudIDContent(
    req.params.ServID,
    req.params.AuthorID
  )
  res.type('application/json')

  try {
    const result = UpdateWordcloudIDInDatabase(content)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
  
})

router.get('/:ServID/:AuthorID', async (req, res) => {
  const content = new WordcloudIDContent(
    req.params.ServID,
    req.params.AuthorID
  )
  res.type('application/json')

  try {
    const result = await (await (RetrieveWordcloudIDFromDatabase(content))).at(0)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router