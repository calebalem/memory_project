import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexDirection: "column-reverse",
      alignItems:'stretch'
    },
  },
  //"@media (min-width: 960px)": {
    //.MuiGrid-grid-sm-6: {
      //max-width: 100%
    //}
  //}
}));
