import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageShell from '../../layouts/PageShell/PageShell';
import { AllCoverLetterIcon, AllDocumentsIcon, AllResumeIcon } from '../../assets/icons/icon';
import styles from './DocumentsPage.module.css';
import DataTable from '../../components/DataTable/DataTable';
import { document_table_columns as baseColumns } from './columns';
import { documentService } from '../../services/documentService';
import { useToast } from '../../app/context/ToastProvider';
import DropZone from '../../components/DropZone/DropZone';
import { useOutletContext } from 'react-router-dom';
import DocPageRightBar from './components/DocPageRightBar/DocPageRightBar';
import TabsComponent from '../../components/TabsComponent/TabsComponent';

const DOCUMENT_TABS = [
  { id: 'all', label: 'All Documents', icon: AllDocumentsIcon },
  { id: 'resume', label: 'Resumes', icon: AllResumeIcon },
  {
    id: 'cover_letter',
    label: 'Cover Letters',
    icon: AllCoverLetterIcon,
  },
];

export default function DocumentsPage({ rightPanelWidth = 320 }) {
  const columns = useMemo(() => baseColumns, []);
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeTab, setActivetab] = useState('all');
  const context = useOutletContext() || {};
  const { showRight, setRightPanelContent, setShowRight } = context;

  useEffect(() => {
    context.setRightPanelWidth?.(rightPanelWidth);

    return () => {
      context.setRightPanelWidth?.(320);
    };
  }, [context.setRightPanelWidth, rightPanelWidth]);

  useEffect(() => {
    if (!setRightPanelContent) return;

    if (selectedDoc) {
      setRightPanelContent(<DocPageRightBar setShowRight={setShowRight} doc={selectedDoc} />);
      setShowRight?.(true);
    } else {
      setRightPanelContent(null);
      setShowRight?.(false);
    }

    return () => {
      setRightPanelContent(null);
    };
  }, [selectedDoc, setRightPanelContent, setShowRight]);

  useEffect(() => {
    if (!showRight && selectedDoc) {
      setSelectedDoc(null);
    }
  }, [showRight, selectedDoc]);

  async function fetchDocuments() {
    //reset when tab changes to avoid stale state
    setData([]);

    try {
      const response = await documentService.fetchAllDocuments(
        activeTab === 'all' ? null : activeTab,
      );
      6;

      if (response.status === 'success') {
        setData(response.data);
        return;
      }

      addToast({
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
        message: String(e),
        type: 'error',
      });
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, [activeTab]);

  const handleTabChange = (tab_id) => {
    setActivetab(tab_id);
  };

  return (
    <PageShell>
      <PageHeader
        title="Documents"
        subtitle="Manage resumes, cover letters, and other documents for your applications"
      >
        <div className={styles['document-header-action']}>
          <DropZone
            key="resume"
            label="Upload Resume"
            type="resume"
            successCallback={fetchDocuments}
          />
          <DropZone
            key="cover_letter"
            label="Upload Cover Letter"
            type="cover_letter"
            successCallback={fetchDocuments}
          />
        </div>
      </PageHeader>

      <section className={styles['document-page-main']}>
        <div style={{ padding: '16px' }}>
          <TabsComponent tabs={DOCUMENT_TABS} defaultTab="all" onChange={handleTabChange} />
        </div>

        <section className={styles['table-container']}>
          <DataTable
            data={data}
            columns={columns}
            highlightedRowId={selectedDoc?.public_id ?? null}
            onRowClick={(doc) => {
              setSelectedDoc(doc);
              setShowRight(true);
            }}
          />
        </section>
      </section>
    </PageShell>
  );
}
