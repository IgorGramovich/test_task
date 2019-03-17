import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widget.service';
import { FormGroup, FormControl } from '@angular/forms';
import { WidgetNode, IConfWidgetNode } from './widget-node.models';
import { debounceTime } from 'rxjs/operators';

export interface IStateFilter {
    find: string;
    larger: number;
}

@Component({
    selector: 'wg-choose',
    templateUrl: './choose.component.html',
    styleUrls: ['./choose.component.scss']
})
export class ChooseComponent implements OnInit {
    public filterOptions = [10, 100, 200];
    public nodeList: string[];
    public formSearch: FormGroup;
    public widgetList: WidgetNode[];
    public isDisabled: boolean;
    private _stateFilter: IStateFilter;
    private _widgetListAll: WidgetNode[] = [];
    private _setter: Set<string>;

    constructor(
        private _widgetSrv: WidgetService,
    ) {
        this._setter = new Set<string>();
    }

    ngOnInit() {
        this.formSearch = new FormGroup({
            find: new FormControl(''),
            larger: new FormControl(0),
        });
        this._stateFilter = this.formSearch.value;

        this._widgetSrv.nodeList.forEach((item: string) => {
            this._setter.add(item);
        });
        this.isDisabled = !(this._setter.size < 3);
        const listAll = this._widgetSrv.getAllList();
        listAll.forEach((item: string, i: number) => {
            const st = this._setter.has(item);
            const conf: IConfWidgetNode = {
                state: st,
                name: item,
                index: i,
                component: this,
                disabled: this.isDisabled && !st,
            };
            this._widgetListAll.push(new WidgetNode(conf));
        });
        this._filterList();
        this.updateView();

        this.formSearch.valueChanges
        .pipe(debounceTime(200))
            .subscribe((data: IStateFilter) => {
            this._stateFilter = data;
            this._filterList(true);
        });
    }
    deleteNode(name: string) {
        this._widgetListAll.forEach((node: WidgetNode) => {
            if (node.name === name) {
                node.state = false;
            }
        });
    }
    save() {
        this._widgetSrv.updateNode(this.nodeList);
    }
    cancel() {
        this._widgetSrv.chooseClose();
    }
    toggleDisabled(state: boolean) {
        this.isDisabled = state;
        this._widgetListAll.forEach((node: WidgetNode) => {
            node.disabled = state && !node.state;
        });
    }
    updateView() {
        const list = [];
        this._widgetListAll.forEach((node: WidgetNode) => {
            if (node.state) {
                list.push(node.name);
            }
        });
        this.nodeList = list;
    }
    private _filterList(isFilter: boolean = false) {
        if (!isFilter) {
            this.widgetList = this._widgetListAll;
            return;
        }
        this.widgetList = this._widgetListAll.filter((node: WidgetNode) => {
            return node.name.indexOf(this._stateFilter.find) >= 0 && node.index > this._stateFilter.larger;
        });
    }
}
