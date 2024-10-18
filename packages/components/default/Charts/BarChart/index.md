### BarChart:

```jsx
import BarChart from '.';

<>
  <div style={{ padding: '1rem', width: 500, height: 400 }}>
    <BarChart
      data={[
        {
          name: 'Page A',
          Param1: 4242,
          Param2: 3411,
          fields: [
            {
              param: 'Param1',
              fill: '#FF7664',
            },
            {
              param: 'Param2',
              fill: '#3DC694',
            },
          ],
        },
        {
          name: 'Page B',
          Param1: 3214,
          Param2: 2233,
          fields: [
            {
              param: 'Param1',
              fill: '#FF7664',
            },
            {
              param: 'Param2',
              fill: '#3DC694',
            },
          ],
        },
      ]}
      hideAxisX={false}
      variant='green'
      yAxisTooltipName='yAxis'
    />
  </div>
</>;
```
