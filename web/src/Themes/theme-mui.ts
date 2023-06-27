import { createTheme } from '@mui/material/styles'

const themeMUI = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#007bff', // your primary color
    },
    secondary: {
      main: '#6c757d', // your secondary color
    },
    // ... other palette properties
  },
  // ... other theme configurations
})

export default themeMUI
