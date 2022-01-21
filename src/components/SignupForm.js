import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import Input from "./common/Input";

// step 1
const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    passwordConfirm: "",
    gender: "",
}

// step 2
const onSubmit = (values) => {
    // console.log(values);
} 

// step 3
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(6,'Name length is not valid'),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required").matches(/^[0-9]{11}$/,'Invalid Phone Number').nullable(),
    password: Yup.string().required("Password id required").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordConfirm: Yup.string().required("Password Confirmation is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
    gender: Yup.string().required("Gender is required")
})


const SignUpForm = () => {
    const [formValues, setFormValues] = useState(null);
    const formik = useFormik({
        initialValues: formValues || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    });

    useEffect(()=> {
        axios.get('http://localhost:3001/users/1').then(res => setFormValues(res.data)).catch(err => console.log(err))
    }, [])
 
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Input formik={formik} name="name" label="name" />
                <Input formik={formik} name="email" label="Email" />
                <Input formik={formik} name="phoneNumber" label="Phone Number" />
                <Input formik={formik} name="password" label="Password" type="password"/>
                <Input formik={formik} name="passwordConfirm" label="Password Confimation" type="password"/>
                <div className="formControl">
                    <input 
                        type="radio"
                        id="0"
                        name="gender"
                        value="0"
                        onChange={formik.handleChange}
                        checked={formik.values.gender === "0"}
                    />
                    <label htmlFor="0">Male</label>
                    <input 
                        type="radio"
                        id="1"
                        name="gender"
                        value="1"
                        onChange={formik.handleChange}
                        checked={formik.values.gender === "1"}
                    />
                    <label htmlFor="1">Female</label>
                    {formik.errors.gender && formik.touched.gender && <div className="error">{formik.errors.gender}</div>}
                </div>
                <button type="submit" disabled={!formik.isValid}>submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;