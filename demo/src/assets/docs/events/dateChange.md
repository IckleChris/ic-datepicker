#### `dateChange`

---

Event called whenever a day is selected. The type of `previous` and `value` are determined from the `modelType` option.

### Event Data

```typescript
{
  previous: string|Date|Moment|IcDatepickerDay,
  value: string|Date|Moment|IcDatepickerDay
}
```

### Example ( `modelType` = `Moment` )

```html
<ic-datepicker-component (dateChange)="onDatepickerDateChange($event)"></ic-datepicker-component>
```

```typescript
onDatepickerDateChange($event) {
  console.log(`Date changed from ${$event.previous.format('L')} to ${$event.value.format('L')}`);
}
```
