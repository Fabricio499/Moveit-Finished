import styles from '../styles/components/ChallengeBox.module.css'
import { useContext } from 'react';
import { ChallengesContext } from './../contexts/ChallengesContext';
import { CountdownContext } from './../contexts/CountdownContext';

export function ChallengeBox(){
    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext) 
    // --> se estiver null (padrão), não ativará a function abaixo, mas caso contrario ... Ativa.
    const { resetCountDown } = useContext(CountdownContext)

    function handleChallengeSucceded(){
        completedChallenge()
        resetCountDown()
    }
    function handleChallengeFailed(){
        resetChallenge()
        resetCountDown()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengActive}>
                    <header>
                        Ganhe {activeChallenge.amount} xp
                    </header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Imagem de um halter" />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" 
                        className={styles.challengeFailedButoon}
                        onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button type="button"
                        className={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/levels-up.png" alt='imagem ilustrativa do level up' className={styles.imglvlup}/>
                    Avance de level completando desafios.
                </p>
            </div>
            ) }
        </div>
    )
}