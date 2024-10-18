import { BarChart, Bar, XAxis, YAxis } from 'recharts';

import { Wrapper } from './styles';
import { TProps } from './types';

const StackedBarChart = ({ data, variant, referenceLine, ...props }: TProps) => {
  return (
    <Wrapper variant={variant} referenceLine={referenceLine} {...props}>
      <BarChart width={500} height={300} data={data} layout='vertical'>
        <XAxis type='number' hide />
        <YAxis dataKey='name' type='category' />
        <Bar dataKey='pv' stackId='a' fill='#8884d8' barSize={25} radius={[15, 0, 0, 15]} />
        <Bar dataKey='vd' stackId='a' fill='grey' barSize={25} />
        <Bar dataKey='uv' stackId='a' fill='#82ca9d' barSize={25} radius={[0, 15, 15, 0]} />
      </BarChart>
    </Wrapper>
  );
};

export default StackedBarChart;
