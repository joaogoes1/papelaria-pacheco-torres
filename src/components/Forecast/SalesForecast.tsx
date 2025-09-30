import ReactECharts from 'echarts-for-react';
import {
  Activity,
  AlertCircle,
  Brain,
  CheckCircle,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { forecastAPI } from '../../services/api';
import { theme } from '../../styles/theme';

const Container = styled.div`
  padding: ${theme.spacing[6]} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]} 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[8]};
  gap: ${theme.spacing[4]};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing[6]};
  }
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize['5xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  letter-spacing: ${theme.typography.letterSpacing.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
    gap: ${theme.spacing[2]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const Controls = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;

    select, button {
      flex: 1;
    }
  }
`;

const Select = styled.select`
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.primary};
  background: ${theme.colors.white};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.blue.DEFAULT};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue.DEFAULT};
    box-shadow: 0 0 0 4px ${theme.colors.blue.DEFAULT}15;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing[3]} ${theme.spacing[5]};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-family: ${theme.typography.fontFamily.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  transition: all ${theme.transitions.normal};
  background: ${(props) =>
    props.variant === 'secondary' ? theme.colors.gray[100] : theme.colors.blue.DEFAULT};
  color: ${(props) => (props.variant === 'secondary' ? theme.colors.text.primary : theme.colors.white)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    background: ${(props) =>
      props.variant === 'secondary' ? theme.colors.gray[200] : theme.colors.blue.dark};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[2]} ${theme.spacing[4]};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[5]};
  margin-bottom: ${theme.spacing[8]};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing[4]};
    margin-bottom: ${theme.spacing[6]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.apple};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.appleLg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]};
  }
`;

const MetricLabel = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing[2]};
  text-transform: uppercase;
  font-weight: ${theme.typography.fontWeight.semibold};
  letter-spacing: ${theme.typography.letterSpacing.wider};
`;

const MetricValue = styled.div`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const MetricSubtext = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing[1]};
`;

const ChartCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.apple};
  border: 1px solid ${theme.colors.gray[200]};
  margin-bottom: ${theme.spacing[5]};
  transition: all ${theme.transitions.normal};

  &:hover {
    box-shadow: ${theme.shadows.appleLg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]};
  }
`;

const ChartTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[5]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing[4]};
  }
`;

const StatusBadge = styled.div<{ status: 'training' | 'ready' | 'error' }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
  background: ${(props) => {
    if (props.status === 'training') return theme.colors.warning + '20';
    if (props.status === 'ready') return theme.colors.success + '20';
    return theme.colors.error + '20';
  }};
  color: ${(props) => {
    if (props.status === 'training') return theme.colors.warning;
    if (props.status === 'ready') return theme.colors.success;
    return theme.colors.error;
  }};
  border: 1px solid ${(props) => {
    if (props.status === 'training') return theme.colors.warning + '40';
    if (props.status === 'ready') return theme.colors.success + '40';
    return theme.colors.error + '40';
  }};
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing[20]} ${theme.spacing[5]};
  gap: ${theme.spacing[4]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} ${theme.spacing[4]};
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing[20]} ${theme.spacing[5]};

  svg {
    margin-bottom: ${theme.spacing[5]};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing[3]};
  }

  p {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.secondary};
    max-width: 600px;
    margin: 0 auto;
    line-height: ${theme.typography.lineHeight.relaxed};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} ${theme.spacing[4]};

    h3 {
      font-size: ${theme.typography.fontSize.xl};
    }

    p {
      font-size: ${theme.typography.fontSize.sm};
    }
  }
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
          <EmptyStateContainer>
            <Brain size={80} color={theme.colors.gray[300]} />
            <h3>Previsão de Vendas com Machine Learning</h3>
            <p>
              Selecione um modelo de IA e o período desejado, depois clique em
              "Gerar Previsão" para treinar o modelo e visualizar as projeções
              de vendas futuras.
            </p>
          </EmptyStateContainer>
        </ChartCard>
      )}
    </Container>
  );
};

export default SalesForecast;