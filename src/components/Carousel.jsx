import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../config/api";
import { useCryptoContext } from "../CryptoContext";

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency, symbol } = useCryptoContext();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const priceChange24 = coin?.price_change_percentage_24h;

    const isProfit = priceChange24 >= 0;

    return (
      <Link to={`/coins/${coin.id}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textTransform: "uppercase",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <img
            src={coin?.image}
            alt={coin.name}
            height="80px"
            sx={{ mb: 10 }}
          />

          <Typography variant="p" m={"6px 0 0"}>
            {coin?.symbol}&nbsp;
            <Typography
              component="span"
              sx={{
                color: isProfit ? "rgb(14 , 203, 129) " : "red",
                fontWeight: 500,
              }}
            >
              {isProfit && "+"} {priceChange24.toFixed(2) + "%"}
            </Typography>
          </Typography>
          <Typography sx={{ fontSize: 21, fontWeight: 500 }}>
            {symbol}{" "}
            {Intl.NumberFormat().format(coin?.current_price.toFixed(2))}
          </Typography>
        </Box>
      </Link>
    );
  });

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTrackingEnabled="true"
        autoPlay="true"
        autoPlayInterval={1000}
        animationDuration={1500}
        infinite
        items={items}
        disableButtonsControls
        disableDotsControls
        responsive={{
          0: {
            items: 2,
          },
          512: {
            items: 4,
          },
        }}
      />
    </Box>
  );
};

export default Carousel;
