import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import moment from "moment";
import { dashboardData } from "../../constants/sampleData";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 130,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 138,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 125,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "joined",
    headerName: "Joined",
    headerClassName: "table-header",
    renderCell: (params) => (
      <Typography variant="body1">
        {moment(params.row.joined).format("MMMM Do YYYY")}
      </Typography>
    ),
    width: 125,
  },
];

const UsersManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dashboardData.users.map((user) => ({ ...user, id: user._id })));
  }, []);

  return (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UsersManagement;
