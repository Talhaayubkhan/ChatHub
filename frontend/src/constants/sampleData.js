export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Radius",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Joh Radius",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Joh Doe",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Joh Radius",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Joh Doe",
    },
    _id: "2",
  },
];
export const sampleMessages = [
  {
    // attachment: [
    //   {
    //     public_id: "1",
    //     url: "https://www.w3schools.com/howto/img_avatar.png",
    //   },
    // ],
    content: "Hey, send me Your Pic??",
    _id: "askdaksdnas2e912easnd",

    sender: { _id: "user._id", name: "John Doe" },
    chat: "chatId",
    timestamp: "2024-05-18T10:15:00Z",
    status: "sent",
  },
  {
    attachment: [
      {
        public_id: "2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    // content: "Hey, Hello i'm fine",
    _id: "khan1234kkajdassdcwwas",

    sender: { _id: "akdfj233", name: "John khan" },
    chat: "chatId",
    timestamp: "2024-05-18T10:15:00Z",
    status: "sent",
  },
];
