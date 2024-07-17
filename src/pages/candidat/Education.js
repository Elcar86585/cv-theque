import React from "react";

const Education = ({
  consDiplome,
  dates,
  handleEcole,
  handleDateDiplome,
  handleDatefinDiplo,
  handleDescriptionDip,
  handleClickDipl,
  handleRemoveDiplome,
}) => {
  return (
    <div className="card mb-grid">
      <div className="card-header">
        <div className="card-header-title">Diplômes et formations</div>
      </div>
      <div className="card-body">
        {consDiplome && consDiplome.map((diplo) => (
          <div key={diplo.ecoleState} className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex justify-content-between">
              <div className="toast-body">
                <b>{diplo.ecoleState}</b>
                <br /> {diplo.dateDipState} / {diplo.dateFinDilpoState} <br />
                {diplo.descriptionDipState}
              </div>
              <button
                className="btn btn-danger"
                title="Effacer"
                onClick={() => handleRemoveDiplome(diplo.ecoleState, diplo.dateDipState, diplo.descriptionDipState)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <hr />
          </div>
        ))}

        <form>
          <div className="form-group">
            <label className="form-label">Nom de l'institution</label>
            <input
              onChange={handleEcole}
              maxLength={50}
              className="form-control mb-2 input-credit-card"
              type="text"
              placeholder="Ecole"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date de début et de fin d'étude ou formation</label>
            <div className="input-group">
              <select
                defaultValue={2015}
                onChange={handleDateDiplome}
                className="form-control"
              >
                {dates.map((date) => (
                  <option value={date} key={date}>
                    {date}
                  </option>
                ))}
              </select>
              <select
                defaultValue={2019}
                onChange={handleDatefinDiplo}
                className="form-control"
              >
                {dates.map((date) => (
                  <option value={date} key={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description de votre étude ou formation</label>
            <input
              onChange={handleDescriptionDip}
              className="form-control mb-2 input-credit-card"
              type="text"
              placeholder="Description de votre diplôme"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClickDipl}
          >
            <strong>+</strong>&nbsp;Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Education;
