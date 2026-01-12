import PageContainer from '@/uikit/layout/PageContainer';
import ContractListWidget from './widgets/ContractListWidget';

export default function ContractPage() {
    return (
        <PageContainer title="계약 관리">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-brand-muted">
                        전체 계약 현황을 관리하고 추적하세요
                    </p>
                    <button className="btn-primary">
                        새 계약 등록
                    </button>
                </div>

                <ContractListWidget />
            </div>
        </PageContainer>
    );
}
