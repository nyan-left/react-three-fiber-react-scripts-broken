import i18next from 'i18next'
import React, { Dispatch, SetStateAction } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import styles from './Ui.module.scss'

type UiProps = {
    onShareClick: () => {}
    placementMode: boolean
    setPlacementMode: Dispatch<SetStateAction<boolean>>
    playAnimation: boolean
    setPlayAnimation: Dispatch<SetStateAction<boolean>>
    rotate: boolean
    setRotate: Dispatch<SetStateAction<boolean>>
}

const Ui: React.FunctionComponent<UiProps> = ({
    onShareClick,
    placementMode,
    setPlacementMode,
    playAnimation,
    setPlayAnimation,
    rotate,
    setRotate,
}) => {
    const { t } = useTranslation()

    return (
        <div className={styles.Ui}>
            <div>
                <button
                    onClick={() => {
                        setPlacementMode((state) => !state)
                    }}
                >
                    {placementMode ? (
                        <Trans t={t}>
                            BUTTON_PLACE_OBJECT
                        </Trans>
                    ) : (
                        <Trans t={t}>
                            BUTTON_PICK_UP_OBJECT
                        </Trans>
                    )}
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        setPlayAnimation((state) => !state)
                    }}
                >
                    {!playAnimation ? (
                        <Trans t={t}>
                            BUTTON_START_ANIMATION
                        </Trans>
                    ) : (
                        <Trans t={t}>
                            BUTTON_STOP_ANIMATION
                        </Trans>
                    )}
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        setRotate((state) => !state)
                    }}
                >
                    {!rotate ? (
                        <Trans t={t}>
                            BUTTON_START_ROTATION
                        </Trans>
                    ) : (
                        <Trans t={t}>
                            BUTTON_STOP_ROTATION
                        </Trans>
                    )}
                </button>
            </div>
            <div>
                <button onClick={onShareClick}>
                    <Trans t={t}>
                        BUTTON_SHARE_SCREENSHOT
                    </Trans>
                </button>
            </div>
            <div className="text-blue-500"><Trans t={t}>
                        TEST
                    </Trans></div>
            <div>
                <button
                    onClick={() => {
                        i18next.changeLanguage('de')
                    }}
                >
                    <Trans t={t}>
                        BUTTON_GERMAN
                    </Trans>
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        i18next.changeLanguage('en')
                    }}
                >
                    <Trans t={t}>
                        BUTTON_ENGLISH
                    </Trans>
                </button>
            </div>
        </div>
    )
}

export default Ui
