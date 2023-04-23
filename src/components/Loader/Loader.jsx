import { Audio } from 'react-loader-spinner';
import { Overlay } from './Loader.styled';
export const Loader = () => { 
    return (<Overlay><Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
  /></Overlay>);
}