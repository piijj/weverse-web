import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";
import { useDataState } from "../../context/DataContext";

const Category = styled(Tab)`
    min-width: auto !important;
    color: rgb(52, 58, 64);
`;

const Text = styled.div`
    font-size: 18px;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 500;
    letter-spacing: -0.5px;
`;

const List = styled(Tabs)`
    width: ${(props) =>
        props.orientation === "vertical" ? "250px" : "fit-content"};
    margin-bottom: 30px;

    & .MuiTab-wrapper {
        flex-direction: inherit;
        justify-content: left;
    }
`;

const Categories = ({ onChange, orientation, value }) => {
    const { categories } = useDataState();
    return (
        <List
            orientation={orientation}
            value={value || "ALBUM"}
            indicatorColor="primary"
            textColor="primary"
            onChange={onChange}
            TabIndicatorProps={{
                style: {
                    background:
                        orientation === "vertical" ? "transparent" : "#0BE6C1",
                },
            }}
        >
            {categories.map((c) => (
                <Category
                    key={c}
                    label={<Text>{c.toUpperCase()}</Text>}
                    value={c}
                />
            ))}
        </List>
    );
};

export default Categories;
