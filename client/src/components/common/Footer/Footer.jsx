import FooterBottom from "./FooterBottom";
import FooterLinks from "./FooterLinks";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <footer className="mt-20 bg-[#111827]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <FooterTop />

        <FooterLinks />

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;