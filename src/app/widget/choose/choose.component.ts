import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widget.service';
import { FormGroup } from '@angular/forms';
import { WidgetNode, IConfWidgetNode } from './widget-node.models';

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
            return true;
        });
    }
}
