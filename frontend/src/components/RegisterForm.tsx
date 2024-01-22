import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import {
  Container,
  Typography,
  Button,
  CssBaseline,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AxiosInstance } from "../utils/functions";
import UserStore from "../stores/UserStore";
import "./RegisterForm.css";

function RegisterForm() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState<string | Blob>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setAvatar(e.target.files[0]);
    }
  };
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("username", username);
    data.append("password", password);
    data.append("password2", password2);
    data.append("about", about);
    data.append("email", email);
    data.append("birth_date", birth_date);
    data.append("gender", gender);
    data.append("avatar", avatar);

    AxiosInstance.post(`/registration/`, data)
      .then((res) => {
        setError("");
        UserStore.setToken(res.data.token);
        UserStore.setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        setError(JSON.stringify(err.response.data));
      });
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form onSubmit={handleRegister} className="form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="Имя"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              autoComplete="first_name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Фамилия"
              name="last_name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              autoComplete="last_name"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Подтверждение пароля"
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="password2"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="about"
              label="Информация"
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              autoComplete="about"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="birth_date"
              id="birth_date"
              type="date"
              value={birth_date}
              onChange={(e) => setBirth_date(e.target.value)}
              autoComplete="birth_date"
            />
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                variant="outlined"
                labelId="Пол"
                required
                fullWidth
                name="gender"
                id="gender"
                value={gender}
                label="Пол"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <input
              accept="image/*"
              name="avatar"
              type="file"
              multiple={false}
              onChange={(e) => handleAvatar(e)}
            />
            {error !== "" && <p>{error}</p>}
            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default observer(RegisterForm);
