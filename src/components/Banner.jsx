import { Box, Container, Stack, Typography } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Stack
      sx={{
        background: `url(https://img.freepik.com/free-vector/geometric-network-connection-background_23-2148876717.jpg?w=1060&t=st=1671812589~exp=1671813189~hmac=b26cae4ac779789c32c20c7095f2dbe5f5439eaa2167b8d2978020a76c752047

        )`,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          pt: "25px",
          height: 400,
        }}
      >
        <Box
          sx={{
            height: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: "15px",
              fontSize: { xs: "40px", sm: "60px" },
            }}
          >
            {" "}
            Crypto Chaser{" "}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
            }}
          >
            Get all the information about cryptos currencies
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Stack>
  );
};

export default Banner;

/*
https://img.freepik.com/free-vector/geometric-network-connection-background_23-2148876717.jpg?w=1060&t=st=1671812589~exp=1671813189~hmac=b26cae4ac779789c32c20c7095f2dbe5f5439eaa2167b8d2978020a76c752047



https://img.freepik.com/premium-photo/communication-technology-internet-business-global-world-network-telecommunication-earth-cryptocurrency-blockchain-iot-elements-this-image-furnished-by-nasa_102957-60.jpg?w=1480
*/
