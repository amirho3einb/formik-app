import { useFormik } from "formik";
import * as Yup from 'yup';
// step 1
const initialValues = {
    name: "",
    email: "",
    password: "",
}

// step 2
const onSubmit = (values) => {
    // console.log(values);
} 

// step 3
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password id required"),
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
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.name} 
                        name="name"
                    />
                    {formik.errors.name && formik.touched.name && <div className="error">{formik.errors.name}</div>}
                </div>
                <div className="formControl">
                    <label>Email</label>
                    <input 
                        type="text" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.email} 
                        name="email"
                    />
                    {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
                </div>
                <div className="formControl">
                    <label>Password</label>
                    <input 
                        type="text" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.password} 
                        name="password"
                    />
                    {formik.errors.password && formik.touched.password && <div className="error">{formik.errors.password}</div>}
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;