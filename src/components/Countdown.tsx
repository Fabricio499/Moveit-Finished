import {useContext} from 'react'
import styles from '../styles/components/Countdown.module.css'
import { CountdownContext } from './../contexts/CountdownContext';


export function Countdown(){
    const { 
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown
    } = useContext(CountdownContext)
    
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('') 
    // --> minuteLeft será atribuido como 0 do array onde retornará o primeiro numero e virse-versa.
    // --> PadStart() pegará o string(minutes) e caso não esteja com 2 campos "5" ele irá colocar o 0 na esquerda "0,5".
    // --> o split('') Irá pegar a string(minutos) com padStart e repartirar em 2 "05", "0" "5". 
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('') 
    // --> a mesma config do minutes é feita no seconds. 

    return(
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? ( // --> se hasFinished for true vai executar a função com o button.
                 <button 
                 disabled
                 className={styles.countDownButton}>
                     Ciclo encerrado
                 </button>
            ) : (
                <> 
                    { isActive ? ( // se isActive estiver true.
                 <button 
                 type="button" 
                 className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                 // --> utilizado acima uma formade contatenar 2 classNames.
                 onClick={resetCountDown}>
                     Abondonar ciclo
                 </button>
            ) : (
                <button 
            type="button" 
            className={styles.countDownButton} 
            onClick={startCountDown}>
                Iníciar um ciclo
            </button>  // --> acima foi criada uma função Omitida do EcmaScript. ? (se) : (senão).
            )}
                </> 
                // Criado um fragment (<> </>) para colocar um div que não será colocada fora dessa pagina, para tira a limitação do react
            )} 


            
        </div>
    )
}