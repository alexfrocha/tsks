import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
    config: {
        initialColorMode: "dark"
    },
    colors: {
        tsks: {
            lessDark: '#262A32',
            sidebarDark: '#1E2127',
            dark: '#23242B',
            pink: '#F84C6F',
            dashboardBg: '#17191E',
            gradient: 'linear-gradient(45deg, hsla(319, 68%, 44%, 1) 9%, hsla(341, 73%, 52%, 1) 36%, hsla(342, 90%, 67%, 1) 69%, hsla(356, 23%, 77%, 1) 100%);'
        }
    },
    fonts: {
        text: `'Poppins', sans-serif`
    }
})


export default theme