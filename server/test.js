const rooms = [
    {
        id: 0,
        name: "default",
        admin: "admin",
        users: [],
        messages: []
    },
    // {
    //     id:1,
    //     name:'general',
    //     admin:'admin',
    //     users:[],
    //     messages:[]
    // }
];

const filterRoom = rooms.filter(room => room.name === "default");

filterRoom[0].users.push({name:"Ionut"});

console.log("filtered room",filterRoom[0].users);
console.log("*************")
console.log("rooms",rooms[0].users);


/* 
    **** Filter room créer une shallow copie 
*/