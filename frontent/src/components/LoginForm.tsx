import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormEvent,  useEffect,  useState } from "react";
import {Eye , EyeOff} from 'lucide-react'
import { useGoogleLogin } from "@react-oauth/google";
 import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/slice";
import useRequest from "@/hooks/useRequest";
import { userRoute } from "@/service/endPoints";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const [error] = useState({
    email:false,
    password:false,
    name:false,
  });
  
  const navigate = useNavigate();
  const {doRequest:login,errors:errorLogin} = useRequest({
    url:userRoute.signIn,
    method:'post',
    body:{
       email,password
    },
    onSuccess:()=>navigate("/home")
});
  const {doRequest:signUp,errors:errorSignUp} = useRequest({
    url:userRoute.signUp,
    method:'post',
    body:{
       email,name,password
    },
    onSuccess:()=>navigate("/home")
});
  const {doRequest:googleAuth,errors:errorGoogle} = useRequest({
    url:userRoute.googleAuth,
    method:'post',
    body:{},
    onSuccess:()=>navigate("/home")
});
  
 //TODO login and signUp

  const handleSubmit = async(e: FormEvent) => {
      e.preventDefault();
      if(page=="signUp"){
        const response = await signUp()
        if(response.success){
             dispatch(setUser(response.user))
             navigate("/home")
        }
      }else{
        const data =  await login({email,password});
        if(data.success){
          dispatch(setUser(data.user))
          navigate("/home")
        }
      }
  };

  //TODO login and signUp

  //TODO google login and signUp
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          import.meta.env.VITE_GOOGLE_LOGIN_URL,
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const res  = await googleAuth({email:userInfo.data.email,password:userInfo.data.id})
        console.log("hi",res);
        
        if(res.success){
          dispatch(setUser(res.user))
            navigate("/home")
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
  });

 //TODO google login and signUp end

  //! errors start
  useEffect(()=>{
    errorLogin?.length!>0&&errorLogin!.map((err)=>toast.error(err.message))
    errorSignUp?.length!>0&&errorSignUp!.map((err)=>toast.error(err.message))
    errorGoogle?.length!>0&&errorGoogle!.map((err)=>toast.error(err.message))
  },[errorLogin,errorSignUp,errorGoogle])
  //! errors end

  return (
   <div >
     <Card className="w-[350px]">
      <CardHeader className="flex items-center">
        <CardTitle>Welcom Back</CardTitle>
        <CardDescription>{page=="signIn"?'Sign In':'Sign Up'} with your google.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Button
            type="button"
            onClick={()=>googleLogin()}
            variant="outline"
            className="w-full border-1 border-amber-950 mb-3 rounded text-black "
          >
            
            Google Login
          </Button>
          <div  className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
          <div className="grid w-full items-center gap-4 ">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="Email"
                placeholder="Email"
              />
             {error.email&&<span className="text-danger text-sm">This field is required</span>}
            </div>
            {page=="signUp"&& <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Name">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="Name"
                placeholder="Name"
              />
              {error.name&&<span className="text-danger text-sm">This field is required</span>}
            </div>}
            <div className="flex flex-col space-y-1.5 ">
                <div className="relative">
                <Label htmlFor="Password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="Password"
                placeholder="Password"
                type={showPassword ?"string":"password"}
              />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                </div>
           
              {error.password&&<span className="text-danger text-sm">This field is required</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
        
          <Button
            type="submit"
            variant="outline"
            className="w-full mb-3 border-1 border-amber-950 rounded text-black "
          >
           {page=="signIn"?'Sign In':'Sign Up'}
          </Button>
          <div>
            Don't have n account? <span onClick={()=>{
                if(page=="signIn"){
                    setPage("signUp")
                }else{
                    setPage("signIn")
                }
            }} className="underline cursor-pointer">{page=="signIn"?'Sign Up':'Sign In'}</span>
          </div>
        </CardFooter>
      </form>
    </Card>
   </div>
  );
};

export default LoginForm;
