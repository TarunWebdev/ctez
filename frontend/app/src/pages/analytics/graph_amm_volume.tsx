import { Button, ButtonGroup, Flex, Skeleton, SkeletonText, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { format } from 'date-fns/fp';
import { useCtezGraphAMMVolume, useCtezGraphAMMVolumeAll } from "../../api/analytics";
import { TextWithCircleColor } from "../../components/analytics/TTextWithColorCircle";
import BarChartAlt from "../../components/graph/bar-graph";
import { useThemeColors } from "../../hooks/utilHooks";
import { numberToMillionOrBillionFormate } from "../../utils/numberFormate";

const color = '#0F62FF';
const color2 = '#38CB89';
const GraphAMMVolume: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg2',
        'imported',
        'text4',
    ]);
    const { data: data1m = false } = useCtezGraphAMMVolume();
    const { data: dataAll = false } = useCtezGraphAMMVolumeAll();

    const [value, setValue] = useState<number | undefined>();
    const [time, setTime] = useState<number | undefined>();
    const [activeTab, setActiveTab] = useState('1m');
    // graph options
    const dateFormat = useMemo(() => format('MMM d, yyyy'), []);
    const dateFormat2 = useMemo(() => format('MMM, yyyy'), []);
    return (<Flex direction='column'
        borderRadius={16}
        backgroundColor={background}
        flex={1}
        paddingX={largerScreen?'35px':'19px'}
        paddingY={largerScreen?'27px':'24px'} 
        gridGap={4}
    >

        <Flex justifyContent='space-between'>
            <div>
            <Text
                color={textcolor}
                fontSize={largerScreen ? '14px' : '14px'}
                lineHeight="29px"
                fontWeight={400}
            >
                Volume
            </Text>
            <Flex flexDirection='column'>
            <Text
            color={textcolor}
            fontSize={largerScreen ? '32px' : '18px'}
            lineHeight="29px"
            fontWeight={600}
            >
            {(data1m && !value)?`$${numberToMillionOrBillionFormate(data1m[data1m.length-1].value)}`:value?`$${numberToMillionOrBillionFormate(value)}`:<SkeletonText pr={6} noOfLines={1} spacing="1" />}
            
            </Text>
            {time ? <Text fontSize='12px' >{activeTab==='1m'?dateFormat(time ):dateFormat2(time)}</Text>:<Text fontSize='12px'  opacity={0}>Time</Text>}
            </Flex>
            </div>
            <ButtonGroup variant='ghost' gridGap={2} textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' className={activeTab === '1m' ? "btnactive" : ''} textDecoration='underline' onClick={() => setActiveTab('1m')} >1D</Button>
                <Button fontSize='12px' className={activeTab === 'all' ? "btnactive" : ''} textDecoration='underline' onClick={() => setActiveTab('all')}>1M</Button>
            </ButtonGroup>

        </Flex>
        {activeTab === '1m' ? data1m ? <BarChartAlt
            data={data1m} setValue={setValue} setLabel={setTime}
        /> : <Skeleton height='300px' minWidth='20px' /> :
            dataAll ? <BarChartAlt
                data={dataAll} isShowMonth setValue={setValue} setLabel={setTime}
            /> : <Skeleton height='300px' minWidth='20px' />
        }
    </Flex>)
}
export default GraphAMMVolume;