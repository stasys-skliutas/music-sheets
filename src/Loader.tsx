import React from "react";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const Mask = styled.div`
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);

    > div {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        width: 48px;
        height: 48px;
    }
`;

export const Loader = () => {
    return (
        <Mask>
            <div>
                <ClipLoader loading size={72} aria-label="Loading Spinner" data-testid="loader" />
            </div>
        </Mask>
    );
};
