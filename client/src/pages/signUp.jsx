import {React, useState} from 'react'
import {motion} from 'framer-motion'
import {Mail, User, Lock, Loader} from 'lucide-react'
import Input from '../components/input';
import { NavLink, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/passwordStrengthMeter';
import {useAuthStore} from '../store/authStore'

const signUp = () =>   {

    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const navigate = useNavigate()

    const {signup,error,isLoading} = useAuthStore();

    const handleSignUp = async (e) =>{
        e.preventDefault()
    
    
    try {
      await signup (email, password, name)
      navigate("/verify-email")}
      catch(error) {
        console.log(error);
        
      }
      
    }

  return (
    <motion.div initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'

    >
    <div className="p-8 ">
        <h2  className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Create Account
        </h2>
        <form onSubmit={handleSignUp}>
        <Input
        icon={User}
        type="text"
        placeholder= "Enter Full Name"
        value={name}
        onChange = {(e) => setName(e.target.value)}
        />
        {/* <PasswordStrengthMeter password = {password} /> */}
        
         <Input
        icon={Mail}
        type="email"
        // placeholder= "Enter Your Email"
        value={email}
        onChange = {(e) => setEmail(e.target.value)}
        />
         <Input
        icon={Lock}
        type="pasword"
        // placeholder="Enter Password"
        value={password}
        onChange = {(e) => setPassword(e.target.value)}
        />

      {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
        {/* password strength meter */}
        {/* <PasswordStrengthMeter password = {password} /> */}
    <PasswordStrengthMeter password={password}/>
        
        <motion.button className="mt-5 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white
        fobt-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
        focus:ring-offset-gray-900 transition duration-200"
        whileHover={{scale:1.02}}
        whileTap={{scale:0.98}}   type = "submit" disabled={isLoading}>
      
       {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}

        </motion.button>
        </form> 
        </div> 
        <div className ='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center '>
          <p className ='text-sm text-gray-400'>
           Already have An Account? {""}
           <NavLink to = {"/login"} className='text-green-400'> Login</NavLink>
        </p>
          
          </div>   
    
    </motion.div>
  )
}

export default signUp
