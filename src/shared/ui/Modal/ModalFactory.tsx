import { ModalAddBrigade } from '@/shared/ui/Modal/ModalAddAndDeleteBrigade/ModalAddBrigade/ModalAddBrigade';
import type { ModalAddBrigadeProps } from '@/shared/ui/Modal/ModalAddAndDeleteBrigade/ModalAddBrigade/types/typesModalAddBrigade';
import { ModalDeleteBrigade } from '@/shared/ui/Modal/ModalAddAndDeleteBrigade/ModalDeleteBrigade/ModalDeleteBrigade';
import type { ModalDeleteBrigadeProps } from '@/shared/ui/Modal/ModalAddAndDeleteBrigade/ModalDeleteBrigade/types/typesModalDeleteBrigade';
import { DetailPersonModal } from '@/shared/ui/Modal/ModalDetail/DetailPersonModal/DetailPersonModal';
import type { DetailedPersonModalProps } from '@/shared/ui/Modal/ModalDetail/DetailPersonModal/types/typesDetailPersonModal';
import { ModalReplaceOnlyOne } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceOnlyOneSelect/ModalReplaceOnlyOneSelect';
import type { ModalReplaceOnlyOneProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceOnlyOneSelect/types/typesModalReplaceOnlyOneSelect';
import { ModalReplaceSeveralSelect } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceSeveralSelect/ModalReplaceSeveralSelect';
import type { ModalReplaceSeveralSelectProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceSeveralSelect/type/typesModalReplaceSeveralSelect';
import { createElement } from 'react';

export class ModalFactory {

    static modalCenterDetailed(props: DetailedPersonModalProps) {
        return createElement(DetailPersonModal, props)
    }

    static modalReplaceOnlyOne(props: ModalReplaceOnlyOneProps){
        return createElement(ModalReplaceOnlyOne, props)
    }

    static modalReplaceSeveralSelect(props: ModalReplaceSeveralSelectProps){
        return createElement(ModalReplaceSeveralSelect, props)
    }

    static modalDeleteBrigade(props: ModalDeleteBrigadeProps){
        return createElement(ModalDeleteBrigade, props)
    }

    static modalAddBrigade(props: ModalAddBrigadeProps){
        return createElement(ModalAddBrigade, props)
    }

}