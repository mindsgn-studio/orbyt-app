//@ts-ignore
import { UPDATE_LOADING } from '@orbyt/constants';

const initialState: any = {
  loading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
