import ReactECharts from 'echarts-for-react';
import React from 'react';

type Props = {
  produtos?: string[];
  estoqueAtual?: number[];
  estoqueMin?: number[];
  height?: number | string;
};

const StockStatusChart: React.FC<Props> = ({
  produtos = [
    'Caneta Azul','Caderno Universitário','Lápis HB','Apontador',
    'Marcador Permanente','Cola Branca 90g','Borracha',
    'Tesoura','Papel Sulfite A4','Estojo Escolar'
  ],
  estoqueAtual = [73,253,67,154,158,140,47,95,82,145],
  estoqueMin = [64,64,64,64,64,64,64,64,64,64],
  height = 320,
}) => {
  const option: echarts.EChartsOption = {
    title: { text: 'Status de Estoque', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { top: 25 },
    xAxis: { type: 'category', data: produtos, axisLabel: { rotate: 30 } },
    yAxis: { type: 'value', name: 'Quantidade' },
    series: [
      { name: 'Estoque Mínimo', type: 'line', data: estoqueMin, itemStyle: { color: '#ff3b30' } },
      { name: 'Estoque Atual', type: 'bar', data: estoqueAtual, itemStyle: { color: '#007aff' } },
    ],
  };

  return <ReactECharts option={option} style={{ height, width: '100%' }} />;
};

export default StockStatusChart;
