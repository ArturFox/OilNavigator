export interface BrigadeNavigationRowProps {

    brigadeList: {
        id:string,
        numberBrigade:number,
        isFull: boolean;
    }[];

    isbrigadeSelectId: string;
    setIsBrigadeSelectId: (brigadeClick: string) => void;

    setIsDelete: (isDelete: boolean) => void;
    setIsCreate: (isAdd: boolean) => void;
}