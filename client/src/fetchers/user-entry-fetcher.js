import axios from 'axios'

const getAllUserEntries = async () => {
    const { data } = await axios.get('https://swen422-telemetry-server.herokuapp.com/user-entries');
    return data;
}

const getLatestEntry = async () => {
    const { data } = await axios.get('https://swen422-telemetry-server.herokuapp.com/user-entries/latest-entry');
    return data;
}

const getLatestEntryWithTraining = async () => {
    const { data } = await axios.get('https://swen422-telemetry-server.herokuapp.com/user-entries/latest-entry-with-training');
    return data;
}

const getTrainingEntries = async () => {
    const { data } = await axios.get('https://swen422-telemetry-server.herokuapp.com/user-entries/training-entries');
    return data;
}

const getActualEntries = async () => {
    const { data } = await axios.get('https://swen422-telemetry-server.herokuapp.com/user-entries/actual-entries');
    return data;
}

const getSuccessFailRatio = async () => {
    const { data } = await axios.get('https://swen422-telemetry-server.herokuapp.com/user-entries/success-fail-ratio');
    return data;
}

export { getAllUserEntries, getLatestEntry, getLatestEntryWithTraining, getActualEntries, 
    getTrainingEntries, getSuccessFailRatio }