import Image from "next/image";
import Menu from "../Menu/Menu";
import logoImg from "@/img/logo.png";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
        <Image src={logoImg} alt="logo" width={100} height={100}/>
        <Menu/>
    </header>
  )
}
