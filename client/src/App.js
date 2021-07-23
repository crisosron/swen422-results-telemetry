import './App.css';
import { getAllUserEntries } from './fetchers/user-entry-fetcher';
import GraphBlock from './components/GraphBlock'
import styled from 'styled-components';

const StyledPageWrapper = styled.div`
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <StyledPageWrapper>
        <GraphBlock title="Global Average" dataFetcherName="globalAverage" dataFetcher={ getAllUserEntries } />
        <GraphBlock title="Latest Participant" dataFetcherName="latestParticipant" dataFetcher={ getAllUserEntries } />
    </StyledPageWrapper>
  );
}

export default App;
