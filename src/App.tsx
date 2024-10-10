import './App.css';

import { memo, useMemo, useState } from 'react';

const HeavyComponent = memo((props: {usernames: string[]}) => {
  console.log("Expensive computations...")
  return (
    <div>Hello, {props.usernames.length}</div>
  )
})

function App() {
  const [counter, setCounter] = useState<number>(0)
  const usernames = useMemo(() => ["a", "b", "c"], [])
  return (
    <div className="App">
      <HeavyComponent usernames={usernames} />
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
    </div>
  );
}

export default App;
