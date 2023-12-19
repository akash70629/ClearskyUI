// @ts-check
/// <reference path="../types.d.ts" />

import React from 'react';
import { shortenDID, shortenHandle } from '../api';

import './account-header.css';
import { FullDID, FullHandle } from '../common-components/full-short';

/**
 * @param {{
 *  className?: string,
 *  account: Partial<AccountInfo> & { loading?: boolean },
 *  onCloseClick?: () => void
 * }} _ 
 */
export function AccountHeader({ className, account, onCloseClick }) {

  return (
    <div className={className}>
      <h1 style={{ margin: 0 }}>
        {
          typeof onCloseClick !== 'function' ? undefined :
            <button
              className='account-close-button'
              onClick={onCloseClick}>&lsaquo;</button>
        }

        <div className='account-banner' style={{
          backgroundImage: account.bannerUrl ? `url(${account.bannerUrl})` : 'transparent'
        }}>
        </div>

        <span className='account-avatar-and-displayName-line'>
          <span className='account-banner-overlay'></span>
          <span className='account-avatar' style={{
            backgroundImage: account.avatarUrl ? `url(${account.avatarUrl})` : 'transparent'
          }}></span>
          <span className='account-displayName'>
            {
              account.displayName ||
              <span style={{ opacity: '0.5' }}><FullHandle shortHandle={account.shortHandle} /></span>
            }
          </span>
          {
            !account.displayName ? undefined :
              <span className='account-handle'>
                <span className='account-handle-at'>@</span>
                <FullHandle shortHandle={account.shortHandle} />
              </span>
          }
          {
            !account.shortDID ? undefined :
              <span className='account-did'>
                <FullDID shortDID={account.shortDID} />
              </span>
          }
        </span>
      </h1>
    </div>
  );
}