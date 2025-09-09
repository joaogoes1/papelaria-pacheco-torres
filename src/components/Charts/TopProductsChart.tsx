import ReactECharts from 'echarts-for-react';
import React from 'react';

type Props = {
  produtos?: string[];
  quantidades?: number[];
  height?: number | string;
};

const TopProductsChart: React.FC<Props> = ({
  produtos = [
    'Marcador Permanente','Estojo Escolar','Papel Sulfite A4',
    'Caderno Universitário','Apontador','Cola Branca 90g',
    'Borracha','Tesoura','Lápis HB'
  ],
  quantidades = [20,18,16,15,13,11,11,10,7],
  height = 320,
}) => {
  const option: echarts.EChartsOption = {
    title: { text: 'Produtos Mais Vendidos', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: produtos, axisLabel: { rotate: 30 } },
    yAxis: { type: 'value', name: 'Quantidade Vendida' },
    series: [
      {
        type: 'bar',
        data: quantidades,
        itemStyle: { color: '#34c759' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width: '100%' }} />;
};

export default TopProductsChart;
