import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './ApplicationsPage.module.css';
import DataTable from '../../components/DataTable/DataTable';
import { TABLEHEADERS } from './configs';
import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageShell from '../../layouts/PageShell/PageShell';
import { useToast } from '../../app/context/ToastProvider';
import { applicationService } from '../../services/applicationService';
import { application_table_columns } from './applications-table-columns';
import OverviewPannel from './components/Overview Pannel/OverviewPannel';
import { useRequest } from '../../app/hooks/useRequest';

export default function ApplicationsPage({ rightPanelWidth = 820 }) {
  const columns = useMemo(() => application_table_columns, []);
  const [data, setData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const context = useOutletContext() || {};
  const { showRight, setRightPanelContent, setShowRight } = context;
  const { execute } = useRequest();

  useEffect(() => {
    context.setRightPanelWidth?.(rightPanelWidth);

    return () => {
      context.setRightPanelWidth?.(320);
    };
  }, [context.setRightPanelWidth, rightPanelWidth]);

  useEffect(() => {
    if (!setRightPanelContent) return;

    if (selectedApplication) {
      setRightPanelContent(
        <OverviewPannel setShowRight={setShowRight} application={selectedApplication} />,
      );
      setShowRight?.(true);
    } else {
      setRightPanelContent(null);
      setShowRight?.(false);
    }

    return () => {
      setRightPanelContent(null);
    };
  }, [selectedApplication, setRightPanelContent, setShowRight]);

  useEffect(() => {
    if (!showRight && selectedApplication) {
      setSelectedApplication(null);
    }
  }, [showRight, selectedApplication]);

  //Fetch all applications on initial load
  useEffect(() => {
    execute({
      request: applicationService.fetchAllApplications,
      onSuccess: setData,
      showSuccessToast: true,
    });
  }, []);

  return (
    <PageShell>
      <PageHeader title="Applications" subtitle="Manage your applications"></PageHeader>

      <section className={styles['applications-page-main']}>
        <section className={styles['table-container']}>
          <DataTable
            data={data}
            columns={columns}
            highlightedRowId={selectedApplication?.public_id ?? null}
            onRowClick={(application) => {
              setSelectedApplication(application);
              setShowRight(true);
            }}
          />
        </section>

        {/* <section>
          <BottomDetailPanel application={selectedApplication} />
        </section> */}
      </section>
    </PageShell>
  );
}
