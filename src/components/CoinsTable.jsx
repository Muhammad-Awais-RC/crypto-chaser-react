import {
  Container,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Pagination,
} from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CoinList } from "../config/api";
import { useCryptoContext } from "../CryptoContext";

const TABLE_HEADING = ["Coin", "Price", "24h_Change", "Market Cap"];

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { currency, symbol } = useCryptoContext();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  const filteredCoins = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" m="25px">
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search for Crypto Currency... "
          variant="outlined"
          sx={{ mb: "30px", width: "100%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress
              sx={{ background: "gold", height: "15px", borderRadius: "20px" }}
            />
          ) : (
            <Table>
              <TableHead sx={{ background: "#EEBC1D" }}>
                <TableRow>
                  {TABLE_HEADING.map((HEAD, i) => (
                    <TableCell
                      sx={{
                        color: "#000",
                        fontWeight: 700,
                      }}
                      key={i}
                      align={i === 0 ? "inherit" : "right"}
                    >
                      {HEAD}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCoins()
                  .splice((page - 1) * 10, 10)
                  .map((row) => {
                    const isProfit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        key={row.id}
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          width: "100%",
                          backgroundColor: "#16171a",
                          "&:hover": {
                            backgroundColor: "#131111",
                          },
                          cursor: "pointer",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: { xs: "center", md: "start" },
                            gap: "15px",
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            mb={10}
                          />

                          <Box>
                            <Typography
                              sx={{
                                textTransform: "uppercase",
                                fontSize: "22",
                              }}
                            >
                              {row.symbol}
                            </Typography>

                            <Typography color="darkgray">{row.name}</Typography>
                          </Box>
                        </TableCell>

                        <TableCell align="right">
                          {symbol +
                            " " +
                            Intl.NumberFormat().format(
                              parseInt(row.current_price.toFixed(2))
                            )}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            color: isProfit ? "#00FF00" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {isProfit && " + "}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol +
                            " " +
                            Intl.NumberFormat().format(
                              row.market_cap.toString().slice(0, -6)
                            ) +
                            " "}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={parseInt((filteredCoins()?.length / 10).toFixed(0))}
          sx={{
            p: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          shape="rounded"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
