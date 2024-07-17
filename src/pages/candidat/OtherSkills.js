import React from "react";

const OtherSkills = ({
  consLoisir,
  onChangeLoisir,
  handleClickLoisir,
  handleRemoveloisir,
}) => {
  return (
    <div className="card mb-grid">
      <div className="card-header">
        <div className="card-header-title">Autres compétences</div>
      </div>
      <div className="card-body">
        {consLoisir && consLoisir.map((loisir) => (
          <div key={loisir.loisirState} className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex justify-content-between">
              <div className="toast-body">{loisir.loisirState}</div>
              <button
                className="btn btn-danger"
                title="Effacer"
                onClick={() => handleRemoveloisir(loisir.loisirState)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <hr />
          </div>
        ))}

        <form>
          <div className="form-group">
            <label className="form-label">Ajouter d'autres compétences</label>
            <input
              onChange={onChangeLoisir}
              className="form-control mb-2 input-credit-card"
              type="text"
              placeholder="Votre compétence"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClickLoisir}
          >
            <strong>+</strong>&nbsp;Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtherSkills;
