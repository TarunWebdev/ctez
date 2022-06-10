import { Box, Button, ButtonGroup, Center, Flex, Skeleton, SkeletonText, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorMode, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { useMainHeader } from '../../api/analytics';
import { useThemeColors } from '../../hooks/utilHooks';
import { numberToMillionOrBillionFormate } from '../../utils/numberFormate';
import './analytics.css';
import GraphAMMTVL from './graph_amm_tvl';
import GraphAMMVolume from './graph_amm_volume';
import GraphCtez from './graph_ctez';
import GraphDrift from './graph_drift';
import OvenPiChart from './graph_oven_pi';
import GraphTVL from './graph_tvl';
import OvenTable from './ovenTable';
import TransactionTableoven from './transactionsTable';
import TransactionTableAMM from './transactionsTableAmm';


const AnaluticsPage: React.FC = () => {
    const { data: headerData = false } = useMainHeader();
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background,inputbg] = useThemeColors([
        'cardbg2',
        'inputbg',
    ]);
    const {colorMode} = useColorMode();
    const GradientText = (text: string | number, isDollor: boolean) => {
        return <b className='gradientcolortext'>
            {isDollor ? '$' : null}
            {text}
        </b>;
    }
    return (
        <div style={{ padding: largerScreen ? '55px' : '35px', width:'100%' }} className={colorMode}>
            <Center maxWidth='800px' margin='0px auto'>
            {headerData?<Text
                    color={textcolor}
                    fontSize={largerScreen ? '40px' : '26px'}
                    lineHeight="50px"
                    fontWeight={400}
                    textAlign='center'
                >
                   Ctez is managing {GradientText(numberToMillionOrBillionFormate(headerData.Total_TVL), true) } in its attached {GradientText('CFMM',false)} and across {GradientText(`${headerData.Total_Ovens} Ovens`, false) }      
                                            
                </Text>
                :<Skeleton>
                    <Text
                    color={textcolor}
                    fontSize={largerScreen ? '40px' : '26px'}
                    lineHeight="50px"
                    fontWeight={400}
                    textAlign='center'
                >
                   Ctez is managing $3.4m in its attached CFMM and across 351 ovens 
                </Text>
                    </Skeleton>}
            </Center>
            <div className='section-container'>
                <Text
                    fontSize={largerScreen ? '30px' : '20px'}
                    lineHeight="50px"
                    fontWeight={400}
                    className='gradientcolortext'
                    marginBottom='20px'
                >
                    Protocol
                </Text>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                    <GraphCtez />
                    <GraphDrift />
                </Flex>
            </div>
            <div className='section-container'>
                <Text
                    fontSize={largerScreen ? '30px' : '20px'}
                    lineHeight="50px"
                    fontWeight={400}
                    className='gradientcolortext'
                    marginBottom='20px'
                >
                    Ovens
                </Text>
                <OvenTable />
            </div>

            <div className='section-container'>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                   <GraphTVL />
                     <OvenPiChart />

                </Flex>
            </div>
            <div className='section-container'>
                <TransactionTableoven />
            </div>

            <div className='section-container'>
            <Text
                    fontSize={largerScreen ? '30px' : '20px'}
                    lineHeight="50px"
                    fontWeight={400}
                    className='gradientcolortext'
                    marginBottom='20px'
                >
                    AMM
                </Text>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                     <GraphAMMTVL/>
                   <GraphAMMVolume/>
                </Flex>
            </div>

            <div className='section-container'>
            <TransactionTableAMM/>
            </div>


        </div>
    )
}
export default AnaluticsPage;
