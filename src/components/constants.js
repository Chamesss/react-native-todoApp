export const data = [
    {
        id: 0,
        title: "Shopping",
        created: new Date(new Date().getTime() - 10 * 60000),
        ending: new Date(new Date().getTime() + 10 * 60000),
        status: 'done',
        category: 'shop'
    },
    {
        id: 1,
        title: "Work on Project",
        created: new Date(new Date().getTime() - 40 * 60000),
        ending: new Date(new Date().getTime() - 20 * 60000),
        status: 'todo',
        category: 'work'
    },
    {
        id: 2,
        title: "Exercise",
        created: new Date(new Date().getTime() + 60 * 60000),
        ending: new Date(new Date().getTime() + 40 * 60000),
        status: 'todo',
        category: 'sport'
    },
    {
        id: 3,
        title: "Drawing",
        created: new Date(new Date().getTime() + 120 * 60000),
        ending: new Date(new Date().getTime() + 160 * 60000),
        status: 'todo',
        category: 'fun'
    },
    {
        id: 4,
        title: "Partying",
        created: new Date(new Date().getTime() - 10 * 60000),
        ending: new Date(new Date().getTime() + 10 * 60000),
        status: 'done',
        category: 'events'
    },
    {
        id: 5,
        title: "Cleaning",
        created: new Date(new Date().getTime() - 20 * 60000),
        ending: new Date(new Date().getTime() + 30 * 60000),
        status: 'done',
        category: 'home'
    },
    {
        id: 6,
        title: "Playing guitar",
        created: new Date(new Date().getTime() + 60 * 60000),
        ending: new Date(new Date().getTime() + 40 * 60000),
        status: 'todo',
        category: 'music'
    },
    {
        id: 7,
        title: "See Doctor",
        created: new Date(new Date().getTime() + 120 * 60000),
        ending: new Date(new Date().getTime() + 160 * 60000),
        status: 'todo',
        category: 'health'
    },
    {
        id: 8,
        title: "Playing guitar",
        created: new Date(new Date().getTime() + 60 * 60000),
        ending: new Date(new Date().getTime() + 40 * 60000),
        status: 'todo',
        category: 'music'
    },
    {
        id: 9,
        title: "Travel",
        created: new Date(new Date().getTime() + 120 * 60000),
        ending: new Date(new Date().getTime() + 160 * 60000),
        status: 'todo',
        category: 'travel'
    },
    {
        id: 10,
        title: "Study",
        created: new Date(new Date().getTime() + 120 * 60000),
        ending: new Date(new Date().getTime() + 160 * 60000),
        status: 'todo',
        category: 'study'
    },
];

import All from '../../assets/categories/all.svg'
import Events from '../../assets/categories/events.svg'
import Fun from '../../assets/categories/fun.svg'
import Health from '../../assets/categories/health.svg'
import Home from '../../assets/categories/home.svg'
import Music from '../../assets/categories/music.svg'
import Shop from '../../assets/categories/shop.svg'
import Sport from '../../assets/categories/sport.svg'
import Study from '../../assets/categories/study.svg'
import Travel from '../../assets/categories/travel.svg'
import Work from '../../assets/categories/work.svg'


export const svgs = {
    all: All,
    events: Events,
    fun: Fun,
    health: Health,
    home: Home,
    music: Music,
    shop: Shop,
    sport: Sport,
    study: Study,
    travel: Travel,
    work: Work
}

export const colors = {
    all: 'bg-blue-500',
    events: 'bg-purple-500',
    fun: 'bg-yellow-500',
    health: 'bg-red-500',
    home: 'bg-yellow-900',
    music: 'bg-rose-600',
    shop: 'bg-emerald-600',
    sport: 'bg-orange-500',
    study: 'bg-purple-300',
    travel: 'bg-cyan-500',
    work: 'bg-yellow-950',
};