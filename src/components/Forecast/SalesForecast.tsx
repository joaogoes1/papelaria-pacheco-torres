import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  TrendingUp,
  Brain,
  Activity,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import { forecastAPI } from '../../services/api';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 20px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1d1d1f;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Select = styled.select`
  padding: 10px 16px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #007aff;
  }

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  background: ${(props) =>
    props.variant === 'secondary' ? '#f5f5f7' : '#007aff'};
  color: ${(props) => (props.variant === 'secondary' ? '#1d1d1f' : 'white')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;

const MetricLabel = styled.div`
  font-size: 13px;
  color: #86868b;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-weight: 600;
`;

const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1d1d1f;
`;

const MetricSubtext = styled.div`
  font-size: 12px;
  color: #86868b;
  margin-top: 4px;
`;

const ChartCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 20px;
`;

const StatusBadge = styled.div<{ status: 'training' | 'ready' | 'error' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => {
    if (props.status === 'training') return '#fff3cd';
    if (props.status === 'ready') return '#d4edda';
    return '#f8d7da';
  }};
  color: ${(props) => {
    if (props.status === 'training') return '#856404';
    if (props.status === 'ready') return '#155724';
    return '#721c24';
  }};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  font-size: 16px;
  color: #86868b;
`;

interface ForecastData {
  dates: string[];
  predicted: number[];
  lower_bound: number[];
  upper_bound: number[];
  confidence_interval: number;
}

interface Metrics {
  mae: number;
  rmse: number;
  mape: number;
  r2: number;
}

