import { QueryClient } from "react-query";
const queryClient = new QueryClient({
defaultOptions: {
mutations: {
retry: false,
},
queries: {
retry: false,
},
},
});

//CHAGE THIS TO YOUR OWN API
const AXIOS_URL = "http://localhost:5001/api/";
export { AXIOS_URL, queryClient };