import type { SelectionButtonDetailProps } from '@/shared/ui/Button/SelectionButton/SelectionButtonDetail/types/typesSelectionButtonDetail';
import styles from './SelectionButtonDetail.module.scss';

export function SelectionButtonDetail (
    {
        selectedBoolean,
        selected,
        onSelected,
        onSelectedPerson,
        personId,
    }: SelectionButtonDetailProps
) {

    return (

        <div
            className={styles["selectionButton"]}
        >
            <button
                className={`
                    ${styles['selectionButton__button']}
                    ${selectedBoolean && styles["selectionButton__button--selected"]}
                `}
                onClick={() => {

                    if(selected === personId){
                        onSelected('')
                        onSelectedPerson({
                            personObj: null,
                            brigade: null
                        })
                    }//else {
                    //     onSelected(personId)
                    //     onSelectedPerson({
                    //         personObj: personId,
                    //         brigade: b
                    //     })
                    // }
                    
                }}
            >
                {selectedBoolean 
                    ? 'Выбран'
                    : 'Выбрать'
                }
            </button>
            
        </div>
        
    )

}