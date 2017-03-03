import { TemplateRef, QueryList, EventEmitter } from '@angular/core';
import { HashMap } from '../../utils/index';

export class TreeListDefault {
    update: EventEmitter<boolean> = new EventEmitter<boolean>();

    header: QueryList<TemplateRef<any>>;
    contentTpls: QueryList<TemplateRef<any>>;

    groups: HashMap<string, any> = new HashMap<string, any>();
    groupsParents: HashMap<string, Array<any>> = new HashMap<string, any>();
    elements: HashMap<string, Array<any>> = new HashMap<string, Array<any>>();

    groupsFilter: (any) => string = (a) => a.id;
    groupParentsFilter: (any) => string = (a) => a.parent;
    elementsFilter: (any) => string = (a) => a.parent;

    setGroups(groups: Array<any>) {
        this.groups.clear();
        groups.forEach(group => {
            let key = this.groupsFilter(group);
            this.groups.put(key, group);

            let keyP = this.groupParentsFilter(group);
            if (!this.groupsParents.containsKey(keyP)) {
                this.groupsParents.put(keyP, new Array<any>());
            }
            this.groupsParents.get(keyP).push(key);
        });
        this.update.emit(true);
    }
    setElements(elements: Array<any>) {
        this.elements.clear();
        elements.forEach(element => {
            let key = this.elementsFilter(element);
            if (!this.elements.containsKey(key)) {
                this.elements.put(key, new Array<any>());
            }
            this.elements.get(key).push(element);
        });
        this.update.emit(true);
    }

    setGroupsFilter(groupsFilter: (any) => string) {
        this.groupsFilter = groupsFilter;
    }

    setGroupParentsFilter(groupParentsFilter: (any) => string) {
        this.groupParentsFilter = groupParentsFilter;
    }

    setElementsFilter(elementsFilter: (any) => string) {
        this.elementsFilter = elementsFilter;
    }

    build(key: string) {
        if (key === undefined || key === null) {
            key = '';
        }
        return [
            [this.groups.getOrDefault(key, '')],                     // head
            this.groupsParents.getOrDefault(key, new Array<any>()),  // nodes
            this.elements.getOrDefault(key, new Array<any>())        // elements
        ];
    }
}
