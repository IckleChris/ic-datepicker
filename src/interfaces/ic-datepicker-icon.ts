/**
 * Interface representing an icon for display within the datepicker. The icon set being used will determine the values
 * required for each icon. For example;
 *
 * Font Awesome
 * {
 *  classes: 'fa fa-chevron-left'
 * }
 *
 * Material Icons
 * {
 *   classes: 'material-icons',
 *   content: 'chevron_left'
 * }
 */
export interface IcDatepickerIcon {
  classes: string | string[];
  content?: string;
}
