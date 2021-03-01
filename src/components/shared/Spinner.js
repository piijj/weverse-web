import React from "react";
import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0%, 80%, 100% {
    box-shadow: 0px 0px;
    height: 3em;
}

40% {
    box-shadow: 0px -1em;
    height: 4em;
}
`;

const Spinner = styled.div`
    background: ${({ theme }) => theme.palette.primary.main};
    animation: 1s ease-in-out -0.16s infinite normal none running ${loading};
    width: 0.8em;
    height: 3em;
    border-radius: 0.4em;
    color: ${({ theme }) => theme.palette.primary.main};
    text-indent: -9999em;
    margin: 30px auto;
    position: relative;
    font-size: 9px;
    transform: translateZ(0px);

    :before {
        background: ${({ theme }) => theme.palette.primary.main};
        animation: 1s ease-in-out 0s infinite normal none running ${loading};
        width: 0.8em;
        height: 3em;
        border-radius: 0.4em;
        position: absolute;
        top: 0px;
        content: "";
        left: -1.2em;
        animation-delay: -0.32s;
    }

    :after {
        background: ${({ theme }) => theme.palette.primary.main};
        animation: 1s ease-in-out 0s infinite normal none running ${loading};
        width: 0.8em;
        height: 3em;
        border-radius: 0.4em;
        position: absolute;
        top: 0px;
        content: "";
        left: 1.2em;
    }
`;

const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
