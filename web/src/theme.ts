import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: 'Arvo, sans-serif',
  },
  colors: {
    main: '#34D399',
  },
  components: {
    Button: {
      variants: {
        custom_light: {
          bg: 'main',
          color: 'white',
          _hover: {
            bg: 'myCustomColor',
            opacity: 0.8,
          },
          height: '38px',
          width: '155px',
          fontSize: '20px',
          fontFamily: 'Arvo, sans-seri',
        },
      },
    },
  },
})

export default theme
