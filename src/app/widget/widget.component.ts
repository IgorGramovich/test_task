import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WidgetService } from './widget.service';

@Component({
  selector: 'wg-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnDestroy {
    public isViewChoose = false;
    public nodeList: string[];
    private _ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private _widgetSrv: WidgetService,
    ) {
        this._widgetSrv.nodeList$
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((list: string[]) => {
                this.nodeList = list;
            });
        this._widgetSrv.isViewChoose$
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((state: boolean) => {
                this.isViewChoose = state;
            });
    }
    ngOnDestroy() {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }
    chenge() {
        this.isViewChoose = !this.isViewChoose;
    }

    deleteNode(node: string) {
        this._widgetSrv.deleteNode(node);
    }
}
