export const getUniqueRecord = (attendancelist) => {
    // Check if attendancelist is an array before proceeding
    if (!Array.isArray(attendancelist)) {
        console.error("Invalid attendancelist: Expected an array.");
        return []; // Return an empty array if attendancelist is not valid
    }

    const uniqueRecord = [];
    const existingUser = new Set();

    attendancelist.forEach((record) => {
        if (record && record.id && !existingUser.has(record.id)) { // Ensure record and record.id exist
            existingUser.add(record.id);
            uniqueRecord.push(record);
        }
    });

    return uniqueRecord;
};
