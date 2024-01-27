import Realm from "realm"

export class Task extends Realm.Object {
    static schema = {
        name: 'Task',
        properties: {
            title: 'string',
            created: 'date',
            ending: 'date',
            status: {
                type: 'string',
                default: 'todo'
            },
            category: 'string'
        }
    }
}