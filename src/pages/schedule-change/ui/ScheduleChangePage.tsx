// import { useEffect, useState } from "react";
// import styles from '../../../styles/blocks/nowIdont.module.scss' 
// import { useNavigate } from "react-router-dom";
// import { ArrowBigUp, ArrowLeft } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import type { BrigadesDto } from "../../../api/brigades/brigades.dto";
// import { supabase } from "../../../supabase";
// import { getShiftsApi } from "../../../api/shifts/shifts.api";
// import { brigades } from "../../../api/brigades/brigades.selectors";

// export function ScheduleChangePage() {

//   const brigadesProps = useSelector(brigades);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   interface DataType {
//     start_time: string, 
//     end_time: string, 
//     label: string, 
//     code: string
//   }

//   const morning = { start_time: "08:00", end_time: "16:00", label: "Утро", code: 'У' };
//   const evening = { start_time: "16:00", end_time: "00:00", label: "Вечер", code: 'В' };
//   const night = { start_time: "00:00", end_time: "08:00", label: "Ночь", code: 'Н' };
//   const dayOff = { start_time: null, end_time: null, label: "Отдых", code: 'О'};

//   const [arrShift, setArrShift] = useState<ShiftLocalDto[]>([morning, evening]); // получаем start_time: "", end_time: "", label: "", code: ''
//   const [brigadeClick, setBrigadeClick] = useState<string[]>([]) // получаем id бригад у которых надо изменить 
//   const [dateInput, setDateInput] = useState<Record<string, string>>({}); // получаем cycle_start_date
//   const [flagOpenWindow, setFlagOpenWindow] = useState<boolean>(false);
//   const [localState, setLocalState] = useState<DataType>();
//   const [addDateBrigade, setAddDateBrigade] = useState<string[]>([]);

//   useEffect(() => {
//     console.log(dateInput)
//   }, [dateInput])

//   interface ShiftLocalDto {
//     start_time: string | null;
//     end_time: string | null;
//     label: string;
//     code: string;
//   }

//   interface ShiftPost {
//     brigade_id: string;
//     day_index: number;
//     start_time: string | null;
//     end_time: string | null;
//     label: string;
//     code: string
//   }

//   async function saveSchedule() {

//     console.log("click saveSchedule");

//     for (const brigadeId of brigadeClick) {

      
//       await supabase
//         .from("shift_pattern")
//         .delete()
//         .eq("brigade_id", brigadeId);

      
//       const payload: ShiftPost[] = arrShift.map((shift, index) => ({
//         brigade_id: brigadeId,
//         day_index: index,
//         start_time: shift.start_time,
//         end_time: shift.end_time,
//         label: shift.label,
//         code: shift.code,
//       }));

//       const insertPromise = supabase
//       .from("shift_pattern")
//       .insert(payload);

//       const updatePromise = supabase
//       .from("brigades")
//       .update({
//         cycle_start_date: dateInput[brigadeId] || null
//       })
//       .eq("id", brigadeId);

//       const [{ error: insertError }, { error: updateError }] =
//         await Promise.all([insertPromise, updatePromise]);

//         if (insertError) {
//           console.error("Ошибка вставки:", insertError);
//         }

//         if (updateError) {
//           console.error("Ошибка обновления:", updateError);
//         }
//     }

//     console.log("Сохранение завершено");
//     dispatch(getShiftsApi.util.invalidateTags(["Shifts"]));
//     navigate("/");
//   }

//   function goBack() {
//     navigate(-1);
//   }

//   function openWindow (data: DataType) {
//     setFlagOpenWindow(!flagOpenWindow)
//     setLocalState(data)
//   }

//   function fnDiv (p: BrigadesDto) {
//     setBrigadeClick((prev) => prev.includes(p.id) 
//       ? prev.filter((id) => id !== p.id) 
//       : [...prev, p.id]
//     )
//     setAddDateBrigade((prev) =>
//       prev.filter((id) => id !== p.id)
//     )
    
