import ReactECharts from 'echarts-for-react';
import React from 'react';

type Props = {
  clientes?: string[];
  totais?: number[];
  height?: number | string;
};

const SalesPerClientChart: React.FC<Props> = ({
  clientes = [
    'Alexia da Cunha','Marina Cirino','Nicolas Cavalcante','Isis Ferreira',
    'Luan Siqueira','Daniel Cavalcante','Dr. Bento Pinto','Levi Moraes',
    'Maria Novais','Kaique Costa'
  ],
  totais = [100,95,90,85,80,70,60,50,40,30],
  height = 320,
}) => {
  const option: echarts.EChartsOption = {
    title: { text: 'Total de Vendas por Cliente', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: clientes, axisLabel: { rotate: 30 } },
    yAxis: { type: 'value', name: 'Total' },
    series: [
      {
        type: 'bar',
        data: totais,
        itemStyle: { color: '#5ac8fa' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width: '100%' }} />;
};

export default SalesPerClientChart;
