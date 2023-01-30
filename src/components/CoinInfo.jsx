import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  LinearProgress,
  Stack,
  ThemeProvider,
  ToggleButton,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";

import { useCryptoContext } from "../CryptoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DayButton from "./DayButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const styles = {
  container: {
    width: { sx: "100%", md: "75%" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mt: { sx: 0, md: "25px" },
    p: { sx: "0 20px 20px", md: "40px" },
  },

  btnContainer: {
    display: "flex",
    mt: "20px",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
};

const CoinInfo = ({ coin }) => {
  if (!coin) <LinearProgress sx={{ background: "gold" }} />;
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { symbol, currency } = useCryptoContext();

  const fetchChartData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const darkTheme = createTheme({
    mode: "dark",
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack sx={styles.container}>
        {!historicalData ? (
          <CircularProgress sx={{ color: "gold" }} size={50} thickness={5} />
        ) : (
          <>
            <Line
              color="#fff"
              data={{
                labels: historicalData.map((data) => {
                  const date = new Date(data[0]);
                  const time =
                    date.getHours() > 12
                      ? ` ${date.getHours() - 12} : ${date.getMinutes()} PM `
                      : ` ${date.getHours()} : ${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((data) => data[1]),
                    label: `Price ( Past ${days} days )  in ${currency.toUpperCase()}`,
                    borderColor: "#ffFF00",
                  },
                ],
              }}
              options={{
                responsive: true,
                elements: { point: { radius: 1 } },
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                      font: {
                        size: 16,
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      color: "#ffFF00",
                      // font: {
                      //   size: 18,
                      // },
                    },
                  },
                  x: {
                    ticks: {
                      color: "#ffFF00",
                      // font: {
                      //   size: 14,
                      // },
                    },
                  },
                },
              }}
              contentEditable={false}
            />
            <Box sx={styles.btnContainer}>
              {chartDays.map((day) => (
                <DayButton
                  key={day.value}
                  clickHandler={() => setDays(day.value)}
                  isSelected={day.value === days}
                >
                  {" "}
                  {day.value}{" "}
                </DayButton>
              ))}
            </Box>
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default CoinInfo;
