import InputBox1 from "../components/InputBox1"
import WelcomeTitle from "../components/WelcomeTitle"
import Button1 from "../components/Button1"

import { LuChevronsUpDown } from "react-icons/lu";


export default function Home() {
  
  return (
    <main className="bg-white h-screen mx-auto">
      hii there, this is home page
      <InputBox1 placeholder="placehlder" type="password" icon={<LuChevronsUpDown />} />
      <InputBox1 placeholder="placehlder" />
      <WelcomeTitle title="Welcome to" l_title="Workflo!" />
      <div>below is a button</div>
      <Button1 label="Login" />
      <div>below is a button</div>
    </main>
  );
}
