import { DatabaseConnection } from "../interfaces";
import MySQLConnection from "./MySQL";

export default class DBConnection {
  private databaseStrategy: DatabaseConnection;

  constructor() {
    this.databaseStrategy = new MySQLConnection();
  }

  connect() {
    this.databaseStrategy.connect();
  }

  disconnect() {
    this.databaseStrategy.disconnect();
  }

  public executeQuery(query: string, values: any[]) {
    return this.databaseStrategy.executeQuery(query, values);
  }

  static generateSelectQuery(
    tableName: string,
    fields: string[],
    queryFields: string[],
    and = true
  ) {
    const finalFields = this.formatFields(fields);
    const finalQueryFields = this.mapFields(queryFields).join(
      and ? " AND " : " OR "
    );
    let query = `SELECT ${finalFields} FROM ${tableName}`;

    if (queryFields.length) {
      query = query.concat(` WHERE ${finalQueryFields}`);
    }
    console.log("🚀 ~ DBConnection ~ query:", query);
    return query;
  }

  static generateInsertQuery(
    tableName: string,
    fields: string[],
    ignoreId = false
  ) {
    const finalFields = this.formatFields(fields, ignoreId);

    const query = `INSERT INTO ${tableName} (${finalFields}) VALUES (${this.getQuestionMarks(
      fields,
      ignoreId
    )})`;
    console.log("🚀 ~ DBConnection ~ query:", query);

    return query;
  }

  static generateUpdateQuery(
    tableName: string,
    fields: string[],
    ignoreId = false,
    queryFields: string[] = [],
    and = true
  ) {
    const finalFields = this.mapFields(fields, ignoreId).join(",");
    const finalQueryFields = this.mapFields(queryFields, false).join(
      and ? " AND " : " OR "
    );

    let query = `UPDATE ${tableName} SET ${finalFields}`;

    if (queryFields.length) {
      query = query.concat(` WHERE ${finalQueryFields}`);
    }
    console.log("🚀 ~ DBConnection ~ query:", query);

    return query;
  }

  static generateDeleteQuery(
    tableName: string,
    queryFields: string[],
    and = true
  ) {
    const finalQueryFields = this.mapFields(queryFields).join(
      and ? " AND " : " OR "
    );
    const query = `DELETE FROM ${tableName} WHERE ${finalQueryFields}`;

    console.log("🚀 ~ DBConnection ~ generateDeleteQuery ~ query:", query);
    return query;
  }

  static mapFields(fields: string[], ignoreId = false): string[] {
    let finalFields = fields;
    if (ignoreId) {
      finalFields = fields.filter((field) => field !== "id");
    }
    return finalFields.map((field) => `${field} = ?`);
  }

  static formatFields(fields: string[], ignoreId = false) {
    let finalFields = fields;
    if (ignoreId) {
      finalFields = fields.filter((field) => field !== "id");
    }
    return finalFields.join(",");
  }

  static getQuestionMarks(fields: string[], ignoreId = false) {
    if (ignoreId) {
      fields = fields.filter((field) => field !== "id");
    }
    return fields.map(() => "?").join(",");
  }
}
