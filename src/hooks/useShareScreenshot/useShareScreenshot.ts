import { useCallback, useRef } from 'react'
// @ts-ignore
import { useScreenshot } from 'use-react-screenshot'

interface FileOptionsParameters {
    fileName?: string;
    title?: string;
    text?: string;
}

type FileOptions = {
    fileName: string;
    title: string;
    text: string;
};

const useShareScreenshot = () => {
    // Please note: The gl renderer option in the ZapparCanvas "preserveDrawingBuffer" needs to be set to
    // "true" in order for the screenshot to show the 3D content
    const screenshotContentWrapperRef = useRef(null)

    // eslint-disable-next-line
    const [image, takeScreenshot] = useScreenshot({
        type: 'image/jpeg',
        quality: 1.0,
    })

    const shareScreenshot = useCallback(
        async (options?: FileOptionsParameters) => {

            const fileOptions: FileOptions = {
                fileName: options?.fileName || 'Screenshot.jpg',
                title: options?.title || 'Title',
                text: options?.text || '',
            } as FileOptions
            const base64Image = await takeScreenshot(
                screenshotContentWrapperRef.current,
            )
            const blob = await (await fetch(base64Image)).blob()
            const file = new File([blob], fileOptions.fileName, { type: blob.type })

            const dataToShare = {
                files: [file],
                title: fileOptions.title,
                text: fileOptions.text,
            }

            if (navigator.share) {
                try {
                    await navigator
                        .share(dataToShare)
                        .then(() =>
                            console.log('useShareScreenshot: Screenshot successfully shared'),
                        )
                } catch (error) {
                    console.log('useShareScreenshot: Sharing failed or aborted', error);
                }
            } else {
                console.log('Web share is currently not supported on this browser.')
            }
        },
        [takeScreenshot],
    )

    return {
        screenshotContentWrapperRef,
        shareScreenshot,
    } as const
}

export default useShareScreenshot
