import React, {useEffect} from 'react';
import {
    chakra,
    useColorModeValue,
    useDisclosure,
    Text,
    Menu,
    Button,
    Flex,
    HStack,
    VStack,
    Box,
    IconButton,
    CloseButton,
    MenuButton,
    MenuList,
    MenuItem, Divider,
} from "@chakra-ui/react";

import {AiOutlineMenu} from "react-icons/ai";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import BurnoutLogo from "../../../assets/BurnoutLogo";
import {useCookies} from "react-cookie";
import RespondentService from "../../../services/RespondentService";

const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token", "respondent_id"])
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const quizId = searchParams.get('quiz_id')
    const redirectUrl = searchParams.get('redirect_url')
    const removeCookies = () => {
        removeCookie("token")
        removeCookie("respondent_id")
    }

    const mobileNavigate = (path: string) => {
        navigate(path)
        mobileNav.onClose()
    }

    return (
        <>{!(quizId && redirectUrl) &&
            <chakra.header bg={bg} w="full" px={{base: 2, sm: 4}} py={3} shadow="md">
                <Flex alignItems="center" justifyContent="space-between" marginX="auto">
                    <Flex as={NavLink} to='/' alignItems='center'>
                        <BurnoutLogo/>
                        <chakra.h1 fontSize="xl" fontWeight="bold" paddingLeft={2}>
                            Burnout Stopper
                        </chakra.h1>
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1}>
                        <HStack
                            spacing={1}
                            marginRight={1}
                            color="gray.700"
                            display={{base: "none", sm: "inline-flex"}}>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                    Тесты
                                </MenuButton>
                                <MenuList paddingY={0}>
                                    <MenuItem paddingTop={2} roundedTop={5}
                                              onClick={() => navigate("/burnout")}>Профессиональное выгорание</MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={() => navigate("/fatigue")}>Хроническое утомление</MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={() => navigate("/coping")}>Способы совладающего
                                        поведения</MenuItem>
                                    <Divider/>
                                    <MenuItem paddingBottom={2} roundedBottom={5}
                                              onClick={() => navigate("/spb")}>Диагностика иррациональных
                                        установок</MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                        <Menu>
                            <MenuButton as={Button} colorScheme="brand">Пользователь</MenuButton>
                            <MenuList paddingY={0}>
                                <MenuItem paddingTop={2} roundedTop={5}>
                                    <HStack>
                                        {cookies.respondent_id &&
                                            <>
                                                <Text>Идентификатор:</Text>
                                                <Text fontWeight="medium">{cookies.respondent_id}</Text>
                                            </>}
                                        {!cookies.respondent_id &&
                                            <>
                                                <Text>Статус:</Text>
                                                <Text fontWeight="medium">Гость</Text>
                                            </>
                                        }
                                    </HStack>
                                </MenuItem>
                                <Divider/>

                                {cookies.respondent_id && <MenuItem paddingBottom={2} roundedBottom={5}
                                                                    onClick={removeCookies}>Удалить данные</MenuItem>}
                            </MenuList>
                        </Menu>
                        <Box display={{base: "inline-flex", sm: "none"}}>
                            <IconButton
                                display={{base: "flex", sm: "none"}}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                _dark={{color: "inherit"}}
                                variant="ghost"
                                icon={<AiOutlineMenu/>}
                                onClick={mobileNav.onOpen}
                            />
                            <Box display={mobileNav.isOpen ? "block" : "none"} position="fixed" top={0}
                                 left={0} right={0} bottom={0} onClick={mobileNav.onClose}>
                                <VStack pos="absolute" top={0} left={0} right={0}
                                        display={mobileNav.isOpen ? "flex" : "none"}
                                        flexDirection="column" p={2} pb={4} bg={bg} spacing={3} shadow="md"
                                        onClick={(event) => event.stopPropagation()}>
                                    <CloseButton
                                        aria-label="Close menu"
                                        onClick={mobileNav.onClose}/>

                                    <Button onClick={() => mobileNavigate("/burnout")} w="full" variant="ghost">Профессиональное
                                        выгорание</Button>
                                    <Button onClick={() => mobileNavigate("/fatigue")} w="full" variant="ghost">Хроническое
                                        утомление</Button>
                                    <Button onClick={() => mobileNavigate("/coping")} w="full" variant="ghost">Способы
                                        совладающего поведения</Button>
                                    <Button onClick={() => mobileNavigate("/spb")} w="full" variant="ghost">Диагностика
                                        иррациональных установок</Button>
                                </VStack>
                            </Box>
                        </Box>
                    </HStack>
                </Flex>
            </chakra.header>
        }
        </>
    );
};

export default Navbar;
