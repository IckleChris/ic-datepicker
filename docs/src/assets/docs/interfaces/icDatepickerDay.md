#### `IcDatepickerDay`

---

Interface for a single datepicker day.

```typescript
interface IcDatepickerDay {
  classes?: string[];
  formattedDate?: string | null;
  isDisabled?: boolean;
  isPlaceholder?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
  isWeekend?: boolean;
  moment: Moment.Moment;
}
```
