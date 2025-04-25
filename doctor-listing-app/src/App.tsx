import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorCard from './components/DoctorCard';
import './App.css';

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

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedConsultationType, setSelectedConsultationType] = useState(
    searchParams.get('consultation') || ''
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get('specialties')?.split(',').filter(Boolean) || []
  );
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || '');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        const doctorData: Doctor[] = await response.json();
        setDoctors(doctorData);
        setFilteredDoctors(doctorData);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (selectedConsultationType) {
      filtered = filtered.filter(doctor =>
        selectedConsultationType === 'video' ? doctor.video_consult :
        selectedConsultationType === 'clinic' ? doctor.in_clinic :
        true
      );
    }

    // Apply specialties filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        doctor?.specialities?.some(speciality => 
          selectedSpecialties.includes(speciality.name)
        )
      );
    }

    // Apply sorting
    if (selectedSort === 'fees') {
      filtered.sort((a, b) => {
        const feeA = parseInt(a.fees.replace('₹ ', '').replace(',', ''));
        const feeB = parseInt(b.fees.replace('₹ ', '').replace(',', ''));
        return feeA - feeB;
      });
    } else if (selectedSort === 'experience') {
      filtered.sort((a, b) => {
        const expA = parseInt(a.experience.split(' ')[0]);
        const expB = parseInt(b.experience.split(' ')[0]);
        return expB - expA;
      });
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, selectedConsultationType, selectedSpecialties, selectedSort]);

  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedConsultationType) params.set('consultation', selectedConsultationType);
    if (selectedSpecialties.length > 0) params.set('specialties', selectedSpecialties.join(','));
    if (selectedSort) params.set('sort', selectedSort);
    setSearchParams(params);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateURLParams();
  };

  const handleConsultationTypeChange = (type: string) => {
    setSelectedConsultationType(type);
    updateURLParams();
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev => {
      const newSpecialties = prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty];
      return newSpecialties;
    });
  };

  useEffect(() => {
    updateURLParams();
  }, [selectedSpecialties]);

  const handleSortChange = (sortBy: string) => {
    setSelectedSort(sortBy);
    updateURLParams();
  };

  const getSuggestions = () => {
    if (!searchQuery) return [];
    return doctors
      .map(doctor => doctor?.name)
      .filter(Boolean)
      .filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Doctor Listing</h1>
        <SearchBar
          onSearch={handleSearch}
          suggestions={getSuggestions()}
        />
      </header>
      <div className="app-content">
        <FilterPanel
          onConsultationTypeChange={handleConsultationTypeChange}
          onSpecialtyChange={handleSpecialtyChange}
          onSortChange={handleSortChange}
          selectedConsultationType={selectedConsultationType}
          selectedSpecialties={selectedSpecialties}
          selectedSort={selectedSort}
          specialties={Array.from(new Set(doctors.flatMap(d => d.specialities.map(s => s.name))))}
        />
        <div className="doctor-list">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
