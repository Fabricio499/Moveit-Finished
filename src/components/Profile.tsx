import styles from '../styles/components/Profile.module.css'
import { useContext } from 'react';
import { ChallengesContext } from './../contexts/ChallengesContext';

export function Profile(){
    const { level } =  useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
                <img src="https://github.com/Dev-Fabricio.png" alt="Foto de perfil"/>
            <div>
                <strong>Fabricio Costa</strong>
                <p>
                    <img src="icons/levels.png" alt='imagem de level' className={styles.imglvl}/>
                    Level {level}
                </p>
            </div> 
        </div>
    )
}