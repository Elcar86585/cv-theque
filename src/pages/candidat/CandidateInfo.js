import React from "react";

const InputField = ({ label, onChange, type = "text", placeholder, maxLength, required = false }) => (
  <div className="form-group">
    <label className="form-label">
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <input
      onChange={onChange}
      className="form-control mb-2 input-credit-card"
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  </div>
);

const SelectField = ({ label, onChange, options, required = false }) => (
  <div className="form-group">
    <label className="form-label">
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <select onChange={onChange} className="form-control">
      <option value={null}>----</option>
      {options.map((option) => (
        <option value={option.id} key={option.id}>
          {option.categorie}
        </option>
      ))}
    </select>
  </div>
);

const CandidateInfo = ({
  category,
  alpha,
  sousCat,
  handleNomPrenom,
  handlePrenom,
  handlePoste,
  handleSousCat,
  handleAExp,
  handleEmail,
  handleCodeCall,
  handleTelephone,
  handleTelephone1,
  handleTelephone2,
  handleAge,
  handleAdress,
  handleFacebook,
  handleLinkedin,
  handlePretention,
  handleDispo,
  handledateDispo,
  handleContrat,
  handleNation,
  handleNationnalite,
  dispo,
}) => {
  return (
    <div className="card mb-grid">
      <div className="card-header">
        <div className="card-header-title">À propos du candidat</div>
      </div>
      <div className="card-body">
        <form>
          <InputField label="Nom" onChange={handleNomPrenom} placeholder="Votre nom" maxLength={30} required />
          <InputField label="Prénom" onChange={handlePrenom} placeholder="Votre prénom" maxLength={30} required />
          
          <SelectField label="Poste" onChange={handlePoste} options={alpha} required />
          {category && <SelectField label="Autre poste" onChange={handleSousCat} options={sousCat} />}

          <SelectField
            label="Combien d'années d'expérience(s) avez-vous sur ce poste"
            onChange={handleAExp}
            options={Array.from({ length: 10 }, (_, i) => ({ id: i + 1, categorie: `${i} ${i === 1 ? 'an' : 'ans'}` })).concat({ id: 11, categorie: '+ de 5 ans' }, { id: 12, categorie: '+ de 10 ans' })}
            required
          />
          
          <InputField label="E-mail" onChange={handleEmail} placeholder="Votre e-mail" />
          
          {/* Telephone inputs */}
          {Array.from({ length: 3 }, (_, index) => (
            <div className="form-group" key={index}>
              <label className="form-label">{index === 0 ? "Téléphone" : "Autre numéro Téléphone"}</label>
              <div className="input-group">
                <select onChange={handleCodeCall} className="custom-select">
                  <option value="">...</option>
                  <option>+261</option>
                  <option>+230</option>
                </select>
                <div className="input-group-append">
                  <input
                    onChange={index === 0 ? handleTelephone : index === 1 ? handleTelephone1 : handleTelephone2}
                    placeholder="32.25.525.08"
                    maxLength={15}
                    className="form-control input-prefix mb-2"
                    type="tel"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <InputField label="Année de naissance" onChange={handleAge} placeholder="Année de votre naissance" maxLength={4} required />
          <InputField label="Adresse exacte" onChange={handleAdress} placeholder="Votre adresse exacte" required />
          <InputField label="Facebook" onChange={handleFacebook} placeholder="Lien de votre profil Facebook" />
          <InputField label="LinkedIn" onChange={handleLinkedin} placeholder="Lien de votre profil LinkedIn" />

          <div className="form-group">
            <label className="form-label">Prétention salariale</label>
            <div className="input-group">
              <input
                onChange={handlePretention}
                maxLength={50}
                className="form-control input-prefix mb-2"
                type="text"
                placeholder="Votre prétention salariale"
              />
              <select onChange={handleCodeCall} className="custom-select">
                <option value="">...</option>
                <option>Ariary</option>
                <option>Roupie</option>
              </select>
            </div>
          </div>

          <SelectField label="Disponibilité" onChange={handleDispo} options={[
            { id: '1', categorie: 'Disponible immédiat' },
            { id: '2', categorie: 'Disponible avec préavis' },
            { id: '3', categorie: 'En poste' },
          ]} required />
          
          {dispo === 'Disponible avec préavis' && (
            <InputField label="Date de disponibilité" onChange={handledateDispo} type="date" required />
          )}

          <SelectField label="Type de contrat" onChange={handleContrat} options={[
            { id: 'CDI', categorie: 'CDI' },
            { id: 'CDD', categorie: 'CDD' },
          ]} required />

          <SelectField label="Localisation" onChange={handleNation} options={[
            { id: 'Madagascar', categorie: 'Madagascar' },
            { id: 'Maurice', categorie: 'Maurice' },
            { id: 'Autre', categorie: 'Autre résident' },
          ]} required />

          <SelectField label="Nationalité" onChange={handleNationnalite} options={[
            { id: 'Malgache', categorie: 'Malgache' },
            { id: 'Mauricen', categorie: 'Mauricen' },
            { id: 'Autre', categorie: 'Autre nationalité' },
          ]} required />

          <p>
            Tous les champs avec du <span style={{ color: "red" }}>*</span> sont obligatoires
          </p>
        </form>
      </div>
    </div>
  );
};

export default CandidateInfo;
