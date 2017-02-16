/// <reference types="moment" />
import Moment from 'moment';
export interface IcDatepickerYear {
    formatted: string | null;
    isSelected: boolean;
    isThisYear: boolean;
    moment: Moment.Moment;
}
