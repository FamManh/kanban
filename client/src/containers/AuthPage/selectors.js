import {createSelector} from 'reselect'

const selectRaw = state => state.auth;

const selectSignupLoading = createSelector(
    [selectRaw],
    auth => auth.signupLoading
);
const selectSignupErrorMessage = createSelector(
    [selectRaw],
    auth => auth.signupErrorMessage
);
const selectSigninLoading = createSelector(
    [selectRaw],
    auth => auth.signinLoading
);

const selectSigninErrorMessage = createSelector(
    [selectRaw],
    auth => auth.signinErrorMessage
);

const selectors = {
    selectSignupLoading,
    selectSigninLoading,
    selectSigninErrorMessage,
    selectSignupErrorMessage
};

export default selectors;
