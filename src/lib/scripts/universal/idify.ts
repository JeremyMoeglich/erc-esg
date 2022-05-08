export function idify(obj: string): string {
    obj = obj.toLowerCase();
    obj = obj.replace(/[^a-z0-9]/g, '_');
    return obj.replace(/_+/g, '_');
}