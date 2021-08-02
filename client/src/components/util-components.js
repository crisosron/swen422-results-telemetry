import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 450px;
    height: 450px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    display: inline-block;
`;

const StyledGraphTitle = styled.h1`
    font-size: 25px;
`

const StyledFlexCenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledContentDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const FlexWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const TitleDiv = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentDiv = styled.div`
    flex: 5;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledSingularValue = styled.div`
    font-size: 50px;
`

export { 
    StyledDiv,
    StyledGraphTitle, 
    StyledContentDiv,
    StyledFlexCenteredDiv,
    FlexWrapper,
    TitleDiv,
    ContentDiv,
    StyledSingularValue
};