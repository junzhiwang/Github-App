export default class Utils {
  static checkFavorite(item, items) {
    for (var i = 0; i < items.length; ++i) {
      if (item.id.toString() === items[i]) return true;
    }
    return false;
  }

  static checkDate(longTime) {
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(longTime);
    if (cDate.getDate() !== tDate.getDate()) return false;
    if (cDate.getHours() - tDate.getHours() > 4) return false;
    return true;
  }
}
