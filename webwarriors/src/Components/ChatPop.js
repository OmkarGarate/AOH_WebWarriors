import React, { useState } from 'react'
import '../css/chatPop.css'

function ChatPop() {
    const [cbStyle, setCbStyle] = useState({
        height: "0",
        width: "0"
    })

    const [cbt, setCbt] = useState(false)

    const handleClick = () =>{
        setCbt(!cbt);
        if(!cbt)
        {
            setCbStyle({
                height: "70vh",
                width: "100%"
            })
        }else{
            setCbStyle({
                height: "0",
                width: "0"
            })
        }
        
    }
      return (
    <div className='chatPop'>
        <div className="chatBox" style={cbStyle}>

        </div>
        <button onClick={handleClick}>Click me!</button>
    </div>
  )
}

export default ChatPop