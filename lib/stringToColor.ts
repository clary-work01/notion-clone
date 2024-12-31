// export function stringToColor(str: string) {
//   // this method will take any string and convert it to hash
//   let hash = 0;

//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);

//     const c = (hash & 0x00ffffff).toString(16).toUpperCase();
//     return "#" + "00000".substring(0, 6 - c.length) + c;
//   }
// }

export const stringToColor = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};
