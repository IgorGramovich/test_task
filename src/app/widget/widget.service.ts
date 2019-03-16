import { Injectable } from '@angular/core';
import { WidgetNode } from './widget-node.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WidgetService {
    private _nodeList$: BehaviorSubject<string[]>;
    private _defaultList: string[] = ['Элемент 5', 'Элемент 51', 'Элемент 56'];
    private _allList: string[];
    private _nodeList: string[];
    get nodeList$ () {
        return this._nodeList$.asObservable();
    }
    constructor() {
        this._nodeList = this._defaultList;
        this._nodeList$ = new BehaviorSubject<string[]>(this._nodeList);
    }
    getAllList() {
        if (!this._allList) {
            this._allList = Array.from({ length: 300 }, (_, idx) => `Элемент ${++idx}`)
        }
    }
    deleteNode(node: string) {
        this._nodeList = this._nodeList.filter(str => str !== node)
        this._updateView();
    }
    private _updateView () {
        this._nodeList$.next(this._nodeList);
    }
}
