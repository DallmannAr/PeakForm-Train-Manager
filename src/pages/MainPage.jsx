import {
  BicepsFlexed,
  Dumbbell,
  ListOrdered,
  Pencil,
  Repeat,
  Timer,
  Trash2,
} from "lucide-react";
import DropdownMenu from "../components/DropDownMenu";
import { useContext } from "react";
import { ExerciseContext } from "../contexts/ExerciseContext";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import Nav from "../components/Nav";
import Button from "../components/Button";
import H2 from "../components/H2";

function MainPage() {
  const { exercise } = useContext(ExerciseContext); // Obtém os exercícios globalmente

  const handleWheel = (event) => {
    if (event.deltaY === 0) {
      // Rola horizontalmente
      event.currentTarget.scrollLeft += event.deltaX;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="h-screen bg-darker bg-cover bg-center bg-no-repeat flex flex-col items-center gap-12 overflow-scroll no-scrollbar">
      {/* Logo */}
      <div className="flex mt-16 gap-8">
        <span className="flex relative">
          <img
            onClick={() => navigate(`/principal`)}
            className="w-[9rem] md:w-[11rem] xl:w-[12rem] cursor-pointer"
            src="src/public/logo.png"
            alt="logo"
          />
          <span className="relative left-28 md:left-72">
            <DropdownMenu />
          </span>
        </span>
      </div>
      <Nav />

      <div className="w-full h-full bg-main-darker bg-cover bg-center bg-no-repeat flex flex-col items-center gap-5">
        <div className="mt-10 flex justify-center xl:hidden ">
          <Button onClick={() => navigate(`/criarexercicio`)}>
            Criar exercício
          </Button>
        </div>

        {/* cards */}
        <div
          className="w-full flex gap-8 px-8 py-4 snap-x snap-mandatory scrollbar-hide mb-10 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide xl:grid xl:grid-cols-4 xl:max-w-[72rem] 3xl:max-w-[85rem] xl:gap-6 xl:px-4 xxl:grid-cols-4 3xl:grid-cols-4 items-center lg:overflow-auto xl:mt-10"
          onWheel={handleWheel}
        >
          {exercise.map((exer) => (
            <div key={exer.id} className="snap-center flex-shrink-0">
              <div className="w-[17rem] h-[24rem] 3xl:w-[20rem] bg-yellowMain rounded-lg flex-col">
                <div className="flex items-center justify-between p-4">
                  <h1 className="text-start text-2xl text-darker font-semibold">
                    {exer.title}
                  </h1>
                  <InfoCard exercise={exer} />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-[16rem] h-[19.5rem] 3xl:w-[19rem] bg-whiteMain rounded-md flex-col">
                    <div className="flex p-6">
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-3 items-center">
                          <span className="text-xl text-orange font-bold">
                            <ListOrdered />
                          </span>
                          <H2>
                            {exer.numberSeries}
                          </H2>
                        </div>
                        <div className="flex gap-3 items-center">
                          <span className="text-xl text-orange font-bold">
                            <Repeat />
                          </span>
                          <H2>
                            {exer.repetitions}
                          </H2>
                        </div>
                        <div className="flex gap-3 items-center">
                          <span className="text-xl text-orange ">
                            <Dumbbell />
                          </span>
                          <H2>{exer.advancedTechnique}</H2>
                        </div>
                        <div className="flex gap-3 items-center">
                          <span className="text-xl text-orange ">
                            <BicepsFlexed />
                          </span>
                          <H2>{exer.intensity}</H2>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center flex-grow gap-3 3xl:gap-5 relative top-3 xxl:top-0 3xl:bottom-0">
                      {/* Container dos botões */}
                      <button className="w-16 h-12 3xl:w-18 3xl:h-14 bg-yellowMain rounded-md hover:scale-105 transition-all text-darker flex justify-center items-center">
                        <Pencil size={34} strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => navigate(`/tempodepausa`)}
                        className="w-16 h-12 3xl:w-18 3xl:h-14 bg-orange rounded-md hover:scale-105 transition-all text-darker flex justify-center items-center"
                      >
                        <Timer size={34} />
                      </button>
                      <button className="w-16 h-12 3xl:w-18 3xl:h-14 bg-red rounded-md hover:scale-105 duration-300 transition-all text-darker flex justify-center items-center">
                        <Trash2 size={34} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Fim do container dos cards */}
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

export default MainPage;
