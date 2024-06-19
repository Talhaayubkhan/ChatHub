import { StatusCodes } from "http-status-codes";
import { Chat, Message, User } from "../models/index.js";
import { NotFound, Unauthorized } from "../errors/index.js";
import { cookieResponse, createJWT } from "../utils/jwtToken.js";

const adminLogin = async (req, res) => {
  const { secretKey } = req.body;

  const adminSecretKey =
    process.env.ADMIN_SECRET_KEY || "HIHELLOkhanALLOKHHELLO";

  const isMatchSecretKey = secretKey === adminSecretKey;

  if (!isMatchSecretKey) {
    throw new Unauthorized("Invalid secret key");
  }

  const createToken = createJWT(secretKey, adminSecretKey);
  cookieResponse("token", token, {
    maxAge: 1000 * 60 * 15,
    httpOnly: true,
    secure: true,
  });
  return res.status(StatusCodes.OK).json({
    success: true,
    token: createToken,
  });
};
const getAllUsers = async (req, res) => {
  const users = await User.find({});

  // Transform user data to include additional chat details
  // Use Promise.all to handle the array of promises returned by the async map function
  const transformData = await Promise.all(
    users.map(async ({ _id, name, avatar, username }) => {
      // Count the number of group and direct chats for each user
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }), // Count group chats
        Chat.countDocuments({ groupChat: false, members: _id }), // Count direct chats
      ]);

      return {
        _id,
        name,
        avatar: avatar?.url || "No Avatar Available",
        username,
        groups,
        friends,
      };
    })
  );
  if (!transformData) {
    throw new NotFound("No transform data available");
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    transformData,
    total: users.length,
  });
};

const getAllChats = async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  if (chats.length === 0) {
    throw new NotFound("No chats available");
  }

  const transformChats = await Promise.all(
    chats.map(async ({ members, _id, name, groupChat, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });

      return {
        _id,
        name,
        groupChat,
        avatar: members.slice(0, 3).map((member) => member.avatar?.url),
        members: members.map(({ _id, name, avatar }) => {
          return {
            _id,
            name,
            avatar: avatar?.url || "No Avatar Available",
          };
        }),
        creator: {
          name: creator?.name || "No Creator Available",
          avatar: creator?.avatar?.url || "No Avatar Available",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    chats: transformChats,
    total: chats.length,
  });
};

const getAllMessages = async (req, res) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformMessages = messages.map(
    ({ _id, content, attachment, sender, createdAt, chat }) => {
      return {
        _id,
        content,
        attachment,
        createdAt,
        sender: {
          _id: sender._id,
          name: sender.name || "None",
          avatar: sender?.avatar?.url || "No Avatar Available",
        },
        chat: {
          _id: chat._id,
          name: chat.name,
          groupChat: chat.groupChat,
        },
      };
    }
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    messages: transformMessages,
    total: messages.length,
  });
};

const adminDashboardStats = async (req, res) => {
  const [usersCount, groupsCount, messagesCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments({}),
      Message.countDocuments({}),
      Chat.countDocuments({}),
    ]);

  // show last seven days messages history on admin dashboard

  const todayDate = new Date();

  const lastSevenDays = new Date();
  lastSevenDays.setDate(lastSevenDays.getDate() - 7);

  const lastSevenDaysMessages = await Message.find({
    createdAt: {
      $gte: lastSevenDays,
      $lte: todayDate,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);

  const daysInMilliSeconds = 1000 * 60 * 60 * 24;

  lastSevenDaysMessages.forEach((message) => {
    const indexApprox =
      (todayDate.getTime() - message.createdAt.getTime()) / daysInMilliSeconds;
    const index = Math.floor(indexApprox);
    messages[6 - index]++;
  });

  const dashboardStats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
    messagesChart: messages,
  };

  return res.status(StatusCodes.OK).json({
    success: true,
    dashboardStats,
  });
};

export {
  adminLogin,
  getAllUsers,
  getAllChats,
  getAllMessages,
  adminDashboardStats,
};
