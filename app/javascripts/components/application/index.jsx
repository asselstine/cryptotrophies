import React, {
  Component
} from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import CryptoTrophies from '@/contracts/cryptotrophies-factory'

import web3Wrap from '@/components/web3Wrap'

import SiteHeader from './layout/site-header'

import Dashboard from './dashboard'

// Routes Components
import CustomizeAward from './customize-award'
const web3CustomizeAward = web3Wrap(CustomizeAward)

import PurchaseHistory from './purchase-history'
const web3PurchaseHistory = web3Wrap(PurchaseHistory)

import ReceivedAwards from './received-awards'
const web3ReceivedAwards = web3Wrap(ReceivedAwards)

import Award from './award'

export class Application extends Component {

  render (){
    return (
      <div>
        <SiteHeader />

        <Switch>
          <Route path='/awards/received' component={web3ReceivedAwards} />
          <Route path='/awards/purchased' component={web3PurchaseHistory} />
          <Route path='/awards/new' component={web3CustomizeAward} />
          <Route path='/awards/:awardId/edit' component={web3CustomizeAward} />
          <Route path='/awards/:awardId' component={Award} />

          <Route exact={true} path='/' component={Dashboard} />
        </Switch>
      </div>
    )
  }
}
