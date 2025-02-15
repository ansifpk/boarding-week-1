import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Drawer,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import useRequest from "@/hooks/useRequest";
import { IUser } from "@/lib/types";
import { wishlistRoute } from "@/service/endPoints";
import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Wishlist = () => {
    const [search , setSearch] = useState("")
    const [debouns , setDebouns] = useState("")
  const id = useSelector((state: IUser) => state._id);
  const { doRequest } = useRequest({
    url: `${wishlistRoute.wishlist}/${id}`,
    method: "get",
    body: {},
    onSuccess: () => {},
  });
  useEffect(() => {
    doRequest();
    
  }, []);
  useEffect(()=>{
   const intervel = setTimeout(() => {
       setDebouns(search)
   }, 600);
   return ()=>{
    clearTimeout(intervel)
   }
  },[search])
  return (
    <div className="bg-pink-50">
      <Header />
      <Drawer >
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent className="h-[550px]">
         <div className='flex w-full gap-1 justify-center items-center'>
           <Input type="text" className='bg-white text-black w-50 rounded-full' value={search} onChange={(e)=>{
            setSearch(e.target.value)
            setDebouns(e.target.value)

           }} placeholder='Search recipe here' />
           {search&&<i className="bi bi-x-circle text-secondary cursor-pointer" onClick={()=>setSearch("")}></i>}
         </div>
           <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Wishlist;
