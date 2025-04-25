import React from 'react';
import './DoctorCard.css';

interface Speciality {
  name: string;
}

interface Clinic {
  name: string;
  address: {
    locality: string;
    city: string;
    address_line1: string;
  };
}

interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: Speciality[];
  fees: string;
  experience: string;
  languages: string[];
  clinic: Clinic;
  video_consult: boolean;
  in_clinic: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="card-header">
        <div className="doctor-photo">
          {doctor.photo && doctor.photo !== 'null' ? (
            <img src={doctor.photo} alt={doctor.name} className="profile-image" />
          ) : (
            <div className="initials-circle">{doctor.name_initials}</div>
          )}
        </div>
        <div className="doctor-basic-info">
          <h3 className="doctor-name" data-testid="doctor-name">{doctor.name}</h3>
          <div className="specialties" data-testid="doctor-specialties">
            {doctor.specialities?.map((s, index) => (
              <span key={index} className="specialty-tag">{s.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="experience-fees">
          <div className="info-item">
            <span className="label">Experience</span>
            <span className="value" data-testid="doctor-experience">{doctor.experience}</span>
          </div>
          <div className="info-item">
            <span className="label">Consultation Fee</span>
            <span className="value fees" data-testid="doctor-fees">{doctor.fees}</span>
          </div>
        </div>

        <div className="consultation-types">
          {doctor.video_consult && (
            <div className="consultation-type video" data-testid="video-consult">
              <i className="fas fa-video"></i>
              <span>Video Consultation</span>
            </div>
          )}
          {doctor.in_clinic && (
            <div className="consultation-type clinic" data-testid="clinic-consult">
              <i className="fas fa-hospital"></i>
              <span>In-Clinic Consultation</span>
            </div>
          )}
        </div>

        <div className="clinic-info">
          <h4 className="clinic-name" data-testid="clinic-name">
            <i className="fas fa-building"></i>
            {doctor.clinic.name}
          </h4>
          <p className="clinic-address" data-testid="clinic-address">
            <i className="fas fa-map-marker-alt"></i>
            {doctor.clinic.address.address_line1}, {doctor.clinic.address.locality}, {doctor.clinic.address.city}
          </p>
        </div>

        <div className="languages">
          <h4><i className="fas fa-language"></i> Languages Spoken</h4>
          <div className="language-tags">
            {doctor.languages.map((lang, index) => (
              <span key={index} className="language-tag">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 