//   }

//   function addDate(p: BrigadesDto) {
//     setAddDateBrigade(
//       (prev) => prev.includes(p.id)
//         ? prev.filter((id) => id !== p.id) 
//         : [...prev, p.id]
//     )
//   }

//   return (
//     <main className={styles['main']}> 
      
//       <div className={styles['main__topBar']}>

//         <button 
//           onClick={() => { goBack();}}
//           className={styles['main__button']}
//         >
//           <ArrowLeft/>
//         </button>

//         <h2 className={styles['main__title']}>
//           Смена
//         </h2>

//         <button 
//           onClick={() => saveSchedule()}
//           className={styles['main__buttonLeft']}
//         >
//             Сохранить 
//         </button>

//       </div>

//       <section className={styles['main__arrShift']}>

//         <article className={styles['main__arrShiftBlock']}>

//           <h4 className={styles['main__arrShiftTitle']}>
//             Составить график
//           </h4>
          
//           <button 
//             className={styles['main__arrShiftButton']}
//             onClick={() => setArrShift((prev) => prev.slice(0, -1))}
//           >
//             Удалить
//           </button>

//         </article>

//         <article className={styles['main__arrShiftArr']}>

//           {arrShift.map((p) => (

//           <div 
//             className={`
//               ${styles['main__arrShiftArrBlock']} 
//               ${p.code === 'У' 
//                 ? styles['main__arrShiftArrBlock_yellow']
//                 : p.code === 'В'
//                   ? styles['main__arrShiftArrBlock_evening']
//                   : p.code === 'Н'
//                     ? styles['main__arrShiftArrBlock_night']
//                     : p.code === 'О'
//                      ? styles['main__arrShiftArrBlock_dayOff']
//                      : ''
//               }`
//             }
//           >

//             <span>{p.code}</span>
//             <span>{p.label}</span>

//           </div>
//         ))}
//         </article>

//         <article className={styles['main__arrShiftArrowAndText']}>
//           <span><ArrowBigUp/></span>
//           <span>Добавить смену</span>
//         </article>

//         <article className={styles['main__putButton']}>

//           <button 
//             className={`${styles['main__putButtonChange']} ${styles['main__putButtonChange_yellow']}`}
//             onClick={() => setArrShift((prev) => [...prev, morning])}
//           >
//             <span>{morning.code}</span>
//             <span>{morning.label}</span>
//           </button>

//           <button 
//             className={`${styles['main__putButtonChange']} ${styles['main__putButtonChange_evening']}`}
//             onClick={() => setArrShift((prev) => [...prev, evening])}
//           >
//             <span>{evening.code}</span>
//             <span>{evening.label}</span>
//           </button>

//           <button 
//             className={`${styles['main__putButtonChange']} ${styles['main__putButtonChange_night']}`}
//             onClick={() => setArrShift((prev) => [...prev, night])}
//           >
//             <span>{night.code}</span>
//             <span>{night.label}</span>
//           </button>

//           <button 
//             className={`${styles['main__putButtonChange']} ${styles['main__putButtonChange_dayOff']}`}
//             onClick={() => setArrShift((prev) => [...prev, dayOff])}
//           >
//             <span>{dayOff.code}</span>
//             <span>{dayOff.label}</span>
//           </button>
//         </article>

//       </section>

            
//       <section className={styles['main__sectionBase']}>

//         <h4 className={styles['main__sectionTitle']}>Значения по умолчанию</h4>

//         <article className={styles['main__sectionBlock']}>

//           <div 
//             className={styles['main__sectionInfo']}
//             onClick={() => openWindow(morning)}
//           >

//             <span>
//               {morning.label}
//             </span>

//             <button 
//               className={styles['main__sectionTimeMorning']}
//               onClick={() => openWindow(morning)}
//             >
//               {morning.start_time}-{morning.end_time}
//             </button> 

