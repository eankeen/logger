import { Logger4j, LoggerSyslog } from '../src'

const log = new Logger4j({ level: 'all' })
log.fatal('this is fatal')
log.error('this is error')
log.warn('this is warn')
log.info('this is info')
log.debug('this is debug')

console.log()

const log2 = new LoggerSyslog({ level: 'debug' })
log2.emerg('this is emerg')
log2.alert('this is alert')
log2.crit('this is crit')
log2.err('this is err')
log2.warning('this is warning')
log2.notice('this is notice')
log2.info('this is info')
log2.debug('this is debug')
