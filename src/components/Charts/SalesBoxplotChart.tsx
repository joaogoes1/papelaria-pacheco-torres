import ReactECharts from 'echarts-for-react';
import React, { useMemo } from 'react';

type Props = {
  valores?: number[];
  titulo?: string;
  categoryLabel?: string;
  height?: number | string;
};

function quantile(sorted: number[], q: number) {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

function toBoxplot(values: number[]) {
  const s = [...values].sort((a, b) => a - b);
  const min = s[0];
  const q1 = quantile(s, 0.25);
  const med = quantile(s, 0.5);
  const q3 = quantile(s, 0.75);
  const max = s[s.length - 1];
  return [min, q1, med, q3, max];
}

const SalesBoxplotChart: React.FC<Props> = ({
  valores = [15, 22, 27, 30, 35, 40, 45, 52, 58, 60, 62, 70, 78, 82, 88, 95, 100],
  titulo = 'Boxplot das Vendas com Outliers',
  categoryLabel = 'total',
  height = 280,
}) => {
  const box = useMemo(() => toBoxplot(valores), [valores]);

  const option: echarts.EChartsOption = {
    title: { text: titulo, left: 'center' },
    grid: { left: 40, right: 30, top: 40, bottom: 40 },
    tooltip: { trigger: 'item' },
    xAxis: { type: 'category', data: [categoryLabel], axisTick: { show: false } },
    yAxis: {
      type: 'value',
      min: v => Math.floor((v.min as number) * 0.9),
      max: v => Math.ceil((v.max as number) * 1.1),
      splitLine: { show: true },
    },
    series: [
      {
        name: 'Vendas',
        type: 'boxplot',
        itemStyle: { borderWidth: 1.5 },
        data: [box],
      },
      {
        type: 'scatter',
        name: 'Observações',
        data: valores.map(v => [0, v]),
        symbolSize: 6,
        tooltip: { valueFormatter: v => `R$ ${Number(v).toFixed(2)}` },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width: '100%' }} />;
};

export default SalesBoxplotChart;
