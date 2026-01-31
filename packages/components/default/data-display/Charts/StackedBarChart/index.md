### StackedBarChart:

```jsx
import StackedBarChart from '.';

<>
  <div style={{ padding: '1rem', width: 500, height: 400 }}>
    <StackedBarChart
      data={[
        {
          name: 'Page A',
          uv: 400,
          pv: 600,
          vd: 1000,
        },
        {
          name: 'Page B',
          uv: 350,
          pv: 1000,
          vd: 650,
        },
        {
          name: 'Page C',
          uv: 600,
          pv: 400,
          vd: 1000,
        },
        {
          name: 'Page D',
          uv: 500,
          pv: 1000,
          vd: 500,
        },
      ]}
      title='Number of VRs + Physicals Trend'
    />
  </div>
</>;
```
