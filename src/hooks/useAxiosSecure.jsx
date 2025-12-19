import axios from "axios";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
    const { user } = useAuth();
    const instance = axios.create({
        baseURL: 'http://localhost:3000'
    });

    instance.interceptors.request.use(
        async config => {
            if (user) {
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    return instance;
};

export default useAxiosSecure;












// import axios from "axios";
// import useAuth from "./useAuth";
// import { useEffect } from "react";

// const useAxiosSecure = () => {
//     const { user } = useAuth();
//     const instance = axios.create({
//         baseURL: 'http://localhost:3000'
//     });

//     useEffect(() => {
//         const requestInterceptor = instance.interceptors.request.use(
//             async config => {
//                 if (user) {
//                     const token = await user.getIdToken(); // Firebase ID Token
//                     config.headers.authorization = `Bearer ${token}`;
//                 }
//                 return config;
//             }
//         );

//         return () => {
//             instance.interceptors.request.eject(requestInterceptor);
//         };
//     }, [user, instance.interceptors.request]);

//     return instance;
// }

// export default useAxiosSecure;
