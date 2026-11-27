import { FilterReplaceCoreStaff } from '@/shared/ui/Filters/FiltersReplace/FiltersReplaceCoreStaff/FiltersReplaceCoreStaff';
import type { BaseFilters, FilterReplaceCoreStaffProps } from '@/shared/ui/Filters/FiltersReplace/FiltersReplaceCoreStaff/types/typesFiltersReplaceCoreStaff';
import { createElement } from 'react';

export class FiltersFactory {

    static filterReplaceCoreStaff<T extends BaseFilters>(props: FilterReplaceCoreStaffProps<T>) {
        return createElement(FilterReplaceCoreStaff<T>, props)
    }


}