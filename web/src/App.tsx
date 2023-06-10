import { ChakraProvider } from '@chakra-ui/react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'
import theme from './theme'

import { AuthProvider, useAuth } from './auth'

const App = () => (
  <ChakraProvider theme={theme}>
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle">
        <AuthProvider>
          <RedwoodApolloProvider useAuth={useAuth}>
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  </ChakraProvider>
)

export default App
