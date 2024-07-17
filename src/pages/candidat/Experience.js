import React from "react";

const Experience = ({
  consExp,
  dates,
  handlesociete,
  handleDate,
  handleDateExpFin,
  handleDescriptionExp,
  handleClickExp,
  handleRemoveItem,
}) => {
  return (
    <div className="card mb-grid">
      <div className="card-header">
        <div className="card-header-title">Experience</div>
      </div>
      <div className="card-body">
        {consExp && consExp.map((exp) => (
          <div key={exp.societeState} className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex justify-content-between">
              <div className="toast-body">
                <b>{exp.societeState}</b>
                <br /> {exp.descriptionState} <br />
                {exp.dateState} / {exp.dateFinExp}
              </div>
              <button
                className="btn btn-danger"
                title="Effacer"
                onClick={() => handleRemoveItem(exp.societeState, exp.descriptionState, exp.dateState)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <hr />
          </div>
        ))}

        <form>
          <div className="form-group">
            <label className="form-label">Nom de l'entreprise</label>
            <input
              required
              onChange={handlesociete}
              maxLength={50}
              className="form-control mb-2 input-credit-card"
              type="text"
              placeholder="Société"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date de début et de fin</label>
            <div className="input-group">
              <select onChange={handleDate} className="date-own form-control">
                {dates.map((date) => (
                  <option value={date} key={date}>
                    {date}
                  </option>
                ))}
              </select>
              <select onChange={handleDateExpFin} className="form-control">
                {dates.map((date) => (
                  <option value={date} key={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description du poste</label>
            <textarea
              required
              onChange={handleDescriptionExp}
              className="form-control mb-2 input-credit-card"
              placeholder="Description de votre poste"
              rows="3"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={handleClickExp}
          >
            <strong>+</strong>&nbsp;Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Experience;
