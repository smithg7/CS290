/**************************************************
Author: Gary Smith
CS290 - Activity 3 (JS Objects)
4/16/2016
**************************************************/
function deepEqual(obj1, obj2)
{
    var count1 = 0;
    var count2 = 0;
    for (var prop in obj1) {count1++;}
    for (var prop in obj2) {count2++;}
    if (count1 != count2) {
        //console.log("Counts do not match: " + count1.toString() + ":" + count2.toString());
        return false;
    }
   
    for (var prop in obj1)
    {
        if (obj2[prop] == null) { return false; }
        //If the property is an object and not null, call this function recursively
        if((typeof obj2[prop] == "object") && (typeof obj1[prop] == "object"))
        {
            if (!deepEqual(obj1[prop], obj2[prop])) {
                //console.log("recursive call returned false.")
                return false;
            }
        }
        else 
        {
            if (obj1[prop] != obj2[prop]) {
                //console.log("object properties do not match: " + obj1[prop] + ":" + obj2[prop]);
                return false;
            }
        }
    }
    return true;   
}



var obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
//  true
console.log(deepEqual(obj, { here: 1, object: 2 }));
//  false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
//  true