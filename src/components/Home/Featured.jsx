import React from "react";
import { Card, CardActionArea, CardContent, Grid } from "@material-ui/core";
import styled from "styled-components";
import { useDataState } from "../../context/DataContext";

const Text = styled.div`
    font-size: ${(props) => props.fontSize || 14}px;
    color: ${(props) => props.color};
    font-family: Noto Sans KR, sans-serif;
    font-weight: ${(props) => props.fontWeight || "normal"};
    line-height: ${(props) => props.lineHeight || 1.4};
    margin: 5px 0px;
`;

const Image = styled.img`
    width: 512px;
    object-fit: cover;
`;

const List = styled(Grid)`
    overflow-y: auto;
    flex-wrap: nowrap;
    margin: 30px 0px;
`;

const Home = () => {
    const { products } = useDataState();
    return (
        <List container justify="flex-start" spacing={3}>
            {products
                .filter((product) => product.isFeatured)
                .map((product) => (
                    <Grid key={product.id} item>
                        <Card>
                            <CardActionArea>
                                <Image src={product.header.pic} />
                                <CardContent>
                                    <Text fontSize={20} fontWeight="bold">
                                        {product.header.title}
                                    </Text>
                                    <Text fontSize={14} color="#878E96">
                                        {product.header.description}
                                    </Text>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
        </List>
    );
};

export default Home;
