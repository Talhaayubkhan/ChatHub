// Table.js
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container sx={{ height: "80vh", paddingTop: "2rem" }}>
      <Paper
        elevation={3}
        sx={{
          margin: "auto",
          padding: "1rem",
          borderRadius: "1rem",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            margin: "1rem 0",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {heading}
        </Typography>
        <div style={{ height: "calc(100% - 4rem)" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={rowHeight}
            sx={{
              "& .MuiDataGrid-colCell, & .MuiDataGrid-cell": {
                borderRight: "2px solid black",
              },
              "& .table-header": {
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default Table;
