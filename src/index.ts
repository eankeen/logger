import c from 'ansi-colors'

type Logger4JLevels = 'debug' | 'info' | 'warn' | 'error' | 'fatal'
interface Logger4jOptions {
	level?: Logger4JLevels | 'all' | 'off'
}

/**
 * Logger is a simple class that provides access to
 * printing log levels equivalent to that of log4j's
 */
export class Logger4j {
	#level: string

	constructor({
		level = Object.prototype.hasOwnProperty.call(process.env, 'DdEBUG')
			? 'debug'
			: 'info',
	}: Logger4jOptions = {}) {
		this.#level = level
	}

	private oneOf(matchingCandidates: string[]): boolean {
		if (this.#level === 'all') return true
		if (this.#level === 'none') return false

		return new Set(matchingCandidates).has(this.#level)
	}

	public fatal(text: string): void {
		if (this.oneOf(['debug', 'info', 'warn', 'error', 'fatal'])) {
			console.error(`${c.magenta('▶ FATAL |')} ${text}`)
		}
	}
	public error(text: string): void {
		if (this.oneOf(['debug', 'info', 'warn', 'error'])) {
			console.error(`${c.red('▶ ERROR |')} ${text}`)
		}
	}
	public warn(text: string): void {
		if (this.oneOf(['debug', 'info', 'warn'])) {
			console.warn(`${c.yellow('▶ WARN  |')} ${text}`)
		}
	}
	public info(text: string): void {
		if (this.oneOf(['debug', 'info'])) {
			console.info(`${c.blue('▶ INFO  |')} ${text}`)
		}
	}
	public debug(text: string): void {
		if (this.oneOf(['debug'])) {
			console.debug(`${c.cyanBright('▶ DEBUG |')} ${text}`)
		}
	}
}

/**
 * Logger is a simple class that provides access to
 * printing log levels specified by the Syslog
 * protocol (RFC 5425)
 */
export class LoggerSyslog {
	#level: string

	constructor({
		level = Object.prototype.hasOwnProperty.call(process.env, 'DdEBUG')
			? 'debug'
			: 'info',
	}: Logger4jOptions = {}) {
		this.#level = level
	}

	private oneOf(matchingCandidates: string[]): boolean {
		if (this.#level === 'all') return true
		if (this.#level === 'none') return false

		return new Set(matchingCandidates).has(this.#level)
	}
	public emerg(text: string): void {
		if (
			this.oneOf(['debug', 'info', 'notice', 'warning', 'emerg', 'alert'])
		) {
			console.debug(`${c.magenta('▶ EMERG |')} ${text}`)
		}
	}
	public alert(text: string): void {
		if (this.oneOf(['debug', 'info', 'notice', 'warning', 'crit', 'alert'])) {
			console.debug(`${c.magenta('▶ ALERT |')} ${text}`)
		}
	}
	public crit(text: string): void {
		if (this.oneOf(['debug', 'info', 'notice', 'warning', 'crit'])) {
			console.debug(`${c.red('▶ CRIT |')} ${text}`)
		}
	}
	public err(text: string): void {
		if (this.oneOf(['debug', 'info', 'notice', 'warning', 'err'])) {
			console.debug(`${c.red('▶ ERR |')} ${text}`)
		}
	}
	public warning(text: string): void {
		if (this.oneOf(['debug', 'info', 'notice', 'warning'])) {
			console.debug(`${c.yellow('▶ WARNING |')} ${text}`)
		}
	}
	public notice(text: string): void {
		if (this.oneOf(['debug', 'info', 'notice'])) {
			console.debug(`${c.yellow('▶ NOTICE |')} ${text}`)
		}
	}
	public info(text: string): void {
		if (this.oneOf(['debug', 'info'])) {
			console.debug(`${c.blue('▶ INFO |')} ${text}`)
		}
	}
	public debug(text: string): void {
		if (this.oneOf(['debug'])) {
			console.debug(`${c.cyanBright('▶ DEBUG |')} ${text}`)
		}
	}
}

export const logger = new LoggerSyslog()
export const logger4j = new Logger4j()
