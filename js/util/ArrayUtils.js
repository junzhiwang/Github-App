export default class ArrayUtils{
	 /**
	  * update array, if exists, remove, otherwise add it.
	  */
	static updateArray(array, item){
        for(var i = 0; i < array.length; ++i){
            var tmp = array[i];
            if(tmp===item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
	}
    /**
     *  Clone an array
     */
    static clone(from){
        if(!from) return [];
        let newArray = [];
        from.forEach((curVal)=>{
            newArray.push(curVal);
        });
        return newArray;
    }
    static isEqual(arr1, arr2){
        if(!(arr1&&arr2)) return false;
        if(arr1.length!==arr2.length) return false;
        for(let i = 0; i < arr1.length; ++i){
            if(arr1[i]!==arr2[i]) return false;
        }
        return true;
    }
}