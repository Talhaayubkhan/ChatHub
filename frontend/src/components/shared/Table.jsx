// Table.js
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "calc(100dvh - 6rem)",
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          margin: "auto",
          padding: { xs: "0.5rem", sm: "1rem" },
          borderRadius: "1rem",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            margin: { xs: "0.5rem 0", sm: "1rem 0" },
            fontSize: { xs: "1.35rem", sm: "2rem" },
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
