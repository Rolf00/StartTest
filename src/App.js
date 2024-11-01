import { Grid } from "@mui/material";
import { CardCenter } from "./components";

const App = ()=>{
  return(
    <Grid
    container
    direction="column"
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      height: window.innerHeight
    }}
>
  <Grid item>
    Hello World!!
  </Grid>
  <Grid item>
    <CardCenter/>
  </Grid>
</Grid>
  )
}
export default App