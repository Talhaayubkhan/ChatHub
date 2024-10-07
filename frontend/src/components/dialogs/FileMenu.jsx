// import {
//   ListItemText,
//   Menu,
//   MenuItem,
//   Stack,
//   Tooltip,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setIsFileMenuOpen,
//   setUploadingLoader,
// } from "../../redux-toolkit/reducers/misc";
// import {
//   AudioFile as AudioFileIcon,
//   Image as ImageIcon,
//   UploadFile as UploadFileIcon,
//   VideoFile as VideoFileIcon,
// } from "@mui/icons-material";
// import { useRef } from "react";
// import toast from "react-hot-toast";
// import { useSendFileAttachmentsMutation } from "../../redux-toolkit/api/apiSlice";

// const FileUploadMenu = ({ anchorElement, chatId }) => {
//   const { isFileMenuOpen } = useSelector((state) => state.misc);
//   const dispatch = useDispatch();

//   // Refs for each file input
//   const imageInputRef = useRef(null);
//   const audioInputRef = useRef(null);
//   const videoInputRef = useRef(null);
//   const generalFileInputRef = useRef(null);

//   const [sendFileAttachments] = useSendFileAttachmentsMutation();

//   // Handler for closing the file upload menu
//   const closeFileMenu = () => {
//     dispatch(setIsFileMenuOpen(false));
//   };

//   // Helper functions to programmatically trigger hidden file inputs
//   const triggerImageUpload = () => imageInputRef.current?.click();
//   const triggerAudioUpload = () => audioInputRef.current?.click();
//   const triggerVideoUpload = () => videoInputRef.current?.click();
//   const triggerFileUpload = () => generalFileInputRef.current?.click();

//   // Handle file change event
//   const handleFileSelection = async (e, key) => {
//     const files = Array.from(e.target.files); // Convert FileList to array
//     if (files.length === 0) return; // No files selected

//     // Check if the number of selected files exceeds the allowed limit
//     if (files.length > 5) {
//       return toast.error(`You can only upload up to 5 ${key} files at a time.`);
//     }

//     // Set loader to true and show initial toast message
//     dispatch(setUploadingLoader(true));
//     const toastId = toast.loading(`Sending ${key}...`);
//     closeFileMenu(); // Close file menu when the upload starts

//     try {
//       const formData = new FormData();
//       formData.append("chatId", chatId);

//       // Append each selected file to the FormData
//       files.forEach((file) => formData.append("files", file));

//       // Send files using API call
//       const response = await sendFileAttachments(formData);
//       // console.log(response);

//       if (response.data) {
//         toast.success(`Successfully uploaded ${files.length} ${key} file!`, {
//           id: toastId,
//         });
//       } else {
//         throw new Error(response?.message || "An unknown error occurred.");
//       }
//     } catch (error) {
//       // If an error occurs, show detailed error messages based on error type
//       toast.error(
//         `Failed to upload ${key} file(s). ${
//           error.response?.data?.message || error.message || "An error occurred."
//         }`,
//         { id: toastId }
//       );
//     } finally {
//       // Always stop the loader, even in case of an error
//       dispatch(setUploadingLoader(false));
//     }
//   };

//   return (
//     <Menu
//       anchorEl={anchorElement}
//       open={isFileMenuOpen}
//       onClose={closeFileMenu}
//       PaperProps={{
//         style: {
//           width: "240px",
//           borderRadius: "12px",
//           padding: "8px",
//           boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for modern UI
//         },
//       }}
//     >
//       <Stack spacing={1}>
//         <Typography
//           variant="subtitle1"
//           align="center"
//           sx={{ fontWeight: 600, mb: 1 }}
//         >
//           Select File to Upload
//         </Typography>

//         {/* Image Upload */}
//         <MenuItem
//           sx={{
//             "&:hover": { backgroundColor: "#f5f5f5" },
//             borderRadius: "8px",
//           }}
//           onClick={triggerImageUpload}
//         >
//           <Tooltip title="Upload Image" placement="right">
//             <ImageIcon style={{ fontSize: 24, color: "#1976d2" }} />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: 10 }}>
//             <Typography variant="body2">Image</Typography>
//           </ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="image/png, image/jpeg, image/gif"
//             style={{ display: "none" }}
//             onChange={(e) => handleFileSelection(e, "Image")}
//             ref={imageInputRef}
//           />
//         </MenuItem>

//         <Divider />

//         {/* Audio Upload */}
//         <MenuItem
//           sx={{
//             "&:hover": { backgroundColor: "#f5f5f5" },
//             borderRadius: "8px",
//           }}
//           onClick={triggerAudioUpload}
//         >
//           <Tooltip title="Upload Audio" placement="right">
//             <AudioFileIcon style={{ fontSize: 28, color: "#1976d2" }} />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: 10 }}>
//             <Typography variant="body2">Audio</Typography>
//           </ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="audio/mpeg, audio/wav"
//             style={{ display: "none" }}
//             onChange={(e) => handleFileSelection(e, "Audios")}
//             ref={audioInputRef}
//           />
//         </MenuItem>

//         <Divider />

