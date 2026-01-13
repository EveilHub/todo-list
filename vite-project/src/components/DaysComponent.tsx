import { type JSX } from "react";
import type { HollyType } from "../lib/definitions.ts";
import InputComponent from "./InputComponent.tsx";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";



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
        <div id={String(dayNum)}>

          <h2>{day}</h2>

          <div className='Input-box'>
            <div>
              <h3>Date</h3>
              <div>
                <InputComponent params={date} setParams={setDate} />
                <div>
                  <button><MdOutlineSaveAlt /></button>
                  <button><MdDelete /></button>
                  <button><BsPencilSquare /></button>
                </div>
              </div>
            </div>

            <div>
              <h3>Heure</h3>
              <div>
                <InputComponent params={heure} setParams={setHeure} />
                <div>
                  <button><MdOutlineSaveAlt /></button>
                  <button><MdDelete /></button>
                  <button><BsPencilSquare /></button>
                </div>
              </div>
            </div>

            <div>
              <h3>Tâches</h3>
              <div>
                <InputComponent params={tache} setParams={setTache} />
                <div>
                  <button><MdOutlineSaveAlt /></button>
                  <button><MdDelete /></button>
                  <button><BsPencilSquare /></button>
                </div>
              </div>
            </div>

            <div>
              <h3>Délais</h3>
              <div>
                <InputComponent params={delais} setParams={setDelais} />
                <div>
                  <button><MdOutlineSaveAlt /></button>
                  <button><MdDelete /></button>
                  <button><BsPencilSquare /></button>
                </div>
              </div>
            </div>

            <div>
              <h3>Reconduite</h3>
              <div>
                <InputComponent params={reconduite} setParams={setReconduite} />
                <div>
                  <button><MdOutlineSaveAlt /></button>
                  <button><MdDelete /></button>
                  <button><BsPencilSquare /></button>
                </div>
              </div>
            </div>

            <div>
              <h3>Nom du client</h3>
              <div>
                <InputComponent params={name} setParams={setName} />
                <div>
                  <button><MdOutlineSaveAlt /></button>
                  <button><MdDelete /></button>
                  <button><BsPencilSquare /></button>
                </div>
              </div>
            </div>

            <div>
              <h3>Tél du client</h3>
              <div>
                <InputComponent params={phone} setParams={setPhone} />
                <div>
                  <button><MdOutlineSaveAlt /></button>
                  <button><MdDelete /></button>
                  <button><BsPencilSquare /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
};
export default DaysComponents;