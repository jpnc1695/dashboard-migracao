'use client';
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as MUILink } from '@mui/material';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "next-auth/react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MUILink
        color="inherit"
        href="https://github.com/jpnc1695"
        target="_blank"
        rel="noreferrer"
      >
        João Paulo Nunes Costa
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const supportedSocialLoginTypes = [
  // { name: 'LinkedIn', icon: LinkedInIcon },
  { name: "Github", icon: GitHubIcon },
];

const SignInSide = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/dahlia-6620610_1280.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Logar
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Digite seu Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Digite sua senha "
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar de mim ?"
              />
              <Link href={"/dashBoard"}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Entrar
                </Button>
              </Link>
              <Grid container>
                <Grid item xs>
                  <Link  href={"/cadastro"}>
                    Esqueceu sua senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={"/cadastro"}>
                    {"Não tem conta ? Crie agora"}
                  </Link>
                </Grid>
                {supportedSocialLoginTypes.map(({ name, icon: Icon }) => (
                  <Button
                    key={name}
                    startIcon={<Icon />}
                    variant={"contained"}
                    color={"primary"}
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => signIn("github", {callbackUrl:"/dashBoard"})}
                    fullWidth
                  >
                    {`Logar com ${name}`}
                  </Button>
                ))}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
