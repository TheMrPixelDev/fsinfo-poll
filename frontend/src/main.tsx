import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import theme from './theme.ts'
import {
    CssBaseline,
    Experimental_CssVarsProvider,
    ThemeProvider,
} from '@mui/material'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Experimental_CssVarsProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </Experimental_CssVarsProvider>
    </React.StrictMode>
)
