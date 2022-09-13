import { ForkKnife, StopCircle, Timer } from "phosphor-react";
import { useState } from "react";
import { Button } from "../../components/Button";

export function SchedulesRegister(){
  
  const [timerInitiated, setTimerInitiated] = useState(false)

  function startLaunchTime(){

  }


  return (
    <div className="flex justify-center h-full w-full text-center flex-col bg-secondary p-1">
        

    <div className="self-end flex">
          <div className="mr-2">
          <Button
            onClick={() => setTimerInitiated(!timerInitiated)}
            title={`${timerInitiated ? 'Marcar saída' : 'Iniciar Horário'}`}
            icon={
              timerInitiated ?
              <StopCircle weight="bold" className="w-6 h-6"/>
              :
              <Timer weight="bold" className="w-6 h-6"/>
            }
          />
             </div>
             <div>
          <Button 
            title='Iniciar horário de almoço' 
            icon={<ForkKnife weight="bold" className="w-6 h-6"/>}
            onClick={()=> startLaunchTime()}
          />
          </div>
    </div>
            
        <table className="table-auto w-full bg-gray-900 rounded-lg mt-10 text-textColor">
          <thead>
            <tr>
              <th>data</th>
              <th>horário</th>
              <th>almoço</th>
              <th>horas trabalhadas</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-secondaryHover" onClick={() => console.error('deu erro hein')}>
              <td>13/09/2022</td>
              <td>08:00 - 18:00</td>
              <td>13:00 - 14:00</td>
              <td>8 Horas</td>
            </tr>

            <tr>
              <td>13/09/2022</td>
              <td>08:00 - 18:00</td>
              <td>13:00 - 14:00</td>
              <td>8 Horas</td>
            </tr>

          </tbody>
        </table>
    </div>
  )
}