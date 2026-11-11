export interface ModalDeleteBrigadeProps {
    brigadesIdAndNumbers: {
        brigadeId: string;
        brigadeNumber: number;
    }[];

    onApply: (value: {
        brigadeId: string;
    }) => void;
}