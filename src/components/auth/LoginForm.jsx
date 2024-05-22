import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";
import { btnStyle } from "../../styles/globalStyles";

export  const loginSchema = object({
    email: string()
      .email("Enter a valid email")
      .required("Email is required"), //* required içerisine mesaj yazılmazsa otomatik mesaj oluşturur, biz burada mesaj yazdığımız için bizim mesajımız kullanıcıya gösterilecek
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[@$!%*?&.,]+/,
        "The password must contain at least one special character(@$!%*?&.,)."
      ), //? password'de daha fazla zorunluluk olacağı için minimum karakter max karakter özel karakter vs. bunlar regex ile vd. fonksiyonlar ile buraya eklenebilir. regex'ler matches() ile eklenir. Burada ayrı ayrı matches() yaptık, bu şekilde kullanım kullanıcıyı yönlendirmek için iyidir. Validation için backend tarafında oluşturulan regex e  göre kriterler burada oluşturulur. FE ve BE aynı validasyon pateernini içermelidir
  });

const LoginForm = ({
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
}) => {
  return (
    <Form>
      {/* //?Form formikten import edildi */}
      {/* //!Box,Textfield bunlar mui component'leridir */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email *"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          value={values.email} //* email'i yakalamak için
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)} //* email input alanına dokunulduysa ve yup'tan hata mesajı var mı sonucuna göre error true olursa helperText değeri ekrana kırmızı yazılır. touched.email boolean sonuç getiri ancak errors.email string olacağı için boolean yaptık
          helperText={touched.email && errors.email} //*Girilen bilgilere göre hata mesajlarının değişimini yup ile oluşturacağız. error true ise errors içindeki email mesajını ekrana hata mesajı olarak yaz. Burada touched.email kontrolünü yaptık; çünkü biz daha email alanına dokunmadan hata mesajı almamak için bunu yaptık.
        />
        <TextField
          label="Password *"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          value={values.password} //* password'ü yakalamak için
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting} //? submit işlemi devam ederken buton disable edilir
          sx={btnStyle}
        >
          Submit
        </Button>
      </Box>
    </Form>
  );
};

export default LoginForm;
