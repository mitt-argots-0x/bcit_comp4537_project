// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title='Edge21' }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
