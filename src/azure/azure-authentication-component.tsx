import React, { useState } from 'react'
import AzureAuthenticationContext from './azure-authentication-context'
import { AccountInfo } from '@azure/msal-browser'
import { CButton, CCol, CDropdownItem } from '@coreui/react'
import { isLogin, login,logout } from '../utils/auth'
import CIcon from '@coreui/icons-react'

const ua = window.navigator.userAgent
const msie = ua.indexOf('MSIE ')
const msie11 = ua.indexOf('Trident/')
const isIE = msie > 0 || msie11 > 0

// Log In, Log Out button
const AzureAuthenticationButton = ({ onAuthenticated }: any): JSX.Element => {
  // Azure client context
  const authenticationModule: AzureAuthenticationContext = new AzureAuthenticationContext()

  const [authenticated, setAuthenticated] = useState<Boolean>(false)
  const [user, setUser] = useState<AccountInfo>()

  const logIn = (method: string): any => {
    const typeName = 'loginPopup'
    const logInType = isIE ? 'loginRedirect' : typeName

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo)
  }
  const logOut = (): any => {
    console.log("logout button press")
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorage.getItem('user')) {
      onAuthenticated(undefined)
      // Azure Logout
      authenticationModule.logout(currentUser)
      logout();

    }
  }

  const returnedAccountInfo = (user: AccountInfo) => {
    // set state
    setAuthenticated(user?.name ? true : false)
    login(user);
    onAuthenticated(user)
    setUser(user)
  }

  const showLogInButton = (): any => {
    // return (
    //   <button id="authenticationButton" onClick={() => logIn('loginPopup')}>
    //     Log in
    //   </button>
    // )
    return (
      <CCol xs="6">
        <CButton
          color="primary"
          className="px-4"
          id="authenticationButton"
          onClick={() => logIn('loginPopup')}
        >
          Login
        </CButton>
      </CCol>
    )
  }

  const showLogOutButton = (): any => {
    // return (
    //   <div id="authenticationButtonDiv">
    //     <div id="authentication">
    //       <button id="authenticationButton" onClick={() => logOut()}>
    //         Log out
    //       </button>
    //     </div>
    //   </div>
    // )
    return (
      <CDropdownItem >
        <CIcon name="cil-lock-locked" className="me-2" />
        <CButton id="authenticationButton" onClick={() => logOut()}>
        Lock Account
        </CButton>
      </CDropdownItem>
    )
  }

  const showButton = (): any => {
    // return authenticated ? showLogOutButton() : showLogInButton();
    return isLogin() ? showLogOutButton() : showLogInButton()
  }

  return (
    <div id="authentication">
      {authenticationModule.isAuthenticationConfigured ? (
        showButton()
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </div>
  )
}

export default AzureAuthenticationButton
