import { Environment, OrbitControls } from "@react-three/drei";
import {Map} from "./Map";

const Experience = () => {
    console.log("experience")
    return(
        <>
            <OrbitControls/>
            <Map/>
            <Environment preset="sunset"/>
        </>
    )
}

export default Experience;
