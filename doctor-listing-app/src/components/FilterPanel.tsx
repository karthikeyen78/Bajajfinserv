import React from 'react';

interface FilterPanelProps {
  onConsultationTypeChange: (type: string) => void;
  onSpecialtyChange: (specialty: string) => void;
  onSortChange: (sortBy: string) => void;
  selectedConsultationType: string;
  selectedSpecialties: string[];
  selectedSort: string;
  specialties: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
  selectedConsultationType,
  selectedSpecialties,
  selectedSort,
  specialties
}) => {
  return (
    <div className="filter-panel" data-testid="filter-panel">
      <div className="filter-section">
        <h3>Consultation Type</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="consultation"
              value=""
              checked={selectedConsultationType === ''}
              onChange={() => onConsultationTypeChange('')}
              data-testid="all-consultation"
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="consultation"
              value="video"
              checked={selectedConsultationType === 'video'}
              onChange={() => onConsultationTypeChange('video')}
              data-testid="video-consultation"
            />
            Video Consultation
          </label>
          <label>
            <input
              type="radio"
              name="consultation"
              value="clinic"
              checked={selectedConsultationType === 'clinic'}
              onChange={() => onConsultationTypeChange('clinic')}
              data-testid="clinic-consultation"
            />
            In-Clinic Consultation
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3>Specialties</h3>
        <div className="checkbox-group">
          {specialties.map((specialty) => (
            <label key={specialty}>
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                data-testid={`specialty-${specialty}`}
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Sort By</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sort"
              value=""
              checked={selectedSort === ''}
              onChange={() => onSortChange('')}
              data-testid="no-sort"
            />
            None
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="fees"
              checked={selectedSort === 'fees'}
              onChange={() => onSortChange('fees')}
              data-testid="sort-fees"
            />
            Fees (Low to High)
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="experience"
              checked={selectedSort === 'experience'}
              onChange={() => onSortChange('experience')}
              data-testid="sort-experience"
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 