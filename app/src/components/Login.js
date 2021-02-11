import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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