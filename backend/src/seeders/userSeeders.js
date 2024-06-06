import { User } from "../models/User.Models.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const createUser = async (numUsers) => {
  try {
    let numUsers = 10;
    const userPromise = [];

    if (numUsers > 10) {
      return;
    }

    for (let i = 0; i < numUsers; i++) {
      const hashedPassword = await bcrypt.hash("123", 10); // Hashing the password

      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(20),
        password: hashedPassword, // Use hashed password
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      userPromise.push(tempUser);
    }

    await Promise.all(userPromise);
    console.log("Users created successfully");
  } catch (error) {
    console.error("Error creating users:", error);
    throw error; // Let the caller handle the process exit
  }
};

export { createUser };
