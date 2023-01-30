import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useCryptoContext } from "../CryptoContext";

const Header = () => {
  const { currency, setCurrency } = useCryptoContext();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 75,
              alignItems: "center",
            }}
          >
            <Link to="/">
              <Typography
                variant="h4"
                sx={{
                  flex: 1,
                  fontSize: { xs: "29px", sm: "39px", md: "45px" },
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "gold",
                }}
              >
                Cyrpto Chaser
              </Typography>
            </Link>
            <Select
              sx={{
                width: "100px",
                height: "40px",
              }}
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"usd"}>USD</MenuItem>
              <MenuItem value={"pkr"}>PKR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
