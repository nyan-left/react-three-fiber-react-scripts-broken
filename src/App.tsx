import React, { useEffect, useState } from 'react'
import Experience from './views/Experience'
import useCameraPermissionCheck from './hooks/useCameraPermissionCheck'
import PermissionScreen from './views/PermissionScreen'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

function App() {
    const {
        permissionChecked,
        permissionDenied,
        permissionGranted,
        setPermissionDenied,
        setPermissionGranted,
    } = useCameraPermissionCheck()

    const [i18nInitialized, setI18nInitialized] = useState<boolean>(false)

    const initi18n = async () => {
        let languages = ['en', 'de']
        const resources: Record<string, Record<string, Record<string, string>>> = {}

        for (let languagesIndex = 0; languagesIndex < languages.length; languagesIndex++) {
            const language = languages[languagesIndex]

            const languageDataResponse = await fetch('locales/' + language + '.json')
            try {
                const data = await languageDataResponse.json()
                resources[language] = {
                    translation: data,
                }
            } catch (error) {
                console.log(error)
                resources[language] = {
                    translation: {},
                }
            }
        }

        i18next
            .use(initReactI18next) // passes i18n down to react-i18next
            .init({
                resources: resources,
                lng: 'en', // if you're using a language detector, do not define the lng option
                fallbackLng: 'en',

                interpolation: {
                    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
                },
            })
            .then(() => {
                setI18nInitialized(true)
            })
    }

    useEffect(() => {
        initi18n()
    }, [])

    return i18nInitialized ? (
        permissionChecked ? (
            permissionGranted ? (
                <Experience />
            ) : (
                <PermissionScreen
                    permissionDenied={permissionDenied}
                    setPermissionDenied={setPermissionDenied}
                    setPermissionGranted={setPermissionGranted}
                />
            )
        ) : null
    ) : null
}

export default App
