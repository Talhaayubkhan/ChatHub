import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";
const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <>
      <Container sx={{ height: "100vh" }}>
        <Paper
          elevation={3}
          sx={{
            margin: "auto",
            padding: "1rem 4rem",
            borderRadius: "1rem",
            width: "100%",
            height: "100",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <Typography
            textAlign={"center"}
            variant="h4"
            sx={{ margin: "2rem", textTransform: "uppercase" }}
          >
            {heading}
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={rowHeight}
            style={{
              height: "80%",
            }}
            sx={{
              border: "none",
              ".table-header": {
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
              },
            }}
          />
        </Paper>
      </Container>
    </>
  );
};

export default Table;
