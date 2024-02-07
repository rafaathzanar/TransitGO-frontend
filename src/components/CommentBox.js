import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



export default function CommentBox() {
    return (
      
        <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Comments"
              multiline
              rows={4}
              placeholder="Leave a Comment here!"
            />
          </div>
        </Box>
        
     
    );
  }
  