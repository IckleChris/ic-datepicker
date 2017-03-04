import * as Moment from 'moment';

export interface IcDatepickerDay {
  classes?: string[];
  formattedDate?: string | null;
  isDisabled?: boolean;
  isPlaceholder?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
  isWeekend?: boolean;
  moment: Moment.Moment;
}
