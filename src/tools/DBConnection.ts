export default class DBConnection {
  database?: string;

  constructor() {
    if (!this.database) {
      this.database = "MySQL3";
    }
    this.database = "MySQL3";
  }

  insert(query: string) {
    return this.database.concat(` insert: ${query}`);
  }

  delete(query: string) {
    return this.database.concat(` delete: ${query}`);
  }

  update(query: string) {
    return this.database.concat(` update: ${query}`);
  }

  get(query: string) {
    return this.database.concat(` get: ${query}`);
  }
}
