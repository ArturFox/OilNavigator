export interface ModalDeleteBrigadeProps {
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    onApply: React.Dispatch<React.SetStateAction<{
        brigadeId: string;
    } | null>>;
}