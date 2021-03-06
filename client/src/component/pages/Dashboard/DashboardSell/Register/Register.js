/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchUser from '../../../../Layout/SearchUser/SearchUser';
import RegisterUser from '../../../../Layout/RegisterUser/RegisterUser';
import './Register.css';
import {
  registerStart,
  setRegisterFields,
  setSearchFields,
  switchRegisterMode,
  getAdminsUsers,
  searchUserAutoComplete,
  getUserByEmail,
  resetRegisterState,
} from '../../../../../redux/actions/register';
import { changeSellStage } from '../../../../../redux/actions/sell';
class Register extends Component {
  componentDidMount() {
    const { getAdminsUsers } = this.props;
    const admin = localStorage.getItem('id');
    if (admin) {
      getAdminsUsers(admin);
    }
  }

  switchMode = () => {
    const { switchRegisterMode } = this.props;
    switchRegisterMode();
  };
  registerInputChange = ({ id, value, validation }) => {
    const { setRegisterFields } = this.props;
    setRegisterFields({ id, value, validation });
  };
  searchInputChange = ({ id, value, validation }) => {
    const { setSearchFields, searchUserAutoComplete } = this.props;
    setSearchFields({ id, value, validation });
    searchUserAutoComplete(value);
  };
  registerSubmitHandler = async event => {
    const { registerStart, registerForm } = this.props;
    const id = localStorage.getItem('id');
    const registerData = {
      admin: id,
      firstName: registerForm['firstName'] ? registerForm.firstName.value : '',
      lastName: registerForm['lastName'] ? registerForm.lastName.value : '',
      zahot: registerForm['zahot'] ? registerForm.zahot.value : '',
      phone: registerForm['phone'] ? registerForm.phone.value : '',
      address: registerForm['address'] ? registerForm.address.value : '',
      email: registerForm['email'] ? registerForm.email.value : '',
    };

    return registerStart(registerData, id);
  };
  userSelect = email => {
    const { getUserByEmail } = this.props;
    const data = {
      email,
    };
    getUserByEmail(data);
  };
  render() {
    const {
      user,
      registerForm,
      searchForm,
      autoCompleteResult,
      redirect,
      message,
      mode,
      loading,
    } = this.props;
    return (
      <div className="registerPage">
        {redirect && <Redirect to={redirect} />}
        <div className="modeContainer">
          <p>
            Switch to{' '}
            <label onClick={this.switchMode}>
              {mode ? 'Search User' : 'Register New'}
            </label>
          </p>
        </div>
        {mode ? (
          <RegisterUser
            loading={loading}
            message={message}
            formSubmit={this.registerSubmitHandler}
            inputChange={this.registerInputChange}
            registerUserForm={registerForm}
          />
        ) : (
          <SearchUser
            changeSellStage={changeSellStage}
            inputChange={this.searchInputChange}
            user={user}
            userSelect={this.userSelect}
            searchForm={searchForm}
            autoCompleteResult={autoCompleteResult}
          />
        )}
        {message
          ? message.global && (
              <div className="globalError">
                <p>* {message.global.toUpperCase()}</p>
              </div>
            )
          : null}
      </div>
    );
  }
}
Register.prop = {
  registerForm: PropTypes.object,
  loading: PropTypes.bool,
  message: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    registerForm: state.register.registerForm,
    searchForm: state.register.searchForm,
    autoCompleteResult: state.register.autoCompleteResult,
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
    loading: state.ui.loading,
    mode: state.register.mode,
  };
};

export default connect(
  mapStateToProps,
  {
    registerStart,
    getAdminsUsers,
    searchUserAutoComplete,
    setRegisterFields,
    setSearchFields,
    switchRegisterMode,
    changeSellStage,
    getUserByEmail,
    resetRegisterState,
  },
)(Register);
