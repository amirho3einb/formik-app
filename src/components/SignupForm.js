import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import CheckBoxInput from "./common/CheckBoxInput";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectComponent from "./common/SelectComponent";

// step 1
const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    passwordConfirm: "",
    gender: "",
    nationality: "",
    intrests: [],
    terms: false,
}

const checkBoxOptions = [
    { label: "React.js", value: "React.js"},
    { label: "Vue.js", value: "Vue.js"}
];
const radioOptions = [
    { label: "male", value: "0"},
    { label: "female", value: "1"}
];
const selectOptions = [
    { label: "select nationality ...", value: ""},
    { label: "Iran", value: "IR"},
    { label: "Germany", value: "GER"},
    { label: "USA", value: "US"}
];
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
    gender: Yup.string().required("Gender is required"),
    nationality: Yup.string().required("Nationality is required"),
    intrests: Yup.array().min(1).required("At least select one expertise"),
    terms: Yup.boolean().required("The terms and conditons must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
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
                <RadioInput formik={formik} radioOptions={radioOptions} name="gender"/>
                <SelectComponent formik={formik} name="nationality" selectOptions={selectOptions} />
                <CheckBoxInput formik={formik} checkBoxOptions={checkBoxOptions} name="intrests"/>
                <input 
                    type="checkbox"
                    id="terms"
                    name="terms"
                    value={true}
                    onChange={formik.handleChange}
                    checked={formik.values.terms}
                    onBlur={formik.handleBlur}
                />
                <label htmlFor="terms">Terms and Conditions</label>
                {formik.errors.terms && formik.touched.terms && <div className="error">{formik.errors.terms}</div>}
                <button type="submit" disabled={!formik.isValid}>submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;