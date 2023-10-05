let target = 7
let numbs = [1, 5, 1, 1, 3]

function findTheLess(target, numbs) {
    for (let i = 0; i < numbs.length; i++) {
        if (target == numbs[i]) return 1
    }

    let counter = 1;
    while (counter < numbs.length) {
        for (let i = 0; i < numbs.length - counter; i++) {
            console.log("i : ",i)
            let iCounter = 1;
            let sum = 0;
            while (iCounter < counter + 1) {
                console.log("ay")
                sum += numbs[i + iCounter]
                iCounter++
            }
            if (numbs[i] + sum == target){
                counter ++
                return counter;
            } 
            if(i == numbs.length - counter - 1 ) {
                counter++
            }
        }

    }
    return 0;


}


// console.log(findTheLess(target, numbs))


let storage = [{channel: "general", users:[]}, {channel:"room", users:[]}];

let data = storage.map(e=>e.channel)

console.log(data, storage); 

