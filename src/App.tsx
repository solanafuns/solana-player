import MyHeader from "./components/MyHeader";
import { Button } from "@mui/material";

const App = () => {
  return (
    <>
      <MyHeader />

      <div className="mt1">
        <Button variant="contained">Hello mui world</Button>
      </div>
    </>
  );
};

export default App;