//           </div>

//           <div 
//             className={styles['main__sectionInfo']} 
//             onClick={() => openWindow(evening)}
//           >

//             <span>
//               {evening.label}
//             </span>
            
//             <button 
//               className={styles['main__sectionTimeEvening']}
//               onClick={() => openWindow(evening)}
//             >
//               {evening.start_time}-{evening.end_time}
//             </button>

//           </div>

//           <div 
//             className={styles['main__sectionInfo']}
//             onClick={() => openWindow(night)}
//           >

//             <span>
//               {night.label}
//             </span>

//             <button 
//               className={styles['main__sectionTime']}
//               onClick={() => openWindow(night)}
//             >
//               {night.start_time}-{night.end_time}
//             </button>

//           </div>

//         </article>

//       </section>

//       <section className={styles['main__sectionBrigades']}>

//         <h4 className={styles['main__sectionTitleBrigades']}>
//           Кликните на бригады которые хотите выбрать 
//         </h4>

//         <article className={styles['main__sectionBlockBrigades']}>
//           {Array.from(brigadesProps.values()).map((p) => (
            
//             <div
//               key={p.id} 
//               className={styles['main__sectionInfoBrigades']}
//               onClick={() => fnDiv(p)}
//             >

//               <div 
//                 className={`
//                   ${styles['main__sectionInfoBrigadesBlock']}
//                   ${brigadeClick.includes(p.id) 
//                   ? styles['main__sectionInfoBrigadesBlock_active']
//                   : ''
//                 } 
//                 `}
//               >

//                 <span className={styles['main__sectionInfoBrigadesSpan']}>{p.name}</span>

//                 {brigadeClick.includes(p.id) && (
//                   addDateBrigade.includes(p.id) 
//                     ? (
//                       <input
//                         onClick={(e) => e.stopPropagation()}
//                         type="date"
//                         className={styles['main__sectionInfoBrigadesInput']}
//                         value={dateInput[String(p.id)] || ""}
//                         onChange={(e) =>
//                           setDateInput((prev) => ({
//                             ...prev,
//                             [p.id]: e.target.value,
//                           }))
//                         }
//                       />
//                     )
//                     : (
//                       <button 
//                         className={styles['main__sectionInfoBrigadesButton']}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           addDate(p)
//                         }}
//                       >
//                         Укажите первый день
//                       </button>
//                     )
//                 )}

//               </div>

//               <div className={styles['main__sectionInfoBrigadesLine']}></div>
            
//             </div>

//           ))}
//         </article>

//       </section>

//       {flagOpenWindow && (
//         <div 
//           className={styles['main__overlay']}
//           onClick={() => setFlagOpenWindow(false)}
//         >

//           <section 
//             className={styles['main__bottomSheet']}
//             onClick={(e) => e.stopPropagation()}
//           >

//             <article className={styles['main__articleOne']}>

              
              

//               <div className={styles['main__blockStartTime']}>
                
//                 <span className={styles['main__spanStart']}>
//                   Начало
//                 </span>
                
//                 <span className={styles['main__localStart']}>
//                   {localState?.start_time}
//                 </span>

//               </div>

//               <div className={styles['main__line']}></div>

//               <div className={styles['main__blockEndTime']}>
                
//                 <span className={styles['main__spanEnd']}>
//                   Конец
//                 </span>

//                 <span className={styles['main__localEnd']}>
//                   {localState?.end_time}
//                 </span>

//               </div>
              
              
            
//             </article>

//             <article className={styles["main__articleTwo"]}>

            

//                 <div className={styles['main__changeTime']}> 
                  
//                   <input
//                     type="time"
//                   />

//                 </div>

//                 <div className={styles['main__line']}></div>

//                 <button className={styles['main__ok']}>
//                   ОК
//                 </button>
              
              
//             </article>

//         </section>

//         </div>
//       )}    

//     </main>
//   );
// }