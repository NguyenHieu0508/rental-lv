export function sanitizeUpdate<T extends Record<string, any>>(dto: T) {
    const data = { ...dto };
    delete data.id;
    delete data._id;
    delete data.createdAt;
    delete data.updatedAt;
    return data;
}
