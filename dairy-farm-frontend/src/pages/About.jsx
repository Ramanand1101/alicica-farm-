import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About(){
    return(
        <>
        <Navbar/>
           <div className="mt-20 w-full">
            <h1 className="text-3xl font-bold">About Us</h1>
        </div>
        <Footer/>
        </>
    )
}