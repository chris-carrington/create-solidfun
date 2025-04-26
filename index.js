#!/usr/bin/env node
// @ts-check

import ora from 'ora'
import chalk from 'chalk'
import { join } from 'node:path'
import { constants } from 'node:fs'
import { dirname } from 'node:path'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import { cp, mkdir } from 'node:fs/promises'
import { access, writeFile } from 'node:fs/promises'


/**
 * 1. Ensure node version is 22 or higher
 * 1. Ask / receive project name
 * 1. Copy files from project to their directory
 */
async function main() {
  const build = new Build()

  try {
    build.checkNodeVersion()

    await build.setProjectName()

    build.startSpinner()

    await build.writeFiles()
    await build.onSuccess()
  } catch (err) {
    build.onCatch(err)
  }
}


class Build {
  projectName = ''

  createPackageDotJson() {
    return {
      name: this.projectName,
      type: 'module',
      scripts: {
        dev: 'fun build local && vinxi dev',
        build: 'vinxi build',
        start: 'vinxi start',
        version: 'vinxi version',
      },
      dependencies: {
        '@solidjs/meta': '^0.29.4',
        '@solidjs/router': '^0.15.0',
        '@solidjs/start': '^1.1.0',
        'solid-js': '^1.9.5',
        solidfun: '^0.0.29',
        vinxi: '^0.5.3',
      },
      engines: { node: '>=22' },
      devDependencies: { '@types/node': '^22.14.1' },
    }
  }


  async writeFiles() {
    // get bearings
    const cwd = process.cwd()
    const newProjectDir = join(cwd, this.projectName)
    const __dirname = dirname(fileURLToPath(import.meta.url))
  
    // create folders / foundation / required buckets
    await mkdir(newProjectDir, { recursive: true }) 

    await Promise.all([
      mkdir(join(newProjectDir, 'src'),    { recursive: true }),
      mkdir(join(newProjectDir, 'public'), { recursive: true }),
    ])

    const writePromises = [ 'app.config.ts', 'fun.config.js', 'README.md', 'tsconfig.json' ].map(file =>
      cp(join(__dirname, file), join(newProjectDir, file))
    )

    writePromises.push(
      cp(join(__dirname, 'public'), join(newProjectDir, 'public'), { recursive: true }),
      cp(join(__dirname, 'src'), join(newProjectDir, 'src'), { recursive: true }),
      writeFile(join(newProjectDir, 'package.json'), JSON.stringify(this.createPackageDotJson(), null, 2), 'utf8')
    )

    await Promise.all(writePromises)
  }


  checkNodeVersion() {
    const current = parseInt(process.versions.node.split('.')[0], 10)
  
    if (current < 22) {
      console.error(chalk.red(`❌ Node.js 22+ is required. You're using ${process.version}`))
      process.exit(1)
    }
  }


  async setProjectName () {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const question = (/** @type {string} */ q) => new Promise((resolve) => rl.question(q, (answer) => resolve(answer.trim())))

    while (true) {
      this.projectName = await question(chalk.cyan('🛠️  Project name: '))

      if (!this.projectName) console.log(chalk.red('⚠️  Project name cannot be empty.'))
      else if (/[/\\?%*:|"<>]/.test(this.projectName)) console.log(chalk.red('⚠️  Project name contains invalid characters.'))
      else if (await pathExists(this.projectName)) console.log(chalk.yellow(`⚠️  A folder named "${this.projectName}" already exists. Please choose a different name.`))
      else break
    }

    rl.close()
  }


  startSpinner() {
    this.spinner = ora(`Creating ./${this.projectName}...`).start()
  }


  async onSuccess() {
    this.spinner?.succeed(`Created: ./${this.projectName}`)

    console.log()
    console.log(chalk.bold.green('🎉 Congratulations!') + ' You have created a Solid Fun project!')
    console.log()
    console.log(chalk.bold.blue('🚀 3 steps to run it now:\n'))
    console.log(
      chalk.blue('   1)') + ' ' +
      chalk.cyan(`cd ./${this.projectName}`)
    )
    console.log(
      chalk.blue('   2)') + ' ' +
      chalk.cyan('npm install')
    )
    console.log(
      chalk.blue('   3)') + ' ' +
      chalk.cyan('npm run dev')
    )
    console.log()
    console.log(chalk.dim('💖 Thanks for creating w/ Solid Fun! ✨ Docs: https://www.npmjs.com/package/solidfun'))
  }


  /** @param {*} [err] */
  onCatch(err) {
    if (this.spinner) this.spinner.fail('Failed to create Solid project.')
    console.error(err)
    process.exit(1)
  }
}


main()


/**
 * @param {string} path 
 * @returns {Promise<boolean>}
 */
async function pathExists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}
