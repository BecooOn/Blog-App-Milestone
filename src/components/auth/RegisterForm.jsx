import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";
import { btnStyle } from "../../styles/globalStyles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const registerSchema = object({
  username: string()
    .max(20, "Username must be less than 20 characters.")
    .required("Username is required."),
  firstName: string()
    .max(20, "The first name must be less than 20 characters.")
    .required("The first name is required"),
  lastName: string()
    .max(20, "The surname must be less than 20 characters.")
    .required("The surname is required"),
  email: string()
    .email("Please enter a valid email.")
    .required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/\d+/, "Password must contain a number")
    .matches(/[a-zçöşüğı]+/, "Password must contain one lowercase letter")
    .matches(/[A-ZÇÖŞÜĞİ]+/, "Password must contain one uppercase letter")
    .matches(
      /[!/[@$!%*?&]+/,
      "The password must contain at least one special character (!/[@$!%*?&)."
    ),
});

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="User Name *"
          name="username"
          id="userName"
          type="text"
          variant="outlined"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          label="First Name *"
          name="firstName"
          id="firstName"
          type="text"
          variant="outlined"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          label="Last Name *"
          name="lastName"
          id="lastName"
          type="text"
          variant="outlined"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          label="Email *"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          label="City"
          name="city"
          id="city"
          type="text"
          variant="outlined"
          value={values.city}
          onChange={handleChange}
        />
        <TextField
          label="Image"
          name="image"
          id="image"
          type="url"
          variant="outlined"
          value={values.image}
          onChange={handleChange}
        />
        <TextField
          label="Bio"
          name="bio"
          id="bio"
          type="text"
          variant="outlined"
          value={values.bio}
          onChange={handleChange}
        />
        <TextField
          label="password *"
          name="password"
          id="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          size="large"
          sx={btnStyle}
        >
          Submit
        </Button>
      </Box>
    </Form>
  );
};

export default RegisterForm;
