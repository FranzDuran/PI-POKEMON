import React from "react";
import logo from "../img/5SvD.gif"
import style from "../styles/Loading.module.css"

export default function Loading(){
    return (
      <div className={style.load}>
        <img
          src={logo}
          alt="loading..."
        />
      </div>
    );
  };
  