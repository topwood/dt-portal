import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import { Link } from 'react-router-dom';
import Link from "next/link";

import {
	Box,
	Button,
	Stack,
	FormGroup,
	FormControlLabel,
	Typography,
} from "@mui/material";

import CustomTextField from "../theme-elements/CustomTextField";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomCheckbox from "../theme-elements/CustomCheckbox";

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
});

const FVRegister = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	console.log(formik.isValid, formik.isSubmitting, formik.errors);
	return (
		<form onSubmit={formik.handleSubmit}>
			<Stack>
				<Box>
					<CustomFormLabel>Email Address</CustomFormLabel>
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
				<Box mb={3}>
					<CustomFormLabel>Password</CustomFormLabel>
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
			</Stack>
			<Stack
				justifyContent="space-between"
				direction="row"
				alignItems="center"
				mb={2}
			>
				{/* <FormGroup>
					<FormControlLabel
						control={<CustomCheckbox defaultChecked />}
						label="Remeber"
					/>
				</FormGroup> */}
				<Typography
					component={Link}
					href="/auth/auth1/forgot-password"
					fontWeight={600}
					sx={{
						textDecoration: "none",
						color: "primary.main",
					}}
				>
					Forgot Password ?
				</Typography>
			</Stack>
			<Button color="primary" variant="contained" type="submit">
				Sign In
			</Button>
			<Button variant="contained" type="submit">
				Submit
			</Button>
		</form>
	);
};

export default FVRegister;
