import { Logger4j } from '../src'

const log = new Logger4j({ level: 'all' })
log.fatal('this is a fatal')
log.error('this is an error')
log.warn('this is a warn')
log.info('this is a info')
log.debug('this is a debug')
