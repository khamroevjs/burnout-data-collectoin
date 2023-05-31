import React from 'react';
import {
    Container,
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    Center,
} from '@chakra-ui/react';
import StressImage from '../../assets/stress.png';
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate()
    return (
        <Container maxW='8xl'>
            <Stack
                align={'center'}
                spacing={{base: 8, md: 10}}
                py={{base: 6, md: 8}}
                direction={{base: 'column', md: 'row'}}>
                <Stack flex={1} spacing={{base: 3, md: 3}}>
                    <Heading
                        fontWeight={600}
                        fontSize={{base: '4xl', sm: '4xl', lg: '5xl'}}>
                        <Text
                            as={'span'}>
                            Эмоциональное выгорание
                        </Text>
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.500'}>
                        — это состояние истощения, при котором эмоции человека притупляются.
                        Данный тест поможет вам распознать и понять эту проблему,
                        чтобы вы могли принять меры для своего собственного самоухода.
                    </Text>
                    <Stack
                        paddingTop={2}
                        spacing={{base: 4, sm: 6}}
                        direction={{base: 'column', sm: 'row'}}>
                        <Button
                            position='static'
                            rounded='full'
                            size='lg'
                            fontWeight='medium'
                            px={6}
                            colorScheme='brand'
                            // bg={'brand.400'}
                            _hover={{bg: 'brand.500'}}
                            onClick={() => navigate('/burnout')}>
                            Пройти тест
                        </Button>
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Center>
                        <Image
                            position='static'
                            alt={'Stress Image'}
                            fit={'cover'}
                            align={'center'}
                            width={{base: '80%', md: '80%'}}
                            height={{base: '80%', md: '80%'}}
                            // height={'100%'}
                            src={StressImage}

                        />
                    </Center>
                </Flex>
            </Stack>
        </Container>
    );
};

export default Main;
