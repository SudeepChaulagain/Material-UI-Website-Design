import { createTheme } from '@material-ui/core/styles';

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
export const theme = createTheme({
    palette:{
        common:{
            blue:`${arcBlue}`,
            orange:`${arcOrange}`
        },
        primary:{
            main:`${arcBlue}`
        },
        secondary:{
            main:`${arcOrange}`
        }
    },
    typography:{
        //this one here is customized
       tab:{
        fontFamily:"Raleway",
        textTransform:"none",
        fontWeight:700,
        fontSize:"1rem",
       },
       estimate:{
        fontFamily:"Pacifico",
        fontSize:"1rem",
        textTransform:"none",
       }
       
    }
})
