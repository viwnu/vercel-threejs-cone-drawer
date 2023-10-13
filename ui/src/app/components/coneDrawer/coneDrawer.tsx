import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import {
    Scene, PerspectiveCamera, DirectionalLight, DirectionalLightHelper,
    AmbientLight, Color, WebGLRenderer, PCFSoftShadowMap, BoxGeometry, 
    MeshPhongMaterial, Mesh, Group, BufferGeometry, BufferAttribute
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


import { SingleTriangle, Triangles } from '../../hooks/useGenerateCone'

export default function ConeDrawer({triangles}: {triangles: Triangles}) {
    const boxRef = useRef<HTMLDivElement>(null)
    
    const scene = new Scene()
    const camera = new PerspectiveCamera( 75, 16 / 9, 0.1, 1000 )

    const light = new DirectionalLight( 0xffffff, 3 )
    light.position.set( 0, 3, 0 ) //default; light shining from top
    light.castShadow = true // default false
    
    scene.add( light )
    const helper = new DirectionalLightHelper( light, 1 )
    scene.add( helper )


    const ambientLight = new AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    scene.background = new Color('#2d3a52')

    const renderer = new WebGLRenderer()

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    const animate = () => {
        requestAnimationFrame( animate )
        renderer.render( scene, camera )
    }

    camera.position.set(2, 2, 2)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = false
    controls.minDistance = 1
    controls.maxDistance = 10
    
    useEffect(() => {
        const canvas = boxRef.current?.firstChild
        canvas? boxRef.current?.removeChild(canvas) : console.log('havent child node')
        
        if (boxRef.current !== null) {
            renderer.setSize( boxRef.current.offsetWidth, (boxRef.current.offsetWidth - 16*2)*9/16 )
            boxRef.current.appendChild( renderer.domElement )
        }
    }, [boxRef, triangles])

    const geometry = new BoxGeometry( 5, 0.1, 5 )
    geometry.computeVertexNormals()
    const material = new MeshPhongMaterial( {color: '#4d4d4d'} ) 
    const cube = new Mesh( geometry, material )
    cube.position.set(0, -1, 0)
    cube.castShadow = true
    cube.receiveShadow = true //default
    scene.add( cube )
    
    const cone = new Group()

    console.log(triangles)

    triangles.forEach((triangle: SingleTriangle) => {
        const coneBaseTriangle = [...triangle]
        coneBaseTriangle[2] = 0

        const coneSideGeometry = new BufferGeometry()
        const coneBaseGeometry = new BufferGeometry()

        const coneSideVertices = new Float32Array(triangle)
        const coneBaseVertices = new Float32Array(coneBaseTriangle)
        const coneSideIndices = [0, 1, 2]
        const coneBaseIndices = [2, 1, 0]

        coneSideGeometry.setIndex(coneSideIndices)
        coneSideGeometry.setAttribute( 'position', new BufferAttribute( coneSideVertices, 3 ) )

        coneBaseGeometry.setIndex(coneBaseIndices)
        coneBaseGeometry.setAttribute( 'position', new BufferAttribute( coneBaseVertices, 3 ) )


        coneSideGeometry.computeVertexNormals()
        coneBaseGeometry.computeVertexNormals()
    
        const triangleMesh = new Mesh(coneSideGeometry, new MeshPhongMaterial({color: '#ad3daa'}))
        const coneBaseMesh = new Mesh(coneBaseGeometry, new MeshPhongMaterial({color: '#ad3daa'}))

        cone.add(triangleMesh)
        cone.add(coneBaseMesh)

    })
    cone.castShadow = true
    scene.add(cone)

    animate()
    

    return (
        <Box
            ref={boxRef}
            sx={{
                borderRadius: 2,
                overflow: 'hidden',
            }}
        ></Box>
    )
}