class MessageContent {
  constructor(channelID, author, contentText, timestamp) {
    this.channelID = channelID;
    this.author = author;
    this.contentText = contentText;
    this.timestamp = timestamp;
    this.guildID = "0";
  }

  SetGuildID(guildID_) {
    this.guildID = guildID_;
    return this;
  }
}

class ChannelContent {
  constructor(serverID, channelID) {
    this.serverID = serverID;
    this.channelID = channelID;
  }
}

class ServerContent {
  constructor(serverID_, serverName_, dateJoined_) {
    this.serverID = serverID_;
    this.serverName = serverName_;
    this.dateJoined = dateJoined_;
  }
}

class WordcloudIDContent {
  constructor(ServerID_, authorId_) {
    this.author = authorId_;
    this.serverID = ServerID_;
  }
  SetUniqueWordcloudID(wordcloudID_) {
    this.wordcloudID = wordcloudID_;
    return this;
  }
  SetCreatedAt(timestamp_) {
    this.createdAt = timestamp_
    return this;
  }
  SetUpdatedAt(timestamp_) {
    this.updatedAt = timestamp_
    return this;
  }

}

module.exports = { MessageContent, ChannelContent, ServerContent, WordcloudIDContent};
