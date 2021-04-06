const { User } = require("./api/models/User");
const { ObjectID } = require('mongodb');
const { mongoose } = require("./api/db/mongoose"); // import connection

// create test user with hard coded _id for now, until context is working correctly.
module.exports.initUser = async() => {

    try {
        const agent = new User({
            _id: ObjectID("507f191e810c19729de860ea"),
            username: "user",
            password: "password",
            accountType: "agent",
            firstName: "Jason",
            lastName: "Hu",
            email: "test@test.ca",
            phone: "1234567899",
            bio: "Lorem ipsum",
        }); 

        const result = await agent.save();

        console.log(result);

    } catch (error) {
        console.log(error);
    }

    process.exit();
}