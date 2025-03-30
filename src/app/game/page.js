import Layout from '../components/Layout';
import Game from '../components/Game';

export const metadata = {
  title: 'Game | Edge21',
  description: 'GAMING GAMING GAMING GAMING'
}

export default function DashboardPage() {
  return (
    <Layout>
      <Game/>
    </Layout>
  );
}
