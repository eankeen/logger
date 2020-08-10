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
			console.error(`${c.yellow('▶ WARN  |')} ${text}`)
		}
	}
	public info(text: string): void {
		if (this.oneOf(['debug', 'info'])) {
			console.error(`${c.blue('▶ INFO  |')} ${text}`)
		}
	}
	public debug(text: string): void {
		if (this.oneOf(['debug'])) {
			console.error(`${c.cyanBright('▶ DEBUG |')} ${text}`)
		}
	}
}

/**
 * Logger is a simple class that provides access to
 * printing log levels specified by the Syslog
 * protocol (RFC 5425)
 */
export class LoggerSyslog {
	constructor() {}

	emerg(text: string): void {
		console.error(text)
	}
	alert(text: string): void {
		console.error(text)
	}
	crit(text: string): void {
		console.error(text)
	}
	err(text: string): void {
		console.error(text)
	}
	warning(text: string): void {
		console.warn(text)
	}
	notice(text: string): void {
		console.info(text)
	}
	info(text: string): void {
		console.info(text)
	}
	debug(text: string): void {
		console.debug(text)
	}
}

export const logger = new LoggerSyslog()
export const logger4j = new Logger4j()
