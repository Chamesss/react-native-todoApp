export const data = [
    {
        id: 0,
        title: "Shopping",
        created: new Date(new Date().getTime() - 10 * 60000),
        ending: new Date(new Date().getTime() + 10 * 60000),
        status: 'done'
    },
    {
        id: 1,
        title: "Work on Project",
        created: new Date(new Date().getTime() - 20 * 60000),
        ending: new Date(new Date().getTime() + 30 * 60000),
        status: 'done'
    },
    {
        id: 2,
        title: "Exercise",
        created: new Date(new Date().getTime() + 60 * 60000),
        ending: new Date(new Date().getTime() + 40 * 60000),
        status: 'todo'
    },
    {
        id: 3,
        title: "Drawing",
        created: new Date(new Date().getTime() + 120 * 60000),
        ending: new Date(new Date().getTime() + 160 * 60000),
        status: 'todo'
    },
];