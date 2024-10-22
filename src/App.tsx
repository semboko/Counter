import './App.css';

import {
    act, BaseSyntheticEvent, lazy, memo, SyntheticEvent, useMemo, useReducer, useState
} from 'react';

import { Accordeon } from './components/Accordeon';

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

function App() {
  const [counter, setCounter] = useState<number>(0)
  const usernames = useMemo(() => ["a", "b", "c"], [])
  const [state, dispatch] = useReducer(appReducer, {inputColor: "#000000", inputText: ""})
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
        <Accordeon title='Items' bulletIcon={<p>👍</p>}>
          {(width: number, height: number) => {
            return(
              <p>{width} x {height}</p>
            )
          }}
        </Accordeon>
      </div>
    </div>
  );
}

export default App;
