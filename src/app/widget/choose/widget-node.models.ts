export class WidgetNode {
    get name() {
        return this._node;
    }
    constructor(private _node: string, public state: boolean = false) {

    }
}
