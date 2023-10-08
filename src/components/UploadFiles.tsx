import { FC } from "react";
import { Box, Button } from "@mui/material";
import { Square } from "../hooks/useGetTestWorldCanvas";
import { RECT_H, RECT_W } from "../modules/core/constants";


// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "accepts": "multipart/form-data"
// }


const UploadFiles: FC<{square: Square, files: FileList, setFiles: (files: FileList) => void }> = ({square, files, setFiles}) => {
  return (
    <Box >
      <Box display="flex" alignItems="center" justifyContent="center" borderRadius="4px" py={4} >
        <Button variant="contained" component="label" >
          Upload Pictures
          <input type="file" hidden multiple accept=".jpg, .jpeg, .png" onChange={async (e: any) => {
            setFiles(e.target.files)
            const formData = new FormData();
            const fileList: FileList = e.target.files;
            // Append all of the files to the correct field
            Object.entries(fileList).forEach(([key, file]) => {
              formData.append('files', file)
            });

            // Send it and wait for the response because the new response will have the updated prompt
            // const {data: updatedPrompt} = await axios.post(`https://breezy-orange-forest.glitch.me/prompt/upload/${prompt._id}`, formData, { headers: headers });
            // setFilePaths((updatedPrompt as Prompt)?.filePaths || [])
          }} />
        </Button>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" pb={2}>
        {files && Array.from(files)?.map((file) => (
          <Box border="1px solid red" height={RECT_H} width={RECT_W} display="center" alignItems="center" p={1}>
            {/* <Avatar src={URL.createObjectURL(file)} /> */}
            <img src={URL.createObjectURL(file)}  alt="Girl in a jacket" height={RECT_H} width={RECT_W}></img>
          </Box>
        ))}
      </Box>   
    </Box>
  )
}

export default UploadFiles; 