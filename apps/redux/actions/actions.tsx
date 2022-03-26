import { GET_AUTH, NEW_USER, IS_LOADING } from "../../constants";
import * as Keychain from 'react-native-keychain';
import { ethers } from "ethers";
import { REACT_NATIVE_INFURA_ROPSTEN } from "@env";

let provider = null;

export const getAuth = () => {
    try {
        return async (dispatch: (arg0: { type?: string; payload?: boolean; }) => void) => {
            const response = true;
            dispatch({
                type: GET_AUTH,
                payload: response
            });
        }
    } catch(error) {
        console.log(error)       
    }
}

export const setIsLoading = (state: boolean) => {
    try {
        return async (dispatch: (arg0: { type?: string; payload?: boolean; }) => void) => {
            dispatch({
                type: IS_LOADING,
                payload: state
            });
        }
    } catch(error) {
        console.log(error);
    }
}

export const isNewUser = () => {
    try {
        return async (dispatch: (arg0: { type?: string; payload?: boolean; }) => void) => {
            const credentials = await Keychain.getGenericPassword();
            let newUser: boolean | null = true;
            if (credentials) {
                console.log(
                  'Credentials successfully loaded for user ' + credentials.username
                );
                newUser = false
              } else {
                console.log('No credentials stored');
              }
               
            
            dispatch({
                type: NEW_USER,
                payload: newUser
            });
        }
    }catch(error){
        console.log(error)       
    }
}

export const getAuthentication = () => {
    try {
        return async (dispatch: (arg0: { type?: string; payload?: boolean; }) => void) => {
            const response: boolean = true;
            dispatch({
                type: GET_AUTH,
                payload: response
            });
        }
    }catch(error){
    console.log(error)       
    }
}

export const disconnect = () => {
}

export const createNewWallet = () => {
    try {
        return async (dispatch: (arg0: { type?: string; payload?: boolean; }) => void) => {
            const signer = ethers.Wallet.createRandom();
            console.log(signer);
            dispatch({
                type: GET_AUTH,
                payload: true
            });
        }
    }catch(error){
        console.log("hello")
    }
};

export const connectProvider = () => {
    try {
        return async (dispatch: (arg0: { type?: string; payload?: boolean; }) => void) => {
            provider = new ethers.providers.JsonRpcProvider(REACT_NATIVE_INFURA_ROPSTEN);
            const signer = ethers.Wallet.createRandom();
            dispatch({
                type: GET_AUTH,
                payload: true
            });
        }
    }catch(error){
        console.log("hello")
    }
};

export const createPassword = () => {
}

export const authenticatePassword = () => {
}