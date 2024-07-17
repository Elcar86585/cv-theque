import React from "react";

const Skills = ({
  consInfork,
  pourcentages,
  onChangeApp,
  onChangeProgress,
  handleClickInfo,
  handleRemoveInfo,
}) => {
  return (
    <div className="card mb-grid">
      <div className="card-header">
        <div className="card-header-title">Connaissance en informatique</div>
      </div>
      <div className="card-body">
        {consInfork && consInfork.map((info) => (
          <div key={info.appState} className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex justify-content-between">
              <div className="toast-body">
                {info.appState},<br /> {info.progresState} %
              </div>
              <button
                className="btn btn-danger"
                title="Effacer"
                onClick={() => handleRemoveInfo(info.appState)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <hr />
          </div>
        ))}

        <form>
          <div className="form-group">
            <label className="form-label">Connaissance</label>
            <input
              className="form-control mb-2 input-credit-card"
              maxLength={50}
              type="text"
              onChange={onChangeApp}
              placeholder="Logiciel ou autres applications"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Progression (échelle jusqu'à 100 %)</label>
            <select
              className="form-control mb-2 input-credit-card"
              onChange={onChangeProgress}
              placeholder="0-100"
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
            onClick={handleClickInfo}
          >
            <strong>+</strong>&nbsp;Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Skills;
