// src/standard/contract/contract.types.ts

// Contract 도메인 타입은 core가 아니라 "계약 도메인"에 colocate

export type ContractStatus =
  | 'Active'
  | 'Draft'
  | 'Review'
  | 'APPROVED'
  | 'REJECTED'
  | (string & {});

// 서비스/페이지에서 다루는 "계약 데이터"의 최소 DTO
export interface ContractDto {
  id: number | string;
  title: string;
  status: ContractStatus;

  partner?: string;
  date?: string;
  amount?: string;
  category?: string;
  templateName?: string;
  requester?: string;
  reviewer?: string;
  documentCode?: string;
}

// app/page.tsx가 기대하는 ContractService의 최소 인터페이스(테넌트 오버라이드 포함)
export interface ContractService {
  getContracts(tenant: string): Promise<ContractDto[]>;
  getContractsDetail(tenant: string): Promise<ContractDto[]>;
  getContractsDetail2(tenant: string): Promise<ContractDto[]>;

  // 상세에서 승인 액션을 위해 optional로 둠(없으면 버튼 숨김/미구현)
  approve?: (tenant: string, contractId: string) => Promise<void>;
}

