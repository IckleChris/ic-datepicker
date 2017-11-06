#### `dayQuickOptions`

---

Configure the quick select day options to display in the datepicker popup.

**Type:** `IcDatepickerQuickOption[]`

### Default

```typescript
{
  dayQuickOptions: [
   {
     label: 'Today',
     date: Moment()
   },
   {
     label: 'Tomorrow',
     date: Moment().add(1, 'day')
   }
 ]
}
```

### +1 week and +1 month

```typescript
{
  dayQuickOptions: [
    {
      label: '+1 Week',
      date: Moment().add(1, 'week')
    },
    {
      label: '+1 Month',
      date: Moment().add(1, 'month')
    }
  ]
}
```
