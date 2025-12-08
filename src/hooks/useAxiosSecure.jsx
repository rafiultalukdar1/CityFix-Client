import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    instance.interceptors.request.use(config => {
        if (user?.accessToken) {
            config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
    });

    return instance;
}

export default useAxiosSecure;