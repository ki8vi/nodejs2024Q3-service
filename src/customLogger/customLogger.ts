import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as util from 'node:util';

@Injectable()
export class Logger implements LoggerService {
  private readonly levels: { [key: string]: number } = {
    fatal: 0,
    error: 1,
    warn: 2,
    log: 3,
    debug: 4,
    verbose: 5,
  };

  private readonly logPath: string;
  private readonly fileSize: number;
  private readonly currLevel: number;

  constructor() {
    this.logPath =
      process.env.LOG_FILE_PATH || path.resolve('LOGS', 'LOGS.log');
    this.fileSize = +process.env.LOG_FILE_MAX_SIZE || 1024;
    this.currLevel = +process.env.LOG_LEVEL || 1;

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }
  }

  private createFileLog(level: string, message: unknown) {
    const msg = `${new Date().toISOString()} [${level.toUpperCase()}]: ${util.format(
      message,
    )}\n`;

    if (fs.existsSync(this.logPath)) {
      const stats = fs.statSync(this.logPath);
      if (stats.size / 1024 > this.fileSize) {
        const crFile = `${this.logPath}.${Date.now()}`;
        fs.renameSync(this.logPath, crFile);
      }
    }

    fs.appendFileSync(this.logPath, msg);
  }

  private checkLogLevel(level: string): boolean {
    return this.levels[level] <= this.currLevel;
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    console.error(`FATAL: ${message}`, ...optionalParams);
    this.createFileLog('fatal', message);
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    if (this.checkLogLevel('log')) {
      console.log(message, ...optionalParams);
      this.createFileLog('log', message);
    }
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    if (this.checkLogLevel('error')) {
      console.error(message, ...optionalParams);
      this.createFileLog('error', message);
    }
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    if (this.checkLogLevel('warn')) {
      console.warn(message, ...optionalParams);
      this.createFileLog('warn', message);
    }
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    if (this.checkLogLevel('debug')) {
      console.debug(message, ...optionalParams);
      this.createFileLog('debug', message);
    }
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    if (this.checkLogLevel('verbose')) {
      console.log(message, ...optionalParams);
      this.createFileLog('verbose', message);
    }
  }
}
