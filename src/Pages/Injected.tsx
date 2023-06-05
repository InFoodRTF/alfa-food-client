import React from "react";

export abstract class PageComponent<TInject = {},TProps = {}, TState = {}> extends React.Component<TProps,TState>{
    get injected() {
        return this.props as TInject;
    }
}