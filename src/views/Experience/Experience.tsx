import React, { useCallback, useState } from 'react'
import useShareScreenshot from '../../hooks/useShareScreenshot'

import ThreeD from './ThreeD'
import Ui from './Ui'
import styles from './Experience.module.scss'

const Experience: React.FunctionComponent = () => {
    const [playAnimation, setPlayAnimation] = useState(false)
    const [rotate, setRotate] = useState(false)
    const [placementMode, setPlacementMode] = useState(true)
    const { screenshotContentWrapperRef, shareScreenshot } = useShareScreenshot()

    const handleShareClick = useCallback(async () => {
        shareScreenshot()
    }, [shareScreenshot])

    return (
        <div ref={screenshotContentWrapperRef} className={styles.Experience}>
            <ThreeD rotate={rotate} placementMode={placementMode} playAnimation={playAnimation} />
            <Ui
                onShareClick={handleShareClick}
                placementMode={placementMode}
                setPlacementMode={setPlacementMode}
                playAnimation={playAnimation}
                setPlayAnimation={setPlayAnimation}
                rotate={rotate}
                setRotate={setRotate}
            />
        </div>
    )
}

export default Experience
