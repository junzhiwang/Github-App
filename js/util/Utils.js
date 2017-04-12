export default class Utils {
    static checkFavorite(item, items){
        for(var i = 0; i < items.length; ++i){
            if(item.id.toString() === items[i]) return true;
        }
        return false;
    }
}
