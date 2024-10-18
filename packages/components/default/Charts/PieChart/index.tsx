import { PieChart as DefaultPieChart, Cell, Pie } from 'recharts';

import { GraphicsContainer, LegendContainer, LegendRowContainer } from '../styles';
import { PlainText } from '../../Typography';

import { NameContainer, ColoredDot } from './styles';
import { TProps } from './types';

const PieChart = ({ data }: TProps) => {
  const COLORS = ['#FF7664', '#3DC694', '#FFAD4F', '#754A89', '#498DF2'];

  return (
    <GraphicsContainer>
      <DefaultPieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey='totalSales'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={100}
          paddingAngle={0}
          blendStroke
        >
          {data.map((item, index) => (
            <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </DefaultPieChart>
      <LegendContainer>
        {data.map((item, index) => (
          <LegendRowContainer key={item.name}>
            <NameContainer>
              <ColoredDot color={COLORS[index % COLORS.length]} />
              <PlainText>{item.name}</PlainText>
            </NameContainer>
            <PlainText>{item.totalSales}</PlainText>
          </LegendRowContainer>
        ))}
      </LegendContainer>
    </GraphicsContainer>
  );
};

export default PieChart;
