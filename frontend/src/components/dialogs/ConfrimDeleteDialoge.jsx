// import {
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import React from "react";

// const ConfrimDeleteDialoge = ({ open, handleClose, deleteHandler }) => {
//   return (
//     <>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Confrim to Delete it Permanantly?</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this dialog?
//           </DialogContentText>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default ConfrimDeleteDialoge;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* TODO: if we store them in shared components to use in mutliple places? */}
          Are you sure you want to delete this item?
        </DialogContentText>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Button onClick={handleClose} color="primary">
            Yes
          </Button>
          <Button
            onClick={deleteHandler}
            color="error"
            variant="contained"
            style={{ marginLeft: "1rem" }}
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
