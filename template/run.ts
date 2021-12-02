import * as fse from "fs-extra";
import path from "path";
import Logger from "../shared/logger";


const logger = new Logger({enabled: true});

/**
 * copy template files in the given path
 * @param destination the de relative folder where to copy
 */
function copyTemplate(destination: string) {
  const src = path.join(__dirname, './src')
  const dest = path.join(__dirname, '../', destination)

  try {
		fse.mkdirSync(dest, { recursive: true })
		fse.copySync(src, dest);
  } catch (error: any) {
    logger.error(error);
    process.exit(1)
  }
}

/**
 * replace variables in the template
 * @param destination the de relative folder where to copy
 */
function replaceInTemplate(destination: string) {
  const filepath = path.join(__dirname, '../', destination, './index.ts')

  const content = fse.readFileSync(filepath, 'utf-8')
    .replace(/\$YEAR/g, '2021')
    .replace(/\$DAY/g, process.env.npm_config_day!)
    .replace(/\$PART/g, process.env.npm_config_part!)

  fse.writeFileSync(filepath, content, {encoding: 'utf-8'})
}

/**
 * Extract arguments from the command line
 * (these are injected in env by npm)
 */
function parseArgs(): number[] {
  const argDay = process.env.npm_config_day;
  if(!argDay) {
    logger.error('missing argument: --day=<number>')
    logger.info('usage: npm run new --day=<number> --part=<number>')
    process.exit(1)
  }

  const argPart = process.env.npm_config_part;
  if(!argPart) {
    logger.error('missing argument: --part=<number>')
    logger.info('usage: npm run new --day=<number> --part=<number>')
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
replaceInTemplate(destinationPath);
logger.success("Success")
logger.info(`start using: 'npm run start --day=${day} --part=${part}'`)
