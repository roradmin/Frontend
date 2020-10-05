import React,{useMemo} from 'react';
import styled from 'styled-components';
import './loader.scss';

const LoadingComponent = ({loadingText = null}) => {
    return <div className='loadingComponentWrapper'>
        <LoaderCircle loadingText = {loadingText}/>
    </div>
}
export const LoaderCircle = ({loadingText,width = null,height = null}) => {
    return <Loader width = {width} height = {height}>
        {loadingText && <h2 className="loaderHeader">{loadingText}</h2>}
        <svg viewBox="0 0 100 100">
        <defs>
            <linearGradient id="gradient">
                <stop offset="0%" stopColor = "#0e3142" />
                <stop offset="98%" stopColor = "#8a1046" />
                <stop offset="100%" stopColor = "#8a1046" />
            </linearGradient>
        </defs>
        <circle
            cx="50"
            cy="50"
            r="47"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
        />
        </svg>
    </Loader>
}
const Loader = styled.div`
    padding: 1%;
    justify-content: center;
    display: grid;
    align-self: center;
    align-items: center;
    div{
        justify-self: center;
    }
    .loadingComponent{
        box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
        background-color: #191919;
    }
    .loaderHeader{
        color:#fff;
        font-variant-caps: all-petite-caps;
    }
    svg{
        width: ${props => props.width ? props.width : '8vw'};
        height: ${props => props.height ? props.height : '8vw'};   
        animation: rotate .9s infinite linear;
    }
`;
//                <text x="50%" y="50%" text-anchor="middle" stroke="#fff" stroke-width="2px" dy=".3em">Rpp</text>

export default LoadingComponent;