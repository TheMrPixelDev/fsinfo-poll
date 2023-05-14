import React from 'react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import './index.css'
import {
    CssBaseline,
    Experimental_CssVarsProvider,
    ThemeProvider,
} from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QuestionAdminPanel } from './components/QuestionAdminPanel.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Experimental_CssVarsProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={{}}>
                    <CssBaseline />
                    <ColorModeSwitcher
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                        }}
                    />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route
                                path="/admin"
                                element={<QuestionAdminPanel />}
                            />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </QueryClientProvider>
        </Experimental_CssVarsProvider>
    </React.StrictMode>
)
