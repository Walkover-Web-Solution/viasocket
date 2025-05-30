export default async function getTemplates() {
    try {
        const response = await fetch('https://plugservice-api.viasocket.com/templates/all');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('error fetching templates!');
    }
}
