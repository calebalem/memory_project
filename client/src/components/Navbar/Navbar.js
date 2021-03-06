import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import useStyles from "./styles";
import memories from "../../Images/memories.png";
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = ()=>{
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
    localStorage.clear();
  };
  useEffect(()=>{
    const token = user?.token;


    //JWT

    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="70"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name.split(" ")[0]} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name.split(" ")[0]}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ):(
             <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
