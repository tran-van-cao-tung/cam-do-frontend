import React from 'react';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Handle the error here
        console.error(error, info);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // Render a fallback UI here
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
