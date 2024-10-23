import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Skeleton, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import moment from "moment";
import { dashboardData } from "../../constants/sampleData";
import { useFetchData } from "6pp";
import { useErrors } from "../../hooks/hooks";
import server from "../../constants/config";
import { transformImage } from "../../lib/features";

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
  const { data, isLoading, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  console.log(data);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data?.transformData?.map((user) => ({
          ...user,
          id: user._id,
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table heading={"All Users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UsersManagement;
