const { MessageContent, WordcloudIDContent} = require("../Models/MessageContent");
const {InsertChannelIDIntoServer, InsertMessageIntoDatabase, SearchMessageWithinDatabase
,GetChannelIDFromServer, SearchMessageWithinServerDatabase, JoinServer, ClearAllTables, CloseConnection, SearchServer, RetrieveWordcloudIDFromDatabase, UpdateWordcloudIDInDatabase} = require("../sequelize/BotCRUDFunctions");

const content = new WordcloudIDContent(
  "ServerID#1234",
  "AuthorID&873"
)


describe('Tests to determine if Wordcloud IDs are generated per specification', () => {
  beforeAll(async () => {
    await ClearAllTables();
  });

  beforeEach(async () => {
    await RetrieveWordcloudIDFromDatabase(content)
  });

  test('Test to determine if duplicate Wordcloud IDs are generated when Retrieve is called', async ()=> {
    const result = await RetrieveWordcloudIDFromDatabase(content)
    expect(result[1]).toBe(false)
  })

  test('Test to determine if a Wordcloud ID and updatedAt is updated when UpdatedWordcloudID is called', async ()=> {
    var RetrievedContent =  (await RetrieveWordcloudIDFromDatabase(content)).at(0)
    const result = await UpdateWordcloudIDInDatabase(content)

    expect(result.author).toStrictEqual(RetrievedContent.author)
    expect(result.createdAt).toStrictEqual(RetrievedContent.createdAt)
    expect(result.serverID).toStrictEqual(RetrievedContent.serverID)
    expect(result.updatedAt).not.toStrictEqual(RetrievedContent.updatedAt)
    expect(result.wordcloudID).not.toStrictEqual(RetrievedContent.wordcloudID)
  })

  afterAll(async () => {
    await ClearAllTables();
    await CloseConnection();
  });
})