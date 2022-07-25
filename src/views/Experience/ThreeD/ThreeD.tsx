import React from 'react'
import { ZapparCanvas, ZapparCamera, InstantTracker, setLogLevel, LogLevel } from '@zappar/zappar-react-three-fiber'

export type ThreeDProps = {
    placementMode: boolean
    playAnimation: boolean
    rotate: boolean
}

const ThreeD: React.FunctionComponent<ThreeDProps> = ({ placementMode, playAnimation, rotate }) => {

    setLogLevel(LogLevel.LOG_LEVEL_VERBOSE);

    return (
        <ZapparCanvas gl={{ preserveDrawingBuffer: true }}>
            <ZapparCamera  />
            <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}></InstantTracker>
        </ZapparCanvas>
    )
}

export default ThreeD
