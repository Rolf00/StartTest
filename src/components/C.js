import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MyTableCell = styled(TableCell)(({theme,height})=>({
    padding:0,
    backgroundColor:'black',
    color:'white',
    height: height?height:undefined
}));
export const D = styled(TableCell)(({theme,...props})=>{

    return {
    padding:0,
    backgroundColor:'black',
    ...props
    }
})