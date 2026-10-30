export interface WorkItemCardActionEmptyProps<T, P> {
    items: T[];                                    
    brigadeIdWhereEmptyCard: string;     
    getItemId: (item: T) => string | number;
    getItemLabel: (item: T) => string | number;    

    people: Map<string, P[]>  
    getPersonBrigadeId: (person: P) => string | number | null;
    getPersonName: (person: P) => string;
    getPersonSurname: (person: P) => string;
}