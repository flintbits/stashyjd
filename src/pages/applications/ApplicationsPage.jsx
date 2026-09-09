import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './ApplicationsPage.module.css';
import DataTable from '../../components/DataTable/DataTable';
import { TABLEHEADERS } from './configs';
import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useToast } from '../../app/context/ToastProvider';
import { applicationServiceApi } from './services/applicationsService';
import { application_table_columns } from './applications-table-columns';
import OverviewPannel from './components/Overview Pannel/OverviewPannel';

export default function ApplicationsPage({ rightPanelWidth = 820 }) {
  const columns = useMemo(() => application_table_columns, []);
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const context = useOutletContext() || {};
  const { setRightPanelContent, setShowRight } = context;

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

  async function fetchDocuments() {
    try {
      const response = await applicationServiceApi.fetchAllApplications();

      if (response.status === 'success') {
        setData(response.data);
        return;
      }

      addToast({
        title: response.status,
        message: response.message,
        type:
          response.status === 'error'
            ? 'error'
            : response.status === 'success'
              ? 'success'
              : 'warning',
      });
    } catch (e) {
      addToast({
        title: 'Error',
        message: String(e),
        type: 'error',
      });
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className={styles['applications-page']}>
      <PageHeader title="Applications" subtitle="Manage your applications"></PageHeader>

      <section className={styles['applications-page-main']}>
        <section className={styles['table-container']}>
          <DataTable
            data={data}
            columns={columns}
            showFooter={false}
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
    </div>
  );
}
