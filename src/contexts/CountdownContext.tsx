import { Children, createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { ChallengesContext } from './ChallengesContext';
import { LevelUpModal } from './../components/LevelUpModal';

interface CoutedownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CoutedownContextData)

let countdownTimeout: NodeJS.Timeout 
// --> variavél criada para uma função do NodeJS para retirar o delay do resetCountDown

export function CountDownProvider( { children }: CountdownProviderProps ){

    const { startNewChallenge } = useContext(ChallengesContext) // --> Pegou a função startNewChallenge.

    const [time, setTime] = useState(25 * 60) // 25 minutos x 60 segundos.
    const [isActive, setIsActive] = useState(false) // será para saber e manipular o CouterDown ativo ou não.
    const [hasFinished, setHasFinished] = useState(false) // Estado para manipular a finalização do cronometro.

    const minutes = Math.floor(time / 60) // transferir o 1 minuto em 60s e Math.floor para arredondar menos.
    const seconds = time % 60 // Restos da primeira divisão, onde retornará os segundos.

    function startCountDown(){
        setIsActive(true)
    }

    function resetCountDown(){
        clearTimeout(countdownTimeout) // Para limpar o tempo de delay do TimeOut.
        setIsActive(false)
        setHasFinished(false) // --> Mudar o valor que ativa ou não o button lockado.
        setTime(25 * 60) // --> Fazer o tempo (setTime) voltar ao patamar inicial.
    }

    useEffect(() => {      
    // useEffect() é uma função do React que faz algo acontecer no "{}" quando o "[]" active e time é acionado.
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => { 
            // --> Fazer o setTimeout receber a função do NodeJS e retirar o delay
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true) // --> Retornar o valor de finalização verdadeira.
            setIsActive(false) // --> Desativar o CounterDown (Sem impacto visual, apenas controle)
            startNewChallenge() // --> Função do contexto declarado no ChallengesContext.tsx
        }
    }, [isActive, time])
    /*
     no useEffect() vai ser utilizado sempre que o active e o time for maior que 0, o setTimeout será ativado a cada 1sec (1000) e será retirado 1 do valor do time, porém quando o active for acionado o time será acionado como um loop, pois sempre o active for acionado o time mudará e sempre que o time mudar a função será acionado novamente.
     */ 


    return(
        <CountdownContext.Provider value={{  // --> Todos os valores que queremos retornar para outras paginas
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,
        }}>
            {children}

        </CountdownContext.Provider>
    )
}