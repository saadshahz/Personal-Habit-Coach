const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const FILE_PATH = path.join(DATA_DIR, 'analyses.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
// Ensure file exists
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

exports.readData = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        if (!data) return [];
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data:", error);
        return []; // Fail safe to empty array
    }
};

exports.writeData = (newData) => {
    try {
        // Read existing first to append? Or assumes newData is the full list?
        // Requirement says "Save result to JSON file". We probably want to append history.
        const current = exports.readData();
        current.push(newData);
        fs.writeFileSync(FILE_PATH, JSON.stringify(current, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing data:", error);
        throw new Error("Storage failure");
    }
};

exports.getHistory = () => {
    return exports.readData().reverse(); // Newest first
};
