import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_PLUG_SERVICE_URL;

const scriptRunner = async (scriptEnum, payload = {}, method = 'POST') => {
  try {

    let result
    const url = `${URL}/utility/script-runner/${scriptEnum}`
    
    if (method.toUpperCase() === 'GET') {
      result = await axios.get(url, { params: payload })
      return result.data
    }else{
      result = await axios.post(url, payload)
    }
    return result?.data;
  } catch (error) {
    console.error(error,"error");
    throw error
  }
}

export default scriptRunner;
