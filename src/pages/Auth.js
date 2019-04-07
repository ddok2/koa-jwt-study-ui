import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';

class Auth extends Component {
    componentWillMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }

    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        return (
            <div>
                Auth
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
    }),
)(Auth);
