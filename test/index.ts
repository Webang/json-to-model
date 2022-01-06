import { jsonToModel } from "../src";
const json = `{
  "name": "frank",
  "skill": [
    "Java",
    "Javascript"
  ],
  "mother": {
    "name": "tony",
    "school": {
      "name": null
    }
  },
  "wife": {
    "name": "tony"
  },
  "school": {
    "city": "郑州"
  }
}
`;
var data = eval(`const a = ${json}; a`);
console.log(jsonToModel(data));
//# sourceMappingURL=index.js.map