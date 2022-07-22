import React from 'react'
import { ZapparCanvas } from '@zappar/zappar-react-three-fiber'

export type ThreeDProps = {
    placementMode: boolean
    playAnimation: boolean
    rotate: boolean
}

const ThreeD: React.FunctionComponent<ThreeDProps> = ({ placementMode, playAnimation, rotate }) => {
    return (
        <ZapparCanvas gl={{ preserveDrawingBuffer: true }}>
        </ZapparCanvas>
    )
}

export default ThreeD
