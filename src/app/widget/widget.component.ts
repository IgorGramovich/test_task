import { Component, OnInit, OnDestroy } from '@angular/core';
import { WidgetService } from './widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wg-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnDestroy {
    public nodeList;
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
        console.log('chenge()');
    }

    deleteNode(node: string) {
        this._widgetSrv.deleteNode(node);
    }
}
