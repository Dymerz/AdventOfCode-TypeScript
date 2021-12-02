import * as path from  'path'
import { spawn } from  'child_process'
import { Command } from "commander";

function generate(day: number, part: number) {
	const args = [
		'ts-node',
		'./template/new.ts',
		day.toString(),
		part.toString()
	]
	npx(args)
}

function start(day: number, part: number) {
	const indexFile = path.join(getPath(day, part), 'index.ts');
	const args = [
		'ts-node',
		indexFile
	]
	const env = {
		aoc_day: day,
		aoc_part: part,
	}

	npx(args, env)
}

function debug(day: number, part: number) {
	const indexFile = path.join(getPath(day, part), 'index.ts');
	const args = [
		'nodemon',
		'--watch', indexFile,
		'--watch','./shared',
		indexFile
	]
	const env = {
		aoc_day: day,
		aoc_part: part,
	}

	npx(args, env)
}

function getPath(day: number, part: number) {
	return path.join(__dirname, 'days', `${day}p${part}`);
}

async function npx(args: string[], env: any={}): Promise<boolean> {
	const detached = process.platform.includes("win") ? false : true;
	const npx = process.platform.includes("win") ? 'npx.cmd' : 'npx';

	return new Promise((resolve) => {
		const child = spawn(npx, args, {stdio: 'inherit', env: { ...env, ...process.env }, detached })
		child.on('close', () => resolve(true))
		child.on('error', () => resolve(false))
	});
}

const program = new Command();

program
	.command('generate <day> <part>')
	.alias('new')
	.description('generate a new playground')
	.action(generate)

program
	.command('start <day> <part>')
	.alias('run')
	.description('start a playground')
	.action(start)


program
	.command('debug <day> <part>')
	.alias('dev')
	.description('start a playground in dev mode')
	.action(debug)

program.parse();
