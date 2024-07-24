
import Sidebar from "@/assets/home/Sidebar";



export default function Home() {
  return <div className="bg-black flex">
    <div className="w-1/6 bg-white">
    
  <Sidebar/>
    
    </div>
  
  <div className="flex-grow bg-gray-200">Main Content</div>
  
  </div>;
}
