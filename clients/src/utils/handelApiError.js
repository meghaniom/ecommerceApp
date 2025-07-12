export const  handelApiError = (err, defaultMessage = "Something went wrong") => {
    return err.response?.data?.message || defaultMessage;
}