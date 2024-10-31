import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const ChartBox = styled.div`
  color: ${(props) => props.theme.accentColor}
`;

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const candlestickData = data?.map((price) => ({
    x: new Date(price.time_close * 1000),
    y: [price.open, price.high, price.low, price.close],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ChartBox>
          <ApexCharts
            type="candlestick"
            series={[
              {
                name: "Price",
                data: candlestickData as { x: Date; y: number[] }[],
              },
            ]}
            options={{
              chart: {
                height: 350,
                type: "candlestick",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                type: "datetime",
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                },
              },
              yaxis: {
                show: false,
                tooltip: {
                  enabled: false,
                },
              },
              grid: {
                show: false,
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
                marker: {
                  show: false,
                },
              },
            }}
          />
        </ChartBox>
      )}
    </div>
  );
}

export default Chart;
