import './App.css';

import {
    act, BaseSyntheticEvent, Dispatch, lazy, memo, SetStateAction, SyntheticEvent, useMemo,
    useReducer, useState
} from 'react';

import { Accordeon, AccordeonItem } from './components/Accordeon';

const HeavyComponent = memo((props: {usernames: string[]}) => {
  console.log("Expensive computations...")
  return (
    <div>Hello, {props.usernames.length}</div>
  )
})

const BigComponent = lazy(() => import("./components/BigComponent"))

interface AppState {
  inputColor: string
  inputText: string
}

const appReducer = (state: AppState, action: {type: string, payload?: any}): AppState => {
  if(action.type === "changeColor"){
    return {...state, inputColor: "#333333"}
  }
  if(action.type === "handleInput"){
    return {...state, inputColor: action.payload as string}
  }
  return {...state}
}

const getInputProps = (value: string, setValue: Dispatch<SetStateAction<string>>) => {
  return {
    value: value,
    onInput: (e: BaseSyntheticEvent) => setValue(e.target.value)
  }
}

function App() {
  const [counter, setCounter] = useState<number>(0)
  const usernames = useMemo(() => ["a", "b", "c"], [])
  const [state, dispatch] = useReducer(appReducer, {inputColor: "#000000", inputText: ""})
  const [inputState, setInputState] = useState<string>("")
  return (
    <div className="App">
      {counter > 3 && <HeavyComponent usernames={usernames} />}
      <BigComponent text={state.inputColor} />
      <input
        type="text"
        style={{backgroundColor: state.inputColor}}
        onClick={() => {dispatch({type: "changeColor"})}}
        onInput={(e: BaseSyntheticEvent) => {dispatch({type: "handleInput", payload: e.target.value})}} />
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>

      <div>
        <Accordeon title='Items' bulletIcon={<span>😂</span>}>
          <AccordeonItem id={0} label='label1' content='content1' />
          <hr />
          <AccordeonItem id={1} label='label2' content='content2' />
          <AccordeonItem id={2} label='label3' content='content3' />
        </Accordeon>
        <input type="text" {...getInputProps(inputState, setInputState)} />
      </div>
    </div>
  );
}

export default App;
