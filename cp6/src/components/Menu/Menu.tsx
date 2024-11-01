import Link from "next/link";
import React from "react";
import logoImg from "../../img/logo.png";
import Image from "next/image";

export default function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/challenge">Challenge</Link>
        </li>
        <li>
          <Image src={logoImg} alt="logo" width={50} height={50} />
        </li>
        <li>
          <Link href="/gs">Global Solution</Link>
        </li>
        <li>
          <Link href="/checkpoints">Checkpoints</Link>
        </li>
      </ul>
    </nav>
  );
}
