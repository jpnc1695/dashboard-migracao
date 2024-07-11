"use client";
import * as React from "react";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateUser } from "./actions";
import { toast } from "react-hot-toast";

const paperStyle = {
  padding: 20,
  height: "75%",
  width: 500,
  margin: "20px auto",
  backgroundColor: "rgba(255,255,255,0.9)",
};

const containerStyle = {
  backgroundImage: "url(/bokeh-313993_1280.jpg)",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/jpnc1695"
        target="_blank"
        rel="noreferrer"
      >
        João Paulo Nunes Costa
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function CadastroComponente() {
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [email, setEmail] = useState("");
  // prima.User.findMany();

  const stateEmail = (e: React.ChangeEvent<any>): void => {
    setEmail(e.target.value);
  };

  const stateSenha = (e: React.ChangeEvent<any>): void => {
    setPassWord(e.target.value);
  };
  const stateConfirmarSenha = (e: React.ChangeEvent<any>): void => {
    setConfirmPassWord(e.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const verificacaoSenhaEEmail = (
    emailUsuario: string,
    senhaUsuario: string,
    confirmarEmailUsuario: string
  ) => {
    const validarEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!validarEmail.test(emailUsuario)) {
      toast.error("E-mail inserido de formar errada, por favor verifique");
      return false;
    }

    if (senhaUsuario !== confirmarEmailUsuario) {
      toast.error("As senhas não estão iguais, por favor verifique.");
      return false;
    }

    return true;
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", bgcolor: "rgb(255,0,0)" }}
    >
      <CssBaseline />
      <Grid
        style={containerStyle}
        container
        component="main"
        sx={{ height: "100" }}
      >
        <Paper elevation={10} style={paperStyle}>
          <FormControl
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            variant="outlined"
            onChange={stateEmail}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              E-mail
            </InputLabel>
            <OutlinedInput type="email" label="E-mail" />
          </FormControl>
          <FormControl
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            variant="outlined"
            onChange={stateSenha}
          >
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            variant="outlined"
            onChange={stateConfirmarSenha}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirmar Senha
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="COnfirmar Senha"
            />
            {passWord !== confirmPassWord ? (
              <FormHelperText id="component-helper-text">
                {" "}
                As senhas devem ser iguais.{" "}
              </FormHelperText>
            ) : (
              ""
            )}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={async () => {
                if (!verificacaoSenhaEEmail(email, passWord, confirmPassWord)) {
                  return;
                } else {
                  const result = await CreateUser(email, passWord);
                  if (result == "P2002") {
                    toast.error("E-mail já cadastrado");
                  } else {
                    toast.success("Usuário criado com sucesso.");
                    console.log(result);
                  }
                }
              }}
              sx={{ margin: "8px 0" }}
              fullWidth
            >
              Cadastrar
            </Button>
            <Button
              onClick={() => {
                navigate.push("/");
              }}
              type="submit"
              variant="contained"
              sx={{ margin: "8px 0" }}
              fullWidth
            >
              Voltar
            </Button>
          </FormControl>
          <Copyright sx={{ mt: 5 }} />
        </Paper>
      </Grid>
    </Grid>
  );
}
