import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
             <div>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>
        );
    }
}

export default App;