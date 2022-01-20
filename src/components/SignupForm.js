import { useFormik } from "formik";

const SignUpForm = () => {

    // const [formik.values, setformik.values] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // });
    // const formik.handleChange = ({target}) => {
    //     setformik.values({ ...formik.values, [target.name]: target.value});
    // }

    const initialValues = {
        name: "",
        email: "",
        password: "",
    }
    const formik = useFormik({initialValues:initialValues});
    console.log(formik)

    const submitHandler = (e) => {
        e.preventDefault();

    }

    return ( 
        <div>
            <form onSubmit={submitHandler}>
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
                <button>submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;