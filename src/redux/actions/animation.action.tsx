import {
  UPDATE_RECEIVE,
  UPDATE_SEND,
  UPDATE_SWITCH_NETWORK,
  //@ts-ignore
} from '@orbyt/constants';
import React from 'react';

export const AnimationAction = (props: any) => {
  const updateRecieving = (state: boolean) => {
    try {
      props.dispatch({
        type: UPDATE_RECEIVE,
        receive: state,
      });
    } catch (error) {
      props.dispatch({
        type: UPDATE_RECEIVE,
        receive: false,
      });
    }
  };

  const updateSending = (state: boolean) => {
    try {
      props.dispatch({
        type: UPDATE_SEND,
        send: state,
      });
    } catch (error) {
      props.dispatch({
        type: UPDATE_SEND,
        send: false,
      });
    }
  };

  const updateSwitchNetwork = (state: boolean) => {
    try {
      props.dispatch({
        type: UPDATE_SWITCH_NETWORK,
        switchNetwork: state,
      });
    } catch (error) {
      props.dispatch({
        type: UPDATE_SWITCH_NETWORK,
        switchNetwork: false,
      });
    }
  };

  return {
    updateRecieving,
    updateSending,
    updateSwitchNetwork,
  };
};
