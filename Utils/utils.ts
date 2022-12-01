import { readFileSync, promises as fsPromises } from "fs";
import { join } from "path";

export function syncReadFile(filename: string) {
  const result = readFileSync(join(__dirname, filename), "utf-8");
  return result;
}

export async function asyncReadFile(filename: string) {
  try {
    const result = await fsPromises.readFile(
      join(__dirname, filename),
      "utf-8"
    );
    return result;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
}
