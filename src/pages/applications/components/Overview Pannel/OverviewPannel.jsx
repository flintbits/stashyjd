import React, { useState } from 'react';
import styles from './OverviewPannel.module.css';
import { LuX } from 'react-icons/lu';
import RightPannelHeader from '../../../../components/RightPannelHeader/RightPannelHeader';
import TabsComponent from '../../../../components/TabsComponent/TabsComponent';
import Overview from '../Overview/Overview';

const APPLICATION_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Job Details' },
  { id: 'documents', label: 'Documents' },
];

export default function OverviewPannel({ setShowRight, application }) {
  console.log({ application });
  const [activeTab, setActivetab] = useState('overview');
  const handleTabChange = (tab_id) => {
    setActivetab(tab_id);
  };
  return (
    <div className={styles['apppage-right-sidebar']}>
      <RightPannelHeader setShowRight={setShowRight} title="Application Overview" />

      <section>
        <TabsComponent tabs={APPLICATION_TABS} defaultTab="overview" onChange={handleTabChange} />
      </section>
      {activeTab === 'overview' && <Overview applicationId={application.public_id} />}
      {/* <pre>{JSON.stringify(application, null, 2)}</pre> */}
    </div>
  );
}
