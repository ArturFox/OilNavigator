import type { WorkInfoBaseProps, WorkInfoWithProblemProps } from '@/shared/ui/PersonStatus/PersonStatusFactory/types/typesPersonStatus';
import { WorkInfoBase } from '@/shared/ui/PersonStatus/PersonStatusFactory/widgets/WorkInfoBase/WorkInfoBase';
import { WorkInfoWithProblem } from '@/shared/ui/PersonStatus/PersonStatusFactory/widgets/WorkInfoWithProblem/WorkInfoWithProblem';
import { createElement } from 'react';

export class PersonStatusFactory {

    static workInfoBase(props: WorkInfoBaseProps) {
        return createElement(WorkInfoBase, props)
    }

    static workInfoWithProblem(props: WorkInfoWithProblemProps) {
        return createElement(WorkInfoWithProblem, props)
    }
    
} 