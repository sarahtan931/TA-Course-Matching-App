import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const login = () => {
    return (
       <div>
          <h1>Login Page</h1>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Email" variant="outlined" />   
                <TextField id="outlined-basic" label="Password" variant="outlined" />  
                <Button type="submit" variant="contained" color="primary">Sign In</Button> 
            </form>
            
       </div>
    );
}
 
export default login;