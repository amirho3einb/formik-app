import { useFormik } from "formik";

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
const validate = (values) => {
    let errors = {};
    if(!values.name){
        errors.password = "Name is Required";
    }
    if(!values.email){
        errors.password = "Email is Required";
    }
    if(!values.password){
        errors.password = "Password is Required";
    }
    return errors;
}
const SignUpForm = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    });
 
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="formControl">
                    <label>Name</label>
                    <input 
                        type="text" 
                        onChange={formik.handleChange} 
                        value={formik.values.name} 
                        name="name"
                    />
                </div>
                <div className="formControl">
                    <label>Email</label>
                    <input 
                        type="text" 
                        onChange={formik.handleChange} 
                        value={formik.values.email} 
                        name="email"
                    />
                </div>
                <div className="formControl">
                    <label>Password</label>
                    <input 
                        type="text" 
                        onChange={formik.handleChange} 
                        value={formik.values.password} 
                        name="password"
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;