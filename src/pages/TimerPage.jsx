import { CircleArrowDown, CircleArrowUp, Pause, Play, RefreshCcw, RefreshCw } from "lucide-react";
import DropdownMenu from "../components/DropDownMenu";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function TimerPage() {

  const navigate = useNavigate()

   const initialTotalTime = 0;
    const oneMinute = 60;

 // states
 const [totalTime, setTotalTime] = useState(initialTotalTime);
 const [remainingTime, setRemainingTime] = useState(initialTotalTime); // Tempo restante
 const [isRunning, setIsRunning] = useState(false); // Indica se o cronômetro está rodando
 const intervalRef = useRef(null); // Referência para o intervalo do cronômetro
 // states, FIM

 // Funções
 const increasePauseTime = () => {
    setTotalTime((prev) => prev + oneMinute);
 };

 const decreasePauseTime = () => {
    setTotalTime((prev) => (prev - oneMinute >= 1 ? prev - oneMinute : 0));
 };

 const updateSessionTime = () => {
   setRemainingTime(totalTime);
   setIsRunning(false);
 };

 // Iniciar o cronômetro
 const startTimer = () => {
   if (!isRunning && remainingTime > 0) {
     setIsRunning(true);
     intervalRef.current = setInterval(() => {
       setRemainingTime((prevTime) => {
         if (prevTime <= 1) {
           clearInterval(intervalRef.current);
           setIsRunning(false);
           return 0;
         }
         return prevTime - 1;
       });
     }, 1000);
   }
 };

 // Pausar o cronômetro
 const pauseTimer = () => {
   clearInterval(intervalRef.current);
   setIsRunning(false);
 };

 // Resetar o cronômetro
 const resetTimer = () => {
   clearInterval(intervalRef.current);
   setRemainingTime(totalTime);
   setIsRunning(false);
 };

 // Formatar o tempo para mm:ss
 const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

    return (
        <div className="h-screen bg-darker bg-cover bg-center bg-no-repeat flex flex-col items-center gap-12 overflow-scroll no-scrollbar">
      {/* Logo */}
      <div className="flex mt-16 gap-8">
        <span className="flex relative">
          <img
          onClick={() => navigate(`/principal`)}
            className="w-[160px] md:w-[190px] lg:w-[220px] xl:w-[250px] cursor-pointer"
            src="src/public/logo.png"
            alt="logo"
          />
          <span className="relative left-28 md:left-72">
          <DropdownMenu />
          </span>
        </span>
       
      </div>
      <Nav />
      <div className="w-full h-full bg-main-darker bg-cover bg-center bg-no-repeat flex flex-col items-center gap-5 ">
        <div className="flex mt-10 ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-whiteMain text-center font-semibold">
            {" "}
            Qual é o seu tempo de descanso?
          </h1>
        </div>
        <div className="mt-10 flex justify-center items-center flex-col w gap-10 ">
            <div className="flex items-center justify-center flex-col w-[350px] lg:w-[400px] h-[300px] lg:h-[300px] xl:w-[400px] bg-yellowMain rounded-lg p-6 gap-5"> 
                <div className="flex flex-col items-center justify-center space-y-1 gap-10 " >
                    <div>
                        <h2 className="text-xl lg:text-2xl"> Sessão</h2>
                    </div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-semibold"> {formatTime(remainingTime)} </h1>
                    </div>
                    <div
                    
                     className="flex gap-10">
                    <button 
                    onClick={pauseTimer} disabled={!isRunning}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full items-center bg-darker flex justify-center text-whiteMain hover:scale-105 transition-all"> <Pause /></button>
                    <button
                    onClick={startTimer} disabled={isRunning} className="w-14 h-14 md:w-16 md:h-16 rounded-full items-center bg-darker flex justify-center text-whiteMain text-3xl hover:scale-105 transition-all"> <Play /></button>
                    <button
                     onClick={resetTimer}
                     
                     className="w-14 h-14 md:w-16 md:h-16 rounded-full items-center bg-darker flex justify-center text-whiteMain text-3xl hover:scale-105 transition-all "> <RefreshCw /> </button>
                </div>
                </div>

            </div>
            <div className="flex items-center flex-col w-[350px] lg:w-[400px] h-[170px] relative bottom-12 lg:h-[200px] xl:w-[400px] bg-whiteMain rounded-lg p-6 gap-10 rounded-t-none justify-center">
                <div className="flex gap-10">
                    <button
                    onClick={decreasePauseTime} >
                        <CircleArrowDown size={30} />
                    </button>
                    <div>
                        <h2 className="text-xl lg:text-2xl"> {formatTime(totalTime)} </h2>
                    </div>
                    <button
                    onClick={increasePauseTime}>
                        <CircleArrowUp size={30} />
                    </button>
                </div>
                <div className="flex ">
                    <button
                    onClick={updateSessionTime}
                    className="w-[300px] md:w-[360px] h-[60px] bg-yellowMain text-2xl rounded-lg hover:bg-orange hover:scale-105 transition-all font-semibold"> Adicionar </button>
                </div>
            </div>
        </div>
      </div>
    </div>
    )
}

export default TimerPage;