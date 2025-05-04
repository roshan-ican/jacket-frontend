import { proxy } from "valtio";


const state = proxy({
    intro: true,
    color: "#28282b",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./batman.png",
    fullDecal: "./batman.png",

})

export default state