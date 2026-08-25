const db = require("../utils/databaseUtil");

/** Database access for the `favourites` table.
 *
 * The table needs a unique `homeId` column, so a home can only be favourited
 * once. See TODO.md for the SQL needed to create the tables.
 */
module.exports = class Favourite {
  static fetchAll() {
    return db.execute("SELECT homeId FROM favourites");
  }

  static add(homeId) {
    return db.execute("INSERT IGNORE INTO favourites (homeId) VALUES (?)", [
      homeId,
    ]);
  }

  static deleteByHomeId(homeId) {
    return db.execute("DELETE FROM favourites WHERE homeId = ?", [homeId]);
  }
};
