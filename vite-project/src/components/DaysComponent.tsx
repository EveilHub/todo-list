import { type JSX } from "react";
import type { HollyType } from "../lib/definitions.ts";
import InputComponent from "./InputComponent.tsx";

const DaysComponents = ({
  dayNum,
  day,
  date, setDate,
  heure, setHeure,
  tache, setTache,
  delais, setDelais,
  reconduite, setReconduite,
  name, setName,
  phone, setPhone
}: HollyType): JSX.Element => {

    //const [params, setParams] = useState<string>("");
    console.log("DaysComponent");

    return (
        <div key={dayNum}>
          <h2>{day}</h2>

          <div className='Input-box'>

            <div>
              <h3>Date</h3>
              <InputComponent params={date} setParams={setDate} />
            </div>
            <div>
              <h3>Heure</h3>
              <InputComponent params={heure} setParams={setHeure} />
            </div>
            <div>
              <h3>Tâches</h3>
              <InputComponent params={tache} setParams={setTache} />
            </div>
            <div>
              <h3>Délais</h3>
              <InputComponent params={delais} setParams={setDelais} />
            </div>
            <div>
              <h3>Reconduite</h3>
              <InputComponent params={reconduite} setParams={setReconduite} />
            </div>
            <div>
              <h3>Nom du client</h3>
              <InputComponent params={name} setParams={setName} />
            </div>
            <div>
              <h3>Tél du client</h3>
              <InputComponent params={phone} setParams={setPhone} />
            </div>

          </div>

        </div>


    )
};
export default DaysComponents;