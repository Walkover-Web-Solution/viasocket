const STORAGE_KEY = 'copiedTemplateIds';

export const templateIdManager = {
    addTemplateId(id) {
        const existingIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (!existingIds.includes(id)) {
            existingIds.push(id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existingIds));
        }
        return existingIds;
    },

    getTemplateIds() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },

    removeTemplateId(id) {
        const existingIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const newIds = existingIds.filter(item => item !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
        return newIds;
    },

    clearTemplateIds() {
        localStorage.removeItem(STORAGE_KEY);
    },

    generateUrl(baseId) {
        const ids = this.addTemplateId(baseId);
        return `https://viasocket.com/integrations-script?templateId=${ids.join(',')}`;
    }
};