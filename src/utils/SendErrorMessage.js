export async function sendErrorMessage({ error }) {
    error = error?.response?.data || error.message;
    try {
        const response = await fetch(`https://flow.sokt.io/func/scrixVwRkMy0?error=${JSON.stringify(error)}`);
        console.error(response);
    } catch (error) {
        console.error('Error', error);
    }
}
