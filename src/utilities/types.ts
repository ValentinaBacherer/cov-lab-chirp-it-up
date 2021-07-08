import { MysqlError } from 'mysql';

export interface SingleChirp {
  id: string;
  userid?: string;
  date?: any;
  content: string;
  username?: string;
}

export interface MySQLSuccess {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

export interface MySQLError {
  sqlMessage: string;
  code: string;
  errno: number;
}

export type MySQLResponse = MySQLSuccess & MySQLError;
