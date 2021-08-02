import {useState, useEffect} from 'react';
import { 
    StyledDiv,
    StyledGraphTitle,
    FlexWrapper,
    TitleDiv,
    ContentDiv,
    StyledSingularValue
} from "./util-components";

const BasicBlock = (props) => {
    const { dataFetcher } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        dataFetcher()
        .then((res) => {
            setData(res);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            setHasError(true);
        });
    }, [dataFetcher]);

    const errorContent = <p>Insufficient data to show information</p>;
    const content = isLoading || !data ? <p>Loading...</p> : <StyledSingularValue>{data.value.toPrecision(3)}</StyledSingularValue>;
    const titleContent = isLoading || !data ? "Loading Data" : data.title;

    return (
        <StyledDiv>
            <FlexWrapper>
                <TitleDiv>
                    <StyledGraphTitle>{titleContent}</StyledGraphTitle>
                </TitleDiv>
                <ContentDiv>
                    { hasError ? errorContent : content}
                </ContentDiv>
            </FlexWrapper>
        </StyledDiv>
    );
}

export default BasicBlock;