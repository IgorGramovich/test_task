import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WidgetService {
    private _nodeList$: BehaviorSubject<string[]>;
    private _isViewChoose$: Subject<boolean>;
    private _defaultList: string[] = ['Элемент 2', 'Элемент 4', 'Элемент 6'];
    private _allList: string[];
    private _nodeList: string[];
    get nodeList() {
        return this._nodeList;
    }
    set nodeList(list: string[]) {
        this._nodeList = list;
        this._updateView();
    }
    get nodeList$(): Observable<string[]> {
        return this._nodeList$.asObservable();
    }
    get isViewChoose$(): Observable<boolean> {
        return this._isViewChoose$.asObservable();
    }
    constructor() {
        this._nodeList = this._defaultList;
        this._nodeList$ = new BehaviorSubject<string[]>(this._nodeList);
        this._isViewChoose$ = new Subject<boolean>();
    }
    getAllList(): string[] {
        if (!this._allList) {
            this._allList = Array.from({ length: 300 }, (_, idx) => `Элемент ${++idx}`);
        }
        return this._allList;
    }
    deleteNode(node: string) {
        this._nodeList = this._nodeList.filter(str => str !== node);
        this._updateView();
    }
    updateNode(list: string[]) {
        this._nodeList = list;
        this._updateView();
        this.chooseClose();
    }
    chooseClose() {
        this._isViewChoose$.next(false);
    }
    private _updateView() {
        this._nodeList$.next(this._nodeList);
    }
}
