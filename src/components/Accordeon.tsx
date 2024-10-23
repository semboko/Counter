import {
    createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState
} from 'react';

class AccordeonContextData {
    bullet?: ReactElement
    itemIdx: number = 0
    setItemIdx?: Dispatch<SetStateAction<number>> 

    constructor (bullet?: ReactElement, itemIdx?: number, setItemIdx?: Dispatch<SetStateAction<number>>){
        this.bullet = bullet
        this.itemIdx = itemIdx || 0
        this.setItemIdx = setItemIdx
    }
}


const AccordeonContext = createContext<AccordeonContextData>(
    new AccordeonContextData()
)

export const AccordeonItem = (props: {id: number, label: string, content: string}) => {

    const context = useContext(AccordeonContext)

    return (
        <div className="Accordeon-Item">
            <h1 onClick={() => {context.setItemIdx!(props.id)}}>{context.bullet}{props.label}</h1>
            {context.itemIdx === props.id && <div className="Item-Content">{props.content}</div>}
        </div>
    )
}


export const Accordeon = (props: {title: string, children: ReactElement[], bulletIcon?: ReactElement}) => {

    const [activeItem, setActiveItem] = useState<number>(0)

    return (
        <div className="Accordeon">
            <h1>{props.title}</h1>
            <AccordeonContext.Provider value={new AccordeonContextData(props.bulletIcon, activeItem, setActiveItem)}>
                {props.children}
            </AccordeonContext.Provider>
        </div>
    )
}
