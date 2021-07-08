import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ id, kind, testId = 'share-btn' }) {
  const [copied, setCopied] = useState(false);
  const kindOf = kind === 'Meal' ? 'comidas' : 'bebidas';

  const handleClick = () => {
    if (window.clipboardData) {
      window.clipboardData.clearData();
    }
    const urlToCopy = `http://localhost:3000/${kindOf}/${id}`;
    const elem = document.createElement('textarea');
    elem.value = urlToCopy;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    setCopied(!copied);
  };

  return (
    <>
      <button
        type="button"
        onClick={ handleClick }
        data-testid={ testId }
        src="src/images/shareIcon.svg"
      >
        <img
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      {
        copied
          ? <p>Link copiado!</p>
          : <div />
      }
    </>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ShareBtn;
