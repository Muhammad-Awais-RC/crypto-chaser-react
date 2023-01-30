import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCryptoContext } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import parse from "html-react-parser";
import { type } from "@testing-library/user-event/dist/type";
import { style } from "@mui/system";

const styles = {
  container: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    alignItems: {
      xs: "center",
      md: "flex-start",
    },
  },
  sidebar: {
    width: { sx: "100%", md: "30%" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: "25px",
    borderRight: "2px solid gray",
    mb: "50px",
  },
  heading: {
    fontWeight: "bold",
    mb: "20px",
  },
  discription: {
    width: "100%",
    p: "0 25px 15px",
    textAlign: "justify",
    "& a": {
      color: "gold",
    },
  },
  marketData: {
    alignSelf: "start",

    width: "100%",
    p: "10px 25px 25px",
    display: "flex",
    justifyContent: {
      sm: "space-around",
      md: "space-between",
    },
    alignItems: {
      xs: "center",
      md: "start",
    },

    flexDirection: "column",
  },
};

const CoinPage = () => {
  const [coin, setCoin] = useState();
  const { id } = useParams();

  const { currency, symbol } = useCryptoContext();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin) return <LinearProgress sx={{ background: "gold" }} />;

  return (
    <Box sx={styles.container}>
      <Stack sx={styles.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ margin: "0 0 20px" }}
        />

        <Typography variant="h3" sx={styles.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" sx={styles.discription}>
          {coin && parse(coin?.description.en.split(". ")[0])}.
        </Typography>

        <Box sx={styles.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={styles.heading}>
              Rank : &nbsp;
            </Typography>
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={styles.heading}>
              Current Price : &nbsp;
            </Typography>
            <Typography variant="h5">
              {symbol +
                " " +
                Intl.NumberFormat().format(
                  coin?.market_data.current_price[currency]
                )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={styles.heading}>
              Market Cap : &nbsp;
            </Typography>
            <Typography variant="h5">
              {symbol +
                " " +
                Intl.NumberFormat().format(
                  coin?.market_data.market_cap[currency].toString().slice(0, -6)
                )}
              M
            </Typography>
          </span>
        </Box>
      </Stack>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
