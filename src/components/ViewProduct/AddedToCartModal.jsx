import React from "react";
import { Button, Divider, Modal, Paper } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: Noto Sans KR, sans-serif;
    font-weight: ${(props) => props.fontWeight || "normal"};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: ${(props) => props.margin || "10px 0px"};
    text-align: ${(props) => props.textAlign};
`;

const PaperWrapper = styled(Paper)`
    width: 400px;
    height: 320px;
    margin: 15% auto;
    border-radius: 5px;
    outline: none;
    padding: 80px 30px 0px;
    box-sizing: border-box;
    position: relative;
`;

const Check = styled.img`
    left: 155px;
    top: -50px;
    width: 100px;
    position: absolute;
`;

const ModalButton = styled(Button)`
    width: 100%;
    background: ${(props) => props.bg};
    color: ${(props) =>
        props.bg === "transparent"
            ? "rgb(11, 230, 193)"
            : "rgb(255, 255, 255)"};
    text-transform: inherit;
    border-radius: 5px;
    height: 40px;
    margin: ${(props) => props.margin};
`;

const AddedToCartModal = ({ modal, showModal }) => {
    const history = useHistory();

    return (
        <Modal open={modal} onClose={() => showModal(false)}>
            <PaperWrapper>
                <Check src="/images/check.svg" />
                <Text fontSize={16} margin="10px 0px 40px" textAlign="center">
                    Added to Cart
                </Text>
                <Divider />
                <ModalButton
                    bg="transparent"
                    margin="40px 0px 20px"
                    onClick={() => showModal(false)}
                >
                    Continue Shopping
                </ModalButton>
                <ModalButton onClick={() => history.push("/cart")}>
                    Go to Cart
                </ModalButton>
            </PaperWrapper>
        </Modal>
    );
};

export default AddedToCartModal;
