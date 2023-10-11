import { FC } from "react";
import { Avatar, Badge, Box, Button, IconButton } from "@mui/material";
import { UnclaimedSquare } from "../hooks/canvas/useGetWorldCanvas";
import { Close } from "@mui/icons-material";


// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "accepts": "multipart/form-data"
// }


const UploadFiles: FC<{square: UnclaimedSquare, files: FileList, setFiles: (files: FileList) => void }> = ({square, files, setFiles}) => {
  return (
    <Box >
      <Box display="flex" alignItems="center" justifyContent="center" borderRadius="4px" py={4} >
        <Button variant="contained" component="label" >
          Post a Picture
          {/* mutliple is a prop I can pass in */}
          <input type="file" hidden accept=".jpg, .jpeg, .png" onChange={(e :any)=>setFiles(e.target.files)}
          // onChange={async (e: any) => {
          //   setFiles(e.target.files)
          //   const formData = new FormData();
          //   const fileList: FileList = e.target.files;
          //   // Append all of the files to the correct field
          //   Object.entries(fileList).forEach(([key, file]) => {
          //     formData.append('files', file)
          //   });

            // Send it and wait for the response because the new response will have the updated prompt
            // const {data: updatedPrompt} = await axios.post(`https://breezy-orange-forest.glitch.me/prompt/upload/${prompt._id}`, formData, { headers: headers });
            // setFilePaths((updatedPrompt as Prompt)?.filePaths || [])
          // }} 
          />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" pb={2}>
        {files && Array.from(files)?.map((file) => (
          <Box  display="center" alignItems="center" p={1}>
            <Badge
              overlap="circular"
              color="primary"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              badgeContent={
                <IconButton onClick={()=>setFiles({} as FileList)}><Close /></IconButton>
              }
            >
            <Avatar src={URL.createObjectURL(file)} />
            </Badge>
            {/* <img src={URL.createObjectURL(file)}  alt="Girl in a jacket" height={RECT_H} width={RECT_W}></img> */}
          </Box>
        ))}
      </Box>   
    </Box>
  )
}

export default UploadFiles; 