import PropTypes from 'prop-types';

const ModalLayout = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <section className="w-[400px] rounded-xl bg-white p-8 text-center shadow-xl">
        {children}
      </section>
    </div>
  );
};

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalLayout;
