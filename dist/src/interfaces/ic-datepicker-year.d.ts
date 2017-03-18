/// <reference types="moment" />
import * as Moment from 'moment';
export interface IcDatepickerYear {
    formatted: string | null;
    isDisabled: boolean;
    isSelected: boolean;
    isThisYear: boolean;
    moment: Moment.Moment;
}
