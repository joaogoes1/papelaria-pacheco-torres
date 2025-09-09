import ReactECharts from 'echarts-for-react';
import React, { useMemo } from 'react';

type Props = {
  n?: number;
  p?: number; 
  height?: number | string;
};

function binomialPMF(n: number, p: number) {
  function fact(num: number): number {
    return num <= 1 ? 1 : num * fact(num - 1);
  }
  function comb(n: number, k: number): number {
    return fact(n) / (fact(k) * fact(n - k));
  }
  const values: { x: number; y: number }[] = [];
  for (let k = 0; k <= n; k++) {
    const prob = comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    values.push({ x: k, y: prob });
  }
  return values;
}

const BinomialDistributionChart: React.FC<Props> = ({ n = 10, p = 0.05, height = 320 }) => {
  const data = useMemo(() => binomialPMF(n, p), [n, p]);

  const option: echarts.EChartsOption = {
    title: { text: `Distribuição Binomial (n=${n}, p=${p})`, left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', name: 'Defeitos', data: data.map(d => d.x) },
    yAxis: { type: 'value', name: 'Probabilidade' },
    series: [
      {
        type: 'bar',
        data: data.map(d => d.y),
        itemStyle: { color: '#007aff' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height, width: '100%' }} />;
};

export default BinomialDistributionChart;
