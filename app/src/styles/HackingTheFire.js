import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet'
import reactNativeInterface from 'react-with-styles-interface-react-native'
import { css, withStyles, ThemeProvider } from 'react-with-styles'

import myTheme from './theme'

ThemedStyleSheet.registerTheme(myTheme)
ThemedStyleSheet.registerInterface(reactNativeInterface)

export { css, withStyles, ThemeProvider, ThemedStyleSheet }
