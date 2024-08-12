import { Grid, Skeleton, Stack } from "@mui/material";

// Loader component to show skeletons during data fetch

export const LayoutLoaders = () => {
  return (
    <>
      <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
        <Grid
          item
          sm={4}
          md={3}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          height={"100%"}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} lg={6} height={"100vh"}>
          <Stack spacing={"1rem"}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton variant="rectangular" height={"4.5rem"} key={i} />
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
          }}
          height={"100vh"}
          bgcolor="primary.main"
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
      </Grid>
    </>
  );
};
