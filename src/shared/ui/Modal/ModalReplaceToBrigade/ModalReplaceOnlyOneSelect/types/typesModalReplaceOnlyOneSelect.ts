export interface ModalReplaceOnlyOneProps {
    id: string;
    name: string;
    surname: string;

    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    setApply: React.Dispatch<React.SetStateAction<{
        personId: string;
        brigadeId: string;
    } | null>>;
}