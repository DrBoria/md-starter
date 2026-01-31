### AreaChart:

```jsx
import AreaChart from '.';

<>
  <div style={{ padding: '1rem', width: 500, height: 400 }}>
    <AreaChart
      data={[
        { xAxis: 'Mon', yAxis: 4000 },
        { xAxis: 'Tue', yAxis: 3000 },
        { xAxis: 'Wed', yAxis: 2000 },
        { xAxis: 'Thu', yAxis: 2780 },
        { xAxis: 'Fri', yAxis: 1890 },
        { xAxis: 'Sat', yAxis: 2390 },
        { xAxis: 'Sun', yAxis: 3490 },
      ]}
      hideAxisX={false}
      variant='green'
      yAxisTooltipName='yAxis'
    />
    <br />
    <h1>With reference line 2000</h1>
    <AreaChart
      data={[
        { xAxis: 'Mon', yAxis: 4000 },
        { xAxis: 'Tue', yAxis: 3000 },
        { xAxis: 'Wed', yAxis: 2000 },
        { xAxis: 'Thu', yAxis: 2780 },
        { xAxis: 'Fri', yAxis: 1890 },
        { xAxis: 'Sat', yAxis: 2390 },
        { xAxis: 'Sun', yAxis: 3490 },
      ]}
      referenceLine={2000}
      hideAxisX={false}
      variant='green'
      yAxisTooltipName='yAxis'
    />
  </div>
</>;
```
