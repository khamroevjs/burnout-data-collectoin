import {createSearchParams, useNavigate} from "react-router-dom";


export const useNavigateParams = () => {
    const navigate = useNavigate();
    return (pathname: string, params: string) => {
        const path = {
            pathname,
            search: createSearchParams(params).toString()
        }
        navigate(path);
    }
};
