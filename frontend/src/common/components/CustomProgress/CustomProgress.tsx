import React from 'react';
import {chakra, CircularProgress, CircularProgressLabel, Flex, Text} from "@chakra-ui/react";

interface Props {
    value: number;
    max: number;
}

const CustomProgress = ({value, max}: Props) => {
    const normalized = value / max * 100
    return (
        <CircularProgress value={normalized} size="60px" thickness={8} color="teal.500">
            <CircularProgressLabel>
                <chakra.label fontWeight="medium">
                    {value}
                </chakra.label>
                <chakra.label color="gray.600">
                    /{max}
                </chakra.label>
            </CircularProgressLabel>
        </CircularProgress>
    );
};

export default CustomProgress;
