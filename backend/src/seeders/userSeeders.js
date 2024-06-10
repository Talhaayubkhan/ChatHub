import { User } from "../models/User.Models.js";
import { faker } from "@faker-js/faker";
const createUser = async (numUsers) => {
  try {
    const userPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      userPromise.push(tempUser);
    }

    await Promise.all(userPromise);
    process.exit(1);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  }
};

// createUser(10);
export { createUser };
//
