#### `disableDayFn`

---

Function returning true if the provided day should be disabled.

**Type:** `Function`

**Default:** `() => { return false; }`

### Disable Mondays and Wednesdays

```typescript
{
  disableDayFn: (dayMomentInstance) => {
    return (1 === dayMomentInstance.isoWeekday() || 3 === dayMomentInstance.isoWeekday());
  }
}
```
