import React, { useEffect, useState } from 'react'
import styles from './CustomLoader.module.scss'
import { Html, useProgress } from '@react-three/drei'

const CustomLoader: React.FunctionComponent = () => {
    const { progress, loaded, total } = useProgress()
    const [progressValue, setProgressValue] = useState<number>(0)
    const [showLoader, setShowLoader] = useState<boolean>(true)

    useEffect(() => {
        // In some cases, the progress value decreases from one step to another.
        // To prevent the displayed progress from going backwards, we do not update
        // the progress value
        setProgressValue((state) => {
            if (progress < state) {
                return state
            }
            return Math.ceil(progress)
        })

        if (progress === 100) {
            // Display the 100% loading status long enough to be visible
            setTimeout(() => {
                setShowLoader(false)
            }, 1000)
        }
    }, [progress])

    return showLoader ? (
        <Html fullscreen className={styles.CustomLoader}>
            <h1>Loading</h1>
            <div className={styles.Progress}>
                <div>{progressValue}%</div>
                <div>
                    ({loaded} / {total})
                </div>
            </div>
        </Html>
    ) : null
}

export default CustomLoader
