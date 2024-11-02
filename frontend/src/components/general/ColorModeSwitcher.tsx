import { Button } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { CSSProperties, useEffect, useState } from 'react'

export type ColorModeSwitcherProps = {
    style?: CSSProperties
}

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
    const { style } = props
    const { mode, setMode } = useColorScheme()
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    } else {
        return (
            <Button
                variant={mode === 'light' ? 'contained' : 'outlined'}
                onClick={() => {
                    if (mode === 'light') {
                        setMode('dark')
                    } else {
                        setMode('light')
                    }
                }}
                style={style}
            >
                {mode === 'light' ? 'Dunkel' : 'Hell'}
            </Button>
        )
    }
}
