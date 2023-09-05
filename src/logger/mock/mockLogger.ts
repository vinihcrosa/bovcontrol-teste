import { ILogger } from "../ILogger";

export class MockLogger implements ILogger {
  fatal(context: string, message: string, data: any, ...args: any[]): void {
    return;
  }
  error(context: string, message: string, data: any, ...args: any[]): void {
    return;
  }
  warn(context: string, message: string, data: any, ...args: any[]): void {
    return;
  }
  info(context: string, message: string, data: any, ...args: any[]): void {
    return;
  }
  debug(context: string, message: string, data: any, ...args: any[]): void {
    return;
  }
  trace(context: string, message: string, data: any, ...args: any[]): void {
    return;
  }
  
}