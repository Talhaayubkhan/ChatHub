import { User, Chat, Message } from "../models/index.js";
import { faker, simpleFaker } from "@faker-js/faker";

const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatPromise);
    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.error("Error creating chats:", error);
    process.exit(1);
  }
};

const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];

    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];
      for (let i = 0; i < numMembers; i++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUsers = users[randomIndex];

        if (!members.includes(randomUsers)) {
          members.push(randomUsers);
        }
      }

      const chat = await Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      });
      chatPromise.push(chat);
    }
    await Promise.all(chatPromise);
    console.log("Chats created successfully");
    process.exit();
  } catch (error) {
    console.error("Error creating chats:", error);
    process.exit(1);
  }
};

const createMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagePromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      messagePromise.push(
        Message.create({
          content: faker.lorem.sentence(),
          chat: randomChat,
          sender: randomUser,
        })
      );
    }
    await Promise.all(messagePromise);
    // console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.error("Error creating chats:", error);
    process.exit(1);
  }
};

const createMessageInChats = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");
    const messagePromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      messagePromise.push(
        Message.create({
          content: faker.lorem.sentence(),
          chat: chatId,
          sender: randomUser,
        })
      );
    }
    await Promise.all(messagePromise);
    console.log("Messages created successfully");
    process.exit();
  } catch (error) {
    console.error("Error creating chats:", error);
    process.exit(1);
  }
};

export {
  createSingleChats,
  createGroupChats,
  createMessages,
  createMessageInChats,
};
