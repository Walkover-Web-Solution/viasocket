export async function sendErrorMessage({ error }) {
    try {
        const response = await fetch(`https://flow.sokt.io/func/scrixVwRkMy0?error=${error}`);
        console.error(response);
    } catch (error) {
        console.error('Error', error);
    }
}
