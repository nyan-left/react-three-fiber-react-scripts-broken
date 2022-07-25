import React from 'react'
import { ZapparCanvas, ZapparCamera, InstantTracker, setLogLevel, LogLevel } from '@zappar/zappar-react-three-fiber'

export type ThreeDProps = {
    placementMode: boolean
    playAnimation: boolean
    rotate: boolean
}

const Box : React.FC = () => {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={'orange'} />
        </mesh>
    )
}

const ThreeD: React.FunctionComponent<ThreeDProps> = ({ placementMode, playAnimation, rotate }) => {

    setLogLevel(LogLevel.LOG_LEVEL_VERBOSE);

    const Camera = React.useMemo(()=> <ZapparCamera  />, [])
    return (
        <ZapparCanvas gl={{ preserveDrawingBuffer: true }}>
            {Camera}
            <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
                <Box />
            </InstantTracker>
        </ZapparCanvas>
    )
}

export default ThreeD
