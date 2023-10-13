import { Box, Button, CssBaseline, FormControl, TextField, Typography } from '@mui/material'
import ConeDrawer from './components/coneDrawer/coneDrawer'
import useGenerateCone from './hooks/useGenerateCone'
import { useEffect } from 'react'

export default function App() {
    const {coneParams, setConeParams, startSubmit, submit, triangles} = useGenerateCone()
    // console.log(coneParams)
    useEffect(() => {
        // if (!submit) console.log(triangles)
    }, [submit])
    return (
        <>
            <Box
               sx={{
                display: 'flex',
                p: 2
               }} 
            >
                <CssBaseline />
                <Box
                    sx={{
                        width: '80%',
                        height: '100%',
                        p: 2,
                        pt: 0,
                    }}
                >
                    <ConeDrawer
                        triangles={triangles}
                    />
                    <Typography variant='overline' align='center' sx={{width: '100%', display: 'inline-block'}} >Grafic window</Typography>
                </Box>
                <Box
                    
                >
                    <FormControl
                        sx={{gap: 2}}
                    >
                        <TextField
                            label='Height'
                            size='small'
                            required
                            value={coneParams.height}
                            onChange={(e) => {setConeParams({...coneParams, height: +e.target.value})}}
                        />
                        <TextField
                            label='Radius'
                            size='small'
                            required
                            value={coneParams.radius}
                            onChange={(e) => {setConeParams({...coneParams, radius: +e.target.value})}}
                        />
                        <TextField
                            label='Number of segments'
                            size='small'
                            required
                            value={coneParams.numberOfSegments}
                            onChange={(e) => {setConeParams({...coneParams, numberOfSegments: +e.target.value})}}
                        />
                        <Button
                            size='small'
                            variant='contained'
                            onClick={startSubmit}
                        >Generate Cone</Button>
                    </FormControl>
                </Box>
            </Box>
        </>
    )
}