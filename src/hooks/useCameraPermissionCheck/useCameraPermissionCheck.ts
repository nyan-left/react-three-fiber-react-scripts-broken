import { useState } from 'react'
import useAsyncEffect from 'use-async-effect'

const useCameraPermissionCheck = () => {
    const [permissionChecked, setPermissionChecked] = useState(false)
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [permissionDenied, setPermissionDenied] = useState(false)

    useAsyncEffect(async () => {
        if (navigator.permissions && navigator.permissions.query) {
            const cameraPermissionStatus = await navigator.permissions.query({
                name: 'camera',
            } as unknown as PermissionDescriptor)
            if (cameraPermissionStatus.state === 'granted') {
                setPermissionGranted(true)
            } else if (cameraPermissionStatus.state === 'denied') {
                setPermissionDenied(true)
            }
        } else {
            setPermissionGranted(false)
        }
        setPermissionChecked(true)
    }, [])

    return {
        permissionChecked,
        permissionGranted,
        permissionDenied,
        setPermissionGranted,
        setPermissionDenied,
    }
}
export default useCameraPermissionCheck
