### LineChart:

```jsx
import LineChart from '.';

<>
  <div style={{ padding: '1rem', width: 500, height: 400 }}>
    <LineChart
      data={[
        {
          name: '01',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: '02',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: '03',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: '04',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: '05',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: '06',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: '07',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ]}
      title='Number of VRs + Physicals Trend'
    />
  </div>
</>;
```
