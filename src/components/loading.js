import React from 'react'
import loadingImg from '../assets/images/loading.svg'

export default () => (
    <div className="loading-comp center-block">
        <img src={loadingImg} alt="Loading, please wait..." />
    </div>
)