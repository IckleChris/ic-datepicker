#### `customDayClasses`

---

Add custom classes to datepicker days based on provided criteria. The criteria callback is passed the <a href="http://momentjs.com/docs/" target="_blank">Moment</a> instance for each day in the currently visible month.

**Type:** `IcCustomDayClass[]`

**Default:** `[]`

### Add 'even' class to all even days

```typescript
{
  customDayClasses: [
    {
      classes: ['even'],
      callback: (dayMomentInstance: Moment) => {
        return (parseInt(momentInstance.format('DD')) % 2) === 0;
      }
    }
  ]
}
```

```css
// CSS
:host ::ng-deep .ic-datepicker .even {
  background: #FCF474;
}
```
