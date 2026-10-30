export interface ModalReplaceOnlyOneProps {
    id: string;
    name: string;
    surname: string;

    brigadesId: string[];
    brigadesNumber: number[];

    onApply: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;
}