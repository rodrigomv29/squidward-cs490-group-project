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
            bg: 'main',
            opacity: 0.8,
          },
          height: '38px',
          width: '155px',
          fontSize: '20px',
          fontFamily: 'Arvo, sans-seri',
        },
        custom_light_menu: {
          bg: 'main',
          color: 'white',
          fontFamily: 'Arvo, sans-seri',
          fontSize: '22px',
          _hover: {
            bg: 'main',
            opacity: 0.8,
          },
          borderRadius: 'md',
        },
        custom_dark_menu: {
          bg: 'main',
          color: 'white',
          fontFamily: 'Arvo, sans-seri',
          fontSize: '22px',
          _hover: {
            bg: 'main',
            opacity: 0.8,
          },
        },
      },
    },
  },
})

export default theme
