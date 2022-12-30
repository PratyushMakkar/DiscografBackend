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

module.exports = { MessageContent, ChannelContent, ServerContent };
