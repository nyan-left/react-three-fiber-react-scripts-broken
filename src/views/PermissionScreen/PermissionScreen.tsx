import React, { Dispatch, SetStateAction, useCallback } from 'react'
import styles from './PermissionScreen.module.scss'

type PermissionScreenProps = {
    permissionDenied: boolean
    setPermissionDenied: Dispatch<SetStateAction<boolean>>
    setPermissionGranted: Dispatch<SetStateAction<boolean>>
}

const PermissionScreen: React.FunctionComponent<PermissionScreenProps> = ({
    permissionDenied,
    setPermissionDenied,
    setPermissionGranted,
}) => {
    const handleGetPermission = useCallback(async () => {
        if (
            window.DeviceOrientationEvent &&
            (window.DeviceOrientationEvent as any).requestPermission
        ) {
            await (window.DeviceOrientationEvent as any).requestPermission()
        }

        const permissions = navigator.mediaDevices.getUserMedia({ video: true })
        permissions
            .then((stream) => {
                setPermissionGranted(true)
                setPermissionDenied(false)
            })
            .catch((err) => {
                setPermissionGranted(false)
                setPermissionDenied(true)
            })
    }, [setPermissionDenied, setPermissionGranted])
    return (
        <div className={styles.PermissionScreen}>
            {permissionDenied ? (
                <>
                    <p>
                        Ohne Genehmigung geht es leider nicht. Falls Du Deine Meinung änderst, setze
                        bitte die Kameraberechtigungen für diese Seite zurück und lade sie erneut.
                    </p>
                    <button className={styles.Button} onClick={() => window.location.reload()}>
                        Seite neu laden
                    </button>
                </>
            ) : (
                <>
                    <p>
                        Um diese Experience starten zu können, benötigen wir Zugriff auf die Kamera
                        und andere Sensoren deines Geräts
                    </p>
                    <button className={styles.Button} onClick={handleGetPermission}>
                        Genehmigung einholen
                    </button>
                </>
            )}
        </div>
    )
}

export default PermissionScreen
