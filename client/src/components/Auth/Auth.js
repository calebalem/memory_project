import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from './icon';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {signIn, signUp} from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  const state = null;
  const classes = useStyles();
  const history  = useHistory();
  const [isSignup, setisSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signUp(formData, history))
    }else{
      dispatch(signIn(formData, history))

    }
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  const switchMode = () => {
    isSignup ? setisSignup(false) : setisSignup(true);
    setShowPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const googleSuccess = async(res)=>{
    const result = res?.profileObj;
    const token = res?.tokenId;
    const data = {result,token};

    try{
        localStorage.setItem('profile', JSON.stringify(data));
        dispatch({type: 'AUTH', data: {result, token}});
        history.push('/');
    }catch(error){
      console.log(error);
    }
  }
  const googleFailure = (res)=>{console.log(res)}
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Grid item xs={6} md={12}>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  ></Input>
                </Grid>
                <Grid item xs={6} md={12}>
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  ></Input>
                </Grid>
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="82674485658-i1dbpk4bdhqq7lf7cifji1ehodofcq6s.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >Sign In With Google</Button>)}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account yet? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
