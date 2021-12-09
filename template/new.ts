import * as fse from "fs-extra";
import path from "path";
import Logger from "../shared/logger";


const logger = new Logger({enabled: true});

/**
 * copy template files in the given path
 * @param destination the relative folder where to copy
 */
function copyTemplate(destination: string) {
  const src = path.join(__dirname, './src')
  const dest = path.join(__dirname, '../', destination)

  try {
		fse.mkdirSync(dest, { recursive: true })
		fse.copySync(src, dest, { errorOnExist: true, overwrite: false });
  } catch (error: any) {
    logger.error(error);
    process.exit(1)
  }
}

/**
 * replace variables in the template
 * @param destination the relative folder where to copy
 * @param day the value to replace $DAY in templates
 * @param part the value to replace $PART in templates
 */
function replaceInTemplate(destination: string, day: number, part: number) {
  const filepath = path.join(__dirname, '../', destination, './index.ts')

  const content = fse.readFileSync(filepath, 'utf-8')
    .replace(/\$YEAR/g, '2021')
    .replace(/\$DAY/g, day.toString())
    .replace(/\$PART/g, part.toString())

  fse.writeFileSync(filepath, content, {encoding: 'utf-8'})
}

/**
 * Extract arguments
 */
function parseArgs(): number[] {
  const argDay = process.argv[2];
  if(!argDay) {
    logger.error('missing argument: <day>')
    process.exit(1)
  }

  const argPart = process.argv[3];
  if(!argPart) {
    logger.error('missing argument: <part>')
    process.exit(1)
  }

  return [
    parseInt(argDay, 10),
    parseInt(argPart, 10)
  ]
}


const [ day, part ] = parseArgs();
const destinationPath = path.join(`./days/${day}p${part}`)
copyTemplate(destinationPath)
replaceInTemplate(destinationPath, day, part);
logger.success("Success")
logger.info(`start using: 'npm run start -- ${day} ${part}'`)
