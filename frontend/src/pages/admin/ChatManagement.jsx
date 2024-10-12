import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Stack, Avatar, Typography } from "@mui/material";
// latter we use this moment
// import moment from "moment";
// import { dashboardData } from "../../constants/sampleData";
import AvatarCard from "../../components/shared/AvatarCard";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";

//TODO: Note we just all Tables later to ajust on normal screen

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 250,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 350,
    renderCell: (params) => {
      // we increase also to 100
      return <AvatarCard max={100} avatar={params.row.members} />;
    },
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 250,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    renderCell: (params) => (
      <Stack direction="row" alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
        {/* we Adjust this later */}
        {/* <Typography variant="body1">
          {moment(params.row.joined).format("MMMM Do YYYY")}
        </Typography> */}
      </Stack>
    ),
    width: 200,
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // setRows(dashboardData.users.map((user) => ({ ...user, id: user._id })));
    setRows(
      dashboardData.chats.map((user) => ({
        ...user,
        id: user._id,
        avatar: user.avatar.map((user) => transformImage(user, 80)),
        // show member with avatar images
        members: user.members.map((user) => transformImage(user?.avatar, 80)),
        // show creator with avatar images
        creator: {
          name: user.creator.name,
          avatar: transformImage(user?.creator?.avatar, 80),
        },
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
