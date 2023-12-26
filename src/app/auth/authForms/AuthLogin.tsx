import {
	Box,
	Typography,
	FormGroup,
	FormControlLabel,
	Button,
	Stack,
	Divider,
	CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { getInfo, login } from "../api";
import { useState } from "react";

const validationSchema = yup.object({
	email: yup
		.string()
		// .email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password should be of minimum 6 characters length")
		.required("Password is required"),
});

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setLoading(true);
			login({
				username: values.email,
				password: values.password,
			})
				.then((res) => {
					router.push("/");
				})
				.finally(() => {
					setLoading(false);
				});
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			{title ? (
				<Typography fontWeight="700" variant="h3" mb={1}>
					{title}
				</Typography>
			) : null}

			{subtext}

			{/* <AuthSocialButtons title="Sign in with" /> */}
			{/* <Box mt={3}>
    <Divider>
      <Typography
        component="span"
        color="textSecondary"
        variant="h6"
        fontWeight="400"
        position="relative"
        px={2}
      >
        or sign in with
      </Typography>
    </Divider>
  </Box> */}

			<Stack>
				<Box>
					<CustomFormLabel htmlFor="email">Email</CustomFormLabel>
					<CustomTextField
						fullWidth
						id="email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
				</Box>
				<Box>
					<CustomFormLabel htmlFor="password">Password</CustomFormLabel>
					<CustomTextField
						fullWidth
						id="password"
						name="password"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
				</Box>
				<Stack
					justifyContent="space-between"
					direction="row"
					alignItems="center"
					my={2}
				>
					<FormGroup>
						<FormControlLabel
							control={<CustomCheckbox defaultChecked />}
							label="Remeber"
						/>
					</FormGroup>
					<Typography
						component={Link}
						href="/auth/auth1/forgot-password"
						fontWeight="500"
						sx={{
							textDecoration: "none",
							color: "primary.main",
						}}
					>
						Forgot Password ?
					</Typography>
				</Stack>
			</Stack>
			<Box>
				<Button
					color="primary"
					variant="contained"
					size="large"
					fullWidth
					// component={Link}
					// href="/"
					type="submit"
				>
					{loading ? <CircularProgress color="inherit" size={24} /> : "Sign In"}
				</Button>
			</Box>
			{subtitle}
		</form>
	);
};

export default AuthLogin;
