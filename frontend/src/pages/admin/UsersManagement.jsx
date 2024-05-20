import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
];
const UsersManagement = () => {
  const [rows, setRows] = useState([]);
  return (
    <>
      <AdminLayout>
        <Table heading={"ALL Users"} columns={columns} rows={rows} />
      </AdminLayout>
    </>
  );
};

export default UsersManagement;
