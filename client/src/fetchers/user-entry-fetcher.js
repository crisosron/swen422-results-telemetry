import axios from 'axios'

const getAllUserEntries = async () => {
    const { data } = await axios.get('/user-entries');
    return data.map((elem) => elem.attempts);
}

export { getAllUserEntries }