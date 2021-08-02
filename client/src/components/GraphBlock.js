import {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import StatisticsBlock from './StatisticsBlock';
import { 
    StyledDiv,
    StyledGraphTitle,
    FlexWrapper,
    TitleDiv,
    ContentDiv
} from "./util-components";

const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const GraphBlock = (props) => {
    const {dataFetcher, displayLegend} = props;
    const [isLoading, setIsLoading] = useState(true);
    const [graphData, setGraphData] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [datasets, setDatasets] = useState();


    const options = {
        plugins: {
            legend: {
                display: !!displayLegend
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Attempts'
                }
            },

            y: {
                title: {
                    display: true,
                    text: 'Time (ms)'
                }
            }
        }
    }

    useEffect(() => {
        dataFetcher()
        .then((res) => {
            if(res.hasOwnProperty('invalidFetchMessage')) {
                setErrorMessage(res.invalidFetchMessage);
                isLoading(false);
                return;
            }

            const graphData = {
                labels: Array.from({length: 10}, (_, i) => i + 1),
                values: res.data.values, // This has the structure [[], []...]
                statData: res.data.overallStats,
                title: res.title
            }

            const datasets = res.data.values.map((dataset, i) => {
                return {
                    // We don't actually use the label, but the lib requires it (I guess to
                    // uniquely identify different datasets in the same graph) - Without this,
                    // multi dataset graphs (i.e line graphs with multiple plotted lines), will
                    // not show.
                    label: '' + i,
                    data: dataset,
                    borderColor: generateRandomColor(),
                    tension: 0.5,
                }
            });

            setGraphData(graphData);
            setDatasets(datasets);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            
        });
    }, [dataFetcher, isLoading]);

    if (isLoading) {
        return (
            <StyledDiv>
                <FlexWrapper>
                    <ContentDiv>
                        <p>Loading...</p>
                    </ContentDiv>
                </FlexWrapper>
            </StyledDiv>
        )
    } else if(!graphData || errorMessage) {
        return (
            <StyledDiv>
                <FlexWrapper>
                    <ContentDiv>
                        <p>Insufficient data to show telemetry for this graph</p>
                    </ContentDiv>
                </FlexWrapper>
            </StyledDiv>
        )
    } else {
        return (
            <StyledDiv>
                <FlexWrapper>
                    <StyledGraphTitle>{graphData.title}</StyledGraphTitle>
                    <Line data={
                        {
                            labels: graphData.labels, 
                            datasets,
                        }
                    } 
                    options={options}></Line>
                    <StatisticsBlock stats={graphData.statData} />
                </FlexWrapper>
            </StyledDiv>
        );
    }

}

export default GraphBlock;