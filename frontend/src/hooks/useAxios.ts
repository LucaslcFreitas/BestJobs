import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { useUser } from "../redux/user/sliceUser";

type UseArioxType = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    body?: string | null;
    headers?: string | null;
    hardUpdate?: boolean;
}

function useAxios({ url, method, body = null, headers = null, hardUpdate = true }: UseArioxType) {
    const user = useSelector(useUser);

    const forceUpdate = useRef(hardUpdate);

    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        api({
            method,
            url,
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ${user.token}`
            },
            data: body ? JSON.parse(body) : {}
        }).then((response) => {
            setResponse(response.data);
        })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    useEffect(() => {
        if (forceUpdate.current) {
            setLoading(true);
            fetchData();
        }
    }, [method, url, body, headers]);

    return { response, error, loading };
}

export default useAxios;