//         {/* General File Upload */}
//         <MenuItem
//           sx={{
//             "&:hover": { backgroundColor: "#f5f5f5" },
//             borderRadius: "8px",
//           }}
//           onClick={triggerFileUpload}
//         >
//           <Tooltip title="Upload File" placement="right">
//             <UploadFileIcon style={{ fontSize: 28, color: "#1976d2" }} />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: 10 }}>
//             <Typography variant="body2">File Upload</Typography>
//           </ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="*"
//             style={{ display: "none" }}
//             onChange={(e) => handleFileSelection(e, "Files")}
//             ref={generalFileInputRef}
//           />
//         </MenuItem>

//         <Divider />

//         {/* Video Upload */}
//         <MenuItem
//           sx={{
//             "&:hover": { backgroundColor: "#f5f5f5" },
//             borderRadius: "8px",
//           }}
//           onClick={triggerVideoUpload}
//         >
//           <Tooltip title="Upload Video" placement="right">
//             <VideoFileIcon style={{ fontSize: 28, color: "#1976d2" }} />
//           </Tooltip>
//           <ListItemText style={{ marginLeft: 10 }}>
//             <Typography variant="body2">Video</Typography>
//           </ListItemText>
//           <input
//             type="file"
//             multiple
//             accept="video/mp4, video/webm, video/ogg"
//             style={{ display: "none" }}
//             onChange={(e) => handleFileSelection(e, "Videos")}
//             ref={videoInputRef}
//           />
//         </MenuItem>
//       </Stack>
//     </Menu>
//   );
// };

// export default FileUploadMenu;

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  Divider,
  Box,
  alpha,
} from "@mui/material";
import {
  setIsFileMenuOpen,
  setUploadingLoader,
} from "../../redux-toolkit/reducers/misc";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSendFileAttachmentsMutation } from "../../redux-toolkit/api/apiSlice";

// Custom color palette
const colors = {
  primary: "#3A0CA3",
  secondary: "#4361EE",
  accent: "#7209B7",
  background: "#F0F4F8",
  text: "#2B2D42",
  lightText: "#FFFFFF",
  hover: "#4CC9F0",
};

const FileUploadMenu = ({ anchorElement, chatId }) => {
  const { isFileMenuOpen } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const generalFileInputRef = useRef(null);

  const [sendFileAttachments] = useSendFileAttachmentsMutation();

  const closeFileMenu = () => {
    dispatch(setIsFileMenuOpen(false));
  };

  const triggerUpload = (ref) => () => ref.current?.click();

  const handleFileSelection = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (files.length > 5) {
      return toast.error(`You can only upload up to 5 ${key} files at a time.`);
    }

    dispatch(setUploadingLoader(true));
    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      // fetching
      const formData = new FormData();
      formData.append("chatId", chatId);
      files.forEach((file) => formData.append("files", file));

      const response = await sendFileAttachments(formData);

      if (response?.data) {
        toast.success(`Successfully uploaded ${files.length} ${key} file!`, {
          id: toastId,
        });
      } else {
        throw new Error(response?.message || "An unknown error occurred.");
      }
    } catch (error) {
      toast.error(
        `Failed to upload ${key} file(s). ${
          error.response?.data?.message || error.message || "An error occurred."
        }`,
        { id: toastId }
      );
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  const UploadMenuItem = ({ icon: Icon, label, inputRef, accept }) => (
    <MenuItem
      onClick={triggerUpload(inputRef)}
      sx={{
        borderRadius: "8px",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: alpha(colors.hover, 0.1),
          transform: "translateY(-2px)",
        },
      }}
    >
      <Tooltip title={`Upload ${label}`} placement="right">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            borderRadius: "50%",
            backgroundColor: alpha(colors.primary, 0.1),
          }}
        >
          <Icon sx={{ fontSize: 25, color: colors.primary }} />
        </Box>
      </Tooltip>
      <ListItemText
        primary={label}
        sx={{
          ml: 2,
          "& .MuiTypography-root": {
            fontWeight: 500,
            color: colors.text,
          },
        }}
      />
      <input
        type="file"
        multiple
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => handleFileSelection(e, label)}
        ref={inputRef}
      />
    </MenuItem>
  );

  return (
    <Menu
      anchorEl={anchorElement}
      open={isFileMenuOpen}
      onClose={closeFileMenu}
      PaperProps={{
        elevation: 3,
        sx: {
          width: "250px",
          borderRadius: "16px",
          p: 2,
          backgroundColor: colors.background,
          "& .MuiList-root": {
            p: 0,
          },
        },
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 600, color: colors.primary, mb: 1 }}
        >
          Upload Files
        </Typography>

        <UploadMenuItem
          icon={ImageIcon}
          label="Image"
          inputRef={imageInputRef}
          accept="image/png, image/jpeg, image/gif"
        />

        <Divider sx={{ my: 1, borderColor: alpha(colors.text, 0.1) }} />

        <UploadMenuItem
          icon={AudioFileIcon}
          label="Audio"
          inputRef={audioInputRef}
          accept="audio/mpeg, audio/wav"
        />

        <Divider sx={{ my: 1, borderColor: alpha(colors.text, 0.1) }} />

        <UploadMenuItem
          icon={UploadFileIcon}
          label="File Upload"
          inputRef={generalFileInputRef}
          accept="*"
        />

        <Divider sx={{ my: 1, borderColor: alpha(colors.text, 0.1) }} />

        <UploadMenuItem
          icon={VideoFileIcon}
          label="Video"
          inputRef={videoInputRef}
          accept="video/mp4, video/webm, video/ogg"
        />
      </Stack>
    </Menu>
  );
};

export default FileUploadMenu;
