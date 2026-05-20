export const pageSize = 3;

export const navBtnClass =
    'w-9 h-9 flex items-center justify-center border custom-border rounded-full transition-all duration-200 hover:border-accent hover:text-accent disabled:opacity-25 disabled:cursor-not-allowed';

export const chunkIntoPages = (items, size = pageSize) => {
    const out = [];
    for (let i = 0; i + size <= items.length; i += size) out.push(items.slice(i, i + size));
    return out;
};
