// @ts-check
import React from 'react';

import { dashboardStats, isPromise } from '../api';

import './home-stats.css';

/**
 * @param {{
 *  className?: string;
 * }} _
 */
export function HomeStats({ className }) {
  let duringRender = true;
  let [stats, setStats] = React.useState(() => {
    const statsOrPromise = dashboardStats();
    if (isPromise(statsOrPromise)) {
      statsOrPromise.then(
        asyncStats => {
          stats = asyncStats;
          if (duringRender)
            setTimeout(() => setStats(asyncStats));
          else
            setStats(asyncStats);
        });
    }
    return statsOrPromise;
  });
  duringRender = false;

  const asofFormatted = stats?.asof && new Date(stats.asof) + '';

  return (
    <div className={className} style={{ padding: '0 1em' }}>
      <h2><span className='bluesky-logo-'>BlueSky</span> Statistics</h2>
      <div><i>{asofFormatted}</i></div>

      <p className='stats-section'>
        <div className='stats-section-inner'>
          {
            isPromise(stats) ?
              'Loading...' :
              <table className='stats-table'>
                <tr>
                  <th>
                    {stats.active_count}
                  </th>
                  <td>
                    accounts processed
                  </td>
                </tr>
                <tr>
                  <th>
                    {stats.deleted_count}
                  </th>
                  <td>
                    deleted
                  </td>
                </tr>
              </table>
          }
        </div>
      </p>

      <h2>JSON</h2>
      <pre>
        {
          JSON.stringify(stats, null, 2)
        }
      </pre>

    </div>
  );
}