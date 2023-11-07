import React from 'react'

export const DividerMe = ({who}) => {
    return (
        <div className="w-[393px] h-[46px] relative mb-[10px]">
            <div className="w-[393px] h-[46px] left-0 top-0 absolute bg-gray-200 rounded-[10px] shadow border border-indigo-600 border-opacity-0" />
            <div className="w-[374px] h-[17px] left-[10px] top-[14px] absolute">
                <div className="left-[180px] top-0 absolute text-blue-800 text-sm font-normal font-patua">{who}</div>
                <div className="w-[116px] h-[0px] left-0 top-[9px] absolute border border-black"></div>
                <div className="w-[108px] h-[0px] left-[266px] top-[9px] absolute border border-black"></div>
            </div>
        </div>
    )
}
