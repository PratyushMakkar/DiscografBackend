const { MessageContent } = require("../Models/MessageContent");
const {InsertChannelIDIntoServer, InsertMessageIntoDatabase, SearchMessageWithinDatabase
, GetChannelIDFromServer, JoinServer, ClearAllTables, CloseConnection, SearchServer} = require("../sequelize/BotCRUDFunctions");

const content = new MessageContent(
    "ChannelID2",
    "Author#2",
    "This is content for author 2",
    "15:16:17 UTC"
)

describe('Ensuring that all messages are added into the server', () => {
        beforeAll(async ()=> {
           await ClearAllTables();
        });
        
        test('Testing if an inputted message can be retrieved', async ()=> {
            const messageResult = await InsertMessageIntoDatabase(content);
            const result = await SearchMessageWithinDatabase(
                content.channelID,
                content.author
            );
            expect(result.at(0)).toStrictEqual(messageResult);
        })

        test('Test to determine if duplicate channelIDs are inserted into BotChannels', async () => {
            let ServerName = "ServerTest&872D"
            let ServerID = "ServerID78^"
            const ServerResult = await JoinServer(ServerID, ServerName);
            
            var channels = []
            for (var i = 0; i<4; ++i) {
                const result = await InsertChannelIDIntoServer("ChannelId", ServerID);
                channels[i] = result
            }

            var ReturnValues = await GetChannelIDFromServer(ServerID);
            expect(ReturnValues.length).toBe(1)
            expect(ReturnValues[0]).toStrictEqual(channels[0])
        })

        test("Test to determine if the JoinServer functions", async () => {
            let ServerName = "ServerName%123";
            const ServerResult = await JoinServer("ServerID#234", ServerName)
            const SearchServerResult = await SearchServer(ServerName)

            expect(SearchServerResult.at(0)).toStrictEqual(ServerResult)
        })

        test("Test to determine if all ChannelIDs can be found from a server", async () => {
            let ServerName = "ServerTest&872D"
            let ServerID = "ServerID871%^"
            const ServerResult = await JoinServer(ServerID, ServerName);
            
            var channels = []
            for (var i = 0; i<4; ++i) {
                const result = await InsertChannelIDIntoServer("ChannelId"+i, ServerID);
                channels[i] = result
            }
            var ReturnValues = await GetChannelIDFromServer(ServerID);
            
            for (var i =0 ; i<4; ++i) {
                expect(ReturnValues.at(i)).toStrictEqual(channels.at(i));
            }
        })

        afterAll(async () => {
            await ClearAllTables();
            await CloseConnection();
        });

    }
)