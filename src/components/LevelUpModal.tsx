import styles from '../styles/components/LevelUpModal.module.css'
import { useContext } from 'react';
import { ChallengesContext } from './../contexts/ChallengesContext';

export function LevelUpModal(){
    const { level, closeLevelUpModel } = useContext(ChallengesContext)

    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parábens</strong>
                <p>Você alcançou um novo level.</p>

                <button type='button' onClick={closeLevelUpModel}>
                    <img src="/icons/close.svg" alt="fechar modal" />
                </button>
            </div>
        </div>
    )
}