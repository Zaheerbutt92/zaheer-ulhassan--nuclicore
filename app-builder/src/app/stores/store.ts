import { createContext, useContext } from "react";
import FormStore from "./formStore";

interface Store{
    formStore: FormStore,
}

export const store : Store = {
    formStore: new FormStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}