import { FC } from "react";
import { Box, IconButton } from "@mui/material";
import { UnclaimedSquare } from "../hooks/canvas/useGetWorldCanvas";
import { Close, UploadFile } from "@mui/icons-material";
import { LEAF_COLOR_SCHEME } from "../theme/colors";


// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "accepts": "multipart/form-data"
// }


const UploadFiles: FC<{square: UnclaimedSquare, files: FileList, setFiles: (files: FileList) => void }> = ({square, files, setFiles}) => {

  const fileUploaded = files && !!files.length;

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box borderRadius="64px" height="80px" width="80px" bgcolor={LEAF_COLOR_SCHEME['red']} display="flex" alignItems="center" justifyContent="center" 
          border={fileUploaded ? `2px solid ${LEAF_COLOR_SCHEME["green"]}` : undefined}
        >
          {fileUploaded ? (
            <Box display="flex" alignItems="center" justifyContent="center" >
              {Array.from(files).map((file) => (
                <Box display="center" alignItems="center" p={1} position="relative">      
                  <IconButton aria-label="close" onClick={()=>setFiles({} as FileList)} >
                   <Close />
                 </IconButton>
                  {/* <Avatar src={URL.createObjectURL(file)} /> */}
                </Box>
              ))}
            </Box>  
          ) : (
            <IconButton component="label" >
              <UploadFile />
              {/* mutliple is a prop I can pass in */}
              <input type="file" hidden accept=".jpg, .jpeg, .png" onChange={(e :any)=>setFiles(e.target.files)}/>
            </IconButton>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box width="8px" height="16px" bgcolor={fileUploaded ? LEAF_COLOR_SCHEME["green"] : undefined} />
      </Box>
    </Box>
  )
}

export default UploadFiles; 