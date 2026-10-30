import { BasicPersonModal } from '@/shared/ui/Modal/ModalCenter/BasicPersonModal/BasicPersonModal';
import type { BasicPersonModalProps } from '@/shared/ui/Modal/ModalCenter/BasicPersonModal/types/typesBasicPersonModal';
import { DetailPersonModal } from '@/shared/ui/Modal/ModalCenter/DetailPersonModal/DetailPersonModal';
import type { DetailedPersonModalProps } from '@/shared/ui/Modal/ModalCenter/DetailPersonModal/types/typesDetailPersonModal';
import { ModalReplaceEmptySelect } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceEmptySelect/ModalReplaceEmptySelect';
import type { ModalReplaceEmptySelectProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceEmptySelect/types/typesModalReplaceEmptySelect';
import { ModalReplaceOnlyOne } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceOnlyOneSelect/ModalReplaceOnlyOneSelect';
import type { ModalReplaceOnlyOneProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceOnlyOneSelect/types/typesModalReplaceOnlyOneSelect';
import { ModalReplaceSeveralSelect } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceSeveralSelect/ModalReplaceSeveralSelect';
import type { ModalReplaceSeveralSelectProps } from '@/shared/ui/Modal/ModalReplaceToBrigade/ModalReplaceSeveralSelect/type/typesModalReplaceSeveralSelect';
import { createElement } from 'react';

export class ModalFactory {

    static modalCenterBasic(props: BasicPersonModalProps) {
        return createElement(BasicPersonModal, props);
    }

    static modalCenterDetailed(props: DetailedPersonModalProps) {
        return createElement(DetailPersonModal, props)
    }

    static modalReplaceOnlyOne(props: ModalReplaceOnlyOneProps){
        return createElement(ModalReplaceOnlyOne, props)
    }

    static modalReplaceSeveralSelect(props: ModalReplaceSeveralSelectProps){
        return createElement(ModalReplaceSeveralSelect, props)
    }

    static modalReplaceEmptySelect<T, P>(props: ModalReplaceEmptySelectProps<T, P>){
        return createElement(ModalReplaceEmptySelect as any, props)
    }

}