import React from "react";
import Particles from 'react-particles-js';
import particleConfig from "./particle-Config";

export default function  ParticleBackground(){
    return(
        <Particles params={particleConfig}></Particles>
    );
}