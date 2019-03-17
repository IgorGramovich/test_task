import { ChooseComponent } from './choose.component';
export interface IConfWidgetNode {
    state: boolean;
    name: string;
    index: number;
    component: ChooseComponent;
    disabled: boolean;
}

export class WidgetNode {
    public disabled = false;
    public index: number;
    private _state: boolean;
    private _name: string;
    private _component: ChooseComponent;
    get name() {
        return this._name;
    }
    get state() {
        return this._state;
    }

    set state(s) {
        this._state = s;
        if (!s) {
            this._component.updateView();
        } else {
            this._component.nodeList.push(this._name);
            if (this._component.nodeList.length === 3) {
                this._component.toggleDisabled(true);
            }
        }
        if (!s && this._component.isDisabled) {
            this._component.toggleDisabled(false);
            return;
        }
    }
    constructor(st: IConfWidgetNode) {
        this.disabled = st.disabled;
        this._state = st.state;
        this._name = st.name;
        this.index = ++st.index;
        this._component = st.component;
    }
}
