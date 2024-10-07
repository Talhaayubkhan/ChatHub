// import { Grid, Skeleton, Stack } from "@mui/material";

// // Loader component to show skeletons during data fetch

// export const LayoutLoaders = () => {
//   return (
//     <>
//       <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
//         <Grid
//           item
//           sm={4}
//           md={3}
//           sx={{
//             display: { xs: "none", sm: "block" },
//           }}
//           height={"100%"}
//         >
//           <Skeleton variant="rectangular" height={"100vh"} />
//         </Grid>
//         <Grid item xs={12} sm={8} md={5} lg={6} height={"100vh"}>
//           <Stack spacing={"1rem"}>
//             {Array.from({ length: 10 }).map((_, i) => (
//               <Skeleton variant="rectangular" height={"4.5rem"} key={i} />
//             ))}
//           </Stack>
//         </Grid>
//         <Grid
//           item
//           md={4}
//           lg={3}
//           sx={{
//             display: { xs: "none", md: "block" },
//           }}
//           height={"100vh"}
//           bgcolor="primary.main"
//         >
//           <Skeleton variant="rectangular" height={"100vh"} />
//         </Grid>
//       </Grid>
//     </>
//   );
// };

import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponent";

const LayoutLoaders = () => {
  return (
    <Grid container spacing={2} sx={{ height: "calc(100vh - 50px)" }}>
      <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }}>
        <Skeleton variant="rectangular" height="100%" animation="wave" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6}>
        <Stack spacing={2} height="100vh" overflow="hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={90}
              animation="wave"
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Stack>
      </Grid>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Skeleton variant="rectangular" height="100vh" animation="wave" />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      {[0.1, 0.2, 0.3, 0.5].map((delay, index) => (
        <BouncingSkeleton
          key={index}
          variant="circular"
          width={10}
          height={10}
          style={{
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </Stack>
  );
};
export { LayoutLoaders, TypingLoader };
