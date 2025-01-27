import { Button } from "antd";
import { useState } from "react";
function App() {
  const [count, setCount] = useState();

  return (
    <>
      <h1>Hello world!</h1>
      <Button type="primary">Click Me</Button>
    </>
  );
}

export default App;
