import axios from 'axios'

// TODO: There's some room for DRY here from what it looks like
// (we can parameterize the routes)

const getAllMouseStillTime = async (options) => {
    const { data } = await axios.get('/user-entries/get-all-mouse-still-time', { params: {
        forTraining: options.forTraining,
        forAbstractImages: options.forAbstractImages
    }});
    console.log("Response received: ", data);
    return data;
}

const getAllMouseTravelTime = async (options) => {
    const { data } = await axios.get('/user-entries//get-all-mouse-travel-time', { params: {
        forTraining: options.forTraining,
        forAbstractImages: options.forAbstractImages
    }});
    console.log("Response received: ", data);
    return data;
}

const getAllMouseClickTime = async (options) => {
    const { data } = await axios.get('/user-entries/get-all-mouse-click-time', { params: {
        forTraining: options.forTraining,
        forAbstractImages: options.forAbstractImages
    }});
    console.log("Response received: ", data);
    return data;
}

const getAllMouseTotalTime = async (options) => {
    const { data } = await axios.get('/user-entries/get-all-mouse-total-time', { params: {
        forTraining: options.forTraining,
        forAbstractImages: options.forAbstractImages
    }});
    console.log("Response received: ", data);
    return data;
}

export { 
    getAllMouseStillTime, 
    getAllMouseTravelTime,
    getAllMouseClickTime, 
    getAllMouseTotalTime,
}
