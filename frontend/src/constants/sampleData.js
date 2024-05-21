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

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      username: "John_Doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "John Radius",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      username: "John_Radius",
      friends: 30,
      groups: 52,
    },
  ],

  chats: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Hello khan",
      _id: "1",
      groupChat: false,
      members: [
        { _id: 1, avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: 2, avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 30,
      creator: {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Radius",
      },
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "khan khan",
      _id: "2",
      groupChat: false,
      members: [
        { _id: 1, avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: 2, avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 30,
      creator: {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Radius",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "Hey, send me Your Pic??",
      _id: "1",
      sender: {
        _id: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
      },
      chatId: "1",
      groupChat: false,
      createdAt: "2024-05-18T10:15:00Z",
      status: "sent",
    },
    {
      attachments: [
        {
          public_id: "2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Hey, Hello i'm fine",
      _id: "2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John khan",
      },
      chatId: "2",
      groupChat: false,
      createdAt: "2024-05-18T10:15:00Z",
      status: "sent",
    },
  ],
};
