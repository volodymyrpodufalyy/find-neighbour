// eslint-disable-next-line import/no-anonymous-default-export
export default (attachments) => {
    if (!attachments) {
        return null; 
    }
    const file = attachments[0];
    return attachments.length && file.ext === "webm";
}