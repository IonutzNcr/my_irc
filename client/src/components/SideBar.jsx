import React from 'react';
import svg1 from '../assets/groupe.svg';
import svg2 from '../assets/forum.svg';

export const SideBar = ({setInRoom,setIsConnected,setName,socket, activeTab, setActiveTab}) => {

    //sert a se deconnecter 
    const disconect = () => {
        socket.emit("disconnected");
        // socket.disconnect();
        setName("");
        setIsConnected(false);
        setInRoom("default");

    }

    return (
        <div className='flex flex-col items-center gap-[100px] pt-[200px] pb-[30px] h-[100vh] w-[177px] bg-[#5566F8]'>
            <div onClick = {()=>{setActiveTab("users")}} className={`w-[60px] h-[60px] px-[16.07px] pt-[13.93px] pb-[15px] bg-gray-200 rounded-[66px] ${activeTab ==="users"? "border-4 border-[#4CFF2F]": ""} justify-center items-center inline-flex`}>
                <div className="w-[27.86px] h-[31.07px] flex justify-center items-center relative" >
                    <img className='' src={svg1} alt="icone" />
                </div>
            </div>

            <div onClick = {()=>{setActiveTab("rooms")}} className={`w-[60px] h-[60px] px-[16.07px] pt-[13.93px] pb-[15px] bg-gray-200 rounded-[66px] ${activeTab ==="rooms"? "border-4 border-[#4CFF2F]": ""} justify-center items-center inline-flex`}>
                <div className="w-[27.86px] h-[31.07px] flex justify-center items-center relative" >
                    <img className='' src={svg2} alt="icone" />
                </div>
            </div>

            <div className="  mt-[auto] w-[145px] h-11 relative shadow-lg">
                <div className="hover:bg-red-600 w-[145px] h-11 left-0 top-0 absolute bg-rose-600 rounded-[10px]  border border-indigo-600" />
                <div onClick={disconect} className="hover:bg-red-600 left-[26px] top-[14px] absolute text-white text-sm font-normal font-patua">Se deconnecter</div>
            </div>

        </div>
    )
}
