const {RetrieveServerIDFromDatabase, SearchMessageWithinServerDatabase} = require('../sequelize/BotCRUDFunctions')
const express = require('express')
const {API_KEY, API_URL} = require('../config.json')
const { default: axios } = require('axios')

const router = express.Router()
router.get('/:wordcloudID/', async (req, res) => {
  res.type('application/json')

  let wordCloudID = req.params.wordcloudID
  let result = null

  try {
    result = await RetrieveServerIDFromDatabase(wordCloudID)
  } catch (error) {
    console.log(error)
  }
  
  if (result === null) {
    res.sendStatus(400)
    return
  }

  //var messages = await SearchMessageWithinServerDatabase(result.author, result.serverID)
  var wordcloud = await GetWordcloud(result.author, result.serverID)
  res.send(wordcloud)
})

async function GetWordcloud(authorID, serverID) {
  const result = await axios.get(
    API_URL.concat("/wordcloud/").concat(authorID+"/").concat(serverID) 
  ).catch(function (error) {
    console.log(error)
  })
  return result['data']
}

module.exports = router