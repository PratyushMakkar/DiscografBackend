const {
  MessageContent,
  ChannelContent,
  ServerContent,
  WordcloudIDContent,
} = require("../Models/MessageContent");

const { v4: uuidv4 } = require('uuid');
const { sequelize } = require("./SequelConfig");
const { BotMessages, BotServers, BotChannels, BotWordcloudID} = require("./sequelModels");

async function InsertMessageIntoDatabase(messageContent) {
  await InsertChannelIDIntoServer(
    messageContent.channelID,
    messageContent.guildID
  );

  var message = await BotMessages.create({
    MessageChannelID: messageContent.channelID,
    MessageAuthorID: messageContent.author,
    MessageContent: messageContent.contentText,
  });

  const content = new MessageContent(
    message.dataValues.MessageChannelID,
    message.dataValues.MessageAuthorID,
    message.dataValues.MessageContent,
    message.dataValues.MessageTimestamp
  );
  return content;
}


async function SearchMessageWithinDatabase(channelID_, author_) {
  var results = await BotMessages.findAll({
    where: {
      MessageChannelID: channelID_,
      MessageAuthorID: author_,
    },
  });

  var ReturnValues = [];
  results.forEach((element, index) => {
    const content = new MessageContent(
      element.dataValues.MessageChannelID,
      element.dataValues.MessageAuthorID,
      element.dataValues.MessageContent,
      element.dataValues.MessageTimestamp
    );
    ReturnValues[results.length - (index + 1)] = content;
  });
  return ReturnValues;
}

async function InsertChannelIDIntoServer(channelID_, serverID_) {
  var result = await BotChannels.findOrCreate({
    where: {
      ServerID: serverID_,
      MessageChannelID: channelID_,
    },
  });

  var BotChannelJSON = result[0].dataValues;
  return new ChannelContent(
    BotChannelJSON.ServerID,
    BotChannelJSON.MessageChannelID
  );
}

async function GetChannelIDFromServer(serverID_) {
    var results = [];
    try {
        results = await BotChannels.findAll({
            where: {
              ServerID: serverID_,
            },
        });
    } catch (err) {
        console.log(err)
    }

    var ReturnValues = [];
    results.forEach((element, index) => {
        const content = new ChannelContent(
            element.dataValues.ServerID,
            element.dataValues.MessageChannelID
        );
        ReturnValues[index] = content;
    });
    return ReturnValues;
}

async function SearchMessageWithinServerDatabase(author_, serverID_) {
  var MessageResults = [];

  var channelIDs = await GetChannelIDFromServer(serverID_);
  for (var i = 0; i<channelIDs.length; ++i) {
    const MessageArray = await SearchMessageWithinDatabase(channelIDs.at(i).channelID, author_)
    MessageResults.push(...MessageArray)
  }
  return MessageResults
}

async function JoinServer(serverID_, serverName_) {
  const results = await BotServers.create({
    ServerID: serverID_,
    ServerName: serverName_,
  });

  var BotServerJSON = results.dataValues;
  return new ServerContent(
    BotServerJSON.ServerID,
    BotServerJSON.ServerName,
    BotServerJSON.DateJoined
  );
}

async function SearchServer(serverName_) {
    const results = await BotServers.findAll({
        where: {
            ServerName: serverName_
        },
    })

    var ReturnValues = [];
    results.forEach((element, index) => {
        const content = new ServerContent(
            element.dataValues.ServerID,
            element.dataValues.ServerName,
            element.dataValues.DateJoined
        );
        ReturnValues[results.length - (index + 1)] = content;
    });
    return ReturnValues;
}

async function RetrieveWordcloudIDFromDatabase(content) {
  const result = await BotWordcloudID.findOrCreate({
    where: {
      ServerID: content.serverID,
      MessageAuthorID: content.author
    },
    defaults: {
      WordcloudID: uuidv4()
    }
  })

  var BotWordcloudJson = result[0].dataValues
  const Wordcloud = new WordcloudIDContent(
    BotWordcloudJson.ServerID,
    BotWordcloudJson.MessageAuthorID,
  ).SetCreatedAt(BotWordcloudJson.createdAt)
  .SetUpdatedAt(BotWordcloudJson.updatedAt)
  .SetUniqueWordcloudID(BotWordcloudJson.WordcloudID)

  var NewRecordBool = result[1];
  return [Wordcloud, NewRecordBool]
}

async function UpdateWordcloudIDInDatabase(content) {
  await RetrieveWordcloudIDFromDatabase(content)

  const result = await BotWordcloudID.update(
    {
      WordcloudID: uuidv4()
    },
    {
      where: {
        ServerID: content.serverID,
        MessageAuthorID: content.author
      },
      returning: true
    }, 
  )
  var AffectedRows = result[0];
  if (AffectedRows==0 || (AffectedRows>1)) {
    throw new Error("No rows were affected or more than one row was affected")
  }

  var BotWordcloudJson = result.at(1).at(0).dataValues;
  const Wordcloud = new WordcloudIDContent(
    BotWordcloudJson.ServerID,
    BotWordcloudJson.MessageAuthorID,
  ).SetCreatedAt(BotWordcloudJson.createdAt)
  .SetUpdatedAt(BotWordcloudJson.updatedAt)
  .SetUniqueWordcloudID(BotWordcloudJson.WordcloudID)

  return Wordcloud
}

async function ClearAllTables() {
  await BotChannels.sync({ force: true });
  await BotServers.sync({ force: true });
  await BotMessages.sync({ force: true });
  await BotWordcloudID.sync({force: true});
}

async function CloseConnection() {
  sequelize.close();
}

module.exports = {
  InsertChannelIDIntoServer,
  InsertMessageIntoDatabase,
  JoinServer,
  ClearAllTables,
  GetChannelIDFromServer,
  SearchMessageWithinDatabase,
  SearchMessageWithinServerDatabase,
  SearchServer,
  CloseConnection,
  RetrieveWordcloudIDFromDatabase,
  UpdateWordcloudIDInDatabase
};
