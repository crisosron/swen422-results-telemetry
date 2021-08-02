import styled from 'styled-components';

const StyledDiv = styled.div`
    padding: 10px;
    text-align: center;
    color: black;
`;

const StatTitle = styled.span`
    font-size: 20px;
    display: block;
`;

const StatText = styled.span`
    font-size: 15px;
`

const TextBlock = styled.div`
    display: inline-block;
    margin: 20px;
`

const SIG_FIG = 3

const StatisticsBlock = (props) => {
    const { stats } = props;

    if(!stats || stats.hasOwnProperty('invalidFetchMessage') || Object.keys(stats).length === 0) {
        return (
            <StyledDiv>
                <TextBlock>
                    <p>Insufficient data to display statistics</p>
                </TextBlock>
            </StyledDiv>
        )
    }

    return (
        <StyledDiv>
            <TextBlock>
                <StatTitle>Mean</StatTitle>
                <StatText>{stats.mean.toPrecision(SIG_FIG)}</StatText>
            </TextBlock>
            <TextBlock>
                <StatTitle>Median</StatTitle>
                <StatText>{stats.median.toPrecision(SIG_FIG)}</StatText>
            </TextBlock>
            <TextBlock>
                <StatTitle>Min/Max</StatTitle>
                <StatText>{`${stats.min.toPrecision(SIG_FIG)}/${stats.max.toPrecision(SIG_FIG)}`}</StatText>
            </TextBlock>
            <TextBlock>
                <StatTitle>SD</StatTitle>
                <StatText>{stats.sd.toPrecision(SIG_FIG)}</StatText>
            </TextBlock>
        </StyledDiv>
    )
}

export default StatisticsBlock;