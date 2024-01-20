export const data = [
    {
        id: 0,
        title: "Shopping",
        created: new Date(new Date().getTime() - 10 * 60000),
        ending: new Date(new Date().getTime() + 10 * 60000),
        status: 'done',
        category: 'sport'
    },
    {
        id: 1,
        title: "Work on Project",
        created: new Date(new Date().getTime() - 20 * 60000),
        ending: new Date(new Date().getTime() + 30 * 60000),
        status: 'done',
        category: 'health'
    },
    {
        id: 2,
        title: "Exercise",
        created: new Date(new Date().getTime() + 60 * 60000),
        ending: new Date(new Date().getTime() + 40 * 60000),
        status: 'todo',
        category: 'study'
    },
    {
        id: 3,
        title: "Drawing",
        created: new Date(new Date().getTime() + 120 * 60000),
        ending: new Date(new Date().getTime() + 160 * 60000),
        status: 'todo',
        category: 'work'
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