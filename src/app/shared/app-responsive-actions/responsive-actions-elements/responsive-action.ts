export class ResponsiveAction {
    public key: string;
    public icon: string;
    public text: string;

    public constructor(
        key?: string,
        icon?: string,
        text?: string
    ) {
        this.key = key;
        this.icon = icon;
        this.text = text;
    }

    public setKey(key: string): this {
        this.key = key;

        return this;
    }
    public seticon(icon: string): this {
        this.icon = icon;

        return this;
    }
    public settext(text: string): this {
        this.text = text;

        return this;
    }
}