const SalesForecast: React.FC = () => {
  const [modelType, setModelType] = useState<string>('prophet');
  const [daysAhead, setDaysAhead] = useState<number>(30);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [isForecast, setIsForecast] = useState<boolean>(false);
  const [status, setStatus] = useState<'training' | 'ready' | 'error'>('ready');
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [dataPoints, setDataPoints] = useState<number>(0);

  const handleAutoForecast = async () => {
    setIsTraining(true);
    setStatus('training');

    try {
      toast.info('Treinando modelo de Machine Learning...', {
        autoClose: 2000,
      });

      const response = await forecastAPI.autoForecast(daysAhead, modelType);
      const data = response.data;

      // Extract metrics from training
      setMetrics(data.training.metrics);
      setDataPoints(data.historical_data_points);

      // Extract forecast
      setForecastData(data.forecast.forecast);

      setStatus('ready');
      toast.success(
        `Modelo ${modelType.toUpperCase()} treinado e previsão gerada com sucesso!`
      );
    } catch (error: any) {
      console.error('Error generating forecast:', error);
      setStatus('error');
      toast.error(
        error.response?.data?.error ||
          'Erro ao gerar previsão. Verifique se há dados suficientes de vendas.'
      );
    } finally {
      setIsTraining(false);
      setIsForecast(true);
    }
  };

  const getForecastChartOptions = () => {
    if (!forecastData) return {};

    return {
      title: {
        text: `Previsão de Vendas - Próximos ${daysAhead} Dias`,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params: any) => {
          const date = params[0].axisValue;
          let result = `<strong>${date}</strong><br/>`;
          params.forEach((param: any) => {
            result += `${param.marker} ${param.seriesName}: R$ ${param.value.toFixed(2)}<br/>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Previsto', 'Limite Inferior', 'Limite Superior'],
        bottom: 10,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: forecastData.dates,
        axisLabel: {
          rotate: 45,
          formatter: (value: string) => {
            const date = new Date(value);
            return `${date.getDate()}/${date.getMonth() + 1}`;
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Vendas (R$)',
        axisLabel: {
          formatter: (value: number) => `R$ ${value.toFixed(0)}`,
        },
      },
      series: [
        {
          name: 'Limite Inferior',
          type: 'line',
          data: forecastData.lower_bound,
          lineStyle: {
            opacity: 0.5,
            type: 'dashed',
          },
          itemStyle: {
            color: '#ff9500',
          },
          symbol: 'none',
        },
        {
          name: 'Previsto',
          type: 'line',
          data: forecastData.predicted,
          lineStyle: {
            width: 3,
          },
          itemStyle: {
            color: '#007aff',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 122, 255, 0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 122, 255, 0.05)',
                },
              ],
            },
          },
        },
        {
          name: 'Limite Superior',
          type: 'line',
          data: forecastData.upper_bound,
          lineStyle: {
            opacity: 0.5,
            type: 'dashed',
          },
          itemStyle: {
            color: '#34c759',
          },
          symbol: 'none',
        },
      ],
    };
  };

  return (
    <Container>
      <Header>
        <Title>
          <Brain size={32} />
          Previsão de Vendas com IA
        </Title>
        <StatusBadge status={status}>
          {status === 'training' && (
            <>
              <RefreshCw size={14} className="spin" />
              Treinando...
            </>
          )}
          {status === 'ready' && (
            <>
              <CheckCircle size={14} />
              Pronto
            </>
          )}
          {status === 'error' && (
            <>
              <AlertCircle size={14} />
              Erro
            </>
          )}
        </StatusBadge>
      </Header>

      <Controls>
        <Select
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          disabled={isTraining}
        >
          <option value="prophet">Prophet (Facebook) - Recomendado</option>
          <option value="arima">ARIMA (Estatístico)</option>
          <option value="lstm">LSTM (Deep Learning)</option>
          <option value="ensemble">Ensemble (Melhor Acurácia)</option>
        </Select>

        <Select
          value={daysAhead}
          onChange={(e) => setDaysAhead(Number(e.target.value))}
          disabled={isTraining}
        >
          <option value={7}>7 dias</option>
          <option value={14}>14 dias</option>
          <option value={30}>30 dias</option>
          <option value={60}>60 dias</option>
          <option value={90}>90 dias</option>
        </Select>

        <Button onClick={handleAutoForecast} disabled={isTraining}>
          {isTraining ? (
            <>
              <RefreshCw size={16} className="spin" />
              Processando...
            </>
          ) : (
            <>
              <TrendingUp size={16} />
              Gerar Previsão
            </>
          )}
        </Button>
      </Controls>

      {metrics && (
        <Grid>
          <MetricCard>
            <MetricLabel>Acurácia (R²)</MetricLabel>
            <MetricValue>
              {(metrics.r2 * 100).toFixed(1)}%
            </MetricValue>
            <MetricSubtext>
              {metrics.r2 > 0.8
                ? 'Excelente'
                : metrics.r2 > 0.6
                ? 'Bom'
                : 'Regular'}
            </MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Erro Médio (MAE)</MetricLabel>
            <MetricValue>R$ {metrics.mae.toFixed(2)}</MetricValue>
            <MetricSubtext>Menor é melhor</MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Erro % (MAPE)</MetricLabel>
            <MetricValue>{metrics.mape.toFixed(1)}%</MetricValue>
            <MetricSubtext>
              {metrics.mape < 10
                ? 'Ótimo'
                : metrics.mape < 20
                ? 'Aceitável'
                : 'Melhorar'}
            </MetricSubtext>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Dados de Treino</MetricLabel>
            <MetricValue>{dataPoints}</MetricValue>
            <MetricSubtext>dias de histórico</MetricSubtext>
          </MetricCard>
        </Grid>
      )}

      {isTraining && !forecastData && (
        <LoadingSpinner>
          <RefreshCw size={24} className="spin" style={{ marginRight: 12 }} />
          Treinando modelo de Machine Learning...
        </LoadingSpinner>
      )}

      {forecastData && (
        <ChartCard>
          <ChartTitle>
            <Activity size={20} style={{ marginRight: 8 }} />
            Gráfico de Previsão
          </ChartTitle>
          <ReactECharts
            option={getForecastChartOptions()}
            style={{ height: '500px' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </ChartCard>
      )}

      {!isForecast && !isTraining && (
        <ChartCard>
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Brain size={64} color="#d2d2d7" style={{ marginBottom: 20 }} />
            <h3 style={{ color: '#1d1d1f', marginBottom: 12 }}>
              Previsão de Vendas com Machine Learning
            </h3>
            <p style={{ color: '#86868b', maxWidth: 600, margin: '0 auto' }}>
              Selecione um modelo de IA e o período desejado, depois clique em
              "Gerar Previsão" para treinar o modelo e visualizar as projeções
              de vendas futuras.
            </p>
          </div>
        </ChartCard>
      )}
    </Container>
  );
};

export default SalesForecast;