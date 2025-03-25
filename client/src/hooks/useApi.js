import { useState } from 'react';

const useApi = ( apiFunc ) => {

    const [data, setData]       = useState(null);
    const [error, setError]     = useState(null);
    const [loading, setLoading] = useState(false);

    const request = async ( ...args ) => {

        try {
            setLoading(true);
            const response = await apiFunc( ...args );
            setData(response);
        } catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    };
    
    return { data, loading, error, request };
}

export default useApi;