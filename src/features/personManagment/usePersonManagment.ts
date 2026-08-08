import { useChangePersonBrigadeMutation, useDeletPersonBrigadeMutation } from "../../entities/persons/api/getPersons";

type ChangePersonBrigadeProps = {
    idPerson: string;
    idClickNewBrigade: string;
};

export function usePersonManagment () {
    const [deleteBrigadeOnPerson, { isLoading: isCreating }] = useDeletPersonBrigadeMutation();
    const [changePerson] = useChangePersonBrigadeMutation();

    async function deletF(data: string) {
        
        return await deleteBrigadeOnPerson(data).unwrap();
            
    }

    async function chanhe({idPerson, idClickNewBrigade}: ChangePersonBrigadeProps) {
        
        return await changePerson({
            idPerson,
            idClickNewBrigade,
        }).unwrap();
    }

    return{
        deletF,
        chanhe
    }
}