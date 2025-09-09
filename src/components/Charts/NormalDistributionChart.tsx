import ReactECharts from 'echarts-for-react';
import React, { useMemo } from 'react';

type Props = {
  media?: number;
  desvio?: number;
  min?: number;
  max?: number;
  height?: number | string;
};

function normalPdf(x: number, mu: number, sigma: number) {
  const a = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const b = Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
  return a * b;
}

const NormalDistributionChart: React.FC<Props> = ({
  media = 59.5,
  desvio = 15,
  min = 20,
  max = 90,
  height = 320,
}) => {
  const data = useMemo(() => {
    const step = (max - min) / 100;
    const arr: { x: number; y: number }[] = [];
    for (let x = min; x <= max; x += step) {
      arr.push({ x, y: normalPdf(x, media, desvio) });
    }
    return arr;
  }, [media, desvio, min, max]);

  const option: echarts.EChartsOption = {
    grid: { left: 40, right: 20, top: 40, bottom: 40 },
    title: { text: 'Distribuição Normal das Vendas', left: 'center' },
    tooltip: { trigger: 'axis', valueFormatter: v => (typeof v === 'number' ? v.toFixed(4) : `${v}`) },
    xAxis: { type: 'value', name: 'Valor', min, max, axisLine: { show: false } },
    yAxis: { type: 'value', name: 'Densidade', axisLine: { show: false }, splitLine: { show: true } },
    series: [
      {
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: { opacity: 0.15 },
        emphasis: { focus: 'series' },
        data: data.map(p => [p.x, p.y]),
      },
      {
        type: 'line',
        data: [
          [media, 0],
          [media, Math.max(...data.map(d => d.y))],
        ],
        lineStyle: { type: 'dashed', width: 1.5 },
        symbol: 'none',
        tooltip: { show: false },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width: '100%' }} />;
};

export default NormalDistributionChart;
