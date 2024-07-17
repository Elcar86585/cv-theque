import React from "react";

const Language = ({
  conLangue,
  pourcentages,
  onChangelangue,
  onChangeProgrelangue,
  handleClicklangue,
  handleRemovelangue,
}) => {
  return (
    <div className="card mb-grid">
      <div className="card-header">
        <div className="card-header-title">Langues</div>
      </div>
      <div className="card-body">
        {conLangue && conLangue.map((langue) => (
          <div key={langue.langueState} className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex justify-content-between">
              <div className="toast-body">
                {langue.langueState},<br /> {langue.progresLangueState} %
              </div>
              <button
                className="btn btn-danger"
                title="Effacer"
                onClick={() => handleRemovelangue(langue.langueState)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <hr />
          </div>
        ))}

        <form>
          <div className="form-group">
            <label className="form-label">Ajouter une langue</label>
            <input
              className="form-control mb-2 input-credit-card"
              maxLength={30}
              type="text"
              onChange={onChangelangue}
              placeholder="Ajouter une langue"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Progression (échelle jusqu'à 100 %)</label>
            <select
              className="form-control mb-2 input-credit-card"
              onChange={onChangeProgrelangue}
              min={0}
              max={100}
            >
              {pourcentages.map((cent) => (
                <option value={cent} key={cent}>
                  {cent} %
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClicklangue}
          >
            <strong>+</strong>&nbsp;Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Language;
