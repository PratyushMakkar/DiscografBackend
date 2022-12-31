const {v4: uuidv4} = require('uuid')
const { MessageContent, WordcloudIDContent} = require("../Models/MessageContent");
const {InsertChannelIDIntoServer, InsertMessageIntoDatabase, SearchMessageWithinDatabase
,GetChannelIDFromServer, SearchMessageWithinServerDatabase, JoinServer, ClearAllTables, CloseConnection, SearchServer, RetrieveWordcloudIDFromDatabase, UpdateWordcloudIDInDatabase, RetrieveServerIDFromDatabase} = require("../sequelize/BotCRUDFunctions");

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

  test("Test to determine if the serverID can be retrieved from databse using wordcloudIF", async () => {
    var RetrievedContent =  (await RetrieveWordcloudIDFromDatabase(content)).at(0)
    const result = await RetrieveServerIDFromDatabase(RetrievedContent.wordcloudID)
    expect(result.author).toStrictEqual(RetrievedContent.author)
    expect(result.createdAt).toStrictEqual(RetrievedContent.createdAt)
    expect(result.serverID).toStrictEqual(RetrievedContent.serverID)
  })

  test("Test to determine if the return type is null when using invalid wordcloudID", async () => {
    const result = await RetrieveServerIDFromDatabase(uuidv4())
    expect(result).toBe(null)
  })

  afterAll(async () => {
    await ClearAllTables();
    await CloseConnection();
  });
})