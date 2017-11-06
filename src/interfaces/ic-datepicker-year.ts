import moment from 'moment';

export interface IcDatepickerYear {
  formatted: string | null;
  isDisabled: boolean;
  isSelected: boolean;
  isThisYear: boolean;
  moment: moment.Moment;
}
