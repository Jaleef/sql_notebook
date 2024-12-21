import mysql from 'mysql2';
import { db } from './config';

export const pool = mysql.createConnection(db);
