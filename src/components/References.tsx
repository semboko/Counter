import { ReactElement, useEffect, useRef, useState } from 'react';

export const SimpleReference = () => {

    const variable = "variable"
    const ref = useRef<string>("initial value")
    const [state, setState] = useState<string>("initial state")

    return (
        <>
        <div>Simple reference: {ref.current}</div>
        <div>Simple state: {state}</div>
        <button onClick={() => ref.current += "12"}>click ref</button>
        <button onClick={() => setState(state + "12")}>click state</button>
        </>
    )
}


export const CanvasReference = () => {

    const canv = useRef<HTMLCanvasElement | null>(null)
    const socket = useRef<WebSocket | null>(null)
    
    useEffect(() => {
        console.log(canv)
    }, [])

    useEffect(() => {
        if(socket.current !== null){
            return
        }
        socket.current = new WebSocket("https://....")
        socket.current.addEventListener("message", (message) => {
            
        })
        return () => {socket.current?.close()}
    }, [])

    return(
        <canvas ref={canv} id="adf" width={500} height={500}></canvas>
    )
}