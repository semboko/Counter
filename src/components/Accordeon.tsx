import { ReactElement, useEffect, useState } from 'react';

export const Accordeon = (props: {title: string, children: (width: number, height: number) => ReactElement, bulletIcon?: ReactElement}) => {

    const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight})

    useEffect(() => {
        const handleResize = () => {
            setSize({width: window.innerWidth, height: window.innerHeight})
        }
        window.addEventListener("resize", handleResize)
        return () => {window.removeEventListener("resize", handleResize)}
    })
    return (<>
        <h1>{props.title}</h1>
        {props.bulletIcon}
        {props.children(size.width, size.height)}
    </>)
}