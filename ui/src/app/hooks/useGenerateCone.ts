import { useEffect, useState } from 'react'
import axios from 'axios'

export type SingleTriangle = number[]
export type Triangles = SingleTriangle[]

export default function useGenerateCone() {
    const [coneParams, setConeParams] = useState({
        height: 1,
        radius: 1,
        numberOfSegments: 3,
    })

    const [triangles, setTriangles] = useState([])
    const [submit, setSubmit] = useState(false)
    const startSubmit = () => setSubmit(true)
    const endSubmit = () => setSubmit(false)


    useEffect(() => {
        // console.log('coneParams: ', coneParams)
        // console.log('stringified coneParams: ', JSON.stringify(coneParams))

        console.log(JSON.stringify(coneParams))
        
        if (submit) {
            const options = {
                method: 'post',
                url: 'http://localhost:8000/calculate',
                data: coneParams,
            }
            axios.request(options).then((response) => {
                // console.log(response.data)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                setTriangles(response.data)
            }).catch(function (error) {
                console.error(error)
            }).finally(endSubmit)
        }
    }, [submit])


    return {coneParams, setConeParams, startSubmit, submit, triangles}
}