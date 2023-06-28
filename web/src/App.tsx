import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'
import { AuthProvider, useAuth } from './auth'
import { CurrentPageProvider } from './CurrentPageContext'
import { CustomThemeProvider } from './CustomThemeContext'
import theme from './Themes/theme-chakra'
import themeMUI from './Themes/theme-mui'

const App = () => (
  <ChakraProvider theme={theme}>
    <CurrentPageProvider>
      <CustomThemeProvider>
        <ThemeProvider theme={themeMUI}>
          <BrowserRouter>
            <FatalErrorBoundary page={FatalErrorPage}>
              <RedwoodProvider titleTemplate="%PageTitle">
                <AuthProvider>
                  <RedwoodApolloProvider useAuth={useAuth}>
                    <Routes />
                  </RedwoodApolloProvider>
                </AuthProvider>
              </RedwoodProvider>
            </FatalErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>
      </CustomThemeProvider>
    </CurrentPageProvider>
  </ChakraProvider>
)

export default App
