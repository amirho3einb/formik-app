import { useFormik } from "formik";
import * as Yup from 'yup';
// step 1
const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    passwordConfirm: "",
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
})


const SignUpForm = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });
 
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="formControl">
                    <label>Name</label>
                    <input 
                        type="text" 
                        {...formik.getFieldProps("name")}
                        name="name"
                    />
                    {formik.errors.name && formik.touched.name && <div className="error">{formik.errors.name}</div>}
                </div>
                <div className="formControl">
                    <label>Email</label>
                    <input 
                        type="text" 
                        {...formik.getFieldProps("email")} 
                        name="email"
                    />
                    {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
                </div>
                <div className="formControl">
                    <label>Phone Number</label>
                    <input 
                        type="text" 
                        {...formik.getFieldProps("phoneNumber")} 
                        name="phoneNumber"
                    />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber && <div className="error">{formik.errors.phoneNumber}</div>}
                </div>
                <div className="formControl">
                    <label>Password</label>
                    <input 
                        type="password" 
                        {...formik.getFieldProps("password")} 
                        name="password"
                    />
                    {formik.errors.password && formik.touched.password && <div className="error">{formik.errors.password}</div>}
                </div>
                <div className="formControl">
                    <label>Password Confimation</label>
                    <input 
                        type="password" 
                        {...formik.getFieldProps("passwordConfirm")} 
                        name="passwordConfirm"
                    />
                    {formik.errors.passwordConfirm && formik.touched.passwordConfirm && <div className="error">{formik.errors.passwordConfirm}</div>}
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;