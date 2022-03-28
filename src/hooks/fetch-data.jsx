import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function useFetch(apiHandler) {

    const [data, setData] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setLoading]  = useState(true);    

    useEffect(()=>{

        apiHandler()
        .then((dataFetch)=>{
            if (!dataFetch.success) {
                return Promise.reject("Запрос к данным неуспешен");
            }            
            setData(dataFetch.data);
        })        
        .catch(setError)
        .finally(()=>setLoading(false));       
    },[apiHandler]);    

    return {data, error, isLoading};
}

useFetch.propTypes = {
    apiHandler: PropTypes.func.isRequired
};

export {useFetch};
