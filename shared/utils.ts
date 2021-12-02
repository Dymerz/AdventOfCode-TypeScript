import * as fs from "fs";
import path from "path";

const relativePath = `./days/${process.env.aoc_day}p${process.env.aoc_part}/`

/**
 * get the content of a file relative to 'days/folder/'
 * @param filename the filename of the file to read
 * @returns string
 */
export function readFile(filename: string): string {
  return fs.readFileSync(path.join(relativePath, filename), 'utf-8')
    .trim();
}
