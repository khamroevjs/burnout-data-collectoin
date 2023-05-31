import React from 'react';
import {HiDotsHorizontal} from "react-icons/hi";
import {ArrowLeftIcon, ArrowRightIcon, IconProps} from "@chakra-ui/icons";
import {default as ChocPagination} from "@choc-ui/paginator";
import {useToken, useColorModeValue, Button, Icon, ComponentWithAs, ButtonProps} from "@chakra-ui/react";

interface Props {
    currentPage: number;
    pageSize: number;
    total: number;
    onChange: (page: number | undefined) => void;
}

const Pagination = ({currentPage, pageSize, total, onChange}: Props) => {

    const focusRing = useToken("colors", ["brand.400"])[0];
    const MButton = (icon: ComponentWithAs<"svg", IconProps>, props: ButtonProps) => {
        const {onClick} = props;
        const {style, styleConfig, bg, w, __css, ...others} = props;
        const [hovered, setHovered] = React.useState(false);
        const iconColor = useColorModeValue("gray.700", "gray.200");
        return (
            <Button
                hideBelow="sm"
                onClick={onClick}
                background={"transparent"}
                _hover={{bg: "transparent"}}
                w={8}
                h={8}
                color="gray.700"
                _dark={{color: "gray.200"}}
                onMouseOver={() => setHovered(true)}
                onMouseOut={() => setHovered(false)}
                cursor="pointer"
                textAlign="center"
            >
                {hovered ? (
                    <Icon
                        as={icon}
                        boxSize={3}
                        cursor="pointer"
                        color={iconColor}
                    />
                ) : (
                    <Icon
                        as={HiDotsHorizontal}
                        color={iconColor}
                        boxSize={4}
                        opacity={0.5}
                    />
                )}
            </Button>
        )
    }
    const Right = React.forwardRef<HTMLButtonElement>((props, ref) => (
        MButton(ArrowRightIcon, props)));
    const Left = React.forwardRef<HTMLButtonElement>((props, ref?) => (
        MButton(ArrowLeftIcon, props)));
    const itemRender = (currentPage?: number, type?: string) => {
        if (type === "forward") {
            return Right
        }
        if (type === "backward") {
            return Left
        }
    };

    return (
        <ChocPagination
            baseStyles={{bg: "brand.100"}}
            responsive={{activePage: true, totalRender: false}}
            current={currentPage}
            pageSize={pageSize}
            itemRender={itemRender}
            onChange={onChange}
            defaultCurrent={1}
            pageNeighbours={1}
            total={total}
            paginationProps={{display: "flex", mb: 4}}
            focusRing={focusRing}
        />
    );
};

export default Pagination;
