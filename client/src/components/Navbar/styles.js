import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    marginTop: "30px",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 50px",
    width:"100%"
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "50vw",
  },
  profile: {
    display: "flex",
    width: "25vw",
    justifySelf:"flex-end"
  },
  userName: {
    display: "flex",
    alignItems: "center",
    marginLeft:'0px',
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    width:"50vw"
  },
  logout:{
    marginLeft: '5px'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight:"3px",
  },
  "@media (max-width: 600px)": {
    userName:{
      display:'none',
    },
    image:{
      display:'none',
    }
  },  
}));
