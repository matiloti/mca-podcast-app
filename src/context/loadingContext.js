import { createContext, useContext } from "react";

const LoadingContext = createContext();

const useLoading = () => useContext(LoadingContext);

export { 
    LoadingContext,
    useLoading
};