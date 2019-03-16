import { Component, OnInit, OnDestroy } from '@angular/core';
import { WidgetService } from './widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wg-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnDestroy {
    public isViewChoose = false;
    public nodeList: string[];
    private _SWidgetSrv: Subscription;

    constructor(
        private _widgetSrv: WidgetService,
    ) {
        this._SWidgetSrv = this._widgetSrv.nodeList$
            .subscribe((list: string[]) => {
                this.nodeList = list;
            });
    }
    ngOnDestroy() {
        this._SWidgetSrv.unsubscribe();
    }
    chenge() {
        this.isViewChoose = !this.isViewChoose;
    }

    deleteNode(node: string) {
        this._widgetSrv.deleteNode(node);
    }
}
