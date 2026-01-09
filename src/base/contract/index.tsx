'use client';
import dynamic from 'next/dynamic';
const ContractPage = dynamic(() => import('./ContractPage'));

export default function ContractSwitcher() {
    return <ContractPage />; // SK 전용이 없으면 바로 표준 리턴
}
