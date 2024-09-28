// import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsFileMenuOpen } from "../../redux-toolkit/reducers/misc";
// import {
//   AudioFile as AudioFileIcon,
//   Image as ImageIcon,
//   UploadFile as UploadFileIcon,
//   VideoFile as VideoFileIcon,
// } from "@mui/icons-material";

// const FileMenu = ({ anchorElement }) => {
//   const { isFileMenuOpen } = useSelector((state) => state.misc);
//   const dispatch = useDispatch();

//   const closeFileMenu = () => {
//     dispatch(setIsFileMenuOpen(false));
//   };

//   const fileChangeHandler = (e, key) => {};

//   return (
//     <>
//       <Menu
//         anchorEl={anchorElement}
//         open={isFileMenuOpen}
//         onClose={closeFileMenu}
//       >
//         <div
//           style={{
//             width: "10rem",
//           }}
//         >
//           <MenuList>
//             <MenuItem>
//               <Tooltip title="Image">
//                 <ImageIcon />
//               </Tooltip>
//               <ListItemText style={{ marginLeft: "0.5rem" }}>
//                 Image
//               </ListItemText>

//               <input
//                 type="file"
//                 multiple
//                 accept="image/png, image/jpeg, image/gif"
//                 style={{
//                   display: "none",
//                 }}
//                 onChange={(e) => fileChangeHandler(e, "Images")}
//               />
//             </MenuItem>
//           </MenuList>
//           <MenuList>
//             <MenuItem>
//               <Tooltip title="Audio">
//                 <AudioFileIcon />
//               </Tooltip>
//               <ListItemText style={{ marginLeft: "0.5rem" }}>
//                 Audio
//               </ListItemText>

//               <input
//                 type="file"
//                 multiple
//                 accept="audio/mpeg, audio/wav"
//                 style={{
//                   display: "none",
//                 }}
//                 onChange={(e) => fileChangeHandler(e, "Audios")}
//               />
//             </MenuItem>
//           </MenuList>
//           <MenuList>
//             <MenuItem>
//               <Tooltip title="File">
//                 <UploadFileIcon />
//               </Tooltip>
//               <ListItemText style={{ marginLeft: "0.5rem" }}>
//                 File Upload
//               </ListItemText>

//               <input
//                 type="file"
//                 multiple
//                 accept="*"
//                 style={{
//                   display: "none",
//                 }}
//                 onChange={(e) => fileChangeHandler(e, "Files")}
//               />
//             </MenuItem>
//           </MenuList>
//           <MenuList>
//             <MenuItem>
//               <Tooltip title="Video">
//                 <VideoFileIcon />
//               </Tooltip>
//               <ListItemText style={{ marginLeft: "0.5rem" }}>
//                 Video
//               </ListItemText>

//               <input
//                 type="file"
//                 multiple
//                 accept="video/mp4, video/webm, video/ogg"
//                 style={{
//                   display: "none",
//                 }}
//                 onChange={(e) => fileChangeHandler(e, "Videos")}
//               />
//             </MenuItem>
//           </MenuList>
//         </div>
//       </Menu>
//     </>
//   );
// };

// export default FileMenu;

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
  setIsFileMenuOpen,
  setUploadingLoader,
} from "../../redux-toolkit/reducers/misc";
import { useSendFileAttachmentsMutation } from "../../redux-toolkit/api/apiSlice";
import {
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Image as ImageIcon,
  AudioFile as AudioFileIcon,
  VideoFile as VideoFileIcon,
  UploadFile as UploadFileIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";

const FileUploadMenu = ({ anchorElement, chatId }) => {
  const { isFileMenuOpen } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const [sendFileAttachments] = useSendFileAttachmentsMutation();

  const fileInputRefs = {
    image: useRef(null),
    audio: useRef(null),
    video: useRef(null),
    file: useRef(null),
  };

  const closeFileMenu = () => dispatch(setIsFileMenuOpen(false));

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
      const formData = new FormData();
      formData.append("chatId", chatId);
      files.forEach((file) => formData.append("files", file));

      const response = await sendFileAttachments(formData);
      if (response.data) {
        toast.success(`Successfully uploaded ${files.length} ${key} file(s)!`, {
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

  const uploadOptions = [
    {
      key: "image",
      icon: ImageIcon,
      label: "Image",
      accept: "image/png, image/jpeg, image/gif",
    },
    {
      key: "audio",
      icon: AudioFileIcon,
      label: "Audio",
      accept: "audio/mpeg, audio/wav",
    },
    {
      key: "video",
      icon: VideoFileIcon,
      label: "Video",
      accept: "video/mp4, video/webm, video/ogg",
    },
    { key: "file", icon: UploadFileIcon, label: "File", accept: "*" },
  ];

  return (
    <Menu
      anchorEl={anchorElement}
      open={isFileMenuOpen}
      onClose={closeFileMenu}
      PaperProps={{
        elevation: 3,
        sx: {
          width: "280px",
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 2, fontWeight: 600, color: "#333" }}
      >
        Upload Files
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {uploadOptions.map(({ key, icon: Icon, label, accept }) => (
          <MenuItem
            key={key}
            onClick={() => fileInputRefs[key].current?.click()}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "12px",
              padding: "16px",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#f0f7ff",
                transform: "translateY(-2px)",
              },
            }}
          >
            <ListItemIcon sx={{ justifyContent: "center", mb: 1 }}>
              <Icon sx={{ fontSize: 36, color: "#1976d2" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" align="center">
                  {label}
                </Typography>
              }
            />
            <input
              type="file"
              multiple
              accept={accept}
              style={{ display: "none" }}
              onChange={(e) => handleFileSelection(e, key)}
              ref={fileInputRefs[key]}
            />
          </MenuItem>
        ))}
      </Box>
    </Menu>
  );
};

export default FileUploadMenu;
