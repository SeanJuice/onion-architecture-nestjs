
export const databaseConfiguration = (): any => (
  {
    dialect: 'mssql',
    host: 'localhost',
    port: 1433,
    username: `BDO\ShMlangeni`,
    password: '',
    database: 'BDO_Checklists_Dev',
    define: {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  }
);
