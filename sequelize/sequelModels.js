const { Sequelize, DataTypes, Model } = require("sequelize"); // NOTE: Sequelize is not being used
const { sequelize } = require("./SequelConfig");

class BotChannels extends Model {}
class BotMessages extends Model {}
class BotServers extends Model {}
class BotWordcloudID extends Model{}

BotChannels.init(
  {
    ServerID: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    MessageChannelID: {
      primaryKey: true,
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: sequelize,
    tableName: "BotChannels",
  }
);

BotMessages.init(
  {
    MessageChannelID: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    MessageAuthorID: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    MessageContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "MessageTimestamp",
    updatedAt: false,
    sequelize: sequelize,
    tableName: "BotMessages",
  }
).removeAttribute("id");

BotServers.init(
  {
    ServerID: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ServerName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    createdAt: "DateJoined",
    timestamps: true,
    updatedAt: false,
    sequelize: sequelize,
    tableName: "BotServers",
  }
);

BotWordcloudID.init(
  {
    WordcloudID: {
      type: Sequelize.UUID,
      allowNull: false
    },
    ServerID: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    MessageAuthorID: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    timestamps: true,
    updatedAt: true,
    sequelize: sequelize,
    tableName: "WordcloudID",
  }
).removeAttribute("id");;

module.exports = {
  BotChannels,
  BotServers,
  BotMessages,
  BotWordcloudID,
};
