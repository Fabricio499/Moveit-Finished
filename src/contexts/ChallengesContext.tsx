import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json' // --> Challenges em json 
import { LevelUpModal } from './../components/LevelUpModal';

interface Challenge { // --> Criado para se dar o valor do tipo (typagem) de activeChallenge.
    type: 'body' | 'eye';  // --> o valor ou é uma string body ou eye.
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge; // --> Interface / type para dar o valor de challenges.json
    levelUp: () => void; // --> tipagem função sem retorno (void)
    startNewChallenge: () => void; // -> tipagem função sem retorno (void)
    resetChallenge: () => void; // --> Função de resetar o desafio.
    completedChallenge: () => void;
    closeLevelUpModel: () => void;
    
}

interface ChallengesProviderProps {
    children: ReactNode; // --> ReactNode faz receber como children qualquer elemento do própio react tmb.
    level: Number;
    currentExperience: Number;
     challengesCompleted: Number;

}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2) 
    // --> Calculo matematico utilizado em jogos para adicionar algaritmo de experiencia de acordo com potencia.


    useEffect(() => { // --> receber notificação e ser acionado uma vez por vez.
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentExperience, challengesCompleted]) // --> O useEffect será acionado quando isso for mudado.

    function levelUp(){
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModel() {  // --> Fechar o modal.
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge(){ // --> Essa funtion vai ser exportada no ChallengesContext.Provider abaixo.
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
        /*
         --> Acima foi criado uma variavél na qual pegar valores aleatório e arredonda, porém o math.radom é gerado entre 0 e 1, então colocamos para multiplicar esse numero a partir da quantidade de challenges (challenges.legth)
        */
        const challenge = challenges[randomChallengesIndex]
        setActiveChallenge(challenge)

        new Audio('/public_notification.mp3').play()

        if(Notification.permission === 'granted') { // --> notificação quando é gerado um startNewChallenge
            new Notification('Novo desafio ✨', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }
    function resetChallenge(){
        setActiveChallenge(null)
    }
    function completedChallenge(){ // Função para qm completar o desafio.
        if(!activeChallenge) { // if --> se o activeChallenge não estiver ativo (se não ouver desafios ativos).
            return;
        } 
        const { amount } = activeChallenge // --> Pegar a quantidade de experiencia (xp) do desafio.

        let finalExperience = currentExperience + amount; // --> Soma da quantidade de xp atual e do desafio.

        if (finalExperience >= experienceToNextLevel) { // --> Se seu xp final bater a quantidade necessaria.
            finalExperience = finalExperience - experienceToNextLevel 
            // Calculo para saber quanto de experiencia vai ficar depois de subir de level
            levelUp()
        }

        setCurrentExperience(finalExperience) // A barra de experiencia. em numero. (%)
        setActiveChallenge(null) // Desativar o desafios.
        setChallengesCompleted(challengesCompleted + 1) // subir a quantidade de desafios feitos.
    } 


    return (
        <ChallengesContext.Provider value={{  
        //--> um componente Provider React permite que os componentes de consumo assinem as alterações de contexto.
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completedChallenge,
        closeLevelUpModel,
        }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
} 

