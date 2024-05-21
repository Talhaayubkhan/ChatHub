import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import moment from "moment";
// import { AvatarCard } from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";
import RenderAttachMent from "../../components/shared/RenderAttachMent";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    flex: 0.5,
    minWidth: 20,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    flex: 0.5,
    minWidth: 180,
    renderCell: (params) => {
      const { attachments } = params.row;
      return attachments?.length > 0
        ? attachments.map((attachment) => {
            const url = attachment.url;
            const file = fileFormat(url);
            return (
              <Box key={attachment._id}>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "25px",
                  }}
                >
                  {RenderAttachMent(file, url)}
                </a>
              </Box>
            );
          })
        : "No attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Stack direction="row" spacing={"1rem"} alignItems="center">
        <Avatar src={params.row.sender.avatar} alt={params.row.sender.name} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    flex: 0.75,
    minWidth: 100,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    flex: 0.75,
    minWidth: 120,
    renderCell: (params) => (
      <Typography variant="body1">
        {moment(params.row.createdAt).format("MMMM Do YYYY")}
      </Typography>
    ),
  },
];
const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.messages.map((message) => ({
        ...message,
        id: message._id,
        sender: {
          name: message.sender.name,
          avatar: transformImage(message.sender.avatar, 80),
        },
      }))
    );
  }, []);
  return (
    <>
      <AdminLayout>
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      </AdminLayout>
    </>
  );
};

export default MessageManagement;
