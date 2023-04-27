import React from 'react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import './index.css'
import {
    CssBaseline,
    Experimental_CssVarsProvider,
    ThemeProvider,
} from '@mui/material'
import { theme } from './theme.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Experimental_CssVarsProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ColorModeSwitcher
                    style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                />
                <App />
            </ThemeProvider>
        </Experimental_CssVarsProvider>
    </React.StrictMode>
)
