'use client';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/Calendar/Calendar'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Quicksand, sans-serif',
      color: '#9B98AE',
      fontSize: '0.9rem',
      gap: '16px',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #EDE9FE',
        borderTopColor: '#8B5CF6',
        borderRadius: '50%',
        animation: 'spin 0.8s ease-in-out infinite',
      }} />
      <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>
        ✨ Loading your calendar...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
});

const HeaderActions = dynamic(() => import('@/components/HeaderActions/HeaderActions'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="page-container">
      <div className="page-bg-pattern" />
      <HeaderActions />
      <Calendar />
    </main>
  );
}
