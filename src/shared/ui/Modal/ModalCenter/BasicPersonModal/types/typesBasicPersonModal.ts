export interface BasicPersonModalProps {

    modalCenter: boolean;
    onModalCenter: (modalCenter: boolean) => void;

    name: string;
    surname: string;
    otherSurname: string;
    job_title: string,
    block: string,
    discharge: number,
    avalibleBlocks: string[];

}