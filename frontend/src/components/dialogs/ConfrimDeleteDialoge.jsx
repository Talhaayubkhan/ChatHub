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

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
// } from "@mui/material";

// const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Confirm Deletion</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           {/* TODO: if we store them in shared components to use in mutliple places? */}
//           Are you sure you want to delete this item?
//         </DialogContentText>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             marginTop: "1rem",
//           }}
//         >
//           <Button onClick={handleClose} color="primary">
//             Yes
//           </Button>
//           <Button
//             onClick={deleteHandler}
//             color="error"
//             variant="contained"
//             style={{ marginLeft: "1rem" }}
//           >
//             No
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ConfirmDeleteDialog;

import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: "24px",
    background: "#ffffff",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    width: "95%",
    maxWidth: "450px",
    margin: "16px",
  },
}));

const DialogHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "24px",
});

const WarningIcon = styled("div")({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "#FEE2E2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "16px",
  "&::before": {
    content: '"!"',
    fontSize: "40px",
    fontWeight: "bold",
    color: "#DC2626",
  },
});

const StyledTitle = styled(DialogTitle)({
  padding: 0,
  margin: 0,
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#1F2937",
  textAlign: "center",
});

const StyledContent = styled(DialogContent)({
  padding: "0 16px",
  color: "#4B5563",
  fontSize: "1rem",
  textAlign: "center",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "32px",
  gap: "16px",
});

const StyledButton = styled("button")(({ isPrimary }) => ({
  padding: "12px 24px",
  borderRadius: "12px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  ...(isPrimary
    ? {
        backgroundColor: "#DC2626",
        color: "white",
        "&:hover": {
          backgroundColor: "#B91C1C",
        },
      }
    : {
        backgroundColor: "#F3F4F6",
        color: "#4B5563",
        "&:hover": {
          backgroundColor: "#E5E7EB",
        },
      }),
}));

const ConfirmDeleteGroupDialog = ({
  open,
  handleClose,
  deleteHandler,
  groupName,
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogHeader>
        <WarningIcon />
        <StyledTitle id="alert-dialog-title">Delete Group Chat?</StyledTitle>
      </DialogHeader>
      <StyledContent id="alert-dialog-description">
        <p>Are you sure you want to delete the group "{groupName}"?</p>
        <p style={{ marginTop: "16px", fontWeight: "bold", color: "#DC2626" }}>
          This action cannot be undone. All messages and shared content will be
          permanently deleted for all members.
        </p>
      </StyledContent>
      <ButtonContainer>
        <StyledButton onClick={handleClose}>Cancel</StyledButton>
        <StyledButton isPrimary onClick={deleteHandler}>
          Delete Group
        </StyledButton>
      </ButtonContainer>
    </StyledDialog>
  );
};

export default ConfirmDeleteGroupDialog;
