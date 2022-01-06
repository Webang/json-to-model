"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToModel = void 0;
function jsonToModel(obj, customPath = []) {
    const outPath = [];
    const inner = getType(obj, 0, "");
    const outer = outPath.map((it) => `interface ${it.key} ${it.value}\n`).join("\n");
    return `${outer} \n interface Model ${inner}`;
    function getType(obj = {}, depth, path) {
        const currentItem = customPath.find((it) => {
            return it.path === path;
        });
        if (currentItem?.inject && currentItem.name) {
            return currentItem.name;
        }
        if (["string", "number", "boolean"].find((it) => typeof obj === it)) {
            return typeof obj;
        }
        if (obj === null) {
            return "null";
        }
        if (Array.isArray(obj)) {
            return `${getType(obj[0], depth + 1, `${path}.0`)}[]`;
        }
        const keys = Object.keys(obj);
        const property = [];
        keys.forEach((key) => {
            let value = getType(obj[key], depth + 1, `${path}.${key}`) + ";";
            property.push({ key, value });
        });
        const beforeSpaces = new Array((depth + 1) * 4).fill(undefined).join(" ");
        const afterSpaces = new Array(depth * 4).fill(undefined).join(" ");
        const model = `{\n${property
            .map((it) => `${beforeSpaces}${it.key}: ${it.value}`)
            .join("\n")}\n${afterSpaces}}`;
        if (currentItem?.extract && currentItem.name) {
            // 提取子路径作为独立类型
            outPath.push({
                key: currentItem.name,
                value: model,
            });
            return currentItem.name;
        }
        return model;
    }
}
exports.jsonToModel = jsonToModel;
//# sourceMappingURL=index.js.map