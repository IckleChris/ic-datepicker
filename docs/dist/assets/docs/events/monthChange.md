#### `monthChange`

---

Event called whenever the rendered month is changed. `previous` and `value` are `Moment` instances of the first day in their respective months.

### Event Data

```typescript
{
  previous: Moment,
  value: Moment
}
```

### Example

```html
<ic-datepicker (monthChange)="onDatepickerMonthChange($event)"></ic-datepicker>
```

```typescript
onDatepickerMonthChange($event) {
  console.log(`Month changed from ${$event.previous.format('L')} to ${$event.value.format('L')}`);
}
```
