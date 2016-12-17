// @flow

import React from 'react'
import { render } from 'react-dom'

import App from './containers/app'

import './main.scss'
import 'script!jquery'
import 'script!foundation-sites/js/foundation.core'

render(<App />, document.getElementById('app'))